# FocusTeam

Sistema de gestión de empresas y usuarios, pensado para organizaciones que requieren separar y administrar distintos roles dentro de una misma entidad.

---

## FRONTEND

A nivel de **Frontend**, FocusTeam ofrece una interfaz web amigable y clara, pensada para dos tipos de usuarios: **administradores** y **empleados**.

### 🏠 Página de Inicio

Desde la página principal, los usuarios pueden:

- **Iniciar sesión** como administrador o empleado.
- **Registrar una nueva empresa** si aún no existen en el sistema.

![Home](https://cdn.discordapp.com/attachments/1221978128952332289/1383939710686330950/image.png?ex=68509dcb&is=684f4c4b&hm=9cacb031d07e107486271fe22edd01b78d3c86213d2b5449897977faa14245ed&)

---

### 🔐 Inicio de Sesión

El inicio de sesión solicita:

- Correo electrónico (ej: `admin@empresax.cl`)
- Contraseña

El sistema identifica la empresa automáticamente a partir del **dominio del correo electrónico** (por ejemplo, `empresax` en `admin@empresax.cl`).

![Login](https://cdn.discordapp.com/attachments/1221978128952332289/1383940081693364265/image.png?ex=68509e23&is=684f4ca3&hm=069ed393f7fe7fc2cbe62a6e2959e11bda4af644176f9f66edfe5b561868e728&)

---

### 🧑‍💼 Vista de Administrador

Al iniciar sesión como **administrador**, el usuario accede a un panel completo que permite la gestión de su empresa. Las secciones disponibles incluyen:

- **Panel de control general**
- **Gestión de empleados**
- **Gestión de tareas**
- **Gestión de proyectos**
- **Finanzas**
- **Reportes y análisis**
- **Soporte y ayuda**

![Admin Dashboard](https://cdn.discordapp.com/attachments/1221978128952332289/1383941189899911320/image.png?ex=68509f2c&is=684f4dac&hm=e2ddf58e7069dfbb4d8fd53f310bca6f552ead62701add465c081abac83351ce&)

---

### 👷 Vista de Empleado

Al iniciar sesión como **empleado**, el usuario accede a una interfaz simplificada enfocada en su trabajo personal. Las secciones disponibles incluyen:

- **Panel de control personal** con sus tareas y proyectos asignados.
- **Soporte y ayuda**

![Empleado Dashboard](https://cdn.discordapp.com/attachments/1221978128952332289/1383941189899911320/image.png?ex=68509f2c&is=684f4dac&hm=e2ddf58e7069dfbb4d8fd53f310bca6f552ead62701add465c081abac83351ce&)

---

## BACKEND

A nivel de **Backend** es una API backend desarrollada en Flask, que permite registrar empresas y administrar sus usuarios. Cada empresa hasta el momento de este avance puede tener:

- Un **administrador** que la representa.
- Múltiples **empleados** asociados a ella.

El sistema asegura que cada usuario pertenezca a una empresa específica según su dominio de correo electrónico, y permite la autenticación básica por email y contraseña.

Está pensado para integrarse fácilmente con cualquier frontend moderno (como React o Vue), y ya se encuentra **desplegado y funcional** para pruebas o producción.

En próximos avances se integrará **seguridad** y todo el sistema de asignación de tareas, que es el objetivo principal de este proyecto.

---

## ⚙️ Tecnologías utilizadas (Backend)

- **Python 3 + Flask** – Framework ligero para APIs.
- **MongoDB Atlas** – Servicio de Base de datos en la nube.
- **PyMongo** – Cliente MongoDB para Python.
- **Werkzeug (scrypt)** – Para hashing seguro de contraseñas.
- **Render** – Plataforma de despliegue del backend.
