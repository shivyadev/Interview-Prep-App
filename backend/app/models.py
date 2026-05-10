from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base

class Problem(Base):
    __tablename__= "problems"

    id = Column(Integer, primary_key=True, index=True)   
    title = Column(String)
    problem_url = Column(String)
    difficulty = Column(String)
    category = Column(String)
    status = Column(String)
    confidence_level = Column(String)
    date_solved = Column(DateTime)
    time_taken = Column(DateTime)
    solution_type = Column(String)

class Application(Base):
    __tablename__= "applications"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String)
    role = Column(String)
    job_desc_url = Column(String)
    job_type = Column(String)
    location = Column(String)
    status = Column(String)
    source = Column(String)
    date_applied = Column(DateTime)
    interview_date = Column(DateTime)
    interview_type = Column(String)
    rounds_completed = Column(String)
    recruiter_mail = Column(String)
    min_salary = Column(Integer) 
    max_salary = Column(Integer) 




