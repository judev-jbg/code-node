import { NextResponse } from 'next/server';
import db from '@/lib/db';

interface ComentarioRow {
  id: number;
  autor: string;
  contenido: string;
  createdAt: string;
}

export function GET() {
  const rows = db
    .prepare('SELECT * FROM comentarios ORDER BY id DESC')
    .all() as ComentarioRow[];
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { autor, contenido } = body;

  if (!autor || !contenido) {
    return NextResponse.json({ error: 'Autor y contenido son requeridos.' }, { status: 400 });
  }

  const stmt = db.prepare('INSERT INTO comentarios (autor, contenido) VALUES (?, ?)');
  const result = stmt.run(autor.trim(), contenido.trim());
  return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
}
