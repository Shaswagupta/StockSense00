from stocksense_intelligence.analytics.stockout_risk import (
    calculate_stockout_risk,
)


def test_critical_stockout_risk():
    result = calculate_stockout_risk(
        sku="STEEL-001",
        current_stock=20,
        forecast_daily_demand=10,
        lead_time_days=10,
    )

    assert result.days_until_stockout == 2
    assert result.risk_score == 80
    assert result.risk_level == "CRITICAL"


def test_low_stockout_risk():
    result = calculate_stockout_risk(
        sku="STEEL-002",
        current_stock=200,
        forecast_daily_demand=10,
        lead_time_days=10,
    )

    assert result.risk_score == 0
    assert result.risk_level == "LOW"


def test_zero_demand():
    result = calculate_stockout_risk(
        sku="STEEL-003",
        current_stock=100,
        forecast_daily_demand=0,
        lead_time_days=10,
    )

    assert result.risk_score == 0
    assert result.risk_level == "LOW"
    