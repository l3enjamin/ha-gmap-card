import { describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";
import { generateRouteLabelsForGeoJson } from "../src/maps/geo-labels";
import { haversineMeters } from "../src/transit/schedule";

function makeLinearCoords(startLng: number, endLng: number, lat: number, steps = 10): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    pts.push([startLng + ((endLng - startLng) * i) / steps, lat]);
  }
  return pts;
}

describe("GeoJSON Route Label De-clustering", () => {
  it("prevents close label clusters across opposite directions, parallel couplets (~100m), and short-turn variants", () => {
    // ~7.2 km east-west corridor around Vancouver (-123.20 to -123.10 at lat 49.26)
    const eastbound = makeLinearCoords(-123.2, -123.1, 49.26, 20);
    const westbound = [...eastbound].reverse();
    // Parallel couplet ~100m north (approx +0.0009 deg latitude)
    const couplet = makeLinearCoords(-123.2, -123.1, 49.2609, 20);
    // Short-turn overlap in the middle
    const shortTurn = makeLinearCoords(-123.17, -123.13, 49.2601, 10);

    const rawGeo = {
      type: "FeatureCollection",
      features: [
        { type: "Feature", geometry: { type: "LineString", coordinates: eastbound }, properties: { color: "#d04110" } },
        { type: "Feature", geometry: { type: "LineString", coordinates: westbound }, properties: { color: "#d04110" } },
        { type: "Feature", geometry: { type: "LineString", coordinates: couplet }, properties: { color: "#d04110" } },
        { type: "Feature", geometry: { type: "LineString", coordinates: shortTurn }, properties: { color: "#d04110" } }
      ]
    };

    const cfg = normalizeCardConfig({
      api_key: "test",
      geojson_layers: [{ url: "/local/route_99.geojson", label: "99", label_spacing: 1500 }]
    }).geojsonLayers[0];

    const out = generateRouteLabelsForGeoJson(rawGeo, cfg);
    const badges = out.features.filter((f: any) => f.properties?.point_type === "badge");
    expect(badges.length).toBeGreaterThan(2);

    const minSep = 1500 * 0.72;
    for (let i = 0; i < badges.length; i++) {
      for (let j = i + 1; j < badges.length; j++) {
        const [lng1, lat1] = badges[i].geometry.coordinates;
        const [lng2, lat2] = badges[j].geometry.coordinates;
        expect(haversineMeters(lat1, lng1, lat2, lng2)).toBeGreaterThan(minSep - 1e-6);
      }
    }
  });

  it("places labels on separated Y-branches without doubling up on the shared trunk", () => {
    // Trunk runs West->East, Branch B diverges South-East by >2km
    const branchA = [
      [-123.2, 49.26],
      [-123.15, 49.26],
      [-123.1, 49.26]
    ];
    const branchB = [
      [-123.2, 49.26],
      [-123.15, 49.26],
      [-123.12, 49.23],
      [-123.1, 49.22]
    ];

    const rawGeo = {
      type: "FeatureCollection",
      features: [{ type: "Feature", geometry: { type: "MultiLineString", coordinates: [branchA, branchB] }, properties: {} }]
    };

    const cfg = normalizeCardConfig({
      api_key: "test",
      geojson_layers: [{ url: "/local/expo.geojson", label: "Expo Line", label_spacing: 1200 }]
    }).geojsonLayers[0];

    const out = generateRouteLabelsForGeoJson(rawGeo, cfg);
    const badges = out.features.filter((f: any) => f.properties?.point_type === "badge");
    // Longest line (branchB) places labels including diverging southern segment; branchA places eastern end if far enough
    const southernBadges = badges.filter((b: any) => b.geometry.coordinates[1] < 49.245);
    expect(southernBadges.length).toBeGreaterThan(0);

    for (let i = 0; i < badges.length; i++) {
      for (let j = i + 1; j < badges.length; j++) {
        const [lng1, lat1] = badges[i].geometry.coordinates;
        const [lng2, lat2] = badges[j].geometry.coordinates;
        expect(haversineMeters(lat1, lng1, lat2, lng2)).toBeGreaterThan(1200 * 0.72 - 1e-6);
      }
    }
  });

  it("strips static and generated badge features when showLabels is false even without labelSpacing", () => {
    const rawGeo = {
      type: "FeatureCollection",
      features: [
        { type: "Feature", geometry: { type: "LineString", coordinates: makeLinearCoords(-123.2, -123.1, 49.26, 4) }, properties: {} },
        { type: "Feature", geometry: { type: "Point", coordinates: [-123.15, 49.26] }, properties: { point_type: "badge", badge: "99" } },
        { type: "Feature", geometry: { type: "Point", coordinates: [-123.12, 49.26] }, properties: { point_type: "stop", name: "Broadway" } }
      ]
    };

    const cfg = normalizeCardConfig({
      api_key: "test",
      geojson_layers: [{ url: "/local/r99.geojson", label: "99", show_labels: false }]
    }).geojsonLayers[0];

    const out = generateRouteLabelsForGeoJson(rawGeo, cfg);
    expect(out.features.length).toBe(2);
    expect(out.features.some((f: any) => f.properties?.point_type === "badge")).toBe(false);
  });
});
