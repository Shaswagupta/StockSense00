import pytest

from stocksense_intelligence.contracts import EventType, InventoryEvent


def base_event():
    return {
        "event_id": "EVT-100",
        "event_type": EventType.TRANSFER,
        "timestamp": "2026-09-26T12:00:00Z",
        "product": {
            "product_id": "PRD-001",
            "sku": "STEEL-001",
            "category": "Raw Material",
            "unit": "kg",
        },
        "quantity": {
            "value": 20,
            "unit": "kg",
        },
        "source": {
            "warehouse_id": "WH-001",
            "location_id": "RACK-A1",
        },
        "destination": {
            "warehouse_id": "WH-001",
            "location_id": "RACK-B1",
        },
    }


def test_transfer_requires_source():
    data = base_event()
    data["source"] = None

    with pytest.raises(ValueError):
        InventoryEvent(**data)


def test_transfer_requires_destination():
    data = base_event()
    data["destination"] = None

    with pytest.raises(ValueError):
        InventoryEvent(**data)


def test_transfer_cannot_use_same_location():
    data = base_event()
    data["destination"] = data["source"]

    with pytest.raises(ValueError):
        InventoryEvent(**data)


def test_delivery_requires_source():
    data = base_event()
    data["event_type"] = EventType.DELIVERY
    data["source"] = None

    with pytest.raises(ValueError):
        InventoryEvent(**data)


def test_receipt_requires_destination():
    data = base_event()
    data["event_type"] = EventType.RECEIPT
    data["source"] = None
    data["destination"] = None

    with pytest.raises(ValueError):
        InventoryEvent(**data)