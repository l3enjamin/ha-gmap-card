import { describe, expect, it } from "bun:test";
import { interpolateTripPosition, resolveServiceDaySeconds } from "../src/transit/schedule";

describe("Transit Schedule Pure Logic", () => {
  it("resolves service day seconds correctly for daytime", () => {
    // 14:30:15 = 14 * 3600 + 30 * 60 + 15 = 50400 + 1800 + 15 = 52215
    const date = new Date(2026, 10, 10, 14, 30, 15, 500);
    const sec = resolveServiceDaySeconds(date);
    expect(sec).toBeCloseTo(52215.5, 1);
  });

  it("handles post-midnight GTFS service hours (e.g. 01:15 AM as 25:15:00 if service day started previous day)", () => {
    const date = new Date(2026, 10, 10, 1, 15, 0, 0);
    // When treatEarlyMorningAsNextServiceDay is false (default for continuous GTFS service day until 3:30 AM)
    const sec = resolveServiceDaySeconds(date, { rolloverHour: 3.5 });
    // 24 + 1 = 25 hours * 3600 + 15 * 60 = 90000 + 900 = 90900
    expect(sec).toBe(90900);
  });

  it("interpolates vertex position correctly between time samples", () => {
    const pts: [number, number, number][] = [
      [0, 49.190, -123.130],
      [60, 49.200, -123.120],
      [120, 49.210, -123.110]
    ];

    // Exactly at t=30 (halfway between pts 0 and 1)
    const pos = interpolateTripPosition(pts, 30);
    expect(pos).not.toBeNull();
    expect(pos?.lat).toBeCloseTo(49.195, 4);
    expect(pos?.lng).toBeCloseTo(-123.125, 4);
  });

  it("returns null if elapsed time is outside trip bounds", () => {
    const pts: [number, number, number][] = [
      [10, 49.190, -123.130],
      [60, 49.200, -123.120]
    ];
    expect(interpolateTripPosition(pts, 5)).toBeNull();
    expect(interpolateTripPosition(pts, 65)).toBeNull();
  });

  it("finds active scheduled trips using real GTFS2 schedule format and routes filter", async () => {
    const mod = await import("../src/transit/schedule");
    const schedule = {
      profiles: [
        {
          h: "Canada Line To Waterfront",
          pts: [
            [0, 49.167, -123.136],
            [600, 49.285, -123.112]
          ] as [number, number, number][]
        },
        {
          h: "Expo Line To Waterfront",
          pts: [
            [0, 49.180, -122.849],
            [900, 49.285, -123.112]
          ] as [number, number, number][]
        }
      ],
      trips: {
        canada: {
          "1": [[36000, 0]] as [number, number][], // 10:00:00 -> 10:10:00
          "2": [[36000, 0]] as [number, number][],
          "3": [[36000, 0]] as [number, number][]
        },
        expo: {
          "1": [[36000, 1]] as [number, number][],
          "2": [[36000, 1]] as [number, number][],
          "3": [[36000, 1]] as [number, number][]
        }
      }
    };

    // Wednesday 10:05:00 AM (serviceId = "1", secNow = 36300)
    const wednesdayMorning = new Date(2026, 10, 18, 10, 5, 0, 0);
    const activeAll = mod.findActiveScheduledTrips(schedule, wednesdayMorning);
    expect(activeAll.length).toBe(2);
    expect(activeAll[0].lineKey).toBe("canada");

    // Disabled route should be excluded
    const activeFiltered = mod.findActiveScheduledTrips(schedule, wednesdayMorning, {
      expo: { enabled: false }
    });
    expect(activeFiltered.length).toBe(1);
    expect(activeFiltered[0].lineKey).toBe("canada");
  });

  it("falls back to 24/7 daytime simulation when overnight matchedCount is 0", async () => {
    const mod = await import("../src/transit/schedule");
    const schedule = {
      profiles: [
        {
          h: "Canada Line",
          pts: [
            [0, 49.167, -123.136],
            [1800, 49.285, -123.112]
          ] as [number, number, number][]
        }
      ],
      trips: {
        canada: {
          "1": [[28800, 0]] as [number, number][], // 08:00:00 -> 08:30:00
          "3": [] as [number, number][]
        }
      }
    };

    // Compute a secNow whose wrapped effSec falls inside [28800, 30600]:
    // secNow = 3600 -> ((3600 - 18300) % 54000 + 54000) % 54000 + 25200 = 39300 + 25200 = 64500
    // Pick 03:30:00 AM? Wrap formula: ((floor(secNow) - 18300) % 54000 + 54000) % 54000 + 25200
    // If secNow = 22800 (06:20 AM): ((22800 - 18300) + 25200) = 29700 -> inside [28800, 30600]!
    // On Sunday 06:20 AM (serviceId = "3" has no trips -> matchedCount = 0)
    const sundayEarly = new Date(2026, 10, 15, 6, 20, 0, 0);
    const active = mod.findActiveScheduledTrips(schedule, sundayEarly);
    expect(active.length).toBe(1);
    expect(active[0].simOffset).toBe(29700 - 22800);
  });

  it("snaps and advances bus coordinates along GeoJSON LineString polylines", async () => {
    const mod = await import("../src/transit/schedule");
    // GeoJSON coordinates are [lng, lat]
    const polylines = [
      [
        [-123.136, 49.160],
        [-123.136, 49.170] // ~1111m North
      ]
    ];
    const nextPt = mod.advanceAlongPolylines(polylines, 49.162, -123.13605, 100);
    expect(nextPt).not.toBeNull();
    expect(nextPt!.lng).toBeCloseTo(-123.136, 5);
    expect(nextPt!.lat).toBeGreaterThan(49.1625);

    // Point far away should return null
    const farPt = mod.advanceAlongPolylines(polylines, 49.300, -122.900, 100);
    expect(farPt).toBeNull();
  });

  it("matches glob/regex patterns and extracts GeoJSON route keys", async () => {
    const mod = await import("../src/transit/schedule");
    expect(mod.matchEntityPattern("geo_location.410_bus", "geo_location.*_bus")).toBe(true);
    expect(mod.matchEntityPattern("Bridgeport Station", "/^(?!.*Platform).*$/")).toBe(true);
    expect(mod.matchEntityPattern("Bridgeport Platform 1", "/^(?!.*Platform).*$/")).toBe(false);

    const keys = mod.extractRouteKeys("/local/gtfs2/route_410.geojson?v=1", undefined, "410");
    expect(keys).toContain("route_410");
    expect(keys).toContain("410");
  });
});
