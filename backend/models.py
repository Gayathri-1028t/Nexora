from sqlalchemy import Column, Integer, String
from database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    time = Column(String, nullable=False)
    file = Column(String, nullable=False)
    status = Column(String, nullable=False)
    threat = Column(String, nullable=False)