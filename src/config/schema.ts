export interface CardEntityConfig {
  entityId: string;
  name?: string;
  showName?: boolean;
  picture?: string;
  iconSize?: number;
  pictureBorderRadius?: number;
  pictureBorderWidth?: number;
  picturePadding?: number;
  pictureHeight?: number;
  pictureMaxWidth?: number;
  filterGroup?: string;
  popupTemplate?: string;
  popupCard?: any;
  popupMaxWidth?: number;
}

export interface GeoJsonLayerConfig {
  url: string;
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

export interface TransitMotionConfig {
  enabled: boolean;
  fps: number;
  minZoom: number;
  scheduleUrl?: string;
  filterGroup?: string;
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
  zoom: number;
  mapType: string;
  gestureHandling: string;
  colorScheme: "light" | "dark" | "follow_system";
  language?: string;
  showTraffic: boolean;
  showTrafficButton: boolean;
  showScale: boolean;
  layerFilters: LayerFiltersConfig;
  filterGroups: Record<string, FilterGroupConfig>;
  geojsonLayers: GeoJsonLayerConfig[];
  transitMotion: TransitMotionConfig;
  entities: CardEntityConfig[];
  raw: any;
}

export function normalizeCardConfig(raw: any): NormalizedCardConfig {
  const cfg = raw || {};

  const apiKey = cfg.api_key || cfg.apiKey || "";
  const mapId = cfg.map_id || cfg.mapId || undefined;
  const zoom = Number(cfg.zoom ?? 15);
  const mapType = cfg.map_type || cfg.mapType || "roadmap";
  const gestureHandling = cfg.gesture_handling || cfg.gestureHandling || "greedy";
  const colorScheme = cfg.color_scheme || cfg.colorScheme || "follow_system";
  const language = cfg.language || undefined;
  const showTraffic = Boolean(cfg.show_traffic ?? cfg.showTraffic ?? false);
  const showTrafficButton = Boolean(cfg.show_traffic_button ?? cfg.showTrafficButton ?? false);
  const showScale = Boolean(cfg.showScale ?? cfg.show_scale ?? false);

  const lfRaw = cfg.layer_filters || cfg.layerFilters || {};
  const layerFilters: LayerFiltersConfig = {
    enabled: lfRaw.enabled !== false,
    position: lfRaw.position || "TOP_RIGHT",
    title: lfRaw.title,
    icon: lfRaw.icon
  };

  const fgRaw = cfg.filter_groups || cfg.filterGroups || {};
  const filterGroups: Record<string, FilterGroupConfig> = {};
  if (fgRaw && typeof fgRaw === "object") {
    for (const [k, v] of Object.entries(fgRaw)) {
      if (typeof v === "object" && v) {
        filterGroups[k] = {
          name: (v as any).name || k,
          icon: (v as any).icon,
          color: (v as any).color || (v as any).accent_color,
          default: (v as any).default !== false,
          position: (v as any).position || layerFilters.position
        };
      }
    }
  }

  const geoRaw = cfg.geojson_layers || cfg.geojsonLayers || [];
  const geojsonLayers: GeoJsonLayerConfig[] = (Array.isArray(geoRaw) ? geoRaw : []).map((l: any) => ({
    url: l.url || "",
    strokeColor: l.stroke_color || l.strokeColor || "#007aff",
    strokeWidth: Number(l.stroke_width ?? l.strokeWidth ?? 3),
    fillColor: l.fill_color || l.fillColor,
    fillOpacity: l.fill_opacity ?? l.fillOpacity,
    showPopup: l.show_popup ?? l.showPopup ?? true,
    filterGroup: l.filter_group || l.filterGroup || "routes"
  }));

  const tmRaw = cfg.transit_motion || cfg.transitMotion || {};
  const transitMotion: TransitMotionConfig = {
    enabled: tmRaw !== false && tmRaw.enabled !== false,
    fps: Math.max(5, Math.min(60, Number(tmRaw.fps || 30))),
    minZoom: Number(tmRaw.min_zoom ?? tmRaw.minZoom ?? 10),
    scheduleUrl: tmRaw.schedule_url || tmRaw.scheduleUrl || cfg.transit_schedule || "/local/gtfs2/transit_schedule.json",
    filterGroup: tmRaw.filter_group || tmRaw.filterGroup || "vehicles"
  };

  const entRaw = cfg.entities || [];
  const entities: CardEntityConfig[] = (Array.isArray(entRaw) ? entRaw : []).map((e: any) => {
    if (typeof e === "string") {
      return { entityId: e };
    }
    return {
      entityId: e.entity || e.entity_id || e.entityId || "",
      name: e.name,
      showName: e.show_name ?? e.showName,
      picture: e.picture,
      iconSize: e.icon_size ?? e.iconSize,
      pictureBorderRadius: e.picture_border_radius ?? e.pictureBorderRadius,
      pictureBorderWidth: e.picture_border_width ?? e.pictureBorderWidth,
      picturePadding: e.picture_padding ?? e.picturePadding,
      pictureHeight: e.picture_height ?? e.pictureHeight,
      pictureMaxWidth: e.picture_max_width ?? e.pictureMaxWidth,
      filterGroup: e.filter_group || e.filterGroup,
      popupTemplate: e.popup_template || e.popupTemplate,
      popupCard: e.popup_card || e.popupCard,
      popupMaxWidth: e.popup_max_width ?? e.popupMaxWidth
    };
  });

  return {
    apiKey,
    mapId,
    zoom,
    mapType,
    gestureHandling,
    colorScheme,
    language,
    showTraffic,
    showTrafficButton,
    showScale,
    layerFilters,
    filterGroups,
    geojsonLayers,
    transitMotion,
    entities,
    raw: cfg
  };
}
