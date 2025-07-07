import React, { useEffect, useState } from 'react';
import { getCompanyUsers, addEmployee } from '../services/companyService';
import { useAuth } from '../context/authContext';
import type { CompanyUser } from '../types/user';
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiShield } from "react-icons/fi";

const Employees: React.FC = () => {
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { user } = useAuth();
  const empresaId = user?.empresa_id;
  const [domain, setDomain] = useState<string>('');

  useEffect(() => {
    const fetchDomain = async () => {
      if (!empresaId) return;
      try {
        const res = await fetch(`https://focusteam-backend.onrender.com/api/company/domain`);
        const data = await res.json();
        const myCompany = data.companies.find((c: any) => c._id === empresaId);
        setDomain(myCompany?.domain || '');
      } catch {
        setError("No se pudo obtener el dominio de la empresa.");
      }
    };
    fetchDomain();
  }, [empresaId]);

  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain).then(data => setUsers(data.users));
  }, [domain]);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await addEmployee({
        domain,
        adminEmail: user?.email || "",
        email,
        password
      });
      const updated = await getCompanyUsers(domain);
      setUsers(updated.users);
      setEmail('');
      setPassword('');
      setSuccess("Empleado agregado exitosamente.");
    } catch (err: any) {
      setError(err.message || "Error al agregar empleado.");
    }
  };

  const isAdmin = user?.userType === 'admin';

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-lg mx-auto p-6 bg-white/80 rounded-3xl shadow-2xl backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-2 mt-15 text-indigo-800 text-center">
          Empleados
        </h2>
        {domain && (
          <div className="text-lg font-semibold text-blue-600 text-center mb-6 tracking-wide">
            {domain}
          </div>
        )}
      <div className="mb-6">
        <ul className="divide-y divide-stone-100">
          <AnimatePresence>
            {users.map((u, i) => (
              <motion.li
                key={u._id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ delay: 0.06 * i }}
                className="flex items-center gap-3 py-3"
              >
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${u.email}`}
                  alt="avatar"
                  className="size-8 rounded bg-gradient-to-tr from-blue-200 to-indigo-200"
                />
                <span className="font-medium truncate">{u.email}</span>
                <span className="ml-auto flex items-center gap-1 text-xs">
                  {u.rol === "admin"
                    ? <><FiShield className="text-violet-600" /> <span className="font-bold text-violet-600">Admin</span></>
                    : <><FiUser className="text-blue-500" /> <span className="font-bold text-blue-500 capitalize">{u.rol}</span></>
                  }
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <AnimatePresence>
        {isAdmin && (
          <motion.form
            key="form"
            onSubmit={handleAddEmployee}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 rounded-xl p-5 shadow flex flex-col gap-3 mb-4"
          >
            <h3 className="text-lg font-semibold mb-1 text-indigo-800">Agregar empleado</h3>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Correo empleado"
              type="email"
              required
              className="border border-blue-100 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="border border-blue-100 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition"
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl text-white py-2 font-bold text-lg shadow-lg hover:scale-105 transition-all"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.06 }}
            >
              Agregar empleado
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {success && (
          <motion.div
            key="success"
            className="text-green-600 mb-2 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            key="error"
            className="text-red-600 mb-2 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      {!isAdmin && (
        <div className="text-sm text-gray-500 text-center mt-3">
          Solo los administradores pueden agregar empleados.
        </div>
      )}
    </motion.div>
  );
};

export default Employees;
