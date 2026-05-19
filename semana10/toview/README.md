# ToView

ToView es una aplicacion Next.js para buscar peliculas y series con la API de TMDB, y despues gestionar favoritos, titulos vistos y comentarios con usuarios autenticados.

## Incremento Actual

Esta rama completa la pagina de perfil autenticada:

- Busqueda TMDB desde `/api/media/search` con resultados en tendencia o filtrados por texto.
- Interfaz responsive con buscador debounced y selector de vista grid/lista.
- Pagina `/media/[mediaType]/[tmdbId]` con poster, fondo, titulo, calificacion, fecha y sinopsis completa.
- Comentarios visibles para todos y creacion protegida para usuarios autenticados.
- Persistencia de comentarios en SQLite asociados a usuario y titulo TMDB.
- Toggle de corazon para favoritos y boton "Visto" persistidos por usuario.
- Perfil privado con secciones de favoritas, vistas y comentadas.
- Textos visibles de la aplicacion y documentacion en espanol.
- Pruebas TDD para normalizacion de resultados, URLs de imagen, autenticacion TMDB, rutas locales de detalle, persistencia de comentarios, estado favorito/visto y consultas del perfil.

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
