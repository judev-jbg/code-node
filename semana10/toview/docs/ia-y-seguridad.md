# Uso de IA en Tests y Revision de Vulnerabilidades

## Objetivo

Este documento registra como se uso IA durante el desarrollo de ToView, especialmente en la creacion de tests y en la revision de riesgos de seguridad del proyecto.

## Uso de IA en Tests

Se pidio a la IA apoyo para disenar pruebas TDD incrementales antes de implementar cada bloque de funcionalidad. La iteracion siguio este ciclo:

1. Definir una expectativa pequena y comprobable.
2. Escribir el test primero.
3. Ejecutar el test y confirmar el fallo.
4. Implementar el codigo minimo para pasar.
5. Volver a ejecutar los tests.

Areas cubiertas:

- Normalizacion de resultados de TMDB.
- Construccion de URLs de TMDB e imagenes.
- Validacion de tipos `movie` y `tv`.
- Creacion/reutilizacion de titulos en SQLite.
- Comentarios autenticados.
- Estado favorito/visto por usuario.
- Consultas para el perfil privado.

Comandos usados:

```bash
npm run test
npm run lint
npm run build
```

## Uso de IA en Revision de Seguridad

Se pidio a la IA revisar puntos de riesgo habituales para una aplicacion con autenticacion, SQLite y una API externa.

### Riesgos revisados

- **Secretos en repositorio**: se reviso `.env.example` para asegurar que no contiene valores reales.
- **Escrituras sin sesion**: los endpoints `POST /comments` y `PATCH /state` verifican `getCurrentUser()` antes de modificar datos.
- **Acceso cruzado entre usuarios**: favoritos y vistos se consultan y modifican usando siempre `user.id` de la sesion.
- **Inyeccion SQL**: las consultas usan statements preparados; el unico nombre de columna dinamico se limita a `isFavorite` o `isWatched` antes de interpolarse.
- **Tipos de contenido invalidos**: `mediaType` se valida contra `movie` y `tv`.
- **Abuso de TMDB desde cliente**: las credenciales de TMDB se usan en servidor desde Route Handlers y helpers server-side.
- **Datos publicos vs privados**: comentarios son publicos; perfil, favoritos y vistos requieren sesion.

### Mitigaciones aplicadas

- Validacion de sesion en rutas protegidas.
- Validacion de entrada para comentarios vacios.
- Validacion estricta de flags de estado.
- Uso de foreign keys en SQLite.
- Uso de `.env.example` sin secretos reales.
- Separacion entre helpers de imagen seguros para cliente y helpers TMDB con credenciales.

## Limitaciones Conocidas

- No se implemento rate limiting propio para comentarios o toggles.
- La revision de dependencias no sustituye una auditoria formal.
- El contenido de TMDB se consume como fuente externa confiable para metadatos, pero se renderiza como texto normal en React.
- La configuracion real de `BETTER_AUTH_SECRET` depende del entorno local o despliegue.

## Resultado

La IA se uso como apoyo para disenar pruebas, revisar riesgos y detectar omisiones, pero cada cambio quedo validado con comandos locales y commits incrementales por rama.
