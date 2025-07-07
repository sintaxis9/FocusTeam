import React from "react";

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
  editingId?: number | null;
  onCancelEdit?: () => void;
};

const ProjectForm: React.FC<ProjectFormProps> = ({
  form,
  employees,
  onChange,
  onEmployeesChange,
  onSubmit,
  editingId,
  onCancelEdit
}) => (
  <form onSubmit={onSubmit} className="mb-6 grid gap-2">
    <input
      name="name"
      type="text"
      placeholder="Nombre del proyecto"
      value={form.name}
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
    <div className="flex gap-2 mt-2">
      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${editingId ? "bg-blue-500" : "bg-green-600"}`}
      >
        {editingId ? "Guardar cambios" : "Crear proyecto"}
      </button>
      {editingId && (
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-300 text-gray-700"
          onClick={onCancelEdit}
        >
          Cancelar
        </button>
      )}
    </div>
  </form>
);

export default ProjectForm;
