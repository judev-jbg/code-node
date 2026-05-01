import ProjectCard from '../components/ProjectCard';

const API_URL = 'http://127.0.0.1:8080/wp_local/wp-json/portafolio/v1';

interface Proyecto {
  slug: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  url: string;
}

async function getProyectos(): Promise<{ data: Proyecto[]; error: boolean }> {
  try {
    const res = await fetch(`${API_URL}/proyectos`, { cache: 'no-store' });
    if (!res.ok) return { data: [], error: true };
    const data = await res.json();
    return { data, error: false };
  } catch {
    return { data: [], error: true };
  }
}

export default async function ProyectosPage() {
  const { data: proyectos, error: apiError } = await getProyectos();

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

      <header className="page-header">
        <p className="page-header__tag">Proyectos</p>
        <h1 className="page-header__title">Lo que he construido</h1>
        <p className="page-header__desc">
          Una selección de proyectos personales y de práctica disponibles en GitHub.
        </p>
      </header>

      {apiError && (
        <div className="api-notice">
          <span>⚠</span> No se pudo conectar con el servidor. Mostrando estado vacío.
        </div>
      )}

      {proyectos.length > 0 ? (
        <div className="grid">
          {proyectos.map(proyecto => (
            <ProjectCard
              key={proyecto.slug}
              titulo={proyecto.titulo}
              descripcion={proyecto.descripcion}
              tecnologias={proyecto.tecnologias}
              slug={proyecto.slug}
              url={proyecto.url}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state__icon">📂</p>
          <p className="empty-state__title">No hay proyectos disponibles</p>
          <p className="empty-state__desc">
            {apiError
              ? 'El servidor no está disponible en este momento. Inténtalo más tarde.'
              : 'Aún no hay proyectos publicados.'}
          </p>
        </div>
      )}

      <style>{`
        .page-header { margin-bottom: 2rem; }
        .page-header__tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .page-header__title {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 0.75rem;
        }
        .page-header__desc { font-size: 1rem; color: var(--text-muted); }
        .api-notice {
          background: #fef9c3;
          border: 1px solid #fde047;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #713f12;
          margin-bottom: 2rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .empty-state {
          text-align: center;
          padding: 5rem 1rem;
          border: 2px dashed #e7e5e4;
          border-radius: var(--radius);
          background: var(--bg-card);
        }
        .empty-state__icon { font-size: 3rem; margin-bottom: 1rem; }
        .empty-state__title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .empty-state__desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 400px;
          margin: 0 auto;
        }
      `}</style>
    </main>
  );
}
