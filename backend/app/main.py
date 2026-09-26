from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import get_db


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


@app.get("/health/db")
def database_health(db: Session = Depends(get_db)):
    result = db.execute(text("SELECT current_database()"))
    database_name = result.scalar_one()

    return {
        "status": "healthy",
        "database": database_name,
    }