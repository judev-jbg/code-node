import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommentsSection from '@/app/components/CommentsSection';
import db from '@/lib/db';
import { listCommentsForMedia } from '@/lib/media-store.mjs';
import { buildTmdbImageUrl, isValidMediaType } from '@/lib/media-utils.mjs';
import { getCurrentUser } from '@/lib/session';
import { getMediaDetails } from '@/lib/tmdb.mjs';

export default async function MediaDetailPage(props: PageProps<'/media/[mediaType]/[tmdbId]'>) {
  const { mediaType, tmdbId } = await props.params;

  if (!isValidMediaType(mediaType)) {
    notFound();
  }

  const validMediaType = mediaType as 'movie' | 'tv';
  const detail = await getMediaDetails(validMediaType, tmdbId).catch(() => null);

  if (!detail) {
    notFound();
  }

  const posterUrl = buildTmdbImageUrl(detail.posterPath, 'w500');
  const backdropUrl = buildTmdbImageUrl(detail.backdropPath, 'w1280');
  const typeLabel = detail.mediaType === 'movie' ? 'Pelicula' : 'Serie';
  const formattedDate = detail.releaseDate
    ? new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(detail.releaseDate))
    : 'Fecha no disponible';
  const comments = listCommentsForMedia(db, {
    tmdbId: detail.tmdbId,
    mediaType: detail.mediaType,
  });
  const user = await getCurrentUser();

  return (
    <main className="detail-page">
      <section
        className="detail-hero"
        style={backdropUrl ? { backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.98), rgba(255,255,255,.72)), url(${backdropUrl})` } : undefined}
      >
        <div className="container detail-hero__inner">
          <Link href="/" className="detail-hero__back">Volver al buscador</Link>

          <article className="detail-card">
            <div className="detail-card__poster">
              {posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={posterUrl} alt="" className="detail-card__image" />
              ) : (
                <span className="detail-card__placeholder">Sin imagen</span>
              )}
            </div>

            <div className="detail-card__content">
              <p className="detail-card__type">{typeLabel}</p>
              <h1 className="detail-card__title">{detail.title}</h1>
              <dl className="detail-meta" aria-label="Datos principales">
                <div className="detail-meta__item">
                  <dt>Calificacion</dt>
                  <dd>{detail.rating}/10</dd>
                </div>
                <div className="detail-meta__item">
                  <dt>Fecha</dt>
                  <dd>{formattedDate}</dd>
                </div>
              </dl>

              <section className="detail-synopsis" aria-labelledby="synopsis-title">
                <h2 id="synopsis-title">Sinopsis</h2>
                <p>{detail.overview}</p>
              </section>
            </div>
          </article>
        </div>
      </section>

      <CommentsSection
        initialComments={comments}
        isAuthenticated={!!user}
        mediaType={validMediaType}
        tmdbId={detail.tmdbId}
      />
    </main>
  );
}
