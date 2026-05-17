from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models, app.schemas as schemas

router = APIRouter(prefix="/problems", tags=["problems"])

@router.get("/")
def test():
    return {"message": "Problems Here"}

@router.get("/all", response_model=list[schemas.ProblemsResponse])
def get_all_problems(db: Session = Depends(get_db)):
    items = db.query(models.Problem).all()

    if not items or len(items) <= 0:
        raise HTTPException(status_code=200, detail="No values in the database")

    return items
    

