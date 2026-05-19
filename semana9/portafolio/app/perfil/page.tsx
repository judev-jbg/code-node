import { redirect } from 'next/navigation';
import ProfileForm from '../components/ProfileForm';
import { getCurrentUser } from '@/lib/session';

export default async function PerfilPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p className="page-tag">Perfil</p>
        <h1 className="page-title">Tus datos</h1>
        <p className="page-desc">Consulta tu email y actualiza el nombre que se muestra en el portafolio.</p>
      </header>

      <ProfileForm initialName={user.name ?? ''} email={user.email} />

      <style>{`
        .page-tag {
          font-family: 'Geist Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }
        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 0.75rem;
        }
        .page-desc { font-size: 1rem; color: var(--text-muted); }
      `}</style>
    </main>
  );
}
