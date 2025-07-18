from flask import Blueprint, request, jsonify
from app.models.task_model import (
    crear_tarea,
    obtener_tareas_para_usuario,
    obtener_tareas_con_info_por_empresa
)
from app.models.user_model import get_user_by_email, get_users_by_company
from app.models.company_model import get_company_by_domain

task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/create', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        admin_email = data.get("admin_email")

        if not admin_email:
            return jsonify({"message": "Falta admin_email"}), 400

        admin = get_user_by_email(admin_email)
        if not admin or admin.get("rol") != "admin":
            return jsonify({"message": "No tienes permisos para crear tareas"}), 403

        campos_requeridos = ["titulo", "fecha_inicio", "fecha_final", "descripcion", "estado"]
        if not all(k in data for k in campos_requeridos):
            return jsonify({"message": "Faltan campos obligatorios"}), 400

        empresa_id = str(admin.get("empresa_id"))
        asignados_ids = data.get("asignados") or []

        empleados = get_users_by_company(empresa_id)
        ids_empleados = {str(emp["_id"]) for emp in empleados}

        for u_id in asignados_ids:
            if u_id not in ids_empleados:
                return jsonify({"message": f"Usuario {u_id} no pertenece a tu empresa"}), 400

        if str(admin["_id"]) not in asignados_ids:
            asignados_ids.append(str(admin["_id"]))

        data["empresa_id"] = empresa_id
        data["asignados"] = asignados_ids

        tarea_id = crear_tarea(data)
        return jsonify({"message": "Tarea creada", "id": tarea_id}), 201

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500

@task_bp.route('/by-user', methods=['POST'])
def get_tasks_by_user():
    try:
        data = request.get_json()
        user_email = data.get("email")

        if not user_email:
            return jsonify({"message": "Email es obligatorio"}), 400

        user = get_user_by_email(user_email)
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        tareas = obtener_tareas_para_usuario(user["_id"])
        return jsonify({"tareas": tareas}), 200

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500

@task_bp.route('/company/domain/<domain>/tasks', methods=['GET'])
def get_tasks_by_company(domain):
    try:
        company = get_company_by_domain(domain)
        if not company:
            return jsonify({"message": "Empresa no encontrada"}), 404

        empresa_id = company["_id"]
        tareas = obtener_tareas_con_info_por_empresa(empresa_id)
        return jsonify({"tareas": tareas}), 200

    except Exception as e:
        return jsonify({"error": "Error interno", "detail": str(e)}), 500
