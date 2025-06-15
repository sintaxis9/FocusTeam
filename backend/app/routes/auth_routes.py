from flask import Blueprint, request, jsonify
from app.models.user_model import get_user_by_email
from app.utils.password_hash import verify_password

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email y contraseña son obligatorios"}), 400

    user = get_user_by_email(email)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    if not verify_password(password, user["password"]):
        return jsonify({"message": "Contraseña incorrecta"}), 401

    user_info = {
        "id": str(user["_id"]),
        "email": user["email"],
        "rol": user["rol"],
        "empresa_id": str(user["empresa_id"]),
    }

    return jsonify({"message": "Login exitoso", "user": user_info}), 200
