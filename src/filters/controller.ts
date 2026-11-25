import { FilterGroupConfig, LayerFiltersConfig } from "../config/schema";

export class FilterController {
  private filterStates = new Map<string, boolean>();
  private onStateChangeCallbacks: Array<(filterId: string, active: boolean) => void> = [];
  private cleanupFns: Array<() => void> = [];

  constructor(
    private layerConfig: LayerFiltersConfig,
    private groups: Record<string, FilterGroupConfig>
  ) {
    for (const [id, grp] of Object.entries(groups)) {
      this.filterStates.set(id, grp.default !== false);
    }
  }

  public onStateChange(cb: (filterId: string, active: boolean) => void) {
    this.onStateChangeCallbacks.push(cb);
  }

  public isFilterActive(filterId: string): boolean {
    if (!this.filterStates.has(filterId)) return true;
    return this.filterStates.get(filterId) !== false;
  }

  public setFilter(filterId: string, active: boolean) {
    this.filterStates.set(filterId, active);
    for (const cb of this.onStateChangeCallbacks) {
      cb(filterId, active);
    }
  }

  public createControlElement(isDark: boolean): HTMLElement {
    const container = document.createElement("div");
    container.className = "ha-gmap-filter-control";
    container.style.cssText = `
      position: relative;
      margin: 10px;
      user-select: none;
      z-index: 10;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    // Prevent pointerdown propagation so maps never misinterpret UI clicks
    container.addEventListener("pointerdown", (e) => e.stopPropagation());
    container.addEventListener("mousedown", (e) => e.stopPropagation());

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ha-gmap-filter-btn";
    btn.title = this.layerConfig.title || "Layers";
    btn.style.cssText = `
      width: 40px;
      height: 40px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: ${isDark ? "rgba(33, 33, 33, 0.92)" : "#ffffff"};
      backdrop-filter: blur(8px);
      color: ${isDark ? "#e8eaed" : "#5f6368"};
      border: ${isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)"};
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.22);
      cursor: pointer;
      outline: none;
    `;

    const icon = document.createElement("ha-icon");
    icon.setAttribute("icon", this.layerConfig.icon || "mdi:layers-outline");
    (icon.style as any).cssText = "width: 20px; height: 20px; pointer-events: none;";
    btn.appendChild(icon);

    const dot = document.createElement("span");
    dot.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1a73e8;
      display: none;
      pointer-events: none;
    `;
    btn.appendChild(dot);

    const dropdown = document.createElement("div");
    dropdown.style.cssText = `
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      min-width: 190px;
      background: ${isDark ? "rgba(32, 33, 36, 0.96)" : "rgba(255, 255, 255, 0.98)"};
      backdrop-filter: blur(12px);
      color: ${isDark ? "#e8eaed" : "#202124"};
      border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)"};
      border-radius: 8px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
      padding: 6px 0;
      display: none;
      flex-direction: column;
      z-index: 1000;
    `;
    dropdown.addEventListener("pointerdown", (e) => e.stopPropagation());
    dropdown.addEventListener("mousedown", (e) => e.stopPropagation());

    const updateDot = () => {
      let anyDisabled = false;
      for (const val of this.filterStates.values()) {
        if (!val) { anyDisabled = true; break; }
      }
      dot.style.display = anyDisabled ? "block" : "none";
    };

    for (const [id, grp] of Object.entries(this.groups)) {
      const row = document.createElement("label");
      row.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 12px;
        margin: 1px 4px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
      `;

      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.checked = this.isFilterActive(id);
      chk.style.cssText = `width: 16px; height: 16px; margin: 0; cursor: pointer; accent-color: ${grp.color || "var(--primary-color, #1a73e8)"}; flex-shrink: 0;`;

      row.addEventListener("click", (e) => e.stopPropagation());
      chk.addEventListener("click", (e) => e.stopPropagation());
      chk.addEventListener("change", (e) => {
        e.stopPropagation();
        this.setFilter(id, chk.checked);
        updateDot();
      });

      row.appendChild(chk);

      if (grp.icon) {
        const rowIcon = document.createElement("ha-icon");
        rowIcon.setAttribute("icon", grp.icon);
        (rowIcon.style as any).cssText = "width: 18px; height: 18px; flex-shrink: 0;";
        row.appendChild(rowIcon);
      }

      const label = document.createElement("span");
      label.textContent = grp.name || id;
      label.style.cssText = "flex-grow: 1; white-space: nowrap;";
      row.appendChild(label);

      dropdown.appendChild(row);
    }

    updateDot();

    let isOpen = false;
    const closeDropdown = () => {
      if (!isOpen) return;
      isOpen = false;
      dropdown.style.display = "none";
      document.removeEventListener("pointerdown", onDocPointerDown, true);
    };

    const openDropdown = () => {
      if (isOpen) return;
      isOpen = true;
      dropdown.style.display = "flex";
      document.addEventListener("pointerdown", onDocPointerDown, true);
    };

    const onDocPointerDown = (ev: MouseEvent | PointerEvent) => {
      const path = (ev as any).composedPath ? (ev as any).composedPath() : [];
      if (path.includes(container) || container.contains(ev.target as Node)) {
        return;
      }
      closeDropdown();
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isOpen) closeDropdown();
      else openDropdown();
    });

    this.cleanupFns.push(closeDropdown);

    container.appendChild(btn);
    container.appendChild(dropdown);
    return container;
  }

  public destroy() {
    for (const fn of this.cleanupFns) {
      try {
        fn();
      } catch (_) {}
    }
    this.cleanupFns = [];
    this.onStateChangeCallbacks = [];
  }
}
