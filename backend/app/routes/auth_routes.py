from flask import Blueprint, request, jsonify
from app.models.user_model import create_user, get_user_by_email
from app.utils.password_hash import hash_password

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    if get_user_by_email(data["email"]):
        return jsonify({"message": "El usuario ya existe"}), 409

    hashed_pw = hash_password(data["password"])
    user_id = create_user({
        "email": data["email"],
        "password": hashed_pw
    })

    return jsonify({"message": "Usuario creado", "user_id": user_id}), 201
