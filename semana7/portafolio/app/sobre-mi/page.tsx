export default function SobreMiPage() {
  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem', maxWidth: '720px' }}>
      <article className="sobre-mi">
        <h1>Sobre mí</h1>

        <p>
          Soy <strong>Junior B. Gonzales</strong>, Software Engineer con sede en{' '}
          <strong>Pamplona, España</strong>. Fundador de <strong>JuDev</strong>, apasionado por
          construir productos digitales con código limpio y buenas prácticas.
        </p>

        <p>
          Actualmente en formación avanzada en el bootcamp <strong>Code Node</strong>, donde
          profundizo en WordPress, Astro y Next.js en el desarrollo web.
        </p>

        <hr />

        <h2>Stack tecnológico</h2>

        <h3>Frontend</h3>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>Vue.js</li>
          <li>Astro</li>
          <li>HTML &amp; CSS</li>
        </ul>

        <h3>Backend</h3>
        <ul>
          <li>Node.js</li>
          <li>Python</li>
          <li>PHP / WordPress</li>
        </ul>

        <h3>Mobile</h3>
        <ul>
          <li>Kotlin (Android)</li>
        </ul>

        <h3>Herramientas</h3>
        <ul>
          <li>Git / GitHub</li>
          <li>REST APIs</li>
          <li>WooCommerce / ACF</li>
          <li>XAMPP / Linux</li>
        </ul>

        <hr />

        <h2>Proyectos destacados</h2>
        <ul>
          <li><strong>skillmatch</strong> — Plataforma de matching de habilidades (frontend + API en JavaScript)</li>
          <li><strong>secretly</strong> — App de mensajería anónima con deploy en vivo (Vue + Python)</li>
          <li><strong>movixplor</strong> — App móvil de exploración de películas (Kotlin)</li>
          <li><strong>portafolio</strong> — Sitio personal con GitHub Pages</li>
        </ul>

        <hr />

        <h2>Algo personal</h2>
        <p>
          Me gusta explorar nuevas tecnologías, aprender de proyectos reales y construir cosas que
          resuelvan problemas concretos. Cuando no estoy programando, disfruto de la música,
          películas y series.
        </p>
      </article>

      <style>{`
        .sobre-mi h1 {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
        }
        .sobre-mi h2 {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .sobre-mi h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          font-family: 'Geist Mono', monospace;
        }
        .sobre-mi p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .sobre-mi p strong { color: var(--text); }
        .sobre-mi ul {
          list-style: disc;
          padding-left: 1.5rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.9;
        }
        .sobre-mi ul strong { color: var(--text); }
        .sobre-mi hr {
          border: none;
          border-top: 1px solid #e7e5e4;
          margin: 2rem 0;
        }
      `}</style>
    </main>
  );
}
