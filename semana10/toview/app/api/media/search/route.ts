import { NextResponse } from 'next/server';
import { getTrendingMedia, searchMedia } from '@/lib/tmdb.mjs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() ?? '';

  try {
    const items = query ? await searchMedia(query) : await getTrendingMedia();
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load media.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
