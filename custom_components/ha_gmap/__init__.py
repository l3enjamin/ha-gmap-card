"""HA GMap Card & GTFS Transit integration."""

from __future__ import annotations

from datetime import timedelta
import logging
import os
from pathlib import Path
from typing import Any

import aiohttp
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .const import (
    CONF_OUTPUT_DIR,
    CONF_ROUTE_FILTER,
    CONF_ROUTE_TYPES,
    CONF_SCAN_INTERVAL_HOURS,
    CONF_SOURCE,
    DEFAULT_OUTPUT_DIR,
    DEFAULT_ROUTE_TYPES,
    DEFAULT_SCAN_INTERVAL_HOURS,
    DOMAIN,
    FRONTEND_SCRIPT_URL,
)
from .gtfs_exporter import GtfsExportResult, export_gtfs

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Register the bundled ha-gmap-card.js static path and Lovelace module URL."""
    frontend_dir = Path(__file__).parent / "frontend"
    card_file = frontend_dir / "ha-gmap-card.js"
    if card_file.exists():
        await hass.http.async_register_static_paths(
            [StaticPathConfig("/ha_gmap/ha-gmap-card.js", str(card_file), cache_headers=True)]
        )
        add_extra_js_url(hass, FRONTEND_SCRIPT_URL)
    else:
        _LOGGER.warning("Bundled ha-gmap-card.js not found at %s", card_file)

    hass.data.setdefault(DOMAIN, {})

    async def _handle_refresh_gtfs(call: ServiceCall) -> None:
        for coord in list(hass.data.get(DOMAIN, {}).values()):
            if isinstance(coord, GtfsExporterCoordinator):
                coord.force_next = True
                await coord.async_request_refresh()

    if not hass.services.has_service(DOMAIN, "refresh_gtfs"):
        hass.services.async_register(DOMAIN, "refresh_gtfs", _handle_refresh_gtfs)

    return True


class GtfsExporterCoordinator(DataUpdateCoordinator[GtfsExportResult | None]):
    """Coordinates periodic GTFS static schedule & GeoJSON export."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.entry = entry
        self.force_next = True
        self._last_mtime: float | None = None
        self._last_etag: str | None = None
        cfg = {**entry.data, **entry.options}
        hours = max(1, int(cfg.get(CONF_SCAN_INTERVAL_HOURS, DEFAULT_SCAN_INTERVAL_HOURS)))
        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_{entry.entry_id}",
            update_interval=timedelta(hours=hours),
        )

    async def _async_update_data(self) -> GtfsExportResult | None:
        cfg = {**self.entry.data, **self.entry.options}
        source = str(cfg.get(CONF_SOURCE, "")).strip()
        output_slug = str(cfg.get(CONF_OUTPUT_DIR, DEFAULT_OUTPUT_DIR)).strip().strip("/")
        route_types = cfg.get(CONF_ROUTE_TYPES, DEFAULT_ROUTE_TYPES)
        route_filter = cfg.get(CONF_ROUTE_FILTER) or []

        if not source:
            return None

        output_dir = Path(self.hass.config.path("www", output_slug))
        url_prefix = f"/local/{output_slug}"

        # Remote HTTP/HTTPS zip download
        if source.startswith(("http://", "https://")):
            cache_zip = Path(self.hass.config.path(".storage", f"{DOMAIN}_{self.entry.entry_id}.zip"))
            session = async_get_clientsession(self.hass)
            headers = {}
            if not self.force_next and self._last_etag:
                headers["If-None-Match"] = self._last_etag
            try:
                async with session.get(source, headers=headers, timeout=aiohttp.ClientTimeout(total=120)) as resp:
                    if resp.status == 304 and not self.force_next:
                        return self.data
                    if resp.status >= 400:
                        raise UpdateFailed(f"HTTP {resp.status} downloading GTFS feed")
                    data = await resp.read()
                    self._last_etag = resp.headers.get("ETag")
            except aiohttp.ClientError as err:
                raise UpdateFailed(f"Error downloading GTFS feed: {err}") from err

            def _write_and_export() -> GtfsExportResult:
                cache_zip.parent.mkdir(parents=True, exist_ok=True)
                cache_zip.write_bytes(data)
                return export_gtfs(str(cache_zip), str(output_dir), route_types, route_filter, url_prefix)

            self.force_next = False
            return await self.hass.async_add_executor_job(_write_and_export)

        # Local .zip or .sqlite file
        local_path = Path(source)
        if not local_path.is_absolute():
            local_path = Path(self.hass.config.path(source))
        if not local_path.exists():
            raise UpdateFailed(f"GTFS file not found: {local_path}")

        cur_mtime = os.path.getmtime(local_path)
        if not self.force_next and self._last_mtime == cur_mtime and (output_dir / "transit_schedule.json").exists():
            return self.data

        res = await self.hass.async_add_executor_job(
            export_gtfs, str(local_path), str(output_dir), route_types, route_filter, url_prefix
        )
        self._last_mtime = cur_mtime
        self.force_next = False
        return res


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up HA GMap GTFS exporter from a config entry."""
    coordinator = GtfsExporterCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    coord: GtfsExporterCoordinator | None = hass.data.get(DOMAIN, {}).get(entry.entry_id)
    if coord:
        coord.force_next = True
        await coord.async_request_refresh()


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return True
