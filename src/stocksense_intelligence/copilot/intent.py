import re


def detect_intent(query: str) -> str:
    q = query.lower()

    if any(word in q for word in ["stockout", "stock out", "run out"]):
        return "STOCKOUT_RISK"

    if any(word in q for word in ["reorder", "re-order", "buy"]):
        return "REORDER"

    if any(word in q for word in ["forecast", "demand", "future"]):
        return "FORECAST"

    if any(word in q for word in ["anomaly", "unusual", "abnormal"]):
        return "ANOMALY"

    if any(word in q for word in ["inventory", "stock", "available"]):
        return "INVENTORY"

    return "UNKNOWN"


def extract_sku(query: str) -> str | None:
    match = re.search(
        r"\b[A-Z]{2,}[-_]\d+\b",
        query.upper(),
    )

    return match.group(0) if match else None