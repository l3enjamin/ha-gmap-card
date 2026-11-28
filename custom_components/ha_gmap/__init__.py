"""HA GMap Card & GTFS Transit integration."""

from __future__ import annotations

from datetime import timedelta
import json
import logging
import os
from pathlib import Path
from typing import Any

import aiohttp
from homeassistant.components import websocket_api
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
import voluptuous as vol

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
from .gtfs_exporter import GtfsExportResult, discover_routes_from_source, export_gtfs

_LOGGER = logging.getLogger(__name__)


def _collect_sources_and_existing(hass: HomeAssistant, output_slug: str) -> dict[str, Any]:
    """Scan local GTFS sources and inspect any existing schedule/GeoJSON exports."""
    cfg_root = Path(hass.config.path()).resolve()
    www_root = Path(hass.config.path("www")).resolve()
    sources: list[dict[str, Any]] = []
    seen: set[str] = set()
    for folder in ("gtfs2", "www/gtfs2"):
        p = Path(hass.config.path(folder))
        if p.is_dir():
            for child in sorted(p.iterdir()):
                if child.is_file() and child.suffix.lower() in (".zip", ".sqlite", ".db"):
                    rel = str(child.relative_to(cfg_root))
                    if rel in seen:
                        continue
                    seen.add(rel)
                    st = child.stat()
                    sources.append(
                        {
                            "path": rel,
                            "name": child.name,
                            "size_bytes": st.st_size,
                            "mtime": int(st.st_mtime),
                        }
                    )

    existing_routes: dict[str, dict[str, Any]] = {}
    existing_geojson_files: list[str] = []
    existing_schedule_url: str | None = None
    out_dir = (www_root / output_slug).resolve()
    if out_dir.is_relative_to(www_root) and out_dir.is_dir():
        existing_geojson_files = sorted(f"/local/{output_slug}/{f.name}" for f in out_dir.glob("*.geojson"))
        sched_file = out_dir / "transit_schedule.json"
        if sched_file.exists():
            existing_schedule_url = f"/local/{output_slug}/transit_schedule.json"
            try:
                data = json.loads(sched_file.read_text(encoding="utf-8"))
                routes_dict = data.get("routes") if isinstance(data.get("routes"), dict) else {}
                trips_dict = data.get("trips") if isinstance(data.get("trips"), dict) else {}
                for lk, meta in routes_dict.items():
                    if isinstance(meta, dict):
                        existing_routes[lk] = dict(meta)
                for lk in trips_dict:
                    if lk not in existing_routes:
                        gj_file = out_dir / f"route_{lk}.geojson"
                        existing_routes[lk] = {
                            "label": str(lk),
                            "shortName": str(lk),
                            "color": "#007aff",
                            "routeType": 3 if str(lk).isdigit() else 1,
                            "geojsonUrl": f"/local/{output_slug}/route_{lk}.geojson" if gj_file.exists() else "",
                        }
            except (OSError, ValueError):
                pass

    return {
        "sources": sources,
        "output_dir": output_slug,
        "existing_schedule_url": existing_schedule_url,
        "existing_routes": existing_routes,
        "existing_geojson_files": existing_geojson_files,
    }


