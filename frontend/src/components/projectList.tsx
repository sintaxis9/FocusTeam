import React from "react";

type Employee = { id: string; name: string };
type Project = {
  id: number;
  name: string;
  description: string;
  employees: string[];
};

type ProjectListProps = {
  projects: Project[];
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, employees, onDelete, onEdit }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-2">Proyectos registrados</h3>
    {projects.length === 0 ? (
      <p className="text-gray-500">Aún no hay proyectos.</p>
    ) : (
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4 border-b pb-2">
            <strong>{project.name}</strong>
            <div className="text-sm text-gray-600">{project.description}</div>
            <div className="text-xs mt-1">
              <span className="font-semibold">Asignados:</span>{" "}
              {project.employees.map(empId => {
                const emp = employees.find(e => e.id === empId);
                return emp ? emp.name : "Empleado desconocido";
              }).join(", ")}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="text-xs px-2 py-1 rounded bg-blue-200 text-blue-900"
                onClick={() => onEdit(project.id)}
              >
                Editar
              </button>
              <button
                className="text-xs px-2 py-1 rounded bg-red-200 text-red-900"
                onClick={() => onDelete(project.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ProjectList;
