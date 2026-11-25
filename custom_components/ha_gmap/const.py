"""Constants for the HA GMap Card & GTFS Transit integration."""

DOMAIN = "ha_gmap"
VERSION = "1.1.0"

FRONTEND_SCRIPT_URL = f"/ha_gmap/ha-gmap-card.js?v={VERSION}"

CONF_SOURCE = "source"
CONF_OUTPUT_DIR = "output_dir"
CONF_ROUTE_TYPES = "route_types"
CONF_ROUTE_FILTER = "route_filter"
CONF_SCAN_INTERVAL_HOURS = "scan_interval_hours"

DEFAULT_OUTPUT_DIR = "gtfs2"
DEFAULT_ROUTE_TYPES = ["0", "1", "2", "4"]
DEFAULT_SCAN_INTERVAL_HOURS = 6

ROUTE_TYPE_LABELS = {
    "0": "Tram / Streetcar / Light Rail (0)",
    "1": "Subway / Metro (1)",
    "2": "Rail / Commuter Rail (2)",
    "3": "Bus (3)",
    "4": "Ferry (4)",
    "5": "Cable Tram (5)",
    "6": "Aerial Lift (6)",
    "7": "Funicular (7)",
    "11": "Trolleybus (11)",
    "12": "Monorail (12)",
}
