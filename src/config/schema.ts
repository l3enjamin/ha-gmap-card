export type MarkerShapeType = "none" | "circle" | "square" | "rectangle" | "triangle" | "arrow" | "auto" | "icon" | "picture";
export type PictureShapeType = "circle" | "rectangle" | "auto";
export type RouteLabelShapeType = "rectangle" | "square" | "circle" | "pill";

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
  width?: number;
  height?: number;
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
  locationEntity?: string;
  statusEntity?: string;
  pictureEntity?: string;
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
  pointWidth?: number;
  pointHeight?: number;
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
  showLabels?: boolean;
  labelSpacing?: number;
  labelSize?: number;
  labelColor?: string;
  labelTextColor?: string;
  labelShape?: RouteLabelShapeType;
  labelBorderColor?: string;
  labelBorderWidth?: number;
  labelBorderRadius?: number;
  labelPadding?: number;
  labelMinZoom?: number;
}

export interface FilterGroupConfig {
  name: string;
  icon?: string;
  color?: string;
  default?: boolean;
  position?: string;
  activeFrom?: string;
  activeUntil?: string;
}

export interface TransitRouteConfig {
  label?: string;
  name?: string;
  icon?: string;
  image?: string;
  showIcon?: boolean;
  color?: string;
  iconSize?: number;
  width?: number;
  height?: number;
  shape?: MarkerShapeType;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  directional?: boolean;
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
  vehicleWidth?: number;
  vehicleHeight?: number;
  vehicleShowIcon?: boolean;
  vehicleBackgroundColor?: string;
  vehicleBorderColor?: string;
  vehicleBorderWidth?: number;
  vehicleBorderRadius?: number;
  vehiclePadding?: number;
  vehicleDirectional?: boolean;
  vehicles: Record<string, string>;
  routes: Record<string, TransitRouteConfig>;
}

export interface LayerFiltersConfig {
  enabled: boolean;
  position: string;
  title?: string;
  icon?: string;
}

export interface EntityExcludeRule {
  entityId?: string;
  state?: string;
  name?: string;
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
  geojsonDefaults: Record<string, any>;
  geojsonLayers: GeoJsonLayerConfig[];
  transitMotion: TransitMotionConfig;
  entityDefaults: Record<string, any>;
  entities: CardEntityConfig[];
  excludeStates: string[];
  exclude: EntityExcludeRule[];
  raw: any;
}

function parseOptionalNumber(val: unknown): number | null {
  if (val === undefined || val === null || val === "" || typeof val === "boolean" || typeof val === "object") {
    return null;
  }
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

function asFiniteNumber(
  val: unknown,
  fallback: number | undefined,
  min?: number,
  max?: number
): number | undefined {
  const n = parseOptionalNumber(val);
  if (n === null) return fallback;
  let clamped = n;
  if (min !== undefined && clamped < min) clamped = min;
  if (max !== undefined && clamped > max) clamped = max;
  return clamped;
}

function asString(val: unknown, fallback?: string): string | undefined {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") {
    return String(val);
  }
  return fallback;
}

function asRecord(val: unknown): Record<string, any> {
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return val as Record<string, any>;
  }
  return {};
}

