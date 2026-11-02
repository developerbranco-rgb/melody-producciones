// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Configuración de rutas para GitHub Pages
 * ----------------------------------------
 * - SITE: origen público (ej. https://usuario.github.io). Si no se define, se usa un valor local.
 * - BASE_PATH: subcarpeta del repositorio (ej. /melody-producciones/). En un sitio de usuario
 *   (repositorio "usuario.github.io") o con dominio propio debe ser "/".
 *
 * En GitHub Actions ambos valores se calculan automáticamente (ver .github/workflows/deploy.yml).
 * En local no hace falta definir nada: el sitio se sirve en http://localhost:4321/
 */
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // Cada página se genera como carpeta/index.html (ej. /artistas/branco-sax/index.html),
  // por eso las URLs funcionan al abrirlas o recargarlas directamente en GitHub Pages.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  // Textos de interfaz centralizados en src/i18n/ (preparado para agregar inglés en el futuro).
  image: {
    responsiveStyles: true,
  },
});
