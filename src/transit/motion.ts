import { interpolateTripPosition, resolveServiceDaySeconds, TransitSchedule } from "./schedule";

export interface TransitMotionOptions {
  fps: number;
  minZoom: number;
  scheduleUrl: string;
}

export class TransitMotionEngine {
  private activeTrips = new Map<string, { pts: [number, number, number][]; startSec: number; line: string }>();
  private markers = new Map<string, any>();
  private schedule: TransitSchedule | null = null;
  private ingestTimer: any = null;
  private animTimer: any = null;
  private filterActive = true;
  private frameIntervalMs: number;

  constructor(
    private googleMaps: any,
    private map: any,
    private options: TransitMotionOptions
  ) {
    this.frameIntervalMs = 1000 / Math.max(5, Math.min(60, options.fps));
    this.loadSchedule(options.scheduleUrl);
    this.startLoops();
  }

  public setFilterActive(active: boolean) {
    this.filterActive = active;
    for (const marker of this.markers.values()) {
      if (typeof marker.setMap === "function") {
        marker.setMap(active ? this.map : null);
      } else {
        marker.map = active ? this.map : null;
      }
    }
  }

  private async loadSchedule(url: string) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        this.schedule = await res.json();
      }
    } catch (e) {
      console.warn("[ha-gmap-card] Could not load transit schedule:", e);
    }
  }

  private startLoops() {
    this.ingestTimer = setInterval(() => {
      this.ingestTick();
    }, 1500);

    let lastFrame = performance.now();
    const render = (now: number) => {
      const elapsed = now - lastFrame;
      if (elapsed >= this.frameIntervalMs) {
        lastFrame = now - (elapsed % this.frameIntervalMs);
        this.renderTick();
      }
      this.animTimer = requestAnimationFrame(render);
    };
    this.animTimer = requestAnimationFrame(render);
  }

  private ingestTick() {
    if (!this.schedule || !this.schedule.profiles) return;
    const nowSec = resolveServiceDaySeconds(new Date());

    const activeKeys = new Set<string>();

    for (let pIdx = 0; pIdx < this.schedule.profiles.length; pIdx++) {
      const prof = this.schedule.profiles[pIdx];
      if (!prof.pts || prof.pts.length < 2) continue;
      const tripDuration = prof.pts[prof.pts.length - 1][0];

      // Generalized frequency: simulate trains running every 360-480s along profile
      const headwaySec = 360;
      const bucketIdx = Math.floor(nowSec / headwaySec);

      for (let offset = -1; offset <= 1; offset++) {
        const tripStartSec = (bucketIdx + offset) * headwaySec;
        const tripElapsed = nowSec - tripStartSec;

        if (tripElapsed >= 0 && tripElapsed <= tripDuration) {
          const tripKey = `prof_${pIdx}_${bucketIdx + offset}`;
          activeKeys.add(tripKey);

          if (!this.activeTrips.has(tripKey)) {
            this.activeTrips.set(tripKey, {
              pts: prof.pts,
              startSec: tripStartSec,
              line: prof.h || "SkyTrain"
            });
          }

          if (!this.markers.has(tripKey)) {
            // Create vehicle marker using standard raster Marker
            const marker = new this.googleMaps.Marker({
              position: new this.googleMaps.LatLng(prof.pts[0][1], prof.pts[0][2]),
              map: this.filterActive ? this.map : null,
              title: prof.h || "SkyTrain",
              icon: {
                url: "/local/canada-line.svg",
                scaledSize: new this.googleMaps.Size(24, 24),
                anchor: new this.googleMaps.Point(12, 12)
              },
              zIndex: 250
            });
            this.markers.set(tripKey, marker);
          }
        }
      }
    }

    // Prune finished trips
    for (const [key, marker] of this.markers.entries()) {
      if (!activeKeys.has(key)) {
        if (typeof marker.setMap === "function") marker.setMap(null);
        else marker.map = null;
        this.markers.delete(key);
        this.activeTrips.delete(key);
      }
    }
  }

  private renderTick() {
    if (!this.filterActive || !this.map) return;
    const nowSec = resolveServiceDaySeconds(new Date());

    const zoom = this.map.getZoom ? this.map.getZoom() : 15;
    if (zoom < this.options.minZoom) {
      // Out of zoom range - hide markers
      for (const marker of this.markers.values()) {
        if (marker.getVisible && marker.getVisible()) marker.setVisible(false);
      }
      return;
    }

    const bounds = this.map.getBounds ? this.map.getBounds() : null;

    for (const [key, trip] of this.activeTrips.entries()) {
      const marker = this.markers.get(key);
      if (!marker) continue;

      const elapsed = nowSec - trip.startSec;
      const coord = interpolateTripPosition(trip.pts, elapsed);

      if (coord) {
        const latLng = new this.googleMaps.LatLng(coord.lat, coord.lng);
        const inBounds = bounds ? bounds.contains(latLng) : true;

        if (inBounds) {
          if (typeof marker.setPosition === "function") {
            marker.setPosition(latLng);
          } else {
            marker.position = latLng;
          }
          if (marker.getVisible && !marker.getVisible()) marker.setVisible(true);
        } else {
          if (marker.getVisible && marker.getVisible()) marker.setVisible(false);
        }
      }
    }
  }

  public destroy() {
    if (this.ingestTimer) {
      clearInterval(this.ingestTimer);
      this.ingestTimer = null;
    }
    if (this.animTimer) {
      cancelAnimationFrame(this.animTimer);
      this.animTimer = null;
    }
    for (const marker of this.markers.values()) {
      try {
        if (typeof marker.setMap === "function") marker.setMap(null);
        else marker.map = null;
      } catch (_) {}
    }
    this.markers.clear();
    this.activeTrips.clear();
  }
}
