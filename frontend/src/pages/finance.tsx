import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

type Movement = {
  id: number;
  type: "ingreso" | "egreso";
  amount: number;
  description: string;
  date: string;
};

const Finance: React.FC = () => {
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>("");
  const [movements, setMovements] = useState<Movement[]>([]);
  const [form, setForm] = useState({
    type: "ingreso" as "ingreso" | "egreso",
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch("https://focusteam-backend.onrender.com/api/company/domain")
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || "");
      });
  }, [user]);

  const LOCAL_FINANCE_KEY = domain ? `finance_${domain}` : "finance_temp";

  useEffect(() => {
    if (!domain) return;
    const stored = localStorage.getItem(LOCAL_FINANCE_KEY);
    setMovements(stored ? JSON.parse(stored) : []);
  }, [domain]);

  useEffect(() => {
    if (!domain) return;
    localStorage.setItem(LOCAL_FINANCE_KEY, JSON.stringify(movements));
  }, [movements, domain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.description) return;
    const newMovement: Movement = {
      id: Date.now(),
      type: form.type,
      amount: Number(form.amount),
      description: form.description,
      date: form.date,
    };
    setMovements([newMovement, ...movements]);
    setForm({
      type: "ingreso",
      amount: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const totalIngreso = movements.filter(m => m.type === "ingreso").reduce((sum, m) => sum + m.amount, 0);
  const totalEgreso = movements.filter(m => m.type === "egreso").reduce((sum, m) => sum + m.amount, 0);
  const balance = totalIngreso - totalEgreso;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl mx-auto my-10 p-6 pt-12 bg-white/90 rounded-3xl shadow-2xl backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
        Finanzas
      </h2>

      {/* Resumen Totales */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-green-50 p-4 rounded-2xl shadow flex flex-col items-center">
          <FiArrowDownCircle className="text-3xl text-green-600 mb-1" />
          <span className="text-xl font-bold text-green-700">${totalIngreso}</span>
          <span className="text-gray-600 text-xs">Ingresos</span>
        </div>
        <div className="bg-red-50 p-4 rounded-2xl shadow flex flex-col items-center">
          <FiArrowUpCircle className="text-3xl text-red-600 mb-1" />
          <span className="text-xl font-bold text-red-700">${totalEgreso}</span>
          <span className="text-gray-600 text-xs">Egresos</span>
        </div>
        <div className="bg-gray-50 p-4 rounded-2xl shadow flex flex-col items-center">
          <span className={`text-2xl font-extrabold ${balance >= 0 ? "text-green-700" : "text-red-700"}`}>
            ${balance}
          </span>
          <span className="text-gray-600 text-xs font-semibold">Balance</span>
        </div>
      </div>

      {/* Formulario movimiento */}
      <motion.form
        onSubmit={handleAddMovement}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 grid gap-3 bg-white/70 rounded-2xl p-5 shadow"
      >
        <div className="flex gap-2">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
          <input
            name="amount"
            type="number"
            placeholder="Monto"
            value={form.amount}
            onChange={handleChange}
            className="border border-gray-200 p-2 rounded-lg w-1/2 focus:ring-2 focus:ring-green-400 transition"
            min="0"
            step="any"
            required
          />
        </div>
        <input
          name="description"
          type="text"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-200 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-200 p-2 rounded-lg w-full focus:ring-2 focus:ring-green-400 transition"
        />
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-green-600 to-yellow-500 rounded-xl text-white py-2 font-bold text-lg shadow-lg hover:scale-105 transition-all mt-2"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.04 }}
        >
          Agregar movimiento
        </motion.button>
      </motion.form>

      {/* Movimientos */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-600 mb-2">Movimientos recientes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl">
            <thead>
              <tr>
                <th className="py-2 border-b text-xs text-gray-600">Fecha</th>
                <th className="py-2 border-b text-xs text-gray-600">Tipo</th>
                <th className="py-2 border-b text-xs text-gray-600">Monto</th>
                <th className="py-2 border-b text-xs text-gray-600">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {movements.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-2">
                      No hay movimientos registrados.
                    </td>
                  </tr>
                ) : (
                  movements.map((m, i) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 32 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl"
                    >
                      <td className="py-1 border-b">{m.date}</td>
                      <td className={`py-1 border-b font-bold flex items-center gap-1 justify-center ${m.type === "ingreso" ? "text-green-700" : "text-red-700"}`}>
                        {m.type === "ingreso"
                          ? <><FiArrowDownCircle className="inline mr-1" /> Ingreso</>
                          : <><FiArrowUpCircle className="inline mr-1" /> Egreso</>
                        }
                      </td>
                      <td className="py-1 border-b font-semibold">${m.amount}</td>
                      <td className="py-1 border-b">{m.description}</td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Finance;
