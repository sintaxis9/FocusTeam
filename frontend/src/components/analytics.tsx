import Laptop from '../assets/laptop.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Analytics = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='Gestión de tareas' />
        <div className='flex flex-col justify-center'>
          <p className='text-blue font-bold'>GESTIÓN DE TAREAS Y PROYECTOS</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Optimiza la asignación y seguimiento de tareas
          </h1>
          <p>
            Nuestra aplicación permite a las empresas organizar y supervisar tareas de forma
            colaborativa y eficiente. Los equipos pueden crear, asignar y monitorear tareas en tiempo real,
            visualizar el progreso y las fechas de vencimiento, y recibir notificaciones para asegurar el
            cumplimiento de los plazos.
          </p>

          {isLoggedIn ? (
            <button
              className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 hover:scale-110 duration-300'
              onClick={() => navigate('/dashboard')}
            >
              Ir al Panel
            </button>
          ) : (
            <button
              className='bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 hover:scale-110 duration-300'
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
