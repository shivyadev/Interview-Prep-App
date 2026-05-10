from fastapi import FastAPI
from app.routers import problems

app = FastAPI()
app.include_router(problems.router)

@app.get("/")
def root():
    return {"message": "Start"}