import { CardEntityConfig, TransitMotionConfig } from "../config/schema";
import {
  advanceAlongPolylines,
  findActiveScheduledTrips,
  haversineMeters,
  interpolateTripPosition,
  matchEntityPattern,
  resolveServiceDaySeconds,
  TransitSchedule
} from "./schedule";

const MDI_SVG_CDN = "https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/";
const scheduleCache = new Map<string, Promise<TransitSchedule | null>>();
const mdiIconCache = new Map<string, string | Promise<string | null>>();

export const GENERIC_SUBWAY_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%230072CE' stroke='%23ffffff' stroke-width='1.5'/><path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='%23ffffff'/></svg>";

export const GENERIC_BUS_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='26' height='26'><circle cx='12' cy='12' r='11' fill='%23008542' stroke='%23ffffff' stroke-width='1.5'/><path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8zM9 13.8a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z' fill='%23ffffff'/></svg>";

const DEFAULT_VEHICLE_ICONS: Record<string, string> = {
  subway: GENERIC_SUBWAY_SVG,
  metro: GENERIC_SUBWAY_SVG,
  train: GENERIC_SUBWAY_SVG,
  rail: GENERIC_SUBWAY_SVG,
  tram: GENERIC_SUBWAY_SVG,
  bus: GENERIC_BUS_SVG
};

export function resolveMdiIconDataUrl(
  iconSpec: string,
  opts: { size?: number; bgColor?: string; fgColor?: string; borderColor?: string; badge?: boolean } = {},
  onReady?: (url: string) => void
): string | null {
  if (!iconSpec || typeof iconSpec !== "string") return null;
  const trimmed = iconSpec.trim();
  if (!trimmed.startsWith("mdi:")) return null;
  const mdiName = trimmed.slice(4).trim();
  if (!mdiName) return null;

  const sz = Number(opts.size) || 24;
  const bgColor = opts.bgColor || "";
  const fgColor = opts.fgColor || (bgColor ? "#ffffff" : "#1E88E5");
  const borderColor = opts.borderColor || "#ffffff";
  const badge = opts.badge !== false && Boolean(bgColor);
  const cacheKey = `${mdiName}|${sz}|${bgColor}|${fgColor}|${borderColor}|${badge ? 1 : 0}`;

  if (mdiIconCache.has(cacheKey)) {
    const cached = mdiIconCache.get(cacheKey);
    if (typeof cached === "string") return cached;
    if (cached && typeof (cached as Promise<string | null>).then === "function" && onReady) {
      (cached as Promise<string | null>).then((url) => {
        if (url) onReady(url);
      });
    }
    return null;
  }

  const fetchPromise = fetch(`${MDI_SVG_CDN}${encodeURIComponent(mdiName)}.svg`)
    .then((r) => (r.ok ? r.text() : null))
    .then((svgText) => {
      if (!svgText) return null;
      const innerMatch = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
      const inner = innerMatch ? innerMatch[1].replace(/fill="[^"]*"/g, "") : "";
      const outSvg = badge
        ? `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${sz}' height='${sz}'>` +
          `<circle cx='12' cy='12' r='11' fill='${bgColor}' stroke='${borderColor}' stroke-width='1.5'/>` +
          `<g transform='translate(4.2,4.2) scale(0.65)' fill='${fgColor}'>${inner}</g></svg>`
        : `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${sz}' height='${sz}' fill='${fgColor}'>${inner}</svg>`;
      const dataUrl = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(outSvg);
      mdiIconCache.set(cacheKey, dataUrl);
      return dataUrl;
    })
    .catch(() => null);

  mdiIconCache.set(cacheKey, fetchPromise);
  if (onReady) {
    fetchPromise.then((url) => {
      if (url) onReady(url);
    });
  }
  return null;
}

