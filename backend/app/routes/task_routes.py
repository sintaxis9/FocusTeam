# task_routes.py
from flask import Blueprint, request, jsonify
from app.models.task_model import crear_tarea, obtener_tareas_por_empresa
from app.models.user_model import get_user_by_email

task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/create', methods=['POST'])
def create_task():
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

    data["empresa_id"] = str(admin.get("empresa_id"))  
    tarea_id = crear_tarea(data)
    return jsonify({"message": "Tarea creada", "id": tarea_id}), 201

@task_bp.route('/by-user', methods=['POST'])
def get_tasks_by_user():
    data = request.get_json()
    user_email = data.get("email")

    if not user_email:
        return jsonify({"message": "Email es obligatorio"}), 400

    user = get_user_by_email(user_email)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    empresa_id = str(user.get("empresa_id"))
    tareas = obtener_tareas_por_empresa(empresa_id)

    return jsonify({"tareas": tareas}), 200
