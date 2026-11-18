import { CardEntityConfig } from "../config/schema";

export function resolveDotPath(obj: any, dotPath: string): any {
  if (!obj || !dotPath) return undefined;
  const parts = dotPath.split(".");
  let cur = obj;
  for (const part of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[part];
  }
  return cur;
}

export function resolveEntityPicture(entityConfig: CardEntityConfig, stateObj: any): string | undefined {
  if (entityConfig.picture) return entityConfig.picture;
  const attrs = stateObj?.attributes;
  if (entityConfig.pictureAttribute && attrs) {
    const val = resolveDotPath(attrs, entityConfig.pictureAttribute);
    if (typeof val === "string" && val.trim()) return val.trim();
  }
  if (typeof attrs?.entity_picture === "string" && attrs.entity_picture.trim()) {
    return attrs.entity_picture.trim();
  }
  if (typeof attrs?.brand_logo === "string" && attrs.brand_logo.trim()) {
    return attrs.brand_logo.trim();
  }
  return undefined;
}

export function createMarkerElement(
  entityConfig: CardEntityConfig,
  stateObj: any,
  isDark: boolean
): HTMLElement {
  const container = document.createElement("div");
  container.className = "ha-gmap-marker";
  container.style.cssText = `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: transform 0.15s ease;
  `;

  const iconSize = entityConfig.iconSize || 32;
  const bg = entityConfig.backgroundColor || (isDark ? "rgba(30, 30, 30, 0.92)" : "#ffffff");
  const defaultBorder = isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.25)";
  const borderColor = entityConfig.borderColor || defaultBorder;
  const mType = entityConfig.markerType;
  const picture = resolveEntityPicture(entityConfig, stateObj);

  if (mType === "circle" || entityConfig.showIcon === false) {
    const dotSize = entityConfig.iconSize || 10;
    const dot = document.createElement("div");
    dot.className = "ha-gmap-marker-circle";
    dot.style.cssText = `
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
      background: ${entityConfig.backgroundColor || "#1E88E5"};
      border: ${entityConfig.borderWidth ?? 1}px solid ${entityConfig.borderColor || "#ffffff"};
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      box-sizing: border-box;
    `;
    container.appendChild(dot);
  } else if (picture && mType !== "icon") {
    const isRectOrAuto =
      entityConfig.pictureShape === "auto" ||
      entityConfig.pictureShape === "rectangle" ||
      mType === "rectangle" ||
      mType === "auto" ||
      entityConfig.pictureHeight !== undefined ||
      entityConfig.pictureMaxWidth !== undefined;

    const img = document.createElement("img");
    img.src = picture;

    if (isRectOrAuto) {
      const h = entityConfig.pictureHeight || iconSize || 28;
      const maxW = entityConfig.pictureMaxWidth || 120;
      const br = entityConfig.pictureBorderRadius ?? 8;
      const bw = entityConfig.borderWidth ?? 1;
      const pad = entityConfig.picturePadding ?? 2;
      img.style.cssText = `
        width: auto;
        height: ${h}px;
        max-width: ${maxW}px;
        border-radius: ${br}px;
        border: ${bw}px solid ${borderColor};
        background: ${bg};
        padding: ${pad}px;
        object-fit: contain;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.28);
        display: block;
        box-sizing: border-box;
      `;
    } else {
      const isVectorSvg =
        /\.svg(\?|$)/i.test(picture) &&
        entityConfig.pictureShape !== "circle" &&
        entityConfig.borderWidth === undefined &&
        !entityConfig.backgroundColor &&
        mType !== "square";

      if (isVectorSvg) {
        img.style.cssText = `
          width: ${iconSize}px;
          height: ${iconSize}px;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.35));
        `;
      } else {
        const br = mType === "square" ? `${entityConfig.pictureBorderRadius ?? 6}px` : "50%";
        const bw = entityConfig.borderWidth ?? 2;
        const pad = entityConfig.picturePadding ?? 0;
        img.style.cssText = `
          width: ${iconSize}px;
          height: ${iconSize}px;
          border-radius: ${br};
          border: ${bw}px solid ${borderColor};
          background: ${bg};
          padding: ${pad}px;
          object-fit: contain;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          display: block;
          box-sizing: border-box;
        `;
      }
    }
    container.appendChild(img);
  } else {
    const iconName = entityConfig.icon || stateObj?.attributes?.icon;
    const badge = document.createElement("div");
    const br = mType === "square" || mType === "rectangle" ? `${entityConfig.pictureBorderRadius ?? 6}px` : "50%";
    const badgeBg = entityConfig.backgroundColor || "var(--primary-color, #1a73e8)";
    const badgeBorderColor = entityConfig.borderColor || "#ffffff";
    const badgeBorderWidth = entityConfig.borderWidth ?? 2;

    badge.style.cssText = `
      width: ${iconSize}px;
      height: ${iconSize}px;
      border-radius: ${br};
      background: ${badgeBg};
      border: ${badgeBorderWidth}px solid ${badgeBorderColor};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: ${Math.max(10, Math.round(iconSize * 0.42))}px;
      font-weight: 700;
      box-sizing: border-box;
    `;

    if (iconName && typeof iconName === "string") {
      const haIcon = document.createElement("ha-icon");
      haIcon.setAttribute("icon", iconName);
      const glyphSize = Math.max(12, Math.round(iconSize * 0.6));
      (haIcon.style as any).cssText = `--mdc-icon-size: ${glyphSize}px; width: ${glyphSize}px; height: ${glyphSize}px; color: #ffffff; pointer-events: none;`;
      badge.appendChild(haIcon);
    } else {
      const initial = (entityConfig.name || stateObj?.attributes?.friendly_name || "?").charAt(0).toUpperCase();
      badge.textContent = initial;
    }

    container.appendChild(badge);
  }

  // Optional Name Label below marker
  if (entityConfig.showName) {
    const label = document.createElement("div");
    label.className = "ha-gmap-marker-label";
    label.textContent = entityConfig.name || stateObj?.attributes?.friendly_name || entityConfig.entityId;
    label.style.cssText = `
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 2px;
      padding: 1px 5px;
      background: ${isDark ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.9)"};
      color: ${isDark ? "#f0f0f0" : "#202124"};
      border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)"};
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    `;
    container.appendChild(label);
  }

  return container;
}

