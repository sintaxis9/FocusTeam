import React, { useState, useEffect } from "react";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import { getCompanyUsers } from "../services/companyService";
import { useAuth } from "../context/authContext";
import type { CompanyUser } from "../types/user";

type Employee = { id: string; name: string };
type Task = {
  id: number;
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
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>("");

  // Obtener el dominio solo cuando cambia el usuario
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
          }))
        );
      });
  }, [domain]);

  // Definir una clave única para cada empresa
  const LOCAL_TASKS_KEY = domain ? `tasks_${domain}` : "tasks_temp";

  // Cargar tareas de localStorage solo cuando tengas el dominio
  useEffect(() => {
    if (!domain) return;
    const storedTasks = localStorage.getItem(LOCAL_TASKS_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
  }, [domain]);

  // Guardar tareas cada vez que cambien o cambie el dominio
  useEffect(() => {
    if (!domain) return;
    localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks));
  }, [tasks, domain]);

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

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.startDate || !form.endDate) return;
    const newTask: Task = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      completed: false,
      employees: form.employees,
    };
    setTasks([...tasks, newTask]);
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      employees: [],
    });
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Tareas</h2>
      <TaskForm
        form={form}
        employees={employees}
        onChange={handleChange}
        onEmployeesChange={handleEmployeesChange}
        onSubmit={handleAddTask}
      />
      {/* Listado de todas las tareas */}
      <TaskList
        tasks={tasks}
        employees={employees}
        onToggle={toggleCompleted}
      />
    </div>
  );
};

export default Task;
