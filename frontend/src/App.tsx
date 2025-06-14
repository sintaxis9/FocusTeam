import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import RegisterCompany from './pages/register';

import DashboardLayout from './components/dashLayout';
import PrivateRoute from './context/privateRoute';

import ControlPanel from './pages/controlPanel';
import Employees from './pages/employees';
import Task from './pages/task';
import Project from './pages/projects';
import Reports from './pages/reports';
import Finance from './pages/finance';
import Support from './pages/support';
import Panel from './pages/panel';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterCompany />} />
        <Route path='/' element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }>
          <Route path='dashboard' element={<ControlPanel />} />
          <Route path='employees' element={<Employees />} />
          <Route path='task' element={<Task />} />
          <Route path='project' element={<Project />} />
          <Route path='report' element={<Reports />} />
          <Route path='finance' element={<Finance />} />
          <Route path='support' element={<Support />} />
          <Route path='panel' element={<Panel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
