import Link from 'next/link';

const API_URL = 'http://127.0.0.1:8080/wp_local/wp-json/portafolio/v1';

interface Perfil {
  nombre: string;
  rol: string;
  bio: string;
  ubicacion: string;
  github: string;
}

async function getPerfil(): Promise<{ data: Perfil | null; error: boolean }> {
  try {
    const res = await fetch(`${API_URL}/perfil`, { cache: 'no-store' });
    if (!res.ok) return { data: null, error: true };
    const data = await res.json();
    return { data, error: false };
  } catch {
    return { data: null, error: true };
  }
}

export default async function HomePage() {
  const { data: perfil, error: apiError } = await getPerfil();

  return (
    <main className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

      {apiError && (
        <div className="api-notice">
          <span>⚠</span> Los datos se están cargando desde modo local. La API no está disponible.
        </div>
      )}

      <section className="hero">
        <p className="hero__tag">{perfil ? perfil.rol : 'Software Engineer'}</p>
        <h1 className="hero__name">{perfil ? perfil.nombre : 'Junior B. Gonzales'}</h1>
        {perfil ? (
          <p className="hero__bio">
            {perfil.bio} Resido en <strong>{perfil.ubicacion}</strong>.
          </p>
        ) : apiError ? (
          <p className="hero__bio hero__bio--empty">
            No se pudo cargar la información del perfil. Inténtalo más tarde.
          </p>
        ) : null}
        <div className="hero__actions">
          <Link href="/proyectos" className="btn btn--primary">Ver proyectos</Link>
          <a
            href={perfil?.github ?? 'https://github.com/judev-jbg'}
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
        .api-notice {
          background: #fef9c3;
          border: 1px solid #fde047;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #713f12;
          margin-bottom: 2.5rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
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
        .hero__bio--empty { font-style: italic; color: #a8a29e; }
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
