import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import db from '@/lib/db';

interface Proyecto {
  slug: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  url: string;
}

interface ProyectoRow {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  tecnologias: string;
  url: string;
}

function getProyectos(): Proyecto[] {
  const rows = db.prepare('SELECT * FROM proyectos ORDER BY id ASC').all() as ProyectoRow[];
  return rows.map(p => ({ ...p, tecnologias: p.tecnologias.split(',').map(t => t.trim()) }));
}

export default function ProyectosPage() {
  const proyectos = getProyectos();

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

      <header className="page-header">
        <p className="page-header__tag">Proyectos</p>
        <h1 className="page-header__title">Lo que he construido</h1>
        <p className="page-header__desc">
          Una selección de proyectos personales y de práctica disponibles en GitHub.
        </p>
        <Link href="/proyectos/nuevo" className="btn-nuevo">+ Nuevo proyecto</Link>
      </header>

      {proyectos.length > 0 ? (
        <div className="grid">
          {proyectos.map((proyecto: Proyecto) => (
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
          <p className="empty-state__desc">Aún no hay proyectos publicados.</p>
        </div>
      )}

      <style>{`
        .page-header { margin-bottom: 2rem; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 1rem; }
        .page-header > :not(.btn-nuevo) { flex: 1 1 100%; }
        .btn-nuevo {
          display: inline-block;
          padding: 0.55rem 1.25rem;
          background: var(--accent);
          color: var(--text);
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          box-shadow: var(--shadow);
          white-space: nowrap;
          align-self: center;
        }
        .btn-nuevo:hover { opacity: 0.85; }
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
