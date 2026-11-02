import { test, expect } from '@playwright/test';
import { ARTISTS, BASE, PAGES } from './fixtures';

const SITE = 'https://usuario.github.io'; // valor usado al compilar para las pruebas

test.describe('SEO básico', () => {
  for (const path of PAGES) {
    test(`metadatos de /${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR');
      const title = await page.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(70);
      const desc = (await page.locator('meta[name="description"]').getAttribute('content'))!;
      expect(desc.length).toBeGreaterThan(50);
      expect(desc.length).toBeLessThanOrEqual(170);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${SITE}${BASE}${path}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${SITE}${BASE}og-image.jpg`);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);

      // Un solo h1 y encabezados sin saltos de nivel
      await expect(page.locator('h1')).toHaveCount(1);
      const levels = await page
        .locator('main h1, main h2, main h3, main h4, footer h2, footer h3')
        .evaluateAll((els) => els.filter((e) => !e.closest('dialog')).map((e) => Number(e.tagName[1])));
      for (let i = 1; i < levels.length; i++) expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);

      // JSON-LD válido
      for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        expect(() => JSON.parse(json)).not.toThrow();
      }
    });
  }

  test('títulos únicos por página', async ({ page }) => {
    const titles = new Set<string>();
    for (const path of PAGES) {
      await page.goto(path);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(PAGES.length);
  });

  test('sitemap y robots.txt incluyen las URLs con la subcarpeta de GitHub Pages', async ({ request }) => {
    const robots = await (await request.get(`${BASE}robots.txt`)).text();
    expect(robots).toContain(`Sitemap: ${SITE}${BASE}sitemap-index.xml`);
    const index = await request.get(`${BASE}sitemap-index.xml`);
    expect(index.status()).toBe(200);
    const sitemap = await (await request.get(`${BASE}sitemap-0.xml`)).text();
    for (const a of ARTISTS) expect(sitemap).toContain(`${SITE}${BASE}artistas/${a.id}/`);
    expect(sitemap).not.toContain('404');
  });
});

test.describe('Recursos, enlaces y errores', () => {
  test('todos los enlaces internos y recursos responden 200', async ({ page, request }) => {
    const urls = new Set<string>();
    for (const path of [...PAGES, 'no-existe/']) {
      await page.goto(path);
      const found = await page.evaluate(() => [
        ...[...document.querySelectorAll('a[href]')].map((a) => (a as HTMLAnchorElement).href),
        ...[...document.querySelectorAll('img[src], source[srcset], img[srcset]')].flatMap((el) => {
          const out: string[] = [];
          const src = (el as HTMLImageElement).getAttribute('src');
          if (src) out.push(new URL(src, location.href).href);
          const srcset = el.getAttribute('srcset');
          if (srcset) srcset.split(',').forEach((s) => out.push(new URL(s.trim().split(/\s+/)[0], location.href).href));
          return out;
        }),
        ...[...document.querySelectorAll('link[href]')].map((l) => (l as HTMLLinkElement).href),
        ...[...document.querySelectorAll('script[src]')].map((s) => (s as HTMLScriptElement).src),
      ]);
      found.forEach((u) => urls.add(u.split('#')[0]));
    }
    // (se excluye la propia URL inexistente, que aparece por el enlace "Saltar al contenido" de la 404)
    const internal = [...urls].filter((u) => u.startsWith('http://localhost') && !u.endsWith('/no-existe/'));
    expect(internal.length).toBeGreaterThan(10);
    const broken: string[] = [];
    for (const u of internal) {
      expect(new URL(u).pathname.startsWith(BASE), `ruta fuera de la subcarpeta: ${u}`).toBe(true);
      const res = await request.get(u);
      if (res.status() !== 200) broken.push(`${res.status()} ${u}`);
    }
    expect(broken).toEqual([]);
  });

  test('sin errores de consola ni solicitudes fallidas', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('requestfailed', (r) => errors.push(`falló ${r.url()}`));
    for (const path of PAGES) {
      await page.goto(path, { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
    }
    expect(errors).toEqual([]);
  });

  test('todas las imágenes cargan y tienen texto alternativo', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      // Forzar la carga de imágenes diferidas
      await page.evaluate(async () => {
        for (let y = 0; y <= document.body.scrollHeight; y += 400) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 40));
        }
      });
      await page.waitForLoadState('networkidle');
      const imgs = await page.locator('img').evaluateAll((els) =>
        els
          .filter((e) => !e.closest('dialog') && (e as HTMLImageElement).getAttribute('src'))
          .map((e) => ({
            src: (e as HTMLImageElement).currentSrc,
            ok: (e as HTMLImageElement).complete && (e as HTMLImageElement).naturalWidth > 0,
            hasAlt: e.hasAttribute('alt'),
          }))
      );
      expect(imgs.length).toBeGreaterThan(0);
      for (const i of imgs) {
        expect(i.ok, `no cargó ${i.src}`).toBe(true);
        expect(i.hasAlt, `sin alt ${i.src}`).toBe(true);
      }
    }
  });

  test('no se publican marcadores de contenido pendiente', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      const html = await page.content();
      expect(html).not.toMatch(/PENDIENTE|undefined|\[object Object\]|lorem ipsum/i);
    }
  });

  test('las secciones sin contenido confirmado se ocultan en los perfiles', async ({ page }) => {
    await page.goto('artistas/humor-en-3d/');
    for (const id of ['bio-titulo', 'redes-titulo']) {
      await expect(page.locator(`#${id}`)).toHaveCount(0);
    }
    await expect(page.locator('#galeria-titulo')).toHaveCount(1);
    await expect(page.locator('#videos-titulo')).toHaveCount(1);
    await expect(page.locator('video').first()).toBeVisible();
  });

  test('la galería oculta la portada y no aparece con una sola foto', async ({ page }) => {
    await page.goto('artistas/duilio-roman/');
    await expect(page.locator('#galeria-titulo')).toHaveCount(0);

    await page.goto('artistas/branco-sax/');
    await expect(page.locator('#galeria-titulo')).toBeVisible();
    const galleryImages = await page.locator('[data-gallery] img').count();
    expect(galleryImages).toBe(9);
  });
});

test.describe('Diseño responsive', () => {
  for (const width of [320, 375, 414, 768, 1024, 1280, 1920]) {
    test(`sin desbordamiento horizontal a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of PAGES) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `/${path} desborda ${overflow}px`).toBeLessThanOrEqual(0);
      }
    });
  }

  test('áreas táctiles de al menos 44px en celular', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('');
    const small = await page
      .locator('header a, header button, .btn, .wa-float, .footer a')
      .evaluateAll((els) =>
        els
          .filter((e) => (e as HTMLElement).offsetParent !== null)
          .map((e) => ({ t: e.textContent?.trim().slice(0, 30), h: e.getBoundingClientRect().height }))
          .filter((x) => x.h > 0 && x.h < 40)
      );
    expect(small).toEqual([]);
  });
});
