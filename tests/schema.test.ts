import { describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";

describe("Card Config Normalization & Aliasing", () => {
  it("normalizes basic config with sensible defaults", () => {
    const raw = {
      type: "custom:ha-gmap-card",
      api_key: "AIzaTestKey123"
    };
    const cfg = normalizeCardConfig(raw);
    expect(cfg.apiKey).toBe("AIzaTestKey123");
    expect(cfg.zoom).toBe(15);
    expect(cfg.mapType).toBe("roadmap");
    expect(cfg.colorScheme).toBe("follow_system");
  });

  it("aliases old snake_case and legacy card keys correctly", () => {
    const legacy = {
      type: "custom:google-map-card",
      api_key: "AIzaTestKey123",
      map_type: "satellite",
      gesture_handling: "greedy",
      show_traffic: true,
      color_scheme: "dark",
      layer_filters: {
        enabled: true,
        position: "TOP_LEFT"
      },
      geojson_layers: [
        {
          url: "/local/route.geojson",
          stroke_color: "#ff0000",
          stroke_width: 6,
          filter_group: "routes"
        }
      ],
      entities: [
        {
          entity_id: "device_tracker.phone",
          show_name: false,
          icon_size: 32,
          picture_border_radius: 8,
          popup_template: "Hello {{ state }}"
        }
      ]
    };

    const cfg = normalizeCardConfig(legacy);
    expect(cfg.apiKey).toBe("AIzaTestKey123");
    expect(cfg.mapType).toBe("satellite");
    expect(cfg.gestureHandling).toBe("greedy");
    expect(cfg.showTraffic).toBe(true);
    expect(cfg.colorScheme).toBe("dark");
    expect(cfg.layerFilters.enabled).toBe(true);
    expect(cfg.layerFilters.position).toBe("TOP_LEFT");
    expect(cfg.geojsonLayers[0].strokeColor).toBe("#ff0000");
    expect(cfg.geojsonLayers[0].strokeWidth).toBe(6);
    expect(cfg.geojsonLayers[0].filterGroup).toBe("routes");
    expect(cfg.entities[0].entityId).toBe("device_tracker.phone");
    expect(cfg.entities[0].showName).toBe(false);
    expect(cfg.entities[0].iconSize).toBe(32);
    expect(cfg.entities[0].pictureBorderRadius).toBe(8);
    expect(cfg.entities[0].popupTemplate).toBe("Hello {{ state }}");
  });

  it("normalizes nested auto-entities options, marker shapes, zoom rules, and transit routes", () => {
    const raw = {
      type: "custom:ha-gmap-card",
      api_key: "AIzaTestKey123",
      center: "zone.home",
      zoom: 16,
      follow_by_default: false,
      fit_entities: false,
      zones: { "zone.home": { show: true, follow: false } },
      show_traffic_button: true,
      show_traffic_button_position: "TOP_LEFT",
      show_recenter_button: true,
      show_recenter_button_position: "RIGHT_BOTTOM",
      zoomControl: true,
      zoomControl_position: "RIGHT_CENTER",
      cameraControl: true,
      cameraControl_position: "LEFT_BOTTOM",
      rotateControl: true,
      mapTypeControl: true,
      hide_map_links: true,
      filter_groups: [
        { id: "routes", label: "Routes", icon: "mdi:routes", checked: true, color: "#0097A9" },
        { id: "stops", name: "Stops", icon: "mdi:bus-stop", default: false }
      ],
      geojson_layers: [
        {
          url: "/local/gtfs2/skytrain_canada_line.geojson",
          name: "Canada Line",
          label: "Canada Line",
          route_key: "canada",
          station_icon: "/local/translink/can-line.svg",
          stop_icon: "/local/stop.svg",
          station_size: 22,
          stop_icon_size: 12,
          color: "#0097A9",
          width: 8,
          group: "routes"
        }
      ],
      transit_motion: {
        fps: 30,
        min_zoom: 13,
        bus_min_zoom: 14,
        bus_match: "geo_location.*_bus",
        schedule_url: "/local/gtfs2/transit_schedule.json",
        group: "transit_live",
        vehicles: {
          bus: "/local/translink/bus.svg",
          subway: "mdi:subway-variant"
        },
        routes: {
          canada: {
            label: "Canada Line",
            icon: "/local/translink/can-line.svg",
            color: "#0097A9",
            icon_size: 28,
            enabled: true
          }
        }
      },
      entities: [
        {
          entity_id: "sensor.departures_from_home*",
          name: "/^(?!.*Platform).*$/",
          options: {
            name: "Bus Stop",
            marker_type: "circle",
            show_icon: false,
            icon_size: 8,
            min_zoom: 14,
            background_color: "#1E88E5",
            border_width: 1,
            border_color: "#ffffff",
            group: "stations",
            popup_max_width: 400
          }
        },
        {
          entity: "sensor.flipp_deals_walmart",
          picture_attribute: "deals.0.image_url",
          picture_aspect: "auto",
          card_background: "#ffffff",
          follow: false,
          transit_type: "deal"
        }
      ]
    };

    const cfg = normalizeCardConfig(raw);
    expect(cfg.center).toBe("zone.home");
    expect(cfg.followByDefault).toBe(false);
    expect(cfg.fitEntities).toBe(false);
    expect(cfg.zones["zone.home"]).toEqual({ show: true, follow: false });
    expect(cfg.showTrafficButtonPosition).toBe("TOP_LEFT");
    expect(cfg.showRecenterButton).toBe(true);
    expect(cfg.showRecenterButtonPosition).toBe("RIGHT_BOTTOM");
    expect(cfg.zoomControl).toBe(true);
    expect(cfg.zoomControlPosition).toBe("RIGHT_CENTER");
    expect(cfg.cameraControl).toBe(true);
    expect(cfg.cameraControlPosition).toBe("LEFT_BOTTOM");
    expect(cfg.rotateControl).toBe(true);
    expect(cfg.mapTypeControl).toBe(true);
    expect(cfg.hideMapLinks).toBe(true);

    expect(cfg.filterGroups.routes).toEqual({
      name: "Routes",
      icon: "mdi:routes",
      color: "#0097A9",
      default: true,
      position: "TOP_RIGHT"
    });
    expect(cfg.filterGroups.stops.default).toBe(false);

    expect(cfg.geojsonLayers[0]).toMatchObject({
      url: "/local/gtfs2/skytrain_canada_line.geojson",
      name: "Canada Line",
      label: "Canada Line",
      routeKey: "canada",
      stationIcon: "/local/translink/can-line.svg",
      stopIcon: "/local/stop.svg",
      stationSize: 22,
      stopSize: 12,
      strokeColor: "#0097A9",
      strokeWidth: 8,
      filterGroup: "routes"
    });

    expect(cfg.transitMotion).toMatchObject({
      enabled: true,
      fps: 30,
      minZoom: 13,
      busMinZoom: 14,
      busMatch: ["geo_location.*_bus"],
      scheduleUrl: "/local/gtfs2/transit_schedule.json",
      filterGroup: "transit_live",
      vehicles: {
        bus: "/local/translink/bus.svg",
        subway: "mdi:subway-variant"
      },
      routes: {
        canada: {
          label: "Canada Line",
          icon: "/local/translink/can-line.svg",
          color: "#0097A9",
          iconSize: 28,
          enabled: true
        }
      }
    });

    expect(cfg.entities[0]).toMatchObject({
      entityId: "sensor.departures_from_home*",
      name: "Bus Stop",
      nameFilter: "/^(?!.*Platform).*$/",
      markerType: "circle",
      showIcon: false,
      iconSize: 8,
      minZoom: 14,
      backgroundColor: "#1E88E5",
      borderWidth: 1,
      borderColor: "#ffffff",
      filterGroup: "stations",
      popupMaxWidth: 400
    });

    expect(cfg.entities[1]).toMatchObject({
      entityId: "sensor.flipp_deals_walmart",
      pictureAttribute: "deals.0.image_url",
      pictureShape: "auto",
      backgroundColor: "#ffffff",
      follow: false,
      transitType: "deal"
    });
  });
});
