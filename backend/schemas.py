from pydantic import BaseModel


class AlertBase(BaseModel):
    time: str
    file: str
    status: str
    threat: str


class AlertCreate(AlertBase):
    pass


class Alert(AlertBase):
    id: int

    class Config:
        from_attributes = True