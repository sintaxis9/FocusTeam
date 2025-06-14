from app.database import db
from datetime import datetime
from bson import ObjectId

def create_user(data):
    user = {
        "email": data["email"],
        "password": data["password"],
        "empresa_id": ObjectId(data["empresa_id"]) if "empresa_id" in data else None,
        "rol": data.get("rol", "empleado"),
        "created_at": datetime.utcnow()
    }
    result = db.users.insert_one(user)
    return str(result.inserted_id)

def get_user_by_email(email):
    return db.users.find_one({"email": email})

def get_users_by_company(empresa_id):
    return list(db.users.find({"empresa_id": ObjectId(empresa_id)}))