export function getTransitVehicleIcon(
  googleMaps: any,
  routeKey: string,
  motionCfg: TransitMotionConfig,
  routeType: "subway" | "bus",
  onAsyncReady?: (iconObj: any) => void
): any {
  const rKeyLower = String(routeKey || "").toLowerCase();
  const routeCfg = motionCfg.routes?.[routeKey] || motionCfg.routes?.[rKeyLower] || {};
  const vehicles = motionCfg.vehicles || {};

  const iconSpec =
    routeCfg.icon ||
    vehicles[routeKey] ||
    vehicles[rKeyLower] ||
    vehicles[routeType] ||
    DEFAULT_VEHICLE_ICONS[routeKey] ||
    DEFAULT_VEHICLE_ICONS[rKeyLower] ||
    DEFAULT_VEHICLE_ICONS[routeType] ||
    (routeType === "bus" ? GENERIC_BUS_SVG : GENERIC_SUBWAY_SVG);

  const sz = Number(routeCfg.iconSize || 26);
  const makeIconObj = (url: string) => ({
    url,
    scaledSize: new googleMaps.Size(sz, sz),
    anchor: new googleMaps.Point(sz / 2, sz / 2)
  });

  if (typeof iconSpec === "string" && iconSpec.trim().startsWith("mdi:")) {
    const fallbackUrl =
      DEFAULT_VEHICLE_ICONS[rKeyLower] ||
      DEFAULT_VEHICLE_ICONS[routeType] ||
      (routeType === "bus" ? GENERIC_BUS_SVG : GENERIC_SUBWAY_SVG);
    const bgColor = routeCfg.color || (routeType === "bus" ? "#008542" : "#0072CE");
    const cachedUrl = resolveMdiIconDataUrl(
      iconSpec,
      { size: sz, bgColor, fgColor: "#ffffff", badge: true },
      (dataUrl) => {
        if (onAsyncReady && dataUrl) onAsyncReady(makeIconObj(dataUrl));
      }
    );
    return makeIconObj(cachedUrl || fallbackUrl);
  }

  return makeIconObj(iconSpec);
}

interface BusMotionState {
  lastLat: number;
  lastLng: number;
  lastUpdateMs: number;
  velocityMps: number;
  routeKey: string;
}

interface ActiveTripMarkerState {
  pts: [number, number, number][];
  startSec: number;
  simOffset: number;
}

export interface TransitMotionHost {
  entityConfigs: CardEntityConfig[];
  entityMarkers: Map<string, any>;
  routePolylines: Map<string, number[][][]>;
  isEntityFilterActive: (entityId: string) => boolean;
}

export class TransitMotionEngine {
  private activeTrips = new Map<string, ActiveTripMarkerState>();
  private scheduledMarkers = new Map<string, any>();
  private busStates = new Map<string, BusMotionState>();
  private schedule: TransitSchedule | null = null;
  private loadedUrl: string | null = null;
  private ingestTimer: any = null;
  private animTimer: any = null;
  private filterActive = true;
  private isCulled = false;
  private lastZoom: number | null = null;
  private frameIntervalMs: number;
  private destroyed = false;

  constructor(
    private googleMaps: any,
    private map: any,
    private motionConfig: TransitMotionConfig,
    private host: TransitMotionHost
  ) {
    this.frameIntervalMs = 1000 / Math.max(5, Math.min(60, motionConfig.fps));
    this.syncConfig(motionConfig);
    this.setupListeners();
    this.checkZoom();
    this.startLoops();
  }

  public syncConfig(nextCfg: TransitMotionConfig) {
    this.motionConfig = nextCfg;
    this.frameIntervalMs = 1000 / Math.max(5, Math.min(60, nextCfg.fps));
    if (nextCfg.scheduleUrl && nextCfg.scheduleUrl !== this.loadedUrl) {
      this.loadedUrl = nextCfg.scheduleUrl;
      this.loadSchedule(nextCfg.scheduleUrl);
    } else if (!nextCfg.scheduleUrl) {
      this.loadedUrl = null;
      this.schedule = null;
      for (const marker of this.scheduledMarkers.values()) {
        try {
          if (typeof marker.setMap === "function") marker.setMap(null);
          else marker.map = null;
        } catch (_) {}
      }
      this.scheduledMarkers.clear();
      this.activeTrips.clear();
    }
    this.updateVisibility();
  }

  public setFilterActive(active: boolean) {
    this.filterActive = active;
    this.updateVisibility();
    if (active) {
      this.ingestTick();
    } else {
      this.stopAnimLoop();
    }
  }

  public getEntityConfig(entityId: string): CardEntityConfig | undefined {
    const list = this.host.entityConfigs;
    const exact = list.find((e) => e.entityId === entityId);
    if (exact) return exact;
    return list.find((e) => e.entityId && matchEntityPattern(entityId, e.entityId));
  }

