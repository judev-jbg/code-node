import Link from 'next/link';
import { buildTmdbImageUrl } from '@/lib/media-utils.mjs';

export interface MediaItem {
  id: number;
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  year: string;
  releaseDate: string;
  overview: string;
  rating: number;
  posterPath: string | null;
  backdropPath: string | null;
}

interface Props {
  item: MediaItem;
  viewMode: 'grid' | 'list';
}

export default function MediaCard({ item, viewMode }: Props) {
  const posterUrl = buildTmdbImageUrl(item.posterPath, 'w342');
  const typeLabel = item.mediaType === 'movie' ? 'Movie' : 'Series';

  return (
    <article className={`media-card media-card--${viewMode}`}>
      <div className="media-card__poster" aria-hidden={!posterUrl}>
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={posterUrl} alt="" className="media-card__image" loading="lazy" />
        ) : (
          <span className="media-card__placeholder">No image</span>
        )}
      </div>

      <div className="media-card__body">
        <div className="media-card__meta">
          <span>{typeLabel}</span>
          <span>{item.year}</span>
          <span aria-label={`Rating ${item.rating} out of 10`}>★ {item.rating}</span>
        </div>
        <h2 className="media-card__title">{item.title}</h2>
        <p className="media-card__overview">{item.overview}</p>
        <Link href={`/media/${item.mediaType}/${item.tmdbId}`} className="media-card__link">
          View details
        </Link>
      </div>
    </article>
  );
}
