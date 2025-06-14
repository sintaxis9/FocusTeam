import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.jpg';

const RegisterCompany: React.FC = () => {
  const [userType, setUserType] = useState<'empresa' | null>(null);
  const { registerCompany, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const companyName = (form.elements.namedItem('companyName') as HTMLInputElement).value;
    const adminEmail = (form.elements.namedItem('adminEmail') as HTMLInputElement).value;
    const domain = (form.elements.namedItem('domain') as HTMLInputElement).value;

    registerCompany(companyName, adminEmail, domain);
  };



  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Registra tu empresa</h2>

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="companyName"
              placeholder="Nombre de la empresa"
              required
            />
            <input
              className="p-2 rounded-xl border"
              type="email"
              name="adminEmail"
              placeholder="Correo del administrador"
              required
            />
            <input
              className="p-2 rounded-xl border"
              type="text"
              name="domain"
              placeholder="Dominio de la empresa (ej. miempresa.com)"
              required
            />
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Registrar empresa
            </button>
          </form>

          <button
            className="mt-4 underline text-[#002D74] text-xs"
            onClick={() => setUserType(null)}
          >
            &larr; Elegir otra opción
          </button>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={loginImage} alt="Register" />
        </div>
      </div>
    </section>
  );
};

export default RegisterCompany;
