import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/loginImage.jpg';
import { registerCompany } from '../services/companyService';

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
    const password = (form.elements.namedItem('password') as HTMLInputElement).value; // <-- NEW

    try {
      await registerCompany({ name, adminEmail, domain, password }); // <-- LLAMA CON PASSWORD
      navigate('/login');
    } catch (err: any) {
      setError(err.message || "Error al registrar empresa");
    }
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
              placeholder="Dominio de la empresa"
              required
            />
            <input
              className="p-2 rounded-xl border"
              type="password"
              name="password"
              placeholder="Contraseña del administrador"
              required
            />
            <button
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Registrar empresa
            </button>
            {error && <div className="text-red-600">{error}</div>}
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={loginImage} alt="Register" />
        </div>
      </div>
    </section>
  );
};

export default RegisterCompany;
