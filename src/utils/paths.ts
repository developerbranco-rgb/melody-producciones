/**
 * Rutas internas compatibles con GitHub Pages.
 * Siempre usar withBase() para enlaces internos: agrega el prefijo del repositorio
 * (ej. /melody-producciones/) cuando el sitio se publica en una subcarpeta.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function withBase(path = ''): string {
  const clean = path.replace(/^\//, '');
  return `${BASE}${clean}`;
}

export function artistPath(id: string): string {
  return withBase(`artistas/${id}/`);
}

/** Enlace a una sección de la portada (ej. homeSection('contacto') -> /base/#contacto). */
export function homeSection(anchor: string): string {
  return `${withBase()}#${anchor}`;
}
