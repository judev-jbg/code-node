import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildTmdbImageUrl,
  buildTmdbUrl,
  getTmdbAuthHeaders,
} from '../lib/tmdb.mjs';

describe('tmdb helpers', () => {
  it('builds a TMDB URL with query params', () => {
    const url = buildTmdbUrl('/search/multi', {
      query: 'blade runner',
      page: 2,
      include_adult: false,
    });

    assert.equal(url.toString(), 'https://api.themoviedb.org/3/search/multi?query=blade+runner&page=2&include_adult=false');
  });

  it('builds poster image URLs and preserves missing images as null', () => {
    assert.equal(buildTmdbImageUrl('/abc.jpg', 'w342'), 'https://image.tmdb.org/t/p/w342/abc.jpg');
    assert.equal(buildTmdbImageUrl(null), null);
  });

  it('prefers bearer auth when a TMDB token is available', () => {
    assert.deepEqual(getTmdbAuthHeaders({ TMDB_READ_ACCESS_TOKEN: 'token', TMDB_API_KEY: 'key' }), {
      Authorization: 'Bearer token',
      accept: 'application/json',
    });
  });
});
