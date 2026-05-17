from fastapi import FastAPI
from app.routers import problems, applications
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Interview Prep Tracker", version="1.0.0")

app.include_router(problems.router)
app.include_router(applications.router)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"message": "Start"}