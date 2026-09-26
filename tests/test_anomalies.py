import numpy as np

from stocksense_intelligence.anomalies.detector import detect_anomalies


def test_detect_anomalies():
    values = [10, 11, 12, 10, 11, 500]

    result = detect_anomalies(values, contamination=0.2)

    assert len(result) == 6
    assert result[-1] == 1


def test_small_dataset():
    result = detect_anomalies([10, 20])

    assert np.array_equal(result, np.array([0, 0]))