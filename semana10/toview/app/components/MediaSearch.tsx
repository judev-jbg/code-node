'use client';

import { useEffect, useMemo, useState } from 'react';
import MediaCard, { MediaItem } from './MediaCard';

type ViewMode = 'grid' | 'list';

export default function MediaSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 450);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMedia() {
      setLoading(true);
      setError('');

      try {
        const params = debouncedQuery ? `?q=${encodeURIComponent(debouncedQuery)}` : '';
        const response = await fetch(`/api/media/search${params}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error ?? 'Unable to load media.');
          setItems([]);
          return;
        }

        setItems(data.items ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Unable to connect with the media service.');
        setItems([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadMedia();

    return () => controller.abort();
  }, [debouncedQuery]);

  const resultLabel = useMemo(() => {
    if (loading) return 'Loading titles';
    if (debouncedQuery) return `${items.length} results for "${debouncedQuery}"`;
    return `${items.length} trending titles`;
  }, [debouncedQuery, items.length, loading]);

  return (
    <section className="media-search" aria-labelledby="media-search-title">
      <div className="media-search__header">
        <div>
          <p className="media-search__eyebrow">Discover</p>
          <h2 className="media-search__title" id="media-search-title">Movies and series</h2>
        </div>

        <div className="view-toggle" aria-label="Choose results layout">
          <button
            className={`view-toggle__button ${viewMode === 'grid' ? 'view-toggle__button--active' : ''}`}
            type="button"
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            Grid
          </button>
          <button
            className={`view-toggle__button ${viewMode === 'list' ? 'view-toggle__button--active' : ''}`}
            type="button"
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            List
          </button>
        </div>
      </div>

      <label className="search-box" htmlFor="media-query">
        <span className="search-box__label">Search by title</span>
        <input
          id="media-query"
          className="search-box__input"
          type="search"
          placeholder="Try Arrival, Severance, Dune..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>

      <p className="media-search__status" role="status">{resultLabel}</p>

      {error && <p className="media-search__error">{error}</p>}

      {!error && (
        <div className={`media-results media-results--${viewMode}`} aria-busy={loading}>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div className="media-skeleton" key={index} />
            ))
          ) : items.length > 0 ? (
            items.map(item => (
              <MediaCard key={`${item.mediaType}-${item.tmdbId}`} item={item} viewMode={viewMode} />
            ))
          ) : (
            <p className="media-search__empty">No titles found. Try another search.</p>
          )}
        </div>
      )}
    </section>
  );
}
