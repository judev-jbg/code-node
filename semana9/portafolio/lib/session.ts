import { headers } from 'next/headers';
import { auth } from './auth';

export type AppRole = 'admin' | 'user';

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

export function isAdmin(user: { role?: string | null } | null | undefined) {
  return user?.role === 'admin';
}
