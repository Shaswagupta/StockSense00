from collections import Counter

from stocksense_intelligence.contracts import InventoryEvent


def check_duplicate_events(events: list[InventoryEvent]) -> list[str]:
    event_ids = [event.event_id for event in events]
    counts = Counter(event_ids)

    return [
        event_id
        for event_id, count in counts.items()
        if count > 1
    ]


def check_unit_consistency(events: list[InventoryEvent]) -> list[str]:
    issues = []

    for event in events:
        if event.quantity.unit != event.product.unit:
            issues.append(event.event_id)

    return issues


def calculate_quality_score(events: list[InventoryEvent]) -> float:
    if not events:
        return 0.0

    valid = 0

    for event in events:
        if (
            event.event_id
            and event.product.sku
            and event.quantity.value > 0
            and event.quantity.unit == event.product.unit
        ):
            valid += 1

    return round((valid / len(events)) * 100, 2)
def build_quality_report(events: list[InventoryEvent]) -> dict:
    duplicates = check_duplicate_events(events)
    unit_issues = check_unit_consistency(events)

    return {
        "total_events": len(events),
        "duplicate_events": len(duplicates),
        "unit_issues": len(unit_issues),
        "quality_score": calculate_quality_score(events),
        "status": "PASS" if not duplicates and not unit_issues else "REVIEW",
    }