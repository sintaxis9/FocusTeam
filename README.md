# FocusTeam

Sistema de gestión de empresas y usuarios, pensado para organizaciones que requieren separar y administrar distintos roles dentro de una misma entidad.

---

## BACKEND

A nivel de **Backend** es una API backend desarrollada en Flask, que permite registrar empresas y administrar sus usuarios. Cada empresa hasta el momento de este avance puede tener:

- Un **administrador** que la representa.
- Múltiples **empleados** asociados a ella.

El sistema asegura que cada usuario pertenezca a una empresa específica según su dominio de correo electrónico, y permite la autenticación básica por email y contraseña.

Está pensado para integrarse fácilmente con cualquier frontend moderno (como React o Vue), y ya se encuentra **desplegado y funcional** para pruebas o producción.

En proximos avences se integrara **seguridad** y todo el sistema de asignacion de tareas, que es el objetivo principal de este proyecto.

---

## ⚙️ Tecnologías utilizadas (Backend)

- **Python 3 + Flask** – Framework ligero para APIs.
- **MongoDB Atlas** – Servicio de Base de datos en la nube.
- **PyMongo** – Cliente MongoDB para Python.
- **Werkzeug (scrypt)** – Para hashing seguro de contraseñas.
- **Render** – Plataforma de despliegue del backend.

---
