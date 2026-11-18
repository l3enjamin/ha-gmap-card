import { css, html, LitElement } from "lit";

export class HaGmapCardEditor extends LitElement {
  private _config: Record<string, any> = {};

  static properties = {
    hass: { attribute: false },
    _config: { state: true }
  };

  public hass: any;

  static styles = css`
    :host {
      display: block;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      color: var(--primary-text-color, #212121);
    }
    .form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 8px 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field.full {
      grid-column: 1 / -1;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color, #666);
    }
    input[type="text"],
    input[type="number"],
    select {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      font-size: 14px;
    }
    .checks {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      padding-top: 4px;
    }
    .check {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      cursor: pointer;
    }
    .note {
      grid-column: 1 / -1;
      font-size: 12px;
      color: var(--secondary-text-color, #777);
      margin-top: 4px;
    }
  `;

  public setConfig(config: Record<string, any>) {
    this._config = config ? JSON.parse(JSON.stringify(config)) : {};
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

  private updateTopField(key: string, value: any) {
    const next = { ...this._config };
    if (value === "" || value === undefined) {
      delete next[key];
    } else {
      next[key] = value;
    }
    this.emitConfig(next);
  }

  private updateTransitField(key: string, value: any) {
    const next = { ...this._config };
    const tm = { ...(next.transit_motion || {}) };
    if (value === "" || value === undefined || Number.isNaN(value)) {
      delete tm[key];
    } else {
      tm[key] = value;
    }
    next.transit_motion = tm;
    this.emitConfig(next);
  }

  protected render() {
    const cfg = this._config || {};
    const tm = cfg.transit_motion || {};

    return html`
      <div class="form">
        <div class="field full">
          <label>Google Maps API Key</label>
          <input
            type="text"
            .value=${cfg.api_key ?? ""}
            @change=${(e: Event) => this.updateTopField("api_key", (e.target as HTMLInputElement).value.trim())}
          />
        </div>

        <div class="field">
          <label>Vector Map ID (optional)</label>
          <input
            type="text"
            .value=${cfg.map_id ?? ""}
            @change=${(e: Event) => this.updateTopField("map_id", (e.target as HTMLInputElement).value.trim())}
          />
        </div>

        <div class="field">
          <label>Initial Center (entity or lat,lng)</label>
          <input
            type="text"
            .value=${typeof cfg.center === "string" ? cfg.center : ""}
            placeholder="zone.home"
            @change=${(e: Event) => this.updateTopField("center", (e.target as HTMLInputElement).value.trim())}
          />
        </div>

        <div class="field">
          <label>Initial Zoom</label>
          <input
            type="number"
            min="1"
            max="22"
            .value=${String(cfg.zoom ?? 15)}
            @change=${(e: Event) => this.updateTopField("zoom", Number((e.target as HTMLInputElement).value || 15))}
          />
        </div>

        <div class="field">
          <label>Color Scheme</label>
          <select
            .value=${cfg.color_scheme ?? "follow_system"}
            @change=${(e: Event) => this.updateTopField("color_scheme", (e.target as HTMLSelectElement).value)}
          >
            <option value="follow_system">Follow System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div class="field">
          <label>Language</label>
          <input
            type="text"
            .value=${cfg.language ?? ""}
            placeholder="en / zh-HK / zh-TW"
            @change=${(e: Event) => this.updateTopField("language", (e.target as HTMLInputElement).value.trim())}
          />
        </div>

        <div class="field">
          <label>Transit Schedule URL</label>
          <input
            type="text"
            .value=${tm.schedule_url ?? ""}
            placeholder="/local/gtfs2/transit_schedule.json"
            @change=${(e: Event) => this.updateTransitField("schedule_url", (e.target as HTMLInputElement).value.trim())}
          />
        </div>

        <div class="field">
          <label>Transit Min Zoom</label>
          <input
            type="number"
            min="1"
            max="22"
            .value=${String(tm.min_zoom ?? 13)}
            @change=${(e: Event) => this.updateTransitField("min_zoom", Number((e.target as HTMLInputElement).value || 13))}
          />
        </div>

        <div class="field">
          <label>Bus Min Zoom</label>
          <input
            type="number"
            min="1"
            max="22"
            .value=${tm.bus_min_zoom !== undefined && tm.bus_min_zoom !== null ? String(tm.bus_min_zoom) : ""}
            placeholder="optional"
            @change=${(e: Event) => {
              const raw = (e.target as HTMLInputElement).value.trim();
              this.updateTransitField("bus_min_zoom", raw === "" ? undefined : Number(raw));
            }}
          />
        </div>

        <div class="checks">
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(cfg.follow_by_default)}
              @change=${(e: Event) => this.updateTopField("follow_by_default", (e.target as HTMLInputElement).checked)}
            />
            Follow entities continuously
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(cfg.fit_entities)}
              @change=${(e: Event) => this.updateTopField("fit_entities", (e.target as HTMLInputElement).checked)}
            />
            Fit all entities on load
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(cfg.show_traffic_button)}
              @change=${(e: Event) => this.updateTopField("show_traffic_button", (e.target as HTMLInputElement).checked)}
            />
            Traffic button
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${Boolean(cfg.show_recenter_button)}
              @change=${(e: Event) => this.updateTopField("show_recenter_button", (e.target as HTMLInputElement).checked)}
            />
            Recenter button
          </label>
        </div>

        <div class="note">
          Per-entity options, GeoJSON layers, filter groups, and custom route icons are configured in YAML and preserved automatically.
        </div>
      </div>
    `;
  }
}
