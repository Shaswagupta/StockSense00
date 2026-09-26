from stocksense_intelligence.copilot.intent import (
    detect_intent,
    extract_sku,
)


def test_stockout_intent():
    assert detect_intent(
        "Will STEEL-001 run out?"
    ) == "STOCKOUT_RISK"


def test_reorder_intent():
    assert detect_intent(
        "Should I reorder STEEL-001?"
    ) == "REORDER"


def test_forecast_intent():
    assert detect_intent(
        "What is the demand forecast?"
    ) == "FORECAST"


def test_anomaly_intent():
    assert detect_intent(
        "Find unusual inventory movements"
    ) == "ANOMALY"


def test_extract_sku():
    assert extract_sku(
        "Show me STEEL-001 stock"
    ) == "STEEL-001"