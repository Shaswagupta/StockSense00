from dataclasses import dataclass


@dataclass
class SupplierOption:
    supplier_id: str
    unit_price: float
    lead_time_days: float
    on_time_rate: float
    rejection_rate: float


def supplier_score(
    supplier: SupplierOption,
    price_weight: float = 0.4,
    lead_time_weight: float = 0.25,
    reliability_weight: float = 0.35,
) -> float:
    price_score = 1 / max(supplier.unit_price, 0.01)
    lead_time_score = 1 / max(supplier.lead_time_days, 0.01)
    reliability_score = (
        supplier.on_time_rate * (1 - supplier.rejection_rate)
    )

    return (
        price_score * price_weight
        + lead_time_score * lead_time_weight
        + reliability_score * reliability_weight
    )


def rank_suppliers(
    suppliers: list[SupplierOption],
) -> list[tuple[SupplierOption, float]]:
    ranked = [
        (supplier, supplier_score(supplier))
        for supplier in suppliers
    ]

    return sorted(
        ranked,
        key=lambda item: item[1],
        reverse=True,
    )