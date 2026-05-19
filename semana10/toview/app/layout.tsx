import type { Metadata } from 'next';
import Link from 'next/link';
import NavAuthWrapper from './components/NavAuthWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'ToView',
  description: 'Movie and series tracker powered by TMDB.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav__inner">
            <Link href="/" className="nav__logo">
              To<span>View</span>
            </Link>
            <ul className="nav__links">
              <li><Link href="/">Discover</Link></li>
              <li><Link href="/profile">Profile</Link></li>
            </ul>
            <NavAuthWrapper />
          </div>
        </nav>

        {children}

        <footer className="footer">
          <div className="container">
            <p>(c) {new Date().getFullYear()} ToView - Built with Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
