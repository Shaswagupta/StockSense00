from stocksense_intelligence.analytics.stockout_risk import calculate_stockout_risk
from stocksense_intelligence.anomalies.detector import detect_anomalies
from stocksense_intelligence.forecasting.demand import forecast_next_days
from stocksense_intelligence.optimization.optimizer import optimize_inventory


def analyze_inventory(
    sku: str,
    current_stock: float,
    demand_history: list[float],
    demand_std: float,
    lead_time_days: float,
    maximum_stock: float,
    unit_cost: float,
) -> dict:
    import pandas as pd

    demand = pd.Series(demand_history)

    forecast = forecast_next_days(
        demand,
        days=7,
        window=min(7, len(demand)),
    )

    forecast_daily_demand = float(forecast.mean())

    risk = calculate_stockout_risk(
        sku,
        current_stock,
        forecast_daily_demand,
        lead_time_days,
    )

    optimization = optimize_inventory(
        current_stock,
        forecast_daily_demand,
        demand_std,
        lead_time_days,
        maximum_stock,
        unit_cost,
    )

    anomalies = detect_anomalies(demand_history).tolist()

    return {
        "sku": sku,
        "forecast": forecast.tolist(),
        "stockout_risk": {
            "score": risk.risk_score,
            "level": risk.risk_level,
            "days_until_stockout": risk.days_until_stockout,
        },
        "optimization": {
            "reorder_point": optimization.reorder_point,
            "safety_stock": optimization.safety_stock,
            "reorder_quantity": optimization.reorder_quantity,
        },
        "anomalies": anomalies,
    }