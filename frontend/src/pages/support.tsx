import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

type Ticket = {
  id: number;
  email: string;
  message: string;
  date: string;
};

const Support: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Clave única para tickets por usuario
  const LOCAL_TICKETS_KEY = user ? `support_${user.email}` : "support_temp";

  // Cargar tickets del usuario
  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(LOCAL_TICKETS_KEY);
    setTickets(stored ? JSON.parse(stored) : []);
  }, [user]);

  // Guardar tickets cuando cambien
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(LOCAL_TICKETS_KEY, JSON.stringify(tickets));
  }, [tickets, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;
    const newTicket: Ticket = {
      id: Date.now(),
      email: user.email,
      message: message.trim(),
      date: new Date().toLocaleString(),
    };
    setTickets([...tickets, newTicket]);
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Soporte</h2>
      <div className="mb-4">
        <p>¿Necesitas ayuda? Contáctanos:</p>
        <ul className="list-disc ml-5">
          <li>Correo: <a href="mailto:soporte@focusteam.cl" className="text-blue-600">soporte@focusteam.cl</a></li>
          <li>WhatsApp: +56 9 1234 5678</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Describe tu problema o consulta..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar consulta
        </button>
      </form>
      <div>
        <h3 className="font-semibold mb-2">Tus tickets enviados:</h3>
        {tickets.length === 0 ? (
          <p className="text-gray-500">No has enviado consultas aún.</p>
        ) : (
          <ul>
            {tickets.map(t => (
              <li key={t.id} className="mb-2 border-b pb-2">
                <div className="text-xs text-gray-600">{t.date}</div>
                <div>{t.message}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Support;
