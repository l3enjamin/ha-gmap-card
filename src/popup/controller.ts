import { CardEntityConfig } from "../config/schema";

export class PopupController {
  private infoWindow: any = null;
  private hass: any = null;
  private activeUnsub: (() => void) | null = null;
  private activeSeq = 0;

  constructor(private googleMaps: any) {}

  public setHass(hass: any) {
    this.hass = hass;
  }

  public getInfoWindow(): any {
    if (!this.infoWindow && this.googleMaps) {
      this.infoWindow = new this.googleMaps.InfoWindow({
        headerDisabled: true // Modern InfoWindow clean mode
      });
      this.infoWindow.addListener("closeclick", () => {
        this.cleanup();
      });
    }
    return this.infoWindow;
  }

  public open(
    map: any,
    anchor: any,
    entityConfig: CardEntityConfig,
    stateObj: any,
    isDark: boolean
  ) {
    this.cleanup();
    const infoWindow = this.getInfoWindow();
    if (!infoWindow) return;

    const popMaxW = entityConfig.popupMaxWidth || 380;
    const container = document.createElement("div");
    container.className = "ha-gmap-popup-container";
    container.style.cssText = `
      position: relative;
      min-width: 240px;
      max-width: ${popMaxW}px;
      padding: 12px 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.45;
      color: ${isDark ? "#e8eaed" : "#202124"};
      background: ${isDark ? "#1e1e1e" : "#ffffff"};
      border-radius: 8px;
      box-sizing: border-box;
    `;

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "\u00d7";
    closeBtn.style.cssText = `
      position: absolute;
      top: 6px;
      right: 8px;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      color: inherit;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    `;
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.close();
    });
    container.appendChild(closeBtn);

    const contentBody = document.createElement("div");
    container.appendChild(contentBody);

    const template = entityConfig.popupTemplate;
    const cardCfg = entityConfig.popupCard;

    if (cardCfg && (window as any).loadCardHelpers) {
      contentBody.textContent = "Loading card...";
      (window as any).loadCardHelpers().then((helpers: any) => {
        try {
          const cardEl = helpers.createCardElement(cardCfg);
          cardEl.hass = this.hass;
          contentBody.innerHTML = "";
          contentBody.appendChild(cardEl);
        } catch (err: any) {
          contentBody.textContent = `Failed to load card: ${err?.message || err}`;
        }
      });
    } else if (template && this.hass?.connection) {
      const haMd = document.createElement("ha-markdown");
      haMd.setAttribute("allow-svg", "");
      haMd.setAttribute("breaks", "");
      (haMd as any).content = "Loading...";
      contentBody.appendChild(haMd);

      const seq = ++this.activeSeq;
      this.hass.connection
        .subscribeMessage(
          (ev: any) => {
            if (this.activeSeq !== seq) return;
            if (ev && typeof ev.result === "string") {
              const cleaned = ev.result.trim().replace(/^<ha-markdown[^>]*>([\s\S]*?)<\/ha-markdown>$/i, "$1").trim();
              (haMd as any).content = cleaned;
            } else if (ev && ev.error) {
              (haMd as any).content = `**Template Error:** ${ev.error.message || ev.error}`;
            }
          },
          {
            type: "render_template",
            template,
            variables: {
              entity: entityConfig.entityId,
              state: stateObj?.state,
              attributes: stateObj?.attributes || {}
            }
          }
        )
        .then((unsub: () => void) => {
          if (this.activeSeq !== seq) {
            try { unsub(); } catch (_) {}
            return;
          }
          this.activeUnsub = unsub;
        })
        .catch((err: any) => {
          if (this.activeSeq === seq) {
            (haMd as any).content = `**Template Error:** ${err?.message || err}`;
          }
        });
    } else {
      // Default clean info view
      const title = document.createElement("div");
      title.style.cssText = "font-weight: 700; font-size: 14px; margin-bottom: 4px;";
      title.textContent = entityConfig.name || stateObj?.attributes?.friendly_name || entityConfig.entityId;
      contentBody.appendChild(title);

      const stateDiv = document.createElement("div");
      const unit = stateObj?.attributes?.unit_of_measurement ? ` ${stateObj.attributes.unit_of_measurement}` : "";
      stateDiv.textContent = `State: ${stateObj?.state ?? "unknown"}${unit}`;
      contentBody.appendChild(stateDiv);
    }

    infoWindow.setContent(container);
    infoWindow.open({
      map,
      anchor,
      shouldFocus: false
    });
  }

  public close() {
    this.cleanup();
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  public cleanup() {
    this.activeSeq++;
    if (this.activeUnsub) {
      try {
        this.activeUnsub();
      } catch (_) {}
      this.activeUnsub = null;
    }
  }
}
