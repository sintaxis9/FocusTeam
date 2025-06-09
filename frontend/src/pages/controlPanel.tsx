
import React from 'react';
import Dashboard from '../components/dashboard/dashboard';
import Sidebar  from '../components/sidebar/sidebar';

const ControlPanel: React.FC = () => {
  return (
    <main className="grid grid-cols-[220px_1fr] h-screen">
      {/* <Sidebar /> */}
      <Dashboard />
    </main>
  );
};

export default ControlPanel;
