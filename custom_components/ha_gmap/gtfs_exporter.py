"""Standalone, stdlib-only GTFS (.zip / .sqlite) to ha-gmap-card schedule & GeoJSON exporter."""

from __future__ import annotations

import csv
from dataclasses import dataclass, field
import gzip
import io
import json
import logging
import math
import os
from pathlib import Path
import re
import sqlite3
from typing import Any
import zipfile

_LOGGER = logging.getLogger(__name__)

MODE_NAMES = {
    0: "tram",
    1: "subway",
    2: "rail",
    3: "bus",
    4: "ferry",
    5: "cable_tram",
    6: "aerial_lift",
    7: "funicular",
    11: "trolleybus",
    12: "monorail",
}


@dataclass
class GtfsExportResult:
    """Summary of a completed GTFS export run."""

    routes_exported: int = 0
    profiles_count: int = 0
    trips_count: int = 0
    schedule_path: str | None = None
    geojson_paths: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def parse_gtfs_time_seconds(val: Any) -> int | None:
    """Parse GTFS HH:MM:SS (supporting >24h service hours) into seconds, or None if invalid."""
    if val is None:
        return None
    s = str(val).strip()
    if not s:
        return None
    parts = s.split(":")
    if len(parts) < 2 or len(parts) > 3:
        return None
    try:
        hh = int(parts[0])
        mm = int(parts[1])
        ss = int(parts[2]) if len(parts) == 3 else 0
    except ValueError:
        return None
    if hh < 0 or hh > 48 or mm < 0 or mm >= 60 or ss < 0 or ss >= 60:
        return None
    return hh * 3600 + mm * 60 + ss


def parse_coord(lat_val: Any, lon_val: Any) -> tuple[float, float] | None:
    """Validate and return (lat, lng) if finite and within WGS84 bounds."""
    try:
        lat = float(lat_val)
        lon = float(lon_val)
    except (TypeError, ValueError):
        return None
    if not (math.isfinite(lat) and math.isfinite(lon)):
        return None
    if abs(lat) > 90.0 or abs(lon) > 180.0:
        return None
    if lat == 0.0 and lon == 0.0:
        return None
    return (round(lat, 6), round(lon, 6))


def slugify_route_key(route_id: str, short_name: str | None, long_name: str | None) -> str:
    """Create a clean, URL-safe route key."""
    base = (long_name or short_name or route_id or "route").strip().lower()
    slug = re.sub(r"[^a-z0-9]+", "_", base).strip("_")
    return slug or re.sub(r"[^a-z0-9]+", "_", str(route_id).lower()).strip("_") or "route"


def normalize_hex_color(raw: Any, fallback: str = "#1E88E5") -> str:
    """Normalize GTFS 6-char hex color (without #) into #RRGGBB."""
    if not raw:
        return fallback
    s = str(raw).strip().lstrip("#")
    if re.fullmatch(r"[0-9a-fA-F]{6}", s):
        return f"#{s}"
    if re.fullmatch(r"[0-9a-fA-F]{3}", s):
        return f"#{s[0]*2}{s[1]*2}{s[2]*2}"
    return fallback


def _atomic_write_text(path: Path, text: str, also_gzip: bool = True) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(text, encoding="utf-8")
    os.replace(tmp, path)
    if also_gzip:
        gz_path = Path(str(path) + ".gz")
        gz_tmp = Path(str(path) + ".gz.tmp")
        with gzip.open(gz_tmp, "wt", encoding="utf-8") as gz_f:
            gz_f.write(text)
        os.replace(gz_tmp, gz_path)


def _read_csv_from_zip(zf: zipfile.ZipFile, filename: str) -> list[dict[str, str]]:
    """Read a CSV table from a GTFS zip archive safely."""
    names = {n.lower(): n for n in zf.namelist()}
    # Support nested folder inside zip if present
    target = names.get(filename.lower())
    if not target:
        for low, orig in names.items():
            if low.endswith("/" + filename.lower()):
                target = orig
                break
    if not target:
        return []
    try:
        with zf.open(target) as raw_f:
            text_stream = io.TextIOWrapper(raw_f, encoding="utf-8-sig", errors="replace")
            return list(csv.DictReader(text_stream))
    except Exception as err:
        _LOGGER.warning("Failed reading %s from GTFS zip: %s", filename, err)
        return []


