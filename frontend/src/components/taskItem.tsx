import React from "react";

type Employee = { id: string; name: string; rol?: string };
type Task = {
  id: string;
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
  onToggle: (id: string) => void;
  isAdmin: boolean;
  currentUserId: string;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, employees, onToggle, isAdmin, currentUserId }) => {
  const canToggle = isAdmin || task.employees.includes(currentUserId);

  return (
    <li className="mb-3 flex flex-col border-b pb-2">
      <div className="flex items-center justify-between">
        <span
          className={task.completed ? "line-through text-gray-500" : ""}
          style={{ cursor: canToggle ? "pointer" : "default" }}
          onClick={canToggle ? () => onToggle(task.id) : undefined}
        >
          <strong>{task.title}</strong> ({task.startDate} - {task.endDate})
        </span>

      </div>
      <div className="text-sm text-gray-600 mt-1">{task.description}</div>
      <div className="text-xs mt-1">
        <span className="font-semibold">Asignados:</span>{" "}
        {task.employees
          .map((empId) => {
            const emp = employees.find((e) => e.id === empId);
            return emp ? emp.name : "Empleado desconocido";
          })
          .join(", ")}
      </div>
    </li>
  );
};

export default TaskItem;
