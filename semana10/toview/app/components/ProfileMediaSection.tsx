import Link from 'next/link';
import { buildMediaDetailPath, buildTmdbImageUrl } from '@/lib/media-utils.mjs';

interface ProfileMediaItem {
  id: number;
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  year: string;
}

interface Props {
  title: string;
  emptyText: string;
  items: ProfileMediaItem[];
}

export default function ProfileMediaSection({ title, emptyText, items }: Props) {
  return (
    <section className="profile-section" aria-labelledby={`profile-${title}`}>
      <div className="profile-section__header">
        <h2 className="profile-section__title" id={`profile-${title}`}>{title}</h2>
        <span className="profile-section__count">{items.length}</span>
      </div>

      {items.length > 0 ? (
        <ul className="profile-grid">
          {items.map(item => {
            const posterUrl = buildTmdbImageUrl(item.posterPath, 'w185');
            const typeLabel = item.mediaType === 'movie' ? 'Pelicula' : 'Serie';

            return (
              <li className="profile-grid__item" key={`${item.mediaType}-${item.tmdbId}`}>
                <Link href={buildMediaDetailPath(item.mediaType, item.tmdbId)} className="profile-card">
                  <span className="profile-card__poster">
                    {posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={posterUrl} alt="" className="profile-card__image" loading="lazy" />
                    ) : (
                      <span className="profile-card__placeholder">Sin imagen</span>
                    )}
                  </span>
                  <span className="profile-card__body">
                    <span className="profile-card__meta">{typeLabel} · {item.year}</span>
                    <span className="profile-card__title">{item.title}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="profile-section__empty">{emptyText}</p>
      )}
    </section>
  );
}