def _read_sqlite_table(conn: sqlite3.Connection, table: str, columns: str = "*") -> list[dict[str, Any]]:
    try:
        cur = conn.execute(f"SELECT {columns} FROM {table}")
        cols = [d[0] for d in cur.description]
        return [dict(zip(cols, row)) for row in cur.fetchall()]
    except sqlite3.Error:
        return []


def _load_gtfs_tables(source_path: str, warnings: list[str]) -> dict[str, list[dict[str, Any]]] | None:
    p = Path(source_path)
    if not p.exists() or not p.is_file():
        warnings.append(f"GTFS source does not exist: {source_path}")
        return None

    if p.suffix.lower() == ".sqlite" or p.suffix.lower() == ".db":
        try:
            conn = sqlite3.connect(f"file:{p}?mode=ro", uri=True)
        except sqlite3.Error:
            try:
                conn = sqlite3.connect(str(p))
            except sqlite3.Error as err:
                warnings.append(f"Could not open SQLite GTFS database: {err}")
                return None
        try:
            return {
                "routes": _read_sqlite_table(conn, "routes"),
                "stops": _read_sqlite_table(conn, "stops"),
                "trips": _read_sqlite_table(conn, "trips"),
                "stop_times": _read_sqlite_table(
                    conn, "stop_times", "trip_id, arrival_time, departure_time, stop_id, stop_sequence"
                ),
                "shapes": _read_sqlite_table(conn, "shapes"),
                "calendar": _read_sqlite_table(conn, "calendar"),
                "calendar_dates": _read_sqlite_table(conn, "calendar_dates"),
            }
        finally:
            conn.close()

    try:
        with zipfile.ZipFile(p, "r") as zf:
            return {
                "routes": _read_csv_from_zip(zf, "routes.txt"),
                "stops": _read_csv_from_zip(zf, "stops.txt"),
                "trips": _read_csv_from_zip(zf, "trips.txt"),
                "stop_times": _read_csv_from_zip(zf, "stop_times.txt"),
                "shapes": _read_csv_from_zip(zf, "shapes.txt"),
                "calendar": _read_csv_from_zip(zf, "calendar.txt"),
                "calendar_dates": _read_csv_from_zip(zf, "calendar_dates.txt"),
            }
    except zipfile.BadZipFile as err:
        warnings.append(f"Corrupt or invalid GTFS zip archive: {err}")
        return None
    except Exception as err:
        warnings.append(f"Failed to read GTFS source {source_path}: {err}")
        return None


def discover_routes_from_source(source_path: str) -> list[dict[str, str]]:
    """Return lightweight route summaries [{id, label, route_type}] from a GTFS zip or sqlite."""
    warnings: list[str] = []
    p = Path(source_path)
    if not p.exists():
        return []
    rows: list[dict[str, Any]] = []
    if p.suffix.lower() in (".sqlite", ".db"):
        try:
            conn = sqlite3.connect(str(p))
            rows = _read_sqlite_table(conn, "routes", "route_id, route_short_name, route_long_name, route_type")
            conn.close()
        except Exception:
            return []
    else:
        try:
            with zipfile.ZipFile(p, "r") as zf:
                rows = _read_csv_from_zip(zf, "routes.txt")
        except Exception:
            return []

    out: list[dict[str, str]] = []
    for r in rows:
        rid = str(r.get("route_id") or "").strip()
        if not rid:
            continue
        short_n = str(r.get("route_short_name") or "").strip()
        long_n = str(r.get("route_long_name") or "").strip()
        label = f"{short_n} - {long_n}".strip(" -") if short_n and long_n else (long_n or short_n or rid)
        out.append({"id": rid, "label": label, "route_type": str(r.get("route_type") or "")})
    return out


