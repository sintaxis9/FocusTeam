import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-blue'>FOCUS TEAM.</h1>
        <p className='py-4 text-black'>
          Focus Team es una solución integral para la asignación y seguimiento de tareas en empresas.
        </p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
          <h6 className='font-medium text-black'>Soluciones</h6>
          <ul>
            <li className='py-2 text-sm  text-black'>Gestión de Tareas</li>
            <li className='py-2 text-sm  text-black'>Colaboración</li>
            <li className='py-2 text-sm  text-black'>Notificaciones</li>
            <li className='py-2 text-sm  text-black'>Reportes</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium  text-black'>Soporte</h6>
          <ul>
            <li className='py-2 text-sm  text-black'>Precios</li>
            <li className='py-2 text-sm  text-black'>Documentación</li>
            <li className='py-2 text-sm  text-black'>Guías</li>
            <li className='py-2 text-sm  text-black'>Estado del sistema</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium  text-black'>Compañia</h6>
          <ul>
            <li className='py-2 text-sm  text-black'>Sobre nosotros</li>
            <li className='py-2 text-sm  text-black'>Blog</li>
            <li className='py-2 text-sm  text-black'>Trabaja con nosotros</li>
            <li className='py-2 text-sm  text-black'>Prensa</li>
            <li className='py-2 text-sm  text-black'>Carreras</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium  text-black'>Legal</h6>
          <ul>
            <li className='py-2 text-sm  text-black'>Reclamos</li>
            <li className='py-2 text-sm  text-black'>Política</li>
            <li className='py-2 text-sm  text-black'>Términos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
