from pydantic import BaseModel
from datetime import date

class ProblemsBase(BaseModel):

    title: str
    problem_url: str
    difficulty: str 
    category: str
    status: str 
    confidence_level: str
    time_taken: int
    solution_type: str 

class ProblemsRequest(ProblemsBase):
    pass

class ProblemsResponse(ProblemsBase):
    id: int
    class Config:
        from_attributes = True

class ApplicationsBase(BaseModel):

    company : str
    role : str
    job_desc_url : str
    job_type : str
    location : str
    status : str
    source : str
    interview_date : date
    interview_type : str
    rounds_completed : str
    recruiter_mail : str
    min_salary : int 
    max_salary : int 

class ApplicationsRequest(ApplicationsBase):
    pass

class ApplicationResponse(ApplicationsBase):
    id: int
    class Config:
        from_attributes = True