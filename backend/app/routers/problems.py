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
    return items

@router.post("/add", response_model=schemas.ProblemsResponse, status_code=201)
def add_problem(problem: schemas.ProblemsRequest, db: Session = Depends(get_db)):

    db_problem = models.Problem(**problem.model_dump())

    db.add(db_problem)
    db.commit()
    db.refresh(db_problem)

    return db_problem
    

