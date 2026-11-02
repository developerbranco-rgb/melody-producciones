# Fotos de artistas

Guardá las fotos de cada artista en una carpeta con su `id` (el mismo de `src/data/artists.ts`):

```
src/assets/artists/
├── branco-sax/
├── duilio-roman/
├── fernando-de-voever/
├── humor-en-3d/
└── los-antuna-duo/
```

- Formatos: `.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`.
- Tamaño recomendado: al menos 1200 px del lado más corto. No hace falta comprimirlas: el sitio genera versiones optimizadas automáticamente.
- Nombres sin espacios ni tildes, por ejemplo `branco-01.jpg`, `branco-02.jpg`.
- Después, agregá cada foto en el campo `images` del artista (la primera es la portada; la portada no se repite en la galería):

```ts
images: [
  { file: 'branco-sax/branco-01.jpg', alt: 'Branco tocando el saxo en un escenario con luces cálidas' },
],
```

Usar únicamente fotos reales y autorizadas del artista.
