from stocksense_intelligence.optimization.optimizer import optimize_inventory


def test_optimize_inventory():
    result = optimize_inventory(
        current_stock=50,
        average_daily_demand=10,
        demand_std=2,
        lead_time_days=5,
        maximum_stock=150,
        unit_cost=50,
    )

    assert result.safety_stock > 0
    assert result.reorder_point > 50
    assert result.reorder_quantity == 100
    assert result.stockout_risk > 0