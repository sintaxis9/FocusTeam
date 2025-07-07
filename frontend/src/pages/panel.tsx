import React, { useEffect, useState } from "react";
import { getCompanyUsers, getTasksByCompany, getTasksByUser } from "../services/companyService";
import { useAuth } from "../context/authContext";
import { motion } from "framer-motion";
import {
  HiUsers,
  HiClipboardList,
  HiFolderOpen,
  HiCurrencyDollar,
  HiSupport,
} from "react-icons/hi";

type Employee = { id: string; name: string; email: string; rol: string; _id: string };
type Task = { id: string; title: string; completed: boolean; employees: string[] };
type Project = { id: number; name: string; employees: string[] };
type Movement = { id: number; type: "ingreso" | "egreso"; amount: number };
type Ticket = { id: number; email: string; message: string; date: string };

const Panel: React.FC = () => {
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // 1. Obtener dominio
  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch(`https://focusteam-backend.onrender.com/api/company/domain`)
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || "");
      });
  }, [user]);

  // 2. Cargar empleados (solo muestra para admin)
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain).then(data => setEmployees(data.users));
  }, [domain]);

  // 3. Tareas, Proyectos, Finanzas (tareas desde backend, el resto localStorage)
  useEffect(() => {
    if (!domain || !user) return;

    // TAREAS DESDE BACKEND (no localStorage)
    if (user.userType === "admin") {
      getTasksByCompany(domain)
        .then(data => {
          const tareas = data.tareas || [];
          setTasks(
            tareas.map((t: any) => ({
              id: t._id,
              title: t.titulo,
              completed: t.estado === "completada",
              employees: t.asignados || [],
            }))
          );
        })
        .catch(() => setTasks([]));
    } else {
      getTasksByUser(user.email)
        .then(data => {
          const tareas = data.tareas || [];
          setTasks(
            tareas.map((t: any) => ({
              id: t._id,
              title: t.titulo,
              completed: t.estado === "completada",
              employees: t.asignados || [],
            }))
          );
        })
        .catch(() => setTasks([]));
    }

    // Proyectos y finanzas (localStorage)
    const allProjects = JSON.parse(localStorage.getItem(`projects_${domain}`) || "[]");
    const allMovements = JSON.parse(localStorage.getItem(`finance_${domain}`) || "[]");

    setProjects(
      user.userType === "admin"
        ? allProjects
        : allProjects.filter((p: Project) => p.employees.includes(user.id))
    );
    setMovements(user.userType === "admin" ? allMovements : []);
  }, [domain, user]);

  // 4. Tickets de soporte (solo los del usuario actual)
  useEffect(() => {
    if (!user) return;
    const storedTickets = localStorage.getItem(`support_${user.email}`);
    setTickets(storedTickets ? JSON.parse(storedTickets) : []);
  }, [user]);

  // Finanzas: solo admin ve detalles
  const totalIngreso = movements.filter(m => m.type === "ingreso").reduce((sum, m) => sum + m.amount, 0);
  const totalEgreso = movements.filter(m => m.type === "egreso").reduce((sum, m) => sum + m.amount, 0);
  const balance = totalIngreso - totalEgreso;

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 md:p-8 bg-white/80 rounded-3xl shadow-xl backdrop-blur">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-800 tracking-tight text-center drop-shadow-sm">
        Panel de Control
      </h2>

      {/* Empleados + Tareas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Empleados: solo para admin */}
        {user && user.userType === "admin" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.11, type: "spring", stiffness: 50, damping: 15 }}
            className="bg-blue-50/90 hover:shadow-2xl transition-all rounded-2xl p-6 flex flex-col gap-2 border border-blue-100"
          >
            <div className="flex items-center gap-2">
              <HiUsers className="text-blue-700 text-2xl" />
              <h3 className="font-bold text-xl">Empleados</h3>
              <span className="ml-auto bg-blue-200 text-blue-800 px-2 rounded-full text-xs font-bold">
                {employees.length}
              </span>
            </div>
            <ul className="mt-2 mb-2">
              {employees.slice(0, 5).map(u => (
                <li key={u._id} className="text-sm flex justify-between items-center py-1 border-b border-blue-100 last:border-b-0">
                  <span>{u.email} <span className="text-gray-500">({u.rol})</span></span>
                </li>
              ))}
            </ul>
            {employees.length > 5 && (
              <span className="text-xs text-gray-600">Y {employees.length - 5} más...</span>
            )}
          </motion.section>
        )}

        {/* Tareas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, type: "spring", stiffness: 50, damping: 15 }}
          className="bg-green-50/90 hover:shadow-2xl transition-all rounded-2xl p-6 flex flex-col gap-2 border border-green-100"
        >
          <div className="flex items-center gap-2">
            <HiClipboardList className="text-green-700 text-2xl" />
            <h3 className="font-bold text-xl">{user && user.userType === "admin" ? "Tareas (todas)" : "Tus tareas"}</h3>
            <span className="ml-auto bg-green-200 text-green-800 px-2 rounded-full text-xs font-bold">
              {tasks.length}
            </span>
          </div>
          <ul className="mt-2">
            {tasks.slice(0, 5).map(t => (
              <li key={t.id} className="text-sm flex justify-between py-1 border-b border-green-100 last:border-b-0">
                <span>{t.title}</span>
                <span className={t.completed ? "text-green-600" : "text-gray-400"}>
                  {t.completed ? "✔️" : "⏳"}
                </span>
              </li>
            ))}
          </ul>
          {tasks.length > 5 && (
            <span className="text-xs text-gray-600">Y {tasks.length - 5} más...</span>
          )}
          {tasks.length === 0 && (
            <span className="text-xs text-gray-400 mt-2">No hay tareas.</span>
          )}
        </motion.section>
      </div>

      <div className="my-10" />

      {/* Proyectos + Finanzas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Proyectos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 50, damping: 15 }}
          className="bg-yellow-50/90 hover:shadow-2xl transition-all rounded-2xl p-6 flex flex-col gap-2 border border-yellow-100"
        >
          <div className="flex items-center gap-2">
            <HiFolderOpen className="text-yellow-600 text-2xl" />
            <h3 className="font-bold text-xl">{user && user.userType === "admin" ? "Proyectos (todos)" : "Tus proyectos"}</h3>
            <span className="ml-auto bg-yellow-200 text-yellow-700 px-2 rounded-full text-xs font-bold">
              {projects.length}
            </span>
          </div>
          <ul className="mt-2">
            {projects.slice(0, 5).map(p => (
              <li key={p.id} className="text-sm py-1 border-b border-yellow-100 last:border-b-0">{p.name}</li>
            ))}
          </ul>
          {projects.length > 5 && (
            <span className="text-xs text-gray-600">Y {projects.length - 5} más...</span>
          )}
          {projects.length === 0 && (
            <span className="text-xs text-gray-400 mt-2">No hay proyectos.</span>
          )}
        </motion.section>

        {/* Finanzas solo admin */}
        {user && user.userType === "admin" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.21, type: "spring", stiffness: 50, damping: 15 }}
            className="bg-gray-50/90 hover:shadow-2xl transition-all rounded-2xl p-6 flex flex-col gap-2 border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <HiCurrencyDollar className="text-gray-700 text-2xl" />
              <h3 className="font-bold text-xl">Finanzas</h3>
            </div>
            <div className="flex flex-col gap-1 mt-3">
              <div>
                <span className="font-semibold">Ingresos:</span>{" "}
                <span className="text-green-700 font-bold">
                  ${totalIngreso}
                </span>
              </div>
              <div>
                <span className="font-semibold">Egresos:</span>{" "}
                <span className="text-red-700 font-bold">
                  ${totalEgreso}
                </span>
              </div>
              <div>
                <span className="font-semibold">Balance:</span>
                <span
                  className={
                    balance >= 0
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {" "}
                  ${balance}
                </span>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      <div className="my-10" />

      {/* Soporte */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, type: "spring", stiffness: 50, damping: 15 }}
        className="bg-purple-50/90 hover:shadow-2xl transition-all rounded-2xl p-6 flex flex-col gap-2 border border-purple-100 max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <HiSupport className="text-purple-700 text-2xl" />
          <h3 className="font-bold text-xl">Tus tickets de soporte</h3>
        </div>
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-sm mt-3">No has enviado consultas recientes.</p>
        ) : (
          <ul className="mt-2">
            {tickets.slice(-3).reverse().map(t => (
              <li key={t.id} className="mb-2">
                <span className="text-xs text-gray-500">{t.date}:</span>{" "}
                <span>{t.message}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.section>
    </div>
  );
};

export default Panel;
