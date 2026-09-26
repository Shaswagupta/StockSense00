from .engine import analyze_stock


def answer_inventory_query(
    sku: str,
    current_stock: float,
    daily_demand: float,
    lead_time_days: float,
    demand_std: float,
    maximum_stock: float,
    unit_cost: float,
) -> str:
    result = analyze_stock(
        sku,
        current_stock,
        daily_demand,
        lead_time_days,
        demand_std,
        maximum_stock,
        unit_cost,
    )

    risk = result["risk"]
    recommendation = result["recommendation"]

    return (
        f"{sku}: stockout risk is {risk['level']} "
        f"({risk['score']}%). "
        f"Estimated stockout in {risk['days_until_stockout']} days. "
        f"Recommended reorder point is "
        f"{recommendation['reorder_point']:.2f} units, "
        f"with safety stock of "
        f"{recommendation['safety_stock']:.2f} units "
        f"and reorder quantity of "
        f"{recommendation['reorder_quantity']:.2f} units."
    )