'use client';

import { useState } from 'react';

interface Props {
  initialState: {
    isFavorite: boolean;
    isWatched: boolean;
  };
  mediaType: 'movie' | 'tv';
  tmdbId: number;
}

export default function MediaStateControls({ initialState, mediaType, tmdbId }: Props) {
  const [state, setState] = useState(initialState);
  const [loadingFlag, setLoadingFlag] = useState<'isFavorite' | 'isWatched' | null>(null);
  const [error, setError] = useState('');

  async function toggle(flag: 'isFavorite' | 'isWatched') {
    setError('');
    setLoadingFlag(flag);

    const response = await fetch(`/api/media/${mediaType}/${tmdbId}/state`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flag }),
    });
    const data = await response.json();
    setLoadingFlag(null);

    if (!response.ok) {
      setError(data.error ?? 'No se pudo actualizar el estado.');
      return;
    }

    setState(data);
  }

  return (
    <section className="state-controls" aria-label="Estado personal">
      <div className="state-controls__buttons">
        <button
          type="button"
          className={`state-controls__heart ${state.isFavorite ? 'state-controls__heart--active' : ''}`}
          onClick={() => toggle('isFavorite')}
          disabled={loadingFlag !== null}
          aria-pressed={state.isFavorite}
          aria-label={state.isFavorite ? 'Quitar de favoritos' : 'Anadir a favoritos'}
          title={state.isFavorite ? 'Quitar de favoritos' : 'Anadir a favoritos'}
        >
          {state.isFavorite ? '♥' : '♡'}
        </button>
        <button
          type="button"
          className={`state-controls__watched ${state.isWatched ? 'state-controls__watched--active' : ''}`}
          onClick={() => toggle('isWatched')}
          disabled={loadingFlag !== null}
          aria-pressed={state.isWatched}
        >
          {state.isWatched ? 'Visto' : 'Marcar visto'}
        </button>
      </div>
      {error && <p className="state-controls__error">{error}</p>}
    </section>
  );
}
