from stocksense_intelligence.optimization.reorder import (
    calculate_reorder_point,
    calculate_reorder_quantity,
    calculate_stockout_days,
)


def test_reorder_point():
    assert calculate_reorder_point(10, 5, 20) == 70


def test_reorder_quantity():
    assert calculate_reorder_quantity(30, 50, 100) == 70


def test_no_reorder_when_stock_is_sufficient():
    assert calculate_reorder_quantity(80, 50, 100) == 0


def test_stockout_days():
    assert calculate_stockout_days(100, 20) == 5


def test_zero_demand():
    assert calculate_stockout_days(100, 0) == float("inf")