export interface DomMarkerLike {
  setPosition(pos: any): void;
  getPosition(): any;
  setMap(map: any): void;
  getMap(): any;
  setVisible(visible: boolean): void;
  getVisible(): boolean;
  setZIndex(z: number): void;
  addListener(eventName: string, handler: () => void): void;
}

/**
 * Lightweight OverlayView wrapper that mounts arbitrary DOM marker elements onto any
 * Google Map (Raster or Vector) without falling back to default red pins.
 */
export function createDomMarkerOverlay(
  googleMaps: any,
  map: any,
  position: { lat: number; lng: number },
  contentEl: HTMLElement,
  title?: string
): DomMarkerLike {
  class DomMarkerOverlay extends googleMaps.OverlayView {
    private pos: any;
    private visible = true;
    private wrapper: HTMLElement | null = null;
    private clickHandlers: Array<() => void> = [];
    private zIndex = 100;

    constructor(initialPos: { lat: number; lng: number }) {
      super();
      this.pos = new googleMaps.LatLng(initialPos.lat, initialPos.lng);
      this.setMap(map);
    }

    onAdd() {
      const div = document.createElement("div");
      div.style.cssText = `
        position: absolute;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: ${this.zIndex};
        display: ${this.visible ? "block" : "none"};
      `;
      if (title) div.title = title;
      div.appendChild(contentEl);
      div.addEventListener("click", (ev) => {
        ev.stopPropagation();
        for (const h of this.clickHandlers) h();
      });
      this.wrapper = div;
      const panes = this.getPanes();
      if (panes?.overlayMouseTarget) {
        panes.overlayMouseTarget.appendChild(div);
      }
    }

    draw() {
      if (!this.wrapper) return;
      const proj = this.getProjection();
      if (!proj) return;
      const pt = proj.fromLatLngToDivPixel(this.pos);
      if (pt) {
        this.wrapper.style.left = `${pt.x}px`;
        this.wrapper.style.top = `${pt.y}px`;
      }
    }

    onRemove() {
      if (this.wrapper?.parentElement) {
        this.wrapper.parentElement.removeChild(this.wrapper);
      }
      this.wrapper = null;
    }

    setPosition(newPos: any) {
      this.pos = newPos?.lat !== undefined && typeof newPos.lat !== "function"
        ? new googleMaps.LatLng(newPos.lat, newPos.lng)
        : newPos;
      this.draw();
    }

    getPosition() {
      return this.pos;
    }

    setVisible(vis: boolean) {
      this.visible = vis;
      if (this.wrapper) {
        this.wrapper.style.display = vis ? "block" : "none";
      }
    }

    getVisible() {
      return this.visible;
    }

    setZIndex(z: number) {
      this.zIndex = z;
      if (this.wrapper) {
        this.wrapper.style.zIndex = String(z);
      }
    }

    addListener(eventName: string, handler: () => void) {
      if (eventName === "click") {
        this.clickHandlers.push(handler);
      }
    }
  }

  return new DomMarkerOverlay(position) as unknown as DomMarkerLike;
}
