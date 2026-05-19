import type { Metadata } from 'next';
import Link from 'next/link';
import NavAuthWrapper from './components/NavAuthWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Junior B. Gonzales',
  description: 'Portafolio personal de Junior B. Gonzales, Software Engineer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="nav">
          <div className="nav__inner">
            <Link href="/" className="nav__logo">
              JuDev<span>.io</span>
            </Link>
            <ul className="nav__links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/sobre-mi">Sobre mí</Link></li>
              <li><Link href="/proyectos">Proyectos</Link></li>
              <li><Link href="/comentarios">Comentarios</Link></li>
            </ul>
            <NavAuthWrapper />
          </div>
        </nav>

        {children}

        <footer className="footer">
          <div className="container">
            <p>© {new Date().getFullYear()} Junior Balcazar Gonzales · Hecho con Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
