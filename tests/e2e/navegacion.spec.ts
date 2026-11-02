import { test, expect } from '@playwright/test';
import { ARTISTS, BASE } from './fixtures';

test.describe('Navegación y perfiles', () => {
  test('la portada tiene las cuatro secciones principales', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/Melody Producciones/);
    for (const id of ['inicio', 'artistas', 'nosotros', 'contacto']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Melody Producciones');
    await expect(page.getByRole('link', { name: 'Encontrá el espectáculo ideal' })).toHaveAttribute('href', '#artistas');
  });

  test('el catálogo muestra los cinco artistas con el mismo formato', async ({ page }) => {
    await page.goto('');
    const cards = page.getByTestId('artist-card');
    await expect(cards).toHaveCount(ARTISTS.length);
    const sizes = await cards.evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().width)));
    expect(new Set(sizes).size, `anchos de tarjeta: ${sizes}`).toBe(1);
    for (const a of ARTISTS) {
      const card = page.locator(`[data-testid="artist-card"][data-artist="${a.id}"]`);
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(a.name);
      await expect(card).toContainText(a.discipline);
    }
  });

  test('la portada invita a consultar por artistas a pedido', async ({ page }) => {
    await page.goto('');
    const cta = page.getByRole('link', { name: /Consultanos por tus artistas preferidos/ });
    await expect(cta).toHaveAttribute('href', '#contacto');
    await expect(page.locator('.hero__credits')).toContainText(
      'Si buscás otro tipo de artistas, también te los conseguimos.'
    );
  });

  for (const a of ARTISTS) {
    test(`perfil de ${a.name}: abre desde el catálogo, carga directo y al recargar`, async ({ page }) => {
      await page.goto('');
      await page.locator(`[data-artist="${a.id}"]`).getByRole('link', { name: `Ver perfil de ${a.name}` }).click();
      await expect(page).toHaveURL(new RegExp(`${BASE}artistas/${a.id}/$`));
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(a.name);

      // Carga directa (como si se pegara la URL) y recarga
      const res = await page.goto(`artistas/${a.id}/`);
      expect(res?.status()).toBe(200);
      await page.reload();
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(a.name);
      await expect(page).toHaveTitle(`${a.name} — ${a.discipline} | Melody Producciones`);

      // Volver al catálogo
      await page.getByRole('link', { name: 'Volver al catálogo' }).click();
      await expect(page).toHaveURL(new RegExp(`${BASE}#artistas$`));
    });
  }

  test('una ruta inexistente muestra la página 404 propia', async ({ page }) => {
    const res = await page.goto('esta-pagina-no-existe/');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página no encontrada');
    await page.getByRole('link', { name: 'Volver al inicio' }).click();
    await expect(page).toHaveURL(new RegExp(`${BASE}$`));
  });

  test('el encabezado es transparente arriba y sólido al desplazarse', async ({ page }) => {
    await page.goto('');
    const header = page.locator('[data-header]');
    await expect(header).not.toHaveClass(/is-solid/);
    await page.mouse.wheel(0, 900);
    await expect(header).toHaveClass(/is-solid/);
    const bg = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('los enlaces del menú llevan a cada sección', async ({ page, isMobile }) => {
    await page.goto('artistas/duilio-roman/');
    const toggle = page.getByRole('button', { name: /Abrir menú/ });
    for (const [label, hash] of [
      ['Artistas', 'artistas'],
      ['Nosotros', 'nosotros'],
      ['Contacto', 'contacto'],
    ] as const) {
      if (isMobile) await toggle.click();
      await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`${BASE}#${hash}$`));
      await expect(page.locator(`#${hash}`)).toBeInViewport();
    }
  });
});

test.describe('Menú móvil', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('abre, cierra con Esc y actualiza aria-expanded', async ({ page }) => {
    await page.goto('');
    const toggle = page.locator('[data-menu-toggle]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#menu-principal')).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAccessibleName('Cerrar menú');
    await expect(page.locator('#menu-principal').getByRole('link', { name: 'Nosotros' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });
});