export function normalizeCardConfig(raw: any): NormalizedCardConfig {
  if (raw !== undefined && raw !== null && (typeof raw !== "object" || Array.isArray(raw))) {
    console.warn("[ha-gmap-card] Expected card configuration object, received:", typeof raw);
  }
  const cfg = asRecord(raw);

  const apiKey = asString(cfg.api_key ?? cfg.apiKey, "") || "";
  const mapId = asString(cfg.map_id ?? cfg.mapId);
  const rawCenter = cfg.center ?? cfg.initial_center ?? cfg.center_entity;
  const center =
    typeof rawCenter === "string"
      ? rawCenter
      : rawCenter && typeof rawCenter === "object" && !Array.isArray(rawCenter)
        ? {
            lat: asFiniteNumber((rawCenter as any).lat, 0, -90, 90) ?? 0,
            lng: asFiniteNumber((rawCenter as any).lng, 0, -180, 180) ?? 0
          }
        : undefined;
  const zoom = asFiniteNumber(cfg.zoom, 15, 0, 24) ?? 15;
  const followByDefault = Boolean(cfg.follow_by_default ?? cfg.followByDefault ?? false);
  const fitEntities = Boolean(cfg.fit_entities ?? cfg.fitEntities ?? false);
  const zones = asRecord(cfg.zones);
  const mapType = asString(cfg.map_type ?? cfg.mapType, "roadmap") || "roadmap";
  const gestureHandling = asString(cfg.gesture_handling ?? cfg.gestureHandling, "greedy") || "greedy";
  const rawColorScheme = asString(cfg.color_scheme ?? cfg.colorScheme, "follow_system");
  const colorScheme =
    rawColorScheme === "light" || rawColorScheme === "dark" || rawColorScheme === "follow_system"
      ? rawColorScheme
      : "follow_system";
  const language = asString(cfg.language);
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
          position: item.position || layerFilters.position,
          activeFrom: asString(item.active_from ?? item.activeFrom),
          activeUntil: asString(item.active_until ?? item.activeUntil)
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
          position: obj.position || layerFilters.position,
          activeFrom: asString(obj.active_from ?? obj.activeFrom),
          activeUntil: asString(obj.active_until ?? obj.activeUntil)
        };
      }
    }
  }

  const rlDefaults = asRecord(cfg.route_labels ?? cfg.routeLabels);
  const geojsonDefaults = asRecord(cfg.geojson_defaults ?? cfg.geojsonDefaults);
  const geoRaw = cfg.geojson_layers || cfg.geojsonLayers || [];
  const geojsonLayers: GeoJsonLayerConfig[] = (Array.isArray(geoRaw) ? geoRaw : [])
    .filter((l: any) => l && typeof l === "object" && !Array.isArray(l))
    .map((rawLayer: any) => {
      const l = { ...geojsonDefaults, ...rawLayer };
      const rawPointSize = l.point_size ?? l.pointSize ?? l.icon_size ?? l.iconSize ?? l.size;
      const pointSize = asFiniteNumber(rawPointSize, undefined, 1, 512);
      return {
        url: asString(l.url, "") || "",
        name: asString(l.name ?? l.label),
        label: asString(l.label ?? l.name),
        routeKey: asString(l.route_key ?? l.routeKey ?? l.route_id),
        icon: asString(l.icon),
        image: asString(l.image ?? l.picture),
        pointShape: asString(l.point_shape ?? l.pointShape ?? l.marker_type ?? l.markerType ?? l.shape) as any,
        pointSize,
        pointWidth: asFiniteNumber(l.point_width ?? l.pointWidth, undefined, 1, 512),
        pointHeight: asFiniteNumber(l.point_height ?? l.pointHeight, undefined, 1, 512),
        pointColor: asString(l.point_color ?? l.pointColor ?? l.background_color ?? l.backgroundColor),
        borderColor: asString(l.border_color ?? l.borderColor),
        borderWidth: asFiniteNumber(l.border_width ?? l.borderWidth, undefined, 0, 64),
        borderRadius: asFiniteNumber(l.border_radius ?? l.borderRadius ?? l.picture_border_radius ?? l.pictureBorderRadius, undefined, 0, 256),
        padding: asFiniteNumber(l.padding ?? l.picture_padding ?? l.picturePadding, undefined, 0, 128),
        stationIcon: asString(l.station_icon ?? l.stationIcon),
        stopIcon: asString(l.stop_icon ?? l.stopIcon),
        stationSize: asFiniteNumber(l.station_size ?? l.station_icon_size ?? rawPointSize, 18, 1, 512) ?? 18,
        stopSize: asFiniteNumber(l.stop_size ?? l.stop_icon_size ?? rawPointSize, 14, 1, 512) ?? 14,
        strokeColor: asString(l.stroke_color ?? l.strokeColor ?? l.color, "#007aff") || "#007aff",
        strokeWidth: asFiniteNumber(l.stroke_width ?? l.strokeWidth ?? l.stroke_px ?? l.width, 3, 0, 64) ?? 3,
        fillColor: asString(l.fill_color ?? l.fillColor),
        fillOpacity: asFiniteNumber(l.fill_opacity ?? l.fillOpacity, undefined, 0, 1),
        showPopup: l.show_popup ?? l.showPopup ?? true,
        filterGroup: asString(l.filter_group ?? l.filterGroup ?? l.group, "routes") || "routes",
        showLabels: l.show_labels ?? l.showLabels ?? rlDefaults.enabled ?? true,
        labelSpacing: asFiniteNumber(l.label_spacing ?? l.labelSpacing ?? rlDefaults.spacing, undefined, 50, 100000),
        labelSize: asFiniteNumber(l.label_size ?? l.labelSize ?? rlDefaults.size, undefined, 10, 120),
        labelColor: asString(l.label_color ?? l.labelColor ?? l.label_background_color ?? rlDefaults.color ?? rlDefaults.background_color),
        labelTextColor: asString(l.label_text_color ?? l.labelTextColor ?? rlDefaults.text_color),
        labelShape: asString(l.label_shape ?? l.labelShape ?? rlDefaults.shape) as RouteLabelShapeType | undefined,
        labelBorderColor: asString(l.label_border_color ?? l.labelBorderColor ?? rlDefaults.border_color),
        labelBorderWidth: asFiniteNumber(l.label_border_width ?? l.labelBorderWidth ?? rlDefaults.border_width, undefined, 0, 32),
        labelBorderRadius: asFiniteNumber(l.label_border_radius ?? l.labelBorderRadius ?? rlDefaults.border_radius, undefined, 0, 128),
        labelPadding: asFiniteNumber(l.label_padding ?? l.labelPadding ?? rlDefaults.padding, undefined, 0, 64),
        labelMinZoom: asFiniteNumber(l.label_min_zoom ?? l.labelMinZoom ?? rlDefaults.min_zoom, undefined, 0, 24)
      };
    });

  const tmRaw = cfg.transit_motion === false ? false : asRecord(cfg.transit_motion ?? cfg.transitMotion);
  const tmObj = tmRaw === false ? {} : tmRaw;
  const rawBusMatch = tmObj.bus_match ?? tmObj.busMatch ?? tmObj.vehicle_entities;
  const busMatch = Array.isArray(rawBusMatch)
    ? rawBusMatch.map((x) => asString(x)).filter((x): x is string => Boolean(x))
    : typeof rawBusMatch === "string" && rawBusMatch.trim()
      ? [rawBusMatch.trim()]
      : null;

  const rawVehicles = tmObj.vehicles || cfg.transit_vehicles || cfg.transit_icons?.vehicles || {};
  const vehicles: Record<string, string> = {};
  if (rawVehicles && typeof rawVehicles === "object" && !Array.isArray(rawVehicles)) {
    for (const [k, v] of Object.entries(rawVehicles)) {
      const sv = asString(v);
      if (sv) vehicles[k] = sv;
    }
  }

  const rawRoutes = tmObj.routes || {};
  const routes: Record<string, TransitRouteConfig> = {};
  if (rawRoutes && typeof rawRoutes === "object" && !Array.isArray(rawRoutes)) {
    for (const [k, v] of Object.entries(rawRoutes)) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const r = v as any;
        const rawSz = r.icon_size ?? r.iconSize ?? r.size;
        routes[k] = {
          label: asString(r.label ?? r.name),
          name: asString(r.name ?? r.label),
          icon: asString(r.icon),
          image: asString(r.image ?? r.picture),
          showIcon: r.show_icon !== undefined ? Boolean(r.show_icon) : (r.showIcon !== undefined ? Boolean(r.showIcon) : undefined),
          color: asString(r.color ?? r.icon_color),
          iconSize: asFiniteNumber(rawSz, undefined, 4, 256),
          width: asFiniteNumber(r.width, undefined, 4, 256),
          height: asFiniteNumber(r.height, undefined, 4, 256),
          shape: asString(r.shape ?? r.marker_type ?? r.markerType ?? r.point_shape ?? r.pointShape) as any,
          backgroundColor: asString(r.background_color ?? r.backgroundColor ?? r.point_color ?? r.pointColor),
          borderColor: asString(r.border_color ?? r.borderColor),
          borderWidth: asFiniteNumber(r.border_width ?? r.borderWidth, undefined, 0, 32),
          borderRadius: asFiniteNumber(r.border_radius ?? r.borderRadius, undefined, 0, 128),
          padding: asFiniteNumber(r.padding, undefined, 0, 64),
          directional: r.directional !== undefined ? Boolean(r.directional) : undefined,
          enabled: r.enabled !== false
        };
      }
    }
  }

  const transitMotion: TransitMotionConfig = {
    enabled: tmRaw !== false && tmObj.enabled !== false,
    fps: asFiniteNumber(tmObj.fps, 30, 5, 60) ?? 30,
    minZoom: asFiniteNumber(tmObj.min_zoom ?? tmObj.minZoom ?? cfg.animation_min_zoom, 13, 0, 24) ?? 13,
    busMinZoom: asFiniteNumber(tmObj.bus_min_zoom ?? tmObj.busMinZoom ?? cfg.bus_min_zoom, undefined, 0, 24) ?? null,
    busMatch,
    scheduleUrl: asString(tmObj.schedule_url ?? tmObj.scheduleUrl ?? cfg.transit_schedule, "/local/gtfs2/transit_schedule.json"),
    filterGroup: asString(tmObj.filter_group ?? tmObj.filterGroup ?? tmObj.group, "vehicles"),
    simulate247: Boolean(tmObj.simulate_24_7 ?? tmObj.simulate247 ?? false),
    vehicleShape: asString(tmObj.vehicle_shape ?? tmObj.vehicleShape ?? tmObj.marker_type ?? tmObj.markerType ?? tmObj.shape) as any,
    vehicleWidth: asFiniteNumber(tmObj.vehicle_width ?? tmObj.vehicleWidth ?? tmObj.width, undefined, 4, 256),
    vehicleHeight: asFiniteNumber(tmObj.vehicle_height ?? tmObj.vehicleHeight ?? tmObj.height, undefined, 4, 256),
    vehicleShowIcon: tmObj.show_icon !== undefined ? Boolean(tmObj.show_icon) : (tmObj.showIcon !== undefined ? Boolean(tmObj.showIcon) : undefined),
    vehicleBackgroundColor: asString(tmObj.vehicle_background_color ?? tmObj.vehicleBackgroundColor ?? tmObj.background_color ?? tmObj.backgroundColor),
    vehicleBorderColor: asString(tmObj.vehicle_border_color ?? tmObj.vehicleBorderColor ?? tmObj.border_color ?? tmObj.borderColor),
    vehicleBorderWidth: asFiniteNumber(tmObj.vehicle_border_width ?? tmObj.vehicleBorderWidth ?? tmObj.border_width ?? tmObj.borderWidth, undefined, 0, 32),
    vehicleBorderRadius: asFiniteNumber(tmObj.vehicle_border_radius ?? tmObj.vehicleBorderRadius ?? tmObj.border_radius ?? tmObj.borderRadius, undefined, 0, 128),
    vehiclePadding: asFiniteNumber(tmObj.vehicle_padding ?? tmObj.vehiclePadding ?? tmObj.padding, undefined, 0, 64),
    vehicleDirectional: tmObj.directional !== undefined ? Boolean(tmObj.directional) : undefined,
    vehicles,
    routes
  };

  const entityDefaults = asRecord(cfg.entity_defaults ?? cfg.entityDefaults);
  const entRaw = cfg.entities || [];
  const entities: CardEntityConfig[] = (Array.isArray(entRaw) ? entRaw : [])
    .filter((e: any) => (typeof e === "string" && e.trim().length > 0) || (e && typeof e === "object" && !Array.isArray(e)))
    .map((e: any) => {
      if (typeof e === "string") {
        const mergedStr: Record<string, any> = { ...entityDefaults, entity: e };
        return {
          entityId: e,
          name: asString(mergedStr.name),
          showName: mergedStr.show_name ?? mergedStr.showName,
          icon: asString(mergedStr.icon),
          showIcon: mergedStr.show_icon ?? mergedStr.showIcon,
          picture: asString(mergedStr.picture),
          markerType: asString(mergedStr.marker_type ?? mergedStr.markerType ?? mergedStr.shape) as any,
          pictureShape: asString(mergedStr.picture_shape ?? mergedStr.pictureShape) as any,
          iconSize: asFiniteNumber(mergedStr.icon_size ?? mergedStr.iconSize, undefined, 1, 512),
          width: asFiniteNumber(mergedStr.width, undefined, 1, 512),
          height: asFiniteNumber(mergedStr.height, undefined, 1, 512),
          backgroundColor: asString(mergedStr.background_color ?? mergedStr.backgroundColor),
          borderColor: asString(mergedStr.border_color ?? mergedStr.borderColor),
          borderWidth: asFiniteNumber(mergedStr.border_width ?? mergedStr.borderWidth, undefined, 0, 64),
          pictureBorderRadius: asFiniteNumber(mergedStr.picture_border_radius ?? mergedStr.border_radius, undefined, 0, 256),
          picturePadding: asFiniteNumber(mergedStr.picture_padding ?? mergedStr.padding, undefined, 0, 128),
          minZoom: parseOptionalNumber(mergedStr.min_zoom ?? mergedStr.minZoom),
          filterGroup: asString(mergedStr.filter_group ?? mergedStr.filterGroup ?? mergedStr.group)
        };
      }
      const hasNestedOptions = Boolean(e && typeof e.options === "object" && e.options !== null && !Array.isArray(e.options));
      const baseEnt = hasNestedOptions ? { ...e, ...e.options } : e;
      const merged = { ...entityDefaults, ...baseEnt };
      const rawMinZoom = merged.min_zoom ?? merged.minZoom;
      const pictureBorderWidth = asFiniteNumber(merged.picture_border_width ?? merged.pictureBorderWidth, undefined, 0, 64);
      const borderWidth = asFiniteNumber(merged.border_width ?? merged.borderWidth, pictureBorderWidth, 0, 64);

      return {
        entityId: asString(merged.entity ?? merged.entity_id ?? merged.entityId, "") || "",
        name: hasNestedOptions ? asString(e.options.name ?? entityDefaults.name) : asString(merged.name),
        nameFilter: hasNestedOptions
          ? (typeof e.name === "string" && e.name ? e.name : asString(merged.name_filter ?? merged.nameFilter))
          : asString(merged.name_filter ?? merged.nameFilter),
        showName: merged.show_name ?? merged.showName,
        icon: asString(merged.icon),
        showIcon: merged.show_icon ?? merged.showIcon,
        picture: asString(merged.picture),
        pictureAttribute: asString(merged.picture_attribute ?? merged.pictureAttribute),
        markerType: asString(merged.marker_type ?? merged.markerType ?? merged.shape) as any,
        pictureShape: asString(merged.picture_shape ?? merged.pictureShape ?? merged.picture_aspect ?? merged.pictureAspect) as any,
        iconSize: asFiniteNumber(merged.icon_size ?? merged.iconSize, undefined, 1, 512),
        width: asFiniteNumber(merged.width, undefined, 1, 512),
        height: asFiniteNumber(merged.height, undefined, 1, 512),
        backgroundColor: asString(merged.background_color ?? merged.backgroundColor ?? merged.card_background),
        borderColor: asString(merged.border_color ?? merged.borderColor),
        borderWidth,
        pictureBorderRadius: asFiniteNumber(merged.picture_border_radius ?? merged.pictureBorderRadius ?? merged.border_radius ?? merged.borderRadius, undefined, 0, 256),
        pictureBorderWidth,
        picturePadding: asFiniteNumber(merged.picture_padding ?? merged.picturePadding ?? merged.padding, undefined, 0, 128),
        pictureHeight: asFiniteNumber(merged.picture_height ?? merged.pictureHeight, undefined, 1, 512),
        pictureMaxWidth: asFiniteNumber(merged.picture_max_width ?? merged.pictureMaxWidth, undefined, 1, 1024),
        minZoom: parseOptionalNumber(rawMinZoom),
        follow: merged.follow,
        locationEntity: asString(merged.location_entity ?? merged.locationEntity),
        statusEntity: asString(merged.status_entity ?? merged.statusEntity),
        pictureEntity: asString(merged.picture_entity ?? merged.pictureEntity ?? merged.image_entity ?? merged.imageEntity),
        transitType: asString(merged.transit_type ?? merged.transitType),
        filterGroup: asString(merged.filter_group ?? merged.filterGroup ?? merged.group),
        popupTemplate: asString(merged.popup_template ?? merged.popupTemplate),
        popupCard: merged.popup_card ?? merged.popupCard,
        popupMaxWidth: asFiniteNumber(merged.popup_max_width ?? merged.popupMaxWidth, undefined, 80, 1200)
      };
    });

  const rawExcludeStates = cfg.exclude_states ?? cfg.excludeStates;
  const excludeStates: string[] = Array.isArray(rawExcludeStates)
    ? rawExcludeStates.map((s: any) => asString(s)).filter((s): s is string => Boolean(s))
    : typeof rawExcludeStates === "string" && rawExcludeStates.trim()
      ? [rawExcludeStates.trim()]
      : rawExcludeStates === false
        ? []
        : ["unavailable"];

  const rawExclude = cfg.exclude ?? cfg.entity_exclude ?? [];
  const exclude: EntityExcludeRule[] = (Array.isArray(rawExclude) ? rawExclude : [])
    .filter((r: any) => r && typeof r === "object" && !Array.isArray(r))
    .map((r: any) => ({
      entityId: asString(r.entity_id ?? r.entity ?? r.entityId),
      state: asString(r.state),
      name: asString(r.name)
    }))
    .filter((r) => Boolean(r.entityId || r.state || r.name));

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
    geojsonDefaults,
    geojsonLayers,
    transitMotion,
    entityDefaults,
    entities,
    excludeStates,
    exclude,
    raw: cfg
  };
}
