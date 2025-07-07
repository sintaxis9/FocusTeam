import React from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

type Employee = { id: string; name: string; rol: string };

type TaskFormProps = {
  form: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    employees: string[];
  };
  employees: Employee[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEmployeesChange: (id: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  form,
  employees,
  onChange,
  onEmployeesChange,
  onSubmit,
}) => (
  <motion.form
    onSubmit={onSubmit}
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/80 rounded-2xl shadow p-5 grid gap-4 border border-blue-100"
  >
    <h3 className="text-lg font-bold mb-1 text-indigo-700">Nueva tarea</h3>
    <div>
      <label htmlFor="title" className="font-semibold text-sm text-stone-700">Título</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Título"
        value={form.title}
        onChange={onChange}
        className="mt-1 border border-blue-100 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition"
        required
      />
    </div>
    <div>
      <label htmlFor="description" className="font-semibold text-sm text-stone-700">Descripción</label>
      <textarea
        id="description"
        name="description"
        placeholder="Descripción"
        value={form.description}
        onChange={onChange}
        className="mt-1 border border-blue-100 rounded-lg p-2 w-full min-h-[70px] focus:ring-2 focus:ring-indigo-400 transition"
      />
    </div>
    <div className="flex gap-3">
      <div className="flex-1">
        <label htmlFor="startDate" className="font-semibold text-sm text-stone-700">Fecha inicio</label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={onChange}
          className="mt-1 border border-blue-100 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition"
          required
        />
      </div>
      <div className="flex-1">
        <label htmlFor="endDate" className="font-semibold text-sm text-stone-700">Fecha final</label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={onChange}
          className="mt-1 border border-blue-100 rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-400 transition"
          required
        />
      </div>
    </div>
    <div>
      <label className="font-semibold text-sm text-stone-700 mb-1 block">Asignar a empleados</label>
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
        {employees.length === 0 && (
          <div className="text-sm text-gray-400 italic">No hay empleados disponibles.</div>
        )}
        {employees.map(emp => (
          <label
            key={emp.id}
            className="flex items-center gap-2 py-1 px-2 rounded hover:bg-blue-50 transition"
          >
            <input
              type="checkbox"
              value={emp.id}
              checked={form.employees.includes(emp.id)}
              onChange={e => onEmployeesChange(emp.id, e.target.checked)}
              className="accent-indigo-600"
            />
            <img
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${emp.name}`}
              alt="avatar"
              className="size-6 rounded bg-blue-100"
            />
            <span className="flex items-center gap-1 font-medium text-stone-800">
              {emp.name}
              <FiUser className="ml-1 text-blue-400" />
            </span>
          </label>
        ))}
      </div>
    </div>
    <motion.button
      type="submit"
      className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl text-white py-2 font-bold text-lg shadow-lg hover:scale-105 transition-all mt-2"
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.04 }}
    >
      Agregar tarea
    </motion.button>
  </motion.form>
);

export default TaskForm;
