import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.jpg';
import { registerCompany } from '../services/companyService';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const RegisterCompany: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const name = (form.elements.namedItem('companyName') as HTMLInputElement).value;
    const adminEmail = (form.elements.namedItem('adminEmail') as HTMLInputElement).value;
    const domain = (form.elements.namedItem('domain') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await registerCompany({ name, adminEmail, domain, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.message || "Error al registrar empresa");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-6">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        className="bg-white/70 backdrop-blur-lg flex rounded-3xl shadow-2xl max-w-3xl w-full p-5 md:p-8 items-center border border-blue-100"
      >
        <div className="md:w-1/2 px-4 md:px-8">
          <h2 className="font-extrabold text-3xl text-indigo-700 drop-shadow mb-2 text-center md:text-left">
            Registra tu empresa
          </h2>
          <motion.form
            className="flex flex-col gap-5 mt-6"
            onSubmit={handleRegister}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
          >
            <motion.input
              whileFocus={{ borderColor: "#6366f1", scale: 1.02 }}
              className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              type="text"
              name="companyName"
              placeholder="Nombre de la empresa"
              required
            />
            <motion.input
              whileFocus={{ borderColor: "#6366f1", scale: 1.02 }}
              className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              type="email"
              name="adminEmail"
              placeholder="Correo del administrador"
              required
            />
            <motion.input
              whileFocus={{ borderColor: "#6366f1", scale: 1.02 }}
              className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              type="text"
              name="domain"
              placeholder="Dominio de la empresa"
              required
            />
            <motion.input
              whileFocus={{ borderColor: "#6366f1", scale: 1.02 }}
              className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              type="password"
              name="password"
              placeholder="Contraseña del administrador"
              required
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl text-white py-3 font-bold text-lg mt-2 shadow-lg hover:scale-105 focus:ring-2 focus:ring-blue-300 transition"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.06 }}
            >
              Registrar empresa
            </motion.button>
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  className="text-red-600 text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4 }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
          <div className="mt-6 text-xs flex justify-between items-center text-indigo-600">
            <p>¿Ya tienes una cuenta?</p>
            <motion.button
              className="py-2 px-5 bg-white border border-indigo-100 rounded-xl hover:scale-110 hover:bg-indigo-50 transition-all text-indigo-700 font-semibold shadow"
              onClick={() => navigate('/login')}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.07 }}
            >
              Iniciar sesión
            </motion.button>
          </div>
        </div>
        <motion.div
          className="md:block hidden w-1/2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <img className="rounded-2xl shadow-lg" src={loginImage} alt="Register" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RegisterCompany;
