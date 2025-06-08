import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar: React.FC = () => {
    return (
        <div className='flex justify-between items-center h-24 max '>
            <h1 className=' text-3xl'>Barra de tareas</h1>
            <ul className='flex'>
                <li className='p-4 ' font-poppins> <Link to="/">Inicio</Link> </li>
                <li className='p-4 '> <Link to="/dashboard">Dashboard</Link> </li>
                <li className='p-4 '> <Link to="/login">Login</Link> </li>
            </ul>
        </div>
    );
};

export default Sidebar;
