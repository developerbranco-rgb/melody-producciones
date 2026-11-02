import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas de extremo a extremo.
 * Se compila el sitio con la MISMA subcarpeta que tendrá en GitHub Pages (/melody-producciones/)
 * para verificar que todas las rutas y recursos funcionen con ese prefijo.
 *
 * Navegador: usa Google Chrome instalado en la computadora (channel: 'chrome').
 * Si no tenés Chrome, ejecutá "npx playwright install chromium" y borrá la línea "channel".
 */
const PORT = 4322;
export const BASE_PATH = '/melody-producciones/';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH}`,
    channel: process.env.PW_CHANNEL ?? 'chrome',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], channel: process.env.PW_CHANNEL ?? 'chrome' } },
    { name: 'celular', use: { ...devices['Pixel 7'], channel: process.env.PW_CHANNEL ?? 'chrome' } },
  ],
  webServer: {
    command: `npx astro build && npx astro preview --port ${PORT}`,
    url: `http://localhost:${PORT}${BASE_PATH}`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
    env: {
      SITE: 'https://usuario.github.io',
      BASE_PATH,
    },
  },
});
