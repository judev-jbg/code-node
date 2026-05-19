import { NextResponse } from 'next/server';
import db from '@/lib/db';
import {
  ensureMediaItem,
  getUserMediaState,
  toggleUserMediaFlag,
} from '@/lib/media-store.mjs';
import { isValidMediaType } from '@/lib/media-utils.mjs';
import { getCurrentUser } from '@/lib/session';
import { getMediaDetails } from '@/lib/tmdb.mjs';

type StateRouteContext = RouteContext<'/api/media/[mediaType]/[tmdbId]/state'>;

async function resolveMediaItem(mediaType: string, tmdbId: string) {
  if (!isValidMediaType(mediaType)) {
    return null;
  }

  const detail = await getMediaDetails(mediaType, tmdbId);
  const mediaItemId = ensureMediaItem(db, {
    tmdbId: detail.tmdbId,
    mediaType: detail.mediaType,
    title: detail.title,
    posterPath: detail.posterPath,
    releaseDate: detail.releaseDate,
  });

  return mediaItemId;
}

export async function GET(_request: Request, context: StateRouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesion.' }, { status: 401 });
  }

  const { mediaType, tmdbId } = await context.params;
  const mediaItemId = await resolveMediaItem(mediaType, tmdbId);

  if (!mediaItemId) {
    return NextResponse.json({ error: 'Tipo de contenido no soportado.' }, { status: 400 });
  }

  return NextResponse.json(getUserMediaState(db, { userId: user.id, mediaItemId }));
}

export async function PATCH(request: Request, context: StateRouteContext) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Debes iniciar sesion.' }, { status: 401 });
  }

  const body = await request.json();
  const flag = body.flag;

  if (flag !== 'isFavorite' && flag !== 'isWatched') {
    return NextResponse.json({ error: 'Estado no soportado.' }, { status: 400 });
  }

  const { mediaType, tmdbId } = await context.params;
  const mediaItemId = await resolveMediaItem(mediaType, tmdbId);

  if (!mediaItemId) {
    return NextResponse.json({ error: 'Tipo de contenido no soportado.' }, { status: 400 });
  }

  const state = toggleUserMediaFlag(db, {
    userId: user.id,
    mediaItemId,
    flag,
  });

  return NextResponse.json(state);
}
