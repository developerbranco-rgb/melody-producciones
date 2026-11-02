# Guía paso a paso — Melody Producciones

Esta guía explica cómo ejecutar, probar, publicar y actualizar el sitio. Corresponde a lo que está implementado (Astro + GitHub Pages con GitHub Actions).

---

## 1. Requisitos previos

1. **Node.js 22.12 o superior** — descargar la versión LTS desde https://nodejs.org (probado con Node 24). Verificar en una terminal:
   ```
   node --version
   ```
2. **Git** — https://git-scm.com/downloads
3. **Cuenta de GitHub** — https://github.com
4. (Para las pruebas) **Google Chrome** instalado. Si no lo tenés: `npx playwright install chromium` y ejecutar las pruebas con `PW_CHANNEL=chromium` (en PowerShell: `$env:PW_CHANNEL="chromium"`).
5. Un editor de código, por ejemplo Visual Studio Code.

## 2. Instalar dependencias

Abrí una terminal **dentro de la carpeta del proyecto** (`melody-producciones-web`) y ejecutá:

```
npm install
```

Sólo hace falta la primera vez (o cuando cambien las dependencias). Crea la carpeta `node_modules/` (no se sube a GitHub).

## 3. Ejecutar localmente

```
npm run dev
```

Abrí http://localhost:4321/ en el navegador. Cada cambio que guardes en los archivos se ve al instante. Para detenerlo: `Ctrl + C`.

Para ver la versión final compilada:

```
npm run build
npm run preview
```

## 4. Ejecutar las pruebas

```
npm test
```

Ejecuta:
- pruebas unitarias de los enlaces de WhatsApp y correo;
- unas 130 pruebas en navegador (escritorio y celular): navegación, perfiles, vistas rápidas, WhatsApp, correo, accesibilidad (axe-core, WCAG 2.2 AA), teclado, responsive, SEO, enlaces rotos, errores de consola.

Las pruebas compilan el sitio con la subcarpeta `/melody-producciones/` para simular GitHub Pages. Para ver el informe detallado: `npx playwright show-report`.

> Si agregás, quitás o renombrás un artista, actualizá también la lista `ARTISTS` en `tests/e2e/fixtures.ts`.

## 5. Crear el repositorio en GitHub

1. Entrá a https://github.com/new
2. **Repository name**: `melody-producciones` (recomendado; puede ser otro).
3. Visibilidad: **Public** (GitHub Pages gratuito requiere repositorio público en cuentas gratuitas).
4. **No** marques "Add a README", ".gitignore" ni "license" (el proyecto ya los trae).
5. Clic en **Create repository**.

Luego, en la terminal, dentro de la carpeta del proyecto (reemplazá `USUARIO` por tu usuario de GitHub):

```
git init
git add .
git commit -m "Primera versión del sitio de Melody Producciones"
git branch -M main
git remote add origin https://github.com/USUARIO/melody-producciones.git
git push -u origin main
```

Antes del `git commit`, podés revisar qué se va a subir con `git status`. No deben aparecer `node_modules/`, `dist/` ni archivos `.env` (están excluidos en `.gitignore`).

## 6. Configurar y publicar con GitHub Pages

1. En el repositorio, ir a **Settings → Pages**.
2. En **Build and deployment → Source**, elegir **GitHub Actions**.
3. Ir a la pestaña **Actions**. Si el workflow "Publicar en GitHub Pages" no arrancó solo tras el push, abrirlo y pulsar **Run workflow**.
4. Esperar a que los dos pasos (`build` y `deploy`) queden en verde (1–3 minutos).

No hace falta configurar nada más: el workflow detecta la URL y la subcarpeta automáticamente.

## 7. Verificar la publicación

1. La URL aparece en **Settings → Pages** y en el paso `deploy` del workflow. Será:
   `https://USUARIO.github.io/melody-producciones/`
2. Revisar:
   - que se vea el logo, las cinco tarjetas y que las vistas rápidas abran;
   - abrir directamente `https://USUARIO.github.io/melody-producciones/artistas/branco-sax/` y **recargar** la página (debe seguir funcionando);
   - abrir una dirección inexistente (por ejemplo `.../melody-producciones/prueba/`) y ver la página "Página no encontrada";
   - tocar un botón "Consultar contratación" en el celular y comprobar que WhatsApp abre con el mensaje y el nombre del artista;
   - tocar "Enviar un correo" y comprobar que abre el correo dirigido a info.melodyproducciones@gmail.com.
3. Opcional: ejecutar Lighthouse desde Chrome (F12 → Lighthouse) sobre la URL publicada.

## 8. Actualizar la web

### Manualmente
1. Editar los archivos (ver sección 9).
2. `npm run dev` para revisar.
3. `npm test` para verificar.
4. Subir los cambios:
   ```
   git add .
   git commit -m "Describe el cambio"
   git push
   ```
5. GitHub Actions publica automáticamente en 1–3 minutos.

### Mediante un agente de programación
Indicale al agente, por ejemplo: *"Agregá estas fotos al perfil de Duilio Roman en `src/data/artists.ts`, ejecutá `npm test` y mostrame el resultado"*. Recordale las reglas del proyecto: no inventar contenido, usar sólo recursos reales, mantener el catálogo equilibrado y no modificar el logo. Todo lo editable está en `src/data/`, `src/i18n/es.ts` y `src/assets/artists/`.

## 9. Editar contenido

Todos los datos de artistas están en **`src/data/artists.ts`**. Los campos se explican en `src/data/types.ts`.

### Agregar un artista
Copiá un bloque `{ ... },` existente dentro de la lista `artists` y completalo:

