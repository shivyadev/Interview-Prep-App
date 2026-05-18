from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
import uuid
from datetime import date

class Problem(Base):
    __tablename__= "problems"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)  
    title = Column(String)
    url = Column(String)
    difficulty = Column(String)
    category = Column(String)
    status = Column(String)
    date_solved = Column(Date, default=date.today)
    time_taken = Column(Integer)

class Application(Base):
    __tablename__= "applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    company = Column(String)
    role = Column(String)
    job_desc_url = Column(String)
    job_type = Column(String)
    location = Column(String)
    status = Column(String)
    source = Column(String)
    date_applied = Column(String)
    interview_date = Column(String)
    interview_type = Column(String)
    rounds_completed = Column(String)
    recruiter_mail = Column(String)
    min_salary = Column(Integer) 
    max_salary = Column(Integer) 




