import { GeoJsonLayerConfig } from "../config/schema";
import { haversineMeters } from "../transit/schedule";

interface LineCandidate {
  coords: any[];
  props: any;
  lengthMeters: number;
}

function measurePolylineMeters(coords: any[]): number {
  if (!Array.isArray(coords) || coords.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const a = coords[i];
    const b = coords[i + 1];
    if (!Array.isArray(a) || !Array.isArray(b) || a.length < 2 || b.length < 2) continue;
    const d = haversineMeters(a[1], a[0], b[1], b[0]);
    if (Number.isFinite(d) && d > 0) total += d;
  }
  return total;
}

/**
 * Generates non-overlapping route label badge Point features along GeoJSON LineStrings.
 * Sorts trunks/branches longest-first and enforces global minimum spatial separation across
 * opposite directions, one-way couplets, and short-turn variants.
 */
export function generateRouteLabelsForGeoJson(geoData: any, layerCfg: GeoJsonLayerConfig): any {
  if (!geoData || !Array.isArray(geoData.features)) return geoData;

  const filteredFeatures = geoData.features.filter((f: any) => {
    const p = f?.properties || {};
    const pt = String(p.point_type || p.type || "").toLowerCase();
    return pt !== "badge" && !p.badge;
  });

  if (layerCfg.showLabels === false) {
    return { ...geoData, features: filteredFeatures };
  }
  if (layerCfg.labelSpacing === undefined) {
    return geoData;
  }

  const spacing = Math.max(50, layerCfg.labelSpacing);
  const labelText = layerCfg.label || layerCfg.name || "";
  if (!labelText) {
    return { ...geoData, features: filteredFeatures };
  }

  const minSeparation = Math.max(50, spacing * 0.72);
  const candidates: LineCandidate[] = [];

  for (const f of filteredFeatures) {
    const geom = f?.geometry;
    if (!geom) continue;
    if (geom.type === "LineString" && Array.isArray(geom.coordinates)) {
      candidates.push({
        coords: geom.coordinates,
        props: f.properties,
        lengthMeters: measurePolylineMeters(geom.coordinates)
      });
    } else if (geom.type === "MultiLineString" && Array.isArray(geom.coordinates)) {
      for (const line of geom.coordinates) {
        if (Array.isArray(line)) {
          candidates.push({
            coords: line,
            props: f.properties,
            lengthMeters: measurePolylineMeters(line)
          });
        }
      }
    }
  }

  candidates.sort((a, b) => b.lengthMeters - a.lengthMeters);

  const generatedBadges: any[] = [];
  const placedBadges: Array<{ lat: number; lng: number }> = [];

  for (const cand of candidates) {
    const { coords, props } = cand;
    if (!Array.isArray(coords) || coords.length < 2) continue;
    let accum = spacing * 0.5;
    for (let i = 0; i < coords.length - 1; i++) {
      const a = coords[i];
      const b = coords[i + 1];
      if (!Array.isArray(a) || !Array.isArray(b) || a.length < 2 || b.length < 2) continue;
      const segLen = haversineMeters(a[1], a[0], b[1], b[0]);
      if (!Number.isFinite(segLen) || segLen <= 0) continue;
      let walked = 0;
      while (accum + (segLen - walked) >= spacing) {
        const need = spacing - accum;
        const frac = (walked + need) / segLen;
        const lng = a[0] + (b[0] - a[0]) * frac;
        const lat = a[1] + (b[1] - a[1]) * frac;
        const tooClose = placedBadges.some((p) => haversineMeters(p.lat, p.lng, lat, lng) < minSeparation);
        if (!tooClose) {
          placedBadges.push({ lat, lng });
          generatedBadges.push({
            type: "Feature",
            geometry: { type: "Point", coordinates: [lng, lat] },
            properties: {
              point_type: "badge",
              badge: labelText,
              name: labelText,
              color: props?.color || props?.strokeColor || layerCfg.strokeColor
            }
          });
        }
        walked += need;
        accum = 0;
      }
      accum += segLen - walked;
    }
  }

  return { ...geoData, features: [...filteredFeatures, ...generatedBadges] };
}
