from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field, model_validator


class EventType(str, Enum):
    RECEIPT = "RECEIPT"
    DELIVERY = "DELIVERY"
    TRANSFER = "TRANSFER"
    ADJUSTMENT = "ADJUSTMENT"
    RESERVATION = "RESERVATION"
    RELEASE = "RELEASE"
    DAMAGE = "DAMAGE"
    WRITE_OFF = "WRITE_OFF"
    RETURN = "RETURN"
    COUNT = "COUNT"


class ProductReference(BaseModel):
    product_id: str = Field(min_length=1)
    sku: str = Field(min_length=1)
    category: str | None = None
    unit: str = Field(min_length=1)


class Quantity(BaseModel):
    value: float = Field(gt=0)
    unit: str = Field(min_length=1)


class LocationReference(BaseModel):
    warehouse_id: str = Field(min_length=1)
    location_id: str = Field(min_length=1)


class Cost(BaseModel):
    unit_cost: float = Field(ge=0)
    currency: str = Field(min_length=3, max_length=3)


class DocumentReference(BaseModel):
    document_id: str = Field(min_length=1)
    document_type: str = Field(min_length=1)


class Actor(BaseModel):
    user_id: str = Field(min_length=1)
    role: str = Field(min_length=1)


class InventoryEvent(BaseModel):
    event_id: str = Field(min_length=1)
    event_type: EventType
    event_version: str = "1.0"
    timestamp: datetime
    product: ProductReference
    quantity: Quantity
    source: LocationReference | None = None
    destination: LocationReference | None = None
    cost: Cost | None = None
    document: DocumentReference | None = None
    actor: Actor | None = None
    reason: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="after")
    def validate_event(self):
        if self.event_type == EventType.TRANSFER:
            if self.source is None or self.destination is None:
                raise ValueError(
                    "TRANSFER events require both source and destination locations."
                )
            if self.source == self.destination:
                raise ValueError(
                    "TRANSFER source and destination cannot be identical."
                )

        if self.event_type in {
            EventType.DELIVERY,
            EventType.RESERVATION,
            EventType.RELEASE,
            EventType.DAMAGE,
            EventType.WRITE_OFF,
        }:
            if self.source is None:
                raise ValueError(
                    f"{self.event_type.value} events require a source location."
                )

        if self.event_type in {
            EventType.RECEIPT,
            EventType.RETURN,
        }:
            if self.destination is None:
                raise ValueError(
                    f"{self.event_type.value} events require a destination location."
                )

        return self