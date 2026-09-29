from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.api.inventory import router as inventory_router
from app.api.stock import router as stock_router
from app.api.intelligence import router as intelligence_router
from app.core.database import get_db


app = FastAPI(
    title="StockSense API",
    description="Inventory Operations and Intelligence Platform",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(inventory_router)
app.include_router(intelligence_router)
app.include_router(stock_router)

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