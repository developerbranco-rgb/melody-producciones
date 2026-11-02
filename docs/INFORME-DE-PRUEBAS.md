# Informe de pruebas — Melody Producciones

- **Fecha:** 28/10/2026
- **Entorno:** Windows, Node.js 24.22.1, Astro 7.4.4, Playwright 1.64 con Google Chrome instalado, axe-core 4.14, Lighthouse 12.
- **Compilación de prueba:** `SITE=https://usuario.github.io` y `BASE_PATH=/melody-producciones/`, para simular exactamente un sitio de proyecto en GitHub Pages.
- **Perfiles de navegador:** "escritorio" (Desktop Chrome, 1280×720) y "celular" (Pixel 7, táctil). Cada prueba E2E corre en ambos.

> **Actualización (29/10/2026):** ya se integraron las fotos y los videos reales de los 5 artistas. Se repitieron `astro check`, `npm run build` y `npm test`: 0 errores, **4/4** unitarias y **136/136** de navegador. Las métricas de Lighthouse de este informe corresponden a la versión previa, sin ese material.

## Resumen

| Conjunto | Resultado |
|---|---|
| `astro check` (tipos TypeScript/Astro, 30 archivos) | 0 errores, 0 advertencias |
| `npm run build` (sin variables, base `/`) | Compila sin errores: 7 páginas + sitemap + robots.txt |
| Pruebas unitarias (`npm run test:unit`) | **4/4 aprobadas** |
| Pruebas de navegador (`npm run test:e2e`) | **136/136 aprobadas** (68 × 2 perfiles), 0 fallidas, 0 omitidas, 0 inestables |
| Lighthouse (servidor local) | Ver tabla de rendimiento |

## Detalle

