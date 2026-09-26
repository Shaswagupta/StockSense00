from stocksense_intelligence.ingestion import validate_events


def test_validate_events():
    events = [
        {
            "event_id": "EVT-001",
            "event_type": "RECEIPT",
            "timestamp": "2026-09-26T10:00:00Z",
            "product": {
                "product_id": "PRD-001",
                "sku": "STEEL-001",
                "category": "Raw Material",
                "unit": "kg",
            },
            "quantity": {
                "value": 100,
                "unit": "kg",
            },
            "destination": {
                "warehouse_id": "WH-001",
                "location_id": "RACK-A1",
            },
        },
        {
            "event_id": "EVT-002",
            "event_type": "DELIVERY",
            "timestamp": "2026-09-26T11:00:00Z",
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
        },
    ]

    result = validate_events(events)

    assert len(result) == 2
    assert result[0].event_type.value == "RECEIPT"
    assert result[1].event_type.value == "DELIVERY"