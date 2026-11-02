# Recursos pendientes — Melody Producciones

Estado actualizado tras integrar las fotos y los videos de los artistas. Lo marcado como pendiente **no se muestra** en la web: las secciones vacías se ocultan.

## A. Bloquean la publicación

| Pendiente | Detalle | Quién |
|---|---|---|
| Crear el repositorio en GitHub y activar Pages | Pasos 5 y 6 de `docs/GUIA-DE-MANTENIMIENTO.md`. Hasta hacerlo, el sitio **no está publicado**. | Usuario |
| Confirmar textos institucionales | Revisar y aprobar el eslogan ("Elegí el espectáculo que necesitas para tu evento"), el texto de "Sobre nosotros", la lista "Propuestas para" y los pasos "Cómo consultar" (`src/i18n/es.ts`, `src/data/site.ts`). Fueron redactados por el desarrollador sin afirmar datos no confirmados. | Usuario |

> El logo **ya fue recibido** e integrado (`src/assets/brand/originales/`). No bloquea.
> Las fotos y los videos **ya están integrados y optimizados**. Si todavía faltan biografías o descripciones, cada perfil igual muestra la portada, la galería, los videos, la disciplina y los botones de contratación.

## B. Pueden incorporarse después

### Productora
- [ ] Instagram de Melody Producciones (URL) — pendiente de crear/confirmar.
- [ ] Facebook de Melody Producciones (URL) — pendiente de definir.
- [ ] YouTube de Melody Producciones (URL) — pendiente de definir.
- [ ] Dominio propio (opcional).
- [ ] Confirmar si el logo puede mostrarse sobre una placa crema (solución adoptada porque sus letras son oscuras y el sitio es oscuro) o si existe una **versión del logo para fondos oscuros** (letras claras).
- [ ] Confirmar el uso del recorte circular del emblema en el encabezado y como favicon.

### Material ya integrado

| Artista | Fotos | Videos | Observaciones |
|---|---|---|---|
| Branco.sax | 10 | 8 | Incluye su escudo gráfico. Falta confirmar autoría y crédito de las fotos. |
| Duilio Roman | 1 | 5 | La foto es de 150×150 px (baja resolución): conviene reemplazarla por una de mayor tamaño. |
| Fernando De Voever | 4 | 7 | Se descartó un video duplicado de otro (`fernando-05` tenía el mismo contenido que `gracias-maestro`). |
| Humor en 3D | 6 | 7 | Incluye el logo del grupo. |
| Los Antuña Dúo | 11 | 3 | Se excluyó y se movió fuera del repositorio `duo antuña foto.jpeg`, idéntica a `humor-en-3d-01.jpeg` (duplicada por error); quedó en `../media-originales/los-antuna-duo/descartados/`. El video de WhatsApp es una aparición televisiva del dúo. |

Los videos se convirtieron a **MP4 H.264/AAC**, se optimizaron para la web y quedaron en `public/media/videos/<id>/`, con una portada `.jpg` para cada uno. Los archivos originales se conservaron **fuera del repositorio**, en `../media-originales/<id>/`.

### Datos a confirmar
- [ ] Autorización de uso de cada foto y video, y crédito del fotógrafo cuando corresponda.
- [ ] Reemplazar la foto de Duilio Roman por una de mayor resolución.
- [ ] Ortografía exacta de los nombres públicos: "Duilio Roman" (¿con o sin tilde en Román?), "Fernando De Voever", "Los Antuña Dúo".
- [ ] Orden del catálogo: actualmente **alfabético** (criterio neutral). Puede cambiarse con el campo `order`.

Las descripciones, biografías y redes sociales que faltan también están anotadas en el campo `pending` de cada artista en `src/data/artists.ts` (buscar `PENDIENTE`).
