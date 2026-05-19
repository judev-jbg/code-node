# ToView

ToView es una aplicacion Next.js para buscar peliculas y series con la API de TMDB, y despues gestionar favoritos, titulos vistos y comentarios con usuarios autenticados.

## Incremento Actual

Esta rama anade la pagina de detalle de cada titulo y deja el contenido visible en espanol:

- Busqueda TMDB desde `/api/media/search` con resultados en tendencia o filtrados por texto.
- Interfaz responsive con buscador debounced y selector de vista grid/lista.
- Pagina `/media/[mediaType]/[tmdbId]` con poster, fondo, titulo, calificacion, fecha y sinopsis completa.
- Textos visibles de la aplicacion y documentacion en espanol.
- Pruebas TDD para normalizacion de resultados, URLs de imagen, autenticacion TMDB y rutas locales de detalle.

## Como Arrancar

```bash
npm install
npm run test
npm run dev
```

Abre `http://localhost:3000`.

Las variables necesarias estan documentadas en `.env.example`.

TMDB puede autenticarse con `TMDB_READ_ACCESS_TOKEN` o `TMDB_API_KEY`; si existen ambas, se prefiere el bearer token.

## Decisiones Tecnicas

- Los identificadores de codigo se mantienen en ingles.
- El contenido visible para usuarios esta en espanol.
- Los estilos usan CSS puro con convencion BEM.
- Los datos de peliculas y series vienen de TMDB.
- Los comentarios, favoritos, vistos y datos de autenticacion persistiran en SQLite.
