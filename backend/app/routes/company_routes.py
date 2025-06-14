from flask import Blueprint, request, jsonify
from app.models.company_model import create_company, get_company_by_domain
from app.models.user_model import create_user, get_user_by_email
from app.utils.password_hash import hash_password

company_bp = Blueprint('company_bp', __name__)

@company_bp.route('/register', methods=['POST'])
def register_company():
    data = request.get_json()

    nombre_empresa = data.get("nombre_empresa")
    dominio = data.get("dominio")  # Ej: "company1"
    email = data.get("email")      # Ej: "admin@company1.cl"
    password = data.get("password")

    if not all([nombre_empresa, dominio, email, password]):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    if get_company_by_domain(dominio):
        return jsonify({"message": "El dominio ya está registrado"}), 409

    if not email.endswith(f"@{dominio}.cl"):
        return jsonify({"message": "El correo debe usar el dominio ingresado (ej: admin@company1.cl)"}), 400

    if get_user_by_email(email):
        return jsonify({"message": "El correo ya está registrado como usuario"}), 409

    # Crear empresa
    empresa_id = create_company(nombre_empresa, dominio)

    # Crear usuario administrador
    hashed_pw = hash_password(password)
    admin_id = create_user({
        "email": email,
        "password": hashed_pw,
        "rol": "admin",
        "empresa_id": empresa_id
    })

    return jsonify({"message": "Empresa y administrador creados", "empresa_id": empresa_id, "admin_id": admin_id}), 201
