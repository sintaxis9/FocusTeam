import React, { useEffect, useState } from "react";
import { getCompanyUsers } from "../services/companyService";
import { useAuth } from "../context/authContext";

type Employee = { id: string; name: string; email: string; rol: string; _id: string };
type Task = { id: number; title: string; completed: boolean; employees: string[] };
type Project = { id: number; name: string; employees: string[] };
type Movement = { id: number; type: "ingreso" | "egreso"; amount: number; };
type Ticket = { id: number; email: string; message: string; date: string; };

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

  // 3. Tareas, Proyectos, Finanzas (ambos roles, pero filtrado según rol)
  useEffect(() => {
    if (!domain || !user) return;
    const allTasks = JSON.parse(localStorage.getItem(`tasks_${domain}`) || "[]");
    const allProjects = JSON.parse(localStorage.getItem(`projects_${domain}`) || "[]");
    const allMovements = JSON.parse(localStorage.getItem(`finance_${domain}`) || "[]");

    if (user.userType === "admin") {
      setTasks(allTasks);
      setProjects(allProjects);
      setMovements(allMovements);
    } else {
      setTasks(allTasks.filter((t: Task) => t.employees.includes(user.id)));
      setProjects(allProjects.filter((p: Project) => p.employees.includes(user.id)));
      setMovements([]); // Los empleados no ven finanzas, opcional: muestra resumen, pero no detalles
    }
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
    <div className="max-w-5xl mx-auto my-8 p-8 bg-white rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-8">Panel de Control</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Empleados: solo para admin */}
        {user && user.userType === "admin" && (
          <section className="bg-blue-50 rounded-xl p-5 shadow">
            <h3 className="font-bold text-xl mb-3">Empleados ({employees.length})</h3>
            <ul className="mb-2">
              {employees.slice(0, 5).map(u => (
                <li key={u._id} className="text-sm flex justify-between items-center">
                  <span>{u.email}</span>
                  <span className="text-gray-500">({u.rol})</span>
                </li>
              ))}
            </ul>
            {employees.length > 5 && (
              <span className="text-xs text-gray-600">Y {employees.length - 5} más...</span>
            )}
          </section>
        )}
        {/* Tareas */}
        <section className="bg-green-50 rounded-xl p-5 shadow">
          <h3 className="font-bold text-xl mb-3">
            {user && user.userType === "admin" ? "Tareas (todas)" : "Tus tareas"}
            ({tasks.length})
          </h3>
          <ul>
            {tasks.slice(0, 5).map(t => (
              <li key={t.id} className="text-sm flex justify-between">
                <span>{t.title}</span>
                <span>{t.completed ? "✔️" : "⏳"}</span>
              </li>
            ))}
          </ul>
          {tasks.length > 5 && (
            <span className="text-xs text-gray-600">Y {tasks.length - 5} más...</span>
          )}
          {tasks.length === 0 && (
            <span className="text-xs text-gray-400">No hay tareas.</span>
          )}
        </section>
        {/* Proyectos */}
        <section className="bg-yellow-50 rounded-xl p-5 shadow">
          <h3 className="font-bold text-xl mb-3">
            {user && user.userType === "admin" ? "Proyectos (todos)" : "Tus proyectos"}
            ({projects.length})
          </h3>
          <ul>
            {projects.slice(0, 5).map(p => (
              <li key={p.id} className="text-sm">{p.name}</li>
            ))}
          </ul>
          {projects.length > 5 && (
            <span className="text-xs text-gray-600">Y {projects.length - 5} más...</span>
          )}
          {projects.length === 0 && (
            <span className="text-xs text-gray-400">No hay proyectos.</span>
          )}
        </section>
        {/* Finanzas solo admin */}
        {user && user.userType === "admin" && (
          <section className="bg-gray-50 rounded-xl p-5 shadow">
            <h3 className="font-bold text-xl mb-3">Finanzas</h3>
            <div><span className="font-semibold">Ingresos:</span> ${totalIngreso}</div>
            <div><span className="font-semibold">Egresos:</span> ${totalEgreso}</div>
            <div>
              <span className="font-semibold">Balance:</span>
              <span className={balance >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}> ${balance}</span>
            </div>
          </section>
        )}
        {/* Soporte */}
        <section className="bg-purple-50 rounded-xl p-5 shadow col-span-full">
          <h3 className="font-bold text-xl mb-3">Tus tickets de soporte</h3>
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-sm">No has enviado consultas recientes.</p>
          ) : (
            <ul>
              {tickets.slice(-3).reverse().map(t => (
                <li key={t.id} className="mb-2">
                  <span className="text-xs text-gray-500">{t.date}:</span> <span>{t.message}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Panel;
