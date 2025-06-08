
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css'

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Navbar from './components/navbar';

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='login/' element={<Login />} />

      </Routes>
    </Router>

  )
}

export default App
