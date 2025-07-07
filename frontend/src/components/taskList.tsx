import React from "react";
import TaskItem from "./taskItem";
import { motion, AnimatePresence } from "framer-motion";

type Employee = { id: string; name: string; rol: string };
type Task = {
  id: string;
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
  onToggle: (id: string) => void;
  isAdmin: boolean;
  currentUserId: string;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  employees,
  onToggle,
  isAdmin,
  currentUserId
}) => (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center tracking-tight">
      Tareas registradas
    </h3>
    {tasks.length === 0 ? (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-400 text-center"
      >
        Aún no hay tareas.
      </motion.p>
    ) : (
      <ul className="space-y-4">
        <AnimatePresence>
          {tasks.map((task, idx) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="list-none"
            >
              <TaskItem
                task={task}
                employees={employees}
                onToggle={onToggle}
                isAdmin={isAdmin}
                currentUserId={currentUserId}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    )}
  </div>
);

export default TaskList;
