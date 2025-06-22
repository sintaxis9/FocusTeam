from app.database import db
from datetime import datetime
from bson import ObjectId

def crear_tarea(data):
    tarea = {
        "titulo": data["titulo"],
        "fecha_inicio": data["fecha_inicio"],
        "fecha_final": data["fecha_final"],
        "descripcion": data["descripcion"],
        "estado": data["estado"],
        "empresa_id": ObjectId(data["empresa_id"]),
        "asignados": [ObjectId(u) for u in data.get("asignados", [])],
        "creado_en": datetime.utcnow()
    }
    result = db.tasks.insert_one(tarea)
    return str(result.inserted_id)


def obtener_tareas_para_usuario(user_id):
    """Devuelve solo las tareas que le han sido asignadas a un usuario específico (empleado o admin)."""
    tareas = list(db.tasks.find({"asignados": ObjectId(user_id)}))
    for t in tareas:
        t["_id"] = str(t["_id"])
        t["empresa_id"] = str(t["empresa_id"])
    return tareas
