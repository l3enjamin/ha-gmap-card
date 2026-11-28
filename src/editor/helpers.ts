export const CONTROL_POSITIONS: readonly string[] = [
  "TOP_LEFT",
  "TOP_CENTER",
  "TOP_RIGHT",
  "LEFT_TOP",
  "LEFT_CENTER",
  "LEFT_BOTTOM",
  "RIGHT_TOP",
  "RIGHT_CENTER",
  "RIGHT_BOTTOM",
  "BOTTOM_LEFT",
  "BOTTOM_CENTER",
  "BOTTOM_RIGHT"
];

export const MARKER_SHAPES: readonly string[] = [
  "circle",
  "square",
  "rectangle",
  "triangle",
  "arrow",
  "none"
];

export const PICTURE_SHAPES: readonly string[] = ["circle", "rectangle", "auto"];

export const ROUTE_LABEL_SHAPES: readonly string[] = ["rectangle", "square", "circle"];

/**
 * Safely deep-clones plain configuration values.
 */
export function cloneConfig<T>(val: T): T {
  if (val === undefined || val === null) return val;
  return JSON.parse(JSON.stringify(val));
}

/**
 * Returns a new shallow copy of `obj` with `key` updated (or deleted if empty/undefined/non-finite number)
 * and removes any specified conflicting alias keys.
 */
export function cleanFieldUpdate(
  obj: Record<string, any> | undefined,
  key: string,
  value: any,
  removeAliases?: string[]
): Record<string, any> {
  const next: Record<string, any> = { ...(obj || {}) };
  if (removeAliases) {
    for (const alias of removeAliases) {
      delete next[alias];
    }
  }
  const isEmptyNumber = typeof value === "number" && !Number.isFinite(value);
  if (value === undefined || value === "" || isEmptyNumber) {
    delete next[key];
  } else {
    next[key] = value;
  }
  return next;
}

export function arrayAdd<T>(arr: T[] | undefined, item: T): T[] {
  return [...(Array.isArray(arr) ? arr : []), item];
}

export function arrayRemove<T>(arr: T[] | undefined, index: number): T[] {
  const src = Array.isArray(arr) ? arr : [];
  if (index < 0 || index >= src.length) return [...src];
  return [...src.slice(0, index), ...src.slice(index + 1)];
}

export function arrayMove<T>(arr: T[] | undefined, fromIndex: number, toIndex: number): T[] {
  const src = Array.isArray(arr) ? [...arr] : [];
  if (src.length === 0) return src;
  const clampedFrom = Math.max(0, Math.min(src.length - 1, fromIndex));
  const clampedTo = Math.max(0, Math.min(src.length - 1, toIndex));
  if (clampedFrom === clampedTo) return src;
  const [item] = src.splice(clampedFrom, 1);
  src.splice(clampedTo, 0, item);
  return src;
}

export function arrayDuplicate<T>(arr: T[] | undefined, index: number): T[] {
  const src = Array.isArray(arr) ? arr : [];
  if (index < 0 || index >= src.length) return [...src];
  const copy = cloneConfig(src[index]);
  return [...src.slice(0, index + 1), copy, ...src.slice(index + 1)];
}

export function arrayUpdate<T>(arr: T[] | undefined, index: number, item: T): T[] {
  const src = Array.isArray(arr) ? [...arr] : [];
  if (index < 0 || index >= src.length) return src;
  src[index] = item;
  return src;
}

/**
 * Renames a record key while preserving key order; rejects empty or colliding target keys.
 */
export function recordRenameKey<T>(
  rec: Record<string, T> | undefined,
  oldKey: string,
  newKey: string
): Record<string, T> {
  const src = rec && typeof rec === "object" && !Array.isArray(rec) ? rec : {};
  const trimmedNew = newKey.trim();
  if (!trimmedNew || trimmedNew === oldKey || Object.prototype.hasOwnProperty.call(src, trimmedNew)) {
    return cloneConfig(src);
  }
  const next: Record<string, T> = {};
  for (const [k, v] of Object.entries(src)) {
    if (k === oldKey) {
      next[trimmedNew] = cloneConfig(v);
    } else {
      next[k] = cloneConfig(v);
    }
  }
  return next;
}

export function recordDeleteKey<T>(rec: Record<string, T> | undefined, key: string): Record<string, T> {
  const next: Record<string, T> = { ...(rec && typeof rec === "object" && !Array.isArray(rec) ? rec : {}) };
  delete next[key];
  return next;
}

/**
 * Normalizes a string, flat object, or legacy auto-entities `{ entity_id, name, options }` entry
 * into a flat entity config object for editing.
 */
export function normalizeEntityForEditor(entry: any): Record<string, any> {
  if (typeof entry === "string") {
    return { entity_id: entry };
  }
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    return { entity_id: "" };
  }
  const hasNestedOptions = Boolean(entry.options && typeof entry.options === "object" && !Array.isArray(entry.options));
  const entityId = entry.entity_id ?? entry.entity ?? entry.entityId ?? entry.options?.entity_id ?? "";
  if (hasNestedOptions) {
    const out: Record<string, any> = { ...cloneConfig(entry.options), entity_id: entityId };
    if (typeof entry.name === "string" && entry.name && !out.name_filter) {
      out.name_filter = entry.name;
    }
    return out;
  }
  const out = cloneConfig(entry);
  if (entityId && !out.entity_id) {
    out.entity_id = entityId;
    delete out.entity;
    delete out.entityId;
  }
  return out;
}

/**
 * Converts array or record `filter_groups` config into a key-indexed record.
 */
export function normalizeFilterGroupsToRecord(rawFg: any): Record<string, Record<string, any>> {
  const out: Record<string, Record<string, any>> = {};
  if (Array.isArray(rawFg)) {
    for (const item of rawFg) {
      if (item && typeof item === "object" && item.id) {
        const copy = cloneConfig(item);
        const id = String(copy.id);
        delete copy.id;
        if (copy.checked !== undefined && copy.default === undefined) {
          copy.default = copy.checked !== false;
          delete copy.checked;
        }
        out[id] = copy;
      }
    }
  } else if (rawFg && typeof rawFg === "object") {
    for (const [k, v] of Object.entries(rawFg)) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const copy = cloneConfig(v as Record<string, any>);
        if (copy.checked !== undefined && copy.default === undefined) {
          copy.default = copy.checked !== false;
          delete copy.checked;
        }
        out[k] = copy;
      }
    }
  }
  return out;
}

/**
 * Normalizes a color string for `<input type="color">` (`#rrggbb` only).
 */
export function toHexPickerValue(color: string | undefined, fallback = "#1a73e8"): string {
  if (!color || typeof color !== "string") return fallback;
  const trimmed = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed.toLowerCase();
  }
  const shortMatch = trimmed.match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/);
  if (shortMatch) {
    return `#${shortMatch[1]}${shortMatch[1]}${shortMatch[2]}${shortMatch[2]}${shortMatch[3]}${shortMatch[3]}`.toLowerCase();
  }
  return fallback;
}

/**
 * Parses fallback JSON textarea input for `popup_card`.
 */
export function parsePopupCardInput(
  raw: string
): { ok: true; value: any } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: true, value: undefined };
  }
  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, error: "popup_card must be a JSON object" };
    }
    return { ok: true, value: parsed };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Invalid JSON" };
  }
}
