import { buildTmdbImageUrl, filterSearchResults, normalizeMediaItem } from './media-utils.mjs';

const TMDB_API_BASE = 'https://api.themoviedb.org/3';
const TMDB_LANGUAGE = 'es-ES';

export function buildTmdbUrl(path, params = {}, env = process.env) {
  const url = new URL(`${TMDB_API_BASE}${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  if (!env.TMDB_READ_ACCESS_TOKEN && env.TMDB_API_KEY) {
    url.searchParams.set('api_key', env.TMDB_API_KEY);
  }

  return url;
}

export { buildTmdbImageUrl };

export function getTmdbAuthHeaders(env = process.env) {
  if (!env.TMDB_READ_ACCESS_TOKEN) return {};

  return {
    Authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`,
    accept: 'application/json',
  };
}

export function assertTmdbConfigured(env = process.env) {
  if (!env.TMDB_READ_ACCESS_TOKEN && !env.TMDB_API_KEY) {
    throw new Error('Faltan las credenciales de TMDB.');
  }
}

async function fetchTmdb(path, params = {}) {
  assertTmdbConfigured();

  const response = await fetch(buildTmdbUrl(path, params), {
    headers: getTmdbAuthHeaders(),
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`La peticion a TMDB fallo con estado ${response.status}`);
  }

  return response.json();
}

export async function searchMedia(query) {
  const data = await fetchTmdb('/search/multi', {
    query,
    include_adult: false,
    language: TMDB_LANGUAGE,
    page: 1,
  });

  return filterSearchResults(data.results ?? []);
}

export async function getTrendingMedia() {
  const data = await fetchTmdb('/trending/all/week', {
    language: TMDB_LANGUAGE,
  });

  return filterSearchResults(data.results ?? []);
}

export async function getMediaDetails(mediaType, tmdbId) {
  const data = await fetchTmdb(`/${mediaType}/${tmdbId}`, {
    language: TMDB_LANGUAGE,
  });

  return normalizeMediaItem({ ...data, media_type: mediaType });
}