  public isBusEntity(entityId: string): boolean {
    if (!entityId) return false;
    const entCfg = this.getEntityConfig(entityId);
    if (entCfg?.transitType === "bus") return true;
    if (entCfg?.transitType && entCfg.transitType !== "bus") return false;
    if (this.motionConfig.busMatch && this.motionConfig.busMatch.length > 0) {
      return this.motionConfig.busMatch.some((pat) => matchEntityPattern(entityId, pat));
    }
    if (!entityId.startsWith("geo_location.")) return false;
    if (entityId.endsWith("_bus") || /(^|[_.-])bus([_.-]|$)/i.test(entityId)) return true;
    if (entCfg?.picture && entCfg.picture.toLowerCase().includes("bus")) return true;
    if (entCfg?.filterGroup && entCfg.filterGroup === this.motionConfig.filterGroup) return true;
    return false;
  }

  public getEntityMinZoom(entityId: string): number | null {
    const entCfg = this.getEntityConfig(entityId);
    if (entCfg?.minZoom !== undefined && entCfg.minZoom !== null && Number.isFinite(entCfg.minZoom)) {
      return entCfg.minZoom;
    }
    if (this.isBusEntity(entityId)) {
      if (this.motionConfig.busMinZoom !== null && Number.isFinite(this.motionConfig.busMinZoom)) {
        return this.motionConfig.busMinZoom;
      }
      return this.motionConfig.minZoom;
    }
    return null;
  }

  public updateVisibility() {
    if (!this.map) return;
    const zoom = typeof this.map.getZoom === "function" ? this.map.getZoom() : 15;
    this.isCulled = zoom < this.motionConfig.minZoom;
    const showScheduled = this.filterActive && !this.isCulled && this.motionConfig.enabled;

    for (const marker of this.scheduledMarkers.values()) {
      if (!marker) continue;
      if (typeof marker.setVisible === "function") marker.setVisible(showScheduled);
      if (typeof marker.setMap === "function") marker.setMap(showScheduled ? this.map : null);
      else marker.map = showScheduled ? this.map : null;
    }

    for (const [entityId, marker] of this.host.entityMarkers.entries()) {
      if (!marker) continue;
      const minZ = this.getEntityMinZoom(entityId);
      const isBus = this.isBusEntity(entityId);
      const filterOk = this.host.isEntityFilterActive(entityId);
      const zoomOk = minZ === null ? true : zoom >= minZ;
      const busGroupOk = !isBus || this.filterActive;
      const visible = filterOk && zoomOk && busGroupOk;

      if (typeof marker.setVisible === "function") {
        marker.setVisible(visible);
      } else {
        marker.map = visible ? this.map : null;
      }
    }
  }

  private async loadSchedule(url: string) {
    try {
      let p = scheduleCache.get(url);
      if (!p) {
        p = fetch(url)
          .then((r) => (r.ok ? (r.json() as Promise<TransitSchedule>) : null))
          .catch(() => null);
        scheduleCache.set(url, p);
      }
      const data = await p;
      if (data && !this.destroyed && this.loadedUrl === url) {
        this.schedule = data;
        this.ingestTick();
      }
    } catch (e) {
      console.warn("[ha-gmap-card] Could not load transit schedule:", e);
    }
  }

  private setupListeners() {
    if (this.map && typeof this.map.addListener === "function") {
      this.map.addListener("zoom_changed", () => this.checkZoom());
    }
  }

  private checkZoom() {
    if (!this.map) return;
    const zoom = typeof this.map.getZoom === "function" ? this.map.getZoom() : 15;
    const shouldCull = zoom < this.motionConfig.minZoom;
    if (shouldCull !== this.isCulled || zoom !== this.lastZoom) {
      this.isCulled = shouldCull;
      this.lastZoom = zoom;
      this.updateVisibility();
    }
  }

  private startLoops() {
    this.ingestTimer = setInterval(() => {
      if (!this.destroyed && (typeof document === "undefined" || !document.hidden)) {
        this.ingestTick();
      }
    }, 1000);
    this.ingestTick();
  }

  private hasActiveMotion(): boolean {
    if (!this.filterActive || !this.motionConfig.enabled) return false;
    if (!this.isCulled && this.activeTrips.size > 0) return true;
    const nowMs = Date.now();
    for (const bState of this.busStates.values()) {
      if ((nowMs - bState.lastUpdateMs) / 1000 < 35 && bState.velocityMps > 1.0) {
        return true;
      }
    }
    return false;
  }

