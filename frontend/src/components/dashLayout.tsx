import Sidebar from './sidebar/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <div className="flex justify-center bg-white min-h-screen">
    {/* Contenedor central */}
    <div className="flex w-full max-w-6xl min-h-screen">
      <Sidebar />
      <div className="flex-1 px-8 py-4">
        <Outlet />
      </div>
    </div>
  </div>
);

export default DashboardLayout;
