import { redirect } from 'next/navigation';
import AdminUserForm from '../components/AdminUserForm';
import { getCurrentUser, isAdmin } from '@/lib/session';

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!isAdmin(user)) {
    redirect('/');
  }

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p className="page-tag">Admin</p>
        <h1 className="page-title">Crear usuario</h1>
        <p className="page-desc">Alta de usuarios con rol user o admin.</p>
      </header>

      <AdminUserForm />

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
