import { afterEach, describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";
import { resolveServiceDaySeconds } from "../src/transit/schedule";
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

  it("renders distinct triangle vs arrow shapes, pure shapes without icons, icons inside geometric shapes, and custom rectangle dimensions", async () => {
    const triUrl = buildSvgBadgeDataUrl("", "0 0 24 24", { size: 24, shape: "triangle", bgColor: "#d04110" });
    const arrowUrl = buildSvgBadgeDataUrl("", "0 0 24 24", { size: 24, shape: "arrow", bgColor: "#d04110" });
    const decodedTri = decodeURIComponent(triUrl);
    const decodedArrow = decodeURIComponent(arrowUrl);
    expect(decodedTri).toContain("<polygon points='12,");
    expect(decodedTri).not.toContain("12,17 ");
    expect(decodedArrow).toContain("12,17 ");
    expect(decodedTri).not.toContain("<svg x=");

    // Explicit rectangle width & height with inner icon inside triangle/rectangle
    const rectIconUrl = buildSvgBadgeDataUrl("<path d='M4 4h16v16H4z'/>", "0 0 24 24", {
      size: 24,
      width: 40,
      height: 20,
      shape: "rectangle",
      bgColor: "#0097A9",
      borderColor: "#ffffff",
      borderWidth: 2
    });
    const decodedRect = decodeURIComponent(rectIconUrl);
    expect(decodedRect).toContain("viewBox='0 0 40 20'");
    expect(decodedRect).toContain("<rect ");
    expect(decodedRect).toContain("<svg x=");

    // show_icon: false and icon: "none" suppress inner icon even when geometric shape or route color is set
    const pureCfg = normalizeCardConfig({
      api_key: "test",
      transit_motion: {
        routes: {
          r99: { icon: "cli:translink-bus", show_icon: false, shape: "triangle", color: "#d04110", width: 30, height: 22 },
          r430: { icon: "none", shape: "rectangle", color: "#1E88E5", width: 34, height: 18 },
          pureShape: { shape: "arrow", color: "#008522", icon_size: 26 }
        }
      }
    });
    const r99Icon = getTransitVehicleIcon(fakeGoogleMaps, "r99", pureCfg.transitMotion, "bus");
    expect(r99Icon.scaledSize).toEqual({ width: 30, height: 22 });
    const decodedR99 = decodeURIComponent(r99Icon.url);
    expect(decodedR99).toContain("<polygon ");
    expect(decodedR99).not.toContain("<svg x=");

    const r430Icon = getTransitVehicleIcon(fakeGoogleMaps, "r430", pureCfg.transitMotion, "bus");
    expect(r430Icon.scaledSize).toEqual({ width: 34, height: 18 });
    expect(decodeURIComponent(r430Icon.url)).toContain("<rect ");
    expect(decodeURIComponent(r430Icon.url)).not.toContain("<svg x=");

    const pureShapeIcon = getTransitVehicleIcon(fakeGoogleMaps, "pureShape", pureCfg.transitMotion, "bus");
    expect(decodeURIComponent(pureShapeIcon.url)).toContain("13,19 "); // notch in 26px height arrow
    expect(decodeURIComponent(pureShapeIcon.url)).not.toContain("<svg x=");
  });

  it("defers schedule fetching while filter inactive and applies CSS rotation strictly according to directional", async () => {
    const origFetch = globalThis.fetch;
    const origDoc = (globalThis as any).document;
    const fetchUrls: string[] = [];
    const curSec = resolveServiceDaySeconds(new Date());
    const startSec = Math.max(0, Math.floor(curSec) - 30);

    globalThis.fetch = (async (url: string) => {
      fetchUrls.push(url);
      if (url.includes("schedule")) {
        return new Response(
          JSON.stringify({
            profiles: [{ h: "Test", pts: [[0, 49.26, -123.15], [120, 49.26, -123.10]] }],
            trips: {
              rot_on: { "1": [[startSec, 0]], "2": [[startSec, 0]], "3": [[startSec, 0]] },
              rot_off: { "1": [[startSec, 0]], "2": [[startSec, 0]], "3": [[startSec, 0]] }
            }
          }),
          { status: 200 }
        );
      }
      return new Response("", { status: 404 });
    }) as any;

    const makeEl = (tag: string) => {
      const styleObj: Record<string, any> = {};
      Object.defineProperty(styleObj, "cssText", {
        set(val: string) {
          for (const decl of String(val).split(";")) {
            const idx = decl.indexOf(":");
            if (idx > 0) styleObj[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
          }
        }
      });
      const el: any = {
        tagName: tag.toUpperCase(),
        style: styleObj,
        children: [] as any[],
        appendChild(c: any) {
          this.children.push(c);
          return c;
        }
      };
      return el;
    };
    (globalThis as any).document = { createElement: makeEl };

    const createdMarkers: any[] = [];
    const mapsStub: any = {
      ...fakeGoogleMaps,
      marker: {
        AdvancedMarkerElement: class {
          public position: any;
          public map: any;
          public content: any;
          constructor(opts: any) {
            this.position = opts.position;
            this.map = opts.map;
            this.content = opts.content;
            createdMarkers.push(this);
          }
        }
      }
    };
    const fakeMap: any = {
      getZoom: () => 15,
      getBounds: () => ({ contains: () => true }),
      addListener: () => ({ remove: () => {} })
    };

    try {
      const cfg = normalizeCardConfig({
        api_key: "test",
        map_id: "DEMO_MAP",
        transit_motion: {
          schedule_url: `/local/gtfs2/test_schedule_defer_${Date.now()}.json`,
          directional: false,
          routes: {
            rot_on: { shape: "triangle", directional: true, width: 32, height: 18, color: "#0097A9" },
            rot_off: { shape: "rectangle", directional: false, width: 36, height: 20, color: "#d04110" }
          }
        }
      });

      const engine = new TransitMotionEngine(mapsStub, fakeMap, cfg.transitMotion, {
        entityConfigs: [],
        entityMarkers: new Map(),
        routePolylines: new Map(),
        hasMapId: true,
        initialFilterActive: false,
        isEntityFilterActive: () => true
      });

      // Schedule fetch must be skipped while initialFilterActive is false
      await new Promise((r) => setTimeout(r, 20));
      expect(fetchUrls.length).toBe(0);

      // Activating filter triggers schedule fetch and creates centered outer wrappers
      engine.setFilterActive(true);
      for (let i = 0; i < 30 && createdMarkers.length < 2; i++) {
        await new Promise((r) => setTimeout(r, 10));
      }
      expect(fetchUrls.length).toBe(1);
      expect(createdMarkers.length).toBe(2);

      // Verify outer centers via translateY(50%) and preserves custom width/height
      expect(createdMarkers[0].content.style.transform).toBe("translateY(50%)");
      expect(createdMarkers[1].content.style.width).toBe("36px");
      expect(createdMarkers[1].content.style.height).toBe("20px");

      // Run animation tick and verify rotation happens ONLY on directional: true inner rotator
      (engine as any).renderTick();
      const rotOnInner = createdMarkers[0].content.children[0];
      const rotOffInner = createdMarkers[1].content.children[0];
      expect(rotOnInner.style.transform).toContain("rotate(");
      expect(rotOffInner.style.transform).toBe(undefined);

      engine.destroy();
    } finally {
      globalThis.fetch = origFetch;
      (globalThis as any).document = origDoc;
    }
  });
});
