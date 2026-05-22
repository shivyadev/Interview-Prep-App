from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
import app.models as models, app.schemas as schemas

router = APIRouter(prefix="/applications", tags=["applications"])

@router.get("/")
def test():
    return {"message": "Application Here"}

@router.get("/all", response_model=list[schemas.ApplicationResponse])
def get_all_applications(db: Session = Depends(get_db)):
    items = db.query(models.Application).all()
    return items

@router.post("/add", response_model=schemas.ApplicationResponse, status_code=201)
def add_application(application: schemas.ApplicationsRequest, db: Session = Depends(get_db)):

    try:
        db_application = models.Application(**application.model_dump())

        db.add(db_application)
        db.commit()
        db.refresh(db_application)

        return db_application

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.patch("/{id}", response_model= schemas.ApplicationResponse)
async def edit_problem(id: str, application: schemas.ApplicationsRequest, db: Session = Depends(get_db)):
    db_application = db.query(models.Application).filter(models.Application.id == id).first()
    if not db_application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    for field, value in application.model_dump(exclude_unset=True).items():
        setattr(db_application, field, value)

    db.commit()
    db.refresh(db_application)
    return db_application

@router.delete("/{application_id}")
def delete_problem(application_id: str, db: Session = Depends(get_db)):
    application = db.query(models.Application).filter(models.Application.id == application_id).first()
    
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    db.delete(application)
    db.commit()
    
    return {"message": "Application deleted successfully"}


