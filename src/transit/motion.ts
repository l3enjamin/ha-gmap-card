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
const rawSvgCache = new Map<string, string | Promise<string | null>>();
const customSvgBadgeCache = new Map<string, string>();

export interface SvgBadgeStyleOptions {
  size?: number;
  shape?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
}

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

export function resolveCustomIconUrl(iconSpec: string): string | null {
  if (!iconSpec || typeof iconSpec !== "string") return null;
  const trimmed = iconSpec.trim();
  if (trimmed.startsWith("cli:")) {
    const cliName = trimmed.slice(4).trim();
    return cliName ? `/custom_local_icons/icons/${encodeURIComponent(cliName)}.svg` : null;
  }
  return null;
}

export function buildSvgBadgeDataUrl(
  innerMarkup: string,
  viewBox: string,
  opts: SvgBadgeStyleOptions & { defaultBg?: string; fgColor?: string } = {}
): string {
  const sz = Number(opts.size) || 24;
  const shape = opts.shape && opts.shape !== "auto" && opts.shape !== "icon" ? opts.shape : "circle";
  const w = shape === "rectangle" ? Math.round(sz * 1.4) : sz;
  const h = sz;
  const bw = opts.borderWidth ?? (opts.borderColor ? 1.5 : 0);
  const pad = opts.padding ?? (bw > 0 || opts.bgColor ? 2 : 0);
  const bg = opts.bgColor || opts.defaultBg || "#ffffff";
  const border = opts.borderColor || "#ffffff";
  const rx = opts.borderRadius ?? (shape === "circle" ? Math.max(w, h) / 2 : 4);
  const inset = bw + pad;
  const innerW = Math.max(4, w - inset * 2);
  const innerH = Math.max(4, h - inset * 2);

  const bgShape =
    shape === "circle"
      ? `<circle cx='${w / 2}' cy='${h / 2}' r='${Math.max(1, Math.min(w, h) / 2 - bw / 2)}' fill='${bg}'${bw > 0 ? ` stroke='${border}' stroke-width='${bw}'` : ""}/>`
      : `<rect x='${bw / 2}' y='${bw / 2}' width='${Math.max(1, w - bw)}' height='${Math.max(1, h - bw)}' rx='${rx}' fill='${bg}'${bw > 0 ? ` stroke='${border}' stroke-width='${bw}'` : ""}/>`;

  const fgAttr = opts.fgColor ? ` fill='${opts.fgColor}'` : "";
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' width='${w}' height='${h}'>` +
    bgShape +
    `<svg x='${inset}' y='${inset}' width='${innerW}' height='${innerH}' viewBox='${viewBox}' preserveAspectRatio='xMidYMid meet'${fgAttr}>${innerMarkup}</svg>` +
    `</svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function parseSvgParts(svgText: string): { viewBox: string; inner: string } {
  const openTagMatch = svgText.match(/<svg([^>]*)>/i);
  const attrs = openTagMatch ? openTagMatch[1] : "";
  const vbMatch = attrs.match(/viewBox=["']([^"']+)["']/i);
  let viewBox = vbMatch ? vbMatch[1].trim() : "";
  if (!viewBox) {
    const wMatch = attrs.match(/width=["']([\d.]+)/i);
    const hMatch = attrs.match(/height=["']([\d.]+)/i);
    const w = wMatch ? wMatch[1] : "24";
    const h = hMatch ? hMatch[1] : "24";
    viewBox = `0 0 ${w} ${h}`;
  }
  const innerMatch = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  return { viewBox, inner: innerMatch ? innerMatch[1] : "" };
}

export function resolveCustomSvgBadgeDataUrl(
  svgUrl: string,
  opts: SvgBadgeStyleOptions = {},
  onReady?: (url: string) => void
): string | null {
  if (!svgUrl || typeof svgUrl !== "string") return null;
  const sz = Number(opts.size) || 24;
  const shape = opts.shape || "circle";
  const bg = opts.bgColor || "#ffffff";
  const border = opts.borderColor || "";
  const bw = opts.borderWidth ?? "";
  const br = opts.borderRadius ?? "";
  const pad = opts.padding ?? "";
  const cacheKey = `${svgUrl}|${sz}|${shape}|${bg}|${border}|${bw}|${br}|${pad}`;

  const cachedBadge = customSvgBadgeCache.get(cacheKey);
  if (cachedBadge) return cachedBadge;

  const formatFromText = (svgText: string): string => {
    const { viewBox, inner } = parseSvgParts(svgText);
    const dataUrl = buildSvgBadgeDataUrl(inner, viewBox, { ...opts, defaultBg: "#ffffff" });
    customSvgBadgeCache.set(cacheKey, dataUrl);
    return dataUrl;
  };

  const cachedRaw = rawSvgCache.get(svgUrl);
  if (typeof cachedRaw === "string") {
    return formatFromText(cachedRaw);
  }
  if (cachedRaw && typeof (cachedRaw as Promise<string | null>).then === "function") {
    if (onReady) {
      (cachedRaw as Promise<string | null>).then((txt) => {
        if (txt) onReady(formatFromText(txt));
      });
    }
    return null;
  }

  const fetchPromise = fetch(svgUrl)
    .then((r) => (r.ok ? r.text() : null))
    .then((svgText) => {
      if (!svgText) {
        rawSvgCache.delete(svgUrl);
        return null;
      }
      rawSvgCache.set(svgUrl, svgText);
      return svgText;
    })
    .catch(() => {
      rawSvgCache.delete(svgUrl);
      return null;
    });

  rawSvgCache.set(svgUrl, fetchPromise);
  if (onReady) {
    fetchPromise.then((txt) => {
      if (txt) onReady(formatFromText(txt));
    });
  }
  return null;
}

export function resolveMdiIconDataUrl(
  iconSpec: string,
  opts: SvgBadgeStyleOptions & { fgColor?: string; badge?: boolean } = {},
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
  const shape = opts.shape || "circle";
  const bw = opts.borderWidth ?? (badge ? 1.5 : 0);
  const br = opts.borderRadius ?? "";
  const pad = opts.padding ?? "";
  const cacheKey = `${mdiName}|${sz}|${bgColor}|${fgColor}|${borderColor}|${badge ? 1 : 0}|${shape}|${bw}|${br}|${pad}`;

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
      if (!svgText) {
        mdiIconCache.delete(cacheKey);
        return null;
      }
      const innerMatch = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
      const inner = innerMatch ? innerMatch[1].replace(/fill="[^"]*"/g, "") : "";
      const dataUrl = badge
        ? buildSvgBadgeDataUrl(inner, "0 0 24 24", {
            size: sz,
            shape,
            bgColor,
            borderColor,
            borderWidth: bw,
            borderRadius: opts.borderRadius,
            padding: opts.padding ?? 3,
            fgColor
          })
        : "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${sz}' height='${sz}' fill='${fgColor}'>${inner}</svg>`
          );
      mdiIconCache.set(cacheKey, dataUrl);
      return dataUrl;
    })
    .catch(() => {
      mdiIconCache.delete(cacheKey);
      return null;
    });

  mdiIconCache.set(cacheKey, fetchPromise);
  if (onReady) {
    fetchPromise.then((url) => {
      if (url) onReady(url);
    });
  }
  return null;
}

