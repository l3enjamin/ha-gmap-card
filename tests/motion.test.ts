import { afterEach, describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";
import {
  buildSvgBadgeDataUrl,
  GENERIC_BUS_SVG,
  getTransitVehicleIcon,
  resolveCustomSvgBadgeDataUrl,
  TransitMotionEngine
} from "../src/transit/motion";

const fakeGoogleMaps = {
  Size: class {
    constructor(public width: number, public height: number) {}
  },
  Point: class {
    constructor(public x: number, public y: number) {}
  },
  LatLng: class {
    constructor(public latVal: number, public lngVal: number) {}
    lat() {
      return this.latVal;
    }
    lng() {
      return this.lngVal;
    }
  },
  Marker: class {
    public visible = true;
    public map: any = null;
    constructor(opts: any) {
      this.map = opts.map;
      this.visible = opts.visible ?? true;
    }
    setVisible(v: boolean) {
      this.visible = v;
    }
    getVisible() {
      return this.visible;
    }
    setMap(m: any) {
      this.map = m;
    }
    getMap() {
      return this.map;
    }
    setPosition() {}
  }
};

function makeFakeMarker() {
  return {
    visible: true,
    setVisible(v: boolean) {
      this.visible = v;
    },
    getVisible() {
      return this.visible;
    },
    getPosition() {
      return { lat: () => 49.17, lng: () => -123.13 };
    }
  };
}

let activeEngine: TransitMotionEngine | null = null;

afterEach(() => {
  if (activeEngine) {
    activeEngine.destroy();
    activeEngine = null;
  }
});

describe("TransitMotionEngine & Icon Resolution", () => {
  it("resolves route-specific icons, bus icons, and generic SVG fallbacks", () => {
    const cfg = normalizeCardConfig({
      api_key: "test",
      transit_motion: {
        schedule_url: "",
        vehicles: {
          bus: "/local/translink/bus.svg"
        },
        routes: {
          canada: {
            label: "Canada Line",
            icon: "/local/translink/can-line.svg",
            icon_size: 28
          }
        }
      }
    });

    const canadaIcon = getTransitVehicleIcon(fakeGoogleMaps, "canada", cfg.transitMotion, "subway");
    expect(canadaIcon.url).toBe("/local/translink/can-line.svg");
    expect(canadaIcon.scaledSize.width).toBe(28);

    const busIcon = getTransitVehicleIcon(fakeGoogleMaps, "410", cfg.transitMotion, "bus");
    expect(busIcon.url).toBe("/local/translink/bus.svg");

    const fallbackCfg = normalizeCardConfig({ api_key: "test" });
    const genericBus = getTransitVehicleIcon(fakeGoogleMaps, "unknown", fallbackCfg.transitMotion, "bus");
    expect(genericBus.url).toBe(GENERIC_BUS_SVG);

    const cliCfg = normalizeCardConfig({
      api_key: "test",
      transit_motion: {
        schedule_url: "",
        vehicles: { bus: "cli:translink-bus" },
        routes: { canada: { icon: "cli:translink-canada" } }
      }
    });
    expect(getTransitVehicleIcon(fakeGoogleMaps, "canada", cliCfg.transitMotion, "subway").url).toBe(
      "/custom_local_icons/icons/translink-canada.svg"
    );
    expect(getTransitVehicleIcon(fakeGoogleMaps, "410", cliCfg.transitMotion, "bus").url).toBe(
      "/custom_local_icons/icons/translink-bus.svg"
    );
  });

  it("enforces minZoom, busMinZoom, and per-entity minZoom during zoom changes", () => {
    let currentZoom = 12;
    let zoomListener: (() => void) | null = null;
    const fakeMap = {
      getZoom: () => currentZoom,
      getBounds: () => null,
      addListener: (ev: string, cb: () => void) => {
        if (ev === "zoom_changed") zoomListener = cb;
      }
    };

    const cfg = normalizeCardConfig({
      api_key: "test",
      transit_motion: {
        fps: 30,
        min_zoom: 13,
        bus_min_zoom: 14,
        filter_group: "vehicles"
      },
      entities: [
        {
          entity: "geo_location.410_22nd_st_bus",
          picture: "/local/translink/bus.svg",
          filter_group: "vehicles"
        },
        {
          entity: "sensor.departures_from_home_stop1",
          min_zoom: 15,
          filter_group: "stops"
        },
        {
          entity: "zone.home"
        }
      ]
    });

    const busMarker = makeFakeMarker();
    const stopMarker = makeFakeMarker();
    const homeMarker = makeFakeMarker();

    const entityMarkers = new Map<string, any>([
      ["geo_location.410_22nd_st_bus", busMarker],
      ["sensor.departures_from_home_stop1", stopMarker],
      ["zone.home", homeMarker]
    ]);

    activeEngine = new TransitMotionEngine(fakeGoogleMaps, fakeMap, cfg.transitMotion, {
      entityConfigs: cfg.entities,
      entityMarkers,
      routePolylines: new Map(),
      isEntityFilterActive: () => true
    });

    // At zoom 12: bus (min 14) and stop (min 15) hidden, home (no min) visible
    expect(activeEngine.isBusEntity("geo_location.410_22nd_st_bus")).toBe(true);
    expect(activeEngine.getEntityMinZoom("geo_location.410_22nd_st_bus")).toBe(14);
    expect(activeEngine.getEntityMinZoom("sensor.departures_from_home_stop1")).toBe(15);
    expect(busMarker.visible).toBe(false);
    expect(stopMarker.visible).toBe(false);
    expect(homeMarker.visible).toBe(true);

    // Zoom to 14: bus becomes visible, stop still hidden
    currentZoom = 14;
    zoomListener!();
    expect(busMarker.visible).toBe(true);
    expect(stopMarker.visible).toBe(false);

    // Zoom to 15: both bus and stop visible
    currentZoom = 15;
    zoomListener!();
    expect(busMarker.visible).toBe(true);
    expect(stopMarker.visible).toBe(true);
  });

  it("builds SVG badges for custom icons with circle/square/rectangle shapes and white backdrop", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M4 6h16" fill="#0a79be"/></svg>', {
        status: 200
      })) as any;

    try {
      const dataUrl = buildSvgBadgeDataUrl('<path d="M4 6h16" fill="#0a79be"/>', "0 0 24 24", {
        size: 28,
        shape: "square",
        bgColor: "#ffffff",
        borderColor: "#0a79be",
        borderWidth: 2,
        borderRadius: 5,
        padding: 3
      });
      const decoded = decodeURIComponent(dataUrl.replace("data:image/svg+xml;charset=UTF-8,", ""));
      expect(decoded).toContain("<rect ");
      expect(decoded).toContain("fill='#ffffff'");
      expect(decoded).toContain("stroke='#0a79be'");
      expect(decoded).toContain("rx='5'");

      const cfg = normalizeCardConfig({
        api_key: "test",
        transit_motion: {
          schedule_url: "",
          routes: {
            expo: {
              icon: "cli:translink-logo",
              icon_size: 24,
              shape: "circle",
              background_color: "#ffffff",
              border_color: "#00539B",
              border_width: 1.5,
              padding: 2
            }
          }
        }
      });

      let asyncResult: any = null;
      const syncIcon = getTransitVehicleIcon(fakeGoogleMaps, "expo", cfg.transitMotion, "subway", (iconObj) => {
        asyncResult = iconObj;
      });
      expect(syncIcon.url).toBe("/custom_local_icons/icons/translink-logo.svg");

      await new Promise((r) => setTimeout(r, 10));
      expect(asyncResult).not.toBeNull();
      const asyncDecoded = decodeURIComponent(asyncResult.url.replace("data:image/svg+xml;charset=UTF-8,", ""));
      expect(asyncDecoded).toContain("<circle ");
      expect(asyncDecoded).toContain("fill='#ffffff'");
      expect(asyncDecoded).toContain("stroke='#00539B'");

      // Second call hits cache synchronously
      const cachedBadge = resolveCustomSvgBadgeDataUrl("/custom_local_icons/icons/translink-logo.svg", {
        size: 24,
        shape: "circle",
        bgColor: "#ffffff",
        borderColor: "#00539B",
        borderWidth: 1.5,
        padding: 2
      });
      expect(cachedBadge?.startsWith("data:image/svg+xml;charset=UTF-8,")).toBe(true);
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
