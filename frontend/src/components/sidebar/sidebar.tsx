
import React from 'react';

import { AccountToggle } from './accountToggle';

import { RouteSelect } from './routeSelect';


const Sidebar: React.FC = () => (
  <div className="bg-[#f5f5f4] h-screen p-4 border-r w-64">
    <AccountToggle />
    <RouteSelect />
  </div>
);

export default Sidebar;
