import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildMediaDetailPath,
  filterSearchResults,
  isValidMediaType,
  normalizeMediaItem,
  normalizeUserMediaState,
} from '../lib/media-utils.mjs';

describe('media utilities', () => {
  it('normalizes movie results from TMDB', () => {
    const item = normalizeMediaItem({
      id: 550,
      media_type: 'movie',
      title: 'Fight Club',
      release_date: '1999-10-15',
      overview: 'An insomniac office worker...',
      vote_average: 8.433,
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
    });

    assert.equal(item.title, 'Fight Club');
    assert.equal(item.mediaType, 'movie');
    assert.equal(item.year, '1999');
    assert.equal(item.rating, 8.4);
  });

  it('normalizes tv results from TMDB', () => {
    const item = normalizeMediaItem({
      id: 1399,
      media_type: 'tv',
      name: 'Game of Thrones',
      first_air_date: '2011-04-17',
      vote_average: 8.451,
    });

    assert.equal(item.title, 'Game of Thrones');
    assert.equal(item.mediaType, 'tv');
    assert.equal(item.year, '2011');
  });

  it('filters unsupported and adult TMDB search results', () => {
    const results = filterSearchResults([
      { id: 1, media_type: 'movie', title: 'Visible', adult: false },
      { id: 2, media_type: 'person', name: 'Actor' },
      { id: 3, media_type: 'movie', title: 'Hidden', adult: true },
    ]);

    assert.deepEqual(results.map(item => item.id), [1]);
  });

  it('normalizes persisted favorite and watched state', () => {
    assert.deepEqual(normalizeUserMediaState({ isFavorite: 1, isWatched: 0 }), {
      isFavorite: true,
      isWatched: false,
    });
  });

  it('builds local detail paths for movies and tv series', () => {
    assert.equal(buildMediaDetailPath('movie', 550), '/media/movie/550');
    assert.equal(buildMediaDetailPath('tv', '1399'), '/media/tv/1399');
  });

  it('validates supported media types', () => {
    assert.equal(isValidMediaType('movie'), true);
    assert.equal(isValidMediaType('tv'), true);
    assert.equal(isValidMediaType('person'), false);
  });
});
