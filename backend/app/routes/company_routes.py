from flask import Blueprint, request, jsonify
from app.models.user_model import create_user, get_user_by_email
from app.models.company_model import get_company_by_domain, get_users_by_company_id, get_all_companies, create_company
from app.utils.password_hash import hash_password

company_bp = Blueprint('company_bp', __name__)


@company_bp.route("/domain", methods=["GET"])
def get_all_companies_route():
    try:
        companies = get_all_companies()
        for c in companies:
            c["_id"] = str(c["_id"])
            c.pop("created_at", None)

        return jsonify({"companies": companies}), 200

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500


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

@company_bp.route("/domain/<domain>/full-info", methods=["GET"])
def get_company_full_info_by_domain(domain):
    try:
        company = get_company_by_domain(domain)
        if not company:
            return jsonify({"error": "Empresa no encontrada"}), 404

        company_id = company.get("_id")
        if not company_id:
            return jsonify({"error": "ID de empresa inválido"}), 400

        users = get_users_by_company_id(company_id)

        for user in users:
            user["_id"] = str(user["_id"])
            user.pop("password", None)
            user.pop("created_at", None)
            user["empresa_id"] = str(user["empresa_id"])


        company["_id"] = str(company["_id"])
        company.pop("created_at", None)

        return jsonify({
            "company": company,
            "users": users
        }), 200

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500


@company_bp.route("/domain/<domain>/users", methods=["GET"])
def get_company_users_by_domain(domain):
    try:
        company = get_company_by_domain(domain)
        if not company:
            return jsonify({"error": "Empresa no encontrada"}), 404

        company_id = company.get("_id")
        users = get_users_by_company_id(company_id)

        for user in users:
            user["_id"] = str(user["_id"])
            user["empresa_id"] = str(user["empresa_id"])
            user.pop("password", None)
            user.pop("created_at", None)

        return jsonify({"users": users}), 200

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500
    

@company_bp.route("/domain/<domain>/info", methods=["GET"])
def get_company_info_by_domain(domain):
    try:
        company = get_company_by_domain(domain)
        if not company:
            return jsonify({"error": "Empresa no encontrada"}), 404

        company["_id"] = str(company["_id"])
        company.pop("created_at", None)

        return jsonify({"company": company}), 200

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500


@company_bp.route("/register", methods=["POST"])
def register_company_with_admin():
    data = request.get_json()
    name = data.get("name")
    domain = data.get("domain")
    admin_email = data.get("admin_email")
    password = data.get("password")

    if not all([name, domain, admin_email, password]):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    if get_company_by_domain(domain):
        return jsonify({"message": "El dominio ya está registrado"}), 409

    if get_user_by_email(admin_email):
        return jsonify({"message": "El correo de admin ya está en uso"}), 409

    company_id = create_company(name, domain)
    admin_data = {
        "email": admin_email,
        "password": hash_password(password),
        "empresa_id": company_id,
        "rol": "admin"
    }
    user_id = create_user(admin_data)
    return jsonify({
        "message": "Empresa y admin creados exitosamente",
        "company_id": company_id,
        "admin_id": user_id
    }), 201

@company_bp.route("/domain/<domain>/add-employee", methods=["POST"])
def add_employee_to_company(domain):
    data = request.get_json()
    admin_email = data.get("admin_email")
    employee_email = data.get("email")
    password = data.get("password")

    if not admin_email or not employee_email or not password:
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    admin = get_user_by_email(admin_email)
    if not admin or admin.get("rol") != "admin":
        return jsonify({"message": "Admin no válido"}), 404

    dominio_admin = admin_email.split("@")[-1].split(".")[0]
    if dominio_admin != domain:
        return jsonify({"message": "Dominio del admin no coincide con la URL"}), 400

    dominio_empleado = employee_email.split("@")[-1].split(".")[0]
    if dominio_empleado != domain:
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

