import { html, nothing, TemplateResult } from "lit";
import { renderCheckboxField, renderSelectField, renderTextField } from "./fields";
import {
  GtfsEditorState,
  GtfsExportedRouteMeta,
  isRouteInGeoLayers,
  isRouteInTransitMotion
} from "./gtfs-helpers";

const MODE_FILTER_OPTIONS = [
  { value: "", label: "All Modes" },
  { value: "1", label: "Subway / Metro (1)" },
  { value: "3", label: "Bus (3)" },
  { value: "2", label: "Rail (2)" },
  { value: "4", label: "Ferry (4)" },
  { value: "0", label: "Tram / Light Rail (0)" }
];

export interface GtfsPanelContext {
  state: GtfsEditorState;
  config: Record<string, any>;
  hassAvailable: boolean;
  onPatchState: (patch: Partial<GtfsEditorState>) => void;
  onRefreshSources: () => void;
  onLoadRoutes: () => void;
  onSearchInput: (query: string) => void;
  onExport: () => void;
  onSetScheduleUrl: (url: string) => void;
  onWireRoute: (lineKey: string, meta: GtfsExportedRouteMeta, opts: { addGeoJson?: boolean; addAnimation?: boolean }) => void;
}

function formatBytesMb(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function renderGtfsTab(ctx: GtfsPanelContext): TemplateResult {
  const { state, config, hassAvailable } = ctx;
  const sourceOptions = [
    { value: "", label: state.loadingSources ? "Scanning config/gtfs2..." : "Select feed or enter path/URL below" },
    ...state.sources.map((s) => ({
      value: s.path,
      label: `${s.path} (${formatBytesMb(s.size_bytes)})`
    }))
  ];

  const selectedSet = new Set(state.selectedRouteIds);
  const queryLow = state.query.trim().toLowerCase();
  const visibleRoutes = state.routes.filter((r) => {
    if (state.routeTypeFilter && r.route_type !== state.routeTypeFilter) return false;
    if (!queryLow) return true;
    return `${r.id} ${r.short_name} ${r.long_name} ${r.label}`.toLowerCase().includes(queryLow);
  });

  const canExport =
    !state.exporting &&
    Boolean(state.source.trim()) &&
    (state.selectedRouteIds.length > 0 || Boolean(state.routeTypeFilter));
  const exportBtnLabel = state.exporting
    ? "Exporting GTFS..."
    : state.selectedRouteIds.length > 0
      ? `Export Selected (${state.selectedRouteIds.length})`
      : state.routeTypeFilter
        ? `Export Filtered Mode`
        : "Select Routes or Mode to Export";

  const activeScheduleUrl = state.lastExport?.schedule_url || state.existingScheduleUrl || "";
  const curCardSchedule = config?.transit_motion?.schedule_url ?? config?.transitMotion?.scheduleUrl ?? "";
  const mergedExportRoutes: Record<string, GtfsExportedRouteMeta> = {
    ...state.existingRoutes,
    ...(state.lastExport?.routes || {})
  };
  const routeEntries = Object.entries(mergedExportRoutes);

  return html`
    ${!hassAvailable
      ? html`<div class="warn-banner">Home Assistant WebSocket connection is unavailable in this editor preview.</div>`
      : nothing}
    ${state.backendMissing
      ? html`
          <div class="warn-banner">
            <b>ha_gmap</b> backend integration WebSocket is not active yet. Ensure <code>ha_gmap:</code> is enabled in
            <code>configuration.yaml</code> and restart Home Assistant to enable live GTFS route browsing and export.
          </div>
        `
      : nothing}
    ${state.error ? html`<div class="warn-banner">${state.error}</div>` : nothing}

    <div class="section">
      <div class="section-header">
        <span class="section-title">1. GTFS Feed Source &amp; Export Target</span>
        <div class="row-actions">
          <button type="button" class="btn" ?disabled=${state.loadingSources} @click=${ctx.onRefreshSources}>
            ${state.loadingSources ? "Scanning..." : "Refresh Sources"}
          </button>
          <button
            type="button"
            class="btn primary"
            ?disabled=${state.loadingRoutes || !state.source.trim()}
            @click=${ctx.onLoadRoutes}
          >
            ${state.loadingRoutes ? "Loading..." : "Load Routes"}
          </button>
        </div>
      </div>

      <div class="grid">
        ${renderSelectField({
          label: "Discovered Local GTFS Feeds",
          value: state.sources.some((s) => s.path === state.source) ? state.source : "",
          options: sourceOptions,
          fullWidth: true,
          onChange: (val) => {
            if (val) {
              ctx.onPatchState({ source: val, selectedRouteIds: [], error: null });
              setTimeout(() => ctx.onLoadRoutes(), 0);
            }
          }
        })}
        ${renderTextField({
          label: "GTFS Source Path or Remote .zip URL",
          value: state.source,
          placeholder: "gtfs2/Translink.zip or https://...",
          fullWidth: true,
          onChange: (val) => ctx.onPatchState({ source: val, error: null })
        })}
        ${renderTextField({
          label: "Output Folder under www/",
          value: state.outputDir,
          placeholder: "gtfs2",
          onChange: (val) => ctx.onPatchState({ outputDir: val || "gtfs2" })
        })}
        <div class="checks" style="align-self: end; padding-bottom: 6px;">
          ${renderCheckboxField({
            label: "Merge into existing transit_schedule.json (keep SkyTrain / existing routes)",
            checked: state.mergeExisting,
            onChange: (checked) => ctx.onPatchState({ mergeExisting: checked })
          })}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">
          2. Browse &amp; Select Routes
          ${state.routesLoaded ? `(${visibleRoutes.length} shown / ${state.totalRoutes} matched)` : ""}
        </span>
        <div class="row-actions">
          <button
            type="button"
            class="btn"
            ?disabled=${visibleRoutes.length === 0}
            @click=${() => {
              const merged = new Set(state.selectedRouteIds);
              for (const r of visibleRoutes) merged.add(r.id);
              ctx.onPatchState({ selectedRouteIds: Array.from(merged) });
            }}
          >
            Select Visible
          </button>
          <button
            type="button"
            class="btn"
            ?disabled=${state.selectedRouteIds.length === 0}
            @click=${() => ctx.onPatchState({ selectedRouteIds: [] })}
          >
            Clear (${state.selectedRouteIds.length})
          </button>
          <button type="button" class="btn primary" ?disabled=${!canExport} @click=${ctx.onExport}>
            ${exportBtnLabel}
          </button>
        </div>
      </div>

      <div class="grid" style="margin-bottom: 10px;">
        <div class="field">
          <label>Search Route Number or Name</label>
          <input
            type="text"
            .value=${state.query}
            placeholder="e.g. 99, Broadway, Canada Line, R4..."
            @input=${(e: Event) => ctx.onSearchInput((e.target as HTMLInputElement).value)}
          />
        </div>
        ${renderSelectField({
          label: "Filter by Transit Mode",
          value: state.routeTypeFilter,
          options: MODE_FILTER_OPTIONS,
          onChange: (val) => {
            ctx.onPatchState({ routeTypeFilter: val });
            if (state.source.trim()) ctx.onLoadRoutes();
          }
        })}
      </div>

      ${!state.routesLoaded
        ? html`<div class="empty">Click <b>Load Routes</b> above to inspect routes in the selected GTFS feed.</div>`
        : visibleRoutes.length === 0
          ? html`<div class="empty">No routes match the current search/mode filter.</div>`
          : html`
              <div class="gtfs-route-list">
                ${visibleRoutes.map((r) => {
                  const checked = selectedSet.has(r.id);
                  return html`
                    <label class="list-row" style="cursor: pointer;">
                      <div class="row-main">
                        <input
                          type="checkbox"
                          .checked=${checked}
                          @change=${(e: Event) => {
                            const isChk = (e.target as HTMLInputElement).checked;
                            const nextIds = isChk
                              ? Array.from(new Set([...state.selectedRouteIds, r.id]))
                              : state.selectedRouteIds.filter((id) => id !== r.id);
                            ctx.onPatchState({ selectedRouteIds: nextIds });
                          }}
                        />
                        <span class="color-dot" style="background:${r.color || "#1E88E5"};"></span>
                        <div class="row-text">
                          <span class="row-title">${r.label}</span>
                          <div class="row-meta">
                            <span class="pill">${r.mode} (${r.route_type || "?"})</span>
                            <span class="pill">id: ${r.id}</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  `;
                })}
              </div>
            `}
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">3. Exported Routes &rarr; Wire Into Map Card (${routeEntries.length})</span>
        ${activeScheduleUrl && curCardSchedule !== activeScheduleUrl
          ? html`
              <button type="button" class="btn primary" @click=${() => ctx.onSetScheduleUrl(activeScheduleUrl)}>
                Set Card schedule_url
              </button>
            `
          : nothing}
      </div>

      ${state.lastExport
        ? html`
            <div class="info-banner">
              Exported <b>${state.lastExport.routes_exported}</b> route(s), <b>${state.lastExport.trips_count}</b> trips,
              <b>${state.lastExport.profiles_count}</b> total profiles to <code>${state.lastExport.schedule_url}</code>.
              ${state.lastExport.warnings?.length
                ? html`<div style="margin-top:4px;">Warnings: ${state.lastExport.warnings.join("; ")}</div>`
                : nothing}
            </div>
          `
        : nothing}

      ${routeEntries.length === 0
        ? html`<div class="empty">No exported routes found yet under <code>/local/${state.outputDir}</code>.</div>`
        : html`
            <div class="gtfs-route-list">
              ${routeEntries.map(([lineKey, meta]) => {
                const inGeo = isRouteInGeoLayers(config, lineKey, meta.geojsonUrl);
                const inAnim = isRouteInTransitMotion(config, lineKey);
                const newlyExported = Boolean(state.lastExport?.routes?.[lineKey]);
                return html`
                  <div class="list-row">
                    <div class="row-main" style="cursor: default;">
                      <span class="color-dot" style="background:${meta.color || "#007aff"};"></span>
                      <div class="row-text">
                        <span class="row-title">
                          ${meta.label || meta.shortName || lineKey}
                          <span style="opacity:0.65;font-weight:400;"> (${lineKey})</span>
                        </span>
                        <div class="row-meta">
                          ${newlyExported ? html`<span class="pill">newly exported</span>` : nothing}
                          ${inGeo ? html`<span class="pill">&#10003; Layer</span>` : nothing}
                          ${inAnim ? html`<span class="pill">&#10003; Animated</span>` : nothing}
                        </div>
                      </div>
                    </div>
                    <div class="row-actions">
                      <button
                        type="button"
                        class="btn"
                        ?disabled=${inGeo}
                        @click=${() => ctx.onWireRoute(lineKey, meta, { addGeoJson: true })}
                      >
                        ${inGeo ? "✓ Layer" : "+ Layer"}
                      </button>
                      <button
                        type="button"
                        class="btn"
                        ?disabled=${inAnim}
                        @click=${() => ctx.onWireRoute(lineKey, meta, { addAnimation: true })}
                      >
                        ${inAnim ? "✓ Anim" : "+ Anim"}
                      </button>
                      <button
                        type="button"
                        class="btn primary"
                        ?disabled=${inGeo && inAnim}
                        @click=${() => ctx.onWireRoute(lineKey, meta, { addGeoJson: true, addAnimation: true })}
                      >
                        ${inGeo && inAnim ? "Added" : "+ Both"}
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
