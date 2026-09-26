from pydantic import BaseModel, Field


class SupplierPerformance(BaseModel):
    average_lead_time_days: float = Field(ge=0)
    lead_time_std_days: float = Field(ge=0)
    on_time_rate: float = Field(ge=0, le=1)
    rejection_rate: float = Field(ge=0, le=1)


class SupplierProduct(BaseModel):
    product_id: str = Field(min_length=1)
    unit_price: float = Field(ge=0)
    currency: str = Field(min_length=3, max_length=3)
    minimum_order_quantity: float = Field(gt=0)
    expected_lead_time_days: float = Field(ge=0)


class Supplier(BaseModel):
    supplier_id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    contact_email: str | None = None
    products: list[SupplierProduct] = Field(default_factory=list)
    performance: SupplierPerformance