from enum import Enum

from pydantic import BaseModel, Field


class LocationType(str, Enum):
    WAREHOUSE = "WAREHOUSE"
    ZONE = "ZONE"
    AISLE = "AISLE"
    RACK = "RACK"
    SHELF = "SHELF"
    BIN = "BIN"


class LocationStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    BLOCKED = "BLOCKED"


class Location(BaseModel):
    warehouse_id: str = Field(min_length=1)
    location_id: str = Field(min_length=1)
    name: str = Field(min_length=1)
    location_type: LocationType
    zone: str | None = None
    aisle: str | None = None
    rack: str | None = None
    shelf: str | None = None
    bin: str | None = None
    status: LocationStatus = LocationStatus.ACTIVE