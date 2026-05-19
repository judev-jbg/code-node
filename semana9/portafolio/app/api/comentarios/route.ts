import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

interface ComentarioRow {
  id: number;
  autor: string | null;
  email: string;
  contenido: string;
  createdAt: string;
}

export function GET() {
  const rows = db
    .prepare(`
      SELECT comentarios.id, "user".name AS autor, "user".email, comentarios.contenido, comentarios.createdAt
      FROM comentarios
      INNER JOIN "user" ON "user".id = comentarios.userId
      ORDER BY comentarios.id DESC
    `)
    .all() as ComentarioRow[];
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesion para comentar.' }, { status: 401 });
  }

  const body = await request.json();
  const contenido = typeof body.contenido === 'string' ? body.contenido.trim() : '';

  if (!contenido) {
    return NextResponse.json({ error: 'El contenido es requerido.' }, { status: 400 });
  }

  const stmt = db.prepare('INSERT INTO comentarios (userId, contenido) VALUES (?, ?)');
  const result = stmt.run(user.id, contenido);
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
