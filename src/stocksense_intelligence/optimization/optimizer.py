from dataclasses import dataclass


@dataclass
class OptimizationResult:
    reorder_point: float
    safety_stock: float
    reorder_quantity: float
    projected_stock: float
    stockout_risk: float


def optimize_inventory(
    current_stock: float,
    average_daily_demand: float,
    demand_std: float,
    lead_time_days: float,
    maximum_stock: float,
    unit_cost: float,
    service_level_z: float = 1.65,
) -> OptimizationResult:
    import math

    safety_stock = (
        service_level_z
        * demand_std
        * math.sqrt(lead_time_days)
    )

    reorder_point = (
        average_daily_demand * lead_time_days
        + safety_stock
    )

    projected_stock = current_stock

    if projected_stock < reorder_point:
        reorder_quantity = max(
            maximum_stock - projected_stock,
            0.0,
        )
    else:
        reorder_quantity = 0.0

    required_stock = reorder_point

    if required_stock <= 0:
        stockout_risk = 0.0
    else:
        stockout_risk = max(
            0.0,
            min(
                100.0,
                (1 - current_stock / required_stock) * 100,
            ),
        )

    return OptimizationResult(
        reorder_point=reorder_point,
        safety_stock=safety_stock,
        reorder_quantity=reorder_quantity,
        projected_stock=projected_stock,
        stockout_risk=round(stockout_risk, 2),
    )