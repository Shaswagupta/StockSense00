import pandas as pd


def prepare_events(df: pd.DataFrame) -> pd.DataFrame:
    data = df.copy()

    data["date"] = pd.to_datetime(data["date"])
    data["quantity"] = pd.to_numeric(data["quantity"])
    data["unit_cost"] = pd.to_numeric(data["unit_cost"])

    data["demand"] = data["quantity"].where(
        data["transaction_type"] == "DELIVERY",
        0.0,
    )

    data["receipt_quantity"] = data["quantity"].where(
        data["transaction_type"] == "RECEIPT",
        0.0,
    )

    data["inventory_change"] = (
        data["receipt_quantity"] - data["demand"]
    )

    return data.sort_values(
        ["sku", "warehouse_id", "date", "event_id"]
    ).reset_index(drop=True)


def daily_demand(df: pd.DataFrame) -> pd.DataFrame:
    data = prepare_events(df)

    return (
        data.groupby(
            ["date", "sku", "warehouse_id"],
            as_index=False,
        )
        .agg(
            demand=("demand", "sum"),
            receipts=("receipt_quantity", "sum"),
        )
        .sort_values(["sku", "warehouse_id", "date"])
        .reset_index(drop=True)
    )


def inventory_position(df: pd.DataFrame) -> pd.DataFrame:
    data = prepare_events(df)

    result = (
        data.groupby(
            ["sku", "warehouse_id"],
            as_index=False,
        )
        .agg(
            total_received=("receipt_quantity", "sum"),
            total_demand=("demand", "sum"),
            inventory_change=("inventory_change", "sum"),
            unit_cost=("unit_cost", "mean"),
        )
    )

    result["estimated_stock"] = (
        300 + result["inventory_change"]
    ).clip(lower=0)

    result["estimated_inventory_value"] = (
        result["estimated_stock"] * result["unit_cost"]
    )

    return result


def sku_demand_history(
    df: pd.DataFrame,
    sku: str,
    warehouse_id: str | None = None,
) -> pd.Series:
    data = daily_demand(df)

    data = data[data["sku"] == sku]

    if warehouse_id is not None:
        data = data[data["warehouse_id"] == warehouse_id]

    return (
        data.groupby("date")["demand"]
        .sum()
        .sort_index()
    )