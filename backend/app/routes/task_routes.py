from flask import Blueprint, jsonify

task_bp = Blueprint('task_bp', __name__)

@task_bp.route('/test', methods=['GET'])
def test_task():
    return jsonify({"message": "Ruta /api/tasks/test activa"})
