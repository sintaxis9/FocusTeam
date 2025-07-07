import React, { useState, useEffect } from "react";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import { getCompanyUsers, createTask, getTasksByUser, getTasksByCompany } from "../services/companyService";
import { useAuth } from "../context/authContext";
import type { CompanyUser } from "../types/user";
import { motion } from "framer-motion";

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

    const mapTasks = (data: any) => data.tareas.map((t: any) => ({
      id: t._id,
      title: t.titulo,
      description: t.descripcion,
      startDate: t.fecha_inicio,
      endDate: t.fecha_final,
      completed: t.estado === "completada",
      employees: t.asignados || [],
    }));

    if (isAdmin) {
      getTasksByCompany(domain)
        .then(data => setTasks(mapTasks(data)))
        .catch(error => alert(error.message || "No se pudieron cargar las tareas"));
    } else {
      getTasksByUser(user.email)
        .then(data => setTasks(mapTasks(data)))
        .catch(error => alert(error.message || "No se pudieron cargar las tareas"));
    }
  }, [employeesLoaded, user, domain, isAdmin]);

  // Manejadores del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

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
      // Recargar tareas:
      if (isAdmin) {
        getTasksByCompany(domain)
          .then(data => setTasks(data.tareas.map((t: any) => ({
            id: t._id,
            title: t.titulo,
            description: t.descripcion,
            startDate: t.fecha_inicio,
            endDate: t.fecha_final,
            completed: t.estado === "completada",
            employees: t.asignados || [],
          }))));
      } else {
        getTasksByUser(user.email)
          .then(data => setTasks(data.tareas.map((t: any) => ({
            id: t._id,
            title: t.titulo,
            description: t.descripcion,
            startDate: t.fecha_inicio,
            endDate: t.fecha_final,
            completed: t.estado === "completada",
            employees: t.asignados || [],
          }))));
      }
    } catch (error: any) {
      alert(error.message || "Error creando tarea");
    }
  };

  const visibleTasks = tasks;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl mx-auto my-10 p-6 pt-12 bg-white/90 rounded-3xl shadow-2xl backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
        Tareas
      </h2>
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <TaskForm
            form={form}
            employees={employees.filter(emp => emp.rol === "empleado")}
            onChange={handleChange}
            onEmployeesChange={handleEmployeesChange}
            onSubmit={handleAddTask}
          />
        </motion.div>
      )}
      <TaskList
        tasks={visibleTasks}
        employees={employees}
        onToggle={() => {}} // Aquí puedes poner la lógica para marcar como completada
        isAdmin={isAdmin}
        currentUserId={userId}
      />
    </motion.div>
  );
};

export default Task;
