import numpy as np
import pandas as pd


def exponential_smoothing_forecast(
    demand: pd.Series,
    alpha: float = 0.3,
    days: int = 7,
) -> pd.Series:
    if demand.empty:
        return pd.Series(dtype=float)

    level = float(demand.iloc[0])

    for value in demand.iloc[1:]:
        level = alpha * float(value) + (1 - alpha) * level

    return pd.Series(
        [level] * days,
        index=range(1, days + 1),
        name="forecast",
    )


def forecast_confidence(
    demand: pd.Series,
    forecast: float,
) -> float:
    if demand.empty:
        return 0.0

    std = float(np.std(demand))

    if forecast <= 0:
        return 0.0

    confidence = max(0.0, 1.0 - (std / forecast))

    return round(min(confidence, 1.0) * 100, 2)