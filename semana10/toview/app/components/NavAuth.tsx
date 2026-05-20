'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function NavAuth() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const isAuth = !!data?.session;
  const email = data?.user?.email ?? '';

  async function handleSignOut() {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  }

  if (isPending) return null;

  return isAuth ? (
    <div className="nav-auth">
      <span className="nav-auth__email">{email}</span>
      <Link href="/profile" className="nav-auth-btn">Perfil</Link>
      <button className="nav-auth-btn" onClick={handleSignOut}>Salir</button>
    </div>
  ) : (
    <Link href="/sign-in" className="nav-auth-btn">Acceder</Link>
  );
}
