import React from "react";
import TaskItem from "./taskItem"; // asegúrate de que el path sea correcto

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

type TaskListProps = {
  tasks: Task[];
  employees: Employee[];
  onToggle: (id: number) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, employees, onToggle }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-2">Tareas registradas</h3>
    {tasks.length === 0 ? (
      <p className="text-gray-500">Aún no hay tareas.</p>
    ) : (
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            employees={employees}
            onToggle={onToggle}
          />
        ))}
      </ul>
    )}
  </div>
);

export default TaskList;
