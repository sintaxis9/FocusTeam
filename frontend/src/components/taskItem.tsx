import React from "react";

type Employee = { id: string; name: string };
type Task = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  employees: string[];
};

type TaskItemProps = {
  task: Task;
  employees: Employee[];
  onToggle: (id: number) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, employees, onToggle }) => (
  <li className="mb-3 flex flex-col border-b pb-2">
    <div className="flex items-center justify-between">
      <span
        className={task.completed ? "line-through text-gray-500" : ""}
        style={{ cursor: "pointer" }}
        onClick={() => onToggle(task.id)}
      >
        <strong>{task.title}</strong> ({task.startDate} - {task.endDate})
      </span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="ml-2"
      />
    </div>
    <div className="text-sm text-gray-600 mt-1">
      {task.description}
    </div>
    <div className="text-xs mt-1">
      <span className="font-semibold">Asignados:</span>{" "}
      {task.employees.map(empId => {
        const emp = employees.find(e => e.id === empId);
        return emp ? emp.name : "Empleado desconocido";
      }).join(", ")}
    </div>
  </li>
);

export default TaskItem;
