import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { createComment, ensureMediaItem, listCommentsForMedia } from '@/lib/media-store.mjs';
import { isValidMediaType } from '@/lib/media-utils.mjs';
import { getCurrentUser } from '@/lib/session';
import { getMediaDetails } from '@/lib/tmdb.mjs';

type CommentsRouteContext = RouteContext<'/api/media/[mediaType]/[tmdbId]/comments'>;

export async function GET(_request: Request, context: CommentsRouteContext) {
  const { mediaType, tmdbId } = await context.params;

  if (!isValidMediaType(mediaType)) {
    return NextResponse.json({ error: 'Tipo de contenido no soportado.' }, { status: 400 });
  }

  const comments = listCommentsForMedia(db, {
    tmdbId: Number(tmdbId),
    mediaType,
  });

  return NextResponse.json({ comments });
}

export async function POST(request: Request, context: CommentsRouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesion para comentar.' }, { status: 401 });
  }

  const { mediaType, tmdbId } = await context.params;

  if (!isValidMediaType(mediaType)) {
    return NextResponse.json({ error: 'Tipo de contenido no soportado.' }, { status: 400 });
  }

  const body = await request.json();
  const content = typeof body.content === 'string' ? body.content.trim() : '';

  if (!content) {
    return NextResponse.json({ error: 'El comentario no puede estar vacio.' }, { status: 400 });
  }

  const detail = await getMediaDetails(mediaType, tmdbId);
  const mediaItemId = ensureMediaItem(db, {
    tmdbId: detail.tmdbId,
    mediaType: detail.mediaType,
    title: detail.title,
    posterPath: detail.posterPath,
    releaseDate: detail.releaseDate,
  });

  createComment(db, {
    userId: user.id,
    mediaItemId,
    content,
  });

  const comments = listCommentsForMedia(db, {
    tmdbId: detail.tmdbId,
    mediaType: detail.mediaType,
  });

  return NextResponse.json({ comments }, { status: 201 });
}
