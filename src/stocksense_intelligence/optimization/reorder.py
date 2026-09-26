def calculate_reorder_point(
    average_daily_demand: float,
    lead_time_days: float,
    safety_stock: float,
) -> float:
    return (
        average_daily_demand * lead_time_days
        + safety_stock
    )


def calculate_reorder_quantity(
    current_stock: float,
    reorder_point: float,
    maximum_stock: float,
    incoming_stock: float = 0.0,
) -> float:
    projected_stock = current_stock + incoming_stock

    if projected_stock >= reorder_point:
        return 0.0

    return max(maximum_stock - projected_stock, 0.0)


def calculate_stockout_days(
    current_stock: float,
    average_daily_demand: float,
) -> float:
    if average_daily_demand <= 0:
        return float("inf")

    return current_stock / average_daily_demand