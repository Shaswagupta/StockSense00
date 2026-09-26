from stocksense_intelligence.anomalies.severity import (
    classify_anomaly,
    explain_anomaly,
)


def test_normal_anomaly():
    assert classify_anomaly(110, 100) == "NORMAL"


def test_warning_anomaly():
    assert classify_anomaly(160, 100) == "WARNING"


def test_critical_anomaly():
    assert classify_anomaly(300, 100) == "CRITICAL"


def test_zero_baseline():
    assert classify_anomaly(10, 0) == "CRITICAL"


def test_explanation():
    result = explain_anomaly(
        "STEEL-001",
        300,
        100,
        "CRITICAL",
    )

    assert "STEEL-001" in result
    assert "CRITICAL" in result