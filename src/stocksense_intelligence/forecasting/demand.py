import pandas as pd


def daily_demand(
    df: pd.DataFrame,
    date_column: str = "date",
    quantity_column: str = "quantity",
) -> pd.DataFrame:
    data = df.copy()
    data[date_column] = pd.to_datetime(data[date_column])

    return (
        data.groupby(data[date_column].dt.date)[quantity_column]
        .sum()
        .reset_index(name="demand")
    )


def moving_average_forecast(
    demand: pd.Series,
    window: int = 7,
) -> float:
    if demand.empty:
        return 0.0

    window = min(window, len(demand))

    return float(demand.tail(window).mean())


def forecast_next_days(
    demand: pd.Series,
    days: int = 7,
    window: int = 7,
) -> pd.Series:
    forecast_value = moving_average_forecast(demand, window)

    return pd.Series(
        [forecast_value] * days,
        index=range(1, days + 1),
        name="forecast",
    )