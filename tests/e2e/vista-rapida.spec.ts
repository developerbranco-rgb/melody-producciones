import { test, expect } from '@playwright/test';
import { ARTISTS, WHATSAPP_NUMBER, artistMessage, BASE } from './fixtures';

test.describe('Vistas rápidas', () => {
  for (const a of ARTISTS) {
    test(`vista rápida de ${a.name}`, async ({ page }) => {
      await page.goto('');
      const trigger = page.getByRole('button', { name: `Vista rápida de ${a.name}` });
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();

      const dialog = page.getByRole('dialog', { name: a.name });
      await expect(dialog).toBeVisible();
      await expect(dialog).toContainText(a.discipline);

      // Botón de contratación con mensaje personalizado
      const wa = dialog.getByTestId('qv-whatsapp');
      const url = new URL((await wa.getAttribute('href'))!);
      expect(url.origin + url.pathname).toBe(`https://wa.me/${WHATSAPP_NUMBER}`);
      expect(url.searchParams.get('text')).toBe(artistMessage(a.name));
      await expect(wa).toHaveAttribute('target', '_blank');
      await expect(wa).toHaveAttribute('rel', /noopener/);

      // Enlace al perfil completo
      await expect(dialog.getByRole('link', { name: `Ver perfil completo de ${a.name}` })).toHaveAttribute(
        'href',
        `${BASE}artistas/${a.id}/`
      );

      // Esc cierra y el foco vuelve al botón que la abrió
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(trigger).toBeFocused();
    });
  }

  test('se cierra con el botón Cerrar y haciendo clic fuera', async ({ page }) => {
    await page.goto('');
    const trigger = page.getByRole('button', { name: 'Vista rápida de Humor en 3D' });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Humor en 3D' });
    await dialog.getByRole('button', { name: 'Cerrar vista rápida' }).click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.mouse.click(5, 5); // fondo oscuro
    await expect(dialog).toBeHidden();
  });

  test('el foco queda dentro de la vista rápida al tabular', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium');
    await page.goto('');
    await page.getByRole('button', { name: 'Vista rápida de Branco.sax' }).click();
    const dialog = page.getByRole('dialog', { name: 'Branco.sax' });
    // Al abrirse, el foco entra en la ventana. Los demás elementos de la página quedan inertes
    // (Chrome permite salir sólo hacia la interfaz del navegador, comportamiento nativo de <dialog>).
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    const focusables = await dialog.locator('a[href], button').count();
    for (let i = 0; i < focusables - 1; i++) {
      await page.keyboard.press('Tab');
      const inside = await dialog.evaluate((d) => d.contains(document.activeElement));
      expect(inside).toBe(true);
    }
  });

  test('la vista rápida de Branco.sax incluye su sitio oficial', async ({ page }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Vista rápida de Branco.sax' }).click();
    const link = page.getByRole('dialog', { name: 'Branco.sax' }).getByRole('link', { name: /Sitio oficial de Branco.sax/ });
    await expect(link).toHaveAttribute('href', 'https://developerbranco-rgb.github.io/Branco-WebPage/index.html');
  });
});
