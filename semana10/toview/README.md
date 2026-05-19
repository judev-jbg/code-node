# ToView

ToView is a Next.js app for discovering movies and series with TMDB, then tracking favorites, watched items, and authenticated comments.

## Current Increment

The current branch adds TMDB discovery on top of the initial foundation:

- Next.js application scaffold named `toview`.
- better-auth and SQLite wiring copied from the previous weekly project.
- TMDB environment variables documented in `.env.example`.
- Initial TDD coverage for TMDB result normalization and persisted user-media state.
- `/api/media/search` route handler for trending and debounced search results.
- Responsive search UI with grid/list layout toggle.
- TMDB helper tests for URLs, image URLs, and auth headers.

## Local Setup

```bash
npm install
npm run test
npm run dev
```

Required environment variables are listed in `.env.example`.

TMDB can authenticate with either `TMDB_READ_ACCESS_TOKEN` or `TMDB_API_KEY`; the bearer token is preferred when both exist.

## Technical Notes

- Code identifiers are written in English.
- UI styles will use plain CSS with BEM naming.
- TMDB data will stay external; comments, favorites, watched state, and auth data will persist in SQLite.
