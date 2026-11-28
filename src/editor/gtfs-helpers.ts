import { cloneConfig } from "./helpers";

export interface GtfsSourceInfo {
  path: string;
  name: string;
  size_bytes: number;
  mtime: number;
}

export interface GtfsDiscoveredRoute {
  id: string;
  short_name: string;
  long_name: string;
  label: string;
  route_type: string;
  mode: string;
  color: string;
  line_key: string;
}

export interface GtfsExportedRouteMeta {
  label?: string;
  shortName?: string;
  color?: string;
  textColor?: string;
  routeType?: number;
  geojsonUrl?: string;
}

export interface GtfsExportResponse {
  routes_exported: number;
  profiles_count: number;
  trips_count: number;
  schedule_url: string;
  geojson_paths: string[];
  routes: Record<string, GtfsExportedRouteMeta>;
  warnings: string[];
}

export interface GtfsEditorState {
  sources: GtfsSourceInfo[];
  sourcesLoaded: boolean;
  loadingSources: boolean;
  source: string;
  outputDir: string;
  mergeExisting: boolean;
  query: string;
  routeTypeFilter: string;
  routes: GtfsDiscoveredRoute[];
  totalRoutes: number;
  loadingRoutes: boolean;
  routesLoaded: boolean;
  selectedRouteIds: string[];
  exporting: boolean;
  lastExport: GtfsExportResponse | null;
  existingScheduleUrl: string | null;
  existingRoutes: Record<string, GtfsExportedRouteMeta>;
  error: string | null;
  backendMissing: boolean;
}

export function createInitialGtfsState(defaultOutputDir = "gtfs2"): GtfsEditorState {
  return {
    sources: [],
    sourcesLoaded: false,
    loadingSources: false,
    source: "",
    outputDir: defaultOutputDir,
    mergeExisting: true,
    query: "",
    routeTypeFilter: "",
    routes: [],
    totalRoutes: 0,
    loadingRoutes: false,
    routesLoaded: false,
    selectedRouteIds: [],
    exporting: false,
    lastExport: null,
    existingScheduleUrl: null,
    existingRoutes: {},
    error: null,
    backendMissing: false
  };
}

export function buildGeoLayerFromGtfsRoute(lineKey: string, meta: GtfsExportedRouteMeta): Record<string, any> {
  const shortN = String(meta.shortName || "").trim();
  const fullLabel = String(meta.label || "").trim();
  const isBus = meta.routeType === 3 || meta.routeType === 11;
  const badgeLabel = shortN || fullLabel || lineKey;
  const displayName =
    shortN && fullLabel && !fullLabel.toLowerCase().includes(shortN.toLowerCase())
      ? `${shortN} ${fullLabel}`
      : fullLabel || shortN || lineKey;

  return {
    url: meta.geojsonUrl || `/local/gtfs2/route_${lineKey}.geojson`,
    name: displayName,
    label: badgeLabel,
    route_key: lineKey,
    stroke_color: meta.color || "#007aff",
    stroke_width: isBus ? 3 : 6,
    show_popup: true,
    filter_group: isBus ? "bus" : "routes"
  };
}

export function buildTransitRouteFromGtfsRoute(lineKey: string, meta: GtfsExportedRouteMeta): Record<string, any> {
  const shortN = String(meta.shortName || "").trim();
  const fullLabel = String(meta.label || "").trim();
  const isBus = meta.routeType === 3 || meta.routeType === 11;
  const label =
    shortN && fullLabel && !fullLabel.toLowerCase().includes(shortN.toLowerCase())
      ? `${shortN} ${fullLabel}`
      : fullLabel || shortN || lineKey;

  return {
    label,
    color: meta.color || "#007aff",
    icon: isBus ? "cli:translink-bus" : "mdi:subway-variant"
  };
}

export function isRouteInGeoLayers(
  config: Record<string, any>,
  lineKey: string,
  geojsonUrl?: string
): boolean {
  const layers = config?.geojson_layers ?? config?.geojsonLayers;
  if (!Array.isArray(layers)) return false;
  const targetKey = lineKey.toLowerCase();
  return layers.some((l: any) => {
    if (!l || typeof l !== "object") return false;
    if (geojsonUrl && l.url === geojsonUrl) return true;
    const rKey = String(l.route_key ?? l.routeKey ?? l.route_id ?? "").trim().toLowerCase();
    return Boolean(rKey && rKey === targetKey);
  });
}

export function isRouteInTransitMotion(config: Record<string, any>, lineKey: string): boolean {
  const tm = config?.transit_motion ?? config?.transitMotion;
  if (!tm || typeof tm !== "object" || Array.isArray(tm)) return false;
  const routes = tm.routes;
  if (!routes || typeof routes !== "object" || Array.isArray(routes)) return false;
  const low = lineKey.toLowerCase();
  return lineKey in routes || low in routes;
}

export function applyGtfsRouteToConfig(
  config: Record<string, any>,
  lineKey: string,
  meta: GtfsExportedRouteMeta,
  scheduleUrl: string | undefined,
  opts: { addGeoJson?: boolean; addAnimation?: boolean }
): Record<string, any> {
  const next = cloneConfig(config || {});
  const targetGeoUrl = meta.geojsonUrl || `/local/gtfs2/route_${lineKey}.geojson`;

  if (opts.addGeoJson && !isRouteInGeoLayers(next, lineKey, targetGeoUrl)) {
    const existingLayers = Array.isArray(next.geojson_layers)
      ? [...next.geojson_layers]
      : Array.isArray(next.geojsonLayers)
        ? [...next.geojsonLayers]
        : [];
    existingLayers.push(buildGeoLayerFromGtfsRoute(lineKey, { ...meta, geojsonUrl: targetGeoUrl }));
    next.geojson_layers = existingLayers;
    delete next.geojsonLayers;
  }

  if (opts.addAnimation) {
    const curTm =
      next.transit_motion && typeof next.transit_motion === "object" && !Array.isArray(next.transit_motion)
        ? { ...next.transit_motion }
        : next.transitMotion && typeof next.transitMotion === "object" && !Array.isArray(next.transitMotion)
          ? { ...next.transitMotion }
          : {};
    delete next.transitMotion;

    if (curTm.enabled === undefined) curTm.enabled = true;
    if (scheduleUrl && !curTm.schedule_url && !curTm.scheduleUrl) {
      curTm.schedule_url = scheduleUrl;
    }

    const routesMap =
      curTm.routes && typeof curTm.routes === "object" && !Array.isArray(curTm.routes)
        ? { ...curTm.routes }
        : {};
    if (!isRouteInTransitMotion(next, lineKey)) {
      routesMap[lineKey] = buildTransitRouteFromGtfsRoute(lineKey, meta);
    }
    curTm.routes = routesMap;
    next.transit_motion = curTm;
  }

  return next;
}
