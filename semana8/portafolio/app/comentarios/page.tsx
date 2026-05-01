'use client';

import { useState, useEffect, useCallback } from 'react';
import ComentarioForm from '../components/ComentarioForm';

interface Comentario {
  id: number;
  autor: string;
  contenido: string;
  createdAt: string;
}

export default function ComentariosPage() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComentarios = useCallback(async () => {
    try {
      const res = await fetch('/api/comentarios');
      if (res.ok) setComentarios(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchComentarios(); }, [fetchComentarios]);

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

      <header style={{ marginBottom: '2rem' }}>
        <p className="page-tag">Comentarios</p>
        <h1 className="page-title">Lo que dicen</h1>
        <p className="page-desc">Deja tu comentario o mensaje. Aparecerá en esta página.</p>
      </header>

      <ComentarioForm onAdded={fetchComentarios} />

      <section>
        <h2 className="lista-title">Comentarios recientes</h2>
        {loading ? (
          <p className="empty-msg">Cargando comentarios...</p>
        ) : comentarios.length === 0 ? (
          <p className="empty-msg">Todavía no hay comentarios. ¡Sé el primero!</p>
        ) : (
          <ul className="lista">
            {comentarios.map(c => (
              <li key={c.id} className="comentario">
                <div className="comentario__header">
                  <span className="comentario__autor">{c.autor}</span>
                  <span className="comentario__fecha">
                    {new Date(c.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'short', year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="comentario__texto">{c.contenido}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <style>{`
        .page-tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 0.75rem;
        }
        .page-desc { font-size: 1rem; color: var(--text-muted); }
        .lista-title {
          font-size: 1rem;
          font-family: 'Geist Mono', monospace;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
        }
        .empty-msg { color: var(--text-muted); font-size: 0.95rem; }
        .lista { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .comentario {
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          border-radius: var(--radius);
          padding: 1.25rem 1.5rem;
        }
        .comentario__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .comentario__autor {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .comentario__fecha {
          font-family: 'Geist Mono', monospace;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .comentario__texto {
          font-size: 0.95rem;
          color: var(--text-card);
          line-height: 1.65;
        }
      `}</style>
    </main>
  );
}
