import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesion.' }, { status: 401 });
  }

  const body = await request.json();
  const name = typeof body.name === 'string' ? body.name.trim() : '';

  if (!name) {
    return NextResponse.json({ error: 'El nombre es requerido.' }, { status: 400 });
  }

  db.prepare('UPDATE "user" SET name = ?, updatedAt = ? WHERE id = ?')
    .run(name, new Date().toISOString(), user.id);

  return NextResponse.json({ ok: true, name });
}
