import { describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";
import { buildTriangleSvgDataUrl, getTransitVehicleIcon } from "../src/transit/motion";
import {
  advanceAlongPolylines,
  computeBearingDeg,
  extractRouteKeys,
  findActiveScheduledTrips,
  findUpcomingArrivalsForStation,
  interpolateTripPosition,
  resolveServiceDaySeconds
} from "../src/transit/schedule";

const fakeGoogleMaps = {
  Size: class {
    constructor(public width: number, public height: number) {}
  },
  Point: class {
    constructor(public x: number, public y: number) {}
  },
  SymbolPath: {
    FORWARD_CLOSED_ARROW: 1
  }
};

describe("YAML Config Fuzz & Boundary Resilience", () => {
  it("never crashes on null, primitive, empty, or wrong-typed root configs", () => {
    for (const bad of [null, undefined, "", 42, true, [], {}, [1, 2, 3]]) {
      const cfg = normalizeCardConfig(bad);
      expect(typeof cfg).toBe("object");
      expect(cfg.zoom).toBe(15);
      expect(Array.isArray(cfg.entities)).toBe(true);
      expect(Array.isArray(cfg.geojsonLayers)).toBe(true);
      expect(cfg.transitMotion.fps).toBe(30);
    }
  });

  it("coerces int vs string, ignores invalid objects, and clamps extreme/decimal/NaN numbers", () => {
    const weird = {
      api_key: 123456, // int instead of string
      zoom: 99999, // extreme number -> clamped to 24
      map_type: 99,
      center: { lat: 999, lng: -999 }, // clamped to [-90, 90] / [-180, 180]
      zones: ["not", "an", "object"],
      filter_groups: "not-valid",
      route_labels: {
        spacing: 12.5, // below min 50 -> clamped to 50
        size: 9999, // clamped to 120
        shape: "pill",
        border_width: -5 // clamped to 0
      },
      geojson_layers: [
        null,
        "bad-item",
        [],
        {
          url: 123,
          name: 410, // numeric route name
          point_size: "NaN",
          stroke_width: Infinity,
          fill_opacity: 42.5, // clamped to 1
          border_width: -10, // clamped to 0
          padding: 0.0001
        }
      ],
      transit_motion: {
        fps: 1e308, // extreme -> clamped to 60
        min_zoom: -999, // clamped to 0
        bus_min_zoom: "not-a-number",
        vehicles: { bus: 123, bad: { nested: true } },
        routes: {
          "430": {
            label: 430,
            icon_size: 1e9, // clamped to 256
            shape: "triangle",
            border_width: -3 // clamped to 0
          },
          broken: "not-an-object"
        }
      },
      entities: [
        null,
        123,
        [],
        "",
        {
          entity: 999,
          name: 42,
          icon: 777,
          icon_size: Infinity,
          border_width: -1,
          padding: 99999,
          extra_unknown_field: { deep: [1, 2, 3] }
        }
      ]
    };

    const cfg = normalizeCardConfig(weird);
    expect(cfg.apiKey).toBe("123456");
    expect(cfg.zoom).toBe(24);
    expect(cfg.center).toEqual({ lat: 90, lng: -180 });
    expect(cfg.zones).toEqual({});
    expect(cfg.geojsonLayers.length).toBe(1);
    expect(cfg.geojsonLayers[0].name).toBe("410");
    expect(cfg.geojsonLayers[0].strokeWidth).toBe(3); // Infinity rejected -> fallback 3
    expect(cfg.geojsonLayers[0].fillOpacity).toBe(1);
    expect(cfg.geojsonLayers[0].borderWidth).toBe(0);
    expect(cfg.geojsonLayers[0].labelSpacing).toBe(50);
    expect(cfg.geojsonLayers[0].labelSize).toBe(120);
    expect(cfg.geojsonLayers[0].labelBorderWidth).toBe(0);

    expect(cfg.transitMotion.fps).toBe(60);
    expect(cfg.transitMotion.minZoom).toBe(0);
    expect(cfg.transitMotion.busMinZoom).toBeNull();
    expect(cfg.transitMotion.routes["430"].label).toBe("430");
    expect(cfg.transitMotion.routes["430"].iconSize).toBe(256);
    expect(cfg.transitMotion.routes["430"].shape).toBe("triangle");
    expect(cfg.transitMotion.routes.broken).toBe(undefined);

    expect(cfg.entities.length).toBe(1);
    expect(cfg.entities[0].entityId).toBe("999");
    expect(cfg.entities[0].icon).toBe("777");
    expect(cfg.entities[0].iconSize).toBe(undefined);
    expect(cfg.entities[0].borderWidth).toBe(0);
    expect(cfg.entities[0].picturePadding).toBe(128);
  });
});

describe("Malformed GTFS Schedule & GeoJSON Resilience", () => {
  it("handles malformed schedules, out-of-bounds profileIdx, NaN coords, and non-TransLink service_ids", () => {
    const badSchedule: any = {
      profiles: [
        null,
        { h: "Empty", pts: [] },
        { h: "BadCoords", pts: [[0, NaN, -123], [60, 999, -123]] },
        { h: "Valid", pts: [[0, 49.28, -123.12], [60, 49.27, -123.12]] }
      ],
      trips: {
        metro_a: {
          WEEKDAY: [
            "bad-tuple",
            [28800, 999], // out of bounds profileIdx
            [28800, 0], // null profile
            [28800, 2], // invalid coords
            [28800, 3] // valid!
          ]
        }
      },
      service_ids: {
        weekday: ["WEEKDAY"],
        saturday: ["SAT"],
        sunday: ["SUN"]
      },
      routes: {
        metro_a: { label: "Metro A", color: "#E53935", routeType: 1 }
      }
    };

    const monMorning = new Date(2026, 10, 23, 8, 0, 30); // Monday 08:00:30
    const active = findActiveScheduledTrips(badSchedule, monMorning);
    expect(active.length).toBe(1);
    expect(active[0].lineKey).toBe("metro_a");

    const pos = interpolateTripPosition(active[0].profile.pts, 30);
    expect(pos).not.toBeNull();
    expect(pos!.bearing).toBeCloseTo(180, 0); // Moving South

    expect(interpolateTripPosition([[0, NaN, 0], [10, 49, -123]] as any, 5)).toBeNull();
    expect(findActiveScheduledTrips({ profiles: "bad", trips: [] } as any, monMorning)).toEqual([]);
    expect(findUpcomingArrivalsForStation(badSchedule, NaN, -123, monMorning)).toEqual([]);
    expect(advanceAlongPolylines([], 49.2, -123.1, 10)).toBeNull();
  });

  it("computes bearings and directional triangle icons for any city route", () => {
    expect(computeBearingDeg(49.0, -123.0, 49.1, -123.0)).toBeCloseTo(0, 1); // North
    expect(computeBearingDeg(49.0, -123.0, 49.0, -122.9)).toBeCloseTo(90, 1); // East

    const cfg = normalizeCardConfig({
      api_key: "test",
      transit_motion: {
        shape: "triangle",
        routes: {
          red_line: { color: "#D32F2F", icon_size: 24 }
        }
      }
    });
    const icon = getTransitVehicleIcon(fakeGoogleMaps, "red_line", cfg.transitMotion, "subway", undefined, undefined, 135);
    expect(icon.path).toBe(1);
    expect(icon.fillColor).toBe("#D32F2F");
    expect(icon.rotation).toBe(135);

    const triSvg = buildTriangleSvgDataUrl({ size: 24, fillColor: "#D32F2F" });
    expect(decodeURIComponent(triSvg)).toContain("<polygon points='12,2 21,21 12,17 3,21'");

    expect(extractRouteKeys("/local/gtfs2/metro_yamanote.geojson")).toContain("yamanote");
  });

  it("respects fractional rolloverHour precisely (03:45 AM is not rolled into yesterday for 3.5)", () => {
    const at315 = new Date(2026, 10, 24, 3, 15, 0);
    const at345 = new Date(2026, 10, 24, 3, 45, 0);
    expect(resolveServiceDaySeconds(at315, { rolloverHour: 3.5 })).toBeGreaterThan(86400);
    expect(resolveServiceDaySeconds(at345, { rolloverHour: 3.5 }) < 86400).toBe(true);
  });
});
