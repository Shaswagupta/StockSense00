from enum import Enum

from pydantic import BaseModel, Field


class TrackingType(str, Enum):
    NONE = "NONE"
    BATCH = "BATCH"
    SERIAL = "SERIAL"


class ProductStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    DISCONTINUED = "DISCONTINUED"


class ProductPlanning(BaseModel):
    reorder_point: float = Field(ge=0)
    min_stock: float = Field(ge=0)
    max_stock: float = Field(ge=0)
    safety_stock: float = Field(ge=0)
    lead_time_days: float = Field(ge=0)
    minimum_order_quantity: float = Field(gt=0)


class ProductCost(BaseModel):
    unit_cost: float = Field(ge=0)
    currency: str = Field(min_length=3, max_length=3)


class Product(BaseModel):
    product_id: str = Field(min_length=1)
    sku: str = Field(min_length=1)
    name: str = Field(min_length=1)
    category: str = Field(min_length=1)
    subcategory: str | None = None
    unit: str = Field(min_length=1)

    tracking_type: TrackingType = TrackingType.NONE
    shelf_life_days: int | None = Field(default=None, ge=0)
    barcode: str | None = None

    planning: ProductPlanning
    cost: ProductCost

    status: ProductStatus = ProductStatus.ACTIVE