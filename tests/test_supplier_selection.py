from stocksense_intelligence.optimization.supplier_selection import (
    SupplierOption,
    rank_suppliers,
)


def test_supplier_ranking():
    suppliers = [
        SupplierOption(
            supplier_id="SUP-001",
            unit_price=100,
            lead_time_days=10,
            on_time_rate=0.90,
            rejection_rate=0.05,
        ),
        SupplierOption(
            supplier_id="SUP-002",
            unit_price=80,
            lead_time_days=5,
            on_time_rate=0.95,
            rejection_rate=0.02,
        ),
    ]

    ranked = rank_suppliers(suppliers)

    assert len(ranked) == 2
    assert ranked[0][0].supplier_id == "SUP-002"