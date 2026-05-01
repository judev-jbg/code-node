import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "..", "database.sqlite"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS proyectos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    slug      TEXT    NOT NULL UNIQUE,
    titulo    TEXT    NOT NULL,
    descripcion TEXT  NOT NULL,
    tecnologias TEXT  NOT NULL,
    url       TEXT    NOT NULL,
    createdAt TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS comentarios (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    autor     TEXT    NOT NULL,
    contenido TEXT    NOT NULL,
    createdAt TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

const insertProyecto = db.prepare(`
  INSERT OR IGNORE INTO proyectos (slug, titulo, descripcion, tecnologias, url)
  VALUES (@slug, @titulo, @descripcion, @tecnologias, @url)
`);

insertProyecto.run({
  slug: "skillmatch",
  titulo: "SkillMatch",
  descripcion:
    "Plataforma de matching de habilidades para conectar profesionales con proyectos según su stack tecnológico.",
  tecnologias: "JavaScript,Node.js,REST APIs",
  url: "https://github.com/judev-jbg/skillmatch",
});

insertProyecto.run({
  slug: "secretly",
  titulo: "Secretly",
  descripcion:
    "App de mensajería anónima con deploy en vivo. Los mensajes se autodestruyen tras ser leídos.",
  tecnologias: "Vue.js,Python,WebSockets",
  url: "https://github.com/judev-jbg/secretly",
});

insertProyecto.run({
  slug: "movixplor",
  titulo: "MoviXplor",
  descripcion:
    "App móvil Android para explorar películas usando la API de TMDB, con búsqueda y favoritos.",
  tecnologias: "Kotlin,Android,TMDB API",
  url: "https://github.com/judev-jbg/movixplor",
});
