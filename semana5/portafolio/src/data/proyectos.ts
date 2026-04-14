/**
 * Datos hardcodeados de los proyectos del portafolio.
 * Basados en mi perfil de github.com/judev-jbg
 */
export interface Proyecto {
  slug: string;
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  url: string;
}

export const proyectos: Proyecto[] = [
  {
    slug: "skillmatch",
    titulo: "SkillMatch",
    descripcion:
      "Plataforma de matching de habilidades que conecta profesionales con proyectos según su stack tecnológico.",
    tecnologias: ["JavaScript", "Node.js", "REST API"],
    url: "https://github.com/judev-jbg/skillmatch",
  },
  {
    slug: "secretly",
    titulo: "Secretly",
    descripcion:
      "Aplicación de mensajería anónima con autenticación y mensajes cifrados. Disponible en producción.",
    tecnologias: ["Vue", "Python", "REST API"],
    url: "https://github.com/judev-jbg/secretly",
  },
  {
    slug: "movixplor",
    titulo: "Movixplor",
    descripcion:
      "App móvil Android para explorar películas, ver detalles y guardar favoritos usando la API de TMDB.",
    tecnologias: ["Kotlin", "Android", "TMDB API"],
    url: "https://github.com/judev-jbg/movixplor",
  },
  {
    slug: "postlyapi",
    titulo: "PostlyAPI",
    descripcion:
      "Documentación interactiva de una API REST para una plataforma de publicaciones. Con demo en vivo.",
    tecnologias: ["HTML", "REST API", "Swagger"],
    url: "https://github.com/judev-jbg/postlyapi",
  },
  {
    slug: "portafolio",
    titulo: "Portafolio Personal",
    descripcion:
      "Sitio web personal publicado con GitHub Pages. Muestra proyectos, habilidades y experiencia.",
    tecnologias: ["JavaScript", "HTML", "CSS"],
    url: "https://github.com/judev-jbg/portafolio",
  },
];
