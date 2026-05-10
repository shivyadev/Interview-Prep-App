from fastapi import APIRouter

router = APIRouter(prefix="/problems", tags=["problems"])

@router.get("/")
def test():
    return {"message": "Problems Here"}