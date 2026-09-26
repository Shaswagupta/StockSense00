from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.inventory import InventoryResponse
from app.schemas.stock_operation import (
    StockIssueRequest,
    StockReceiveRequest,
    StockTransferRequest,
)
from app.services.stock_service import (
    issue_stock,
    receive_stock,
    transfer_stock,
)


router = APIRouter(
    prefix="/stock",
    tags=["Stock Operations"],
)


@router.post(
    "/receive",
    response_model=InventoryResponse,
)
def receive(
    data: StockReceiveRequest,
    db: Session = Depends(get_db),
):
    return receive_stock(db, data)


@router.post(
    "/issue",
    response_model=InventoryResponse,
)
def issue(
    data: StockIssueRequest,
    db: Session = Depends(get_db),
):
    return issue_stock(db, data)
@router.post("/transfer")
def transfer(
    data: StockTransferRequest,
    db: Session = Depends(get_db),
):
    source, destination = transfer_stock(db, data)

    return {
        "message": "Stock transferred successfully",
        "source": source,
        "destination": destination,
    }