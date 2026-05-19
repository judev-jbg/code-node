'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function NavAuth() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setIsAuth(!!data?.session);
      setEmail(data?.user?.email ?? '');
      setRole((data?.user as { role?: string } | undefined)?.role ?? '');
      setChecked(true);
    });
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    setIsAuth(false);
    router.push('/');
    router.refresh();
  }

  if (!checked) return null;

  return isAuth ? (
    <div className="nav-auth">
      <span className="nav-auth__email">{email}</span>
      <Link href="/perfil" className="nav-auth-btn">Perfil</Link>
      {role === 'admin' && <Link href="/admin" className="nav-auth-btn">Admin</Link>}
      <button className="nav-auth-btn" onClick={handleSignOut}>Salir</button>
    </div>
  ) : (
    <Link href="/sign-in" className="nav-auth-btn">Acceder</Link>
  );
}
