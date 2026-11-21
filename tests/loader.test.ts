import { afterEach, describe, expect, it } from "bun:test";
import { loadGoogleMaps } from "../src/maps/loader";

const origWindow = (globalThis as any).window;

afterEach(() => {
  if (origWindow === undefined) {
    delete (globalThis as any).window;
  } else {
    (globalThis as any).window = origWindow;
  }
});

describe("Google Maps Async Loader", () => {
  it("awaits importLibrary('maps' & 'marker') and returns window.google (not window.google.maps)", async () => {
    const imported: string[] = [];
    const fakeGoogle = {
      maps: {
        Map: class {},
        importLibrary: async (lib: string) => {
          imported.push(lib);
          return {};
        }
      }
    };
    (globalThis as any).window = { google: fakeGoogle };

    const result = await loadGoogleMaps({ apiKey: "test-key" });
    expect(result).toBe(fakeGoogle);
    expect(result.maps.Map).toBe(fakeGoogle.maps.Map);
    expect(imported).toEqual(["maps", "marker"]);
  });

  it("waits for async bootstrap and merges Map from importLibrary when google.maps stub lacks Map", async () => {
    class FakeMap {}
    class FakeAdvancedMarker {}
    const stubGoogle: any = { maps: {} };
    (globalThis as any).window = { google: stubGoogle };

    setTimeout(() => {
      stubGoogle.maps.importLibrary = async (lib: string) => {
        if (lib === "maps") return { Map: FakeMap };
        if (lib === "marker") return { AdvancedMarkerElement: FakeAdvancedMarker };
        return {};
      };
    }, 30);

    const result = await loadGoogleMaps({ apiKey: "test-key" });
    expect(typeof result.maps.Map).toBe("function");
    expect(result.maps.Map).toBe(FakeMap);
    expect(result.maps.marker.AdvancedMarkerElement).toBe(FakeAdvancedMarker);
  });
});
