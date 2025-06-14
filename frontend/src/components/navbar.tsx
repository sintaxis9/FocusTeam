import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="flex justify-between items-center h-24 w-full max-w-6xl px-4">
        <h1 className="text-3xl font-bold">FOCUS TEAM</h1>
        <ul className="flex">
          <li className="p-4 font-bold hover:scale-110 duration-300">
            <Link to="/">Inicio</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="p-4 font-bold hover:scale-110 duration-300">
                <Link to="/panel">Panel de control</Link>
              </li>
              <li className="p-4 font-bold">
                {user?.userType} ({user?.email})
              </li>
              <li className="p-4 font-bold hover:scale-110 duration-300">
                <button onClick={logout}>Cerrar sesión</button>
              </li>
            </>
          ) : (
            <li className="p-4 font-bold hover:scale-110 duration-300">
              <Link to="/login">Acceder</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
