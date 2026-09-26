from decimal import Decimal

from pydantic import BaseModel, Field


class StockReceiveRequest(BaseModel):
    product_id: int
    location_id: int
    quantity: Decimal = Field(gt=0)
    reference: str | None = None


class StockIssueRequest(BaseModel):
    product_id: int
    location_id: int
    quantity: Decimal = Field(gt=0)
    reference: str | None = None


class StockTransferRequest(BaseModel):
    product_id: int
    from_location_id: int
    to_location_id: int
    quantity: Decimal = Field(gt=0)
    reference: str | None = None