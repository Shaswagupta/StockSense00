import math


def calculate_safety_stock(
    demand_std: float,
    lead_time_days: float,
    service_level_z: float = 1.65,
) -> float:
    return service_level_z * demand_std * math.sqrt(lead_time_days)


def calculate_stockout_risk(
    current_stock: float,
    forecast_daily_demand: float,
    lead_time_days: float,
    safety_stock: float,
) -> float:
    if forecast_daily_demand <= 0:
        return 0.0

    required_stock = (
        forecast_daily_demand * lead_time_days
        + safety_stock
    )

    if current_stock >= required_stock:
        return 0.0

    risk = 1 - (current_stock / required_stock)

    return round(min(max(risk, 0.0), 1.0) * 100, 2)