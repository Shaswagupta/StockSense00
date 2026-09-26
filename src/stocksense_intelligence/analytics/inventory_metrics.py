import pandas as pd


def inventory_summary(df: pd.DataFrame) -> pd.DataFrame:
    return (
        df.groupby(["sku", "warehouse_id"], as_index=False)
        .agg(
            physical_quantity=("physical_quantity", "sum"),
            available_quantity=("available_quantity", "sum"),
            reserved_quantity=("reserved_quantity", "sum"),
            in_transit_quantity=("in_transit_quantity", "sum"),
            damaged_quantity=("damaged_quantity", "sum"),
        )
    )


def inventory_value(df: pd.DataFrame) -> float:
    return float((df["physical_quantity"] * df["unit_cost"]).sum())


def stock_turnover(
    total_consumption: float,
    average_inventory: float,
) -> float:
    if average_inventory <= 0:
        return 0.0

    return total_consumption / average_inventory


def days_of_inventory(
    average_inventory: float,
    daily_consumption: float,
) -> float:
    if daily_consumption <= 0:
        return 0.0

    return average_inventory / daily_consumption
def inventory_turnover_ratio(
    cost_of_goods_sold: float,
    average_inventory_value: float,
) -> float:
    if average_inventory_value <= 0:
        return 0.0

    return cost_of_goods_sold / average_inventory_value


def inventory_days(
    average_inventory_value: float,
    cost_of_goods_sold: float,
    periods_per_year: int = 365,
) -> float:
    if cost_of_goods_sold <= 0:
        return 0.0

    return (
        average_inventory_value
        / cost_of_goods_sold
        * periods_per_year
    )