def _classify_service_ids(
    calendar_rows: list[dict[str, Any]],
    calendar_date_rows: list[dict[str, Any]],
) -> dict[str, list[str]]:
    """Map GTFS service_ids into weekday, saturday, and sunday buckets."""
    weekday: set[str] = set()
    saturday: set[str] = set()
    sunday: set[str] = set()

    for row in calendar_rows:
        sid = str(row.get("service_id") or "").strip()
        if not sid:
            continue
        is_wkd = any(str(row.get(d) or "0").strip() == "1" for d in ("monday", "tuesday", "wednesday", "thursday", "friday"))
        is_sat = str(row.get("saturday") or "0").strip() == "1"
        is_sun = str(row.get("sunday") or "0").strip() == "1"
        if is_wkd:
            weekday.add(sid)
        if is_sat:
            saturday.add(sid)
        if is_sun:
            sunday.add(sid)

    # Fallback: infer from calendar_dates.txt (exception_type == 1) when calendar.txt has gaps
    from datetime import datetime

    for row in calendar_date_rows:
        sid = str(row.get("service_id") or "").strip()
        exc = str(row.get("exception_type") or "1").strip()
        date_str = str(row.get("date") or "").strip()
        if not sid or exc != "1" or len(date_str) != 8:
            continue
        try:
            wd = datetime.strptime(date_str, "%Y%m%d").weekday()  # 0=Mon..6=Sun
        except ValueError:
            continue
        if wd == 5:
            saturday.add(sid)
        elif wd == 6:
            sunday.add(sid)
        else:
            weekday.add(sid)

    return {
        "weekday": sorted(weekday),
        "saturday": sorted(saturday),
        "sunday": sorted(sunday),
    }


