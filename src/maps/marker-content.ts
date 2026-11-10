import { CardEntityConfig } from "../config/schema";

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

  const picture = entityConfig.picture || stateObj?.attributes?.entity_picture;
  const iconSize = entityConfig.iconSize || 36;
  const borderRadius = entityConfig.pictureBorderRadius ?? 50;
  const borderWidth = entityConfig.pictureBorderWidth ?? 2;
  const padding = entityConfig.picturePadding ?? 0;
  const bg = isDark ? "rgba(30, 30, 30, 0.9)" : "#ffffff";
  const borderColor = isDark ? "rgba(255, 255, 255, 0.35)" : "rgba(0, 0, 0, 0.25)";

  if (picture) {
    const img = document.createElement("img");
    img.src = picture;
    img.style.cssText = `
      width: ${iconSize}px;
      height: ${entityConfig.pictureHeight || iconSize}px;
      max-width: ${entityConfig.pictureMaxWidth ? `${entityConfig.pictureMaxWidth}px` : "none"};
      border-radius: ${borderRadius}%;
      border: ${borderWidth}px solid ${borderColor};
      background: ${bg};
      padding: ${padding}px;
      object-fit: contain;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      display: block;
    `;
    container.appendChild(img);
  } else {
    // Fallback circular pin
    const pin = document.createElement("div");
    pin.style.cssText = `
      width: ${iconSize}px;
      height: ${iconSize}px;
      border-radius: 50%;
      background: var(--primary-color, #1a73e8);
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
    `;
    const initial = (entityConfig.name || stateObj?.attributes?.friendly_name || "?").charAt(0).toUpperCase();
    pin.textContent = initial;
    container.appendChild(pin);
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
