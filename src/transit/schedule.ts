import { TransitRouteConfig } from "../config/schema";

export interface SchedulePoint {
  timeSec: number;
  lat: number;
  lng: number;
}

export interface TransitProfile {
  h?: string;
  pts: [number, number, number][]; // [elapsedSec, lat, lng]
}

export type ScheduleTripTuple = [number, number]; // [startSec, profileIdx]

export interface TransitScheduleRouteMeta {
  label?: string;
  shortName?: string;
  color?: string;
  textColor?: string;
  routeType?: number;
  geojsonUrl?: string;
}

export interface TransitSchedule {
  profiles: TransitProfile[];
  trips?:
    | Record<string, Record<string, ScheduleTripTuple[]>>
    | Array<{
        profile_id: number;
        start_time: string | number;
        service_id?: string;
        route?: string;
      }>;
  routes?: Record<string, TransitScheduleRouteMeta>;
  service_ids?: {
    weekday?: string[];
    saturday?: string[];
    sunday?: string[];
  };
}

export interface InterpolatedCoord {
  lat: number;
  lng: number;
  bearing?: number;
}

export interface ActiveScheduledTrip {
  key: string;
  lineKey: string;
  profileIdx: number;
  profile: TransitProfile;
  startSec: number;
  endSec: number;
  simOffset: number;
}

/**
 * Resolves wall-clock seconds into GTFS service-day seconds.
 * GTFS schedules frequently span past midnight (e.g. 24:00 to 27:30).
 */
export function resolveServiceDaySeconds(
  date: Date,
  options?: { rolloverHour?: number }
): number {
  const rollover = options?.rolloverHour ?? 3.5; // GTFS trips ending before 3:30 AM belong to yesterday
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const millis = date.getMilliseconds();

  let sec = hours * 3600 + minutes * 60 + seconds + millis / 1000;
  if (sec < rollover * 3600) {
    sec += 24 * 3600;
  }
  return sec;
}

