import React from "react";

type Employee = { id: number; name: string; };

type TaskItemProps = {
  task: {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
    employees: number[];
  };
  employees: Employee[];
  onToggle: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, employees, onToggle }) => (
  <li className="mb-4 border-b pb-2 flex flex-col gap-1">
    <div className="flex justify-between items-center">
      <span
        className={`font-bold text-lg cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
        onClick={() => onToggle(task.id)}
        title="Marcar como completada"
      >
        {task.title}
      </span>
      <span
        className={`text-sm px-2 py-1 rounded ${
          task.completed
            ? "bg-green-200 text-green-700"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {task.completed ? "Completada" : "Pendiente"}
      </span>
    </div>
    <span className="text-sm text-gray-600">{task.description}</span>
    <span className="text-xs text-gray-500">
      Inicio: {task.startDate} | Fin: {task.endDate}
    </span>
    <span className="text-xs text-gray-800">
      <b>Empleados:</b>{" "}
      {task.employees.length === 0
        ? "Ninguno"
        : task.employees
            .map((id) => employees.find((emp) => emp.id === id)?.name)
            .filter(Boolean)
            .join(", ")}
    </span>
  </li>
);

export default TaskItem;
