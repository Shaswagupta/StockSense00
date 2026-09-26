from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.inventory import Inventory
from app.models.location import Location
from app.models.product import Product
from app.models.stock_movement import StockMovement
from app.schemas.stock_operation import (
    StockIssueRequest,
    StockReceiveRequest,
)


def receive_stock(
    db: Session,
    data: StockReceiveRequest,
) -> Inventory:

    # Validate product
    product = db.scalar(
        select(Product).where(Product.id == data.product_id)
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if not product.is_active:
        raise HTTPException(
            status_code=400,
            detail="Product is inactive",
        )

    # Validate location
    location = db.scalar(
        select(Location).where(Location.id == data.location_id)
    )

    if location is None:
        raise HTTPException(
            status_code=404,
            detail="Location not found",
        )

    if not location.is_active:
        raise HTTPException(
            status_code=400,
            detail="Location is inactive",
        )

    # Find existing inventory row
    inventory = db.scalar(
        select(Inventory)
        .where(
            Inventory.product_id == data.product_id,
            Inventory.location_id == data.location_id,
        )
        .with_for_update()
    )

    # Create inventory row if this is first stock
    if inventory is None:
        inventory = Inventory(
            product_id=data.product_id,
            location_id=data.location_id,
            quantity=0,
            reserved_quantity=0,
            reorder_point=product.reorder_point,
            safety_stock=product.safety_stock,
        )
        db.add(inventory)
        db.flush()

    # Increase stock
    inventory.quantity += data.quantity

    # Create movement ledger entry
    movement = StockMovement(
        product_id=data.product_id,
        location_id=data.location_id,
        quantity=data.quantity,
        movement_type="RECEIVE",
        reference=data.reference,
    )

    db.add(movement)

    db.commit()
    db.refresh(inventory)

    return inventory


def issue_stock(
    db: Session,
    data: StockIssueRequest,
) -> Inventory:

    # Validate product
    product = db.scalar(
        select(Product).where(Product.id == data.product_id)
    )

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    if not product.is_active:
        raise HTTPException(
            status_code=400,
            detail="Product is inactive",
        )

    # Validate location
    location = db.scalar(
        select(Location).where(Location.id == data.location_id)
    )

    if location is None:
        raise HTTPException(
            status_code=404,
            detail="Location not found",
        )

    if not location.is_active:
        raise HTTPException(
            status_code=400,
            detail="Location is inactive",
        )

    # Lock inventory row
    inventory = db.scalar(
        select(Inventory)
        .where(
            Inventory.product_id == data.product_id,
            Inventory.location_id == data.location_id,
        )
        .with_for_update()
    )

    if inventory is None:
        raise HTTPException(
            status_code=404,
            detail="No inventory exists for this product at this location",
        )

    # Calculate available stock
    available_quantity = (
        inventory.quantity - inventory.reserved_quantity
    )

    # Prevent negative / over-issue
    if data.quantity > available_quantity:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Insufficient available stock. "
                f"Available: {available_quantity}, "
                f"Requested: {data.quantity}"
            ),
        )

    # Reduce stock
    inventory.quantity -= data.quantity

    # Create movement ledger entry
    movement = StockMovement(
        product_id=data.product_id,
        location_id=data.location_id,
        quantity=data.quantity,
        movement_type="ISSUE",
        reference=data.reference,
    )

    db.add(movement)

    db.commit()
    db.refresh(inventory)

    return inventory