export function computeBearingDeg(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = Math.PI / 180;
  const phi1 = lat1 * toRad;
  const phi2 = lat2 * toRad;
  const dLambda = (lng2 - lng1) * toRad;
  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  if (x === 0 && y === 0) return 0;
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function isValidPt(pt: unknown): pt is [number, number, number] {
  return (
    Array.isArray(pt) &&
    pt.length >= 3 &&
    Number.isFinite(pt[0]) &&
    Number.isFinite(pt[1]) &&
    Number.isFinite(pt[2]) &&
    Math.abs(pt[1]) <= 90 &&
    Math.abs(pt[2]) <= 180
  );
}

/**
 * Interpolates smooth (lat, lng) position and heading along trip vertices.
 */
export function interpolateTripPosition(
  pts: [number, number, number][],
  elapsedSec: number
): InterpolatedCoord | null {
  if (!Array.isArray(pts) || pts.length < 2 || !Number.isFinite(elapsedSec)) return null;
  if (!isValidPt(pts[0]) || !isValidPt(pts[pts.length - 1])) return null;
  const startSec = pts[0][0];
  const endSec = pts[pts.length - 1][0];

  if (elapsedSec < startSec || elapsedSec > endSec) {
    return null;
  }

  for (let j = 0; j < pts.length - 1; j++) {
    if (!isValidPt(pts[j]) || !isValidPt(pts[j + 1])) continue;
    const t0 = pts[j][0];
    const t1 = pts[j + 1][0];
    if (t0 <= elapsedSec && elapsedSec <= t1) {
      const frac = t1 > t0 ? (elapsedSec - t0) / (t1 - t0) : 0;
      const lat = pts[j][1] + (pts[j + 1][1] - pts[j][1]) * frac;
      const lng = pts[j][2] + (pts[j + 1][2] - pts[j][2]) * frac;
      // Look ahead if segment is stationary dwell (same coords)
      let bearing = computeBearingDeg(pts[j][1], pts[j][2], pts[j + 1][1], pts[j + 1][2]);
      if (pts[j][1] === pts[j + 1][1] && pts[j][2] === pts[j + 1][2]) {
        for (let k = j + 1; k < pts.length - 1; k++) {
          if (isValidPt(pts[k]) && isValidPt(pts[k + 1]) && (pts[k][1] !== pts[k + 1][1] || pts[k][2] !== pts[k + 1][2])) {
            bearing = computeBearingDeg(pts[k][1], pts[k][2], pts[k + 1][1], pts[k + 1][2]);
            break;
          }
        }
      }
      return { lat, lng, bearing };
    }
  }

  return null;
}

function resolveServiceTripsForDay(
  schedule: TransitSchedule,
  lineMap: Record<string, ScheduleTripTuple[]> | undefined,
  serviceDay: number
): ScheduleTripTuple[] {
  if (!lineMap || typeof lineMap !== "object" || Array.isArray(lineMap)) return [];
  const dayBucket = serviceDay === 0 ? "sunday" : serviceDay === 6 ? "saturday" : "weekday";
  const canonicalId = serviceDay === 0 ? "3" : serviceDay === 6 ? "2" : "1";

  const configuredIds = schedule.service_ids?.[dayBucket];
  if (Array.isArray(configuredIds) && configuredIds.length > 0) {
    const combined: ScheduleTripTuple[] = [];
    for (const sid of configuredIds) {
      const arr = lineMap[String(sid)];
      if (Array.isArray(arr)) combined.push(...arr);
    }
    if (combined.length > 0) return combined;
  }

  if (Array.isArray(lineMap[canonicalId])) return lineMap[canonicalId];
  if (Array.isArray(lineMap[dayBucket])) return lineMap[dayBucket];

  const pattern =
    dayBucket === "sunday"
      ? /^(sun|sunday|su\b)/i
      : dayBucket === "saturday"
        ? /^(sat|saturday|sa\b)/i
        : /^(wd|wkd|weekday|mon|mtwtf)/i;

  for (const [sid, arr] of Object.entries(lineMap)) {
    if (pattern.test(sid) && Array.isArray(arr)) {
      return arr;
    }
  }
  return [];
}

/**
 * Resolves active scheduled trips from GTFS schedule schema
 * (`trips[lineKey][serviceId] = [[startSec, profileIdx], ...]`), with optional
 * 24/7 daytime simulation fallback when `simulate247` is true.
 */
export function findActiveScheduledTrips(
  schedule: TransitSchedule | null | undefined,
  date: Date,
  routesCfg?: Record<string, TransitRouteConfig>,
  options?: { simulate247?: boolean; rolloverHour?: number }
): ActiveScheduledTrip[] {
  if (!schedule || !Array.isArray(schedule.profiles) || !schedule.trips || typeof schedule.trips !== "object" || Array.isArray(schedule.trips)) {
    return [];
  }
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return [];
  }

  const rollover = options?.rolloverHour ?? 3.5;
  const fractionalHours = date.getHours() + date.getMinutes() / 60;
  const isPostMidnight = fractionalHours < rollover;
  const serviceDay = isPostMidnight ? (date.getDay() + 6) % 7 : date.getDay();
  const secNow = resolveServiceDaySeconds(date, { rolloverHour: rollover });

  const tripsByLine = schedule.trips;
  const lineKeys = Object.keys(tripsByLine).filter((lineKey) => {
    if (!routesCfg) return true;
    const rCfg = routesCfg[lineKey] || routesCfg[lineKey.toLowerCase()];
    if (rCfg && rCfg.enabled === false) return false;
    return true;
  });

  let matchedCount = 0;
  for (const lineKey of lineKeys) {
    const lineTrips = resolveServiceTripsForDay(schedule, tripsByLine[lineKey], serviceDay);
    for (let i = 0; i < lineTrips.length; i++) {
      const tuple = lineTrips[i];
      if (!Array.isArray(tuple) || tuple.length < 2) continue;
      const startSec = Number(tuple[0]);
      const pid = Number(tuple[1]);
      if (!Number.isFinite(startSec) || !Number.isInteger(pid) || pid < 0 || pid >= schedule.profiles.length) continue;
      const prof = schedule.profiles[pid];
      if (!prof || !Array.isArray(prof.pts) || prof.pts.length < 2) continue;
      const lastPt = prof.pts[prof.pts.length - 1];
      if (!isValidPt(lastPt)) continue;
      const endSec = startSec + lastPt[0];
      if (startSec <= secNow && secNow <= endSec) {
        matchedCount++;
      }
    }
  }

  if (matchedCount === 0 && !options?.simulate247) {
    return [];
  }

  const effSec =
    matchedCount === 0
      ? (((Math.floor(secNow) - 18300) % 54000 + 54000) % 54000 + 25200)
      : secNow;
  const effDay = matchedCount === 0 ? 1 : serviceDay;

  const result: ActiveScheduledTrip[] = [];
  for (const lineKey of lineKeys) {
    const lineTrips = resolveServiceTripsForDay(schedule, tripsByLine[lineKey], effDay);
    for (let i = 0; i < lineTrips.length; i++) {
      const tuple = lineTrips[i];
      if (!Array.isArray(tuple) || tuple.length < 2) continue;
      const startSec = Number(tuple[0]);
      const pid = Number(tuple[1]);
      if (!Number.isFinite(startSec) || !Number.isInteger(pid) || pid < 0 || pid >= schedule.profiles.length) continue;
      const prof = schedule.profiles[pid];
      if (!prof || !Array.isArray(prof.pts) || prof.pts.length < 2) continue;
      const lastPt = prof.pts[prof.pts.length - 1];
      if (!isValidPt(lastPt)) continue;
      const endSec = startSec + lastPt[0];
      if (startSec <= effSec && effSec <= endSec) {
        result.push({
          key: `scheduled_${lineKey}_${startSec}_${pid}`,
          lineKey,
          profileIdx: pid,
          profile: prof,
          startSec,
          endSec,
          simOffset: effSec - secNow
        });
      }
    }
  }

  return result;
}

