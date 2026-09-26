from stocksense_intelligence.simulation.what_if import simulate_inventory


def test_simulate_inventory():
    result = simulate_inventory(
        current_stock=100,
        daily_demand=10,
        days=5,
        unit_cost=50,
        reorder_point=60,
        maximum_stock=150,
    )

    assert result.projected_stock == 50
    assert result.stockout_days == 10
    assert result.reorder_quantity == 100
    assert result.inventory_value == 2500