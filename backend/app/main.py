from fastapi import FastAPI
from app.routers import problems, applications
from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Interview Prep Tracker", version="1.0.0")

app.include_router(problems.router)
app.include_router(applications.router)


@app.get("/")
def root():
    return {"message": "Start"}