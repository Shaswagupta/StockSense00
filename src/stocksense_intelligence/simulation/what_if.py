from dataclasses import dataclass


@dataclass
class SimulationResult:
    projected_stock: float
    stockout_days: float
    reorder_quantity: float
    inventory_value: float


def simulate_inventory(
    current_stock: float,
    daily_demand: float,
    days: int,
    unit_cost: float,
    reorder_point: float,
    maximum_stock: float,
) -> SimulationResult:
    projected_stock = max(
        current_stock - (daily_demand * days),
        0.0,
    )

    stockout_days = (
        current_stock / daily_demand
        if daily_demand > 0
        else float("inf")
    )

    reorder_quantity = (
        max(maximum_stock - projected_stock, 0.0)
        if projected_stock < reorder_point
        else 0.0
    )

    inventory_value = projected_stock * unit_cost

    return SimulationResult(
        projected_stock=projected_stock,
        stockout_days=stockout_days,
        reorder_quantity=reorder_quantity,
        inventory_value=inventory_value,
    )