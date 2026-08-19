from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import Annotated, List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Mīrāth API")
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        return self.model_dump(by_alias=True, exclude={"id"})

    @classmethod
    def from_mongo(cls, doc: dict):
        doc["_id"] = str(doc["_id"])
        return cls(**doc)


class OrderCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    quantity: int = Field(ge=1, le=10)
    message: Optional[str] = Field(default=None, max_length=1000)


class Order(BaseDocument):
    name: str
    email: str
    quantity: int
    message: Optional[str] = None
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "Mīrāth API — archives vivantes"}


@api_router.post("/orders", response_model=Order, response_model_by_alias=False)
async def create_order(payload: OrderCreate):
    order = Order(
        **payload.model_dump(),
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    result = await db.orders.insert_one(order.to_mongo())
    order.id = str(result.inserted_id)
    return order


@api_router.get("/orders", response_model=List[Order], response_model_by_alias=False)
async def list_orders():
    docs = await db.orders.find().sort("created_at", -1).to_list(200)
    return [Order.from_mongo(doc) for doc in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
