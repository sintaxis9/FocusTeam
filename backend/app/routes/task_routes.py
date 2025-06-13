from flask import Blueprint, request, jsonify
from app.models.task_model import crear_tarea, obtener_todas_las_tareas
from datetime import datetime

task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/test', methods=['GET'])
def test_task():
    tarea = {
        "titulo": "Test de conexión",
        "fecha_inicio": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "fecha_final": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "descripcion": "Esto es una tarea de prueba para verificar conexión.",
        "estado": "pendiente"
    }
    return jsonify(tarea), 200

@task_bp.route('/', methods=['POST'])
def post_tarea():
    data = request.get_json()
    campos_requeridos = ["titulo", "fecha_inicio", "fecha_final", "descripcion", "estado"]

    if not data or not all(k in data for k in campos_requeridos):
        return jsonify({"message": "Faltan campos obligatorios"}), 400

    tarea_id = crear_tarea(data)
    return jsonify({"message": "Tarea creada", "id": tarea_id}), 201

@task_bp.route('/', methods=['GET'])
def get_tareas():
    tareas = obtener_todas_las_tareas()
    return jsonify(tareas), 200
