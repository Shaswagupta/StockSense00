import pandas as pd

from stocksense_intelligence.analytics.inventory_metrics import (
    inventory_summary,
    inventory_turnover_ratio,
    inventory_value,
    inventory_days,
    stock_turnover,
    days_of_inventory,
)


def test_inventory_summary():
    df = pd.DataFrame(
        [
            {
                "sku": "STEEL-001",
                "warehouse_id": "WH-001",
                "physical_quantity": 100,
                "available_quantity": 80,
                "reserved_quantity": 20,
                "in_transit_quantity": 10,
                "damaged_quantity": 5,
            },
            {
                "sku": "STEEL-001",
                "warehouse_id": "WH-001",
                "physical_quantity": 50,
                "available_quantity": 40,
                "reserved_quantity": 10,
                "in_transit_quantity": 0,
                "damaged_quantity": 2,
            },
        ]
    )

    result = inventory_summary(df)

    assert len(result) == 1
    assert result.iloc[0]["physical_quantity"] == 150


def test_inventory_value():
    df = pd.DataFrame(
        [
            {"physical_quantity": 100, "unit_cost": 50},
            {"physical_quantity": 20, "unit_cost": 100},
        ]
    )

    assert inventory_value(df) == 7000


def test_inventory_turnover_ratio():
    assert inventory_turnover_ratio(100000, 25000) == 4


def test_inventory_days():
    assert inventory_days(25000, 100000) == 91.25


def test_stock_turnover():
    assert stock_turnover(1000, 250) == 4


def test_days_of_inventory():
    assert days_of_inventory(1000, 100) == 10