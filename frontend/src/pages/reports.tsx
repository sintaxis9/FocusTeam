import React, { useEffect, useState } from 'react';
import { getCompanyUsers } from '../services/companyService';
import { useAuth } from '../context/authContext';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>('');
  const [numEmployees, setNumEmployees] = useState<number>(0);
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  // 1. Obtener el dominio de la empresa actual
  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch(`https://focusteam-backend.onrender.com/api/company/domain`)
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || '');
      });
  }, [user]);

  // 2. Cargar tareas y proyectos de localStorage para ese dominio
  useEffect(() => {
    if (!domain) return;
    const storedTasks = localStorage.getItem(`tasks_${domain}`);
    const storedProjects = localStorage.getItem(`projects_${domain}`);
    setTasks(storedTasks ? JSON.parse(storedTasks) : []);
    setProjects(storedProjects ? JSON.parse(storedProjects) : []);
  }, [domain]);

  // 3. Obtener número de empleados
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain)
      .then(data => setNumEmployees(data.users.length));
  }, [domain]);

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Reportes</h2>
      <div className="grid gap-4">
        <div className="bg-blue-50 rounded p-4 flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-700">{numEmployees}</span>
          <span className="text-gray-700">Empleados registrados</span>
        </div>
        <div className="bg-green-50 rounded p-4 flex flex-col items-center">
          <span className="text-4xl font-bold text-green-700">{tasks.length}</span>
          <span className="text-gray-700">Tareas creadas</span>
        </div>
        <div className="bg-yellow-50 rounded p-4 flex flex-col items-center">
          <span className="text-4xl font-bold text-yellow-700">{projects.length}</span>
          <span className="text-gray-700">Proyectos activos</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
