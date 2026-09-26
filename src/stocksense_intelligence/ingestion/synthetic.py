import random
from datetime import datetime, timedelta

import pandas as pd


def generate_inventory_events(
    products: int = 20,
    days: int = 180,
    seed: int = 42,
) -> pd.DataFrame:
    random.seed(seed)

    skus = [f"SKU-{i:03d}" for i in range(1, products + 1)]
    warehouses = ["WH-001", "WH-002", "WH-003"]

    start_date = datetime.now() - timedelta(days=days)
    stock = {
        (sku, warehouse): 0
        for sku in skus
        for warehouse in warehouses
    }

    events = []

    for day in range(days):
        date = start_date + timedelta(days=day)

        for sku in skus:
            warehouse = random.choice(warehouses)
            key = (sku, warehouse)

            demand = max(0, int(random.gauss(40, 12)))

            if random.random() < 0.02:
                demand *= random.randint(3, 6)

            events.append(
                {
                    "event_id": f"EVT-{day:04d}-{sku}",
                    "date": date.date(),
                    "sku": sku,
                    "warehouse_id": warehouse,
                    "transaction_type": "DELIVERY",
                    "quantity": demand,
                    "unit_cost": round(
                        random.uniform(40, 500),
                        2,
                    ),
                }
            )

            stock[key] = max(stock[key] - demand, 0)

            if day % random.randint(5, 12) == 0:
                receipt = random.randint(80, 250)

                events.append(
                    {
                        "event_id": f"REC-{day:04d}-{sku}",
                        "date": date.date(),
                        "sku": sku,
                        "warehouse_id": warehouse,
                        "transaction_type": "RECEIPT",
                        "quantity": receipt,
                        "unit_cost": round(
                            random.uniform(40, 500),
                            2,
                        ),
                    }
                )

                stock[key] += receipt

    return pd.DataFrame(events)o