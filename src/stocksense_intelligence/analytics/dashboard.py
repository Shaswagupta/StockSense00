import pandas as pd

from stocksense_intelligence.analytics.intelligence import analyze_sku
from stocksense_intelligence.anomalies.pipeline import analyze_demand_anomalies


def build_dashboard(
    df: pd.DataFrame,
    lead_time_days: float = 7.0,
    maximum_stock: float = 500.0,
) -> dict:
    rows = []
    alerts = []

    for sku in sorted(df["sku"].unique()):
        for warehouse in sorted(
            df[df["sku"] == sku]["warehouse_id"].unique()
        ):
            result = analyze_sku(
                df,
                sku,
                warehouse,
                lead_time_days,
                maximum_stock,
            )

            rows.append(result)

            if result["stockout_risk"]["level"] in {"CRITICAL", "HIGH"}:
                alerts.append({
                    "type": "STOCKOUT_RISK",
                    "severity": result["stockout_risk"]["level"],
                    "sku": sku,
                    "warehouse_id": warehouse,
                })

            anomalies = analyze_demand_anomalies(
                df,
                sku,
                warehouse,
            )

            for anomaly in anomalies:
                alerts.append({
                    "type": "DEMAND_ANOMALY",
                    "severity": anomaly["severity"],
                    "sku": sku,
                    "warehouse_id": warehouse,
                    "message": anomaly["explanation"],
                })

    critical = sum(
        row["stockout_risk"]["level"] == "CRITICAL"
        for row in rows
    )

    return {
        "total_sku_warehouse_pairs": len(rows),
        "critical_stockout_risks": critical,
        "total_alerts": len(alerts),
        "alerts": alerts,
        "inventory_analysis": rows,
    }