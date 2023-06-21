from pydantic import BaseModel

class PastryModel(BaseModel):
    id: int
    ref: str
    name: str
    description: str
    quantity: int
    orders: int
    likes: str
    tags: str
    url: str
    choice: bool

    class Config:
        orm_mode = True