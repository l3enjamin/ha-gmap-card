"""Unit and malformed-GTFS fuzz tests for custom_components.ha_gmap.gtfs_exporter."""

import io
import json
import os
from pathlib import Path
import sqlite3
import sys
import zipfile

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT / "custom_components" / "ha_gmap"))

from gtfs_exporter import (  # noqa: E402
    discover_routes_from_source,
    export_gtfs,
    normalize_hex_color,
    parse_coord,
    parse_gtfs_time_seconds,
)


def _make_gtfs_zip(dest: Path, files: dict[str, str]) -> Path:
    with zipfile.ZipFile(dest, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for name, content in files.items():
            zf.writestr(name, content)
    return dest


def test_standard_gtfs_zip_export_any_city(tmp_path: Path):
    zip_path = _make_gtfs_zip(
        tmp_path / "tokyo_sample.zip",
        {
            "routes.txt": "route_id,route_short_name,route_long_name,route_type,route_color\nJY,JY,Yamanote Line,1,80C242\nB1,B1,City Bus,3,1E88E5\n",
            "stops.txt": "stop_id,stop_name,stop_lat,stop_lon,location_type\nS1,Tokyo,35.6812,139.7671,1\nS2,Shinjuku,35.6896,139.7006,1\n",
            "calendar.txt": "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday\nWD,1,1,1,1,1,0,0\n",
            "trips.txt": "route_id,service_id,trip_id,trip_headsign,shape_id\nJY,WD,T1,Inner Loop,SH1\n",
            "stop_times.txt": "trip_id,arrival_time,departure_time,stop_id,stop_sequence\nT1,08:00:00,08:00:00,S1,1\nT1,08:15:00,08:15:00,S2,2\n",
            "shapes.txt": "shape_id,shape_pt_lat,shape_pt_lon,shape_pt_sequence\nSH1,35.6812,139.7671,1\nSH1,35.6850,139.7300,2\nSH1,35.6896,139.7006,3\n",
        },
    )

    out_dir = tmp_path / "www_out"
    res = export_gtfs(str(zip_path), str(out_dir), route_types=["1"], url_prefix="/local/tokyo")
    assert res.routes_exported == 1
    assert res.trips_count == 1
    assert res.profiles_count == 1
    assert (out_dir / "transit_schedule.json").exists()
    assert (out_dir / "transit_schedule.json.gz").exists()

    sched = json.loads((out_dir / "transit_schedule.json").read_text(encoding="utf-8"))
    assert "yamanote_line" in sched["trips"]
    assert sched["service_ids"]["weekday"] == ["WD"]
    assert sched["routes"]["yamanote_line"]["color"] == "#80C242"

    geojson_path = out_dir / "route_yamanote_line.geojson"
    assert geojson_path.exists()
    gj = json.loads(geojson_path.read_text(encoding="utf-8"))
    geom_types = {f["geometry"]["type"] for f in gj["features"]}
    assert "LineString" in geom_types
    assert "Point" in geom_types

    discovered = discover_routes_from_source(str(zip_path))
    assert len(discovered) == 2


def test_malformed_gtfs_zip_does_not_crash(tmp_path: Path):
    # Corrupt zip
    bad_zip = tmp_path / "corrupt.zip"
    bad_zip.write_bytes(b"not a zip at all")
    res_corrupt = export_gtfs(str(bad_zip), str(tmp_path / "out_corrupt"))
    assert res_corrupt.routes_exported == 0
    assert len(res_corrupt.warnings) >= 1

    # Valid zip with malformed CSV rows, bad coordinates, and invalid times
    malformed_zip = _make_gtfs_zip(
        tmp_path / "malformed.zip",
        {
            "routes.txt": "route_id,route_short_name,route_long_name,route_type,route_color\nR1,R1,Broken Line,1,ZZZZZZ\n",
            "stops.txt": "stop_id,stop_name,stop_lat,stop_lon\nBAD,Bad Stop,not_a_float,999.0\nOK1,Ok 1,49.28,-123.12\nOK2,Ok 2,49.27,-123.11\n",
            "calendar.txt": "",
            "calendar_dates.txt": "service_id,date,exception_type\nSVC1,20261123,1\nSVC_BAD,notadate,1\n",
            "trips.txt": "route_id,service_id,trip_id,trip_headsign\nR1,SVC1,T_BAD,Bad\nR1,SVC1,T_OK,Good\n",
            "stop_times.txt": "trip_id,arrival_time,departure_time,stop_id,stop_sequence\nT_BAD,99:99:99,bad,BAD,1\nT_OK,25:10:00,25:10:00,OK1,1\nT_OK,25:20:00,25:20:00,OK2,2\n",
        },
    )
    res = export_gtfs(str(malformed_zip), str(tmp_path / "out_malformed"), route_types=["1"])
    assert res.routes_exported == 1
    assert res.trips_count == 1


def test_parsers_handle_edge_values():
    assert parse_gtfs_time_seconds("25:15:00") == 25 * 3600 + 15 * 60
    assert parse_gtfs_time_seconds("1970-01-01 09:58:00.000000") == 9 * 3600 + 58 * 60
    assert parse_gtfs_time_seconds("1970-01-02 00:15:30.000000") == 24 * 3600 + 15 * 60 + 30
    assert parse_gtfs_time_seconds("1970-01-05 00:15:30.000000") is None
    assert parse_gtfs_time_seconds("99:99:99") is None
    assert parse_gtfs_time_seconds("invalid") is None
    assert parse_coord("nan", "-123.1") is None
    assert parse_coord(91.0, 0.0) is None
    assert parse_coord(0.0, 0.0) is None
    assert normalize_hex_color("007c9f") == "#007c9f"
    assert normalize_hex_color("invalid", "#000000") == "#000000"


def test_slug_collision_and_route_filter_long_name(tmp_path: Path):
    zip_path = _make_gtfs_zip(
        tmp_path / "collision.zip",
        {
            "routes.txt": (
                "route_id,route_short_name,route_long_name,route_type,route_color\n"
                "R_A,L1,Line 1,1,111111\n"
                "R_B,L1,Line-1,1,222222\n"
                "B_EXPRESS,430,Metrotown Express,3,1E88E5\n"
            ),
            "stops.txt": "stop_id,stop_name,stop_lat,stop_lon\nS1,A,49.28,-123.12\nS2,B,49.27,-123.11\n",
            "calendar.txt": "service_id,monday,tuesday,wednesday,thursday,friday,saturday,sunday\n1,1,1,1,1,1,0,0\n",
            "trips.txt": "route_id,service_id,trip_id,trip_headsign\nR_A,1,T1,A\nR_B,1,T2,B\nB_EXPRESS,1,T3,Exp\n",
            "stop_times.txt": (
                "trip_id,arrival_time,departure_time,stop_id,stop_sequence\n"
                "T1,08:00:00,08:00:00,S1,1\nT1,08:10:00,08:10:00,S2,2\n"
                "T2,08:00:00,08:00:00,S1,1\nT2,08:10:00,08:10:00,S2,2\n"
                "T3,08:00:00,08:00:00,S1,1\nT3,08:10:00,08:10:00,S2,2\n"
            ),
        },
    )
    res = export_gtfs(
        str(zip_path),
        str(tmp_path / "out_col"),
        route_types=["1"],
        route_filter=["Line 1", "Line-1", "Metrotown Express"],
    )
    assert res.routes_exported == 3
    sched = json.loads((tmp_path / "out_col" / "transit_schedule.json").read_text(encoding="utf-8"))
    assert len(sched["routes"]) == 3
    assert "line_1" in sched["routes"]
    assert "line_1_r_b" in sched["routes"]
    assert "metrotown_express" in sched["routes"]

    # Explicit empty route_types=[] should not fall back to default rail types
    res_empty = export_gtfs(str(zip_path), str(tmp_path / "out_empty"), route_types=[])
    assert res_empty.routes_exported == 3


def test_sqlite_datetime_export_and_merge_preserving_symlinks(tmp_path: Path):
    db_path = tmp_path / "gtfs_test.sqlite"
    conn = sqlite3.connect(str(db_path))
    conn.executescript(
        """
        CREATE TABLE routes (route_id TEXT, route_short_name TEXT, route_long_name TEXT, route_type INTEGER, route_color TEXT);
        CREATE TABLE stops (stop_id TEXT, stop_name TEXT, stop_lat REAL, stop_lon REAL, location_type INTEGER, parent_station TEXT);
        CREATE TABLE calendar (service_id TEXT, monday INTEGER, tuesday INTEGER, wednesday INTEGER, thursday INTEGER, friday INTEGER, saturday INTEGER, sunday INTEGER);
        CREATE TABLE calendar_dates (service_id TEXT, date TEXT, exception_type INTEGER);
        CREATE TABLE shapes (shape_id TEXT, shape_pt_lat REAL, shape_pt_lon REAL, shape_pt_sequence INTEGER);
        CREATE TABLE trips (route_id TEXT, service_id TEXT, trip_id TEXT, trip_headsign TEXT, shape_id TEXT);
        CREATE TABLE stop_times (trip_id TEXT, arrival_time TEXT, departure_time TEXT, stop_id TEXT, stop_sequence INTEGER);

        INSERT INTO routes VALUES ('6641', '099', 'Broadway B-Line', 3, 'd04110');
        INSERT INTO routes VALUES ('SKY1', 'Canada', 'Canada Line', 1, '0097A9');
        INSERT INTO stops VALUES ('S1', 'Commercial-Broadway', 49.2625, -123.0689, 0, '');
        INSERT INTO stops VALUES ('S2', 'UBC Exchange', 49.2674, -123.2468, 0, '');
        INSERT INTO calendar VALUES ('1', 1, 1, 1, 1, 1, 0, 0);
        INSERT INTO trips VALUES ('6641', '1', 'T99', '99 B-Line UBC', '');
        INSERT INTO trips VALUES ('SKY1', '1', 'TSKY', 'Waterfront', '');
        INSERT INTO stop_times VALUES ('T99', '1970-01-01 09:00:00.000000', '1970-01-01 09:00:00.000000', 'S1', 1);
        INSERT INTO stop_times VALUES ('T99', '1970-01-01 09:30:00.000000', '1970-01-01 09:30:00.000000', 'S2', 2);
        INSERT INTO stop_times VALUES ('TSKY', '1970-01-02 00:30:00.000000', '1970-01-02 00:30:00.000000', 'S1', 1);
        INSERT INTO stop_times VALUES ('TSKY', '1970-01-02 00:45:00.000000', '1970-01-02 00:45:00.000000', 'S2', 2);
        """
    )
    conn.close()

    discovered = discover_routes_from_source(str(db_path))
    assert len(discovered) == 2
    assert discovered[0]["color"] in ("#d04110", "#0097A9")

    out_dir = tmp_path / "www_merge"
    out_dir.mkdir()
    real_sched = out_dir / "skytrain_schedule.json"
    real_sched.write_text(
        json.dumps(
            {
                "profiles": [{"h": "Existing", "pts": [[0, 49.1, -123.1], [60, 49.2, -123.1]]}],
                "trips": {"expo": {"1": [[28800, 0]]}},
            }
        ),
        encoding="utf-8",
    )
    real_gz = out_dir / "skytrain_schedule.json.gz"
    real_gz.write_bytes(b"")
    os.symlink("skytrain_schedule.json", out_dir / "transit_schedule.json")
    os.symlink("skytrain_schedule.json.gz", out_dir / "transit_schedule.json.gz")

    res = export_gtfs(str(db_path), str(out_dir), route_types=[], route_filter=["6641"], merge_existing=True)
    assert res.routes_exported == 1
    assert res.trips_count == 1
    assert res.routes_meta["broadway_b_line"]["color"] == "#d04110"
    assert (out_dir / "transit_schedule.json").is_symlink()
    assert (out_dir / "transit_schedule.json.gz").is_symlink()

    merged = json.loads(real_sched.read_text(encoding="utf-8"))
    assert "expo" in merged["trips"]
    assert merged["trips"]["expo"]["1"] == [[28800, 0]]
    assert merged["trips"]["broadway_b_line"]["1"] == [[9 * 3600, 1]]
    assert len(merged["profiles"]) == 2


