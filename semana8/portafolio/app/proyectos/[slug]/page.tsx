import Link from 'next/link';
import { notFound } from 'next/navigation';
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

export function generateStaticParams() {
  const proyectos = getProyectos();
  return proyectos.map(p => ({ slug: p.slug }));
}

export default async function ProyectoDetallePage(props: PageProps<'/proyectos/[slug]'>) {
  const { slug } = await props.params;
  const proyectos = getProyectos();
  const proyecto = proyectos.find(p => p.slug === slug);

  if (!proyecto) notFound();

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

      <nav className="breadcrumb">
        <Link href="/proyectos">← Proyectos</Link>
      </nav>

      <article className="detalle">
        <h1 className="detalle__titulo">{proyecto.titulo}</h1>
        <p className="detalle__desc">{proyecto.descripcion}</p>

        <section className="detalle__section">
          <h2 className="detalle__label">Tecnologías</h2>
          <ul className="detalle__tags">
            {proyecto.tecnologias.map(tech => (
              <li key={tech} className="detalle__tag">{tech}</li>
            ))}
          </ul>
        </section>

        <section className="detalle__section">
          <h2 className="detalle__label">Repositorio</h2>
          <a href={proyecto.url} target="_blank" rel="noopener" className="detalle__repo">
            {proyecto.url} ↗
          </a>
        </section>
      </article>

      <style>{`
        .breadcrumb { margin-bottom: 2.5rem; font-size: 0.9rem; }
        .breadcrumb a { color: var(--text-muted); transition: color 0.15s; }
        .breadcrumb a:hover { color: var(--text); }
        .detalle { max-width: 680px; }
        .detalle__titulo {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
        }
        .detalle__desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }
        .detalle__section { margin-bottom: 2rem; }
        .detalle__label {
          font-family: 'Geist Mono', monospace;
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .detalle__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none; }
        .detalle__tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.875rem;
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          color: var(--text-card);
          padding: 0.35rem 0.85rem;
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .detalle__repo {
          font-family: 'Geist Mono', monospace;
          font-size: 0.9rem;
          color: var(--text);
          word-break: break-all;
          border-bottom: 2px solid var(--accent);
          padding-bottom: 1px;
        }
        .detalle__repo:hover { color: var(--text-muted); }
      `}</style>
    </main>
  );
}
