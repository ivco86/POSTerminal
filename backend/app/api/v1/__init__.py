from fastapi import APIRouter
from app.api.v1 import auth, products

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(products.router, prefix="/products", tags=["products"])
