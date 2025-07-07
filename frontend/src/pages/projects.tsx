import React, { useState, useEffect } from "react";
import ProjectForm from "../components/projectForm";
import ProjectList from "../components/projectList";
import { getCompanyUsers } from "../services/companyService";
import { useAuth } from "../context/authContext";
import type { CompanyUser } from "../types/user";
import { motion } from "framer-motion";

type Project = {
  id: number;
  name: string;
  description: string;
  employees: string[];
};

type Employee = { id: string; name: string };

const Project: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    employees: [] as string[],
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>("");

  // Obtener el dominio al cargar
  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch(`https://focusteam-backend.onrender.com/api/company/domain`)
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || "");
      });
  }, [user]);

  // Obtener empleados cuando tengas el dominio
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain)
      .then(data => {
        setEmployees(
          data.users.map((u: CompanyUser) => ({
            id: u._id,
            name: u.email,
          }))
        );
      });
  }, [domain]);

  // Definir clave única por empresa
  const LOCAL_PROJECTS_KEY = domain ? `projects_${domain}` : "projects_temp";

  // Cargar proyectos sólo cuando tengas el dominio
  useEffect(() => {
    if (!domain) return;
    const storedProjects = localStorage.getItem(LOCAL_PROJECTS_KEY);
    setProjects(storedProjects ? JSON.parse(storedProjects) : []);
  }, [domain]);

  // Guardar proyectos cuando cambian o cambia el dominio
  useEffect(() => {
    if (!domain) return;
    localStorage.setItem(LOCAL_PROJECTS_KEY, JSON.stringify(projects));
  }, [projects, domain]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmployeesChange = (id: string, checked: boolean) => {
    setForm(prevForm => ({
      ...prevForm,
      employees: checked
        ? [...prevForm.employees, id]
        : prevForm.employees.filter(empId => empId !== id)
    }));
  };

  // AGREGAR o EDITAR
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingId !== null) {
      // Editar existente
      setProjects(projects.map(p =>
        p.id === editingId
          ? { ...p, ...form }
          : p
      ));
      setEditingId(null);
    } else {
      // Crear nuevo
      const newProject: Project = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        employees: form.employees,
      };
      setProjects([...projects, newProject]);
    }
    setForm({
      name: "",
      description: "",
      employees: [],
    });
  };

  // ELIMINAR
  const handleDelete = (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proyecto?")) return;
    setProjects(projects.filter(p => p.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", description: "", employees: [] });
    }
  };

  // EDITAR: Cargar proyecto en el formulario
  const handleEdit = (id: number) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    setForm({
      name: project.name,
      description: project.description,
      employees: project.employees,
    });
    setEditingId(id);
  };

  // CANCELAR edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", description: "", employees: [] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl mx-auto my-10 p-6 pt-12 bg-white/90 rounded-3xl shadow-2xl backdrop-blur"
    >
      <h2 className="text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
        Proyectos
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <ProjectForm
          form={form}
          employees={employees}
          onChange={handleChange}
          onEmployeesChange={handleEmployeesChange}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancelEdit={handleCancelEdit}
        />
      </motion.div>
      {/* Listado de todos los proyectos */}
      <ProjectList
        projects={projects}
        employees={employees}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </motion.div>
  );
};

export default Project;
