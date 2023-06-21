from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from models.pastries import Pastry
from schemas.pastries import PastryModel

from models.users import User
from schemas.users import UserModel

from db.db import get_db, Base, engine

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


        ############################
        # Pastries CRUD operations #
        ############################

@app.get("/pastry/{item_id}")
def get_pastry(item_id: int, db: Session = Depends(get_db)):
    pastry = db.query(Pastry).filter(Pastry.id == item_id).first()
    return {"pastry": pastry}

@app.get("/pastries")
def get_pastries(skip: int = 0, limit: int = 3, db: Session = Depends(get_db)):
    pastries = db.query(Pastry).offset(skip).limit(limit).all()
    return {"pastries": pastries}

@app.post("/pastry")
def create_pastry(pastry: PastryModel, db: Session = Depends(get_db)):
    pastry_data = Pastry(**pastry.dict())
    db.add(pastry_data)
    db.commit()
    db.refresh(pastry_data)
    return {"pastry": pastry_data}

@app.put("/pastry/{item_id}")
def update_pastry(item_id: int, pastry: PastryModel, db: Session = Depends(get_db)):
    db.query(Pastry).filter(Pastry.id == item_id).update(pastry.dict())
    db.commit()
    return {"pastry": pastry}

@app.delete("/pastry/{item_id}")
def delete_pastry(item_id: int, db: Session = Depends(get_db)):
    db.query(Pastry).filter(Pastry.id == item_id).delete()
    db.commit()
    return {"message": "Pastry deleted successfully!"}



        ############################
        #   Users CRUD operations  #
        ############################

@app.get("/user/{item_id}")
def get_user(item_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == item_id).first()
    return {"user": user}

@app.get("/users")
def get_users(skip: int = 0, limit: int = 3, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return {"users": users}

@app.post("/user")
def create_user(user: UserModel, db: Session = Depends(get_db)):
    # how to hash password ? (todo)
    user_data = User(**user.dict())
    db.add(user_data)
    db.commit()
    db.refresh(user_data)
    return {"user": user_data}
