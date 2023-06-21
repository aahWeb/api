from sqlalchemy import Column, ForeignKey, Integer, String, Table
from db.db import Base
from models.pastries import Pastry
from sqlalchemy.orm import relationship

association_table = Table(
    "pastry_user",
    Base.metadata,
    Column("user_id", ForeignKey("users.id")),
    Column("pastry_id", ForeignKey("pastries.id")),
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    password = Column(String)
    description = Column(String)
    email = Column(String)
    address = Column(String)
    status = Column(String)
    pastries = relationship(
        Pastry,
        secondary=association_table,
        backref="users",
    )