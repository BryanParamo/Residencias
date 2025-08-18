export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function apiGet(path) {
  const res = await fetch(`${API}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error GET ' + path);
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API}${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error DELETE ' + path);
  return res.json();
}

export async function apiForm(path, method, formData) {
  const res = await fetch(`${API}${path}`, { method, body: formData });
  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg?.message || `Error ${method} ${path}`);
  }
  return res.json();
}
