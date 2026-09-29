from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.inventory import Inventory
from app.models.product import Product
from app.models.stock_movement import StockMovement


def get_low_stock(db: Session):
    stmt = (
        select(Inventory, Product)
        .join(Product, Product.id == Inventory.product_id)
        .where(
            Inventory.quantity <= Inventory.reorder_point,
            Product.is_active.is_(True),
        )
    )

    rows = db.execute(stmt).all()

    results = []

    for inventory, product in rows:
        results.append(
            {
                "product_id": product.id,
                "sku": product.sku,
                "product_name": product.name,
                "location_id": inventory.location_id,
                "current_stock": inventory.quantity,
                "reorder_point": inventory.reorder_point,
                "safety_stock": inventory.safety_stock,
                "shortage_to_reorder_point": max(
                    inventory.reorder_point - inventory.quantity,
                    0,
                ),
                "status": "LOW_STOCK",
            }
        )

    return results


def get_reorder_recommendations(db: Session):
    low_stock = get_low_stock(db)

    recommendations = []

    for item in low_stock:
        recommendations.append(
            {
                **item,
                "recommendation": (
                    f"Consider replenishing {item['product_name']} "
                    f"to restore stock above the reorder point."
                ),
            }
        )

    return recommendations


def get_inventory_summary(db: Session):
    inventories = db.scalars(select(Inventory)).all()

    total_skus = len(
        {inventory.product_id for inventory in inventories}
    )

    total_units = sum(
        inventory.quantity for inventory in inventories
    )

    total_reserved = sum(
        inventory.reserved_quantity for inventory in inventories
    )

    low_stock_count = len(get_low_stock(db))

    return {
        "total_inventory_records": len(inventories),
        "total_skus": total_skus,
        "total_units": total_units,
        "total_reserved_units": total_reserved,
        "low_stock_items": low_stock_count,
    }


def get_stock_velocity(
    db: Session,
    product_id: int,
    days: int = 30,
):
    since = datetime.now(timezone.utc) - timedelta(days=days)

    stmt = select(StockMovement).where(
        StockMovement.product_id == product_id,
        StockMovement.movement_type == "ISSUE",
        StockMovement.created_at >= since,
    )

    movements = db.scalars(stmt).all()

    total_issued = sum(
        movement.quantity for movement in movements
    )

    average_daily_usage = total_issued / days

    return {
        "product_id": product_id,
        "analysis_period_days": days,
        "total_issued": total_issued,
        "average_daily_usage": round(average_daily_usage, 2),
        "movement_count": len(movements),
    }