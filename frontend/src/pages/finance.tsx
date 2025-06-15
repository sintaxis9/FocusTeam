import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

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

  // Obtener dominio desde backend (igual que en otras páginas)
  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch("https://focusteam-backend.onrender.com/api/company/domain")
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || "");
      });
  }, [user]);

  // Clave única por empresa
  const LOCAL_FINANCE_KEY = domain ? `finance_${domain}` : "finance_temp";

  // Cargar movimientos solo cuando tengas el dominio
  useEffect(() => {
    if (!domain) return;
    const stored = localStorage.getItem(LOCAL_FINANCE_KEY);
    setMovements(stored ? JSON.parse(stored) : []);
  }, [domain]);

  // Guardar movimientos al cambiar
  useEffect(() => {
    if (!domain) return;
    localStorage.setItem(LOCAL_FINANCE_KEY, JSON.stringify(movements));
  }, [movements, domain]);

  // Handlers
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
    setMovements([...movements, newMovement]);
    setForm({
      type: "ingreso",
      amount: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  // Calcular totales
  const totalIngreso = movements.filter(m => m.type === "ingreso").reduce((sum, m) => sum + m.amount, 0);
  const totalEgreso = movements.filter(m => m.type === "egreso").reduce((sum, m) => sum + m.amount, 0);
  const balance = totalIngreso - totalEgreso;

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Finanzas</h2>

      <form onSubmit={handleAddMovement} className="mb-6 grid gap-2">
        <div className="flex gap-2">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded"
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
            className="border p-2 rounded"
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
          className="border p-2 rounded"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Agregar movimiento
        </button>
      </form>

      <div className="mb-4">
        <span className="font-bold">Ingresos: </span>${totalIngreso}
        <span className="ml-4 font-bold">Egresos: </span>${totalEgreso}
        <span className="ml-4 font-bold">Balance: </span>
        <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
          ${balance}
        </span>
      </div>

      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="py-2 border-b">Fecha</th>
            <th className="py-2 border-b">Tipo</th>
            <th className="py-2 border-b">Monto</th>
            <th className="py-2 border-b">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-2">
                No hay movimientos registrados.
              </td>
            </tr>
          ) : (
            movements.map(m => (
              <tr key={m.id}>
                <td className="py-1 border-b">{m.date}</td>
                <td className={`py-1 border-b ${m.type === "ingreso" ? "text-green-700" : "text-red-700"}`}>
                  {m.type === "ingreso" ? "Ingreso" : "Egreso"}
                </td>
                <td className="py-1 border-b">${m.amount}</td>
                <td className="py-1 border-b">{m.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Finance;
