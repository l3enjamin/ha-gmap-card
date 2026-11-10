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
});
