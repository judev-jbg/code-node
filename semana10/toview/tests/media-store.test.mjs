import assert from 'node:assert/strict';
import { describe, it, beforeEach } from 'node:test';
import Database from 'better-sqlite3';
import {
  createComment,
  ensureMediaItem,
  getUserMediaState,
  listCommentedMediaForUser,
  listCommentsForMedia,
  listFavoriteMediaForUser,
  listWatchedMediaForUser,
  migrateToViewSchema,
  toggleUserMediaFlag,
} from '../lib/media-store.mjs';

describe('media store', () => {
  let db;

  beforeEach(() => {
    db = new Database(':memory:');
    db.pragma('foreign_keys = ON');
    db.exec(`
      CREATE TABLE user (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
      INSERT INTO user (id, name, email) VALUES ('u1', 'Ana', 'ana@example.com');
    `);
    migrateToViewSchema(db);
  });

  it('creates or reuses a media item by TMDB id and type', () => {
    const media = {
      tmdbId: 550,
      mediaType: 'movie',
      title: 'El club de la pelea',
      posterPath: '/poster.jpg',
      releaseDate: '1999-10-15',
    };

    const firstId = ensureMediaItem(db, media);
    const secondId = ensureMediaItem(db, { ...media, title: 'Nuevo titulo' });

    assert.equal(firstId, secondId);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM media_items').get().count, 1);
  });

  it('stores authenticated comments and lists them newest first', () => {
    const mediaItemId = ensureMediaItem(db, {
      tmdbId: 550,
      mediaType: 'movie',
      title: 'El club de la pelea',
      posterPath: '/poster.jpg',
      releaseDate: '1999-10-15',
    });

    createComment(db, { userId: 'u1', mediaItemId, content: 'Gran pelicula.' });
    createComment(db, { userId: 'u1', mediaItemId, content: 'La volveria a ver.' });

    const comments = listCommentsForMedia(db, { tmdbId: 550, mediaType: 'movie' });

    assert.equal(comments.length, 2);
    assert.equal(comments[0].content, 'La volveria a ver.');
    assert.equal(comments[0].authorName, 'Ana');
    assert.equal(comments[0].authorEmail, 'ana@example.com');
  });

  it('toggles favorite and watched state for a user media item', () => {
    const mediaItemId = ensureMediaItem(db, {
      tmdbId: 550,
      mediaType: 'movie',
      title: 'El club de la pelea',
      posterPath: '/poster.jpg',
      releaseDate: '1999-10-15',
    });

    assert.deepEqual(getUserMediaState(db, { userId: 'u1', mediaItemId }), {
      isFavorite: false,
      isWatched: false,
    });

    assert.deepEqual(toggleUserMediaFlag(db, { userId: 'u1', mediaItemId, flag: 'isFavorite' }), {
      isFavorite: true,
      isWatched: false,
    });

    assert.deepEqual(toggleUserMediaFlag(db, { userId: 'u1', mediaItemId, flag: 'isWatched' }), {
      isFavorite: true,
      isWatched: true,
    });

    assert.deepEqual(toggleUserMediaFlag(db, { userId: 'u1', mediaItemId, flag: 'isFavorite' }), {
      isFavorite: false,
      isWatched: true,
    });
  });

  it('lists profile media grouped by user activity', () => {
    const favoriteId = ensureMediaItem(db, {
      tmdbId: 550,
      mediaType: 'movie',
      title: 'El club de la pelea',
      posterPath: '/poster.jpg',
      releaseDate: '1999-10-15',
    });
    const watchedId = ensureMediaItem(db, {
      tmdbId: 1399,
      mediaType: 'tv',
      title: 'Juego de tronos',
      posterPath: '/got.jpg',
      releaseDate: '2011-04-17',
    });
    const commentedId = ensureMediaItem(db, {
      tmdbId: 603,
      mediaType: 'movie',
      title: 'Matrix',
      posterPath: '/matrix.jpg',
      releaseDate: '1999-03-31',
    });

    toggleUserMediaFlag(db, { userId: 'u1', mediaItemId: favoriteId, flag: 'isFavorite' });
    toggleUserMediaFlag(db, { userId: 'u1', mediaItemId: watchedId, flag: 'isWatched' });
    createComment(db, { userId: 'u1', mediaItemId: commentedId, content: 'Clasica.' });
    createComment(db, { userId: 'u1', mediaItemId: commentedId, content: 'Sigue vigente.' });

    assert.deepEqual(listFavoriteMediaForUser(db, 'u1').map(item => item.title), ['El club de la pelea']);
    assert.deepEqual(listWatchedMediaForUser(db, 'u1').map(item => item.title), ['Juego de tronos']);
    assert.deepEqual(listCommentedMediaForUser(db, 'u1').map(item => item.title), ['Matrix']);
  });
});
