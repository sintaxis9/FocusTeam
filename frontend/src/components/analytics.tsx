// src/components/analytics.tsx
import React from 'react';
import Laptop from '../assets/laptop.jpg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Analytics = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full bg-white/80 py-16 px-4 shadow-xl rounded-3xl mt-[-50px] mb-10 backdrop-blur-sm"
    >
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 items-center gap-12">
        <img
          className="w-[500px] mx-auto my-4 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          src={Laptop}
          alt="Gestión de tareas"
        />
        <div className="flex flex-col justify-center">
          <p className="text-blue-700 font-bold mb-2">GESTIÓN DE TAREAS Y PROYECTOS</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-indigo-700">
            Optimiza la asignación y seguimiento de tareas
          </h1>
          <p className="text-gray-700 text-base">
            Nuestra aplicación permite a las empresas organizar y supervisar tareas de forma
            colaborativa y eficiente. Los equipos pueden crear, asignar y monitorear tareas en tiempo real,
            visualizar el progreso y las fechas de vencimiento, y recibir notificaciones para asegurar el
            cumplimiento de los plazos.
          </p>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white w-[200px] rounded-xl font-semibold my-6 py-3 shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all"
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
          >
            {isLoggedIn ? "Ir al Panel" : "Iniciar Sesión"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
