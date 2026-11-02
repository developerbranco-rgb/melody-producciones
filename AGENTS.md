# AGENTS.md — Melody Producciones

Astro 7 static site, published on GitHub Pages through GitHub Actions. All visible content is in Spanish (es-AR). Docs live in `README.md` and `docs/`.

## Content rules (from the client brief; do not break them)
- Never invent artist bios, achievements, prices, availability, testimonials, social URLs or photos. Use only material the user has confirmed.
- Unconfirmed fields stay as `PENDIENTE` or as `[]` in `src/data/artists.ts`. The UI hides those sections, and a test fails if the string `PENDIENTE` reaches the built HTML.
- The trade name is exactly "Melody Producciones".
- Don't modify the logo files in `src/assets/brand/originales/`. Derived icons and the og-image come from `npm run brand` (crop and resize only).
- The catalog must stay balanced: every card is identical and the order is alphabetical (`order` field). No artist gets extra prominence.
- Contact is direct only: WhatsApp `543416192627` and `info.melodyproducciones@gmail.com`. No forms and no backend.
- Social links are added only when the user provides the URL. Branco's Instagram (@branco.sax) was seen on his site but is NOT confirmed.

## Where things are
- `src/data/artists.ts`: artist data, with field docs in `types.ts`. `src/data/site.ts`: contact details, tagline, org socials. `src/i18n/es.ts`: all UI strings.
- `src/data/index.ts` validates the data at build time and resolves photos through `import.meta.glob('/src/assets/artists/**')`. Photos are referenced as `'<id>/file.jpg'`.
- Internal links must go through `withBase()`, `artistPath()` or `homeSection()` in `src/utils/paths.ts`. Never hardcode `/...`: the site is served under a subpath.
- `src/utils/whatsapp.ts` must stay dependency-free. Unit tests import it directly through Node type stripping.

## Commands
- `npm run dev`: local dev server (base `/`).
- `npm run build`: `astro check` + build. `npm run build:fast` skips the check.
- `npm test`: unit tests, then e2e.
- `npm run test:unit`: runs `node --test "tests/unit/*.test.mjs"`. A bare directory argument does not work.
- `npx playwright test <file> --project=escritorio -g "<name>"`: run a single e2e test.

## Testing gotchas
- Playwright's webServer builds with `BASE_PATH=/melody-producciones/` and `SITE=https://usuario.github.io`, then serves the build on port 4322. Tests assert URLs carry that prefix.
- Playwright uses the installed Google Chrome (`channel: 'chrome'`). Set `PW_CHANNEL=chromium` after `npx playwright install chromium` if Chrome is missing.
- There are 2 projects (escritorio, celular) and 4 workers. More workers caused `ERR_INSUFFICIENT_RESOURCES` crashes.
- Adding, removing or renaming an artist requires updating `ARTISTS` in `tests/e2e/fixtures.ts`.
- `html` has `scroll-behavior: smooth`. In tests, use `scrollTo({ behavior: 'instant' })`, otherwise lazy images and positions are not ready.
- One test fetches the external Branco site and needs internet.

## Deploy
- `.github/workflows/deploy.yml` derives `SITE` and `BASE_PATH` from `actions/configure-pages`. Do not hardcode them in `astro.config.mjs`.
- Pages Source must be set to "GitHub Actions".
- `trailingSlash: 'always'` with directory build format gives each profile a real `index.html`, so direct loads and reloads work. Keep both settings.

## Environment
- This is Windows with PowerShell 5.1. Don't rewrite files with `Get-Content`/`Set-Content`: they mangle UTF-8 (accents). Use the edit/write tools or Node.
