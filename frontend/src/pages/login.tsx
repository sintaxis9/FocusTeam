import React, { useState, useEffect } from 'react';
import loginImage from '../assets/loginImage.jpg';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<null | "empleador" | "admin">(null);

  useEffect(() => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  // 1. Pantalla de selección de tipo de usuario
  if (!userType) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-md p-10 items-center">
          <h2 className="font-bold text-2xl text-[#002D74] mb-4">¿Quién eres?</h2>
          <button
            onClick={() => setUserType("empleador")}
            className="w-full mb-4 bg-[#002D74] text-white rounded-xl py-2 hover:scale-105 duration-300"
          >
            Empleador
          </button>
          <button
            onClick={() => setUserType("admin")}
            className="w-full bg-[#4B5563] text-white rounded-xl py-2 hover:scale-105 duration-300"
          >
            Administrador
          </button>
        </div>
      </section>
    );
  }

  // 2. Pantalla de login especializado
  return (
    <section className="min-h-screen flex items-center justify-center">
      {/* login container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">
            Inicia sesión {userType === "empleador" ? "como Empleador" : "como Administrador"}
          </h2>
          <p className="text-xs mt-4 text-[#002D74]">
            {/* Puedes poner aquí instrucciones específicas según el tipo */}
          </p>

          <form className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Correo"
              autoComplete="Correo"
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Contraseña"
                autoComplete="Contraseña actual"
              />
              {/* SVG eye icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
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
          {/* Botón para volver y elegir otro tipo */}
          <button
            className="mt-4 underline text-[#002D74] text-xs"
            onClick={() => setUserType(null)}
          >
            &larr; Elegir otro tipo de usuario
          </button>
        </div>
        {/* image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src={loginImage}
            alt="Login"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
