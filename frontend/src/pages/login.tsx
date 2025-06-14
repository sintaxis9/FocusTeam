import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.jpg';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<null | 'empleado' | 'admin'>(null);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    if (userType) {
      login(userType, email);
    }
  };

  if (!userType) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-md p-10 items-center">
          <h2 className="font-bold text-2xl text-[#002D74] mb-4">¿Quién eres?</h2>
          <button
            onClick={() => setUserType('empleado')}
            className="w-full mb-4 bg-[#002D74] text-white rounded-xl py-2 hover:scale-105 duration-300"
          >
            Empleado
          </button>
          <button
            onClick={() => setUserType('admin')}
            className="w-full bg-[#4B5563] text-white rounded-xl py-2 hover:scale-105 duration-300"
          >
            Administrador
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">
            Inicia sesión {userType === 'empleado' ? 'como Empleado' : 'como Administrador'}
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
            >
              Login
            </button>
          </form>
          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Olvidaste tu contraseña?</a>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>No tienes una cuenta?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Registra tu empresa
            </button>
          </div>
          <button
            className="mt-4 underline text-[#002D74] text-xs"
            onClick={() => setUserType(null)}
          >
            &larr; Elegir otro tipo de usuario
          </button>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={loginImage} alt="Login" />
        </div>
      </div>
    </section>
  );
};

export default Login;
