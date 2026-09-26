from pydantic import ValidationError

from stocksense_intelligence.contracts import InventoryEvent


def validate_event(data: dict) -> InventoryEvent:
    try:
        return InventoryEvent.model_validate(data)
    except ValidationError as exc:
        raise ValueError(str(exc)) from exc