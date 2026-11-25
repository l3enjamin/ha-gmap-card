"""Config flow and Options flow for HA GMap Card & GTFS Transit."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import selector
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
    ROUTE_TYPE_LABELS,
)
from .gtfs_exporter import discover_routes_from_source


def _discover_local_gtfs_sources(hass) -> list[str]:
    """Find local .zip and .sqlite GTFS feeds under config/gtfs2 or config/www."""
    found: list[str] = []
    for folder in ("gtfs2", "www/gtfs2"):
        p = Path(hass.config.path(folder))
        if p.is_dir():
            for child in sorted(p.iterdir()):
                if child.is_file() and child.suffix.lower() in (".zip", ".sqlite", ".db"):
                    found.append(str(child.relative_to(Path(hass.config.path()))))
    return found


def _route_type_options() -> list[selector.SelectOptionDict]:
    return [selector.SelectOptionDict(value=k, label=v) for k, v in ROUTE_TYPE_LABELS.items()]


class HaGmapConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for HA GMap Card & GTFS Transit."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: config_entries.ConfigEntry) -> HaGmapOptionsFlow:
        return HaGmapOptionsFlow()

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        errors: dict[str, str] = {}
        local_sources = await self.hass.async_add_executor_job(_discover_local_gtfs_sources, self.hass)

        if user_input is not None:
            src = str(user_input.get(CONF_SOURCE, "")).strip()
            if not src:
                errors["base"] = "cannot_connect"
            elif not src.startswith(("http://", "https://")):
                p = Path(src) if Path(src).is_absolute() else Path(self.hass.config.path(src))
                exists = await self.hass.async_add_executor_job(p.exists)
                if not exists:
                    errors["base"] = "cannot_connect"

            if not errors:
                title = Path(src).name if not src.startswith(("http://", "https://")) else src.split("/")[-1] or "GTFS Feed"
                return self.async_create_entry(title=f"GTFS Map ({title})", data=user_input)

        source_selector = selector.SelectSelector(
            selector.SelectSelectorConfig(
                options=[selector.SelectOptionDict(value=s, label=s) for s in local_sources],
                multiple=False,
                custom_value=True,
                mode=selector.SelectSelectorMode.DROPDOWN,
            )
        )

        schema = vol.Schema(
            {
                vol.Required(CONF_SOURCE, default=local_sources[0] if local_sources else ""): source_selector,
                vol.Required(CONF_OUTPUT_DIR, default=DEFAULT_OUTPUT_DIR): str,
                vol.Required(CONF_ROUTE_TYPES, default=DEFAULT_ROUTE_TYPES): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=_route_type_options(),
                        multiple=True,
                        custom_value=True,
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Optional(CONF_SCAN_INTERVAL_HOURS, default=DEFAULT_SCAN_INTERVAL_HOURS): vol.All(
                    vol.Coerce(int), vol.Range(min=1, max=168)
                ),
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)


class HaGmapOptionsFlow(config_entries.OptionsFlow):
    """Handle options for HA GMap Card & GTFS Transit."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None):
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        cfg = {**self.config_entry.data, **self.config_entry.options}
        src = str(cfg.get(CONF_SOURCE, "")).strip()
        discovered_routes: list[dict[str, str]] = []
        if src and not src.startswith(("http://", "https://")):
            p = Path(src) if Path(src).is_absolute() else Path(self.hass.config.path(src))
            discovered_routes = await self.hass.async_add_executor_job(discover_routes_from_source, str(p))

        route_options = [
            selector.SelectOptionDict(value=r["id"], label=f"{r['label']} (type {r['route_type']})")
            for r in discovered_routes[:200]
        ]

        schema = vol.Schema(
            {
                vol.Required(CONF_SOURCE, default=src): str,
                vol.Required(CONF_OUTPUT_DIR, default=cfg.get(CONF_OUTPUT_DIR, DEFAULT_OUTPUT_DIR)): str,
                vol.Required(CONF_ROUTE_TYPES, default=cfg.get(CONF_ROUTE_TYPES, DEFAULT_ROUTE_TYPES)): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=_route_type_options(),
                        multiple=True,
                        custom_value=True,
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Optional(CONF_ROUTE_FILTER, default=cfg.get(CONF_ROUTE_FILTER, [])): selector.SelectSelector(
                    selector.SelectSelectorConfig(
                        options=route_options,
                        multiple=True,
                        custom_value=True,
                        mode=selector.SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Optional(
                    CONF_SCAN_INTERVAL_HOURS,
                    default=cfg.get(CONF_SCAN_INTERVAL_HOURS, DEFAULT_SCAN_INTERVAL_HOURS),
                ): vol.All(vol.Coerce(int), vol.Range(min=1, max=168)),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