export function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function projectPointOnSegment(
  pLat: number,
  pLng: number,
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): { lat: number; lng: number; t: number; distSq: number } {
  const cosLat = Math.cos((pLat * Math.PI) / 180);
  const abX = (bLng - aLng) * cosLat;
  const abY = bLat - aLat;
  const apX = (pLng - aLng) * cosLat;
  const apY = pLat - aLat;
  const abLenSq = abX * abX + abY * abY;
  if (abLenSq === 0) {
    return { lat: aLat, lng: aLng, t: 0, distSq: apX * apX + apY * apY };
  }
  const t = Math.max(0, Math.min(1, (apX * abX + apY * abY) / abLenSq));
  const projLat = aLat + t * (bLat - aLat);
  const projLng = aLng + t * (bLng - aLng);
  const dLat = pLat - projLat;
  const dLng = (pLng - projLng) * cosLat;
  return { lat: projLat, lng: projLng, t, distSq: dLat * dLat + dLng * dLng };
}

/**
 * Snaps a coordinate onto the closest GeoJSON polyline (`[lng, lat][]`) and advances
 * forward by `targetAdvanceMeters`. Returns `null` if no polyline is within threshold.
 */
export function advanceAlongPolylines(
  polylines: number[][][],
  curLat: number,
  curLng: number,
  targetAdvanceMeters: number
): InterpolatedCoord | null {
  if (!polylines || !polylines.length) return null;
  let bestDistSq = Infinity;
  let bestPoly: number[][] | null = null;
  let bestSegIdx = -1;
  let bestProj: { lat: number; lng: number; t: number; distSq: number } | null = null;

  for (const poly of polylines) {
    for (let i = 0; i < poly.length - 1; i++) {
      const a = poly[i];
      const b = poly[i + 1];
      const proj = projectPointOnSegment(curLat, curLng, a[1], a[0], b[1], b[0]);
      if (proj.distSq < bestDistSq) {
        bestDistSq = proj.distSq;
        bestPoly = poly;
        bestSegIdx = i;
        bestProj = proj;
      }
    }
  }

  if (!bestPoly || !bestProj || bestDistSq > 0.000005) return null;

  let remainingMeters = targetAdvanceMeters;
  let curP: InterpolatedCoord = { lat: bestProj.lat, lng: bestProj.lng };

  for (let i = bestSegIdx; i < bestPoly.length - 1; i++) {
    const nextP: InterpolatedCoord = { lat: bestPoly[i + 1][1], lng: bestPoly[i + 1][0] };
    const segDist = haversineMeters(curP.lat, curP.lng, nextP.lat, nextP.lng);
    if (segDist >= remainingMeters) {
      const frac = segDist > 0 ? remainingMeters / segDist : 0;
      return {
        lat: curP.lat + (nextP.lat - curP.lat) * frac,
        lng: curP.lng + (nextP.lng - curP.lng) * frac,
        bearing: computeBearingDeg(curP.lat, curP.lng, nextP.lat, nextP.lng)
      };
    }
    remainingMeters -= segDist;
    curP = nextP;
  }

  return curP;
}

/**
 * Matches a string against a glob (`*`, `?`), regex literal (`/pattern/flags`), or substring.
 */
export function matchEntityPattern(target: string, pattern: string): boolean {
  if (!target || !pattern) return false;
  const pStr = String(pattern).trim();
  if (!pStr) return false;
  if (pStr.startsWith("/") && pStr.lastIndexOf("/") > 0) {
    const lastSlash = pStr.lastIndexOf("/");
    try {
      const re = new RegExp(pStr.slice(1, lastSlash), pStr.slice(lastSlash + 1) || "i");
      return re.test(target);
    } catch (_) {}
  }
  if (pStr.includes("*") || pStr.includes("?")) {
    const esc = pStr.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
    try {
      return new RegExp("^" + esc + "$", "i").test(target);
    } catch (_) {}
  }
  return target.toLowerCase().includes(pStr.toLowerCase());
}

