from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.inventory import Inventory
from app.schemas.inventory import InventoryCreate, InventoryUpdate


def get_inventory(
    db: Session,
    product_id: int,
    location_id: int,
) -> Inventory | None:
    stmt = select(Inventory).where(
        Inventory.product_id == product_id,
        Inventory.location_id == location_id,
    )

    return db.scalar(stmt)


def create_inventory(
    db: Session,
    data: InventoryCreate,
) -> Inventory:
    inventory = Inventory(**data.model_dump())

    db.add(inventory)
    db.commit()
    db.refresh(inventory)

    return inventory


def update_inventory(
    db: Session,
    inventory: Inventory,
    data: InventoryUpdate,
) -> Inventory:
    updates = data.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(inventory, field, value)

    db.commit()
    db.refresh(inventory)

    return inventory