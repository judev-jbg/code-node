import { getCurrentUser } from '@/lib/session';
import MediaSearch from './components/MediaSearch';

export default async function HomePage() {
  const user = await getCurrentUser();
  const displayName = user?.name?.trim() || user?.email;

  return (
    <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <section className="hero">
        <p className="hero__tag">Buscador con TMDB</p>
        {displayName && <p className="hero__welcome">Bienvenido de nuevo, {displayName}</p>}
        <h1 className="hero__name">ToView</h1>
        <p className="hero__bio">
          Busca peliculas y series, guarda favoritas, marca lo que ya viste
          y conserva tus comentarios ligados a tu cuenta.
        </p>
      </section>

      <MediaSearch />

      <style>{`
        .hero { max-width: 680px; margin-bottom: 3rem; }
        .hero__welcome {
          display: inline-block;
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          border-radius: 6px;
          padding: 0.35rem 0.7rem;
          margin-bottom: 1rem;
          font-family: 'Geist Mono', monospace;
          font-size: 0.82rem;
          color: var(--text-card);
        }
        .hero__tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }
        .hero__name {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          margin-bottom: 1.25rem;
        }
        .hero__bio {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 2rem;
        }
      `}</style>
    </main>
  );
}
