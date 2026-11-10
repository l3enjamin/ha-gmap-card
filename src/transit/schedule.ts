export interface SchedulePoint {
  timeSec: number;
  lat: number;
  lng: number;
}

export interface TransitProfile {
  h?: string;
  pts: [number, number, number][]; // [elapsedSec, lat, lng]
}

export interface TransitSchedule {
  profiles: TransitProfile[];
  trips?: Array<{
    profile_id: number;
    start_time: string | number; // "05:14:00" or sec from midnight
    service_id?: string;
    route?: string;
  }>;
}

export interface InterpolatedCoord {
  lat: number;
  lng: number;
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
  if (hours < rollover) {
    sec += 24 * 3600;
  }
  return sec;
}

/**
 * Interpolates smooth (lat, lng) position along trip vertices.
 */
export function interpolateTripPosition(
  pts: [number, number, number][],
  elapsedSec: number
): InterpolatedCoord | null {
  if (!pts || pts.length < 2) return null;
  const startSec = pts[0][0];
  const endSec = pts[pts.length - 1][0];

  if (elapsedSec < startSec || elapsedSec > endSec) {
    return null;
  }

  for (let j = 0; j < pts.length - 1; j++) {
    const t0 = pts[j][0];
    const t1 = pts[j + 1][0];
    if (t0 <= elapsedSec && elapsedSec <= t1) {
      const frac = t1 > t0 ? (elapsedSec - t0) / (t1 - t0) : 0;
      const lat = pts[j][1] + (pts[j + 1][1] - pts[j][1]) * frac;
      const lng = pts[j][2] + (pts[j + 1][2] - pts[j][2]) * frac;
      return { lat, lng };
    }
  }

  return null;
}
