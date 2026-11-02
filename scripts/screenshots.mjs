/**
 * Capturas de pantalla para revisión visual (no forma parte de las pruebas automáticas).
 * Requiere el sitio compilado y servido: npm run build:fast && npm run preview
 * Uso: node scripts/screenshots.mjs [urlBase] [carpetaSalida]
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3] ?? 'reports/screenshots';
await mkdir(out, { recursive: true });

const pages = [
  ['inicio', ''],
  ['artista-branco-sax', 'artistas/branco-sax/'],
  ['404', 'no-existe/'],
];
const viewports = [
  ['celular', { width: 390, height: 844 }],
  ['tablet', { width: 820, height: 1180 }],
  ['escritorio', { width: 1440, height: 900 }],
];

const browser = await chromium.launch({ channel: 'chrome' });
for (const [vpName, viewport] of viewports) {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${out}/${name}-${vpName}.jpg`, fullPage: true, type: 'jpeg', quality: 72 });
  }
  // Vista rápida abierta
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('[data-dialog-open]').first().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/vista-rapida-${vpName}.jpg`, type: 'jpeg', quality: 72 });
  await ctx.close();
}
await browser.close();
console.log(`Capturas guardadas en ${out}`);
