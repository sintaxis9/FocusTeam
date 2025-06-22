import React, { useState, useEffect } from "react";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import { getCompanyUsers, createTask, getTasksByUser, getTasksByCompany } from "../services/companyService";
import { useAuth } from "../context/authContext";
import type { CompanyUser } from "../types/user";

type Employee = { id: string; name: string; rol: string };
type Task = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  employees: string[];
};

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    employees: [] as string[],
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>("");

  const isAdmin: boolean = user?.userType === "admin";
  const userId = user?.id ?? "";

  // Obtener el dominio de la empresa
  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch(`https://focusteam-backend.onrender.com/api/company/domain`)
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || "");
      });
  }, [user]);

  // Obtener empleados reales cuando se tenga el dominio
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain)
      .then(data => {
        setEmployees(
          data.users.map((u: CompanyUser) => ({
            id: u._id,
            name: u.email,
            rol: u.rol,
          }))
        );
        setEmployeesLoaded(true);
      });
  }, [domain]);

  // Cargar tareas según el rol del usuario
  useEffect(() => {
    if (!employeesLoaded) return;
    if (!user) return;

    if (isAdmin) {
      // Admin: obtiene todas las tareas de la empresa por dominio
      getTasksByCompany(domain)
        .then(data => {
          setTasks(
            data.tareas.map((t: any) => ({
              id: t._id,
              title: t.titulo,
              description: t.descripcion,
              startDate: t.fecha_inicio,
              endDate: t.fecha_final,
              completed: t.estado === "completada",
              employees: t.asignados || [],
            }))
          );
        })
        .catch(error => {
          alert(error.message || "No se pudieron cargar las tareas");
        });
    } else {
      // Empleado: solo sus tareas
      getTasksByUser(user.email)
        .then(data => {
          setTasks(
            data.tareas.map((t: any) => ({
              id: t._id,
              title: t.titulo,
              description: t.descripcion,
              startDate: t.fecha_inicio,
              endDate: t.fecha_final,
              completed: t.estado === "completada",
              employees: t.asignados || [],
            }))
          );
        })
        .catch(error => {
          alert(error.message || "No se pudieron cargar las tareas");
        });
    }
  }, [employeesLoaded, user, domain, isAdmin]);

  // Manejadores del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmployeesChange = (id: string, checked: boolean) => {
    setForm(prevForm => ({
      ...prevForm,
      employees: checked
        ? [...prevForm.employees, id]
        : prevForm.employees.filter(empId => empId !== id)
    }));
  };

  // Crear tarea (SOLO admin)
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) {
      alert("No se encontró el usuario.");
      return;
    }
    if (!form.title.trim() || !form.startDate || !form.endDate || form.employees.length === 0) return;
    try {
      await createTask({
        adminEmail: user.email,
        titulo: form.title,
        descripcion: form.description,
        fecha_inicio: form.startDate,
        fecha_final: form.endDate,
        estado: "pendiente",
        asignados: form.employees,
      });
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        employees: [],
      });
      alert("Tarea creada correctamente");
      // Vuelve a cargar las tareas después de crear una
      if (isAdmin) {
        getTasksByCompany(domain)
          .then(data => {
            setTasks(
              data.tareas.map((t: any) => ({
                id: t._id,
                title: t.titulo,
                description: t.descripcion,
                startDate: t.fecha_inicio,
                endDate: t.fecha_final,
                completed: t.estado === "completada",
                employees: t.asignados || [],
              }))
            );
          });
      } else {
        getTasksByUser(user.email)
          .then(data => {
            setTasks(
              data.tareas.map((t: any) => ({
                id: t._id,
                title: t.titulo,
                description: t.descripcion,
                startDate: t.fecha_inicio,
                endDate: t.fecha_final,
                completed: t.estado === "completada",
                employees: t.asignados || [],
              }))
            );
          });
      }
    } catch (error: any) {
      alert(error.message || "Error creando tarea");
    }
  };

  // Filtrado de tareas: ahora no es necesario si el backend retorna lo correcto
  const visibleTasks = tasks;

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Tareas</h2>
      {isAdmin && (
        <TaskForm
          form={form}
          employees={employees.filter(emp => emp.rol === "empleado")}
          onChange={handleChange}
          onEmployeesChange={handleEmployeesChange}
          onSubmit={handleAddTask}
        />
      )}
      <TaskList
        tasks={visibleTasks}
        employees={employees}
        onToggle={() => {}} // Si tienes lógica de completado ponla aquí
        isAdmin={isAdmin}
        currentUserId={userId}
      />
    </div>
  );
};

export default Task;
