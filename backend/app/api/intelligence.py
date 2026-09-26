from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.intelligence_service import (
    get_inventory_summary,
    get_low_stock,
    get_reorder_recommendations,
    get_stock_velocity,
)

router = APIRouter(
    prefix="/intelligence",
    tags=["Inventory Intelligence"],
)


@router.get("/summary")
def inventory_summary(
    db: Session = Depends(get_db),
):
    return get_inventory_summary(db)


@router.get("/low-stock")
def low_stock(
    db: Session = Depends(get_db),
):
    return {
        "count": len(get_low_stock(db)),
        "items": get_low_stock(db),
    }


@router.get("/reorder-recommendations")
def reorder_recommendations(
    db: Session = Depends(get_db),
):
    return {
        "count": len(get_reorder_recommendations(db)),
        "recommendations": get_reorder_recommendations(db),
    }


@router.get("/velocity/{product_id}")
def stock_velocity(
    product_id: int,
    days: int = 30,
    db: Session = Depends(get_db),
):
    if days < 1 or days > 365:
        raise HTTPException(
            status_code=400,
            detail="days must be between 1 and 365",
        )

    return get_stock_velocity(
        db,
        product_id,
        days,
    )