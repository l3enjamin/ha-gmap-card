# ha-gmap-card

High-performance, modern Google Maps card for Home Assistant Lovelace dashboards.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/default)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features

- **Ultra Lightweight (~50 KB)**: Clean-room TypeScript Lit element built from scratch, eliminating legacy 2+ MB bundle bloat.
- **Modern Maps JavaScript API**: Pure `loading=async` dynamic loader, zero deprecation notices, one WebGL context per card.
- **Vector & AdvancedMarkerElement**: Full native Google Maps vector engine support with customizable DOM-based markers, icons, and contrast borders.
- **Layer & Group Filtering**: Native top/bottom chip controls for toggling routes, vehicles, transit stops, stores, gas stations, etc.
- **SkyTrain & Bus Transit Kinematics**: 24/7 smooth schedule interpolation along track vertices with automatic post-midnight service-day resolution.
- **Flexible Popups**: Native InfoWindow popups supporting Jinja2 template rendering (`popup_template`) and embedded Lovelace cards (`popup_card`).
- **Backward Compatible**: Compatible with existing `google-map-card` configuration options.

## Installation

### HACS (Recommended)
1. Add this repository as a Custom Repository in HACS: `https://github.com/l3enjamin/ha-gmap-card` (Type: Dashboard).
2. Install **Google Maps Card (Modern)**.
3. Add the resource to your Lovelace resources if not automatically added:
   ```yaml
   url: /local/ha-gmap-card.js
   type: module
   ```

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
map_id: YOUR_MAP_ID # Optional: enables vector map features
zoom: 15
color_scheme: follow_system
layer_filters:
  enabled: true
  position: TOP_RIGHT
filter_groups:
  routes:
    name: "路線"
    icon: "mdi:transit-connection-variant"
  vehicles:
    name: "定位"
    icon: "mdi:train-car"
  gas:
    name: "油站"
    icon: "mdi:gas-station"
geojson_layers:
  - url: /local/gtfs2/skytrain_canada_line.geojson
    stroke_color: "#0097A9"
    stroke_width: 6
    filter_group: routes
entities:
  - entity_id: sensor.cheapest_gas_regular_gas
    icon_size: 40
    filter_group: gas
    popup_template: |
      ### {{ attributes.friendly_name }}
      **Price:** {{ state }} {{ attributes.unit_of_measurement }}
```

## License

MIT
