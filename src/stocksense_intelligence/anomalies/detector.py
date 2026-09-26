import numpy as np
from sklearn.ensemble import IsolationForest


def detect_anomalies(
    values: list[float],
    contamination: float = 0.1,
) -> np.ndarray:
    if len(values) < 3:
        return np.zeros(len(values), dtype=int)

    data = np.array(values).reshape(-1, 1)

    model = IsolationForest(
        contamination=contamination,
        random_state=42,
    )

    predictions = model.fit_predict(data)

    return np.where(predictions == -1, 1, 0)