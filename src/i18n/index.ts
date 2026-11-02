/**
 * Punto único de acceso a los textos de interfaz.
 * Hoy el sitio está sólo en español. Para sumar inglés:
 *   1. crear src/i18n/en.ts con la misma estructura que es.ts;
 *   2. agregarlo a "dictionaries";
 *   3. crear las páginas en src/pages/en/ que llamen a getUi('en').
 */
import { es, type UiStrings } from './es';

export type Lang = 'es';

const dictionaries: Record<Lang, UiStrings> = { es };

export const defaultLang: Lang = 'es';

/** Código para el atributo lang de <html>. */
export const htmlLang: Record<Lang, string> = { es: 'es-AR' };

export function getUi(lang: Lang = defaultLang): UiStrings {
  return dictionaries[lang];
}
