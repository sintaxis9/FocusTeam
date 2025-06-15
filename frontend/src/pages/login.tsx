import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.jpg';

const Login: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await login(email, password);
      console.log("✅ Login exitoso para:", email);
      setSuccess("¡Bienvenido! Redirigiendo...");
      setTimeout(() => navigate('/panel'), 1200); // Redirige después de 1,2 segundos
    } catch (err: any) {
      console.error("❌ Error al iniciar sesión:", err.message);
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">
            Inicia sesión
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Correo"
              autoComplete="Correo"
              required
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Contraseña"
              autoComplete="Contraseña actual"
              required
            />
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              disabled={!!success}
            >
              Login
            </button>
          </form>

          {/* Mensaje de éxito */}
          {success && <div className="mt-2 text-green-600">{success}</div>}

          {/* Mensaje de error */}
          {error && <div className="mt-2 text-red-600">{error}</div>}

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>No tienes una cuenta?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              onClick={() => navigate('/register')}
            >
              Registra tu empresa
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={loginImage} alt="Login" />
        </div>
      </div>
    </section>
  );
};

export default Login;
