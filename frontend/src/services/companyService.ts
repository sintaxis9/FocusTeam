const API_BASE = 'https://focusteam-backend.onrender.com/api';


export async function registerCompany({
  name,
  adminEmail,
  domain,
  password,
}: {
  name: string;
  adminEmail: string;
  domain: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/company/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      domain,
      admin_email: adminEmail,
      password,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al registrar empresa');
  }

  return await res.json();
}

export async function getCompanies() {
  const res = await fetch(`${API_BASE}/company/domain`);
  if (!res.ok) throw new Error('Error obteniendo empresas');
  return await res.json();
}

export async function getCompanyInfo(domain: string) {
  const res = await fetch(`${API_BASE}/company/domain/${domain}/info`);
  if (!res.ok) throw new Error('Error obteniendo info de empresa');
  return await res.json();
}

export async function getCompanyUsers(domain: string) {
  const res = await fetch(`${API_BASE}/company/domain/${domain}/users`);
  if (!res.ok) throw new Error('Error obteniendo usuarios');
  return await res.json();
}

export async function addEmployee({ domain, adminEmail, email, password }: { domain: string, adminEmail: string, email: string, password: string }) {
  const res = await fetch(`${API_BASE}/company/domain/${domain}/add-employee`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      admin_email: adminEmail,
      email,
      password
    })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error agregando empleado');
  }
  return await res.json();
}
