import { redirect } from 'next/navigation';
import ProfileMediaSection from '../components/ProfileMediaSection';
import db from '@/lib/db';
import {
  listCommentedMediaForUser,
  listFavoriteMediaForUser,
  listWatchedMediaForUser,
} from '@/lib/media-store.mjs';
import { getCurrentUser } from '@/lib/session';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const favorites = listFavoriteMediaForUser(db, user.id);
  const watched = listWatchedMediaForUser(db, user.id);
  const commented = listCommentedMediaForUser(db, user.id);

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
      <section className="profile">
        <p className="profile__eyebrow">Perfil privado</p>
        <h1 className="profile__title">Tu actividad en ToView</h1>
        <p className="profile__copy">
          Revisa tus favoritas, los titulos que ya viste y las conversaciones donde participaste.
        </p>
        <p className="profile__email">{user.email}</p>
      </section>

      <div className="profile-sections">
        <ProfileMediaSection
          title="Favoritas"
          emptyText="Todavia no marcaste favoritos."
          items={favorites}
        />
        <ProfileMediaSection
          title="Vistas"
          emptyText="Todavia no marcaste titulos como vistos."
          items={watched}
        />
        <ProfileMediaSection
          title="Comentadas"
          emptyText="Todavia no comentaste ningun titulo."
          items={commented}
        />
      </div>
    </main>
  );
}
