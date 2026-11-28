import { describe, expect, it } from "bun:test";
import { normalizeCardConfig } from "../src/config/schema";
import {
  arrayAdd,
  arrayDuplicate,
  arrayMove,
  arrayRemove,
  arrayUpdate,
  cleanFieldUpdate,
  MARKER_SHAPES,
  normalizeEntityForEditor,
  normalizeFilterGroupsToRecord,
  parsePopupCardInput,
  recordDeleteKey,
  recordRenameKey,
  ROUTE_LABEL_SHAPES,
  toHexPickerValue
} from "../src/editor/helpers";

describe("Editor Config Helpers", () => {
  it("updates fields, deletes empties/NaN, and cleans aliases", () => {
    const orig = { entity: "zone.home", card_background: "#fff", group: "zones" };
    const updated = cleanFieldUpdate(orig, "background_color", "#123456", ["card_background"]);
    expect(updated.background_color).toBe("#123456");
    expect(updated.card_background).toBe(undefined);
    expect(orig.card_background).toBe("#fff"); // immutable

    const cleared = cleanFieldUpdate(updated, "background_color", "");
    expect("background_color" in cleared).toBe(false);

    const nanCleared = cleanFieldUpdate({ zoom: 15 }, "zoom", NaN);
    expect("zoom" in nanCleared).toBe(false);
  });

  it("performs immutable array add, remove, move, duplicate, and update", () => {
    const start = [{ id: "a" }, { id: "b" }, { id: "c" }];
    const added = arrayAdd(start, { id: "d" });
    expect(added.map((x) => x.id)).toEqual(["a", "b", "c", "d"]);
    expect(start.length).toBe(3);

    expect(arrayRemove(added, 1).map((x) => x.id)).toEqual(["a", "c", "d"]);
    expect(arrayMove(start, 2, 0).map((x) => x.id)).toEqual(["c", "a", "b"]);
    expect(arrayMove(start, 0, 99).map((x) => x.id)).toEqual(["b", "c", "a"]);

    const dup = arrayDuplicate(start, 1);
    expect(dup.map((x) => x.id)).toEqual(["a", "b", "b", "c"]);
    dup[1].id = "mutated";
    expect(dup[2].id).toBe("b"); // deep clone on duplicate

    expect(arrayUpdate(start, 1, { id: "x" }).map((x) => x.id)).toEqual(["a", "x", "c"]);
  });

  it("renames and deletes record keys while preserving order and preventing collisions", () => {
    const rec = { canada: { color: "#0097A9" }, expo: { color: "#00539B" }, millennium: { color: "#FFC220" } };
    const renamed = recordRenameKey(rec, "expo", "expo_line");
    expect(Object.keys(renamed)).toEqual(["canada", "expo_line", "millennium"]);
    expect(renamed.expo_line).toEqual({ color: "#00539B" });

    // Empty or colliding target key should leave record unchanged
    expect(Object.keys(recordRenameKey(rec, "expo", ""))).toEqual(["canada", "expo", "millennium"]);
    expect(Object.keys(recordRenameKey(rec, "expo", "canada"))).toEqual(["canada", "expo", "millennium"]);

    const deleted = recordDeleteKey(rec, "expo");
    expect(Object.keys(deleted)).toEqual(["canada", "millennium"]);
  });

  it("normalizes string, flat, and legacy auto-entities entries", () => {
    expect(normalizeEntityForEditor("zone.home")).toEqual({ entity_id: "zone.home" });

    const legacy = {
      entity_id: "sensor.departures_*",
      name: "/^(?!.*Platform).*$/",
      options: {
        name: "Bus Stop",
        icon_size: 8,
        marker_type: "circle"
      }
    };
    expect(normalizeEntityForEditor(legacy)).toEqual({
      entity_id: "sensor.departures_*",
      name_filter: "/^(?!.*Platform).*$/",
      name: "Bus Stop",
      icon_size: 8,
      marker_type: "circle"
    });
  });

  it("normalizes array and object filter_groups", () => {
    const fromArr = normalizeFilterGroupsToRecord([
      { id: "routes", label: "Routes", checked: true },
      { id: "stops", name: "Stops", default: false }
    ]);
    expect(fromArr).toEqual({
      routes: { label: "Routes", default: true },
      stops: { name: "Stops", default: false }
    });

    const fromObj = normalizeFilterGroupsToRecord({
      buses: { name: "Buses", checked: false }
    });
    expect(fromObj).toEqual({
      buses: { name: "Buses", default: false }
    });
  });

  it("converts hex colors for HTML color picker and parses JSON popup_card safely", () => {
    expect(toHexPickerValue("#abc")).toBe("#aabbcc");
    expect(toHexPickerValue("#0097A9")).toBe("#0097a9");
    expect(toHexPickerValue("rgba(0,0,0,0.5)", "#ffffff")).toBe("#ffffff");

    expect(parsePopupCardInput("")).toEqual({ ok: true, value: undefined });
    expect(parsePopupCardInput('{"type":"entities","entities":["zone.home"]}')).toEqual({
      ok: true,
      value: { type: "entities", entities: ["zone.home"] }
    });
    expect(parsePopupCardInput("[1,2,3]").ok).toBe(false);
    expect(parsePopupCardInput("{bad json").ok).toBe(false);
  });

  it("round-trips edited config through normalizeCardConfig cleanly", () => {
    let raw: Record<string, any> = { api_key: "AIzaTestKey" };

    // Add entity set with regex linked entity & popup_card
    const ent = cleanFieldUpdate(
      cleanFieldUpdate(
        cleanFieldUpdate({ entity_id: "/^sensor\\.(.+)_regular_gas$/" }, "location_entity", "sensor.$1_station_name"),
        "popup_max_width",
        440
      ),
      "popup_card",
      { type: "custom:mini-graph-card", entities: [{ entity: "this.entity_id" }] }
    );
    raw = cleanFieldUpdate(raw, "entities", arrayAdd(raw.entities, ent));

    // Add GeoJSON layer with route label spacing
    const geo = cleanFieldUpdate(
      cleanFieldUpdate({ url: "/local/gtfs2/route_430.geojson", stroke_color: "#1E88E5" }, "label_spacing", 1500),
      "label_shape",
      "pill"
    );
    raw = cleanFieldUpdate(raw, "geojson_layers", arrayAdd(raw.geojson_layers, geo));

    // Add transit route with triangle shape and directional rotation
    raw = cleanFieldUpdate(raw, "transit_motion", {
      schedule_url: "/local/gtfs2/transit_schedule.json",
      routes: {
        canada: {
          label: "Canada Line",
          color: "#0097A9",
          shape: "triangle",
          directional: true
        }
      }
    });

    // Add filter group
    raw = cleanFieldUpdate(raw, "filter_groups", {
      skytrain: { name: "SkyTrain", icon: "mdi:train", default: true }
    });

    const normalized = normalizeCardConfig(raw);
    expect(normalized.entities[0]).toMatchObject({
      entityId: "/^sensor\\.(.+)_regular_gas$/",
      locationEntity: "sensor.$1_station_name",
      popupMaxWidth: 440,
      popupCard: { type: "custom:mini-graph-card", entities: [{ entity: "this.entity_id" }] }
    });
    expect(normalized.geojsonLayers[0]).toMatchObject({
      url: "/local/gtfs2/route_430.geojson",
      labelSpacing: 1500,
      labelShape: "pill"
    });
    expect(normalized.transitMotion.routes.canada).toMatchObject({
      label: "Canada Line",
      color: "#0097A9",
      shape: "triangle",
      directional: true
    });
    expect(normalized.filterGroups.skytrain).toMatchObject({
      name: "SkyTrain",
      icon: "mdi:train",
      default: true
    });
    expect(MARKER_SHAPES).toEqual(["circle", "square", "rectangle", "triangle", "arrow", "none"]);
    expect(ROUTE_LABEL_SHAPES).toEqual(["rectangle", "square", "circle"]);
  });
});
