// src/components/hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative flex items-center justify-center h-[85vh] bg-gradient-to-br from-blue-100 via-white to-indigo-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center z-10"
      >
        <p className="text-blue-700 font-bold text-lg tracking-widest bg-blue-100 bg-opacity-70 px-3 py-1 rounded-xl inline-block shadow-md mb-2 animate-pulse">
          AUMENTA TU PRODUCTIVIDAD
        </p>
        <motion.h1
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 60 }}
          className="md:text-7xl text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-400 text-transparent bg-clip-text drop-shadow-xl py-6"
        >
          Captura, organiza y aborda tus tareas
        </motion.h1>
        <p className="md:text-2xl text-lg font-medium text-gray-600 mb-6">
          La solución ideal para tu empresa
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-xl text-white w-[220px] rounded-2xl font-bold py-3 transition-all text-lg
            hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}
        >
          {isLoggedIn ? "Ir al Panel" : "Registra tu empresa"}
        </motion.button>
      </motion.div>

      {/* Glow de fondo decorativo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 w-80 h-80 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-20 bottom-0 w-80 h-80 bg-indigo-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Hero;
