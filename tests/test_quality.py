from stocksense_intelligence.ingestion.quality import (
    calculate_quality_score,
    check_duplicate_events,
    check_unit_consistency,
)
from stocksense_intelligence.contracts import InventoryEvent


def make_event(event_id, unit="kg"):
    return InventoryEvent(
        event_id=event_id,
        event_type="RECEIPT",
        timestamp="2026-09-26T10:00:00Z",
        product={
            "product_id": "PRD-001",
            "sku": "STEEL-001",
            "category": "Raw Material",
            "unit": unit,
        },
        quantity={"value": 100, "unit": unit},
        destination={
            "warehouse_id": "WH-001",
            "location_id": "RACK-A1",
        },
    )


def test_duplicate_events():
    events = [make_event("EVT-001"), make_event("EVT-001")]
    assert check_duplicate_events(events) == ["EVT-001"]


def test_unit_consistency():
    event = make_event("EVT-002")
    assert check_unit_consistency([event]) == []


def test_quality_score():
    events = [make_event("EVT-003"), make_event("EVT-004")]
    assert calculate_quality_score(events) == 100.0