from app.database import db
from datetime import datetime

def crear_tarea(data):
    tarea = {
        "titulo": data["titulo"],
        "fecha_inicio": data["fecha_inicio"],
        "fecha_final": data["fecha_final"],
        "descripcion": data["descripcion"],
        "estado": data["estado"],
        "creado_en": datetime.utcnow()
    }
    result = db.tasks.insert_one(tarea)
    return str(result.inserted_id)

def obtener_todas_las_tareas():
    tareas = list(db.tasks.find())
    for t in tareas:
        t["_id"] = str(t["_id"])
    return tareas
