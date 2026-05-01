import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

      <section className="hero">
        <p className="hero__tag">Software Engineer</p>
        <h1 className="hero__name">Junior B. Gonzales</h1>
        <p className="hero__bio">
          Fundador de <strong>JuDev</strong>, apasionado por construir productos digitales
          con código limpio y buenas prácticas. Resido en <strong>Pamplona, España</strong>.
        </p>
        <div className="hero__actions">
          <Link href="/proyectos" className="btn btn--primary">Ver proyectos</Link>
          <a
            href="https://github.com/judev-jbg"
            target="_blank"
            rel="noopener"
            className="btn btn--ghost"
          >
            GitHub →
          </a>
        </div>
      </section>

      <section className="stack">
        <h2 className="stack__title">Stack principal</h2>
        <ul className="stack__list">
          {['JavaScript', 'TypeScript', 'Vue', 'Python', 'PHP', 'Kotlin', 'Node.js', 'REST APIs'].map(tech => (
            <li key={tech} className="stack__item">{tech}</li>
          ))}
        </ul>
      </section>

      <style>{`
        .hero { max-width: 680px; margin-bottom: 5rem; }
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
        .hero__bio strong { color: var(--text); }
        .hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn {
          display: inline-block;
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.15s;
        }
        .btn--primary {
          background-color: var(--accent);
          color: var(--text);
          box-shadow: var(--shadow);
        }
        .btn--primary:hover { opacity: 0.85; }
        .btn--ghost {
          border: 1px solid #e7e5e4;
          color: var(--text-muted);
          background: var(--bg-card);
        }
        .btn--ghost:hover { color: var(--text); border-color: var(--text); }
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
