'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function NavAuth() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setIsAuth(!!data?.session);
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
    <button className="nav-auth-btn" onClick={handleSignOut}>Salir</button>
  ) : (
    <Link href="/sign-in" className="nav-auth-btn">Acceder</Link>
  );
}