```ts
{
  id: 'nombre-del-artista',          // minúsculas y guiones; será la URL /artistas/nombre-del-artista/
  name: 'Nombre del Artista',
  discipline: 'Cantante',
  shortDescription: PENDIENTE,       // o un texto confirmado
  bio: PENDIENTE,                    // o ['Párrafo 1', 'Párrafo 2']
  images: [],
  videos: [],
  socials: [],
  links: [],
  motif: 'music',                    // 'music', 'humor' o 'both' (gráfico cuando no hay fotos)
  order: 6,                          // posición en el catálogo
  pending: ['Fotos', 'Biografía'],   // notas internas (no se publican)
},
```

La página del perfil, la tarjeta, la vista rápida, el enlace de WhatsApp personalizado y el sitemap se generan solos. Agregalo también en `tests/e2e/fixtures.ts`.

> El `id` no debería cambiarse después de publicar, porque cambia la URL del perfil.

### Editar una descripción o biografía
```ts
shortDescription: 'Una o dos oraciones confirmadas por el artista.',
bio: [
  'Primer párrafo confirmado.',
  'Segundo párrafo confirmado.',
],
```
Al reemplazar `PENDIENTE`, la sección "Sobre …" aparece automáticamente.

### Agregar o reemplazar fotos
1. Copiá las fotos a `src/assets/artists/<id>/` (por ejemplo `src/assets/artists/duilio-roman/duilio-01.jpg`). Nombres sin espacios ni tildes. No hace falta achicarlas: el sitio genera versiones optimizadas.
2. Cargalas en `images` (la **primera** es la portada de la tarjeta y del perfil; con dos o más se muestra la galería, y la portada no se repite dentro de ella):
   ```ts
   images: [
     { file: 'duilio-roman/duilio-01.jpg', alt: 'Duilio Roman en el escenario con micrófono' },
     { file: 'duilio-roman/duilio-02.jpg', alt: 'Duilio Roman saludando al público', credit: 'Foto: Nombre del fotógrafo' },
   ],
   ```
3. Para reemplazar una foto, reemplazá el archivo con el mismo nombre, o cambiá el nombre en `file`.

El texto `alt` debe describir lo que se ve (es obligatorio: la compilación falla si falta).

### Agregar videos
- **YouTube** (recomendado): el ID es lo que sigue a `v=` en la dirección (`https://www.youtube.com/watch?v=ABCDEFGHIJK` → `ABCDEFGHIJK`).
  ```ts
  videos: [{ type: 'youtube', id: 'ABCDEFGHIJK', title: 'Show en vivo' }],
  ```
  El reproductor se carga recién al hacer clic (no hace lenta la página) y usa el modo de privacidad mejorada de YouTube.
- **Archivo propio**: copiar a `public/media/videos/<id>/show.mp4` (MP4 **H.264 con audio AAC** y `+faststart`, idealmente menos de 15 MB) junto con una portada `.jpg`:
  ```ts
  videos: [{ type: 'file', src: 'media/videos/duilio-roman/show.mp4', title: 'Show en vivo', poster: 'media/videos/duilio-roman/show.jpg' }],
  ```
  Así se integraron los videos actuales: convertidos a H.264/AAC, con la portada generada a partir de un fotograma y el lado corto limitado a 720 px en clips breves y 540 px en los largos. Los **originales sin comprimir** se conservaron fuera del repositorio, en `../media-originales/<id>/`.

### Enlaces y redes del artista
```ts
socials: [{ label: 'Instagram', url: 'https://www.instagram.com/usuario/' }],
links: [{ label: 'Sitio oficial', url: 'https://...' }],
```
Sólo URLs completas con `https://`, confirmadas.

### Mensaje de WhatsApp personalizado
Por defecto: *"Hola, Melody Producciones. Quisiera consultar por la contratación de NOMBRE. ¿Me podrían brindar más información?"*. Para cambiarlo en un artista: `whatsappMessage: 'Texto propio'`.

### Datos de la productora
`src/data/site.ts`: correo, WhatsApp (`whatsappDisplay` para mostrar y `whatsappNumber` sólo dígitos para el enlace), ubicación, eslogan y mensaje general.

Para agregar redes de la productora cuando existan:
```ts
socials: [
  { label: 'Instagram', url: 'https://www.instagram.com/melodyproducciones/' },
] as SocialLink[],
```
Aparecen solas en Contacto y en el pie de página.

### Textos de la interfaz
Títulos de secciones, "Sobre nosotros", botones, etc.: `src/i18n/es.ts`.

### Colores y tipografías
`src/styles/tokens.css`. Conservar la paleta de marca (anaranjado, azul, negro, blanco).

### Logo
Si se recibe una versión nueva del logo autorizada por la productora, reemplazar los archivos en `src/assets/brand/originales/` con el **mismo nombre** y ejecutar `npm run brand` (regenera favicon, íconos e imagen para redes).

## 10. Agregar inglés en el futuro

1. Copiar `src/i18n/es.ts` como `src/i18n/en.ts` y traducir los valores.
2. Registrarlo en `src/i18n/index.ts` (`dictionaries` y `htmlLang`).
3. Crear `src/pages/en/index.astro` y `src/pages/en/artistas/[id].astro` que usen `getUi('en')`.
4. Para textos de artistas en inglés, ampliar los campos (por ejemplo `bio: { es: [...], en: [...] }`) en `types.ts`.

## 11. Dominio propio (opcional, futuro)

En **Settings → Pages → Custom domain** cargar el dominio y configurar el DNS según la ayuda de GitHub. El workflow ajusta las rutas automáticamente (la subcarpeta pasa a ser `/`).
