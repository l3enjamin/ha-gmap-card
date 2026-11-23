export type MarkerShapeType = "circle" | "icon" | "picture" | "rectangle" | "square" | "auto";
export type PictureShapeType = "circle" | "rectangle" | "auto";

export interface CardEntityConfig {
  entityId: string;
  name?: string;
  nameFilter?: string;
  showName?: boolean;
  icon?: string;
  showIcon?: boolean;
  picture?: string;
  pictureAttribute?: string;
  markerType?: MarkerShapeType;
  pictureShape?: PictureShapeType;
  iconSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  pictureBorderRadius?: number;
  pictureBorderWidth?: number;
  picturePadding?: number;
  pictureHeight?: number;
  pictureMaxWidth?: number;
  minZoom?: number | null;
  follow?: boolean;
  transitType?: string;
  filterGroup?: string;
  popupTemplate?: string;
  popupCard?: any;
  popupMaxWidth?: number;
}

export interface GeoJsonLayerConfig {
  url: string;
  name?: string;
  label?: string;
  routeKey?: string;
  icon?: string;
  image?: string;
  pointShape?: MarkerShapeType;
  pointSize?: number;
  pointColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  stationIcon?: string;
  stopIcon?: string;
  stationSize: number;
  stopSize: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  fillOpacity?: number;
  showPopup?: boolean;
  filterGroup?: string;
}

export interface FilterGroupConfig {
  name: string;
  icon?: string;
  color?: string;
  default?: boolean;
  position?: string;
}

export interface TransitRouteConfig {
  label?: string;
  name?: string;
  icon?: string;
  image?: string;
  color?: string;
  iconSize?: number;
  shape?: MarkerShapeType;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  enabled?: boolean;
}

export interface TransitMotionConfig {
  enabled: boolean;
  fps: number;
  minZoom: number;
  busMinZoom: number | null;
  busMatch: string[] | null;
  scheduleUrl?: string;
  filterGroup?: string;
  simulate247: boolean;
  vehicleShape?: MarkerShapeType;
  vehicleBackgroundColor?: string;
  vehicleBorderColor?: string;
  vehicleBorderWidth?: number;
  vehicleBorderRadius?: number;
  vehiclePadding?: number;
  vehicles: Record<string, string>;
  routes: Record<string, TransitRouteConfig>;
}

export interface LayerFiltersConfig {
  enabled: boolean;
  position: string;
  title?: string;
  icon?: string;
}

export interface NormalizedCardConfig {
  apiKey: string;
  mapId?: string;
  center?: string | { lat: number; lng: number };
  zoom: number;
  followByDefault: boolean;
  fitEntities: boolean;
  zones: Record<string, { show?: boolean; follow?: boolean }>;
  mapType: string;
  gestureHandling: string;
  colorScheme: "light" | "dark" | "follow_system";
  language?: string;
  showTraffic: boolean;
  showTrafficButton: boolean;
  showTrafficButtonPosition: string;
  showRecenterButton: boolean;
  showRecenterButtonPosition: string;
  zoomControl: boolean;
  zoomControlPosition: string;
  cameraControl: boolean;
  cameraControlPosition: string;
  rotateControl: boolean;
  mapTypeControl: boolean;
  hideMapLinks: boolean;
  showScale: boolean;
  layerFilters: LayerFiltersConfig;
  filterGroups: Record<string, FilterGroupConfig>;
  geojsonLayers: GeoJsonLayerConfig[];
  transitMotion: TransitMotionConfig;
  entities: CardEntityConfig[];
  raw: any;
}

