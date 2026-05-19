export function getMediaTitle(item) {
  return item.title || item.name || 'Untitled';
}

export function getMediaDate(item) {
  return item.release_date || item.first_air_date || '';
}

export function getMediaYear(item) {
  const date = getMediaDate(item);
  return date ? date.slice(0, 4) : 'N/A';
}

export function normalizeMediaItem(item) {
  const mediaType = item.media_type === 'tv' ? 'tv' : 'movie';

  return {
    id: Number(item.id),
    tmdbId: Number(item.id),
    mediaType,
    title: getMediaTitle(item),
    year: getMediaYear(item),
    releaseDate: getMediaDate(item),
    overview: item.overview || 'No synopsis available.',
    rating: typeof item.vote_average === 'number' ? Number(item.vote_average.toFixed(1)) : 0,
    posterPath: item.poster_path || null,
    backdropPath: item.backdrop_path || null,
  };
}

export function filterSearchResults(results) {
  return results
    .filter(item => item && (item.media_type === 'movie' || item.media_type === 'tv'))
    .filter(item => !item.adult)
    .map(normalizeMediaItem);
}

export function normalizeUserMediaState(row) {
  return {
    isFavorite: Boolean(row?.isFavorite),
    isWatched: Boolean(row?.isWatched),
  };
}
