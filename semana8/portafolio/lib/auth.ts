import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import Database from 'better-sqlite3';
import path from 'path';

export const auth = betterAuth({
  database: new Database(path.join(process.cwd(), 'database.sqlite')),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
