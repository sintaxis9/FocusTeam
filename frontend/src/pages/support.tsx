import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiMail, FiMessageCircle, FiCheckCircle } from "react-icons/fi";

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
  const bottomRef = useRef<HTMLDivElement>(null);

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
    // Scroll al final cuando agregas un ticket
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl mx-auto my-10 p-6 pt-12 bg-white/90 rounded-3xl shadow-2xl backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
        Soporte & Ayuda
      </h2>
      <div className="mb-6 bg-blue-50/70 rounded-xl p-4 flex flex-col items-center">
        <div className="flex gap-2 items-center text-blue-700 font-medium mb-2">
          <FiMail className="text-2xl" />
          soporte@focusteam.cl
        </div>
        <div className="flex gap-2 items-center text-green-700 font-medium">
          <FiMessageCircle className="text-2xl" />
          WhatsApp: +56 9 1234 5678
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid gap-3 bg-white/70 rounded-2xl p-5 shadow"
      >
        <label className="font-semibold text-sm text-stone-700 mb-1">
          ¿En qué podemos ayudarte?
        </label>
        <textarea
          className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 transition mb-2"
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Describe tu problema o consulta..."
          required
        />
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-xl text-white py-2 font-bold text-lg shadow-lg flex items-center gap-2 justify-center hover:scale-105 transition-all"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.04 }}
        >
          <FiSend /> Enviar consulta
        </motion.button>
      </form>
      <div>
        <h3 className="font-semibold text-gray-600 mb-3">Tus tickets enviados:</h3>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {tickets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-400 text-center"
              >
                No has enviado consultas aún.
              </motion.div>
            ) : (
              tickets.map(t => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="bg-blue-50/70 rounded-xl p-3 flex gap-2 items-start shadow"
                >
                  <FiCheckCircle className="mt-0.5 text-blue-400 text-lg shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">{t.date}</div>
                    <div className="text-stone-700">{t.message}</div>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={bottomRef}></div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Support;
