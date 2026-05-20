import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import { migrateBetterAuthSchema } from '../lib/auth-schema.mjs';

describe('better-auth schema', () => {
  it('creates the tables needed to register a user', async () => {
    const db = new Database(':memory:');
    db.pragma('foreign_keys = ON');
    migrateBetterAuthSchema(db);

    const auth = betterAuth({
      database: db,
      baseURL: 'http://localhost:3000',
      secret: 'test-secret-for-better-auth-schema-check',
      emailAndPassword: {
        enabled: true,
      },
      rateLimit: {
        enabled: false,
      },
    });

    await auth.api.signUpEmail({
      body: {
        name: 'Ana',
        email: 'ana@example.com',
        password: 'password123',
      },
    });

    const user = db.prepare('SELECT name, email FROM user WHERE email = ?').get('ana@example.com');
    const account = db.prepare('SELECT providerId FROM account WHERE userId = (SELECT id FROM user WHERE email = ?)').get('ana@example.com');

    assert.deepEqual(user, { name: 'Ana', email: 'ana@example.com' });
    assert.equal(account.providerId, 'credential');
  });
});
