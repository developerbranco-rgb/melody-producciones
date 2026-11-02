/**
 * Genera los derivados web del logo y del emblema originales de Melody Producciones.
 *
 * IMPORTANTE: este script NO rediseña la marca. Sólo:
 *   - recorta el círculo naranja del emblema (quitando el fondo crema cuadrado),
 *   - redimensiona para favicon / íconos,
 *   - compone la imagen para redes sociales (Open Graph) con el logo original sobre fondo crema.
 *
 * Originales (no se modifican):  src/assets/brand/originales/
 * Uso:  npm run brand
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'src/assets/brand/originales';
const LOGO = `${SRC}/logo-melody-producciones.png`;
const EMBLEM = `${SRC}/emblema-melody-producciones.png`;
const CREAM = '#FBF3E4';

await mkdir('public', { recursive: true });

// 1) Emblema circular (recorte del círculo naranja con máscara redonda, fondo transparente).
//    Centro y radio medidos sobre el archivo original de 1254x1254 px.
const CX = 593, CY = 673, R = 497;
const size = R * 2;
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${R}" cy="${R}" r="${R}" fill="#fff"/></svg>`
);
const circle = await sharp(EMBLEM)
  .extract({ left: CX - R, top: CY - R, width: size, height: size })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(circle).resize(512, 512).png().toFile('src/assets/brand/emblema-circulo.png');
await sharp(circle).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(circle).resize(192, 192).png().toFile('public/icon-192.png');
await sharp(circle).resize(512, 512).png().toFile('public/icon-512.png');
// Apple touch icon: sin transparencia (iOS pinta el fondo de negro).
await sharp({ create: { width: 180, height: 180, channels: 4, background: CREAM } })
  .composite([{ input: await sharp(circle).resize(160, 160).png().toBuffer(), left: 10, top: 10 }])
  .png()
  .toFile('public/apple-touch-icon.png');

// 2) Imagen Open Graph 1200x630: logo original centrado sobre fondo crema.
const logoForOg = await sharp(LOGO).resize({ width: 1000 }).png().toBuffer();
const { height: lh } = await sharp(logoForOg).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: CREAM } })
  .composite([{ input: logoForOg, left: 100, top: Math.round((630 - lh) / 2) }])
  .jpeg({ quality: 86 })
  .toFile('public/og-image.jpg');

console.log('Recursos de marca generados correctamente.');
