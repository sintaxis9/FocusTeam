from app.database import db
from datetime import datetime
from bson import ObjectId

def convert_objectids_to_str(obj):
    if isinstance(obj, list):
        return [convert_objectids_to_str(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_objectids_to_str(v) for k, v in obj.items()}
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj

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
    """Devuelve solo las tareas asignadas a un usuario específico."""
    if isinstance(user_id, str):
        user_id = ObjectId(user_id)

    tareas = list(db.tasks.find({"asignados": user_id}))
    for t in tareas:
        t["_id"] = str(t["_id"])
        t["empresa_id"] = str(t["empresa_id"])
        t["asignados"] = [str(u) for u in t.get("asignados", [])]
    return tareas

def obtener_tareas_con_info_por_empresa(empresa_id):
    """Devuelve todas las tareas de una empresa, mostrando emails de asignados y admin creador."""
    if isinstance(empresa_id, str):
        empresa_id = ObjectId(empresa_id)

    pipeline = [
        {"$match": {"empresa_id": empresa_id}},
        {"$lookup": {
            "from": "users",
            "localField": "asignados",
            "foreignField": "_id",
            "as": "empleados"
        }},
        {"$lookup": {
            "from": "users",
            "let": {"empresa_id": "$empresa_id"},
            "pipeline": [
                {"$match": {
                    "$expr": {"$eq": ["$empresa_id", "$$empresa_id"]},
                    "rol": "admin"
                }}
            ],
            "as": "admins_empresa"
        }}
    ]

    tareas = list(db.tasks.aggregate(pipeline))

    for t in tareas:
        empleados_emails = [emp.get("email") for emp in t.get("empleados", [])]

        admin_email = None
        for admin in t.get("admins_empresa", []):
            if admin.get("rol") == "admin":
                admin_email = admin.get("email")
                break

        t.pop("empleados", None)
        t.pop("admins_empresa", None)

        t["asignados_emails"] = empleados_emails
        t["admin_email"] = admin_email

    tareas = [convert_objectids_to_str(t) for t in tareas]

    return tareas
