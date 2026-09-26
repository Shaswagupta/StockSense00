import pandas as pd

from stocksense_intelligence.analytics.stockout_risk import (
    calculate_stockout_risk,
)
from stocksense_intelligence.forecasting.demand import (
    moving_average_forecast,
)
from stocksense_intelligence.ingestion.features import (
    inventory_position,
    sku_demand_history,
)
from stocksense_intelligence.optimization.optimizer import (
    optimize_inventory,
)


def analyze_sku(
    df: pd.DataFrame,
    sku: str,
    warehouse_id: str,
    lead_time_days: float = 7.0,
    maximum_stock: float = 500.0,
    unit_cost: float | None = None,
) -> dict:
    demand = sku_demand_history(
        df,
        sku,
        warehouse_id,
    )

    positions = inventory_position(df)

    position = positions[
        (positions["sku"] == sku)
        & (positions["warehouse_id"] == warehouse_id)
    ]

    if position.empty:
        raise ValueError(
            f"No inventory data found for {sku} in {warehouse_id}."
        )

    current_stock = float(
        position.iloc[0]["estimated_stock"]
    )

    if unit_cost is None:
        unit_cost = float(
            position.iloc[0]["unit_cost"]
        )

    window = min(7, len(demand))

    daily_demand = moving_average_forecast(
        demand,
        window,
    )

    demand_std = float(demand.std()) if len(demand) > 1 else 0.0

    risk = calculate_stockout_risk(
        sku,
        current_stock,
        daily_demand,
        lead_time_days,
    )

    optimization = optimize_inventory(
        current_stock=current_stock,
        average_daily_demand=daily_demand,
        demand_std=demand_std,
        lead_time_days=lead_time_days,
        maximum_stock=maximum_stock,
        unit_cost=unit_cost,
    )

    return {
        "sku": sku,
        "warehouse_id": warehouse_id,
        "current_stock": round(current_stock, 2),
        "daily_demand": round(daily_demand, 2),
        "days_until_stockout": round(
            risk.days_until_stockout,
            2,
        ),
        "stockout_risk": {
            "score": risk.risk_score,
            "level": risk.risk_level,
        },
        "reorder": {
            "reorder_point": round(
                optimization.reorder_point,
                2,
            ),
            "safety_stock": round(
                optimization.safety_stock,
                2,
            ),
            "reorder_quantity": round(
                optimization.reorder_quantity,
                2,
            ),
        },
    }