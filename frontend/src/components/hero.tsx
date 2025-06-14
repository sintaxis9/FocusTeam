import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className='text-black'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-blue font-bold p-2'>
          AUMENTA TU PRODUCTIVIDAD
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Captura, organiza y aborda tus tareas
        </h1>

        <p className='md:text-2xl text-xl font-bold text-gray-500'>
          La solución ideal para tu empresa
        </p>

        {isLoggedIn ? (
          <button
            className='bg-black w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white hover:scale-110 duration-300'
            onClick={() => navigate('/dashboard')}
          >
            Ir al Panel
          </button>
        ) : (
          <button
            className='bg-black w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white hover:scale-110 duration-300'
            onClick={() => navigate('/register')}
          >
            Registra tu empresa
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
