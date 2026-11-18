# ha-gmap-card

High-performance, clean-room TypeScript Google Maps card for Home Assistant Lovelace dashboards.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- **Ultra Lightweight (~85 KB minified / ~26 KB gzip)**: Clean-room TypeScript Lit element built from scratch, eliminating legacy 2+ MB bundle bloat.
- **Modern Maps JavaScript API**: Pure `loading=async` dynamic loader, one WebGL/map instance per card with incremental `setConfig` updates on `auto-entities` churn.
- **Non-Sticky Initial Centering**: Configure `center: zone.home`, `zoom`, `follow_by_default: false`, and `fit_entities: false` so the map opens focused at your home without continuously snapping back.
- **Universal Marker Shapes & Entity Badges**: Supports `marker_type` (`circle`, `icon`, `picture`, `rectangle`, `square`, `auto`), `show_icon`, `picture_shape`, `picture_attribute` dot-notation extraction, `min_zoom`, `border_width`, and `border_color`, using `AdvancedMarkerElement` (when `map_id` is set) or lightweight `OverlayView` DOM markers (raster/no-`map_id` mode).
- **City-Agnostic GTFS2 Transit Motion**: 30 fps scheduled track interpolation + live bus route-polyline dead-reckoning with configurable `transit_motion.schedule_url`, `min_zoom`, `bus_min_zoom`, `bus_match`, `vehicles`, and per-route `routes` (`label`, `icon`, `color`, `enabled`).
- **GeoJSON Routes & Custom Station Icons**: Supports per-layer `name`/`label`, `station_icon`, `stop_icon`, stroke styling, and click popups.
- **Layer & Group Filtering**: Frosted-glass dropdown filter control supporting object or array `filter_groups`.
- **Flexible Popups**: Supports HTML & inline-CSS `popup_template` evaluation via `render_template` (including mixed Markdown + inline-styled HTML without stripping styles) and embedded Lovelace cards via `popup_card` (with `this.entity_id` substitution and `popup_max_width`).
- **Visual Editor & Backward Compatibility**: Built-in `<ha-gmap-card-editor>` while preserving custom YAML keys and legacy `google-map-card` option aliases.

## Installation

### HACS (Recommended)
1. Add this repository as a Custom Repository in HACS: `https://github.com/l3enjamin/ha-gmap-card` (Type: Dashboard).
2. Install **Google Maps Card (Clean)**.
3. Ensure the dashboard resource points to `/local/community/ha-gmap-card/ha-gmap-card.js` (`type: module`).

### Manual
1. Copy `dist/ha-gmap-card.js` to `config/www/ha-gmap-card.js`.
2. Add resource in Dashboard settings or YAML:
   ```yaml
   resources:
     - url: /local/ha-gmap-card.js
       type: module
   ```

## Example Configuration

```yaml
type: custom:ha-gmap-card
api_key: !secret google_maps_api_key
center: zone.home
zoom: 16
follow_by_default: false
fit_entities: false
color_scheme: follow_system
layer_filters:
  enabled: true
  position: TOP_RIGHT
filter_groups:
  routes:
    name: "Routes"
    icon: "mdi:transit-connection-variant"
  vehicles:
    name: "Vehicles"
    icon: "mdi:train-car"
  stops:
    name: "Stops"
    icon: "mdi:bus-stop"
  gas:
    name: "Gas Stations"
    icon: "mdi:gas-station"
geojson_layers:
  - url: /local/gtfs2/skytrain_canada_line.geojson
    name: "Canada Line"
    station_icon: /local/translink/can-line.svg
    stroke_color: "#0097A9"
    stroke_width: 8
    filter_group: routes
transit_motion:
  fps: 30
  min_zoom: 13
  bus_min_zoom: 13
  schedule_url: /local/gtfs2/transit_schedule.json
  filter_group: vehicles
  vehicles:
    bus: /local/translink/bus.svg
    subway: mdi:subway-variant
  routes:
    canada:
      label: "Canada Line"
      icon: /local/translink/can-line.svg
      color: "#0097A9"
entities:
  - entity_id: zone.home
    picture: /local/luxe.svg
    follow: false
  - entity_id: sensor.bus_stop_1
    filter_group: stops
    marker_type: circle
    icon_size: 8
    min_zoom: 14
    background_color: "#1E88E5"
    border_width: 1
    border_color: "#ffffff"
    popup_max_width: 400
  - entity_id: sensor.cheapest_gas_regular_gas
    icon_size: 40
    filter_group: gas
    popup_max_width: 440
    popup_card:
      type: custom:mini-graph-card
      hours_to_show: 168
      entities:
        - entity: this.entity_id
          name: Station Price
        - entity: sensor.cheapest_gas_regular_gas
          name: Lowest in City
```

## License

MIT
