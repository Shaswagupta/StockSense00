import pandas as pd

from stocksense_intelligence.anomalies.detector import detect_anomalies
from stocksense_intelligence.anomalies.severity import (
    classify_anomaly,
    explain_anomaly,
)


def analyze_demand_anomalies(
    df: pd.DataFrame,
    sku: str,
    warehouse_id: str | None = None,
) -> list[dict]:
    data = df[
        (df["sku"] == sku)
        & (df["transaction_type"] == "DELIVERY")
    ].copy()

    if warehouse_id is not None:
        data = data[
            data["warehouse_id"] == warehouse_id
        ]

    if data.empty:
        return []

    values = data["quantity"].astype(float).tolist()
    predictions = detect_anomalies(values)
    baseline = float(pd.Series(values).median())

    results = []

    for index, value in enumerate(values):
        if predictions[index] != 1:
            continue

        severity = classify_anomaly(
            value,
            baseline,
            threshold=1.0,
        )

        results.append(
            {
                "sku": sku,
                "warehouse_id": warehouse_id,
                "value": value,
                "baseline": baseline,
                "severity": severity,
                "explanation": explain_anomaly(
                    sku,
                    value,
                    baseline,
                    severity,
                ),
            }
        )

    return results