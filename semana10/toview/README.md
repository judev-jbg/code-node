# ToView

ToView is a Next.js app for discovering movies and series with TMDB, then tracking favorites, watched items, and authenticated comments.

## Current Increment

This first branch establishes the project foundation:

- Next.js application scaffold named `toview`.
- better-auth and SQLite wiring copied from the previous weekly project.
- TMDB environment variables documented in `.env.example`.
- Initial TDD coverage for TMDB result normalization and persisted user-media state.

## Local Setup

```bash
npm install
npm run test
npm run dev
```

Required environment variables are listed in `.env.example`.

## Technical Notes

- Code identifiers are written in English.
- UI styles will use plain CSS with BEM naming.
- TMDB data will stay external; comments, favorites, watched state, and auth data will persist in SQLite.
