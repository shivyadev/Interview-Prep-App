from pydantic import BaseModel
from datetime import date
from uuid import UUID

class ProblemsBase(BaseModel):

    title: str
    url: str
    difficulty: str 
    category: str
    status: str 
    time_taken: int

class ProblemsRequest(ProblemsBase):
    pass

class ProblemsResponse(ProblemsBase):
    id: UUID
    date_solved: date
    class Config:
        from_attributes = True

class ApplicationsBase(BaseModel):

    company : str
    role : str
    location : str
    location_type: str
    status : str
    source : str
    date_applied: str
    interview_date: str
class ApplicationsRequest(ApplicationsBase):
    pass

class ApplicationResponse(ApplicationsBase):
    id: UUID
    class Config:
        from_attributes = True