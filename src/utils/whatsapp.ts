/**
 * Utilidades de contacto puras (sin dependencias) para poder probarlas de forma aislada.
 */

/** Deja sólo dígitos: '+54 341 619-2627' -> '543416192627'. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/** Mensaje estándar de consulta por un artista. No promete disponibilidad ni precio. */
export function defaultArtistMessage(artistName: string): string {
  return `Hola, Melody Producciones. Quisiera consultar por la contratación de ${artistName}. ¿Me podrían brindar más información?`;
}

/** Enlace de WhatsApp (wa.me) con el texto codificado para URL. */
export function buildWhatsappUrl(phone: string, message: string): string {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}

/** Enlace mailto con asunto opcional. */
export function buildMailto(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
