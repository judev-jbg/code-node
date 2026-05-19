import Link from 'next/link';

interface Props {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  slug: string;
  url: string;
}

export default function ProjectCard({ titulo, descripcion, tecnologias, slug, url }: Props) {
  return (
    <article className="card">
      <div className="card__body">
        <h2 className="card__title">
          <Link href={`/proyectos/${slug}`}>{titulo}</Link>
        </h2>
        <p className="card__desc">{descripcion}</p>
        <ul className="card__tags">
          {tecnologias.map(tech => (
            <li key={tech} className="card__tag">{tech}</li>
          ))}
        </ul>
      </div>
      <div className="card__footer">
        <Link href={`/proyectos/${slug}`} className="card__link">Ver detalle →</Link>
        <a href={url} target="_blank" rel="noopener" className="card__link card__link--gh">GitHub ↗</a>
      </div>

      <style>{`
        .card {
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.5rem;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .card:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.13);
          transform: translateY(-2px);
        }
        .card__title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .card__title a { color: var(--text); transition: color 0.15s; }
        .card__title a:hover { color: #555; }
        .card__desc {
          font-size: 0.9rem;
          color: var(--text-card);
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          margin-bottom: 1.25rem;
        }
        .card__tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.75rem;
          background: #fff;
          border: 1px solid #e7e5e4;
          color: var(--text-muted);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }
        .card__footer {
          display: flex;
          gap: 1rem;
          border-top: 1px solid #e7e5e4;
          padding-top: 1rem;
        }
        .card__link {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: color 0.15s;
        }
        .card__link:hover { color: var(--text); }
        .card__link--gh { margin-left: auto; }
      `}</style>
    </article>
  );
}