/**
 * Normalizes route lookup keys from a GeoJSON layer's URL, routeKey, or display name.
 */
export function extractRouteKeys(url?: string, routeKey?: string, name?: string): string[] {
  const keys = new Set<string>();
  if (url) {
    const file = String(url).split("?")[0].split("/").pop() || "";
    const clean = file.replace(/\.(geo)?json$/i, "").trim().toLowerCase();
    if (clean) {
      keys.add(clean);
      const stripped = clean.replace(/^(route|skytrain|line|rail|metro|subway|train|tram)_/, "");
      if (stripped) keys.add(stripped);
    }
  }
  for (const alias of [routeKey, name]) {
    if (alias !== undefined && alias !== null && String(alias).trim()) {
      keys.add(String(alias).trim().toLowerCase());
    }
  }
  return Array.from(keys);
}

export interface StationArrival {
  lineKey: string;
  headsign: string;
  arrivalSec: number;
  minutesAway: number;
  formattedTime: string;
}

function formatGtfsTime(totalSec: number): string {
  const wrapped = Math.floor(totalSec) % 86400;
  const hh = Math.floor(wrapped / 3600);
  const mm = Math.floor((wrapped % 3600) / 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function findUpcomingArrivalsForStation(
  schedule: TransitSchedule | null | undefined,
  stationLat: number,
  stationLng: number,
  date: Date,
  options?: {
    lineKeys?: string[];
    maxDistanceMeters?: number;
    windowSec?: number;
    limit?: number;
    rolloverHour?: number;
  }
): StationArrival[] {
  if (!schedule || !Array.isArray(schedule.profiles) || !schedule.trips || typeof schedule.trips !== "object" || Array.isArray(schedule.trips)) {
    return [];
  }
  if (!Number.isFinite(stationLat) || !Number.isFinite(stationLng) || !(date instanceof Date) || Number.isNaN(date.getTime())) {
    return [];
  }

  const maxDist = options?.maxDistanceMeters ?? 180;
  const windowSec = options?.windowSec ?? 5400;
  const limit = options?.limit ?? 6;
  const rollover = options?.rolloverHour ?? 3.5;

  const isPostMidnight = date.getHours() + date.getMinutes() / 60 < rollover;
  const serviceDay = isPostMidnight ? (date.getDay() + 6) % 7 : date.getDay();
  const secNow = resolveServiceDaySeconds(date, { rolloverHour: rollover });

  // Precompute offset in seconds along each profile matching this station
  const profileStationOffset = new Map<number, number>();
  for (let pid = 0; pid < schedule.profiles.length; pid++) {
    const pts = schedule.profiles[pid]?.pts;
    if (!Array.isArray(pts) || pts.length < 2) continue;
    let bestDist = Infinity;
    let bestTime = -1;
    for (let j = 0; j < pts.length; j++) {
      if (!isValidPt(pts[j])) continue;
      const d = haversineMeters(stationLat, stationLng, pts[j][1], pts[j][2]);
      if (d < bestDist) {
        bestDist = d;
        bestTime = pts[j][0];
      }
    }
    if (bestDist <= maxDist && bestTime >= 0) {
      profileStationOffset.set(pid, bestTime);
    }
  }

  if (profileStationOffset.size === 0) return [];

  const targetLines = options?.lineKeys?.length
    ? options.lineKeys.filter((k) => Boolean((schedule.trips as any)[k]))
    : Object.keys(schedule.trips);

  const arrivals: StationArrival[] = [];
  for (const lineKey of targetLines) {
    const lineTrips = resolveServiceTripsForDay(schedule, schedule.trips[lineKey], serviceDay);
    for (let i = 0; i < lineTrips.length; i++) {
      const tuple = lineTrips[i];
      if (!Array.isArray(tuple) || tuple.length < 2) continue;
      const startSec = Number(tuple[0]);
      const pid = Number(tuple[1]);
      if (!Number.isFinite(startSec) || !Number.isInteger(pid)) continue;
      const offsetSec = profileStationOffset.get(pid);
      if (offsetSec === undefined) continue;
      const arrivalSec = startSec + offsetSec;
      if (arrivalSec >= secNow && arrivalSec <= secNow + windowSec) {
        arrivals.push({
          lineKey,
          headsign: schedule.profiles[pid]?.h || lineKey,
          arrivalSec,
          minutesAway: Math.max(0, Math.round((arrivalSec - secNow) / 60)),
          formattedTime: formatGtfsTime(arrivalSec)
        });
      }
    }
  }

  arrivals.sort((a, b) => a.arrivalSec - b.arrivalSec);
  return arrivals.slice(0, limit);
}
