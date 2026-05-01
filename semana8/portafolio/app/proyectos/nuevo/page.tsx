'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function NuevoProyectoPage() {
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [slug, setSlug] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tecnologias, setTecnologias] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setIsAuthenticated(!!data?.session);
      setSessionChecked(true);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const res = await fetch('/api/proyectos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: slug.trim(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        tecnologias: tecnologias.split(',').map(t => t.trim()).filter(Boolean),
        url: url.trim(),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? 'Error al guardar el proyecto.');
      return;
    }

    setSuccess('Proyecto creado correctamente.');
    setSlug(''); setTitulo(''); setDescripcion(''); setTecnologias(''); setUrl('');
    setTimeout(() => router.push('/proyectos'), 1200);
  }

  if (!sessionChecked) {
    return (
      <main className="container" style={{ paddingTop: '6rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Verificando sesión...
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="container" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          Debes iniciar sesión para añadir proyectos.
        </p>
        <Link href="/sign-in" className="btn-acc">Iniciar sesión</Link>
        <style>{`.btn-acc{display:inline-block;padding:.7rem 1.5rem;background:var(--accent);border-radius:8px;font-weight:600}`}</style>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

      <nav className="breadcrumb">
        <Link href="/proyectos">← Proyectos</Link>
      </nav>

      <header style={{ marginBottom: '2rem' }}>
        <p className="page-tag">Nuevo</p>
        <h1 className="page-title">Añadir proyecto</h1>
      </header>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <form className="nuevo-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="slug" className="field__label">Slug <span className="hint">(ej: mi-proyecto)</span></label>
          <input id="slug" className="field__input" type="text" placeholder="mi-proyecto"
            value={slug} onChange={e => setSlug(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="titulo" className="field__label">Título</label>
          <input id="titulo" className="field__input" type="text" placeholder="Nombre del proyecto"
            value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="descripcion" className="field__label">Descripción</label>
          <textarea id="descripcion" className="field__input field__textarea" rows={4}
            placeholder="Describe brevemente el proyecto..."
            value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="tecnologias" className="field__label">Tecnologías <span className="hint">(separadas por coma)</span></label>
          <input id="tecnologias" className="field__input" type="text" placeholder="React, Node.js, SQLite"
            value={tecnologias} onChange={e => setTecnologias(e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="url" className="field__label">URL del repositorio</label>
          <input id="url" className="field__input" type="url" placeholder="https://github.com/..."
            value={url} onChange={e => setUrl(e.target.value)} required />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Crear proyecto'}
          </button>
          <Link href="/proyectos" className="btn-cancel">Cancelar</Link>
        </div>
      </form>

      <style>{`
        .breadcrumb { margin-bottom: 2rem; font-size: 0.9rem; }
        .breadcrumb a { color: var(--text-muted); transition: color 0.15s; }
        .breadcrumb a:hover { color: var(--text); }
        .page-tag { font-family:'Geist Mono',monospace; font-size:.85rem; color:var(--text-muted); letter-spacing:.05em; margin-bottom:.5rem; }
        .page-title { font-size:2.25rem; font-weight:800; letter-spacing:-0.04em; }
        .form-error {
          background:#fee2e2; border:1px solid #fca5a5; color:#b91c1c;
          border-radius:6px; padding:.6rem .9rem; font-size:.875rem; margin-bottom:1.5rem;
        }
        .form-success {
          background:#dcfce7; border:1px solid #86efac; color:#15803d;
          border-radius:6px; padding:.6rem .9rem; font-size:.875rem; margin-bottom:1.5rem;
        }
        .nuevo-form { max-width: 560px; display: flex; flex-direction: column; gap: 1.25rem; }
        .field__label {
          display:block; font-size:.82rem; font-weight:600;
          margin-bottom:.35rem; color:var(--text-muted); font-family:'Geist Mono',monospace;
        }
        .hint { font-weight:400; }
        .field__input {
          width:100%; padding:.6rem .85rem; border:1px solid #e7e5e4; border-radius:6px;
          font-size:.95rem; font-family:inherit; background:var(--bg); color:var(--text);
          outline:none; transition:border-color .15s;
        }
        .field__input:focus { border-color:var(--accent); }
        .field__textarea { resize:vertical; }
        .form-actions { display:flex; gap:1rem; align-items:center; margin-top:.5rem; }
        .btn-submit {
          background:var(--accent); color:var(--text); border:none;
          padding:.7rem 1.5rem; border-radius:8px; font-size:.95rem; font-weight:600;
          cursor:pointer; transition:opacity .15s;
        }
        .btn-submit:hover { opacity:.85; }
        .btn-submit:disabled { opacity:.5; cursor:not-allowed; }
        .btn-cancel {
          font-size:.9rem; color:var(--text-muted);
          border-bottom:1px solid #e7e5e4; padding-bottom:1px;
        }
        .btn-cancel:hover { color:var(--text); }
      `}</style>
    </main>
  );
}