def export_gtfs(
    source_path: str,
    output_dir: str,
    route_types: list[int | str] | None = None,
    route_filter: list[str] | None = None,
    url_prefix: str = "/local/gtfs2",
) -> GtfsExportResult:
    """Export static GTFS schedules and route GeoJSONs into `output_dir`."""
    result = GtfsExportResult()
    tables = _load_gtfs_tables(source_path, result.warnings)
    if tables is None:
        return result

    allowed_types = {str(t).strip() for t in (route_types or ["0", "1", "2", "4"]) if str(t).strip()}
    allowed_routes = {str(r).strip().lower() for r in (route_filter or []) if str(r).strip()}

    # 1. Index routes matching filter
    selected_routes: dict[str, dict[str, Any]] = {}
    for r in tables["routes"]:
        rid = str(r.get("route_id") or "").strip()
        if not rid:
            continue
        rtype_raw = str(r.get("route_type") or "").strip()
        short_n = str(r.get("route_short_name") or "").strip()
        long_n = str(r.get("route_long_name") or "").strip()
        if allowed_types and rtype_raw not in allowed_types:
            if not allowed_routes or (rid.lower() not in allowed_routes and short_n.lower() not in allowed_routes):
                continue
        if allowed_routes:
            if (
                rid.lower() not in allowed_routes
                and short_n.lower() not in allowed_routes
                and long_n.lower() not in allowed_routes
            ):
                continue
        try:
            rtype_int = int(rtype_raw) if rtype_raw else 3
        except ValueError:
            rtype_int = 3
        line_key = slugify_route_key(rid, short_n, long_n)
        selected_routes[rid] = {
            "route_id": rid,
            "line_key": line_key,
            "label": long_n or short_n or rid,
            "short_name": short_n or long_n or rid,
            "color": normalize_hex_color(r.get("route_color")),
            "text_color": normalize_hex_color(r.get("route_text_color"), "#ffffff"),
            "route_type": rtype_int,
        }

    if not selected_routes:
        result.warnings.append("No routes matched the selected route_types / route_filter.")
        return result

    # 2. Index stops
    stops_by_id: dict[str, dict[str, Any]] = {}
    for s in tables["stops"]:
        sid = str(s.get("stop_id") or "").strip()
        if not sid:
            continue
        coord = parse_coord(s.get("stop_lat"), s.get("stop_lon"))
        if not coord:
            continue
        stops_by_id[sid] = {
            "stop_id": sid,
            "name": str(s.get("stop_name") or sid).strip(),
            "lat": coord[0],
            "lng": coord[1],
            "location_type": str(s.get("location_type") or "0").strip(),
            "parent_station": str(s.get("parent_station") or "").strip(),
        }

    # 3. Index shapes (if present)
    shapes_by_id: dict[str, list[tuple[int, float, float]]] = {}
    for sh in tables["shapes"]:
        sh_id = str(sh.get("shape_id") or "").strip()
        if not sh_id:
            continue
        coord = parse_coord(sh.get("shape_pt_lat"), sh.get("shape_pt_lon"))
        if not coord:
            continue
        try:
            seq = int(sh.get("shape_pt_sequence") or 0)
        except ValueError:
            seq = 0
        shapes_by_id.setdefault(sh_id, []).append((seq, coord[0], coord[1]))
    for sh_id in shapes_by_id:
        shapes_by_id[sh_id].sort(key=lambda x: x[0])

    # 4. Index trips belonging to selected routes
    selected_trips: dict[str, dict[str, Any]] = {}
    for t in tables["trips"]:
        rid = str(t.get("route_id") or "").strip()
        tid = str(t.get("trip_id") or "").strip()
        if not tid or rid not in selected_routes:
            continue
        selected_trips[tid] = {
            "trip_id": tid,
            "route_id": rid,
            "service_id": str(t.get("service_id") or "1").strip(),
            "headsign": str(t.get("trip_headsign") or selected_routes[rid]["label"]).strip(),
            "shape_id": str(t.get("shape_id") or "").strip(),
        }

    if not selected_trips:
        result.warnings.append("Selected routes had 0 trips in trips.txt.")
        return result

    # 5. Group stop_times by trip_id
    stop_times_by_trip: dict[str, list[tuple[int, int, str]]] = {}
    for st in tables["stop_times"]:
        tid = str(st.get("trip_id") or "").strip()
        if tid not in selected_trips:
            continue
        sid = str(st.get("stop_id") or "").strip()
        if sid not in stops_by_id:
            continue
        t_sec = parse_gtfs_time_seconds(st.get("departure_time") or st.get("arrival_time"))
        if t_sec is None:
            continue
        try:
            seq = int(st.get("stop_sequence") or 0)
        except ValueError:
            seq = 0
        stop_times_by_trip.setdefault(tid, []).append((seq, t_sec, sid))

    # 6. Build deduplicated profiles & trips map + route geometry
    profiles: list[dict[str, Any]] = []
    profile_index_by_sig: dict[tuple, int] = {}
    trips_out: dict[str, dict[str, list[list[int]]]] = {}
    route_shapes_used: dict[str, set[str]] = {}
    route_stops_used: dict[str, set[str]] = {}
    route_stop_sequences: dict[str, list[list[str]]] = {}

    for tid, t_info in selected_trips.items():
        st_list = stop_times_by_trip.get(tid)
        if not st_list or len(st_list) < 2:
            continue
        st_list.sort(key=lambda x: x[0])
        start_sec = st_list[0][1]
        pts: list[list[Any]] = []
        stop_sig_parts: list[tuple[int, str]] = []
        rid = t_info["route_id"]
        route_meta = selected_routes[rid]
        line_key = route_meta["line_key"]

        for _, t_sec, sid in st_list:
            elapsed = max(0, t_sec - start_sec)
            stop = stops_by_id[sid]
            pts.append([elapsed, stop["lat"], stop["lng"]])
            stop_sig_parts.append((elapsed, sid))
            route_stops_used.setdefault(rid, set()).add(sid)

        if t_info["shape_id"] and t_info["shape_id"] in shapes_by_id:
            route_shapes_used.setdefault(rid, set()).add(t_info["shape_id"])
        else:
            route_stop_sequences.setdefault(rid, []).append([x[2] for x in st_list])

        sig = (t_info["headsign"], tuple(stop_sig_parts))
        pid = profile_index_by_sig.get(sig)
        if pid is None:
            pid = len(profiles)
            profile_index_by_sig[sig] = pid
            profiles.append({"h": t_info["headsign"], "pts": pts})

        trips_out.setdefault(line_key, {}).setdefault(t_info["service_id"], []).append([start_sec, pid])
        result.trips_count += 1

    for line_map in trips_out.values():
        for sid in line_map:
            line_map[sid].sort(key=lambda pair: pair[0])

    service_ids = _classify_service_ids(tables["calendar"], tables["calendar_dates"])

    # 7. Write per-route GeoJSON files
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    routes_meta_out: dict[str, dict[str, Any]] = {}

    for rid, rmeta in selected_routes.items():
        line_key = rmeta["line_key"]
        if line_key not in trips_out:
            continue
        features: list[dict[str, Any]] = []

        # LineStrings from shapes.txt or longest unique stop sequences
        sh_ids = route_shapes_used.get(rid)
        if sh_ids:
            for sh_id in sorted(sh_ids):
                coords = [[pt[2], pt[1]] for pt in shapes_by_id[sh_id]]
                if len(coords) >= 2:
                    features.append(
                        {
                            "type": "Feature",
                            "geometry": {"type": "LineString", "coordinates": coords},
                            "properties": {
                                "name": rmeta["label"],
                                "route": rmeta["short_name"],
                                "strokeColor": rmeta["color"],
                                "color": rmeta["color"],
                            },
                        }
                    )
        else:
            seen_seq: set[tuple[str, ...]] = set()
            for seq in route_stop_sequences.get(rid, []):
                t_seq = tuple(seq)
                if t_seq in seen_seq:
                    continue
                seen_seq.add(t_seq)
                coords = [[stops_by_id[sid]["lng"], stops_by_id[sid]["lat"]] for sid in seq if sid in stops_by_id]
                if len(coords) >= 2:
                    features.append(
                        {
                            "type": "Feature",
                            "geometry": {"type": "LineString", "coordinates": coords},
                            "properties": {
                                "name": rmeta["label"],
                                "route": rmeta["short_name"],
                                "strokeColor": rmeta["color"],
                                "color": rmeta["color"],
                            },
                        }
                    )

        # Station / Stop Points
        mode_name = MODE_NAMES.get(rmeta["route_type"], "bus")
        is_rail_like = rmeta["route_type"] in (0, 1, 2, 4, 5, 6, 7, 12)
        for sid in sorted(route_stops_used.get(rid, set())):
            st = stops_by_id[sid]
            features.append(
                {
                    "type": "Feature",
                    "geometry": {"type": "Point", "coordinates": [st["lng"], st["lat"]]},
                    "properties": {
                        "type": "station" if is_rail_like else "stop",
                        "point_type": "station" if is_rail_like else "stop",
                        "name": st["name"],
                        "Station": st["name"],
                        "Line / Route": rmeta["label"],
                        "color": rmeta["color"],
                        "location_type": 1 if is_rail_like else 0,
                        "route_type": rmeta["route_type"],
                        "mode": mode_name,
                    },
                }
            )

        geojson_filename = f"route_{line_key}.geojson"
        geojson_file = out_path / geojson_filename
        _atomic_write_text(
            geojson_file,
            json.dumps({"type": "FeatureCollection", "features": features}, separators=(",", ":")),
        )
        result.geojson_paths.append(str(geojson_file))
        routes_meta_out[line_key] = {
            "label": rmeta["label"],
            "shortName": rmeta["short_name"],
            "color": rmeta["color"],
            "textColor": rmeta["text_color"],
            "routeType": rmeta["route_type"],
            "geojsonUrl": f"{url_prefix.rstrip('/')}/{geojson_filename}",
        }
        result.routes_exported += 1

    # 8. Write transit_schedule.json (+ .gz)
    schedule_payload = {
        "profiles": profiles,
        "trips": trips_out,
        "routes": routes_meta_out,
        "service_ids": service_ids,
    }
    sched_file = out_path / "transit_schedule.json"
    _atomic_write_text(sched_file, json.dumps(schedule_payload, separators=(",", ":")))

    result.profiles_count = len(profiles)
    result.schedule_path = str(sched_file)
    return result
