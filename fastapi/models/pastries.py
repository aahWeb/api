from sqlalchemy import Boolean, Column, Integer, String
from db.db import Base

class Pastry(Base):
    __tablename__ = "pastries"
    id = Column(Integer, primary_key=True, index=True)
    ref = Column(String)
    name = Column(String)
    description = Column(String)
    quantity = Column(Integer)
    orders = Column(Integer)
    likes = Column(String)
    tags = Column(String)
    url = Column(String)
    choice = Column(Boolean)