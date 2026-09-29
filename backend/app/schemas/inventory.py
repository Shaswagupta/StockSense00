from datetime import datetime

from pydantic import BaseModel, ConfigDict


class InventoryBase(BaseModel):
    product_id: int
    location_id: int
    quantity: float = 0
    reserved_quantity: float = 0
    reorder_point: float = 0
    safety_stock: float = 0


class InventoryCreate(InventoryBase):
    pass


class InventoryUpdate(BaseModel):
    quantity: float | None = None
    reserved_quantity: float | None = None
    reorder_point: float | None = None
    safety_stock: float | None = None


class InventoryResponse(InventoryBase):
    id: int
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)