import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './fixtures';

const scan = (page: import('@playwright/test').Page) =>
  new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']);

const summarize = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`);

test.describe('Accesibilidad (axe-core, WCAG 2.2 A/AA)', () => {
  test.use({ reducedMotion: 'reduce' }); // evita medir contraste a mitad de una animación

  for (const path of [...PAGES, 'no-existe/']) {
    test(`sin violaciones en /${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await scan(page).analyze();
      expect(summarize(results.violations)).toEqual([]);
    });
  }

  test('sin violaciones con una vista rápida abierta', async ({ page }) => {
    await page.goto('');
    await page.getByRole('button', { name: 'Vista rápida de Los Antuña Dúo' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const results = await scan(page).include('dialog[open]').analyze();
    expect(summarize(results.violations)).toEqual([]);
  });
});

test.describe('Teclado y foco', () => {
  test('el primer Tab muestra "Saltar al contenido" y lleva al contenido principal', async ({ page }) => {
    await page.goto('');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Saltar al contenido' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('los elementos interactivos muestran un indicador de foco visible', async ({ page }) => {
    await page.goto('');
    await page.keyboard.press('Tab'); // skip link
    await page.keyboard.press('Tab'); // logo
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const s = getComputedStyle(el);
      return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
    });
    expect(outline.style).not.toBe('none');
    expect(outline.width).toBeGreaterThanOrEqual(2);
  });

  test('se puede abrir una vista rápida y llegar al perfil solo con teclado', async ({ page }) => {
    await page.goto('');
    const trigger = page.getByRole('button', { name: 'Vista rápida de Duilio Roman' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'Duilio Roman' });
    await expect(dialog).toBeVisible();
    const profile = dialog.getByRole('link', { name: 'Ver perfil completo de Duilio Roman' });
    await profile.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Duilio Roman');
  });
});

test.describe('Movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });
  test('con movimiento reducido el contenido es visible sin animaciones', async ({ page }) => {
    await page.goto('');
    const hidden = await page.locator('[data-reveal]').evaluateAll(
      (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length
    );
    expect(hidden).toBe(0);
    const lightAnim = await page.locator('.light--a').evaluate((e) => getComputedStyle(e).animationName);
    expect(lightAnim).toBe('none');
  });
});

test.describe('Sin movimiento reducido', () => {
  test.use({ reducedMotion: 'no-preference' });
  test('las secciones se revelan al desplazarse', async ({ page }) => {
    await page.goto('');
    const about = page.locator('#nosotros [data-reveal]').first();
    await about.scrollIntoViewIfNeeded();
    await expect(about).toHaveClass(/is-visible/);
  });
});
