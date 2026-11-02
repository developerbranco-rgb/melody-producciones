import { test, expect } from '@playwright/test';
import { ARTISTS, EMAIL, GENERAL_MESSAGE, PAGES, WHATSAPP_NUMBER, artistMessage, BRANCO_SITE } from './fixtures';

test.describe('Contacto y contratación', () => {
  test('todos los enlaces de WhatsApp del sitio usan el número oficial y un texto válido', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      const hrefs = await page.locator('a[href*="wa.me"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')!));
      expect(hrefs.length, `sin enlaces de WhatsApp en /${path}`).toBeGreaterThan(0);
      for (const href of hrefs) {
        const url = new URL(href);
        expect(url.protocol).toBe('https:');
        expect(url.host).toBe('wa.me');
        expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
        expect(href).not.toMatch(/\s/);
        const text = url.searchParams.get('text')!;
        const valid = [GENERAL_MESSAGE, ...ARTISTS.map((a) => artistMessage(a.name))];
        expect(valid).toContain(text);
      }
    }
  });

  for (const a of ARTISTS) {
    test(`botones de contratación de ${a.name} con mensaje personalizado`, async ({ page }) => {
      await page.goto(`artistas/${a.id}/`);
      const buttons = page.getByRole('link', { name: new RegExp(`Consultar contratación de ${a.name.replace('.', '\\.')}`) });
      await expect(buttons).toHaveCount(2); // portada del perfil + bloque final
      for (const href of await buttons.evaluateAll((els) => els.map((e) => e.getAttribute('href')!))) {
        expect(new URL(href).searchParams.get('text')).toBe(artistMessage(a.name));
      }
      // El botón flotante del perfil también usa el mensaje del artista
      const floating = new URL((await page.getByTestId('whatsapp-float').getAttribute('href'))!);
      expect(floating.searchParams.get('text')).toBe(artistMessage(a.name));
    });
  }

  test('contacto general: WhatsApp, correo y ubicación', async ({ page }) => {
    await page.goto('#contacto');
    const section = page.locator('#contacto');
    await expect(section).toContainText('+54 341 619-2627');
    await expect(section).toContainText(EMAIL);
    await expect(section).toContainText('Rosario, Santa Fe, Argentina');

    const wa = new URL((await page.getByTestId('contact-whatsapp').getAttribute('href'))!);
    expect(wa.searchParams.get('text')).toBe(GENERAL_MESSAGE);

    const mail = (await page.getByTestId('contact-email').getAttribute('href'))!;
    expect(mail.startsWith(`mailto:${EMAIL}`)).toBe(true);
  });

  test('todos los enlaces mailto usan el correo oficial', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      const hrefs = await page.locator('a[href^="mailto:"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')!));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const h of hrefs) expect(h.split('?')[0]).toBe(`mailto:${EMAIL}`);
    }
  });

  test('el botón flotante de WhatsApp está visible y no tapa el contenido final', async ({ page }) => {
    await page.goto('');
    const fab = page.getByTestId('whatsapp-float');
    await expect(fab).toBeVisible();
    await expect(fab).toHaveAccessibleName(/WhatsApp/);
    // Al final de la página, el botón no se superpone con el texto de copyright
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
    await page.waitForTimeout(200);
    const fabBox = (await fab.boundingBox())!;
    const copyright = (await page.locator('.footer__bottom p').boundingBox())!;
    const overlap =
      fabBox.x < copyright.x + copyright.width &&
      fabBox.x + fabBox.width > copyright.x &&
      fabBox.y < copyright.y + copyright.height &&
      fabBox.y + fabBox.height > copyright.y;
    expect(overlap).toBe(false);
  });

  test('no hay formularios en el sitio', async ({ page }) => {
    for (const path of PAGES) {
      await page.goto(path);
      await expect(page.locator('form, input, textarea')).toHaveCount(0);
    }
  });

  test('no se publican redes sociales sin URL confirmada', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('a[href*="instagram.com"], a[href*="facebook.com"], a[href*="youtube.com"]')).toHaveCount(0);
  });

  test('el perfil de Branco.sax enlaza a su sitio oficial en pestaña nueva', async ({ page }) => {
    await page.goto('artistas/branco-sax/');
    const link = page.getByTestId('artist-external');
    await expect(link).toHaveAttribute('href', BRANCO_SITE);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });
});

test.describe('Enlaces externos (requiere Internet)', () => {
  test('el sitio de Branco.sax responde', async ({ request }) => {
    const res = await request.get(BRANCO_SITE);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('Branco');
  });
});
