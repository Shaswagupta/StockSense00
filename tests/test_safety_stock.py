from stocksense_intelligence.optimization.safety_stock import (
    calculate_safety_stock,
    calculate_stockout_risk,
)


def test_safety_stock():
    result = calculate_safety_stock(10, 4, 1.65)

    assert round(result, 2) == 33.0


def test_no_stockout_risk():
    assert calculate_stockout_risk(100, 10, 5, 20) == 0.0


def test_stockout_risk():
    result = calculate_stockout_risk(20, 10, 5, 20)

    assert result == 71.43