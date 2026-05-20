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

const appUrl = process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL;
const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  database: authDb,
  baseURL: appUrl,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
