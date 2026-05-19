'use client';

import { FormEvent, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function AdminUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { error: err } = await authClient.admin.createUser({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    });

    setLoading(false);

    if (err) {
      setError(err.message ?? 'No se pudo crear el usuario.');
      return;
    }

    setSuccess('Usuario creado correctamente.');
    setName('');
    setEmail('');
    setPassword('');
    setRole('user');
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <div className="field">
        <label htmlFor="name" className="field__label">Nombre</label>
        <input id="name" className="field__input" type="text" value={name}
          onChange={e => setName(e.target.value)} required maxLength={120} />
      </div>

      <div className="field">
        <label htmlFor="email" className="field__label">Email</label>
        <input id="email" className="field__input" type="email" value={email}
          onChange={e => setEmail(e.target.value)} required />
      </div>

      <div className="field">
        <label htmlFor="password" className="field__label">Contrasena</label>
        <input id="password" className="field__input" type="password" value={password}
          onChange={e => setPassword(e.target.value)} required minLength={8} />
      </div>

      <div className="field">
        <label htmlFor="role" className="field__label">Rol</label>
        <select id="role" className="field__input" value={role}
          onChange={e => setRole(e.target.value as 'user' | 'admin')}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear usuario'}
      </button>

      <style>{`
        .admin-form { max-width: 520px; display: flex; flex-direction: column; gap: 1rem; }
        .field__label {
          display:block; font-size:.82rem; font-weight:600;
          margin-bottom:.35rem; color:var(--text-muted); font-family:'Geist Mono',monospace;
        }
        .field__input {
          width:100%; padding:.6rem .85rem; border:1px solid #e7e5e4; border-radius:6px;
          font-size:.95rem; font-family:inherit; background:var(--bg); color:var(--text);
          outline:none; transition:border-color .15s;
        }
        .field__input:focus { border-color:var(--accent); }
        .form-error {
          background:#fee2e2; border:1px solid #fca5a5; color:#b91c1c;
          border-radius:6px; padding:.6rem .9rem; font-size:.875rem;
        }
        .form-success {
          background:#dcfce7; border:1px solid #86efac; color:#15803d;
          border-radius:6px; padding:.6rem .9rem; font-size:.875rem;
        }
        .btn-submit {
          align-self:flex-start; background:var(--accent); color:var(--text); border:none;
          padding:.7rem 1.5rem; border-radius:8px; font-size:.95rem; font-weight:600;
          cursor:pointer; transition:opacity .15s;
        }
        .btn-submit:hover { opacity:.85; }
        .btn-submit:disabled { opacity:.5; cursor:not-allowed; }
      `}</style>
    </form>
  );
}
