def classify_anomaly(
    value: float,
    baseline: float,
    threshold: float = 1.0,
) -> str:
    if baseline == 0:
        return "CRITICAL" if value != 0 else "NORMAL"

    deviation = abs(value - baseline) / abs(baseline)

    if deviation >= threshold:
        return "CRITICAL"

    if deviation >= threshold / 2:
        return "WARNING"

    return "NORMAL"


def explain_anomaly(
    sku: str,
    value: float,
    baseline: float,
    severity: str,
) -> str:
    if value > baseline:
        direction = "above"
    elif value < baseline:
        direction = "below"
    else:
        direction = "equal to"

    return (
        f"{sku}: observed value {value} is {direction} "
        f"baseline {baseline}. Severity: {severity}."
    )