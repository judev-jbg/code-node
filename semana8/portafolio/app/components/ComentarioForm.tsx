'use client';

import { useState, FormEvent } from 'react';

interface Props {
  onAdded: () => void;
}

export default function ComentarioForm({ onAdded }: Props) {
  const [autor, setAutor] = useState('');
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!autor.trim() || !contenido.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autor: autor.trim(), contenido: contenido.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Error al enviar el comentario.');
        return;
      }
      setAutor('');
      setContenido('');
      onAdded();
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="comentario-form" onSubmit={handleSubmit}>
      <h2 className="comentario-form__title">Dejar un comentario</h2>

      {error && <p className="comentario-form__error">{error}</p>}

      <div className="field">
        <label htmlFor="autor" className="field__label">Nombre</label>
        <input
          id="autor"
          className="field__input"
          type="text"
          placeholder="Tu nombre"
          value={autor}
          onChange={e => setAutor(e.target.value)}
          maxLength={80}
        />
      </div>

      <div className="field">
        <label htmlFor="contenido" className="field__label">Comentario</label>
        <textarea
          id="contenido"
          className="field__input field__textarea"
          placeholder="Escribe tu comentario..."
          rows={4}
          value={contenido}
          onChange={e => setContenido(e.target.value)}
          maxLength={500}
        />
      </div>

      <button type="submit" className="field__btn" disabled={loading}>
        {loading ? 'Enviando...' : 'Publicar'}
      </button>

      <style>{`
        .comentario-form {
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          border-radius: var(--radius);
          padding: 1.75rem;
          margin-bottom: 3rem;
        }
        .comentario-form__title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .comentario-form__error {
          background: #fee2e2;
          border: 1px solid #fca5a5;
          color: #b91c1c;
          border-radius: 6px;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .field { margin-bottom: 1rem; }
        .field__label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
          color: var(--text-muted);
          font-family: 'Geist Mono', monospace;
        }
        .field__input {
          width: 100%;
          padding: 0.6rem 0.85rem;
          border: 1px solid #e7e5e4;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
          background: var(--bg);
          color: var(--text);
          outline: none;
          transition: border-color 0.15s;
        }
        .field__input:focus { border-color: var(--accent); }
        .field__textarea { resize: vertical; }
        .field__btn {
          background: var(--accent);
          color: var(--text);
          border: none;
          padding: 0.65rem 1.5rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .field__btn:hover { opacity: 0.85; }
        .field__btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </form>
  );
}
