import { getCurrentUser } from '@/lib/session';

export default async function HomePage() {
  const user = await getCurrentUser();
  const displayName = user?.name?.trim() || user?.email;

  return (
    <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <section className="hero">
        <p className="hero__tag">TMDB watch tracker</p>
        {displayName && <p className="hero__welcome">Welcome back, {displayName}</p>}
        <h1 className="hero__name">ToView</h1>
        <p className="hero__bio">
          Search movies and series, save favorites, mark what you have watched,
          and keep comments attached to your account.
        </p>
      </section>

      <section className="stack">
        <h2 className="stack__title">Foundation ready</h2>
        <ul className="stack__list">
          {['Next.js', 'TMDB', 'SQLite', 'better-auth', 'TDD'].map(tech => (
            <li key={tech} className="stack__item">{tech}</li>
          ))}
        </ul>
      </section>

      <style>{`
        .hero { max-width: 680px; margin-bottom: 5rem; }
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
        .stack__title {
          font-size: 0.85rem;
          font-family: 'Geist Mono', monospace;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }
        .stack__list { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; }
        .stack__item {
          background: var(--bg-card);
          color: var(--text-card);
          font-size: 0.875rem;
          font-family: 'Geist Mono', monospace;
          padding: 0.35rem 0.85rem;
          border-radius: 6px;
          border: 1px solid #e7e5e4;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </main>
  );
}
