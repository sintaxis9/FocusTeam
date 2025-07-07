import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from "react-icons/hi";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/panel", label: "Panel de control", auth: true },
];

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // Variantes de animación para los items
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06 }
    }),
    hover: { scale: 1.09 }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg shadow-md fixed top-0 left-0 z-30">
      <div className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4">
        <Link to="/" className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-wide drop-shadow-md">
          FOCUS <span className="text-blue-700">TEAM</span>
        </Link>
        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-3">
          {links.map((l, i) =>
            (!l.auth || isLoggedIn) && (
              <motion.li
                key={l.to}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={linkVariants}
                className="relative px-4 py-2 font-semibold cursor-pointer"
              >
                <Link to={l.to} className="transition-all">
                  <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all after:duration-300 hover:after:w-full">
                    {l.label}
                  </span>
                </Link>
              </motion.li>
            )
          )}
          {!isLoggedIn ? (
            <motion.li
              custom={10}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={linkVariants}
              className="px-4 py-2 font-semibold"
            >
              <Link to="/login" className="text-blue-700 hover:text-indigo-700">
                Acceder
              </Link>
            </motion.li>
          ) : (
            <>
              <motion.li
                custom={12}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
                className="px-4 py-2 text-sm font-medium text-gray-600"
              >
                {user?.userType} <span className="text-gray-500">({user?.email})</span>
              </motion.li>
              <motion.li
                custom={13}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={linkVariants}
                className="px-4 py-2"
              >
                <button
                  onClick={logout}
                  className="bg-indigo-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow font-semibold transition"
                >
                  Cerrar sesión
                </button>
              </motion.li>
            </>
          )}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl text-blue-700 focus:outline-none"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            className="flex flex-col gap-3 md:hidden bg-white/95 shadow-lg backdrop-blur-xl rounded-b-2xl px-6 py-6 absolute left-0 top-[80px] w-full z-20"
          >
            {links.map((l) =>
              (!l.auth || isLoggedIn) && (
                <motion.li
                  key={l.to}
                  whileTap={{ scale: 0.97 }}
                  className="font-bold py-2 text-lg border-b border-blue-100"
                  onClick={() => setOpen(false)}
                >
                  <Link to={l.to}>{l.label}</Link>
                </motion.li>
              )
            )}
            {!isLoggedIn ? (
              <li className="font-bold py-2 text-lg" onClick={() => setOpen(false)}>
                <Link to="/login" className="text-blue-700">Acceder</Link>
              </li>
            ) : (
              <>
                <li className="py-2 text-gray-700">
                  {user?.userType} <span className="text-gray-500">({user?.email})</span>
                </li>
                <li>
                  <button
                    onClick={() => { logout(); setOpen(false); }}
                    className="bg-indigo-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow font-semibold w-full"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
