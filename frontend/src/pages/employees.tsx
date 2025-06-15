import React, { useEffect, useState } from 'react';
import { getCompanyUsers, addEmployee } from '../services/companyService';
import { useAuth } from '../context/authContext';
import type { CompanyUser } from '../types/user';

const Employees: React.FC = () => {
  const [users, setUsers] = useState<CompanyUser[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { user } = useAuth();

  // Saca el dominio real (lo podrías traer desde el backend, aquí te muestro cómo obtenerlo tras login)
  // Puedes guardar también el dominio en user (ideal si el backend lo retorna en login)
  const empresaId = user?.empresa_id;

  // Si tienes el dominio en user, usa eso. Si no, podrías pedirlo a la API con empresa_id (hazlo si tu backend lo soporta).
  // Aquí, para efectos prácticos, imagina que tienes el dominio:
  const [domain, setDomain] = useState<string>('');

  useEffect(() => {
    // Busca dominio usando empresa_id
    const fetchDomain = async () => {
      if (!empresaId) return;
      try {
        const res = await fetch(`https://focusteam-backend.onrender.com/api/company/domain`);
        const data = await res.json();
        // Busca la empresa correspondiente al empresa_id
        const myCompany = data.companies.find((c: any) => c._id === empresaId);
        setDomain(myCompany?.domain || '');
      } catch {
        setError("No se pudo obtener el dominio de la empresa.");
      }
    };
    fetchDomain();
  }, [empresaId]);

  // Carga los usuarios cuando ya tienes el dominio
  useEffect(() => {
    if (!domain) return;
    getCompanyUsers(domain).then(data => setUsers(data.users));
  }, [domain]);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await addEmployee({
        domain,
        adminEmail: user?.email || "",
        email,
        password
      });
      const updated = await getCompanyUsers(domain);
      setUsers(updated.users);
      setEmail('');
      setPassword('');
      setSuccess("Empleado agregado exitosamente.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Solo admin puede ver el formulario de agregar empleados
  const isAdmin = user?.userType === 'admin';

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        Empleados de {domain ? <span className="text-blue-700">{domain}</span> : '...'}
      </h2>
      <ul className="mb-6">
        {users.map(u => (
          <li key={u._id} className="mb-2">
            <span className="font-medium">{u.email}</span> <span className="ml-2 text-gray-500">({u.rol})</span>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <form onSubmit={handleAddEmployee} className="space-y-3 mb-4">
          <h3 className="text-lg font-semibold mb-2">Agregar empleado</h3>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Correo empleado"
            type="email"
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="border rounded p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            Agregar empleado
          </button>
        </form>
      )}

      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {!isAdmin && (
        <div className="text-sm text-gray-500">
          Solo los administradores pueden agregar empleados.
        </div>
      )}
    </div>
  );
};

export default Employees;
