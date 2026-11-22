# Portfolio de Maxi

Sitio estático listo para publicar en Netlify.

## Publicación

Conectá este repositorio a Netlify. El directorio de publicación es `dist` y no hace falta un comando de build. El archivo `netlify.toml` ya fija esa configuración.

El sitio completo está en `dist/index.html`; las secciones y sus recursos están dentro de `dist/rooms/`.

Las versiones editadas por separado en otros Sites no se sincronizan automáticamente: al actualizar un ambiente, también hay que copiar su nueva versión a `dist/rooms/` y subir un commit a este repositorio.
