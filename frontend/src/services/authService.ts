// src/services/authService.ts
const API_BASE = 'https://focusteam-backend.onrender.com/api';

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error en login');
  }
  return await res.json();
}
