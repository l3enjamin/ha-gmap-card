import { afterEach, describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";
import { GENERIC_BUS_SVG, getTransitVehicleIcon, TransitMotionEngine } from "../src/transit/motion";

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
});
