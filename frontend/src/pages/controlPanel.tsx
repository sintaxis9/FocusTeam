import React from 'react';
import Dashboard from '../components/dashboard/dashboard';

const ControlPanel: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Sidebar futuro */}
      {/* <Sidebar /> */}
      <section className="flex-1 flex flex-col">
        <Dashboard />
      </section>
    </main>
  );
};

export default ControlPanel;
