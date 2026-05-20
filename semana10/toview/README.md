# ToView

ToView es una aplicacion web hecha con Next.js para buscar peliculas y series usando TMDB. Los usuarios pueden iniciar sesion, comentar titulos, marcarlos como favoritos, marcarlos como vistos y consultar su actividad desde el perfil.

## Demo

Demo en vivo: https://to-view.onrender.com/

Con fines academicos, este proyecto ha sido desplegado en Render. Al visitar el enlace, el servicio puede tardar unos segundos en iniciar si estaba inactivo; espera un momento antes de asumir que la app esta caida.

## Funcionalidades

- Busqueda de peliculas y series con la API de TMDB.
- Resultados en tendencia cuando no hay busqueda activa.
- Buscador con debounce para evitar llamadas excesivas.
- Toggle de vista en grid o lista.
- Tarjetas con imagen, titulo, ano, tipo, resumen y calificacion.
- Pagina de detalle por titulo con poster, fondo, fecha, calificacion y sinopsis completa.
- Autenticacion con better-auth.
- Comentarios visibles para todos, pero creacion protegida por sesion.
- Favoritos y estado "Visto" solo para usuarios autenticados.
- Perfil privado con listas de favoritas, vistas y comentadas.
- Persistencia en SQLite para usuarios, comentarios y estados de usuario.

## Stack

- Next.js App Router.
- React.
- better-auth.
- SQLite con `better-sqlite3`.
- Route Handlers propios para busqueda, comentarios y estado de usuario.
- CSS puro con convencion BEM.
- Tests TDD con `node:test`.

## Requisitos

- Node.js compatible con Next 16.
- Credenciales de TMDB.

Variables necesarias:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
TMDB_API_KEY=
TMDB_READ_ACCESS_TOKEN=
```

TMDB puede autenticarse con `TMDB_READ_ACCESS_TOKEN` o `TMDB_API_KEY`. Si existen ambas, la app prefiere el bearer token.

## Como Arrancar

```bash
npm install
npm run test
npm run dev
```

Abre `http://localhost:3000`.

Para produccion local:

```bash
npm run build
npm run start
```

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: compila la app.
- `npm run start`: sirve la build.
- `npm run lint`: ejecuta ESLint.
- `npm run test`: ejecuta los tests TDD con `node:test`.

## Decisiones Tecnicas

- Los identificadores del codigo estan en ingles para mantener consistencia tecnica.
- El contenido visible y la documentacion estan en espanol.
- Los estilos se mantienen en CSS puro con clases BEM para evitar dependencia de frameworks visuales.
- TMDB es la fuente externa de peliculas y series; la base local guarda solo datos necesarios para relacionar comentarios, favoritos y vistos.
- Las rutas que modifican datos verifican sesion antes de escribir.
- Los SQL usan statements preparados de `better-sqlite3`.
- El perfil se renderiza en servidor para leer la sesion y consultar SQLite directamente.

## Base de Datos

better-auth crea sus tablas de usuario/sesion. La app agrega:

- `media_items`: cache minimo del titulo TMDB usado por comentarios y estados.
- `comments`: comentarios asociados a usuario y titulo.
- `user_media_states`: favoritos y vistos por usuario.

El esquema se asegura en runtime desde `lib/db.ts` y tambien existe `scripts/seed.mjs` para preparar tablas manualmente.

## Seguridad

- No se versionan valores reales de `.env`.
- Los endpoints de comentarios y estado personal requieren sesion.
- La busqueda TMDB y los comentarios publicos son de lectura.
- Los cambios de favoritos/vistos solo afectan al usuario autenticado.
- Ver `docs/ia-y-seguridad.md` para el registro de uso de IA en tests y revision de vulnerabilidades.
