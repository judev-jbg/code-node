import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "..", "database.sqlite"));

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

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

console.log("ToView database tables are ready.");
