from stocksense_intelligence.analytics.stockout_risk import calculate_stockout_risk
from stocksense_intelligence.optimization.optimizer import optimize_inventory


def analyze_stock(
    sku: str,
    current_stock: float,
    daily_demand: float,
    lead_time_days: float,
    demand_std: float,
    maximum_stock: float,
    unit_cost: float,
) -> dict:
    risk = calculate_stockout_risk(
        sku,
        current_stock,
        daily_demand,
        lead_time_days,
    )

    optimization = optimize_inventory(
        current_stock,
        daily_demand,
        demand_std,
        lead_time_days,
        maximum_stock,
        unit_cost,
    )

    return {
        "sku": sku,
        "risk": {
            "score": risk.risk_score,
            "level": risk.risk_level,
            "days_until_stockout": risk.days_until_stockout,
        },
        "recommendation": {
            "reorder_point": optimization.reorder_point,
            "safety_stock": optimization.safety_stock,
            "reorder_quantity": optimization.reorder_quantity,
        },
    }