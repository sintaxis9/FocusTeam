from app.database import db
from datetime import datetime

def create_user(data):
    user = {
        "email": data["email"],
        "password": data["password"],
        "created_at": datetime.utcnow()
    }
    result = db.users.insert_one(user)
    return str(result.inserted_id)

def get_user_by_email(email):
    return db.users.find_one({"email": email})
