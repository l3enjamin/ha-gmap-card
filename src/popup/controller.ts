import { CardEntityConfig } from "../config/schema";

export function formatTemplateResultToHtml(raw: string): { isHtml: boolean; content: string } {
  let cleaned = raw
    .trim()
    .replace(/^<ha-markdown[^>]*>([\s\S]*?)<\/ha-markdown>$/i, "$1")
    .trim();

  const hasHtml = /<[a-z][\w-]*(\s[^>]*)?>/i.test(cleaned);
  if (!hasHtml) {
    return { isHtml: false, content: cleaned };
  }

  // Prevent indented HTML lines from breaking mixed markup
  cleaned = cleaned.replace(/^[ \t]+(?=<)/gm, "");

  // If the template begins directly with HTML markup (e.g. <div> or <table>), render verbatim
  if (cleaned.startsWith("<")) {
    return { isHtml: true, content: cleaned };
  }

  // Mixed Markdown + HTML (e.g. "### Heading\n**Bold**\n<img style='...'>"): convert Markdown lines while preserving inline CSS
  const lines = cleaned.split("\n");
  const out: string[] = [];
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      out.push("<br/>");
      continue;
    }
    line = line
      .replace(/^###\s+(.+)$/, '<h3 style="margin:0 0 6px;font-size:15px;line-height:1.3;">$1</h3>')
      .replace(/^##\s+(.+)$/, '<h2 style="margin:0 0 6px;font-size:16px;line-height:1.3;">$1</h2>')
      .replace(/^#\s+(.+)$/, '<h1 style="margin:0 0 8px;font-size:18px;line-height:1.3;">$1</h1>');

    // Bold and italic outside HTML tags
    line = line.replace(/(<[^>]+>)|(\*\*([^*\n]+)\*\*)/g, (m, tag, _b, inner) =>
      tag ? tag : `<strong>${inner}</strong>`
    );
    line = line.replace(/(<[^>]+>)|(\*([^*\n]+)\*)/g, (m, tag, _i, inner) =>
      tag ? tag : `<em>${inner}</em>`
    );

    if (trimmed.startsWith("<h") || trimmed.startsWith("<div") || trimmed.startsWith("<table") || trimmed.startsWith("<img")) {
      out.push(line);
    } else {
      out.push(`${line}<br/>`);
    }
  }
  return { isHtml: true, content: out.join("\n") };
}

export class PopupController {
  private infoWindow: any = null;
  private hass: any = null;
  private activeUnsub: (() => void) | null = null;
  private activeCardEl: any = null;
  private activeSeq = 0;

  constructor(private googleMaps: any) {}

  public setHass(hass: any) {
    this.hass = hass;
    if (this.activeCardEl) {
      this.activeCardEl.hass = hass;
    }
  }

  public getInfoWindow(): any {
    if (!this.infoWindow && this.googleMaps) {
      this.infoWindow = new this.googleMaps.InfoWindow({
        headerDisabled: true
      });
      this.infoWindow.addListener("closeclick", () => {
        this.cleanup();
      });
    }
    return this.infoWindow;
  }

  private buildContainer(isDark: boolean, maxWidth: number): { container: HTMLElement; contentBody: HTMLElement } {
    const container = document.createElement("div");
    container.className = "ha-gmap-popup-container";
    container.style.cssText = `
      position: relative;
      min-width: 220px;
      max-width: ${maxWidth}px;
      padding: 12px 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      line-height: 1.45;
      color: ${isDark ? "#e8eaed" : "#202124"};
      background: ${isDark ? "#1e1e1e" : "#ffffff"};
      border-radius: 8px;
      box-sizing: border-box;
    `;

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
      z-index: 2;
    `;
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.close();
    });
    container.appendChild(closeBtn);

    const contentBody = document.createElement("div");
    contentBody.style.paddingRight = "16px";
    container.appendChild(contentBody);

    return { container, contentBody };
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

    const popMaxW = entityConfig.popupMaxWidth || 400;
    const { container, contentBody } = this.buildContainer(isDark, popMaxW);

    const template = entityConfig.popupTemplate;
    const cardCfg = entityConfig.popupCard;

    if (cardCfg && (window as any).loadCardHelpers) {
      contentBody.textContent = "Loading card...";
      const seq = ++this.activeSeq;
      (window as any).loadCardHelpers().then((helpers: any) => {
        if (this.activeSeq !== seq) return;
        try {
          const cfgCopy = JSON.parse(
            JSON.stringify(cardCfg)
              .replace(/\bthis\.entity_id\b/g, entityConfig.entityId)
              .replace(/\bthis\.entity\b/g, entityConfig.entityId)
          );
          const cardEl = helpers.createCardElement(cfgCopy);
          cardEl.hass = this.hass;
          this.activeCardEl = cardEl;
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
              const formatted = formatTemplateResultToHtml(ev.result);
              if (formatted.isHtml) {
                contentBody.innerHTML = formatted.content;
              } else {
                if (!haMd.isConnected) {
                  contentBody.innerHTML = "";
                  contentBody.appendChild(haMd);
                }
                (haMd as any).content = formatted.content;
              }
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
            try {
              unsub();
            } catch (_) {}
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
    const isNativeMarker =
      typeof anchor?.getIcon === "function" ||
      Boolean(
        this.googleMaps?.marker?.AdvancedMarkerElement &&
          anchor instanceof this.googleMaps.marker.AdvancedMarkerElement
      );
    if (!isNativeMarker && typeof anchor?.getPosition === "function") {
      infoWindow.setPosition(anchor.getPosition());
      infoWindow.open({ map, shouldFocus: false });
    } else {
      infoWindow.open({
        map,
        anchor,
        shouldFocus: false
      });
    }
  }

  public openAtPosition(map: any, latLng: any, htmlContent: string, isDark: boolean) {
    this.cleanup();
    const infoWindow = this.getInfoWindow();
    if (!infoWindow || !latLng) return;

    const { container, contentBody } = this.buildContainer(isDark, 320);
    contentBody.innerHTML = htmlContent;
    infoWindow.setContent(container);
    infoWindow.setPosition(latLng);
    infoWindow.open({ map, shouldFocus: false });
  }

  public close() {
    this.cleanup();
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  public cleanup() {
    this.activeSeq++;
    this.activeCardEl = null;
    if (this.activeUnsub) {
      try {
        this.activeUnsub();
      } catch (_) {}
      this.activeUnsub = null;
    }
  }
}