function parseOptionalNumber(val: any): number | null {
  if (val === undefined || val === null || val === "") return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

export function normalizeCardConfig(raw: any): NormalizedCardConfig {
  const cfg = raw || {};

  const apiKey = cfg.api_key || cfg.apiKey || "";
  const mapId = cfg.map_id || cfg.mapId || undefined;
  const center = cfg.center || cfg.initial_center || cfg.center_entity || undefined;
  const zoom = Number(cfg.zoom ?? 15);
  const followByDefault = Boolean(cfg.follow_by_default ?? cfg.followByDefault ?? false);
  const fitEntities = Boolean(cfg.fit_entities ?? cfg.fitEntities ?? false);
  const zones = (cfg.zones && typeof cfg.zones === "object" && !Array.isArray(cfg.zones)) ? cfg.zones : {};
  const mapType = cfg.map_type || cfg.mapType || "roadmap";
  const gestureHandling = cfg.gesture_handling || cfg.gestureHandling || "greedy";
  const colorScheme = cfg.color_scheme || cfg.colorScheme || "follow_system";
  const language = cfg.language || undefined;
  const showTraffic = Boolean(cfg.show_traffic ?? cfg.showTraffic ?? false);
  const showTrafficButton = Boolean(cfg.show_traffic_button ?? cfg.showTrafficButton ?? false);
  const showTrafficButtonPosition = cfg.show_traffic_button_position || cfg.showTrafficButtonPosition || "TOP_RIGHT";
  const showRecenterButton = Boolean(cfg.show_recenter_button ?? cfg.showRecenterButton ?? false);
  const showRecenterButtonPosition = cfg.show_recenter_button_position || cfg.showRecenterButtonPosition || "LEFT_BOTTOM";
  const zoomControl = Boolean(cfg.zoomControl ?? cfg.zoom_control ?? false);
  const zoomControlPosition = cfg.zoomControl_position || cfg.zoomControlPosition || cfg.zoom_control_position || "RIGHT_BOTTOM";
  const cameraControl = Boolean(cfg.cameraControl ?? cfg.camera_control ?? false);
  const cameraControlPosition = cfg.cameraControl_position || cfg.cameraControlPosition || cfg.camera_control_position || "RIGHT_BOTTOM";
  const rotateControl = Boolean(cfg.rotateControl ?? cfg.rotate_control ?? false);
  const mapTypeControl = Boolean(cfg.mapTypeControl ?? cfg.map_type_control ?? false);
  const hideMapLinks = Boolean(cfg.hide_map_links ?? cfg.hideMapLinks ?? false);
  const showScale = Boolean(cfg.showScale ?? cfg.show_scale ?? false);

  const lfRaw = cfg.layer_filters || cfg.layerFilters || {};
  const layerFilters: LayerFiltersConfig = {
    enabled: lfRaw !== false && lfRaw.enabled !== false,
    position: lfRaw?.position || "TOP_RIGHT",
    title: lfRaw?.title,
    icon: lfRaw?.icon
  };

  const fgRaw = cfg.filter_groups || cfg.filterGroups || lfRaw?.filter_groups || {};
  const filterGroups: Record<string, FilterGroupConfig> = {};
  if (Array.isArray(fgRaw)) {
    for (const item of fgRaw) {
      if (item && typeof item === "object" && item.id) {
        const defaultVal =
          item.default !== undefined
            ? item.default !== false
            : item.checked !== undefined
              ? item.checked !== false
              : true;
        filterGroups[String(item.id)] = {
          name: item.name || item.label || String(item.id),
          icon: item.icon,
          color: item.color || item.accent_color,
          default: defaultVal,
          position: item.position || layerFilters.position
        };
      }
    }
  } else if (fgRaw && typeof fgRaw === "object") {
    for (const [k, v] of Object.entries(fgRaw)) {
      if (typeof v === "object" && v) {
        const obj = v as any;
        const defaultVal =
          obj.default !== undefined
            ? obj.default !== false
            : obj.checked !== undefined
              ? obj.checked !== false
              : true;
        filterGroups[k] = {
          name: obj.name || obj.label || k,
          icon: obj.icon,
          color: obj.color || obj.accent_color,
          default: defaultVal,
          position: obj.position || layerFilters.position
        };
      }
    }
  }

  const geoRaw = cfg.geojson_layers || cfg.geojsonLayers || [];
  const geojsonLayers: GeoJsonLayerConfig[] = (Array.isArray(geoRaw) ? geoRaw : []).map((l: any) => {
    const rawPointSize = l.point_size ?? l.pointSize ?? l.icon_size ?? l.iconSize ?? l.size;
    const rawBorderWidth = l.border_width ?? l.borderWidth;
    return {
      url: l.url || "",
      name: l.name || l.label,
      label: l.label || l.name,
      routeKey: l.route_key || l.routeKey || l.route_id,
      icon: l.icon,
      image: l.image || l.picture,
      pointShape: l.point_shape || l.pointShape || l.marker_type || l.markerType || l.shape,
      pointSize: rawPointSize !== undefined ? Number(rawPointSize) : undefined,
      pointColor: l.point_color || l.pointColor || l.background_color || l.backgroundColor,
      borderColor: l.border_color || l.borderColor,
      borderWidth: rawBorderWidth !== undefined ? Number(rawBorderWidth) : undefined,
      borderRadius: parseOptionalNumber(l.border_radius ?? l.borderRadius ?? l.picture_border_radius ?? l.pictureBorderRadius) ?? undefined,
      padding: parseOptionalNumber(l.padding ?? l.picture_padding ?? l.picturePadding) ?? undefined,
      stationIcon: l.station_icon || l.stationIcon,
      stopIcon: l.stop_icon || l.stopIcon,
      stationSize: Number(l.station_size ?? l.station_icon_size ?? rawPointSize ?? 18),
      stopSize: Number(l.stop_size ?? l.stop_icon_size ?? rawPointSize ?? 14),
      strokeColor: l.stroke_color || l.strokeColor || l.color || "#007aff",
      strokeWidth: Number(l.stroke_width ?? l.strokeWidth ?? l.width ?? 3),
      fillColor: l.fill_color || l.fillColor,
      fillOpacity: l.fill_opacity ?? l.fillOpacity,
      showPopup: l.show_popup ?? l.showPopup ?? true,
      filterGroup: l.filter_group || l.filterGroup || l.group || "routes"
    };
  });

  const tmRaw = cfg.transit_motion ?? cfg.transitMotion ?? {};
  const rawBusMatch = tmRaw?.bus_match ?? tmRaw?.busMatch ?? tmRaw?.vehicle_entities;
  const busMatch = Array.isArray(rawBusMatch)
    ? rawBusMatch.map(String)
    : typeof rawBusMatch === "string" && rawBusMatch.trim()
      ? [rawBusMatch.trim()]
      : null;

  const rawVehicles = tmRaw?.vehicles || cfg.transit_vehicles || cfg.transit_icons?.vehicles || {};
  const vehicles: Record<string, string> = {};
  if (rawVehicles && typeof rawVehicles === "object") {
    for (const [k, v] of Object.entries(rawVehicles)) {
      if (typeof v === "string") vehicles[k] = v;
    }
  }

  const rawRoutes = tmRaw?.routes || {};
  const routes: Record<string, TransitRouteConfig> = {};
  if (rawRoutes && typeof rawRoutes === "object") {
    for (const [k, v] of Object.entries(rawRoutes)) {
      if (v && typeof v === "object") {
        const r = v as any;
        const rawSz = r.icon_size ?? r.iconSize ?? r.size;
        routes[k] = {
          label: r.label || r.name,
          name: r.name || r.label,
          icon: r.icon,
          image: r.image || r.picture,
          color: r.color || r.icon_color,
          iconSize: rawSz !== undefined ? Number(rawSz) : undefined,
          shape: r.shape || r.marker_type || r.markerType || r.point_shape || r.pointShape,
          backgroundColor: r.background_color || r.backgroundColor || r.point_color || r.pointColor,
          borderColor: r.border_color || r.borderColor,
          borderWidth: parseOptionalNumber(r.border_width ?? r.borderWidth) ?? undefined,
          borderRadius: parseOptionalNumber(r.border_radius ?? r.borderRadius) ?? undefined,
          padding: parseOptionalNumber(r.padding) ?? undefined,
          enabled: r.enabled !== false
        };
      }
    }
  }

  const transitMotion: TransitMotionConfig = {
    enabled: tmRaw !== false && tmRaw?.enabled !== false,
    fps: Math.max(5, Math.min(60, Number(tmRaw?.fps || 30))),
    minZoom: Number(tmRaw?.min_zoom ?? tmRaw?.minZoom ?? cfg.animation_min_zoom ?? 13),
    busMinZoom: parseOptionalNumber(tmRaw?.bus_min_zoom ?? tmRaw?.busMinZoom ?? cfg.bus_min_zoom),
    busMatch,
    scheduleUrl: tmRaw?.schedule_url || tmRaw?.scheduleUrl || cfg.transit_schedule || "/local/gtfs2/transit_schedule.json",
    filterGroup: tmRaw?.filter_group || tmRaw?.filterGroup || tmRaw?.group || "vehicles",
    simulate247: Boolean(tmRaw?.simulate_24_7 ?? tmRaw?.simulate247 ?? false),
    vehicleShape: tmRaw?.vehicle_shape || tmRaw?.vehicleShape || tmRaw?.marker_type || tmRaw?.markerType || tmRaw?.shape,
    vehicleBackgroundColor: tmRaw?.vehicle_background_color || tmRaw?.vehicleBackgroundColor || tmRaw?.background_color || tmRaw?.backgroundColor,
    vehicleBorderColor: tmRaw?.vehicle_border_color || tmRaw?.vehicleBorderColor || tmRaw?.border_color || tmRaw?.borderColor,
    vehicleBorderWidth: parseOptionalNumber(tmRaw?.vehicle_border_width ?? tmRaw?.vehicleBorderWidth ?? tmRaw?.border_width ?? tmRaw?.borderWidth) ?? undefined,
    vehicleBorderRadius: parseOptionalNumber(tmRaw?.vehicle_border_radius ?? tmRaw?.vehicleBorderRadius ?? tmRaw?.border_radius ?? tmRaw?.borderRadius) ?? undefined,
    vehiclePadding: parseOptionalNumber(tmRaw?.vehicle_padding ?? tmRaw?.vehiclePadding ?? tmRaw?.padding) ?? undefined,
    vehicles,
    routes
  };

  const entRaw = cfg.entities || [];
  const entities: CardEntityConfig[] = (Array.isArray(entRaw) ? entRaw : []).map((e: any) => {
    if (typeof e === "string") {
      return { entityId: e };
    }
    const hasNestedOptions = Boolean(e && typeof e.options === "object" && e.options !== null);
    const merged = hasNestedOptions ? { ...e, ...e.options } : e;
    const rawMinZoom = merged.min_zoom ?? merged.minZoom;
    const pictureBorderWidth = merged.picture_border_width ?? merged.pictureBorderWidth;
    const borderWidth = merged.border_width ?? merged.borderWidth ?? pictureBorderWidth;

    return {
      entityId: merged.entity || merged.entity_id || merged.entityId || "",
      name: hasNestedOptions ? e.options.name : merged.name,
      nameFilter: hasNestedOptions
        ? (typeof e.name === "string" && e.name ? e.name : merged.name_filter || merged.nameFilter)
        : (merged.name_filter || merged.nameFilter),
      showName: merged.show_name ?? merged.showName,
      icon: merged.icon,
      showIcon: merged.show_icon ?? merged.showIcon,
      picture: merged.picture,
      pictureAttribute: merged.picture_attribute || merged.pictureAttribute,
      markerType: merged.marker_type || merged.markerType || merged.shape,
      pictureShape: merged.picture_shape || merged.pictureShape || merged.picture_aspect || merged.pictureAspect,
      iconSize: merged.icon_size ?? merged.iconSize,
      backgroundColor: merged.background_color || merged.backgroundColor || merged.card_background,
      borderColor: merged.border_color || merged.borderColor,
      borderWidth,
      pictureBorderRadius: merged.picture_border_radius ?? merged.pictureBorderRadius ?? merged.border_radius ?? merged.borderRadius,
      pictureBorderWidth,
      picturePadding: merged.picture_padding ?? merged.picturePadding ?? merged.padding,
      pictureHeight: merged.picture_height ?? merged.pictureHeight,
      pictureMaxWidth: merged.picture_max_width ?? merged.pictureMaxWidth,
      minZoom: parseOptionalNumber(rawMinZoom),
      follow: merged.follow,
      transitType: merged.transit_type || merged.transitType,
      filterGroup: merged.filter_group || merged.filterGroup || merged.group,
      popupTemplate: merged.popup_template || merged.popupTemplate,
      popupCard: merged.popup_card || merged.popupCard,
      popupMaxWidth: merged.popup_max_width ?? merged.popupMaxWidth
    };
  });

  return {
    apiKey,
    mapId,
    center,
    zoom,
    followByDefault,
    fitEntities,
    zones,
    mapType,
    gestureHandling,
    colorScheme,
    language,
    showTraffic,
    showTrafficButton,
    showTrafficButtonPosition,
    showRecenterButton,
    showRecenterButtonPosition,
    zoomControl,
    zoomControlPosition,
    cameraControl,
    cameraControlPosition,
    rotateControl,
    mapTypeControl,
    hideMapLinks,
    showScale,
    layerFilters,
    filterGroups,
    geojsonLayers,
    transitMotion,
    entities,
    raw: cfg
  };
}
