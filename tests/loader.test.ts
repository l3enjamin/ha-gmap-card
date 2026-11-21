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
});
