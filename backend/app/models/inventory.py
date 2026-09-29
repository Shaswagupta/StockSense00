from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Inventory(Base):
    __tablename__ = "inventory"

    __table_args__ = (
        UniqueConstraint(
            "product_id",
            "location_id",
            name="uq_inventory_product_location",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    product_id: Mapped[int] = mapped_column(
        ForeignKey("products.id"),
        nullable=False,
        index=True,
    )

    location_id: Mapped[int] = mapped_column(
        ForeignKey("locations.id"),
        nullable=False,
        index=True,
    )

    quantity: Mapped[float] = mapped_column(
        Numeric(14, 3),
        default=0,
        nullable=False,
    )

    reserved_quantity: Mapped[float] = mapped_column(
        Numeric(14, 3),
        default=0,
        nullable=False,
    )

    reorder_point: Mapped[float] = mapped_column(
        Numeric(14, 3),
        default=0,
        nullable=False,
    )

    safety_stock: Mapped[float] = mapped_column(
        Numeric(14, 3),
        default=0,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    location = relationship(
        "Location",
        back_populates="inventory_items",
    )

    product = relationship("Product")