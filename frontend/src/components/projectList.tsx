import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";

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
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, employees }) => (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4 text-yellow-700 text-center tracking-tight">
      Proyectos registrados
    </h3>
    {projects.length === 0 ? (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-400 text-center"
      >
        Aún no hay proyectos.
      </motion.p>
    ) : (
      <ul className="space-y-6">
        <AnimatePresence>
          {projects.map((project, idx) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              className="list-none"
            >
              <div className="bg-yellow-50/80 rounded-2xl p-5 shadow border border-yellow-100 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-yellow-700">{project.name}</span>
                  <span className="ml-2 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold">
                    #{project.id.toString().slice(-4)}
                  </span>
                </div>
                {project.description && (
                  <div className="text-[15px] text-stone-600 mb-1">
                    {project.description}
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-semibold text-xs text-yellow-700">Asignados:</span>
                  <div className="flex -space-x-2">
                    {project.employees.length === 0 && (
                      <span className="text-xs text-gray-400 ml-1">Nadie asignado</span>
                    )}
                    {project.employees.map(empId => {
                      const emp = employees.find(e => e.id === empId);
                      if (!emp) return null;
                      return (
                        <span key={emp.id} title={emp.name}>
                          <img
                            src={`https://api.dicebear.com/9.x/notionists/svg?seed=${emp.name}`}
                            alt={emp.name}
                            className="inline-block size-7 rounded-full bg-yellow-100 border border-yellow-200"
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    )}
  </div>
);

export default ProjectList;
