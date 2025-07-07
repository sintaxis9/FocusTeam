import React from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

type Employee = { id: string; name: string };

type ProjectFormProps = {
  form: {
    name: string;
    description: string;
    employees: string[];
  };
  employees: Employee[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEmployeesChange: (id: string, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ProjectForm: React.FC<ProjectFormProps> = ({
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
    className="bg-white/80 rounded-2xl shadow p-5 grid gap-4 border border-yellow-100"
  >
    <h3 className="text-lg font-bold mb-1 text-yellow-700">Nuevo proyecto</h3>
    <div>
      <label htmlFor="name" className="font-semibold text-sm text-stone-700">Nombre del proyecto</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Nombre del proyecto"
        value={form.name}
        onChange={onChange}
        className="mt-1 border border-yellow-100 rounded-lg p-2 w-full focus:ring-2 focus:ring-yellow-400 transition"
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
        className="mt-1 border border-yellow-100 rounded-lg p-2 w-full min-h-[70px] focus:ring-2 focus:ring-yellow-400 transition"
      />
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
            className="flex items-center gap-2 py-1 px-2 rounded hover:bg-yellow-50 transition"
          >
            <input
              type="checkbox"
              value={emp.id}
              checked={form.employees.includes(emp.id)}
              onChange={e => onEmployeesChange(emp.id, e.target.checked)}
              className="accent-yellow-500"
            />
            <img
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${emp.name}`}
              alt="avatar"
              className="size-6 rounded bg-yellow-100"
            />
            <span className="flex items-center gap-1 font-medium text-stone-800">
              {emp.name}
              <FiUser className="ml-1 text-yellow-400" />
            </span>
          </label>
        ))}
      </div>
    </div>
    <motion.button
      type="submit"
      className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl text-white py-2 font-bold text-lg shadow-lg hover:scale-105 transition-all mt-2"
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.04 }}
    >
      Crear proyecto
    </motion.button>
  </motion.form>
);

export default ProjectForm;
