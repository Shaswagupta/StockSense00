from fastapi import FastAPI

app = FastAPI(
    title="StockSense API",
    description="Inventory Operations and Intelligence Platform",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "StockSense API is running",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "stocksense-api",
    }