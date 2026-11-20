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

interface BatchedMarkerEntry {
  pos: any;
  visible: boolean;
  attached: boolean;
  zIndex: number;
  wrapper: HTMLElement;
  clickHandlers: Array<() => void>;
}

/**
 * Single shared OverlayView managing all DOM markers via GPU-composited translate3d,
 * avoiding dozens of independent OverlayView draw() callbacks on mobile pan/zoom.
 */
export class BatchedDomMarkerLayer {
  private overlay: any = null;
  private entries = new Set<BatchedMarkerEntry>();
  private rootEl: HTMLElement | null = null;

  constructor(private googleMaps: any, private map: any) {
    const LayerOverlay = class extends googleMaps.OverlayView {
      constructor(private parent: BatchedDomMarkerLayer) {
        super();
      }
      onAdd() {
        const root = document.createElement("div");
        root.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;overflow:visible;";
        this.parent.rootEl = root;
        for (const entry of this.parent.entries) {
          if (entry.attached) root.appendChild(entry.wrapper);
        }
        const panes = this.getPanes();
        if (panes?.overlayMouseTarget) {
          panes.overlayMouseTarget.appendChild(root);
        }
      }
      draw() {
        this.parent.drawAll();
      }
      onRemove() {
        if (this.parent.rootEl?.parentElement) {
          this.parent.rootEl.parentElement.removeChild(this.parent.rootEl);
        }
        this.parent.rootEl = null;
      }
    };
    this.overlay = new LayerOverlay(this);
    this.overlay.setMap(map);
  }

  private drawEntry(entry: BatchedMarkerEntry, proj: any) {
    if (!entry.visible || !entry.attached) return;
    const pt = proj.fromLatLngToDivPixel(entry.pos);
    if (pt) {
      entry.wrapper.style.transform = `translate3d(${Math.round(pt.x)}px, ${Math.round(pt.y)}px, 0) translate(-50%, -50%)`;
    }
  }

  public drawAll() {
    const proj = this.overlay?.getProjection?.();
    if (!proj) return;
    for (const entry of this.entries) {
      this.drawEntry(entry, proj);
    }
  }

  public addMarker(
    position: { lat: number; lng: number },
    contentEl: HTMLElement,
    title?: string
  ): DomMarkerLike {
    const div = document.createElement("div");
    div.style.cssText =
      "position:absolute;left:0;top:0;cursor:pointer;z-index:100;will-change:transform;display:block;";
    if (title) div.title = title;
    div.appendChild(contentEl);

    const entry: BatchedMarkerEntry = {
      pos: new this.googleMaps.LatLng(position.lat, position.lng),
      visible: true,
      attached: true,
      zIndex: 100,
      wrapper: div,
      clickHandlers: []
    };

    div.addEventListener("click", (ev) => {
      ev.stopPropagation();
      for (const h of entry.clickHandlers) h();
    });

    this.entries.add(entry);
    if (this.rootEl) {
      this.rootEl.appendChild(div);
      const proj = this.overlay?.getProjection?.();
      if (proj) this.drawEntry(entry, proj);
    }

    const layer = this;
    return {
      setPosition(newPos: any) {
        entry.pos =
          newPos?.lat !== undefined && typeof newPos.lat !== "function"
            ? new layer.googleMaps.LatLng(newPos.lat, newPos.lng)
            : newPos;
        const proj = layer.overlay?.getProjection?.();
        if (proj) layer.drawEntry(entry, proj);
      },
      getPosition() {
        return entry.pos;
      },
      setMap(targetMap: any) {
        const shouldAttach = Boolean(targetMap);
        if (entry.attached === shouldAttach) return;
        entry.attached = shouldAttach;
        if (shouldAttach) {
          if (layer.rootEl && !entry.wrapper.parentElement) {
            layer.rootEl.appendChild(entry.wrapper);
          }
          const proj = layer.overlay?.getProjection?.();
          if (proj) layer.drawEntry(entry, proj);
        } else if (entry.wrapper.parentElement) {
          entry.wrapper.parentElement.removeChild(entry.wrapper);
        }
      },
      getMap() {
        return entry.attached ? layer.map : null;
      },
      setVisible(vis: boolean) {
        if (entry.visible === vis) return;
        entry.visible = vis;
        entry.wrapper.style.display = vis ? "block" : "none";
        if (vis) {
          const proj = layer.overlay?.getProjection?.();
          if (proj) layer.drawEntry(entry, proj);
        }
      },
      getVisible() {
        return entry.visible;
      },
      setZIndex(z: number) {
        entry.zIndex = z;
        entry.wrapper.style.zIndex = String(z);
      },
      addListener(eventName: string, handler: () => void) {
        if (eventName === "click") {
          entry.clickHandlers.push(handler);
        }
      }
    };
  }

  public destroy() {
    this.entries.clear();
    if (this.overlay) {
      try {
        this.overlay.setMap(null);
      } catch (_) {}
      this.overlay = null;
    }
    this.rootEl = null;
  }
}

export function createDomMarkerOverlay(
  googleMaps: any,
  map: any,
  position: { lat: number; lng: number },
  contentEl: HTMLElement,
  title?: string
): DomMarkerLike {
  const layer = new BatchedDomMarkerLayer(googleMaps, map);
  return layer.addMarker(position, contentEl, title);
}
