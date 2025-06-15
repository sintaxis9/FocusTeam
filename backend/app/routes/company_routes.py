from flask import Blueprint, request, jsonify
from app.models.user_model import create_user, get_user_by_email, get_users_by_empresa_id
from app.models.company_model import get_company_by_id, get_company_by_domain
from app.utils.password_hash import hash_password

company_bp = Blueprint('company_bp', __name__)

@company_bp.route('/add-employee', methods=['POST'])
def add_employee():
    data = request.get_json()

    admin_email = data.get("admin_email")
    employee_email = data.get("email")
    password = data.get("password")

    if not admin_email or not employee_email or not password:
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    admin = get_user_by_email(admin_email)
    if not admin or admin.get("rol") != "admin":
        return jsonify({"message": "Admin no válido"}), 404

    dominio_empresa = admin_email.split("@")[-1]
    dominio_empleado = employee_email.split("@")[-1]
    if dominio_empleado != dominio_empresa:
        return jsonify({"message": "El correo del empleado debe tener el dominio de la empresa"}), 400

    if get_user_by_email(employee_email):
        return jsonify({"message": "El usuario ya existe"}), 409

    empleado_data = {
        "email": employee_email,
        "password": hash_password(password),
        "empresa_id": admin.get("empresa_id"),
        "rol": "empleado"
    }

    user_id = create_user(empleado_data)
    return jsonify({"message": "Empleado creado", "user_id": user_id}), 201

@company_bp.route('/by-domain/<string:domain>', methods=['GET'])
def get_company_by_domain_route(domain):
    company = get_company_by_domain(domain)
    if not company:
        return jsonify({"message": "Empresa no encontrada"}), 404
    return jsonify({
        "id": str(company["_id"]),
        "name": company["name"],
        "domain": company["domain"]
    }), 200

@company_bp.route('/<empresa_id>/employees', methods=['GET'])
def get_employees_by_empresa_id(empresa_id):
    empleados = get_users_by_empresa_id(empresa_id, role="empleado")
    return jsonify([
        {
            "id": str(emp["_id"]),
            "email": emp["email"],
            "rol": emp["rol"]
        }
        for emp in empleados
    ]), 200
