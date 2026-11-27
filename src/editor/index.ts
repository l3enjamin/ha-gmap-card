import { html, LitElement, nothing, TemplateResult } from "lit";
import {
  renderCheckboxField,
  renderColorField,
  renderNumberField,
  renderSelectField,
  renderTextareaField,
  renderTextField,
  renderTriBoolField
} from "./fields";
import {
  arrayAdd,
  arrayDuplicate,
  arrayMove,
  arrayRemove,
  arrayUpdate,
  cleanFieldUpdate,
  cloneConfig,
  CONTROL_POSITIONS,
  MARKER_SHAPES,
  normalizeEntityForEditor,
  normalizeFilterGroupsToRecord,
  parsePopupCardInput,
  PICTURE_SHAPES,
  recordDeleteKey,
  recordRenameKey,
  ROUTE_LABEL_SHAPES
} from "./helpers";
import { editorStyles } from "./styles";

type EditorTab = "global" | "entities" | "geojson" | "transit" | "filters";
type EditorSubView =
  | null
  | { kind: "entity"; index: number }
  | { kind: "geojson"; index: number }
  | { kind: "route"; key: string }
  | { kind: "filterGroup"; key: string };

const POS_OPTIONS = CONTROL_POSITIONS.map((p) => ({ value: p, label: p }));
const MAP_TYPE_OPTIONS = [
  { value: "roadmap", label: "Roadmap" },
  { value: "satellite", label: "Satellite" },
  { value: "hybrid", label: "Hybrid" },
  { value: "terrain", label: "Terrain" }
];
const GESTURE_OPTIONS = [
  { value: "greedy", label: "Greedy" },
  { value: "cooperative", label: "Cooperative" },
  { value: "auto", label: "Auto" },
  { value: "none", label: "None" }
];
const COLOR_SCHEME_OPTIONS = [
  { value: "follow_system", label: "Follow System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" }
];
const MARKER_SHAPE_OPTIONS = [
  { value: "", label: "Auto / Default" },
  ...MARKER_SHAPES.map((s) => ({ value: s, label: s }))
];
const PICTURE_SHAPE_OPTIONS = [
  { value: "", label: "Default" },
  ...PICTURE_SHAPES.map((s) => ({ value: s, label: s }))
];
const LABEL_SHAPE_OPTIONS = [
  { value: "", label: "Default (pill)" },
  ...ROUTE_LABEL_SHAPES.map((s) => ({ value: s, label: s }))
];
const TRANSIT_TYPE_OPTIONS = [
  { value: "", label: "Auto / None" },
  { value: "bus", label: "bus" },
  { value: "subway", label: "subway" },
  { value: "deal", label: "deal" },
  { value: "other", label: "other" }
];

