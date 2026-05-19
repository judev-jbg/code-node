export function migrateToViewSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS media_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tmdbId INTEGER NOT NULL,
      mediaType TEXT NOT NULL CHECK (mediaType IN ('movie', 'tv')),
      title TEXT NOT NULL,
      posterPath TEXT,
      releaseDate TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE (tmdbId, mediaType)
    );

    CREATE TABLE IF NOT EXISTS user_media_states (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      mediaItemId INTEGER NOT NULL,
      isFavorite INTEGER NOT NULL DEFAULT 0,
      isWatched INTEGER NOT NULL DEFAULT 0,
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
      FOREIGN KEY (mediaItemId) REFERENCES media_items(id) ON DELETE CASCADE,
      UNIQUE (userId, mediaItemId)
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      mediaItemId INTEGER NOT NULL,
      content TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
      FOREIGN KEY (mediaItemId) REFERENCES media_items(id) ON DELETE CASCADE
    );
  `);
}

export function ensureMediaItem(db, media) {
  const existing = db
    .prepare('SELECT id FROM media_items WHERE tmdbId = ? AND mediaType = ?')
    .get(media.tmdbId, media.mediaType);

  if (existing) {
    db.prepare(`
      UPDATE media_items
      SET title = ?, posterPath = ?, releaseDate = ?
      WHERE id = ?
    `).run(media.title, media.posterPath, media.releaseDate, existing.id);
    return existing.id;
  }

  const result = db.prepare(`
    INSERT INTO media_items (tmdbId, mediaType, title, posterPath, releaseDate)
    VALUES (?, ?, ?, ?, ?)
  `).run(media.tmdbId, media.mediaType, media.title, media.posterPath, media.releaseDate);

  return Number(result.lastInsertRowid);
}

export function createComment(db, { userId, mediaItemId, content }) {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error('El comentario no puede estar vacio.');
  }

  const result = db.prepare(`
    INSERT INTO comments (userId, mediaItemId, content)
    VALUES (?, ?, ?)
  `).run(userId, mediaItemId, trimmedContent);

  return Number(result.lastInsertRowid);
}

export function listCommentsForMedia(db, { tmdbId, mediaType }) {
  return db.prepare(`
    SELECT
      comments.id,
      comments.content,
      comments.createdAt,
      user.name AS authorName,
      user.email AS authorEmail
    FROM comments
    INNER JOIN media_items ON media_items.id = comments.mediaItemId
    INNER JOIN user ON user.id = comments.userId
    WHERE media_items.tmdbId = ? AND media_items.mediaType = ?
    ORDER BY comments.id DESC
  `).all(tmdbId, mediaType);
}

export function normalizeMediaState(row) {
  return {
    isFavorite: Boolean(row?.isFavorite),
    isWatched: Boolean(row?.isWatched),
  };
}

export function getUserMediaState(db, { userId, mediaItemId }) {
  const row = db.prepare(`
    SELECT isFavorite, isWatched
    FROM user_media_states
    WHERE userId = ? AND mediaItemId = ?
  `).get(userId, mediaItemId);

  return normalizeMediaState(row);
}

export function ensureUserMediaState(db, { userId, mediaItemId }) {
  db.prepare(`
    INSERT OR IGNORE INTO user_media_states (userId, mediaItemId)
    VALUES (?, ?)
  `).run(userId, mediaItemId);
}

export function toggleUserMediaFlag(db, { userId, mediaItemId, flag }) {
  if (flag !== 'isFavorite' && flag !== 'isWatched') {
    throw new Error('Estado no soportado.');
  }

  ensureUserMediaState(db, { userId, mediaItemId });

  db.prepare(`
    UPDATE user_media_states
    SET ${flag} = CASE ${flag} WHEN 1 THEN 0 ELSE 1 END,
        updatedAt = datetime('now')
    WHERE userId = ? AND mediaItemId = ?
  `).run(userId, mediaItemId);

  return getUserMediaState(db, { userId, mediaItemId });
}
