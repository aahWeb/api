from pydantic import BaseModel

class UserBase(BaseModel):
    id: int
    name: str
    password: str
    description: str
    email: str
    address: str
    status: str

    class Config:
        orm_mode = True
