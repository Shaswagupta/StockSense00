from dataclasses import dataclass


@dataclass
class StockoutRisk:
    sku: str
    current_stock: float
    forecast_daily_demand: float
    lead_time_days: float
    days_until_stockout: float
    risk_score: float
    risk_level: str


def calculate_stockout_risk(
    sku: str,
    current_stock: float,
    forecast_daily_demand: float,
    lead_time_days: float,
) -> StockoutRisk:
    if forecast_daily_demand <= 0:
        days_until_stockout = float("inf")
        risk_score = 0.0
    else:
        days_until_stockout = current_stock / forecast_daily_demand
        coverage_ratio = days_until_stockout / max(lead_time_days, 1)

        risk_score = max(
            0.0,
            min(100.0, (1 - coverage_ratio) * 100),
        )

    if risk_score >= 75:
        risk_level = "CRITICAL"
    elif risk_score >= 40:
        risk_level = "HIGH"
    elif risk_score > 0:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return StockoutRisk(
        sku=sku,
        current_stock=current_stock,
        forecast_daily_demand=forecast_daily_demand,
        lead_time_days=lead_time_days,
        days_until_stockout=days_until_stockout,
        risk_score=round(risk_score, 2),
        risk_level=risk_level,
    )