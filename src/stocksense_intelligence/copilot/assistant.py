from .intent import detect_intent, extract_sku


def process_query(query: str) -> dict:
    return {
        "query": query,
        "intent": detect_intent(query),
        "sku": extract_sku(query),
    }