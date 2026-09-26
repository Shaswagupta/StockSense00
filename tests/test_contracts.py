from stocksense_intelligence.contracts import EventType, InventoryEvent


def test_valid_receipt_event():
    event = InventoryEvent(
        event_id="EVT-001",
        event_type=EventType.RECEIPT,
        timestamp="2026-09-26T10:30:00Z",
        product={
            "product_id": "PRD-001",
            "sku": "STEEL-001",
            "category": "Raw Material",
            "unit": "kg",
        },
        quantity={
            "value": 100,
            "unit": "kg",
        },
        destination={
            "warehouse_id": "WH-001",
            "location_id": "RACK-A1",
        },
    )

    assert event.event_type == EventType.RECEIPT
    assert event.quantity.value == 100


def test_valid_transfer_event():
    event = InventoryEvent(
        event_id="EVT-002",
        event_type=EventType.TRANSFER,
        timestamp="2026-09-26T11:00:00Z",
        product={
            "product_id": "PRD-001",
            "sku": "STEEL-001",
            "category": "Raw Material",
            "unit": "kg",
        },
        quantity={
            "value": 20,
            "unit": "kg",
        },
        source={
            "warehouse_id": "WH-001",
            "location_id": "RACK-A1",
        },
        destination={
            "warehouse_id": "WH-001",
            "location_id": "RACK-B1",
        },
    )

    assert event.event_type == EventType.TRANSFER
    assert event.source.location_id == "RACK-A1"
    assert event.destination.location_id == "RACK-B1"