async def _resolve_ws_source(hass: HomeAssistant, source: str) -> tuple[str | None, str | None, str | None]:
    """Validate local GTFS path inside HA config dir or cache remote HTTP .zip in .storage."""
    src = source.strip()
    if not src:
        return (None, "invalid_source", "GTFS source path or URL is required.")

    if src.startswith(("http://", "https://")):
        cache_zip = Path(hass.config.path(".storage", f"{DOMAIN}_ws_cache.zip"))
        session = async_get_clientsession(hass)
        try:
            async with session.get(src, timeout=aiohttp.ClientTimeout(total=120)) as resp:
                if resp.status >= 400:
                    return (None, "download_failed", f"HTTP {resp.status} downloading GTFS feed.")
                raw = await resp.read()
        except aiohttp.ClientError as err:
            return (None, "download_failed", f"Error downloading GTFS feed: {err}")

        def _write_cache() -> str:
            cache_zip.parent.mkdir(parents=True, exist_ok=True)
            cache_zip.write_bytes(raw)
            return str(cache_zip)

        resolved_path = await hass.async_add_executor_job(_write_cache)
        return (resolved_path, None, None)

    cfg_root = Path(hass.config.path()).resolve()
    raw_p = Path(src)
    resolved = raw_p.resolve() if raw_p.is_absolute() else (cfg_root / raw_p).resolve()
    if not resolved.is_relative_to(cfg_root):
        return (None, "invalid_path", f"Source must reside inside HA config folder: {src}")
    exists = await hass.async_add_executor_job(resolved.is_file)
    if not exists:
        return (None, "not_found", f"GTFS source file not found: {src}")
    return (str(resolved), None, None)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/list_sources",
        vol.Optional("output_dir", default=DEFAULT_OUTPUT_DIR): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_ha_gmap_list_sources(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """List local GTFS feeds and existing exported routes."""
    slug = str(msg.get("output_dir") or DEFAULT_OUTPUT_DIR).strip().strip("/") or DEFAULT_OUTPUT_DIR
    payload = await hass.async_add_executor_job(_collect_sources_and_existing, hass, slug)
    connection.send_result(msg["id"], payload)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/list_routes",
        vol.Required("source"): str,
        vol.Optional("query", default=""): str,
        vol.Optional("route_types", default=[]): [str],
        vol.Optional("limit", default=250): vol.All(vol.Coerce(int), vol.Range(min=1, max=1000)),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_ha_gmap_list_routes(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Discover and filter routes inside a local or remote GTFS source."""
    resolved, err_code, err_msg = await _resolve_ws_source(hass, str(msg["source"]))
    if err_code or not resolved:
        connection.send_error(msg["id"], err_code or "invalid_source", err_msg or "Invalid GTFS source.")
        return

    all_routes = await hass.async_add_executor_job(discover_routes_from_source, resolved)
    type_filter = {str(t).strip() for t in (msg.get("route_types") or []) if str(t).strip()}
    q = str(msg.get("query") or "").strip().lower()
    limit = int(msg.get("limit", 250))

    filtered = []
    for r in all_routes:
        if type_filter and str(r.get("route_type", "")) not in type_filter:
            continue
        if q:
            hay = " ".join(
                (r.get("id", ""), r.get("short_name", ""), r.get("long_name", ""), r.get("label", ""))
            ).lower()
            if q not in hay:
                continue
        filtered.append(r)

    connection.send_result(msg["id"], {"total": len(filtered), "routes": filtered[:limit]})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/export",
        vol.Required("source"): str,
        vol.Optional("output_dir", default=DEFAULT_OUTPUT_DIR): str,
        vol.Optional("route_types", default=[]): [str],
        vol.Optional("route_filter", default=[]): [str],
        vol.Optional("merge_existing", default=True): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_ha_gmap_export(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Export selected GTFS routes into www/<output_dir>/ and return route metadata."""
    resolved, err_code, err_msg = await _resolve_ws_source(hass, str(msg["source"]))
    if err_code or not resolved:
        connection.send_error(msg["id"], err_code or "invalid_source", err_msg or "Invalid GTFS source.")
        return

    www_root = Path(hass.config.path("www")).resolve()
    slug = str(msg.get("output_dir") or DEFAULT_OUTPUT_DIR).strip().strip("/") or DEFAULT_OUTPUT_DIR
    output_dir = (www_root / slug).resolve()
    if not output_dir.is_relative_to(www_root):
        connection.send_error(msg["id"], "invalid_path", f"Invalid output_dir outside www/: {slug}")
        return

    url_prefix = f"/local/{slug}"
    route_types = [str(t) for t in (msg.get("route_types") or [])]
    route_filter = [str(r) for r in (msg.get("route_filter") or [])]
    merge_existing = bool(msg.get("merge_existing", True))

    res = await hass.async_add_executor_job(
        export_gtfs,
        resolved,
        str(output_dir),
        route_types,
        route_filter,
        url_prefix,
        merge_existing,
    )
    connection.send_result(
        msg["id"],
        {
            "routes_exported": res.routes_exported,
            "profiles_count": res.profiles_count,
            "trips_count": res.trips_count,
            "schedule_url": f"{url_prefix}/transit_schedule.json",
            "geojson_paths": [f"{url_prefix}/{Path(gp).name}" for gp in res.geojson_paths],
            "routes": res.routes_meta,
            "warnings": res.warnings,
        },
    )


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Register the bundled ha-gmap-card.js static path, Lovelace module URL, and WS API."""
    frontend_dir = Path(__file__).parent / "frontend"
    card_file = frontend_dir / "ha-gmap-card.js"
    if card_file.exists():
        mtime = int(card_file.stat().st_mtime)
        await hass.http.async_register_static_paths(
            [StaticPathConfig("/ha_gmap/ha-gmap-card.js", str(card_file), cache_headers=True)]
        )
        add_extra_js_url(hass, f"/ha_gmap/ha-gmap-card.js?v={mtime}")
    else:
        _LOGGER.warning("Bundled ha-gmap-card.js not found at %s", card_file)

    hass.data.setdefault(DOMAIN, {})
    if not hass.data[DOMAIN].get("ws_registered"):
        websocket_api.async_register_command(hass, ws_ha_gmap_list_sources)
        websocket_api.async_register_command(hass, ws_ha_gmap_list_routes)
        websocket_api.async_register_command(hass, ws_ha_gmap_export)
        hass.data[DOMAIN]["ws_registered"] = True

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

        www_root = Path(self.hass.config.path("www")).resolve()
        output_dir = (www_root / output_slug).resolve()
        if not output_dir.is_relative_to(www_root):
            raise UpdateFailed(f"Invalid output_dir outside www/: {output_slug}")
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
                    new_etag = resp.headers.get("ETag")
            except aiohttp.ClientError as err:
                raise UpdateFailed(f"Error downloading GTFS feed: {err}") from err

            def _write_and_export() -> GtfsExportResult:
                cache_zip.parent.mkdir(parents=True, exist_ok=True)
                cache_zip.write_bytes(data)
                return export_gtfs(str(cache_zip), str(output_dir), route_types, route_filter, url_prefix)

            res = await self.hass.async_add_executor_job(_write_and_export)
            self._last_etag = new_etag
            self.force_next = False
            return res

        # Local .zip or .sqlite file
        local_path = Path(source)
        if not local_path.is_absolute():
            local_path = Path(self.hass.config.path(source))

        def _stat_local() -> tuple[bool, float | None, bool]:
            if not local_path.exists():
                return (False, None, False)
            return (True, os.path.getmtime(local_path), (output_dir / "transit_schedule.json").exists())

        exists, cur_mtime, has_schedule = await self.hass.async_add_executor_job(_stat_local)
        if not exists:
            raise UpdateFailed(f"GTFS file not found: {local_path}")
        if not self.force_next and self._last_mtime == cur_mtime and has_schedule:
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
        cfg = {**entry.data, **entry.options}
        hours = max(1, int(cfg.get(CONF_SCAN_INTERVAL_HOURS, DEFAULT_SCAN_INTERVAL_HOURS)))
        coord.update_interval = timedelta(hours=hours)
        coord.force_next = True
        await coord.async_request_refresh()


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return True
