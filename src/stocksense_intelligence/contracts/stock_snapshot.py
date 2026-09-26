from datetime import datetime

from pydantic import BaseModel, Field


class StockSnapshot(BaseModel):
    product_id: str = Field(min_length=1)
    sku: str = Field(min_length=1)
    warehouse_id: str = Field(min_length=1)
    location_id: str = Field(min_length=1)

    physical_quantity: float = Field(ge=0)
    available_quantity: float = Field(ge=0)
    reserved_quantity: float = Field(ge=0)
    in_transit_quantity: float = Field(ge=0)
    quarantine_quantity: float = Field(ge=0)
    damaged_quantity: float = Field(ge=0)

    unit: str = Field(min_length=1)
    as_of: datetime