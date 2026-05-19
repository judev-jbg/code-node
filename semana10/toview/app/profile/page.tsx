import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/session';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      <section className="profile">
        <p className="profile__eyebrow">Perfil privado</p>
        <h1 className="profile__title">Tu actividad en ToView</h1>
        <p className="profile__copy">
          Tus favoritas, titulos vistos y comentarios apareceran aqui en un proximo incremento.
        </p>
        <p className="profile__email">{user.email}</p>
      </section>

      <style>{`
        .profile {
          max-width: 620px;
          animation: rise .35s ease both;
        }
        .profile__eyebrow {
          font-family: 'Geist Mono', monospace;
          color: var(--text-muted);
          font-size: .85rem;
          margin-bottom: .75rem;
        }
        .profile__title {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
        }
        .profile__copy {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .profile__email {
          display: inline-block;
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          border-radius: 6px;
          padding: .45rem .75rem;
          font-family: 'Geist Mono', monospace;
          color: var(--text-card);
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