  private ensureAnimLoop() {
    if (this.destroyed || this.animTimer !== null || !this.hasActiveMotion()) return;

    const scheduleFrame = (cb: (now: number) => void) =>
      typeof requestAnimationFrame === "function"
        ? requestAnimationFrame(cb)
        : setTimeout(() => cb(Date.now()), this.frameIntervalMs);

    let lastFrame = typeof performance !== "undefined" ? performance.now() : Date.now();
    const render = (now: number) => {
      if (this.destroyed || !this.hasActiveMotion()) {
        this.animTimer = null;
        return;
      }
      if (typeof document === "undefined" || !document.hidden) {
        const elapsed = now - lastFrame;
        if (elapsed >= this.frameIntervalMs) {
          lastFrame = now - (elapsed % this.frameIntervalMs);
          this.renderTick();
        }
      }
      this.animTimer = scheduleFrame(render);
    };
    this.animTimer = scheduleFrame(render);
  }

  private stopAnimLoop() {
    if (this.animTimer !== null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(this.animTimer);
      } else {
        clearTimeout(this.animTimer);
      }
      this.animTimer = null;
    }
  }

  private ingestTick() {
    if (!this.motionConfig.enabled || !this.map) return;
    if (this.filterActive && !this.isCulled) {
      this.ingestScheduledVehicles(new Date());
    }
    this.ingestBuses(Date.now());
    if (this.hasActiveMotion()) {
      this.ensureAnimLoop();
    } else {
      this.stopAnimLoop();
    }
  }

  private ingestScheduledVehicles(nowDate: Date) {
    if (!this.schedule) return;
    const active = findActiveScheduledTrips(this.schedule, nowDate, this.motionConfig.routes, {
      simulate247: this.motionConfig.simulate247
    });
    const activeKeys = new Set<string>();

    for (const trip of active) {
      activeKeys.add(trip.key);
      this.activeTrips.set(trip.key, {
        pts: trip.profile.pts,
        startSec: trip.startSec,
        simOffset: trip.simOffset
      });

      if (!this.scheduledMarkers.has(trip.key)) {
        const routeCfg =
          this.motionConfig.routes?.[trip.lineKey] ||
          this.motionConfig.routes?.[trip.lineKey.toLowerCase()];
        const routeLabel = routeCfg?.label || routeCfg?.name || "";
        const baseTitle = trip.profile.h || trip.lineKey;
        const markerTitle = routeLabel ? `${routeLabel} · ${baseTitle}` : String(baseTitle);
        const show = this.filterActive && !this.isCulled && this.motionConfig.enabled;

        let newMarker: any = null;
        const iconObj = getTransitVehicleIcon(
          this.googleMaps,
          trip.lineKey,
          this.motionConfig,
          "subway",
          (asyncIcon) => {
            if (newMarker && typeof newMarker.setIcon === "function") {
              newMarker.setIcon(asyncIcon);
            }
          }
        );

        newMarker = new this.googleMaps.Marker({
          position: new this.googleMaps.LatLng(trip.profile.pts[0][1], trip.profile.pts[0][2]),
          map: show ? this.map : null,
          title: markerTitle,
          icon: iconObj,
          zIndex: 250,
          visible: show
        });
        this.scheduledMarkers.set(trip.key, newMarker);
      }
    }

    for (const [key, marker] of this.scheduledMarkers.entries()) {
      if (!activeKeys.has(key)) {
        if (typeof marker.setMap === "function") marker.setMap(null);
        else marker.map = null;
        this.scheduledMarkers.delete(key);
        this.activeTrips.delete(key);
      }
    }
  }

  private ingestBuses(nowMs: number) {
    for (const [key, bState] of this.busStates.entries()) {
      if (!this.host.entityMarkers.has(key) && nowMs - bState.lastUpdateMs > 300000) {
        this.busStates.delete(key);
      }
    }

    for (const [entityId, marker] of this.host.entityMarkers.entries()) {
      if (!this.isBusEntity(entityId) || !marker) continue;
      const pos = typeof marker.getPosition === "function" ? marker.getPosition() : marker.position;
      if (!pos) continue;

      const curLat = typeof pos.lat === "function" ? pos.lat() : pos.lat;
      const curLng = typeof pos.lng === "function" ? pos.lng() : pos.lng;
      const existing = this.busStates.get(entityId);

      if (!existing) {
        this.busStates.set(entityId, {
          lastLat: curLat,
          lastLng: curLng,
          lastUpdateMs: nowMs,
          velocityMps: 8.5,
          routeKey: (entityId.split(".")[1] || entityId).split("_")[0].toLowerCase()
        });
        continue;
      }

      const movedMeters = haversineMeters(existing.lastLat, existing.lastLng, curLat, curLng);
      if (movedMeters > 3.0) {
        const dtSec = Math.max(1, (nowMs - existing.lastUpdateMs) / 1000);
        existing.velocityMps = Math.min(22, movedMeters / dtSec);
        existing.lastLat = curLat;
        existing.lastLng = curLng;
        existing.lastUpdateMs = nowMs;
      }
    }
  }

  private renderTick() {
    if (!this.filterActive || !this.motionConfig.enabled || !this.map) return;

    const bounds = typeof this.map.getBounds === "function" ? this.map.getBounds() : null;
    const zoom = typeof this.map.getZoom === "function" ? this.map.getZoom() : 15;
    const secNow = resolveServiceDaySeconds(new Date());

    if (!this.isCulled) {
      for (const [key, trip] of this.activeTrips.entries()) {
        const marker = this.scheduledMarkers.get(key);
        if (!marker) continue;
        const elapsed = secNow + trip.simOffset - trip.startSec;
        const coord = interpolateTripPosition(trip.pts, elapsed);
        if (!coord) continue;

        const latLng = new this.googleMaps.LatLng(coord.lat, coord.lng);
        const inView = bounds ? bounds.contains(latLng) : true;
        if (inView) {
          if (typeof marker.setPosition === "function") marker.setPosition(latLng);
          else marker.position = latLng;
          if (typeof marker.getMap === "function" && !marker.getMap()) marker.setMap(this.map);
          if (typeof marker.setVisible === "function") marker.setVisible(true);
        } else {
          if (typeof marker.setVisible === "function") marker.setVisible(false);
        }
      }
    }

    const dt = this.frameIntervalMs / 1000;
    const nowMs = Date.now();
    for (const [entityId, marker] of this.host.entityMarkers.entries()) {
      if (!marker || !this.isBusEntity(entityId)) continue;
      const busMinZ = this.getEntityMinZoom(entityId);
      if (busMinZ !== null && zoom < busMinZ) continue;
      if (typeof marker.getVisible === "function" && !marker.getVisible()) continue;

      const bState = this.busStates.get(entityId);
      if (!bState) continue;

      const elapsedSinceUpdate = (nowMs - bState.lastUpdateMs) / 1000;
      if (elapsedSinceUpdate < 35 && bState.velocityMps > 1.0) {
        const currentSpeed = bState.velocityMps * Math.max(0.2, 1.0 - elapsedSinceUpdate / 40);
        const advanceDist = currentSpeed * dt;
        const rPolys =
          this.host.routePolylines.get(bState.routeKey) ||
          this.host.routePolylines.get("route_" + bState.routeKey);
        if (!rPolys || rPolys.length === 0) continue;

        const pos = typeof marker.getPosition === "function" ? marker.getPosition() : marker.position;
        if (!pos) continue;
        const pLat = typeof pos.lat === "function" ? pos.lat() : pos.lat;
        const pLng = typeof pos.lng === "function" ? pos.lng() : pos.lng;
        const nextPt = advanceAlongPolylines(rPolys, pLat, pLng, advanceDist);
        if (nextPt) {
          const nextLatLng = new this.googleMaps.LatLng(nextPt.lat, nextPt.lng);
          if (typeof marker.setPosition === "function") marker.setPosition(nextLatLng);
          else marker.position = nextLatLng;
        }
      }
    }
  }

  public destroy() {
    this.destroyed = true;
    if (this.ingestTimer) {
      clearInterval(this.ingestTimer);
      this.ingestTimer = null;
    }
    if (this.animTimer !== null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(this.animTimer);
      } else {
        clearTimeout(this.animTimer);
      }
      this.animTimer = null;
    }
    for (const marker of this.scheduledMarkers.values()) {
      try {
        if (typeof marker.setMap === "function") marker.setMap(null);
        else marker.map = null;
      } catch (_) {}
    }
    this.scheduledMarkers.clear();
    this.activeTrips.clear();
    this.busStates.clear();
  }
}
