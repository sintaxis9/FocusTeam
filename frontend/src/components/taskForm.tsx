import React from "react";

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
  <form onSubmit={onSubmit} className="mb-6 grid gap-2">
    <input
      name="title"
      type="text"
      placeholder="Título"
      value={form.title}
      onChange={onChange}
      className="border p-2 rounded"
      required
    />
    <textarea
      name="description"
      placeholder="Descripción"
      value={form.description}
      onChange={onChange}
      className="border p-2 rounded"
    />
    <div className="flex gap-2">
      <input
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={onChange}
        className="border p-2 rounded w-1/2"
        required
      />
      <input
        name="endDate"
        type="date"
        value={form.endDate}
        onChange={onChange}
        className="border p-2 rounded w-1/2"
        required
      />
    </div>
    <div>
      <label className="block mb-1 font-medium">Empleados asignados:</label>
      <div className="flex flex-col gap-1">
        {employees.map(emp => (
          <label key={emp.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={emp.id}
              checked={form.employees.includes(emp.id)}
              onChange={e => onEmployeesChange(emp.id, e.target.checked)}
            />
            {emp.name}
          </label>
        ))}
      </div>
    </div>
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
    >
      Agregar tarea
    </button>
  </form>
);

export default TaskForm;
