import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => (
  <div className="flex flex-col items-center justify-center h-40">
    <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
    <span className="mt-2 text-indigo-600 font-semibold">Cargando...</span>
  </div>
);

const variants = {
  hidden: { opacity: 0, y: 30 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Login: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/panel');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await login(email, password);
      setSuccess("¡Bienvenido! Redirigiendo...");
      setTimeout(() => {
        setLoading(false);
        navigate('/panel');
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      setLoading(false);
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
            Inicia sesión
          </h2>

          <AnimatePresence>
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loader />
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="flex flex-col gap-5 mt-6"
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
              >
                <motion.input
                  whileFocus={{ borderColor: "#6366f1", scale: 1.02 }}
                  className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  type="email"
                  name="email"
                  placeholder="Correo"
                  autoComplete="email"
                  required
                />
                <motion.input
                  whileFocus={{ borderColor: "#6366f1", scale: 1.02 }}
                  className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl text-white py-3 font-bold text-lg mt-2 shadow-lg hover:scale-105 focus:ring-2 focus:ring-blue-300 transition"
                  disabled={!!success}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.06 }}
                >
                  Login
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Mensajes */}
          <AnimatePresence>
            {success && (
              <motion.div
                key="success"
                className="mt-2 text-green-600 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div
                key="error"
                className="mt-2 text-red-600 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-xs flex justify-between items-center text-indigo-600">
            <p>No tienes una cuenta?</p>
            <motion.button
              className="py-2 px-5 bg-white border border-indigo-100 rounded-xl hover:scale-110 hover:bg-indigo-50 transition-all text-indigo-700 font-semibold shadow"
              onClick={() => navigate('/register')}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.07 }}
            >
              Registra tu empresa
            </motion.button>
          </div>
        </div>
        <motion.div
          className="md:block hidden w-1/2"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <img className="rounded-2xl shadow-lg" src={loginImage} alt="Login" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Login;
