import { css, html, LitElement, PropertyValues } from "lit";
import { CardEntityConfig, NormalizedCardConfig, normalizeCardConfig } from "./config/schema";
import { FilterController } from "./filters/controller";
import { loadGoogleMaps } from "./maps/loader";
import { createMarkerElement } from "./maps/marker-content";
import { PopupController } from "./popup/controller";
import { TransitMotionEngine } from "./transit/motion";

export class HaGmapCard extends LitElement {
  private _config!: NormalizedCardConfig;
  private _hass: any;
  private _map: any = null;
  private _google: any = null;
  private _markers = new Map<string, any>();
  private _geoLayers = new Map<string, any>();
  private _popupController!: PopupController;
  private _filterController!: FilterController;
  private _transitMotion!: TransitMotionEngine;

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
    }
  `;

  public setConfig(config: any) {
    if (!config.api_key && !config.apiKey) {
      throw new Error("[ha-gmap-card] An 'api_key' is required.");
    }
    this._config = normalizeCardConfig(config);
    this.requestUpdate();
  }

  public set hass(hass: any) {
    this._hass = hass;
    if (this._popupController) {
      this._popupController.setHass(hass);
    }
    this.updateEntityMarkers();
  }

  public getCardSize(): number {
    return 6;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.initMap();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    if (this._transitMotion) {
      this._transitMotion.destroy();
    }
    if (this._popupController) {
      this._popupController.cleanup();
    }
  }

  private async initMap() {
    const container = this.renderRoot.querySelector("#map-container") as HTMLElement;
    if (!container || this._map) return;

    try {
      this._google = await loadGoogleMaps({
        apiKey: this._config.apiKey,
        language: this._config.language
      });

      const isDark =
        this._config.colorScheme === "dark" ||
        (this._config.colorScheme === "follow_system" &&
          (document.documentElement.getAttribute("data-theme") === "dark" ||
            window.matchMedia("(prefers-color-scheme: dark)").matches));

      const mapOptions: any = {
        zoom: this._config.zoom,
        center: { lat: 49.18, lng: -123.12 }, // Vancouver default
        mapTypeId: this._config.mapType,
        gestureHandling: this._config.gestureHandling,
        scaleControl: this._config.showScale,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      };

      if (this._config.mapId) {
        mapOptions.mapId = this._config.mapId;
      }

      this._map = new this._google.maps.Map(container, mapOptions);
      this._popupController = new PopupController(this._google.maps);
      this._popupController.setHass(this._hass);

      // Setup Filters
      if (this._config.layerFilters.enabled) {
        this._filterController = new FilterController(
          this._config.layerFilters,
          this._config.filterGroups
        );

        this._filterController.onStateChange((filterId, active) => {
          this.applyFilterChange(filterId, active);
        });

        const filterEl = this._filterController.createControlElement(isDark);
        const pos = this._google.maps.ControlPosition[this._config.layerFilters.position] ||
          this._google.maps.ControlPosition.TOP_RIGHT;
        this._map.controls[pos].push(filterEl);
      }

      // Setup GeoJSON Layers
      this.loadGeoJsonLayers();

      // Setup Transit Motion
      if (this._config.transitMotion.enabled) {
        this._transitMotion = new TransitMotionEngine(
          this._google.maps,
          this._map,
          {
            fps: this._config.transitMotion.fps,
            minZoom: this._config.transitMotion.minZoom,
            scheduleUrl: this._config.transitMotion.scheduleUrl!
          }
        );
      }

      // Initial entity marker render
      this.updateEntityMarkers();

      const overlay = this.renderRoot.querySelector(".loading-overlay");
      if (overlay) overlay.remove();
    } catch (err) {
      console.error("[ha-gmap-card] Error initializing map:", err);
    }
  }

  private applyFilterChange(filterId: string, active: boolean) {
    // 1. Entities
    for (const [entityId, marker] of this._markers.entries()) {
      const entCfg = this._config.entities.find((e) => e.entityId === entityId);
      if (entCfg?.filterGroup === filterId) {
        if (typeof marker.setMap === "function") marker.setMap(active ? this._map : null);
        else marker.map = active ? this._map : null;
      }
    }

    // 2. GeoJSON layers
    for (const [url, layer] of this._geoLayers.entries()) {
      const geoCfg = this._config.geojsonLayers.find((g) => g.url === url);
      if (geoCfg?.filterGroup === filterId) {
        layer.setMap(active ? this._map : null);
      }
    }

    // 3. Vehicles
    if (this._config.transitMotion.filterGroup === filterId && this._transitMotion) {
      this._transitMotion.setFilterActive(active);
    }
  }

  private loadGeoJsonLayers() {
    if (!this._map || !this._google) return;

    for (const layerCfg of this._config.geojsonLayers) {
      const dataLayer = new this._google.maps.Data({ map: this._map });
      dataLayer.loadGeoJson(layerCfg.url, {}, () => {
        dataLayer.setStyle({
          strokeColor: layerCfg.strokeColor || "#007aff",
          strokeWeight: layerCfg.strokeWidth || 4,
          fillColor: layerCfg.fillColor,
          fillOpacity: layerCfg.fillOpacity
        });
      });
      this._geoLayers.set(layerCfg.url, dataLayer);
    }
  }

  private updateEntityMarkers() {
    if (!this._map || !this._google || !this._hass) return;

    const isDark =
      this._config.colorScheme === "dark" ||
      (this._config.colorScheme === "follow_system" &&
        (document.documentElement.getAttribute("data-theme") === "dark" ||
          window.matchMedia("(prefers-color-scheme: dark)").matches));

    for (const ent of this._config.entities) {
      const stateObj = this._hass.states[ent.entityId];
      if (!stateObj) continue;

      const lat = Number(stateObj.attributes.latitude);
      const lng = Number(stateObj.attributes.longitude);
      if (isNaN(lat) || isNaN(lng)) continue;

      let marker = this._markers.get(ent.entityId);
      if (!marker) {
        const contentEl = createMarkerElement(ent, stateObj, isDark);
        const position = { lat, lng };

        if (this._config.mapId && this._google.maps.marker?.AdvancedMarkerElement) {
          marker = new this._google.maps.marker.AdvancedMarkerElement({
            map: this.isEntityFilterActive(ent) ? this._map : null,
            position,
            content: contentEl,
            title: ent.name || stateObj.attributes.friendly_name || ent.entityId
          });
        } else {
          // Standard Marker fallback if no map_id provided
          marker = new this._google.maps.Marker({
            map: this.isEntityFilterActive(ent) ? this._map : null,
            position,
            title: ent.name || stateObj.attributes.friendly_name || ent.entityId
          });
        }

        marker.addListener("click", () => {
          this._popupController.open(this._map, marker, ent, stateObj, isDark);
        });

        this._markers.set(ent.entityId, marker);
      } else {
        // Update position if changed
        const newPos = { lat, lng };
        if (typeof marker.setPosition === "function") marker.setPosition(newPos);
        else marker.position = newPos;
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
