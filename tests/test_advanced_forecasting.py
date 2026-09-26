import pandas as pd

from stocksense_intelligence.forecasting.advanced import (
    exponential_smoothing_forecast,
    forecast_confidence,
)


def test_exponential_smoothing_forecast():
    demand = pd.Series([10, 20, 30, 40, 50])

    result = exponential_smoothing_forecast(
        demand,
        alpha=0.3,
        days=5,
    )

    assert len(result) == 5
    assert result.iloc[0] > 10


def test_forecast_confidence():
    demand = pd.Series([20, 20, 20, 20, 20])

    assert forecast_confidence(demand, 20) == 100.0