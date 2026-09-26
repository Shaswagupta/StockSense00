from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.inventory import (
    InventoryCreate,
    InventoryResponse,
    InventoryUpdate,
)
from app.services.inventory_service import (
    create_inventory,
    get_inventory,
    update_inventory,
)


router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"],
)


@router.get(
    "/{product_id}/{location_id}",
    response_model=InventoryResponse,
)
def read_inventory(
    product_id: int,
    location_id: int,
    db: Session = Depends(get_db),
):
    inventory = get_inventory(
        db,
        product_id,
        location_id,
    )

    if inventory is None:
        raise HTTPException(
            status_code=404,
            detail="Inventory record not found",
        )

    return inventory


@router.post(
    "",
    response_model=InventoryResponse,
    status_code=201,
)
def add_inventory(
    data: InventoryCreate,
    db: Session = Depends(get_db),
):
    existing = get_inventory(
        db,
        data.product_id,
        data.location_id,
    )

    if existing is not None:
        raise HTTPException(
            status_code=409,
            detail="Inventory record already exists",
        )

    return create_inventory(db, data)


@router.patch(
    "/{product_id}/{location_id}",
    response_model=InventoryResponse,
)
def modify_inventory(
    product_id: int,
    location_id: int,
    data: InventoryUpdate,
    db: Session = Depends(get_db),
):
    inventory = get_inventory(
        db,
        product_id,
        location_id,
    )

    if inventory is None:
        raise HTTPException(
            status_code=404,
            detail="Inventory record not found",
        )

    return update_inventory(
        db,
        inventory,
        data,
    )