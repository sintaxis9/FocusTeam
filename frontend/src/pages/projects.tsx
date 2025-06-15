import React, { useState, useEffect } from "react";
import ProjectForm from "../components/projectForm";
import ProjectList from "../components/projectList";
import { getCompanyUsers } from "../services/companyService";
import { useAuth } from "../context/authContext";
import type { CompanyUser } from "../types/user";

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
  const { user } = useAuth();
  const [domain, setDomain] = useState<string>("");

  // 1. Obtener el dominio al cargar
  useEffect(() => {
    if (!user?.empresa_id) return;
    fetch(`https://focusteam-backend.onrender.com/api/company/domain`)
      .then(res => res.json())
      .then(data => {
        const myCompany = data.companies.find((c: any) => c._id === user.empresa_id);
        setDomain(myCompany?.domain || "");
      });
  }, [user]);

  // 2. Obtener empleados cuando tengas el dominio
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain)
      .then(data => {
        setEmployees(
          data.users.map((u: CompanyUser) => ({
            id: u._id,
            name: u.email, // O nombre real
          }))
        );
      });
  }, [domain]);

  // 3. Definir clave única por empresa
  const LOCAL_PROJECTS_KEY = domain ? `projects_${domain}` : "projects_temp";

  // 4. Cargar proyectos sólo cuando tengas el dominio
  useEffect(() => {
    if (!domain) return;
    const storedProjects = localStorage.getItem(LOCAL_PROJECTS_KEY);
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects([]);
    }
  }, [domain]);

  // 5. Guardar proyectos cuando cambian o cambia el dominio
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

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newProject: Project = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      employees: form.employees,
    };
    setProjects([...projects, newProject]);
    setForm({
      name: "",
      description: "",
      employees: [],
    });
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
      <ProjectForm
        form={form}
        employees={employees}
        onChange={handleChange}
        onEmployeesChange={handleEmployeesChange}
        onSubmit={handleAddProject}
      />
      {/* Listado de todos los proyectos */}
      <ProjectList
        projects={projects}
        employees={employees}
      />
    </div>
  );
};

export default Project;
