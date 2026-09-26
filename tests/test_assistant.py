from stocksense_intelligence.copilot.assistant import process_query


def test_process_query():
    result = process_query(
        "Will STEEL-001 run out?"
    )

    assert result["intent"] == "STOCKOUT_RISK"
    assert result["sku"] == "STEEL-001"