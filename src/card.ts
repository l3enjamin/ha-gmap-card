import { css, html, LitElement, PropertyValues } from "lit";
import { CardEntityConfig, GeoJsonLayerConfig, NormalizedCardConfig, normalizeCardConfig } from "./config/schema";
import { FilterController } from "./filters/controller";
import { loadGoogleMaps } from "./maps/loader";
import { BatchedDomMarkerLayer, createMarkerElement } from "./maps/marker-content";
import { PopupController } from "./popup/controller";
import { resolveMdiIconDataUrl, TransitMotionEngine } from "./transit/motion";
import { extractRouteKeys, matchEntityPattern } from "./transit/schedule";

const geoJsonCache = new Map<string, Promise<any>>();

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getControlPosition(googleMaps: any, posName?: string): any {
  const cp = googleMaps?.ControlPosition;
  if (!cp) return undefined;
  return (posName && cp[posName]) || cp.TOP_RIGHT;
}

export class HaGmapCard extends LitElement {
  private _config!: NormalizedCardConfig;
  private _hass: any;
  private _map: any = null;
  private _google: any = null;
  private _markers = new Map<string, any>();
  private _markerConfigs = new Map<string, CardEntityConfig>();
  private _lastEntityState = new Map<string, any>();
  private _domMarkerLayer: BatchedDomMarkerLayer | null = null;
  private _geoLayers = new Map<string, any>();
  private _geoIconCache = new Map<string, any>();
  private _routePolylines = new Map<string, number[][][]>();
  private _popupController: PopupController | null = null;
  private _filterController: FilterController | null = null;
  private _transitMotion: TransitMotionEngine | null = null;
  private _trafficLayer: any = null;
  private _trafficActive = false;
  private _initialCenterApplied = false;
  private _initialFitDone = false;
  private _geoSignature = "";
  private _lastWildcardScanMs = 0;
  private _lastMarkerClickMs = 0;
  private _initPromise: Promise<void> | null = null;

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 400px;
    }
    #map-container {
      width: 100%;
      height: 100%;
      min-height: 400px;
      position: relative;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }
    .gm-style-iw-c {
      padding: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      border-radius: 8px !important;
    }
    .gm-style-iw-d {
      overflow: visible !important;
      max-height: none !important;
    }
    .gm-style-iw-tc::after {
      background: var(--ha-gmap-iw-bg, #ffffff) !important;
    }
    .loading-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.05);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      color: var(--secondary-text-color, #666);
      z-index: 5;
    }
  `;

  public static getConfigElement(): HTMLElement {
    return document.createElement("ha-gmap-card-editor");
  }

  public static getStubConfig(): Record<string, any> {
    return {
      type: "custom:ha-gmap-card",
      api_key: "",
      center: "zone.home",
      zoom: 15,
      follow_by_default: false,
      fit_entities: false,
      entities: ["zone.home"]
    };
  }

  public setConfig(config: any) {
    if (!config || (!config.api_key && !config.apiKey)) {
      throw new Error("[ha-gmap-card] An 'api_key' is required.");
    }

    const prevCoreKey = this._config
      ? `${this._config.apiKey}|${this._config.mapId || ""}|${this._config.language || ""}|${this._config.colorScheme}`
      : "";

    this._config = normalizeCardConfig(config);

    const nextCoreKey = `${this._config.apiKey}|${this._config.mapId || ""}|${this._config.language || ""}|${this._config.colorScheme}`;

    if (this._map) {
      if (prevCoreKey && prevCoreKey !== nextCoreKey) {
        this.destroyMapResources();
        this.requestUpdate();
        this.initMap();
        return;
      }

      if (this._transitMotion) {
        this._transitMotion.syncConfig(this._config.transitMotion);
      }

      const nextGeoSig = JSON.stringify(
        this._config.geojsonLayers.map((g) => [g.url, g.strokeColor, g.strokeWidth, g.stationIcon, g.stopIcon, g.filterGroup])
      );
      if (nextGeoSig !== this._geoSignature) {
        this.clearGeoJsonLayers();
        this.loadGeoJsonLayers();
      }

      this.updateEntityMarkers();
    } else {
      this.requestUpdate();
    }
  }

  public set hass(hass: any) {
    this._hass = hass;
    if (this._popupController) {
      this._popupController.setHass(hass);
    }

    if (this._map && !this._initialCenterApplied) {
      const c = this.resolveCenterLatLng(false);
      if (c) {
        this._map.setCenter(c);
        this._map.setZoom(this._config.zoom);
        this._initialCenterApplied = true;
      }
    }

    if (!this._map || !this._config) return;

    let shouldUpdate = this._markers.size === 0 && this._config.entities.length > 0;
    if (!shouldUpdate) {
      const now = Date.now();
      let hasWildcard = false;
      for (const ent of this._config.entities) {
        const eid = ent.entityId;
        if (!eid) continue;
        if (eid.includes("*") || eid.includes("?") || (eid.startsWith("/") && eid.lastIndexOf("/") > 0)) {
          hasWildcard = true;
        } else if (this._lastEntityState.get(eid) !== hass?.states?.[eid]) {
          shouldUpdate = true;
          break;
        }
      }
      if (!shouldUpdate && hasWildcard && now - this._lastWildcardScanMs > 5000) {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      this.updateEntityMarkers();
      this.followEntitiesIfConfigured();
    }
  }

  public getCardSize(): number {
    return 6;
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 4,
      rows: 8,
      min_rows: 4
    };
  }

  public connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && this._config && !this._map) {
      this.initMap();
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.initMap();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.destroyMapResources();
  }

  private destroyMapResources() {
    if (this._transitMotion) {
      this._transitMotion.destroy();
      this._transitMotion = null;
    }
    if (this._popupController) {
      this._popupController.cleanup();
      this._popupController = null;
    }
    for (const m of this._markers.values()) {
      try {
        if (typeof m.setMap === "function") m.setMap(null);
        else m.map = null;
      } catch (_) {}
    }
    this._markers.clear();
    this._markerConfigs.clear();
    this._lastEntityState.clear();
    if (this._domMarkerLayer) {
      this._domMarkerLayer.destroy();
      this._domMarkerLayer = null;
    }
    this.clearGeoJsonLayers();
    this._geoIconCache.clear();
    if (this._trafficLayer) {
      try {
        this._trafficLayer.setMap(null);
      } catch (_) {}
      this._trafficLayer = null;
    }
    this._filterController = null;
    this._map = null;
    this._initPromise = null;
    this._initialCenterApplied = false;
    this._initialFitDone = false;
    const container = this.renderRoot?.querySelector("#map-container") as HTMLElement | null;
    if (container) container.innerHTML = "";
  }

  private isDarkMode(): boolean {
    if (this._config?.colorScheme === "dark") return true;
    if (this._config?.colorScheme === "light") return false;
    return (
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches)
    );
  }

  private resolveCenterLatLng(allowFallback = true): { lat: number; lng: number } | null {
    const centerSpec = this._config?.center;
    if (centerSpec && typeof centerSpec === "object" && "lat" in centerSpec && "lng" in centerSpec) {
      const lat = Number(centerSpec.lat);
      const lng = Number(centerSpec.lng);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
    }
    if (typeof centerSpec === "string" && centerSpec.trim()) {
      const trimmed = centerSpec.trim();
      const coordMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
      if (coordMatch) {
        return { lat: Number(coordMatch[1]), lng: Number(coordMatch[2]) };
      }
      const st = this._hass?.states?.[trimmed];
      const lat = Number(st?.attributes?.latitude);
      const lng = Number(st?.attributes?.longitude);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
    }
    const home = this._hass?.states?.["zone.home"];
    if (home) {
      const lat = Number(home.attributes?.latitude);
      const lng = Number(home.attributes?.longitude);
      if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
    }
    return allowFallback ? { lat: 49.18, lng: -123.12 } : null;
  }

  private async initMap() {
    if (this._initPromise) return this._initPromise;
    if (!this._config?.apiKey) return;
    const container = this.renderRoot.querySelector("#map-container") as HTMLElement;
    if (!container || this._map) return;

    this._initPromise = (async () => {
      try {
        this._google = await loadGoogleMaps({
          apiKey: this._config.apiKey,
          language: this._config.language
        });

        const isDark = this.isDarkMode();
        container.style.setProperty("--ha-gmap-iw-bg", isDark ? "#1e1e1e" : "#ffffff");
        const initialResolved = this.resolveCenterLatLng(false);
        const centerCoord = initialResolved || { lat: 49.18, lng: -123.12 };
        if (initialResolved) {
          this._initialCenterApplied = true;
        }

        const colorSchemeEnum = this._google.maps.ColorScheme;
        const mapOptions: any = {
          zoom: this._config.zoom,
          center: centerCoord,
          mapTypeId: this._config.mapType,
          gestureHandling: this._config.gestureHandling,
          scaleControl: this._config.showScale,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: this._config.mapTypeControl,
          zoomControl: this._config.zoomControl,
          zoomControlOptions: { position: getControlPosition(this._google.maps, this._config.zoomControlPosition) },
          cameraControl: this._config.cameraControl,
          cameraControlOptions: { position: getControlPosition(this._google.maps, this._config.cameraControlPosition) },
          rotateControl: this._config.rotateControl
        };

        if (this._config.mapId) {
          mapOptions.mapId = this._config.mapId;
        }
        if (colorSchemeEnum) {
          mapOptions.colorScheme =
            this._config.colorScheme === "dark"
              ? colorSchemeEnum.DARK
              : this._config.colorScheme === "light"
                ? colorSchemeEnum.LIGHT
                : colorSchemeEnum.FOLLOW_SYSTEM;
        }

        this._map = new this._google.maps.Map(container, mapOptions);
        this._map.addListener("click", (ev: any) => {
          if (ev?.placeId && Date.now() - this._lastMarkerClickMs < 400) {
            ev.stop?.();
          }
        });
        this._domMarkerLayer = new BatchedDomMarkerLayer(this._google.maps, this._map);
        this._popupController = new PopupController(this._google.maps);
        this._popupController.setHass(this._hass);

        // Setup Layer Filters
        if (this._config.layerFilters.enabled && Object.keys(this._config.filterGroups).length > 0) {
          this._filterController = new FilterController(
            this._config.layerFilters,
            this._config.filterGroups
          );
          this._filterController.onStateChange((filterId, active) => {
            this.applyFilterChange(filterId, active);
          });
          const filterEl = this._filterController.createControlElement(isDark);
          const pos = getControlPosition(this._google.maps, this._config.layerFilters.position);
          this._map.controls[pos].push(filterEl);
        }

        // Traffic & Recenter controls
        this.setupTrafficAndRecenterControls(isDark);

        // GeoJSON route layers
        this.loadGeoJsonLayers();

        // Transit motion engine
        if (this._config.transitMotion.enabled) {
          const getEntityConfigs = () => this._config.entities;
          this._transitMotion = new TransitMotionEngine(
            this._google.maps,
            this._map,
            this._config.transitMotion,
            {
              get entityConfigs() {
                return getEntityConfigs();
              },
              entityMarkers: this._markers,
              routePolylines: this._routePolylines,
              isEntityFilterActive: (entityId: string) => {
                const cfg = this._markerConfigs.get(entityId) || this._transitMotion?.getEntityConfig(entityId);
                return cfg ? this.isEntityFilterActive(cfg) : true;
              }
            }
          );

          const tmGroup = this._config.transitMotion.filterGroup;
          if (tmGroup && this._filterController) {
            this._transitMotion.setFilterActive(this._filterController.isFilterActive(tmGroup));
          }
        }

        this.updateEntityMarkers();

        const overlay = this.renderRoot.querySelector(".loading-overlay");
        if (overlay) overlay.remove();
      } catch (err: any) {
        this._initPromise = null;
        console.error("[ha-gmap-card] Error initializing map:", err);
        const overlay = this.renderRoot.querySelector(".loading-overlay");
        if (overlay) {
          overlay.textContent = `Map failed to load: ${err?.message || err}`;
        }
      }
    })();

    return this._initPromise;
  }

  private createMapIconButton(title: string, iconName: string, isDark: boolean): HTMLButtonElement {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.title = title;
    btn.style.cssText = `
      width: 40px;
      height: 40px;
      margin: 10px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${isDark ? "rgba(33, 33, 33, 0.92)" : "#ffffff"};
      color: ${isDark ? "#e8eaed" : "#5f6368"};
      border: ${isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)"};
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);
      cursor: pointer;
      outline: none;
    `;
    const icon = document.createElement("ha-icon");
    icon.setAttribute("icon", iconName);
    (icon.style as any).cssText = "width: 20px; height: 20px; pointer-events: none;";
    btn.appendChild(icon);
    btn.addEventListener("pointerdown", (e) => e.stopPropagation());
    return btn;
  }

  private setupTrafficAndRecenterControls(isDark: boolean) {
    if (!this._map || !this._google) return;

    if (this._config.showTraffic || this._config.showTrafficButton) {
      this._trafficLayer = new this._google.maps.TrafficLayer();
      this._trafficActive = this._config.showTraffic;
      if (this._trafficActive) {
        this._trafficLayer.setMap(this._map);
      }

      if (this._config.showTrafficButton) {
        const btn = this.createMapIconButton("Traffic", "mdi:traffic-light", isDark);
        if (this._trafficActive) btn.style.color = "#1a73e8";
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          this._trafficActive = !this._trafficActive;
          this._trafficLayer.setMap(this._trafficActive ? this._map : null);
          btn.style.color = this._trafficActive ? "#1a73e8" : isDark ? "#e8eaed" : "#5f6368";
        });
        const pos = getControlPosition(this._google.maps, this._config.showTrafficButtonPosition);
        this._map.controls[pos].push(btn);
      }
    }

    if (this._config.showRecenterButton) {
      const btn = this.createMapIconButton("Recenter", "mdi:crosshairs-gps", isDark);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const center = this.resolveCenterLatLng(true);
        if (center && this._map) {
          this._map.panTo(center);
          this._map.setZoom(this._config.zoom);
        }
      });
      const pos = getControlPosition(this._google.maps, this._config.showRecenterButtonPosition);
      this._map.controls[pos].push(btn);
    }
  }

  private applyFilterChange(filterId: string, active: boolean) {
    for (const [entityId, marker] of this._markers.entries()) {
      const entCfg = this._markerConfigs.get(entityId);
      if (entCfg?.filterGroup === filterId) {
        const zoom = typeof this._map?.getZoom === "function" ? this._map.getZoom() : 15;
        const minZ = this._transitMotion?.getEntityMinZoom(entityId) ?? entCfg.minZoom ?? null;
        const zoomOk = minZ === null ? true : zoom >= minZ;
        const show = active && zoomOk;
        if (typeof marker.setVisible === "function") marker.setVisible(show);
        else marker.map = show ? this._map : null;
      }
    }

    for (const [url, layer] of this._geoLayers.entries()) {
      const geoCfg = this._config.geojsonLayers.find((g) => g.url === url);
      if (geoCfg?.filterGroup === filterId) {
        layer.setMap(active ? this._map : null);
      }
    }

    if (this._config.transitMotion.filterGroup === filterId && this._transitMotion) {
      this._transitMotion.setFilterActive(active);
    }
  }

  private clearGeoJsonLayers() {
    for (const layer of this._geoLayers.values()) {
      try {
        layer.setMap(null);
      } catch (_) {}
    }
    this._geoLayers.clear();
    this._routePolylines.clear();
  }

  private loadGeoJsonLayers() {
    if (!this._map || !this._google) return;
    this._geoSignature = JSON.stringify(
      this._config.geojsonLayers.map((g) => [g.url, g.strokeColor, g.strokeWidth, g.stationIcon, g.stopIcon, g.filterGroup])
    );

    const isDark = this.isDarkMode();

    for (const layerCfg of this._config.geojsonLayers) {
      if (!layerCfg.url) continue;
      const isActive = !layerCfg.filterGroup || !this._filterController || this._filterController.isFilterActive(layerCfg.filterGroup);
      const dataLayer = new this._google.maps.Data({ map: isActive ? this._map : null });

      dataLayer.setStyle((feature: any) => this.computeGeoFeatureStyle(dataLayer, feature, layerCfg));

      if (layerCfg.showPopup !== false) {
        const hiddenKeys = new Set(["color", "strokeColor", "strokeWeight", "scale", "point_type", "type", "location_type", "route_type"]);
        dataLayer.addListener("click", (ev: any) => {
          if (Date.now() - this._lastMarkerClickMs < 350) return;
          const props: string[] = [];
          ev.feature?.forEachProperty?.((val: any, key: string) => {
            if (val !== null && val !== undefined && val !== "" && !hiddenKeys.has(key)) {
              props.push(`<div style="margin-bottom:2px;"><b>${escapeHtml(String(key))}:</b> ${escapeHtml(String(val))}</div>`);
            }
          });
          const title = layerCfg.label || layerCfg.name;
          const headerHtml = title
            ? `<div style="font-weight:700;font-size:13px;margin-bottom:4px;border-bottom:1px solid rgba(128,128,128,0.25);padding-bottom:3px;">${escapeHtml(String(title))}</div>`
            : "";
          const bodyHtml = props.length ? props.join("") : "No details";
          this._popupController?.openAtPosition(this._map, ev.latLng, `${headerHtml}${bodyHtml}`, isDark);
        });
      }

      this._geoLayers.set(layerCfg.url, dataLayer);

      let fetchPromise = geoJsonCache.get(layerCfg.url);
      if (!fetchPromise) {
        fetchPromise = fetch(layerCfg.url)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
        geoJsonCache.set(layerCfg.url, fetchPromise);
      }

      fetchPromise.then((geoData) => {
        if (!geoData || this._geoLayers.get(layerCfg.url) !== dataLayer) return;
        dataLayer.addGeoJson(geoData);
        this.indexGeoJsonPolylines(geoData, layerCfg);
      });
    }
  }

  private computeGeoFeatureStyle(dataLayer: any, feature: any, layerCfg: GeoJsonLayerConfig) {
    const geomType = feature.getGeometry?.()?.getType?.();
    const sColor = feature.getProperty("strokeColor") || layerCfg.strokeColor || "#007aff";
    const sWeight = Number(feature.getProperty("strokeWeight") ?? layerCfg.strokeWidth ?? 3);

    if (geomType !== "Point") {
      return {
        strokeColor: sColor,
        strokeWeight: sWeight,
        fillColor: layerCfg.fillColor || sColor,
        fillOpacity: layerCfg.fillOpacity ?? 0.25,
        clickable: layerCfg.showPopup !== false
      };
    }

    const pointType = String(feature.getProperty("point_type") || "").toLowerCase();
    const featType = String(feature.getProperty("type") || "").toLowerCase();
    const badgeProp = feature.getProperty("badge");
    const clickable = layerCfg.showPopup !== false;

    if (pointType === "badge" || featType === "badge" || badgeProp) {
      const badgeText = String(badgeProp || layerCfg.label || layerCfg.name || "").trim();
      const badgeColor = String(feature.getProperty("color") || sColor || "#007aff");
      if (badgeText) {
        const badgeKey = `badge|${badgeText}|${badgeColor}`;
        let badgeIcon = this._geoIconCache.get(badgeKey);
        if (!badgeIcon) {
          const w = Math.max(32, Math.round(badgeText.length * 7.2 + 16));
          const h = 22;
          const safeText = escapeHtml(badgeText);
          const badgeSvg =
            `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
            `<rect x='1' y='1' width='${w - 2}' height='${h - 2}' rx='10' fill='${badgeColor}' stroke='#ffffff' stroke-width='1.5'/>` +
            `<text x='${w / 2}' y='14.5' text-anchor='middle' fill='#ffffff' font-family='-apple-system,BlinkMacSystemFont,Roboto,sans-serif' font-size='11' font-weight='700'>${safeText}</text>` +
            `</svg>`;
          badgeIcon = {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(badgeSvg),
            scaledSize: new this._google.maps.Size(w, h),
            anchor: new this._google.maps.Point(w / 2, h / 2)
          };
          this._geoIconCache.set(badgeKey, badgeIcon);
        }
        return {
          icon: badgeIcon,
          title: String(feature.getProperty("name") || badgeText),
          clickable,
          zIndex: 200
        };
      }
    }

    const locType = feature.getProperty("location_type");
    const mode = String(feature.getProperty("mode") || "").toLowerCase();
    const isStation =
      pointType === "station" ||
      locType === 1 ||
      locType === "1" ||
      mode === "subway" ||
      mode === "rail" ||
      mode === "metro";

    const title = String(feature.getProperty("name") || feature.getProperty("Station") || (isStation ? "Station" : "Stop"));

    if (isStation) {
      const sz = layerCfg.stationSize || 18;
      if (layerCfg.stationIcon) {
        let resolvedUrl = layerCfg.stationIcon;
        if (resolvedUrl.startsWith("mdi:")) {
          const cached = resolveMdiIconDataUrl(
            resolvedUrl,
            { size: sz, bgColor: sColor, fgColor: "#ffffff", badge: true },
            (asyncUrl) => {
              dataLayer.overrideStyle(feature, {
                icon: {
                  url: asyncUrl,
                  scaledSize: new this._google.maps.Size(sz, sz),
                  anchor: new this._google.maps.Point(sz / 2, sz / 2)
                }
              });
            }
          );
          resolvedUrl = cached || "";
        }
        if (resolvedUrl) {
          return {
            icon: {
              url: resolvedUrl,
              scaledSize: new this._google.maps.Size(sz, sz),
              anchor: new this._google.maps.Point(sz / 2, sz / 2)
            },
            title,
            clickable
          };
        }
      }

      const tSvg =
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='${sz}' height='${sz}'>` +
        `<rect width='24' height='24' rx='4' fill='${sColor}'/>` +
        `<path d='M4.5 6.5h15v3h-5.7v9h-3.6v-9H4.5v-3z' fill='#FFFFFF'/></svg>`;
      const cacheKey = `station_t|${sColor}|${sz}`;
      let iconObj = this._geoIconCache.get(cacheKey);
      if (!iconObj) {
        iconObj = {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(tSvg),
          scaledSize: new this._google.maps.Size(sz, sz),
          anchor: new this._google.maps.Point(sz / 2, sz / 2)
        };
        this._geoIconCache.set(cacheKey, iconObj);
      }
      return {
        icon: iconObj,
        title,
        clickable
      };
    }

    if (layerCfg.stopIcon) {
      const sz = layerCfg.stopSize || 14;
      let resolvedUrl = layerCfg.stopIcon;
      if (resolvedUrl.startsWith("mdi:")) {
        resolvedUrl =
          resolveMdiIconDataUrl(
            resolvedUrl,
            { size: sz, bgColor: sColor, fgColor: "#ffffff", badge: true },
            (asyncUrl) => {
              dataLayer.overrideStyle(feature, {
                icon: {
                  url: asyncUrl,
                  scaledSize: new this._google.maps.Size(sz, sz),
                  anchor: new this._google.maps.Point(sz / 2, sz / 2)
                }
              });
            }
          ) || "";
      }
      if (resolvedUrl) {
        return {
          icon: {
            url: resolvedUrl,
            scaledSize: new this._google.maps.Size(sz, sz),
            anchor: new this._google.maps.Point(sz / 2, sz / 2)
          },
          title,
          clickable
        };
      }
    }

    const fillC = feature.getProperty("color") || sColor;
    const dotKey = `dot|${fillC}`;
    let dotIcon = this._geoIconCache.get(dotKey);
    if (!dotIcon) {
      dotIcon = {
        path: this._google.maps.SymbolPath.CIRCLE,
        scale: 2.2,
        fillColor: fillC,
        fillOpacity: 0.95,
        strokeColor: "#ffffff",
        strokeWeight: 0.6
      };
      this._geoIconCache.set(dotKey, dotIcon);
    }
    return {
      icon: dotIcon,
      title,
      clickable
    };
  }

  private indexGeoJsonPolylines(geoData: any, layerCfg: GeoJsonLayerConfig) {
    if (!geoData?.features) return;
    const lines: number[][][] = [];
    for (const f of geoData.features) {
      if (f?.geometry?.type === "LineString" && Array.isArray(f.geometry.coordinates)) {
        lines.push(f.geometry.coordinates);
      } else if (f?.geometry?.type === "MultiLineString" && Array.isArray(f.geometry.coordinates)) {
        for (const sub of f.geometry.coordinates) {
          if (Array.isArray(sub)) lines.push(sub);
        }
      }
    }
    if (lines.length === 0) return;

    const keys = extractRouteKeys(layerCfg.url, layerCfg.routeKey, layerCfg.name || layerCfg.label);
    for (const k of keys) {
      this._routePolylines.set(k, lines);
    }
  }

  private updateEntityMarkers() {
    if (!this._map || !this._google || !this._hass) return;

    this._lastWildcardScanMs = Date.now();
    const isDark = this.isDarkMode();
    const activeEntityIds = new Set<string>();
    const zoom = typeof this._map.getZoom === "function" ? this._map.getZoom() : 15;
    let membershipChanged = false;

    for (const ent of this._config.entities) {
      if (!ent.entityId) continue;
      const isPattern =
        ent.entityId.includes("*") ||
        ent.entityId.includes("?") ||
        (ent.entityId.startsWith("/") && ent.entityId.lastIndexOf("/") > 0);
      const matchedIds = this._hass.states[ent.entityId]
        ? [ent.entityId]
        : isPattern
          ? Object.keys(this._hass.states).filter((id) => matchEntityPattern(id, ent.entityId))
          : [];

      for (const resolvedId of matchedIds) {
        const stateObj = this._hass.states[resolvedId];
        if (!stateObj) continue;
        if (ent.nameFilter) {
          const friendlyName = String(stateObj.attributes?.friendly_name || resolvedId);
          if (!matchEntityPattern(friendlyName, ent.nameFilter)) continue;
        }
        const resolvedEnt = resolvedId === ent.entityId ? ent : { ...ent, entityId: resolvedId };

        const lat = Number(stateObj.attributes?.latitude);
        const lng = Number(stateObj.attributes?.longitude);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

        activeEntityIds.add(resolvedEnt.entityId);
        this._markerConfigs.set(resolvedEnt.entityId, resolvedEnt);

        const prevState = this._lastEntityState.get(resolvedEnt.entityId);
        const existingMarker = this._markers.get(resolvedEnt.entityId);
        if (existingMarker && prevState === stateObj) {
          continue;
        }
        this._lastEntityState.set(resolvedEnt.entityId, stateObj);

        const minZ = this._transitMotion?.getEntityMinZoom(resolvedEnt.entityId) ?? resolvedEnt.minZoom ?? null;
        const zoomOk = minZ === null ? true : zoom >= minZ;
        const filterOk = this.isEntityFilterActive(resolvedEnt);
        const shouldShow = filterOk && zoomOk;

        if (!existingMarker) {
          membershipChanged = true;
          const contentEl = createMarkerElement(resolvedEnt, stateObj, isDark);
          const position = { lat, lng };
          const title = resolvedEnt.name || stateObj.attributes?.friendly_name || resolvedEnt.entityId;

          let marker: any;
          if (this._config.mapId && this._google.maps.marker?.AdvancedMarkerElement) {
            marker = new this._google.maps.marker.AdvancedMarkerElement({
              map: shouldShow ? this._map : null,
              position,
              content: contentEl,
              title
            });
          } else {
            marker = this._domMarkerLayer!.addMarker(position, contentEl, title);
            marker.setVisible(shouldShow);
          }

          const eid = resolvedEnt.entityId;
          marker.addListener("click", () => {
            this._lastMarkerClickMs = Date.now();
            const latestState = this._hass?.states?.[eid] || stateObj;
            const latestCfg = this._markerConfigs.get(eid) || resolvedEnt;
            this._popupController?.open(this._map, marker, latestCfg, latestState, this.isDarkMode());
          });

          this._markers.set(resolvedEnt.entityId, marker);
        } else {
          const newPos = { lat, lng };
          if (typeof existingMarker.setPosition === "function") existingMarker.setPosition(newPos);
          else existingMarker.position = newPos;
          if (typeof existingMarker.setVisible === "function") existingMarker.setVisible(shouldShow);
          else existingMarker.map = shouldShow ? this._map : null;
        }
      }
    }

    // Prune markers no longer in entities config
    for (const [eid, marker] of this._markers.entries()) {
      if (!activeEntityIds.has(eid)) {
        membershipChanged = true;
        try {
          if (typeof marker.setMap === "function") marker.setMap(null);
          else marker.map = null;
        } catch (_) {}
        this._markers.delete(eid);
        this._markerConfigs.delete(eid);
        this._lastEntityState.delete(eid);
      }
    }

    if (this._config.fitEntities && !this._initialFitDone && this._markers.size > 0) {
      this._initialFitDone = true;
      const bounds = new this._google.maps.LatLngBounds();
      for (const marker of this._markers.values()) {
        const pos = typeof marker.getPosition === "function" ? marker.getPosition() : marker.position;
        if (pos) bounds.extend(pos);
      }
      if (!bounds.isEmpty()) {
        this._map.fitBounds(bounds);
      }
    }

    if (membershipChanged) {
      this._transitMotion?.updateVisibility();
    }
  }

  private followEntitiesIfConfigured() {
    if (!this._map || !this._hass) return;
    for (const ent of this._config.entities) {
      const zoneOverride = this._config.zones?.[ent.entityId]?.follow;
      const shouldFollow =
        ent.follow !== undefined
          ? Boolean(ent.follow)
          : zoneOverride !== undefined
            ? Boolean(zoneOverride)
            : this._config.followByDefault;

      if (!shouldFollow) continue;
      const st = this._hass.states?.[ent.entityId];
      const lat = Number(st?.attributes?.latitude);
      const lng = Number(st?.attributes?.longitude);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        this._map.panTo({ lat, lng });
        break;
      }
    }
  }

  private isEntityFilterActive(ent: CardEntityConfig): boolean {
    if (!ent.filterGroup || !this._filterController) return true;
    return this._filterController.isFilterActive(ent.filterGroup);
  }

  protected render() {
    return html`
      <div id="map-container">
        <div class="loading-overlay">Loading map...</div>
      </div>
    `;
  }
}
