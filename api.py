from fastapi import FastAPI
from pydantic import BaseModel

from stocksense_intelligence.optimization.optimizer import optimize_inventory
from stocksense_intelligence.optimization.reorder import (
    calculate_reorder_point,
    calculate_reorder_quantity,
    calculate_stockout_days,
)
from stocksense_intelligence.forecasting.demand import (
    moving_average_forecast,
    forecast_next_days,
)
from stocksense_intelligence.anomalies.detector import detect_anomalies
from stocksense_intelligence.analytics.stockout_risk import (
    calculate_stockout_risk,
)

app = FastAPI(
    title="StockSense Intelligence API",
    version="1.0.0",
)


class ForecastRequest(BaseModel):
    demand: list[float]
    days: int = 7
    window: int = 7


class ReorderRequest(BaseModel):
    average_daily_demand: float
    lead_time_days: float
    safety_stock: float
    current_stock: float
    maximum_stock: float
    incoming_stock: float = 0.0


class RiskRequest(BaseModel):
    sku: str
    current_stock: float
    forecast_daily_demand: float
    lead_time_days: float


class OptimizationRequest(BaseModel):
    current_stock: float
    average_daily_demand: float
    demand_std: float
    lead_time_days: float
    maximum_stock: float
    unit_cost: float


class AnomalyRequest(BaseModel):
    values: list[float]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/forecast")
def forecast(request: ForecastRequest):
    import pandas as pd

    demand = pd.Series(request.demand)

    return {
        "moving_average": moving_average_forecast(
            demand,
            request.window,
        ),
        "forecast": forecast_next_days(
            demand,
            request.days,
            request.window,
        ).tolist(),
    }


@app.post("/reorder")
def reorder(request: ReorderRequest):
    reorder_point = calculate_reorder_point(
        request.average_daily_demand,
        request.lead_time_days,
        request.safety_stock,
    )

    reorder_quantity = calculate_reorder_quantity(
        request.current_stock,
        reorder_point,
        request.maximum_stock,
        request.incoming_stock,
    )

    return {
        "reorder_point": reorder_point,
        "reorder_quantity": reorder_quantity,
        "stockout_days": calculate_stockout_days(
            request.current_stock,
            request.average_daily_demand,
        ),
    }


@app.post("/stockout-risk")
def stockout_risk(request: RiskRequest):
    return calculate_stockout_risk(
        request.sku,
        request.current_stock,
        request.forecast_daily_demand,
        request.lead_time_days,
    )


@app.post("/optimize")
def optimize(request: OptimizationRequest):
    return optimize_inventory(
        current_stock=request.current_stock,
        average_daily_demand=request.average_daily_demand,
        demand_std=request.demand_std,
        lead_time_days=request.lead_time_days,
        maximum_stock=request.maximum_stock,
        unit_cost=request.unit_cost,
    )


@app.post("/anomalies")
def anomalies(request: AnomalyRequest):
    return {
        "anomalies": detect_anomalies(request.values).tolist()
    }
from stocksense_intelligence.copilot.engine import analyze_stock
class CopilotRequest(BaseModel):
    sku: str
    current_stock: float
    daily_demand: float
    lead_time_days: float
    demand_std: float
    maximum_stock: float
    unit_cost: float


@app.post("/copilot/analyze")
def copilot_analyze(request: CopilotRequest):
    return analyze_stock(
        sku=request.sku,
        current_stock=request.current_stock,
        daily_demand=request.daily_demand,
        lead_time_days=request.lead_time_days,
        demand_std=request.demand_std,
        maximum_stock=request.maximum_stock,
        unit_cost=request.unit_cost,
    )
from stocksense_intelligence import analyze_inventory


class InventoryAnalysisRequest(BaseModel):
    sku: str
    current_stock: float
    demand_history: list[float]
    demand_std: float
    lead_time_days: float
    maximum_stock: float
    unit_cost: float


@app.post("/inventory/analyze")
def inventory_analyze(request: InventoryAnalysisRequest):
    return analyze_inventory(
        sku=request.sku,
        current_stock=request.current_stock,
        demand_history=request.demand_history,
        demand_std=request.demand_std,
        lead_time_days=request.lead_time_days,
        maximum_stock=request.maximum_stock,
        unit_cost=request.unit_cost,
    )
from stocksense_intelligence.analytics.dashboard import build_dashboard


@app.get("/dashboard/summary")
def dashboard_summary():
    df = pd.read_csv(
        "data/synthetic/inventory_events.csv"
    )

    return build_dashboard(df)