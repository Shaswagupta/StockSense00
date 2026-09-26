import pandas as pd

from stocksense_intelligence.forecasting import (
    daily_demand,
    moving_average_forecast,
    forecast_next_days,
)


def test_daily_demand():
    df = pd.DataFrame(
        [
            {"date": "2026-09-01", "quantity": 10},
            {"date": "2026-09-01", "quantity": 20},
            {"date": "2026-09-02", "quantity": 15},
        ]
    )

    result = daily_demand(df)

    assert result.iloc[0]["demand"] == 30
    assert result.iloc[1]["demand"] == 15


def test_moving_average_forecast():
    demand = pd.Series([10, 20, 30, 40, 50])

    assert moving_average_forecast(demand, 3) == 40


def test_forecast_next_days():
    demand = pd.Series([10, 20, 30])

    result = forecast_next_days(demand, days=5, window=3)

    assert len(result) == 5
    assert all(result == 20)