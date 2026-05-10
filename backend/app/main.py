from fastapi import FastAPI
from app.routers import problems
from app.database import Base, engine
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Interview Prep Tracker", version="1.0.0")

app.include_router(problems.router)

@app.get("/")
def root():
    return {"message": "Start"}