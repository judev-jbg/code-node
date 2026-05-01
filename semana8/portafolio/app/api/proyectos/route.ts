import { NextResponse } from 'next/server';
import db from '@/lib/db';

interface ProyectoRow {
  id: number;
  slug: string;
  titulo: string;
  descripcion: string;
  tecnologias: string;
  url: string;
  createdAt: string;
}

export function GET() {
  const rows = db.prepare('SELECT * FROM proyectos ORDER BY id ASC').all() as ProyectoRow[];
  const proyectos = rows.map(p => ({
    ...p,
    tecnologias: p.tecnologias.split(',').map(t => t.trim()),
  }));
  return NextResponse.json(proyectos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, titulo, descripcion, tecnologias, url } = body;

  if (!slug || !titulo || !descripcion || !tecnologias || !url) {
    return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
  }

  const tecnologiasStr = Array.isArray(tecnologias)
    ? tecnologias.join(',')
    : String(tecnologias);

  try {
    const stmt = db.prepare(
      'INSERT INTO proyectos (slug, titulo, descripcion, tecnologias, url) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(slug, titulo, descripcion, tecnologiasStr, url);
    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'El slug ya existe o hubo un error al guardar.' }, { status: 409 });
  }
}
