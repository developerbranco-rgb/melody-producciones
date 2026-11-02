# Melody Producciones — Sitio web

Sitio oficial de **Melody Producciones**, productora artística de Rosario, Santa Fe, Argentina, dedicada a la representación, promoción y contratación de artistas.

- Sitio estático, sin backend, sin formularios y sin servicios pagos.
- Contacto directo por **WhatsApp** (+54 341 619-2627) y **correo** (info.melodyproducciones@gmail.com).
- Publicación gratuita en **GitHub Pages** mediante GitHub Actions.

> Documentación complementaria:
> - [`docs/GUIA-DE-MANTENIMIENTO.md`](docs/GUIA-DE-MANTENIMIENTO.md): instalación, publicación paso a paso y cómo editar artistas, textos, fotos, videos y enlaces.
> - [`docs/INFORME-DE-PRUEBAS.md`](docs/INFORME-DE-PRUEBAS.md): pruebas ejecutadas y resultados.
> - [`docs/RECURSOS-PENDIENTES.md`](docs/RECURSOS-PENDIENTES.md): estado del material (fotos y videos ya integrados) y lo que falta aportar.

---

## Tecnologías y motivo

| Tecnología | Uso | Motivo |
|---|---|---|
| [Astro 7](https://astro.build) | Generador de sitio estático | Genera HTML real por cada página (una carpeta `index.html` por perfil), envía casi nada de JavaScript, optimiza imágenes y es compatible con GitHub Pages. |
| TypeScript | Datos y utilidades | El archivo de artistas tiene tipos: si falta un campo o hay un error, la compilación avisa. |
| CSS propio (sin framework) | Estilos | Control total de la identidad visual, cero dependencias pesadas. Tokens en `src/styles/tokens.css`. |
| `astro:assets` + `sharp` | Imágenes | Convierte las fotos a AVIF/WebP en varios tamaños y las carga en diferido. |
| Fraunces + Manrope (Fontsource) | Tipografías | Fuentes libres, servidas desde el propio sitio (sin Google Fonts ni cookies de terceros). |
| `@astrojs/sitemap` | SEO | Genera `sitemap-index.xml` automáticamente. |
| Playwright + axe-core | Pruebas | Pruebas reales en navegador: navegación, enlaces, accesibilidad WCAG 2.2 AA, responsive, SEO. |
| GitHub Actions | Publicación | Compila y publica en GitHub Pages en cada cambio a `main`. |

Las animaciones son CSS puro y un `IntersectionObserver` mínimo; no se usan librerías de animación. Con "reducir movimiento" activado en el sistema, se desactivan.

## Requisitos

- Node.js **22.12 o superior** (probado con Node 24).
- Para las pruebas: Google Chrome instalado (o `npx playwright install chromium`).

## Comandos

| Comando | Acción |
|---|---|
| `npm install` | Instala dependencias (sólo la primera vez). |
| `npm run dev` | Servidor local con recarga en vivo: http://localhost:4321/ |
| `npm run build` | Verifica tipos y compila el sitio en `dist/`. |
| `npm run preview` | Sirve la carpeta `dist/` para revisarla. |
| `npm test` | Pruebas unitarias + pruebas de navegador (compila con la subcarpeta de GitHub Pages). |
| `npm run test:unit` | Sólo pruebas unitarias (enlaces de WhatsApp/correo). |
| `npm run test:e2e` | Sólo pruebas de navegador. Informe HTML: `npx playwright show-report`. |
| `npm run brand` | Regenera favicon, íconos e imagen para redes a partir del logo original. |

## Estructura de carpetas

```
melody-producciones-web/
├── .github/workflows/deploy.yml   # Publicación automática en GitHub Pages
├── astro.config.mjs               # Configuración (rutas / subcarpeta de GitHub Pages)
├── public/                        # Archivos copiados tal cual: favicon, íconos, og-image.jpg, .nojekyll
├── scripts/
│   ├── generate-brand-assets.mjs  # Deriva favicon/íconos/og-image del logo original
│   └── screenshots.mjs            # Capturas para revisión visual
├── src/
│   ├── assets/
│   │   ├── brand/originales/      # LOGO Y EMBLEMA ORIGINALES (no modificar)
│   │   ├── brand/emblema-circulo.png  # Recorte circular del emblema (para el encabezado)
│   │   └── artists/<id>/          # FOTOS DE CADA ARTISTA
│   ├── components/                # Componentes reutilizables (Header, Hero, ArtistCard, QuickView…)
│   ├── data/
│   │   ├── artists.ts             # ★ ARCHIVO CENTRAL DE ARTISTAS
│   │   ├── site.ts                # ★ Datos de contacto, eslogan y redes de la productora
│   │   ├── types.ts               # Estructura de los datos (con explicación de cada campo)
│   │   └── index.ts               # Validación y preparación de datos (no hace falta editarlo)
│   ├── i18n/                      # Textos de la interfaz (es.ts) — preparado para inglés
│   ├── layouts/BaseLayout.astro   # <head>, SEO, encabezado, pie y botón flotante
│   ├── pages/
│   │   ├── index.astro            # Inicio + Catálogo + Nosotros + Contacto
│   │   ├── artistas/[id].astro    # Página individual de cada artista
│   │   ├── 404.astro              # Página "no encontrada"
│   │   └── robots.txt.ts          # robots.txt con la URL real del sitemap
│   ├── styles/                    # tokens.css (colores, tipografías, espaciados) y global.css
│   └── utils/                     # Rutas con subcarpeta y enlaces de WhatsApp/correo
├── tests/
│   ├── unit/                      # Pruebas unitarias (node:test)
│   └── e2e/                       # Pruebas de navegador (Playwright + axe)
├── docs/                          # Guía, informe de pruebas, pendientes
└── reports/screenshots/           # Capturas de revisión (celular, tablet, escritorio)
```

## Datos de artistas

Todo lo editable de los artistas está en **`src/data/artists.ts`**. Cada registro tiene: `id` (URL estable), `name`, `discipline`, `shortDescription`, `bio`, `images`, `videos`, `socials`, `links`, `whatsappMessage` (opcional), `motif`, `order` y `pending` (notas internas, no se publican).

Lo que todavía no está confirmado se marca con `PENDIENTE` o con listas vacías `[]`. **Esas secciones no se muestran en la web**; buscar `PENDIENTE` en el archivo muestra todo lo que falta. Si se comete un error (foto inexistente, id repetido, URL sin `https`), la compilación se detiene con un mensaje en español.

Datos generales (correo, WhatsApp, ubicación, eslogan, redes de la productora): **`src/data/site.ts`**.

## Logo y recursos

- Logo original: `src/assets/brand/originales/logo-melody-producciones.png` (se usa sin cambios, sobre una placa crema porque sus letras son oscuras).
- Emblema original: `src/assets/brand/originales/emblema-melody-producciones.png`. Para el encabezado y el favicon sólo se **recortó** el círculo naranja (sin rediseñar), con `npm run brand`.
- Fotos de artistas: `src/assets/artists/<id>/`.
- Videos propios: `public/media/videos/<id>/` (MP4 H.264/AAC + `+faststart`, con portada `.jpg`). Los originales sin comprimir quedan fuera del repositorio, en `../media-originales/<id>/`. Para videos largos sigue siendo recomendable YouTube.

## Navegación, vistas rápidas y páginas individuales

- **Inicio** (`/`): una sola página con cuatro secciones ancladas: `#inicio`, `#artistas`, `#nosotros`, `#contacto`. El menú es transparente sobre la portada y se vuelve sólido al desplazarse; en celulares se despliega con un botón accesible (Esc lo cierra).
- **Vista rápida**: cada tarjeta tiene un botón que abre una ventana `<dialog>` nativa con disciplina, botón de contratación y enlace al perfil. Se cierra con Esc, con el botón Cerrar o haciendo clic fuera; el foco vuelve a la tarjeta.
- **Página individual**: `/artistas/<id>/` (por ejemplo `/artistas/branco-sax/`). Muestra portada, disciplina, botones de contratación, enlaces externos y, si existen, biografía, galería (con ampliación; no repite la portada), videos y redes. Al final, los otros artistas en igualdad de condiciones.
- **WhatsApp**: todos los botones usan `https://wa.me/543416192627?text=...` con el mensaje codificado. En cada perfil el mensaje nombra al artista; el botón flotante del perfil también.

## Rutas en GitHub Pages

GitHub Pages publica los sitios de proyecto en una subcarpeta (`https://USUARIO.github.io/NOMBRE-REPO/`). Para que todo funcione:

1. `astro.config.mjs` lee `SITE` y `BASE_PATH` de variables de entorno. En local no hacen falta.
2. El workflow `.github/workflows/deploy.yml` los calcula automáticamente con `actions/configure-pages` (funciona con cualquier nombre de repositorio, con `USUARIO.github.io` o con un dominio propio).
3. Todos los enlaces internos usan `withBase()` (`src/utils/paths.ts`), nunca rutas absolutas escritas a mano.
4. Cada página se genera como **archivo HTML real** (`dist/artistas/branco-sax/index.html`), con `trailingSlash: 'always'`. Por eso abrir o recargar una URL de perfil funciona directamente, sin trucos de redirección ni enrutamiento del lado del cliente.
5. `404.html` propio para direcciones inexistentes; `public/.nojekyll` evita que GitHub procese la carpeta `_astro`.

Las pruebas automáticas compilan con `BASE_PATH=/melody-producciones/` para verificar exactamente ese escenario.

## Mantenimiento habitual

Ver [`docs/GUIA-DE-MANTENIMIENTO.md`](docs/GUIA-DE-MANTENIMIENTO.md). Resumen:

1. Editar `src/data/artists.ts` (o `site.ts`, o `src/i18n/es.ts` para textos de interfaz).
2. `npm run dev` para ver el cambio.
3. `npm test` para verificar.
4. Subir el cambio a la rama `main`: GitHub Actions publica solo.
