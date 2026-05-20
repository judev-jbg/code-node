import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import Database from 'better-sqlite3';
import path from 'path';
import { migrateBetterAuthSchema } from './auth-schema.mjs';

const authDb = new Database(path.join(process.cwd(), 'database.sqlite'));

authDb.pragma('busy_timeout = 5000');
authDb.pragma('journal_mode = WAL');
authDb.pragma('foreign_keys = ON');
migrateBetterAuthSchema(authDb);

export const auth = betterAuth({
  database: authDb,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