export function buildTriangleSvgDataUrl(opts: {
  size?: number;
  fillColor?: string;
  borderColor?: string;
  borderWidth?: number;
} = {}): string {
  const sz = Number(opts.size) || 24;
  const fill = opts.fillColor || "#0072CE";
  const stroke = opts.borderColor || "#ffffff";
  const sw = opts.borderWidth ?? 1.5;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${sz}' height='${sz}'>` +
    `<polygon points='12,2 21,21 12,17 3,21' fill='${fill}' stroke='${stroke}' stroke-width='${sw}' stroke-linejoin='round'/>` +
    `</svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

export function getTransitVehicleIcon(
  googleMaps: any,
  routeKey: string,
  motionCfg: TransitMotionConfig,
  routeType: "subway" | "bus",
  onAsyncReady?: (iconObj: any) => void,
  schedule?: TransitSchedule | null,
  bearingDeg = 0
): any {
  const rKeyLower = String(routeKey || "").toLowerCase();
  const routeCfg = motionCfg.routes?.[routeKey] || motionCfg.routes?.[rKeyLower] || {};
  const schedRouteMeta = schedule?.routes?.[routeKey] || schedule?.routes?.[rKeyLower];
  const vehicles = motionCfg.vehicles || {};

  const sz = Number(routeCfg.iconSize || 26);
  const shape = routeCfg.shape ?? motionCfg.vehicleShape;
  const bgColor = routeCfg.backgroundColor ?? motionCfg.vehicleBackgroundColor ?? routeCfg.color ?? schedRouteMeta?.color;
  const borderColor = routeCfg.borderColor ?? motionCfg.vehicleBorderColor;
  const borderWidth = routeCfg.borderWidth ?? motionCfg.vehicleBorderWidth;
  const borderRadius = routeCfg.borderRadius ?? motionCfg.vehicleBorderRadius;
  const padding = routeCfg.padding ?? motionCfg.vehiclePadding;

  if (shape === "triangle" || shape === "arrow") {
    const fillColor = bgColor || (routeType === "bus" ? "#008542" : "#0072CE");
    const strokeColor = borderColor || "#ffffff";
    const sw = borderWidth ?? 1.5;
    if (googleMaps?.SymbolPath?.FORWARD_CLOSED_ARROW !== undefined) {
      return {
        path: googleMaps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: Math.max(3, sz / 4.2),
        fillColor,
        fillOpacity: 1,
        strokeColor,
        strokeWeight: sw,
        rotation: bearingDeg
      };
    }
    const triUrl = buildTriangleSvgDataUrl({ size: sz, fillColor, borderColor: strokeColor, borderWidth: sw });
    return {
      url: triUrl,
      scaledSize: new googleMaps.Size(sz, sz),
      anchor: new googleMaps.Point(sz / 2, sz / 2)
    };
  }

  const iconSpec =
    routeCfg.image ||
    routeCfg.icon ||
    vehicles[routeKey] ||
    vehicles[rKeyLower] ||
    vehicles[routeType] ||
    DEFAULT_VEHICLE_ICONS[routeKey] ||
    DEFAULT_VEHICLE_ICONS[rKeyLower] ||
    DEFAULT_VEHICLE_ICONS[routeType] ||
    (routeType === "bus" ? GENERIC_BUS_SVG : GENERIC_SUBWAY_SVG);

  const w = shape === "rectangle" ? Math.round(sz * 1.4) : sz;
  const hasBadgeStyle = Boolean(
    (shape && shape !== "auto" && shape !== "icon") ||
      bgColor ||
      borderColor ||
      borderWidth !== undefined ||
      borderRadius !== undefined ||
      padding !== undefined
  );

  const makeIconObj = (url: string, width = sz, height = sz) => ({
    url,
    scaledSize: new googleMaps.Size(width, height),
    anchor: new googleMaps.Point(width / 2, height / 2)
  });

  const customUrl = typeof iconSpec === "string" ? resolveCustomIconUrl(iconSpec) : null;
  const svgUrl =
    customUrl ||
    (typeof iconSpec === "string" && /\.svg(\?|$)/i.test(iconSpec) && !iconSpec.startsWith("data:") ? iconSpec : null);

  if (svgUrl) {
    if (hasBadgeStyle) {
      const badgedUrl = resolveCustomSvgBadgeDataUrl(
        svgUrl,
        { size: sz, shape, bgColor, borderColor, borderWidth, borderRadius, padding },
        (dataUrl) => {
          if (onAsyncReady && dataUrl) onAsyncReady(makeIconObj(dataUrl, w, sz));
        }
      );
      if (badgedUrl) return makeIconObj(badgedUrl, w, sz);
    }
    return makeIconObj(svgUrl);
  }

  // If no custom icon was configured but schedule/route has a color, render a colored subway/bus SVG badge
  if (!routeCfg.icon && !routeCfg.image && !vehicles[routeKey] && !vehicles[rKeyLower] && !vehicles[routeType] && schedRouteMeta?.color) {
    const colorUrl = buildSvgBadgeDataUrl(
      routeType === "bus"
        ? "<path d='M16 9.5H8v-3h8v3zm-.8-5.5H8.8c-1.8 0-2.8 1-2.8 2.8v7.4c0 1.2.8 2.2 2 2.2v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16h3v1.6c0 .5.4 1 1 1h.5c.6 0 1-.5 1-1V16c1.2 0 2-1 2-2.2V6.8c0-1.8-1-2.8-2.8-2.8z' fill='#ffffff'/>"
        : "<path d='M12 4c-3.5 0-6 .4-6 3.5v7c0 1.9 1.3 3.5 3 3.5L8 19.5v.5h8v-.5L15 18c1.7 0 3-1.6 3-3.5v-7c0-3.1-2.5-3.5-6-3.5zm-3 11a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm1-5H8V7.5h8V10z' fill='#ffffff'/>",
      "0 0 24 24",
      {
        size: sz,
        shape: shape || "circle",
        bgColor: schedRouteMeta.color,
        borderColor: borderColor || "#ffffff",
        borderWidth: borderWidth ?? 1.5,
        borderRadius,
        padding: padding ?? 2
      }
    );
    return makeIconObj(colorUrl, w, sz);
  }

  if (typeof iconSpec === "string" && iconSpec.trim().startsWith("mdi:")) {
    const fallbackUrl =
      DEFAULT_VEHICLE_ICONS[rKeyLower] ||
      DEFAULT_VEHICLE_ICONS[routeType] ||
      (routeType === "bus" ? GENERIC_BUS_SVG : GENERIC_SUBWAY_SVG);
    const resolvedBg = bgColor || routeCfg.color || schedRouteMeta?.color || (routeType === "bus" ? "#008542" : "#0072CE");
    const cachedUrl = resolveMdiIconDataUrl(
      iconSpec,
      {
        size: sz,
        shape,
        bgColor: resolvedBg,
        fgColor: "#ffffff",
        borderColor: borderColor || "#ffffff",
        borderWidth,
        borderRadius,
        padding,
        badge: true
      },
      (dataUrl) => {
        if (onAsyncReady && dataUrl) onAsyncReady(makeIconObj(dataUrl, w, sz));
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
  lineKey: string;
  lastBearing?: number;
}

export interface TransitMotionHost {
  entityConfigs: CardEntityConfig[];
  entityMarkers: Map<string, any>;
  routePolylines: Map<string, number[][][]>;
  isEntityFilterActive: (entityId: string) => boolean;
  hasMapId?: boolean;
}

export class TransitMotionEngine {
  private activeTrips = new Map<string, ActiveTripMarkerState>();
  private scheduledMarkers = new Map<string, any>();
  private busStates = new Map<string, BusMotionState>();
  private schedule: TransitSchedule | null = null;
  private loadedUrl: string | null = null;
  private ingestTimer: any = null;
  private animTimer: any = null;
  private zoomListener: any = null;
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

  public getSchedule(): TransitSchedule | null {
    return this.schedule;
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
          .catch(() => null)
          .then((res) => {
            if (!res) scheduleCache.delete(url);
            return res;
          });
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
      this.zoomListener = this.map.addListener("zoom_changed", () => this.checkZoom());
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
      const prevTrip = this.activeTrips.get(trip.key);
      this.activeTrips.set(trip.key, {
        pts: trip.profile.pts,
        startSec: trip.startSec,
        simOffset: trip.simOffset,
        lineKey: trip.lineKey,
        lastBearing: prevTrip?.lastBearing
      });

      if (!this.scheduledMarkers.has(trip.key)) {
        const routeCfg =
          this.motionConfig.routes?.[trip.lineKey] ||
          this.motionConfig.routes?.[trip.lineKey.toLowerCase()];
        const schedMeta =
          this.schedule.routes?.[trip.lineKey] ||
          this.schedule.routes?.[trip.lineKey.toLowerCase()];
        const routeLabel = routeCfg?.label || routeCfg?.name || schedMeta?.label || "";
        const baseTitle = trip.profile.h || trip.lineKey;
        const markerTitle = routeLabel ? `${routeLabel} · ${baseTitle}` : String(baseTitle);
        const show = this.filterActive && !this.isCulled && this.motionConfig.enabled;
        const shape = routeCfg?.shape ?? this.motionConfig.vehicleShape;
        const useCssDom =
          Boolean(this.host.hasMapId) &&
          Boolean(this.googleMaps.marker?.AdvancedMarkerElement) &&
          (shape === "triangle" || shape === "arrow" || routeCfg?.directional || this.motionConfig.vehicleDirectional);

        let newMarker: any = null;
        let domImgEl: HTMLImageElement | null = null;
        const iconObj = getTransitVehicleIcon(
          this.googleMaps,
          trip.lineKey,
          this.motionConfig,
          "subway",
          (asyncIcon) => {
            if (newMarker && typeof newMarker.setIcon === "function") {
              newMarker.setIcon(asyncIcon);
            } else if (domImgEl && asyncIcon?.url) {
              domImgEl.src = asyncIcon.url;
            }
          },
          this.schedule
        );

        if (useCssDom) {
          const sz = Number(routeCfg?.iconSize || 26);
          const fill = routeCfg?.backgroundColor || this.motionConfig.vehicleBackgroundColor || routeCfg?.color || schedMeta?.color || "#0072CE";
          const stroke = routeCfg?.borderColor || this.motionConfig.vehicleBorderColor || "#ffffff";
          const sw = routeCfg?.borderWidth ?? this.motionConfig.vehicleBorderWidth ?? 1.5;
          const wrapper = document.createElement("div");
          wrapper.style.cssText = `width:${sz}px;height:${sz}px;display:flex;align-items:center;justify-content:center;transition:transform 150ms linear;will-change:transform;`;
          if (shape === "triangle" || shape === "arrow") {
            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", String(sz));
            svg.setAttribute("height", String(sz));
            svg.style.cssText = "display:block;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.45));";
            const poly = document.createElementNS(svgNS, "polygon");
            poly.setAttribute("points", "12,2 21,21 12,17 3,21");
            poly.setAttribute("fill", String(fill));
            poly.setAttribute("stroke", String(stroke));
            poly.setAttribute("stroke-width", String(sw));
            poly.setAttribute("stroke-linejoin", "round");
            svg.appendChild(poly);
            wrapper.appendChild(svg);
          } else if (iconObj?.url) {
            const img = document.createElement("img");
            img.src = iconObj.url;
            img.style.cssText = `width:${sz}px;height:${sz}px;object-fit:contain;display:block;`;
            domImgEl = img;
            wrapper.appendChild(img);
          }
          newMarker = new this.googleMaps.marker.AdvancedMarkerElement({
            position: { lat: trip.profile.pts[0][1], lng: trip.profile.pts[0][2] },
            map: show ? this.map : null,
            title: markerTitle,
            content: wrapper,
            zIndex: 250
          });
        } else {
          newMarker = new this.googleMaps.Marker({
            position: new this.googleMaps.LatLng(trip.profile.pts[0][1], trip.profile.pts[0][2]),
            map: show ? this.map : null,
            title: markerTitle,
            icon: iconObj,
            zIndex: 250,
            visible: show
          });
        }
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
          else marker.position = { lat: coord.lat, lng: coord.lng };
          if (coord.bearing !== undefined && (trip.lastBearing === undefined || Math.abs(coord.bearing - trip.lastBearing) > 0.5)) {
            trip.lastBearing = coord.bearing;
            if (marker.content && marker.content.style) {
              marker.content.style.transform = `rotate(${coord.bearing.toFixed(1)}deg)`;
            } else if (typeof marker.getIcon === "function" && typeof marker.setIcon === "function") {
              const curIcon = marker.getIcon();
              if (curIcon && typeof curIcon === "object" && "path" in curIcon) {
                marker.setIcon({ ...curIcon, rotation: coord.bearing });
              }
            }
          }
          if (typeof marker.getMap === "function" && !marker.getMap()) marker.setMap(this.map);
          else if (!("getMap" in marker) && !marker.map) marker.map = this.map;
          if (typeof marker.setVisible === "function") marker.setVisible(true);
        } else {
          if (typeof marker.setVisible === "function") marker.setVisible(false);
          else if (!("setVisible" in marker)) marker.map = null;
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
    this.zoomListener?.remove?.();
    this.zoomListener = null;
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
