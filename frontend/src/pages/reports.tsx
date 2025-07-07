import React, { useEffect, useState } from 'react';
import { getCompanyUsers, getTasksByCompany } from '../services/companyService';
import { useAuth } from '../context/authContext';
import { motion } from "framer-motion";
import { FiUsers, FiCheckCircle, FiLayers } from "react-icons/fi";

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

  // 2. Cargar tareas desde backend y proyectos de localStorage para ese dominio
  useEffect(() => {
    if (!domain) return;
    // TAREAS DESDE BACKEND
    getTasksByCompany(domain)
      .then(data => setTasks(data.tareas || []))
      .catch(() => setTasks([]));
    // PROYECTOS DESDE LOCALSTORAGE
    const storedProjects = localStorage.getItem(`projects_${domain}`);
    setProjects(storedProjects ? JSON.parse(storedProjects) : []);
  }, [domain]);

  // 3. Obtener número de empleados
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain)
      .then(data => setNumEmployees(data.users.length));
  }, [domain]);

  // Animación de las cards
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.14,
        type: "spring" as const,
        stiffness: 60,
        damping: 14,
      }
    }),
  };

  const stats = [
    {
      icon: <FiUsers className="text-4xl text-blue-500" />,
      value: numEmployees,
      label: "Empleados registrados",
      bg: "from-blue-100 to-blue-50",
      text: "text-blue-700"
    },
    {
      icon: <FiCheckCircle className="text-4xl text-green-500" />,
      value: tasks.length,
      label: "Tareas creadas",
      bg: "from-green-100 to-green-50",
      text: "text-green-700"
    },
    {
      icon: <FiLayers className="text-4xl text-yellow-500" />,
      value: projects.length,
      label: "Proyectos activos",
      bg: "from-yellow-100 to-yellow-50",
      text: "text-yellow-700"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl mx-auto my-10 p-6 pt-12 bg-white/90 rounded-3xl shadow-2xl backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-700 to-yellow-600 bg-clip-text text-transparent">
        Reportes
      </h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className={`rounded-2xl shadow-md bg-gradient-to-br ${stat.bg} flex flex-col items-center p-6`}
          >
            {stat.icon}
            <span className={`text-4xl font-extrabold ${stat.text} mt-2`}>
              {stat.value}
            </span>
            <span className="text-gray-700 text-center mt-1 font-medium">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Reports;
