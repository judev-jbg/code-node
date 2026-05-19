import Database from 'better-sqlite3';
import path from 'path';
import { migrateToViewSchema } from './media-store.mjs';

const DB_PATH = path.join(process.cwd(), 'database.sqlite');

const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
migrateToViewSchema(db);

export default db;
