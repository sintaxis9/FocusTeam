import React, { useState } from "react";
import TaskForm from "../components/taskForm";
import TaskItem from "../components/taskItem";

// Lista de empleados fijos
const EMPLOYEES = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "Ana Soto" },
  { id: 3, name: "Pedro Rojas" },
];

type Task = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  employees: number[]; // IDs de empleados
};

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    employees: [] as number[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmployeesChange = (id: number, checked: boolean) => {
    setForm(prevForm => ({
      ...prevForm,
      employees: checked
        ? [...prevForm.employees, id]
        : prevForm.employees.filter(empId => empId !== id)
    }));
  };


  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.startDate || !form.endDate) return;
    const newTask: Task = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      completed: false,
      employees: form.employees,
    };
    setTasks([...tasks, newTask]);
    setForm({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      employees: [],
    });
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Tareas</h2>
      <TaskForm
        form={form}
        employees={EMPLOYEES}
        onChange={handleChange}
        onEmployeesChange={handleEmployeesChange}
        onSubmit={handleAddTask}
      />

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            employees={EMPLOYEES}
            onToggle={toggleCompleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default Task;