export class HaGmapCardEditor extends LitElement {
  private _config: Record<string, any> = {};
  private _activeTab: EditorTab = "global";
  private _subView: EditorSubView = null;
  private _popupCardError: string | null = null;
  private _yamlEditorReady = typeof customElements !== "undefined" && Boolean(customElements.get("ha-yaml-editor"));
  private _yamlSeedKey = "";
  private _yamlSeedValue: any = undefined;
  private _cachedStatesRef: any = null;
  private _cachedEntityIds: string[] = [];

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _activeTab: { state: true },
    _subView: { state: true },
    _popupCardError: { state: true },
    _yamlEditorReady: { state: true }
  };

  public hass: any;

  static styles = editorStyles;

  public connectedCallback() {
    super.connectedCallback();
    if (!this._yamlEditorReady && typeof customElements !== "undefined" && customElements.whenDefined) {
      customElements.whenDefined("ha-yaml-editor").then(() => {
        this._yamlEditorReady = true;
      });
    }
  }

  public setConfig(config: Record<string, any>) {
    this._config = config ? cloneConfig(config) : {};
    this._popupCardError = null;
  }

  private emitConfig(next: Record<string, any>) {
    this._config = next;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: next },
        bubbles: true,
        composed: true
      })
    );
  }

  private switchTab(tab: EditorTab) {
    this._activeTab = tab;
    this._subView = null;
    this._popupCardError = null;
  }

  private updateTopField(key: string, value: any, removeAliases?: string[]) {
    this.emitConfig(cleanFieldUpdate(this._config, key, value, removeAliases));
  }

  private updateNestedSection(sectionKey: string, fieldKey: string, value: any, removeAliases?: string[]) {
    const curSection =
      this._config[sectionKey] && typeof this._config[sectionKey] === "object" && !Array.isArray(this._config[sectionKey])
        ? this._config[sectionKey]
        : {};
    const nextSection = cleanFieldUpdate(curSection, fieldKey, value, removeAliases);
    const next = { ...this._config };
    if (Object.keys(nextSection).length === 0) {
      delete next[sectionKey];
    } else {
      next[sectionKey] = nextSection;
    }
    this.emitConfig(next);
  }

  private getEntityIds(): string[] {
    const states = this.hass?.states;
    if (!states) return [];
    if (states !== this._cachedStatesRef) {
      this._cachedStatesRef = states;
      this._cachedEntityIds = Object.keys(states).sort().slice(0, 500);
    }
    return this._cachedEntityIds;
  }

  private getFilterGroupKeys(): string[] {
    return Object.keys(normalizeFilterGroupsToRecord(this._config.filter_groups || this._config.filterGroups));
  }

  private renderDatalists(): TemplateResult {
    const ids = this.getEntityIds();
    const groups = this.getFilterGroupKeys();
    return html`
      <datalist id="ha-gmap-entities">
        ${ids.map((id) => html`<option value=${id}></option>`)}
      </datalist>
      <datalist id="ha-gmap-filter-groups">
        ${groups.map((g) => html`<option value=${g}></option>`)}
      </datalist>
    `;
  }

  protected render(): TemplateResult {
    const tabs: Array<{ id: EditorTab; label: string }> = [
      { id: "global", label: "Global" },
      { id: "entities", label: `Entities (${Array.isArray(this._config.entities) ? this._config.entities.length : 0})` },
      { id: "geojson", label: `GeoJSON (${Array.isArray(this._config.geojson_layers) ? this._config.geojson_layers.length : 0})` },
      { id: "transit", label: "Transit" },
      { id: "filters", label: "Filters" }
    ];

    return html`
      ${this.renderDatalists()}
      <div class="tabs" role="tablist">
        ${tabs.map(
          (t) => html`
            <button
              type="button"
              role="tab"
              aria-selected=${this._activeTab === t.id ? "true" : "false"}
              class=${this._activeTab === t.id ? "tab-btn active" : "tab-btn"}
              @click=${() => this.switchTab(t.id)}
            >
              ${t.label}
            </button>
          `
        )}
      </div>
      ${this.renderActiveTab()}
    `;
  }

  private renderActiveTab(): TemplateResult {
    switch (this._activeTab) {
      case "global":
        return this.renderGlobalTab();
      case "entities":
        return this._subView?.kind === "entity"
          ? this.renderEntityDetail(this._subView.index)
          : this.renderEntitiesMaster();
      case "geojson":
        return this._subView?.kind === "geojson"
          ? this.renderGeoJsonDetail(this._subView.index)
          : this.renderGeoJsonMaster();
      case "transit":
        return this._subView?.kind === "route"
          ? this.renderRouteDetail(this._subView.key)
          : this.renderTransitMaster();
      case "filters":
        return this._subView?.kind === "filterGroup"
          ? this.renderFilterGroupDetail(this._subView.key)
          : this.renderFiltersMaster();
    }
  }

  /* ------------------------------------------------------------------ *
   * TAB 1: GLOBAL
   * ------------------------------------------------------------------ */

  private renderGlobalTab(): TemplateResult {
    const cfg = this._config || {};
    const rawCenter = cfg.center ?? cfg.initial_center ?? cfg.center_entity;
    const isLatLngCenter = Boolean(rawCenter && typeof rawCenter === "object" && !Array.isArray(rawCenter));
    const zonesObj = cfg.zones && typeof cfg.zones === "object" && !Array.isArray(cfg.zones) ? cfg.zones : {};
    const zoneEntries = Object.entries(zonesObj) as Array<[string, any]>;
    const rl = cfg.route_labels && typeof cfg.route_labels === "object" ? cfg.route_labels : {};

    return html`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Core</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Google Maps API Key",
            value: cfg.api_key ?? cfg.apiKey,
            fullWidth: true,
            onChange: (v) => this.updateTopField("api_key", v, ["apiKey"])
          })}
          ${renderTextField({
            label: "Vector Map ID (optional)",
            value: cfg.map_id ?? cfg.mapId,
            onChange: (v) => this.updateTopField("map_id", v, ["mapId"])
          })}
          ${renderNumberField({
            label: "Initial Zoom",
            value: cfg.zoom ?? 15,
            min: 0,
            max: 24,
            step: 1,
            onChange: (v) => this.updateTopField("zoom", v)
          })}
          ${renderSelectField({
            label: "Center Mode",
            value: isLatLngCenter ? "coords" : "entity",
            options: [
              { value: "entity", label: "Entity / Zone ID" },
              { value: "coords", label: "Fixed Latitude / Longitude" }
            ],
            onChange: (mode) => {
              if (mode === "coords") {
                this.updateTopField("center", { lat: 49.2827, lng: -123.1207 }, ["initial_center", "center_entity"]);
              } else {
                this.updateTopField("center", "zone.home", ["initial_center", "center_entity"]);
              }
            }
          })}
          ${isLatLngCenter
            ? html`
                ${renderNumberField({
                  label: "Center Latitude",
                  value: rawCenter.lat,
                  min: -90,
                  max: 90,
                  onChange: (lat) =>
                    this.updateTopField("center", { lat: lat ?? 0, lng: Number(rawCenter.lng ?? 0) }, ["initial_center", "center_entity"])
                })}
                ${renderNumberField({
                  label: "Center Longitude",
                  value: rawCenter.lng,
                  min: -180,
                  max: 180,
                  onChange: (lng) =>
                    this.updateTopField("center", { lat: Number(rawCenter.lat ?? 0), lng: lng ?? 0 }, ["initial_center", "center_entity"])
                })}
              `
            : renderTextField({
                label: "Center Entity ID",
                value: typeof rawCenter === "string" ? rawCenter : "",
                placeholder: "zone.home",
                listId: "ha-gmap-entities",
                onChange: (v) => this.updateTopField("center", v, ["initial_center", "center_entity"])
              })}
          ${renderSelectField({
            label: "Map Type",
            value: cfg.map_type ?? cfg.mapType ?? "roadmap",
            options: MAP_TYPE_OPTIONS,
            onChange: (v) => this.updateTopField("map_type", v, ["mapType"])
          })}
          ${renderSelectField({
            label: "Gesture Handling",
            value: cfg.gesture_handling ?? cfg.gestureHandling ?? "greedy",
            options: GESTURE_OPTIONS,
            onChange: (v) => this.updateTopField("gesture_handling", v, ["gestureHandling"])
          })}
          ${renderSelectField({
            label: "Color Scheme",
            value: cfg.color_scheme ?? cfg.colorScheme ?? "follow_system",
            options: COLOR_SCHEME_OPTIONS,
            onChange: (v) => this.updateTopField("color_scheme", v, ["colorScheme"])
          })}
          ${renderTextField({
            label: "Language",
            value: cfg.language,
            placeholder: "en / zh-HK / zh-TW",
            onChange: (v) => this.updateTopField("language", v)
          })}
          <div class="checks">
            ${renderCheckboxField({
              label: "Follow entities continuously",
              checked: Boolean(cfg.follow_by_default ?? cfg.followByDefault),
              onChange: (c) => this.updateTopField("follow_by_default", c, ["followByDefault"])
            })}
            ${renderCheckboxField({
              label: "Fit all entities on load",
              checked: Boolean(cfg.fit_entities ?? cfg.fitEntities),
              onChange: (c) => this.updateTopField("fit_entities", c, ["fitEntities"])
            })}
            ${renderCheckboxField({
              label: "Show traffic layer by default",
              checked: Boolean(cfg.show_traffic ?? cfg.showTraffic),
              onChange: (c) => this.updateTopField("show_traffic", c, ["showTraffic"])
            })}
            ${renderCheckboxField({
              label: "Hide Google Map links",
              checked: Boolean(cfg.hide_map_links ?? cfg.hideMapLinks),
              onChange: (c) => this.updateTopField("hide_map_links", c, ["hideMapLinks"])
            })}
            ${renderCheckboxField({
              label: "Show scale bar",
              checked: Boolean(cfg.showScale ?? cfg.show_scale),
              onChange: (c) => this.updateTopField("showScale", c, ["show_scale"])
            })}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Map Controls & Positions</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${renderCheckboxField({
              label: "Traffic toggle button",
              checked: Boolean(cfg.show_traffic_button ?? cfg.showTrafficButton),
              onChange: (c) => this.updateTopField("show_traffic_button", c, ["showTrafficButton"])
            })}
            ${renderCheckboxField({
              label: "Recenter button",
              checked: Boolean(cfg.show_recenter_button ?? cfg.showRecenterButton),
              onChange: (c) => this.updateTopField("show_recenter_button", c, ["showRecenterButton"])
            })}
            ${renderCheckboxField({
              label: "Zoom controls",
              checked: Boolean(cfg.zoomControl ?? cfg.zoom_control),
              onChange: (c) => this.updateTopField("zoomControl", c, ["zoom_control"])
            })}
            ${renderCheckboxField({
              label: "Camera / tilt controls",
              checked: Boolean(cfg.cameraControl ?? cfg.camera_control),
              onChange: (c) => this.updateTopField("cameraControl", c, ["camera_control"])
            })}
            ${renderCheckboxField({
              label: "Rotate control",
              checked: Boolean(cfg.rotateControl ?? cfg.rotate_control),
              onChange: (c) => this.updateTopField("rotateControl", c, ["rotate_control"])
            })}
            ${renderCheckboxField({
              label: "Map type selector",
              checked: Boolean(cfg.mapTypeControl ?? cfg.map_type_control),
              onChange: (c) => this.updateTopField("mapTypeControl", c, ["map_type_control"])
            })}
          </div>
          ${renderSelectField({
            label: "Traffic Button Position",
            value: cfg.show_traffic_button_position ?? cfg.showTrafficButtonPosition ?? "TOP_RIGHT",
            options: POS_OPTIONS,
            onChange: (v) => this.updateTopField("show_traffic_button_position", v, ["showTrafficButtonPosition"])
          })}
          ${renderSelectField({
            label: "Recenter Button Position",
            value: cfg.show_recenter_button_position ?? cfg.showRecenterButtonPosition ?? "LEFT_BOTTOM",
            options: POS_OPTIONS,
            onChange: (v) => this.updateTopField("show_recenter_button_position", v, ["showRecenterButtonPosition"])
          })}
          ${renderSelectField({
            label: "Zoom Control Position",
            value: cfg.zoomControl_position ?? cfg.zoomControlPosition ?? cfg.zoom_control_position ?? "RIGHT_BOTTOM",
            options: POS_OPTIONS,
            onChange: (v) => this.updateTopField("zoomControl_position", v, ["zoomControlPosition", "zoom_control_position"])
          })}
          ${renderSelectField({
            label: "Camera Control Position",
            value: cfg.cameraControl_position ?? cfg.cameraControlPosition ?? cfg.camera_control_position ?? "RIGHT_BOTTOM",
            options: POS_OPTIONS,
            onChange: (v) =>
              this.updateTopField("cameraControl_position", v, ["cameraControlPosition", "camera_control_position"])
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Zones (${zoneEntries.length})</span>
          <button
            type="button"
            class="btn"
            @click=${() => {
              let k = "zone.home";
              let i = 1;
              while (k in zonesObj) {
                k = `zone.custom_${i++}`;
              }
              this.updateTopField("zones", { ...zonesObj, [k]: { show: true, follow: false } });
            }}
          >
            + Add Zone
          </button>
        </div>
        ${zoneEntries.length === 0
          ? html`<div class="empty">No zone overrides configured.</div>`
          : html`
              <div class="list">
                ${zoneEntries.map(
                  ([zKey, zVal]) => html`
                    <div class="kv-row">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        .value=${zKey}
                        @change=${(e: Event) => {
                          const nk = (e.target as HTMLInputElement).value.trim();
                          this.updateTopField("zones", recordRenameKey(zonesObj, zKey, nk));
                        }}
                      />
                      <div class="row-meta">
                        ${renderCheckboxField({
                          label: "Show",
                          checked: zVal?.show !== false,
                          onChange: (c) =>
                            this.updateTopField("zones", { ...zonesObj, [zKey]: { ...(zVal || {}), show: c } })
                        })}
                        ${renderCheckboxField({
                          label: "Follow",
                          checked: Boolean(zVal?.follow),
                          onChange: (c) =>
                            this.updateTopField("zones", { ...zonesObj, [zKey]: { ...(zVal || {}), follow: c } })
                        })}
                      </div>
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete zone"
                        @click=${() => {
                          const nextZ = recordDeleteKey(zonesObj, zKey);
                          this.updateTopField("zones", Object.keys(nextZ).length ? nextZ : undefined);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  `
                )}
              </div>
            `}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Route Labels</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${renderCheckboxField({
              label: "Show route labels on map",
              checked: rl.enabled !== false,
              onChange: (c) => this.updateNestedSection("route_labels", "enabled", c)
            })}
          </div>
          ${renderNumberField({
            label: "Spacing (meters)",
            value: rl.spacing,
            min: 50,
            max: 100000,
            placeholder: "e.g. 1500",
            onChange: (v) => this.updateNestedSection("route_labels", "spacing", v)
          })}
          ${renderNumberField({
            label: "Min Zoom for Labels",
            value: rl.min_zoom,
            min: 0,
            max: 24,
            onChange: (v) => this.updateNestedSection("route_labels", "min_zoom", v)
          })}
          ${renderNumberField({
            label: "Label Size (px height)",
            value: rl.size,
            min: 10,
            max: 120,
            placeholder: "22",
            onChange: (v) => this.updateNestedSection("route_labels", "size", v)
          })}
          ${renderSelectField({
            label: "Label Shape",
            value: rl.shape ?? "",
            options: LABEL_SHAPE_OPTIONS,
            onChange: (v) => this.updateNestedSection("route_labels", "shape", v)
          })}
          ${renderColorField({
            label: "Background Color",
            value: rl.color ?? rl.background_color,
            onChange: (v) => this.updateNestedSection("route_labels", "color", v, ["background_color"])
          })}
          ${renderColorField({
            label: "Text Color",
            value: rl.text_color,
            placeholder: "#ffffff",
            onChange: (v) => this.updateNestedSection("route_labels", "text_color", v)
          })}
          ${renderColorField({
            label: "Border Color",
            value: rl.border_color,
            placeholder: "#ffffff",
            onChange: (v) => this.updateNestedSection("route_labels", "border_color", v)
          })}
          ${renderNumberField({
            label: "Border Width (px)",
            value: rl.border_width,
            min: 0,
            max: 32,
            onChange: (v) => this.updateNestedSection("route_labels", "border_width", v)
          })}
          ${renderNumberField({
            label: "Border Radius (px)",
            value: rl.border_radius,
            min: 0,
            max: 128,
            onChange: (v) => this.updateNestedSection("route_labels", "border_radius", v)
          })}
          ${renderNumberField({
            label: "Padding (px)",
            value: rl.padding,
            min: 0,
            max: 64,
            onChange: (v) => this.updateNestedSection("route_labels", "padding", v)
          })}
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ *
   * TAB 2: ENTITIES (Master + Recursive Detail)
   * ------------------------------------------------------------------ */

  private getEntitiesArray(): any[] {
    return Array.isArray(this._config.entities) ? this._config.entities : [];
  }

  private updateEntityAt(index: number, nextEntity: Record<string, any>) {
    this.updateTopField("entities", arrayUpdate(this.getEntitiesArray(), index, nextEntity));
  }

  private renderEntitiesMaster(): TemplateResult {
    const rawExcludeStates = this._config.exclude_states ?? this._config.excludeStates;
    const isExcludeDisabled = rawExcludeStates === false;
    const excludeStatesStr = Array.isArray(rawExcludeStates)
      ? rawExcludeStates.join(", ")
      : typeof rawExcludeStates === "string"
        ? rawExcludeStates
        : isExcludeDisabled
          ? ""
          : "unavailable";
    const excludes: any[] = Array.isArray(this._config.exclude) ? this._config.exclude : [];
    const entities = this.getEntitiesArray();

    return html`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Global Entity Exclusions</span>
          <button
            type="button"
            class="btn"
            @click=${() => this.updateTopField("exclude", arrayAdd(excludes, { entity_id: "", state: "", name: "" }))}
          >
            + Add Exclusion Rule
          </button>
        </div>
        <div class="grid">
          <div class="checks">
            ${renderCheckboxField({
              label: "Disable state exclusions (show unavailable/unknown)",
              checked: isExcludeDisabled,
              onChange: (disabled) => {
                this.updateTopField("exclude_states", disabled ? false : ["unavailable"], ["excludeStates"]);
              }
            })}
          </div>
          ${!isExcludeDisabled
            ? renderTextField({
                label: "Excluded States (comma-separated)",
                value: excludeStatesStr,
                placeholder: "unavailable, unknown",
                fullWidth: true,
                onChange: (val) => {
                  const arr = val
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  this.updateTopField("exclude_states", arr.length ? arr : undefined, ["excludeStates"]);
                }
              })
            : nothing}
        </div>
        ${excludes.length > 0
          ? html`
              <div class="list" style="margin-top: 8px;">
                ${excludes.map(
                  (rule, idx) => html`
                    <div class="kv-row-4">
                      <input
                        type="text"
                        list="ha-gmap-entities"
                        placeholder="entity_id / glob / /regex/"
                        .value=${rule?.entity_id ?? rule?.entity ?? ""}
                        @change=${(e: Event) => {
                          const nextRule = cleanFieldUpdate(rule, "entity_id", (e.target as HTMLInputElement).value.trim(), ["entity"]);
                          this.updateTopField("exclude", arrayUpdate(excludes, idx, nextRule));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="state (e.g. off)"
                        .value=${rule?.state ?? ""}
                        @change=${(e: Event) => {
                          const nextRule = cleanFieldUpdate(rule, "state", (e.target as HTMLInputElement).value.trim());
                          this.updateTopField("exclude", arrayUpdate(excludes, idx, nextRule));
                        }}
                      />
                      <input
                        type="text"
                        placeholder="friendly_name filter"
                        .value=${rule?.name ?? ""}
                        @change=${(e: Event) => {
                          const nextRule = cleanFieldUpdate(rule, "name", (e.target as HTMLInputElement).value.trim());
                          this.updateTopField("exclude", arrayUpdate(excludes, idx, nextRule));
                        }}
                      />
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Remove rule"
                        @click=${() => {
                          const nextArr = arrayRemove(excludes, idx);
                          this.updateTopField("exclude", nextArr.length ? nextArr : undefined);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  `
                )}
              </div>
            `
          : nothing}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Entity Sets (${entities.length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${() => {
              const nextArr = arrayAdd(entities, { entity_id: "" });
              this.updateTopField("entities", nextArr);
              this._popupCardError = null;
              this._subView = { kind: "entity", index: nextArr.length - 1 };
            }}
          >
            + Add Entity Set
          </button>
        </div>
        ${entities.length === 0
          ? html`<div class="empty">No entity sets configured yet.</div>`
          : html`
              <div class="list">
                ${entities.map((rawEnt, idx) => {
                  const ent = normalizeEntityForEditor(rawEnt);
                  const title = ent.name ? `${ent.entity_id || "(unset)"} (${ent.name})` : ent.entity_id || "(empty entity)";
                  return html`
                    <div class="list-row">
                      <div
                        class="row-main"
                        @click=${() => {
                          this._popupCardError = null;
                          this._subView = { kind: "entity", index: idx };
                        }}
                      >
                        <span class="pill">#${idx + 1}</span>
                        <div class="row-text">
                          <span class="row-title">${title}</span>
                          <div class="row-meta">
                            ${ent.filter_group ? html`<span class="pill">${ent.filter_group}</span>` : nothing}
                            ${ent.name_filter ? html`<span class="pill">filter: ${ent.name_filter}</span>` : nothing}
                            ${ent.marker_type || ent.picture_shape ? html`<span class="pill">${ent.marker_type || ent.picture_shape}</span>` : nothing}
                            ${ent.location_entity ? html`<span class="pill">loc: ${ent.location_entity}</span>` : nothing}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move up"
                          ?disabled=${idx === 0}
                          @click=${() => this.updateTopField("entities", arrayMove(entities, idx, idx - 1))}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move down"
                          ?disabled=${idx === entities.length - 1}
                          @click=${() => this.updateTopField("entities", arrayMove(entities, idx, idx + 1))}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Duplicate"
                          @click=${() => this.updateTopField("entities", arrayDuplicate(entities, idx))}
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${() => {
                            this._popupCardError = null;
                            this._subView = { kind: "entity", index: idx };
                          }}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${() => this.updateTopField("entities", arrayRemove(entities, idx))}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}
      </div>
    `;
  }

  private renderEntityDetail(index: number): TemplateResult {
    const entities = this.getEntitiesArray();
    if (index < 0 || index >= entities.length) {
      this._subView = null;
      return this.renderEntitiesMaster();
    }
    const ent = normalizeEntityForEditor(entities[index]);
    const patch = (key: string, val: any, aliases?: string[]) => {
      this.updateEntityAt(index, cleanFieldUpdate(ent, key, val, aliases));
    };

    const seedKey = `entity:${index}`;
    if (this._yamlSeedKey !== seedKey) {
      this._yamlSeedKey = seedKey;
      this._yamlSeedValue = ent.popup_card;
    }

    return html`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${() => (this._subView = null)}>← Back to Entities</button>
          <span class="subview-title">Entity #${index + 1}: ${ent.entity_id || "(unset)"}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${() => {
            this.updateTopField("entities", arrayRemove(entities, index));
            this._subView = null;
          }}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Matching & Identity</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Entity ID / Glob / /Regex/",
            value: ent.entity_id,
            placeholder: "zone.home or /^sensor\\.(.+)_regular_gas$/",
            listId: "ha-gmap-entities",
            fullWidth: true,
            onChange: (v) => patch("entity_id", v, ["entity", "entityId"])
          })}
          ${renderTextField({
            label: "Friendly Name Filter (glob or /regex/)",
            value: ent.name_filter ?? ent.nameFilter,
            placeholder: "*Platform* or /^(?!.*Platform).*$/",
            onChange: (v) => patch("name_filter", v, ["nameFilter"])
          })}
          ${renderTextField({
            label: "Display Name Override",
            value: ent.name,
            onChange: (v) => patch("name", v)
          })}
          ${renderTextField({
            label: "Filter Group ID",
            value: ent.filter_group ?? ent.filterGroup ?? ent.group,
            listId: "ha-gmap-filter-groups",
            onChange: (v) => patch("filter_group", v, ["filterGroup", "group"])
          })}
          ${renderSelectField({
            label: "Transit Type",
            value: ent.transit_type ?? ent.transitType ?? "",
            options: TRANSIT_TYPE_OPTIONS,
            onChange: (v) => patch("transit_type", v, ["transitType"])
          })}
          ${renderNumberField({
            label: "Min Zoom",
            value: ent.min_zoom ?? ent.minZoom,
            min: 0,
            max: 24,
            onChange: (v) => patch("min_zoom", v, ["minZoom"])
          })}
          ${renderTriBoolField({
            label: "Show Name",
            value: ent.show_name ?? ent.showName,
            onChange: (v) => patch("show_name", v, ["showName"])
          })}
          ${renderTriBoolField({
            label: "Show Icon",
            value: ent.show_icon ?? ent.showIcon,
            onChange: (v) => patch("show_icon", v, ["showIcon"])
          })}
          ${renderTriBoolField({
            label: "Follow Entity on Updates",
            value: ent.follow,
            onChange: (v) => patch("follow", v)
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Linked Entities (Supports $1 / $2 Captures)</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Location Entity (Coordinates)",
            value: ent.location_entity ?? ent.locationEntity,
            placeholder: "sensor.$1_station_name",
            listId: "ha-gmap-entities",
            onChange: (v) => patch("location_entity", v, ["locationEntity"])
          })}
          ${renderTextField({
            label: "Status Entity (Display State)",
            value: ent.status_entity ?? ent.statusEntity,
            listId: "ha-gmap-entities",
            onChange: (v) => patch("status_entity", v, ["statusEntity"])
          })}
          ${renderTextField({
            label: "Picture Entity (Image / Brand)",
            value: ent.picture_entity ?? ent.pictureEntity ?? ent.image_entity,
            listId: "ha-gmap-entities",
            fullWidth: true,
            onChange: (v) => patch("picture_entity", v, ["pictureEntity", "image_entity", "imageEntity"])
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Marker, Icon & Picture Styling</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Icon (mdi:... or cli:...)",
            value: ent.icon,
            placeholder: "mdi:bus or cli:translink-canada",
            onChange: (v) => patch("icon", v)
          })}
          ${renderTextField({
            label: "Picture URL Override",
            value: ent.picture,
            placeholder: "/local/luxe.svg",
            onChange: (v) => patch("picture", v)
          })}
          ${renderTextField({
            label: "Picture Attribute Dot-Path",
            value: ent.picture_attribute ?? ent.pictureAttribute,
            placeholder: "deals.0.image_url",
            onChange: (v) => patch("picture_attribute", v, ["pictureAttribute"])
          })}
          ${renderSelectField({
            label: "Marker Shape (marker_type)",
            value: ent.marker_type ?? ent.markerType ?? ent.shape ?? "",
            options: MARKER_SHAPE_OPTIONS,
            onChange: (v) => patch("marker_type", v, ["markerType", "shape"])
          })}
          ${renderSelectField({
            label: "Picture Aspect (picture_shape)",
            value: ent.picture_shape ?? ent.pictureShape ?? ent.picture_aspect ?? "",
            options: PICTURE_SHAPE_OPTIONS,
            onChange: (v) => patch("picture_shape", v, ["pictureShape", "picture_aspect", "pictureAspect"])
          })}
          ${renderNumberField({
            label: "Icon / Marker Size (px)",
            value: ent.icon_size ?? ent.iconSize,
            min: 1,
            max: 512,
            onChange: (v) => patch("icon_size", v, ["iconSize"])
          })}
          ${renderColorField({
            label: "Background Color",
            value: ent.background_color ?? ent.backgroundColor ?? ent.card_background,
            placeholder: "#ffffff",
            onChange: (v) => patch("background_color", v, ["backgroundColor", "card_background"])
          })}
          ${renderColorField({
            label: "Border Color",
            value: ent.border_color ?? ent.borderColor,
            placeholder: "#ffffff",
            onChange: (v) => patch("border_color", v, ["borderColor"])
          })}
          ${renderNumberField({
            label: "Border Width (px)",
            value: ent.border_width ?? ent.borderWidth ?? ent.picture_border_width,
            min: 0,
            max: 64,
            onChange: (v) => patch("border_width", v, ["borderWidth", "picture_border_width", "pictureBorderWidth"])
          })}
          ${renderNumberField({
            label: "Border Radius (px)",
            value: ent.border_radius ?? ent.picture_border_radius ?? ent.pictureBorderRadius,
            min: 0,
            max: 256,
            onChange: (v) => patch("border_radius", v, ["borderRadius", "picture_border_radius", "pictureBorderRadius"])
          })}
          ${renderNumberField({
            label: "Padding (px)",
            value: ent.padding ?? ent.picture_padding ?? ent.picturePadding,
            min: 0,
            max: 128,
            onChange: (v) => patch("padding", v, ["picture_padding", "picturePadding"])
          })}
          ${renderNumberField({
            label: "Picture Height (px, auto/rect)",
            value: ent.picture_height ?? ent.pictureHeight,
            min: 1,
            max: 512,
            onChange: (v) => patch("picture_height", v, ["pictureHeight"])
          })}
          ${renderNumberField({
            label: "Picture Max Width (px)",
            value: ent.picture_max_width ?? ent.pictureMaxWidth,
            min: 1,
            max: 1024,
            onChange: (v) => patch("picture_max_width", v, ["pictureMaxWidth"])
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Popup Contents (YAML / Template)</span>
        </div>
        <div class="grid">
          ${renderNumberField({
            label: "Popup Max Width (px)",
            value: ent.popup_max_width ?? ent.popupMaxWidth,
            min: 80,
            max: 1200,
            placeholder: "400",
            onChange: (v) => patch("popup_max_width", v, ["popupMaxWidth"])
          })}
          ${renderTextareaField({
            label: "Popup Template (Jinja2 / HTML)",
            value: ent.popup_template ?? ent.popupTemplate,
            placeholder: "<div>{{ state }}</div>",
            rows: 5,
            onChange: (v) => patch("popup_template", v, ["popupTemplate"])
          })}
          <div class="field full">
            <label>Popup Card Config (${this._yamlEditorReady ? "YAML" : "JSON"})</label>
            ${this._yamlEditorReady
              ? html`
                  <ha-yaml-editor
                    .hass=${this.hass}
                    .defaultValue=${this._yamlSeedValue ?? ""}
                    @value-changed=${(ev: CustomEvent) => {
                      ev.stopPropagation();
                      if (!ev.detail?.isValid) return;
                      const val = ev.detail.value;
                      const isEmpty = !val || (typeof val === "object" && !Array.isArray(val) && Object.keys(val).length === 0);
                      patch("popup_card", isEmpty ? undefined : val, ["popupCard"]);
                    }}
                  ></ha-yaml-editor>
                `
              : html`
                  <textarea
                    class="code-box"
                    rows="5"
                    placeholder='{"type": "custom:mini-graph-card", "entities": ["this.entity_id"]}'
                    .value=${ent.popup_card ? JSON.stringify(ent.popup_card, null, 2) : ""}
                    @change=${(e: Event) => {
                      const res = parsePopupCardInput((e.target as HTMLTextAreaElement).value);
                      if (!res.ok) {
                        this._popupCardError = res.error;
                        return;
                      }
                      this._popupCardError = null;
                      patch("popup_card", res.value, ["popupCard"]);
                    }}
                  ></textarea>
                  ${this._popupCardError ? html`<div class="error-text">${this._popupCardError}</div>` : nothing}
                `}
          </div>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ *
   * TAB 3: GEOJSON LAYERS (Master + Recursive Detail)
   * ------------------------------------------------------------------ */

  private getGeoLayersArray(): any[] {
    return Array.isArray(this._config.geojson_layers) ? this._config.geojson_layers : [];
  }

  private updateGeoLayerAt(index: number, nextLayer: Record<string, any>) {
    this.updateTopField("geojson_layers", arrayUpdate(this.getGeoLayersArray(), index, nextLayer));
  }

  private renderGeoJsonMaster(): TemplateResult {
    const layers = this.getGeoLayersArray();
    return html`
      <div class="section">
        <div class="section-header">
          <span class="section-title">GeoJSON Layers (${layers.length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${() => {
              const nextArr = arrayAdd(layers, {
                url: "",
                stroke_color: "#007aff",
                stroke_width: 3,
                show_popup: true,
                filter_group: "routes"
              });
              this.updateTopField("geojson_layers", nextArr);
              this._subView = { kind: "geojson", index: nextArr.length - 1 };
            }}
          >
            + Add GeoJSON Layer
          </button>
        </div>
        ${layers.length === 0
          ? html`<div class="empty">No GeoJSON layers configured yet.</div>`
          : html`
              <div class="list">
                ${layers.map((layer, idx) => {
                  const title = layer?.name || layer?.label || layer?.url || `Layer #${idx + 1}`;
                  const dotColor = layer?.stroke_color || layer?.color || "#007aff";
                  return html`
                    <div class="list-row">
                      <div class="row-main" @click=${() => (this._subView = { kind: "geojson", index: idx })}>
                        <span class="color-dot" style="background:${dotColor};"></span>
                        <div class="row-text">
                          <span class="row-title">${title}</span>
                          <div class="row-meta">
                            ${layer?.filter_group ? html`<span class="pill">${layer.filter_group}</span>` : nothing}
                            ${layer?.point_shape ? html`<span class="pill">${layer.point_shape}</span>` : nothing}
                            ${layer?.label_spacing ? html`<span class="pill">${layer.label_spacing}m labels</span>` : nothing}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move up"
                          ?disabled=${idx === 0}
                          @click=${() => this.updateTopField("geojson_layers", arrayMove(layers, idx, idx - 1))}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Move down"
                          ?disabled=${idx === layers.length - 1}
                          @click=${() => this.updateTopField("geojson_layers", arrayMove(layers, idx, idx + 1))}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Duplicate"
                          @click=${() => this.updateTopField("geojson_layers", arrayDuplicate(layers, idx))}
                        >
                          ⧉
                        </button>
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${() => (this._subView = { kind: "geojson", index: idx })}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${() => this.updateTopField("geojson_layers", arrayRemove(layers, idx))}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}
      </div>
    `;
  }

  private renderGeoJsonDetail(index: number): TemplateResult {
    const layers = this.getGeoLayersArray();
    if (index < 0 || index >= layers.length) {
      this._subView = null;
      return this.renderGeoJsonMaster();
    }
    const g = layers[index] || {};
    const patch = (key: string, val: any, aliases?: string[]) => {
      this.updateGeoLayerAt(index, cleanFieldUpdate(g, key, val, aliases));
    };

    return html`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${() => (this._subView = null)}>← Back to GeoJSON</button>
          <span class="subview-title">${g.name || g.label || g.url || `Layer #${index + 1}`}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${() => {
            this.updateTopField("geojson_layers", arrayRemove(layers, index));
            this._subView = null;
          }}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Source & Polyline / Polygon Styling</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "GeoJSON URL",
            value: g.url,
            placeholder: "/local/gtfs2/route_430.geojson",
            fullWidth: true,
            onChange: (v) => patch("url", v)
          })}
          ${renderTextField({
            label: "Name",
            value: g.name,
            onChange: (v) => patch("name", v)
          })}
          ${renderTextField({
            label: "Badge Label",
            value: g.label,
            onChange: (v) => patch("label", v)
          })}
          ${renderTextField({
            label: "Route Key (links to transit_schedule)",
            value: g.route_key ?? g.routeKey ?? g.route_id,
            onChange: (v) => patch("route_key", v, ["routeKey", "route_id"])
          })}
          ${renderTextField({
            label: "Filter Group ID",
            value: g.filter_group ?? g.filterGroup ?? g.group,
            listId: "ha-gmap-filter-groups",
            onChange: (v) => patch("filter_group", v, ["filterGroup", "group"])
          })}
          ${renderColorField({
            label: "Stroke Color",
            value: g.stroke_color ?? g.strokeColor ?? g.color,
            placeholder: "#007aff",
            onChange: (v) => patch("stroke_color", v, ["strokeColor", "color"])
          })}
          ${renderNumberField({
            label: "Stroke Width (px)",
            value: g.stroke_width ?? g.strokeWidth ?? g.width,
            min: 0,
            max: 64,
            placeholder: "3",
            onChange: (v) => patch("stroke_width", v, ["strokeWidth", "width"])
          })}
          ${renderColorField({
            label: "Polygon Fill Color",
            value: g.fill_color ?? g.fillColor,
            onChange: (v) => patch("fill_color", v, ["fillColor"])
          })}
          ${renderNumberField({
            label: "Fill Opacity (0–1)",
            value: g.fill_opacity ?? g.fillOpacity,
            min: 0,
            max: 1,
            step: 0.05,
            placeholder: "0.25",
            onChange: (v) => patch("fill_opacity", v, ["fillOpacity"])
          })}
          <div class="checks">
            ${renderCheckboxField({
              label: "Show popup when clicking features",
              checked: (g.show_popup ?? g.showPopup) !== false,
              onChange: (c) => patch("show_popup", c, ["showPopup"])
            })}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Point / Station / Stop Markers</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Icon (mdi:... or cli:...)",
            value: g.icon,
            placeholder: "cli:translink-logo",
            onChange: (v) => patch("icon", v)
          })}
          ${renderTextField({
            label: "Image URL",
            value: g.image ?? g.picture,
            onChange: (v) => patch("image", v, ["picture"])
          })}
          ${renderSelectField({
            label: "Point Shape",
            value: g.point_shape ?? g.pointShape ?? g.marker_type ?? g.shape ?? "",
            options: MARKER_SHAPE_OPTIONS,
            onChange: (v) => patch("point_shape", v, ["pointShape", "marker_type", "markerType", "shape"])
          })}
          ${renderNumberField({
            label: "Point / Icon Size (px)",
            value: g.point_size ?? g.pointSize ?? g.icon_size ?? g.size,
            min: 1,
            max: 512,
            onChange: (v) => patch("point_size", v, ["pointSize", "icon_size", "iconSize", "size"])
          })}
          ${renderNumberField({
            label: "Station Size Override (px)",
            value: g.station_size ?? g.station_icon_size,
            min: 1,
            max: 512,
            placeholder: "18",
            onChange: (v) => patch("station_size", v, ["station_icon_size"])
          })}
          ${renderNumberField({
            label: "Stop Size Override (px)",
            value: g.stop_size ?? g.stop_icon_size,
            min: 1,
            max: 512,
            placeholder: "14",
            onChange: (v) => patch("stop_size", v, ["stop_icon_size"])
          })}
          ${renderTextField({
            label: "Legacy Station Icon",
            value: g.station_icon ?? g.stationIcon,
            onChange: (v) => patch("station_icon", v, ["stationIcon"])
          })}
          ${renderTextField({
            label: "Legacy Stop Icon",
            value: g.stop_icon ?? g.stopIcon,
            onChange: (v) => patch("stop_icon", v, ["stopIcon"])
          })}
          ${renderColorField({
            label: "Background Color",
            value: g.background_color ?? g.backgroundColor ?? g.point_color ?? g.pointColor,
            placeholder: "#ffffff",
            onChange: (v) => patch("background_color", v, ["backgroundColor", "point_color", "pointColor"])
          })}
          ${renderColorField({
            label: "Border Color",
            value: g.border_color ?? g.borderColor,
            placeholder: "#ffffff",
            onChange: (v) => patch("border_color", v, ["borderColor"])
          })}
          ${renderNumberField({
            label: "Border Width (px)",
            value: g.border_width ?? g.borderWidth,
            min: 0,
            max: 64,
            onChange: (v) => patch("border_width", v, ["borderWidth"])
          })}
          ${renderNumberField({
            label: "Border Radius (px)",
            value: g.border_radius ?? g.borderRadius ?? g.picture_border_radius,
            min: 0,
            max: 256,
            onChange: (v) => patch("border_radius", v, ["borderRadius", "picture_border_radius", "pictureBorderRadius"])
          })}
          ${renderNumberField({
            label: "Padding (px)",
            value: g.padding ?? g.picture_padding,
            min: 0,
            max: 128,
            onChange: (v) => patch("padding", v, ["picture_padding", "picturePadding"])
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Route Line Badges / Labels</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${renderCheckboxField({
              label: "Show route labels on this layer",
              checked: (g.show_labels ?? g.showLabels) !== false,
              onChange: (c) => patch("show_labels", c, ["showLabels"])
            })}
          </div>
          ${renderNumberField({
            label: "Label Spacing (meters along line)",
            value: g.label_spacing ?? g.labelSpacing,
            min: 50,
            max: 100000,
            placeholder: "e.g. 1500",
            onChange: (v) => patch("label_spacing", v, ["labelSpacing"])
          })}
          ${renderNumberField({
            label: "Label Min Zoom",
            value: g.label_min_zoom ?? g.labelMinZoom,
            min: 0,
            max: 24,
            onChange: (v) => patch("label_min_zoom", v, ["labelMinZoom"])
          })}
          ${renderNumberField({
            label: "Label Size (px height)",
            value: g.label_size ?? g.labelSize,
            min: 10,
            max: 120,
            placeholder: "22",
            onChange: (v) => patch("label_size", v, ["labelSize"])
          })}
          ${renderSelectField({
            label: "Label Shape",
            value: g.label_shape ?? g.labelShape ?? "",
            options: LABEL_SHAPE_OPTIONS,
            onChange: (v) => patch("label_shape", v, ["labelShape"])
          })}
          ${renderColorField({
            label: "Label Background Color",
            value: g.label_color ?? g.labelColor ?? g.label_background_color,
            onChange: (v) => patch("label_color", v, ["labelColor", "label_background_color"])
          })}
          ${renderColorField({
            label: "Label Text Color",
            value: g.label_text_color ?? g.labelTextColor,
            placeholder: "#ffffff",
            onChange: (v) => patch("label_text_color", v, ["labelTextColor"])
          })}
          ${renderColorField({
            label: "Label Border Color",
            value: g.label_border_color ?? g.labelBorderColor,
            placeholder: "#ffffff",
            onChange: (v) => patch("label_border_color", v, ["labelBorderColor"])
          })}
          ${renderNumberField({
            label: "Label Border Width (px)",
            value: g.label_border_width ?? g.labelBorderWidth,
            min: 0,
            max: 32,
            onChange: (v) => patch("label_border_width", v, ["labelBorderWidth"])
          })}
          ${renderNumberField({
            label: "Label Border Radius (px)",
            value: g.label_border_radius ?? g.labelBorderRadius,
            min: 0,
            max: 128,
            onChange: (v) => patch("label_border_radius", v, ["labelBorderRadius"])
          })}
          ${renderNumberField({
            label: "Label Padding (px)",
            value: g.label_padding ?? g.labelPadding,
            min: 0,
            max: 64,
            onChange: (v) => patch("label_padding", v, ["labelPadding"])
          })}
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ *
   * TAB 4: TRANSIT MOTION (Master + Route Detail)
   * ------------------------------------------------------------------ */

  private getTransitConfig(): Record<string, any> {
    const raw = this._config.transit_motion ?? this._config.transitMotion;
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  }

  private renderTransitMaster(): TemplateResult {
    const tm = this.getTransitConfig();
    const vehiclesObj =
      tm.vehicles && typeof tm.vehicles === "object" && !Array.isArray(tm.vehicles) ? tm.vehicles : {};
    const routesObj = tm.routes && typeof tm.routes === "object" && !Array.isArray(tm.routes) ? tm.routes : {};
    const busMatchStr = Array.isArray(tm.bus_match ?? tm.busMatch)
      ? (tm.bus_match ?? tm.busMatch).join(", ")
      : typeof (tm.bus_match ?? tm.busMatch) === "string"
        ? tm.bus_match ?? tm.busMatch
        : "";

    return html`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Transit Animation Engine</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${renderCheckboxField({
              label: "Enable live transit animation",
              checked: this._config.transit_motion !== false && tm.enabled !== false,
              onChange: (c) => this.updateNestedSection("transit_motion", "enabled", c)
            })}
            ${renderCheckboxField({
              label: "Simulate 24/7 daytime schedule (testing)",
              checked: Boolean(tm.simulate_24_7 ?? tm.simulate247),
              onChange: (c) => this.updateNestedSection("transit_motion", "simulate_24_7", c, ["simulate247"])
            })}
          </div>
          ${renderTextField({
            label: "Schedule JSON URL",
            value: tm.schedule_url ?? tm.scheduleUrl,
            placeholder: "/local/gtfs2/transit_schedule.json",
            fullWidth: true,
            onChange: (v) => this.updateNestedSection("transit_motion", "schedule_url", v, ["scheduleUrl"])
          })}
          ${renderTextField({
            label: "Filter Group ID",
            value: tm.filter_group ?? tm.filterGroup ?? tm.group,
            placeholder: "vehicles",
            listId: "ha-gmap-filter-groups",
            onChange: (v) => this.updateNestedSection("transit_motion", "filter_group", v, ["filterGroup", "group"])
          })}
          ${renderNumberField({
            label: "Animation FPS (5–60)",
            value: tm.fps ?? 30,
            min: 5,
            max: 60,
            step: 1,
            onChange: (v) => this.updateNestedSection("transit_motion", "fps", v)
          })}
          ${renderNumberField({
            label: "Train Min Zoom",
            value: tm.min_zoom ?? tm.minZoom ?? 13,
            min: 0,
            max: 24,
            onChange: (v) => this.updateNestedSection("transit_motion", "min_zoom", v, ["minZoom"])
          })}
          ${renderNumberField({
            label: "Bus Min Zoom",
            value: tm.bus_min_zoom ?? tm.busMinZoom,
            min: 0,
            max: 24,
            placeholder: "optional",
            onChange: (v) => this.updateNestedSection("transit_motion", "bus_min_zoom", v, ["busMinZoom"])
          })}
          ${renderTextField({
            label: "Bus Entity Patterns (comma-separated)",
            value: busMatchStr,
            placeholder: "geo_location.*_bus",
            fullWidth: true,
            onChange: (val) => {
              const arr = val
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              this.updateNestedSection("transit_motion", "bus_match", arr.length ? arr : undefined, ["busMatch"]);
            }
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Vehicle Badge & Direction</span>
        </div>
        <div class="grid">
          ${renderSelectField({
            label: "Default Shape",
            value: tm.shape ?? tm.vehicle_shape ?? tm.vehicleShape ?? tm.marker_type ?? "",
            options: MARKER_SHAPE_OPTIONS,
            onChange: (v) =>
              this.updateNestedSection("transit_motion", "shape", v, ["vehicle_shape", "vehicleShape", "marker_type", "markerType"])
          })}
          <div class="checks">
            ${renderCheckboxField({
              label: "Rotate icon/triangle with direction of travel",
              checked: Boolean(tm.directional),
              onChange: (c) => this.updateNestedSection("transit_motion", "directional", c)
            })}
          </div>
          ${renderColorField({
            label: "Background Color",
            value: tm.background_color ?? tm.vehicle_background_color,
            onChange: (v) =>
              this.updateNestedSection("transit_motion", "background_color", v, ["vehicle_background_color", "vehicleBackgroundColor"])
          })}
          ${renderColorField({
            label: "Border Color",
            value: tm.border_color ?? tm.vehicle_border_color,
            placeholder: "#ffffff",
            onChange: (v) =>
              this.updateNestedSection("transit_motion", "border_color", v, ["vehicle_border_color", "vehicleBorderColor"])
          })}
          ${renderNumberField({
            label: "Border Width (px)",
            value: tm.border_width ?? tm.vehicle_border_width,
            min: 0,
            max: 32,
            onChange: (v) =>
              this.updateNestedSection("transit_motion", "border_width", v, ["vehicle_border_width", "vehicleBorderWidth"])
          })}
          ${renderNumberField({
            label: "Border Radius (px)",
            value: tm.border_radius ?? tm.vehicle_border_radius,
            min: 0,
            max: 128,
            onChange: (v) =>
              this.updateNestedSection("transit_motion", "border_radius", v, ["vehicle_border_radius", "vehicleBorderRadius"])
          })}
          ${renderNumberField({
            label: "Padding (px)",
            value: tm.padding ?? tm.vehicle_padding,
            min: 0,
            max: 64,
            onChange: (v) =>
              this.updateNestedSection("transit_motion", "padding", v, ["vehicle_padding", "vehiclePadding"])
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Default Icons by Vehicle Type</span>
          <button
            type="button"
            class="btn"
            @click=${() => {
              let key = "subway";
              let i = 1;
              while (key in vehiclesObj) {
                key = `type_${i++}`;
              }
              this.updateNestedSection("transit_motion", "vehicles", { ...vehiclesObj, [key]: "" });
            }}
          >
            + Add Vehicle Type
          </button>
        </div>
        ${Object.keys(vehiclesObj).length === 0
          ? html`<div class="empty">No vehicle-type icons configured (uses built-in defaults).</div>`
          : html`
              <div class="list">
                ${Object.entries(vehiclesObj).map(
                  ([vKey, vVal]) => html`
                    <div class="kv-row">
                      <input
                        type="text"
                        placeholder="type (bus / subway / ferry)"
                        .value=${vKey}
                        @change=${(e: Event) =>
                          this.updateNestedSection(
                            "transit_motion",
                            "vehicles",
                            recordRenameKey(vehiclesObj, vKey, (e.target as HTMLInputElement).value.trim())
                          )}
                      />
                      <input
                        type="text"
                        placeholder="cli:translink-bus or mdi:subway-variant"
                        .value=${typeof vVal === "string" ? vVal : ""}
                        @change=${(e: Event) =>
                          this.updateNestedSection("transit_motion", "vehicles", {
                            ...vehiclesObj,
                            [vKey]: (e.target as HTMLInputElement).value.trim()
                          })}
                      />
                      <button
                        type="button"
                        class="icon-btn danger"
                        title="Delete"
                        @click=${() => {
                          const nextV = recordDeleteKey(vehiclesObj, vKey);
                          this.updateNestedSection("transit_motion", "vehicles", Object.keys(nextV).length ? nextV : undefined);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  `
                )}
              </div>
            `}
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Per-Route Overrides (${Object.keys(routesObj).length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${() => {
              let key = "new_line";
              let i = 1;
              while (key in routesObj) {
                key = `line_${i++}`;
              }
              this.updateNestedSection("transit_motion", "routes", { ...routesObj, [key]: { label: key, enabled: true } });
              this._subView = { kind: "route", key };
            }}
          >
            + Add Route
          </button>
        </div>
        ${Object.keys(routesObj).length === 0
          ? html`<div class="empty">No per-route overrides configured.</div>`
          : html`
              <div class="list">
                ${Object.entries(routesObj).map(([rKey, rCfg]: [string, any]) => {
                  const color = rCfg?.color || rCfg?.background_color || "#0072CE";
                  return html`
                    <div class="list-row">
                      <div class="row-main" @click=${() => (this._subView = { kind: "route", key: rKey })}>
                        <span class="color-dot" style="background:${color};"></span>
                        <div class="row-text">
                          <span class="row-title">${rKey}${rCfg?.label ? ` · ${rCfg.label}` : ""}</span>
                          <div class="row-meta">
                            ${rCfg?.shape ? html`<span class="pill">${rCfg.shape}</span>` : nothing}
                            ${rCfg?.icon ? html`<span class="pill">${rCfg.icon}</span>` : nothing}
                            ${rCfg?.enabled === false ? html`<span class="pill">disabled</span>` : nothing}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${() => (this._subView = { kind: "route", key: rKey })}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${() => {
                            const nextR = recordDeleteKey(routesObj, rKey);
                            this.updateNestedSection("transit_motion", "routes", Object.keys(nextR).length ? nextR : undefined);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}
      </div>
    `;
  }

  private renderRouteDetail(routeKey: string): TemplateResult {
    const tm = this.getTransitConfig();
    const routesObj = tm.routes && typeof tm.routes === "object" ? tm.routes : {};
    if (!Object.prototype.hasOwnProperty.call(routesObj, routeKey)) {
      this._subView = null;
      return this.renderTransitMaster();
    }
    const r = routesObj[routeKey] || {};
    const patchRoute = (field: string, val: any, aliases?: string[]) => {
      const nextR = cleanFieldUpdate(r, field, val, aliases);
      this.updateNestedSection("transit_motion", "routes", { ...routesObj, [routeKey]: nextR });
    };

    return html`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${() => (this._subView = null)}>← Back to Transit</button>
          <span class="subview-title">Route: ${routeKey}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${() => {
            const nextR = recordDeleteKey(routesObj, routeKey);
            this.updateNestedSection("transit_motion", "routes", Object.keys(nextR).length ? nextR : undefined);
            this._subView = null;
          }}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Route Identity</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Route Key (matches schedule lineKey)",
            value: routeKey,
            onChange: (newKey) => {
              if (!newKey || newKey === routeKey || newKey in routesObj) return;
              this.updateNestedSection("transit_motion", "routes", recordRenameKey(routesObj, routeKey, newKey));
              this._subView = { kind: "route", key: newKey };
            }
          })}
          <div class="checks" style="align-self:end;">
            ${renderCheckboxField({
              label: "Enabled",
              checked: r.enabled !== false,
              onChange: (c) => patchRoute("enabled", c)
            })}
          </div>
          ${renderTextField({
            label: "Label",
            value: r.label,
            onChange: (v) => patchRoute("label", v)
          })}
          ${renderTextField({
            label: "Name",
            value: r.name,
            onChange: (v) => patchRoute("name", v)
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Vehicle Icon, Triangle & Badge Styling</span>
        </div>
        <div class="grid">
          ${renderTextField({
            label: "Icon (cli:... or mdi:...)",
            value: r.icon,
            placeholder: "cli:translink-canada",
            onChange: (v) => patchRoute("icon", v)
          })}
          ${renderTextField({
            label: "Image URL Override",
            value: r.image ?? r.picture,
            onChange: (v) => patchRoute("image", v, ["picture"])
          })}
          ${renderColorField({
            label: "Line Color",
            value: r.color ?? r.icon_color,
            placeholder: "#0097A9",
            onChange: (v) => patchRoute("color", v, ["icon_color"])
          })}
          ${renderNumberField({
            label: "Icon Size (px)",
            value: r.icon_size ?? r.iconSize ?? r.size,
            min: 4,
            max: 256,
            placeholder: "26",
            onChange: (v) => patchRoute("icon_size", v, ["iconSize", "size"])
          })}
          ${renderSelectField({
            label: "Vehicle Shape",
            value: r.shape ?? r.marker_type ?? r.markerType ?? r.point_shape ?? "",
            options: MARKER_SHAPE_OPTIONS,
            onChange: (v) => patchRoute("shape", v, ["marker_type", "markerType", "point_shape", "pointShape"])
          })}
          ${renderTriBoolField({
            label: "Directional Rotation",
            value: r.directional,
            onChange: (v) => patchRoute("directional", v)
          })}
          ${renderColorField({
            label: "Background Color",
            value: r.background_color ?? r.backgroundColor ?? r.point_color,
            placeholder: "#ffffff",
            onChange: (v) => patchRoute("background_color", v, ["backgroundColor", "point_color", "pointColor"])
          })}
          ${renderColorField({
            label: "Border Color",
            value: r.border_color ?? r.borderColor,
            placeholder: "#ffffff",
            onChange: (v) => patchRoute("border_color", v, ["borderColor"])
          })}
          ${renderNumberField({
            label: "Border Width (px)",
            value: r.border_width ?? r.borderWidth,
            min: 0,
            max: 32,
            onChange: (v) => patchRoute("border_width", v, ["borderWidth"])
          })}
          ${renderNumberField({
            label: "Border Radius (px)",
            value: r.border_radius ?? r.borderRadius,
            min: 0,
            max: 128,
            onChange: (v) => patchRoute("border_radius", v, ["borderRadius"])
          })}
          ${renderNumberField({
            label: "Padding (px)",
            value: r.padding,
            min: 0,
            max: 64,
            onChange: (v) => patchRoute("padding", v)
          })}
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------ *
   * TAB 5: FILTERS (Master + Filter Group Detail)
   * ------------------------------------------------------------------ */

  private getFilterGroupsMap(): Record<string, Record<string, any>> {
    return normalizeFilterGroupsToRecord(this._config.filter_groups ?? this._config.filterGroups);
  }

  private renderFiltersMaster(): TemplateResult {
    const lf =
      this._config.layer_filters && typeof this._config.layer_filters === "object" ? this._config.layer_filters : {};
    const groupsObj = this.getFilterGroupsMap();

    return html`
      <div class="section">
        <div class="section-header">
          <span class="section-title">Layer Filter Control</span>
        </div>
        <div class="grid">
          <div class="checks">
            ${renderCheckboxField({
              label: "Show layer filter control button on map",
              checked: this._config.layer_filters !== false && lf.enabled !== false,
              onChange: (c) => this.updateNestedSection("layer_filters", "enabled", c)
            })}
          </div>
          ${renderSelectField({
            label: "Control Position",
            value: lf.position ?? "TOP_RIGHT",
            options: POS_OPTIONS,
            onChange: (v) => this.updateNestedSection("layer_filters", "position", v)
          })}
          ${renderTextField({
            label: "Control Title",
            value: lf.title,
            onChange: (v) => this.updateNestedSection("layer_filters", "title", v)
          })}
          ${renderTextField({
            label: "Control Icon",
            value: lf.icon,
            placeholder: "mdi:layers",
            onChange: (v) => this.updateNestedSection("layer_filters", "icon", v)
          })}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <span class="section-title">Filter Groups (${Object.keys(groupsObj).length})</span>
          <button
            type="button"
            class="btn primary"
            @click=${() => {
              let key = "new_group";
              let i = 1;
              while (key in groupsObj) {
                key = `group_${i++}`;
              }
              this.updateTopField("filter_groups", { ...groupsObj, [key]: { name: key, default: true } }, ["filterGroups"]);
              this._subView = { kind: "filterGroup", key };
            }}
          >
            + Add Filter Group
          </button>
        </div>
        ${Object.keys(groupsObj).length === 0
          ? html`<div class="empty">No filter groups defined.</div>`
          : html`
              <div class="list">
                ${Object.entries(groupsObj).map(([gKey, gVal]) => {
                  const color = gVal?.color || gVal?.accent_color || "#1a73e8";
                  return html`
                    <div class="list-row">
                      <div class="row-main" @click=${() => (this._subView = { kind: "filterGroup", key: gKey })}>
                        <span class="color-dot" style="background:${color};"></span>
                        <div class="row-text">
                          <span class="row-title">${gVal?.name || gVal?.label || gKey} (${gKey})</span>
                          <div class="row-meta">
                            <span class="pill">${gVal?.default === false ? "hidden by default" : "visible by default"}</span>
                            ${gVal?.icon ? html`<span class="pill">${gVal.icon}</span>` : nothing}
                          </div>
                        </div>
                      </div>
                      <div class="row-actions">
                        <button
                          type="button"
                          class="icon-btn"
                          title="Edit"
                          @click=${() => (this._subView = { kind: "filterGroup", key: gKey })}
                        >
                          ✎
                        </button>
                        <button
                          type="button"
                          class="icon-btn danger"
                          title="Delete"
                          @click=${() => {
                            const nextG = recordDeleteKey(groupsObj, gKey);
                            this.updateTopField("filter_groups", Object.keys(nextG).length ? nextG : undefined, ["filterGroups"]);
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  `;
                })}
              </div>
            `}
      </div>
    `;
  }

  private renderFilterGroupDetail(groupKey: string): TemplateResult {
    const groupsObj = this.getFilterGroupsMap();
    if (!Object.prototype.hasOwnProperty.call(groupsObj, groupKey)) {
      this._subView = null;
      return this.renderFiltersMaster();
    }
    const g = groupsObj[groupKey] || {};
    const patchGroup = (field: string, val: any, aliases?: string[]) => {
      const nextG = cleanFieldUpdate(g, field, val, aliases);
      this.updateTopField("filter_groups", { ...groupsObj, [groupKey]: nextG }, ["filterGroups"]);
    };

    return html`
      <div class="subview-header">
        <div class="subview-left">
          <button type="button" class="btn" @click=${() => (this._subView = null)}>← Back to Filters</button>
          <span class="subview-title">Filter Group: ${groupKey}</span>
        </div>
        <button
          type="button"
          class="btn danger"
          @click=${() => {
            const nextG = recordDeleteKey(groupsObj, groupKey);
            this.updateTopField("filter_groups", Object.keys(nextG).length ? nextG : undefined, ["filterGroups"]);
            this._subView = null;
          }}
        >
          Delete
        </button>
      </div>

      <div class="section">
        <div class="grid">
          ${renderTextField({
            label: "Group ID",
            value: groupKey,
            onChange: (newKey) => {
              if (!newKey || newKey === groupKey || newKey in groupsObj) return;
              this.updateTopField("filter_groups", recordRenameKey(groupsObj, groupKey, newKey), ["filterGroups"]);
              this._subView = { kind: "filterGroup", key: newKey };
            }
          })}
          ${renderTextField({
            label: "Display Name",
            value: g.name ?? g.label,
            onChange: (v) => patchGroup("name", v, ["label"])
          })}
          ${renderTextField({
            label: "Icon (mdi:...)",
            value: g.icon,
            placeholder: "mdi:bus-clock",
            onChange: (v) => patchGroup("icon", v)
          })}
          ${renderColorField({
            label: "Accent Color",
            value: g.color ?? g.accent_color,
            onChange: (v) => patchGroup("color", v, ["accent_color"])
          })}
          ${renderSelectField({
            label: "Control Position Override",
            value: g.position ?? "",
            options: [{ value: "", label: "Inherit from layer_filters" }, ...POS_OPTIONS],
            onChange: (v) => patchGroup("position", v)
          })}
          <div class="checks">
            ${renderCheckboxField({
              label: "Enabled by default when map loads",
              checked: g.default !== false,
              onChange: (c) => patchGroup("default", c, ["checked"])
            })}
          </div>
        </div>
      </div>
    `;
  }
}