| Prueba | Resultado | Evidencia / descripción | Problemas encontrados | Correcciones | Limitaciones pendientes |
|---|---|---|---|---|---|
| Navegación: 4 secciones de la portada | Aprobada | `navegacion.spec.ts`: existen `#inicio`, `#artistas`, `#nosotros`, `#contacto`; h1 = "Melody Producciones"; CTA "Encontrá el espectáculo ideal" → `#artistas`. | — | — | — |
| Catálogo equilibrado | Aprobada | 5 tarjetas con nombre y disciplina correctos; se verifica que **todas tienen el mismo ancho**. Orden alfabético. En escritorio 3+2 centradas, en tablet 2+2+1 centrada. | En la primera versión, la grilla de 5 columnas hacía las tarjetas demasiado angostas y el nombre se salía de la tarjeta. | Rediseño de la tarjeta (imagen arriba, acciones abajo) y grilla 3+2 centrada. | — |
| Perfiles individuales (5) | Aprobada | Para cada artista: clic en "Ver perfil" → URL `/melody-producciones/artistas/<id>/`, h1 correcto, título de página correcto, "Volver al catálogo" funciona. | — | — | — |
| Páginas individuales al abrirlas o recargarlas directamente | Aprobada (servidor local) | Carga directa de cada URL con respuesta HTTP 200 y recarga posterior. Cada perfil es un archivo `index.html` real en `dist/artistas/<id>/`. | — | — | En GitHub Pages real: **no ejecutada** (el sitio aún no está publicado). La URL sin barra final (`/artistas/branco-sax`) depende de la redirección automática de GitHub Pages; verificar tras publicar. |
| Página 404 | Aprobada | Ruta inexistente → HTTP 404 con la página propia "Página no encontrada" y enlaces de regreso. | El enlace "Saltar al contenido" de la 404 hacía que el verificador de enlaces marcara la propia URL inexistente. | Se excluyó esa URL del verificador (no es un enlace roto real). `canonical` eliminado en la 404 (usa `noindex`). | — |
| Encabezado transparente / sólido | Aprobada | Sin clase `is-solid` arriba; con fondo opaco tras desplazarse. | — | — | — |
| Menú (escritorio y celular) | Aprobada | Los enlaces Artistas/Nosotros/Contacto desde un perfil llevan a cada sección y ésta queda en pantalla. Menú móvil: abre, cambia `aria-expanded` y su nombre accesible ("Cerrar menú"), Esc lo cierra y devuelve el foco. | Los íconos de abrir y cerrar se mostraban a la vez (estilos con alcance que no llegaban al SVG). | Selectores `:global()` en `Header.astro`. | — |
| Vistas rápidas (5) | Aprobada | Para cada artista: abre `<dialog>` con nombre accesible, disciplina, botón de WhatsApp con mensaje del artista, enlace al perfil completo; Esc cierra y el foco vuelve a la tarjeta. Cierre con botón "Cerrar" y clic en el fondo. Foco contenido en la ventana. Branco.sax muestra su sitio oficial. | La prueba original de "foco atrapado" fallaba al tabular más allá del último elemento: Chrome permite salir del `<dialog>` modal sólo hacia la interfaz del navegador (comportamiento nativo y correcto). | Prueba ajustada para recorrer todos los elementos de la ventana. | — |
| Enlaces personalizados de WhatsApp | Aprobada | En las 6 páginas, **todos** los enlaces `wa.me` usan `https://wa.me/543416192627`, no contienen espacios y su `text` decodificado coincide exactamente con el mensaje general o con "Hola, Melody Producciones. Quisiera consultar por la contratación de NOMBRE. ¿Me podrían brindar más información?". En cada perfil, los 2 botones de contratación y el botón flotante nombran al artista. Unitarias: normalización del número, codificación URL, mensaje sin promesas de precio/disponibilidad. | — | — | La apertura efectiva de la app de WhatsApp en un teléfono real: **no ejecutada** (requiere dispositivo). |
| Enlace de correo | Aprobada | Todos los `mailto:` apuntan a `info.melodyproducciones@gmail.com` (con asunto codificado donde corresponde). | — | — | Apertura del cliente de correo: **no ejecutada** (depende del equipo del usuario). |
| Sin formularios / sin redes no confirmadas | Aprobada | 0 elementos `form`, `input`, `textarea`. 0 enlaces a Instagram/Facebook/YouTube. | — | — | — |
| Enlaces externos | Aprobada | El sitio de Branco.sax responde HTTP 200 y contiene "Branco" (prueba con Internet). El enlace abre en pestaña nueva con `rel="noopener"`. | — | — | — |
| Enlaces internos y recursos | Aprobada | Se recorrieron todos los `a`, `img`, `srcset`, `link` y `script` de las 7 páginas: todos responden 200 y **todos están dentro de `/melody-producciones/`** (ninguna ruta absoluta rota). | — | — | — |
| Errores de consola | Aprobada | 0 errores de consola, 0 excepciones JS, 0 solicitudes fallidas en las 6 páginas (con desplazamiento completo). | — | — | — |
| Imágenes | Aprobada | Todas las imágenes visibles cargan (`naturalWidth > 0`) y tienen `alt`. Logo servido en WebP (10–75 kB según pantalla, original de 682 kB). Emblema del encabezado 1x/2x. | — | — | — |
| Marcadores pendientes ocultos | Aprobada | El HTML de las 6 páginas no contiene `PENDIENTE`, `undefined`, `[object Object]` ni "lorem ipsum". En los perfiles, biografía y redes siguen ocultas por falta de datos confirmados, mientras que portada, galería (con 2+ fotos) y videos se muestran con el material real. | — | — | — |
| Galería, ampliación, videos y redes (con material real) | Aprobada | Con las fotos y videos definitivos: secciones visibles en orden; portadas optimizadas en AVIF/WebP; en Branco.sax la galería muestra 9 fotos (sin repetir la portada) y en Humor en 3D se ven la galería y los reproductores `<video>` con portada; en Duilio Roman la galería se oculta porque sólo hay una foto; axe sin violaciones y 0 errores de consola o solicitudes fallidas en ambos perfiles. | La biografía quedaba centrada y desalineada respecto de las demás secciones; el fondo del encabezado del perfil terminaba con un corte visible. | Contenedor corregido; desvanecido inferior del fondo; la galería excluye la portada. | La reproducción real de cada MP4 en un teléfono y la apertura de la ampliación en Safari/iOS: **no ejecutadas** (requieren dispositivo). |
| Responsive | Aprobada | Sin desbordamiento horizontal a 320, 375, 414, 768, 1024, 1280 y 1920 px en las 6 páginas. Áreas táctiles ≥ 40 px en celular. Capturas en `reports/screenshots/` (celular 390 px, tablet 820 px, escritorio 1440 px). | Logo cortado y créditos superpuestos con el botón flotante en celular; separadores de créditos al inicio de línea en tablet. | Espacio inferior en la portada móvil; separadores sólo cuando entran en una línea. | Probado en Chrome (escritorio y emulación Pixel 7). Safari/iOS y Firefox: **no ejecutadas**. |
| Botón flotante de WhatsApp | Aprobada | Visible, con nombre accesible, y al final de la página no se superpone con el texto del pie. | — | — | — |
| Accesibilidad automática (axe-core, WCAG 2.0/2.1/2.2 A y AA + buenas prácticas) | Aprobada | 0 violaciones en las 6 páginas, en la 404 y con una vista rápida abierta, en escritorio y celular (incluye contraste de color). | `label-content-name-mismatch` en el logo del encabezado; `region` por el botón flotante fuera de un punto de referencia. | Nombre accesible del logo = texto visible; botón flotante dentro de `<aside aria-label="Contacto rápido">`. | Las herramientas automáticas no detectan todo: se recomienda una prueba con lector de pantalla (NVDA/VoiceOver), **no ejecutada**. |
| Teclado y foco | Aprobada | Primer Tab = "Saltar al contenido" visible, Enter enfoca `<main>`. Indicador de foco visible (contorno ≥ 2 px). Abrir vista rápida y llegar al perfil sólo con teclado. | — | — | — |
| Movimiento reducido | Aprobada | Con `prefers-reduced-motion: reduce` todo el contenido es visible de inmediato y las luces de la portada no se animan. Sin esa preferencia, las secciones se revelan al desplazarse. | — | — | — |
| SEO básico | Aprobada | En las 6 páginas: `lang="es-AR"`, título de 10–70 caracteres y único, descripción de 50–170 caracteres, `canonical` con la subcarpeta, Open Graph (título, imagen 1200×630), un solo h1, encabezados sin saltos de nivel, JSON-LD válido (Organization, ItemList, BreadcrumbList). `robots.txt` y `sitemap-index.xml` con las URLs completas de los 5 perfiles. | El título de la portada tenía 74 caracteres. | Acortado. | — |
| Rendimiento (Lighthouse 12, servidor local) | Aprobada | Ver tabla siguiente. | — | — | Medido en local; los valores reales en GitHub Pages pueden variar levemente. |
| Configuración de publicación en GitHub Pages | Aprobada parcialmente | Revisado: workflow `.github/workflows/deploy.yml` (checkout → Node 24 → `configure-pages` → `npm ci` → pruebas unitarias → `npm run build` con `SITE`/`BASE_PATH` calculados → `upload-pages-artifact` → `deploy-pages`), `package-lock.json` presente, `public/.nojekyll`, `.gitignore` sin `node_modules`/`dist`/`.env`. La compilación con la subcarpeta se verificó localmente. | — | — | **Ejecución del workflow en GitHub: no ejecutada** (no se tiene acceso a la cuenta del usuario). **El sitio no fue publicado.** |
| Secretos / credenciales | Aprobada | El proyecto no usa claves, tokens ni variables secretas; el workflow sólo usa el token automático de GitHub Pages. | — | — | — |

## Rendimiento (Lighthouse 12)

| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | CLS | TBT | Peso total |
|---|---|---|---|---|---|---|---|---|---|---|
| Inicio | Móvil (simulado, red 4G lenta) | 99 | 100 | 100 | 100 | 1,4 s | 1,7 s | 0 | 0 ms | 116 KiB |
| Inicio | Escritorio | 100 | 100 | 100 | 100 | 0,3 s | 0,4 s | 0 | 0 ms | 114 KiB |
| Perfil (Los Antuña Dúo) | Móvil | 100 | 100 | 100 | 100 | 1,4 s | 1,5 s | 0 | 0 ms | 107 KiB |

Sugerencias menores de Lighthouse no aplicadas: CSS que bloquea el renderizado (≈ 0,6 s simulados en móvil, es una sola hoja de estilos pequeña) y ahorro posible de ≈ 15–25 KiB ajustando tamaños del logo. Se priorizó la simplicidad.

## Cómo repetir las pruebas

```
npm install
npm test                      # unitarias + navegador
npx playwright show-report    # informe HTML detallado
```

Lighthouse (opcional): `npm run build:fast && npm run preview` y luego, en otra terminal, `npx lighthouse http://localhost:4321/ --view`.
