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
});
