// Sidebar.tsx
import React from 'react';
import { motion } from "framer-motion";
import { AccountToggle } from './accountToggle';
import { RouteSelect } from './routeSelect';

const Sidebar: React.FC = () => (
  <motion.aside
    initial={{ x: -40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 70, damping: 18 }}
    className="bg-white/90 backdrop-blur-md h-screen p-4 border-r border-stone-200 w-64 shadow-2xl flex flex-col"
  >
    <AccountToggle />
    <hr className="my-3 border-stone-200" />
    <RouteSelect />
    <div className="mt-auto text-center text-xs text-stone-400 pt-8">
      Focus Team © {new Date().getFullYear()}
    </div>
  </motion.aside>
);

export default Sidebar;
