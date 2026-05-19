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
    userId    TEXT    NOT NULL,
    contenido TEXT    NOT NULL,
    createdAt TEXT    NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  );
`);

const userColumns = db.prepare("PRAGMA table_info('user')").all();
if (userColumns.length > 0 && !userColumns.some(column => column.name === "role")) {
  db.exec(`ALTER TABLE "user" ADD COLUMN role TEXT NOT NULL DEFAULT 'user';`);
}

const comentarioColumns = db.prepare("PRAGMA table_info('comentarios')").all();
if (comentarioColumns.some(column => column.name === "autor")) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS comentarios_new (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      userId    TEXT    NOT NULL,
      contenido TEXT    NOT NULL,
      createdAt TEXT    NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    );
    DROP TABLE comentarios;
    ALTER TABLE comentarios_new RENAME TO comentarios;
  `);
}

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
