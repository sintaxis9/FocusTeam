import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from app.routes.auth_routes import auth_bp
from app.routes.task_routes import task_bp

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY"),
        SECRET_KEY=os.getenv("SECRET_KEY")
    )

    CORS(app)
    JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(task_bp, url_prefix="/api/tasks")

    return app

app = create_app()
