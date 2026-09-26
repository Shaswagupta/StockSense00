from collections.abc import Iterable

from stocksense_intelligence.contracts import InventoryEvent
from stocksense_intelligence.ingestion.validator import validate_event


def validate_events(events: Iterable[dict]) -> list[InventoryEvent]:
    validated_events = []

    for event in events:
        validated_events.append(validate_event(event))

    return validated_events