'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  initialName: string;
  email: string;
}

export default function ProfileForm({ initialName, email }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('El nombre es requerido.');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/perfil', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() }),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'No se pudo actualizar el perfil.');
      return;
    }

    setSuccess('Perfil actualizado.');
    router.refresh();
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <div className="field">
        <label className="field__label">Email</label>
        <p className="field__readonly">{email}</p>
      </div>

      <div className="field">
        <label htmlFor="name" className="field__label">Nombre</label>
        <input id="name" className="field__input" type="text" value={name}
          onChange={e => setName(e.target.value)} required maxLength={120} />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Guardar cambios'}
      </button>

      <style>{`
        .profile-form { max-width: 520px; display: flex; flex-direction: column; gap: 1rem; }
        .field__label {
          display:block; font-size:.82rem; font-weight:600;
          margin-bottom:.35rem; color:var(--text-muted); font-family:'Geist Mono',monospace;
        }
        .field__readonly {
          border:1px solid #e7e5e4; border-radius:6px; background:var(--bg-card);
          padding:.6rem .85rem; color:var(--text-card);
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
