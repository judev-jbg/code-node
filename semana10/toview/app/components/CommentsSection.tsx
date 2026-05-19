'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export interface MediaComment {
  id: number;
  content: string;
  createdAt: string;
  authorName: string;
  authorEmail: string;
}

interface Props {
  initialComments: MediaComment[];
  isAuthenticated: boolean;
  mediaType: 'movie' | 'tv';
  tmdbId: number;
}

export default function CommentsSection({
  initialComments,
  isAuthenticated,
  mediaType,
  tmdbId,
}: Props) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Escribe un comentario antes de publicarlo.');
      return;
    }

    setLoading(true);
    const response = await fetch(`/api/media/${mediaType}/${tmdbId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? 'No se pudo publicar el comentario.');
      return;
    }

    setComments(data.comments ?? []);
    setContent('');
  }

  return (
    <section className="container comments-panel" aria-labelledby="comments-title">
      <div className="comments-panel__header">
        <div>
          <p className="comments-panel__eyebrow">Comunidad</p>
          <h2 id="comments-title" className="comments-panel__title">Comentarios</h2>
        </div>
        {!isAuthenticated && (
          <Link href="/sign-in" className="comments-panel__button">Iniciar sesion para comentar</Link>
        )}
      </div>

      {isAuthenticated && (
        <form className="comment-form" onSubmit={handleSubmit}>
          {error && <p className="comment-form__error">{error}</p>}
          <label className="comment-form__label" htmlFor="comment-content">Nuevo comentario</label>
          <textarea
            id="comment-content"
            className="comment-form__input"
            value={content}
            onChange={event => setContent(event.target.value)}
            maxLength={500}
            rows={4}
            placeholder="Que te parecio este titulo?"
          />
          <button className="comment-form__button" type="submit" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar comentario'}
          </button>
        </form>
      )}

      {comments.length > 0 ? (
        <ul className="comments-list">
          {comments.map(comment => (
            <li className="comments-list__item" key={comment.id}>
              <div className="comments-list__meta">
                <strong>{comment.authorName || comment.authorEmail}</strong>
                <span>
                  {new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(comment.createdAt))}
                </span>
              </div>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="comments-panel__empty">Todavia no hay comentarios para este titulo.</p>
      )}
    </section>
  );
}
