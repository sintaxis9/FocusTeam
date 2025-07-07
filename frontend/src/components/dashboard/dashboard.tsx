import React from 'react';
import Panel from '../../pages/panel';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8"
      style={{ minHeight: "100vh" }}
    >
      <Panel />
    </motion.div>
  );
};

export default Dashboard;
