/**
 * Capa de acceso a datos: ordena, valida y prepara los artistas para los componentes.
 * Si hay un error en src/data/artists.ts (id repetido, foto inexistente, URL inválida...),
 * la compilación se detiene con un mensaje claro en español.
 */
import type { ImageMetadata } from 'astro';
import { artists as rawArtists } from './artists';
import { PENDIENTE, type Artist, type ArtistImage } from './types';
import { site } from './site';
import { buildWhatsappUrl, defaultArtistMessage } from '../utils/whatsapp';

export { site };
export type { Artist };

/** Todas las imágenes de src/assets/artists/, indexadas por ruta relativa ('id/archivo.jpg'). */
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/artists/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);
const imagesByPath = new Map<string, ImageMetadata>(
  Object.entries(imageModules).map(([path, mod]) => [
    path.replace('/src/assets/artists/', ''),
    mod.default,
  ])
);

export function isFilled<T>(value: T | typeof PENDIENTE | undefined | null): value is T {
  if (value === undefined || value === null || value === PENDIENTE) return false;
  if (typeof value === 'string') return value.trim().length > 0 && !value.includes(PENDIENTE);
  if (Array.isArray(value)) return value.length > 0 && !value.some((v) => v === PENDIENTE);
  return true;
}

export interface ResolvedImage extends ArtistImage {
  src: ImageMetadata;
}

export interface ResolvedArtist extends Artist {
  url: string;
  whatsappUrl: string;
  resolvedImages: ResolvedImage[];
  cover?: ResolvedImage;
  hasShortDescription: boolean;
  hasBio: boolean;
}

function fail(message: string): never {
  throw new Error(`[Datos de artistas] ${message}`);
}

function isHttpsUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

function validate(list: Artist[]): void {
  const ids = new Set<string>();
  for (const a of list) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.id)) fail(`id inválido "${a.id}": usar minúsculas, números y guiones.`);
    if (ids.has(a.id)) fail(`id repetido "${a.id}".`);
    ids.add(a.id);
    if (!a.name.trim()) fail(`el artista "${a.id}" no tiene nombre.`);
    if (!a.discipline.trim() || a.discipline.includes(PENDIENTE)) fail(`el artista "${a.id}" necesita una disciplina.`);
    for (const img of a.images) {
      if (!imagesByPath.has(img.file)) fail(`no se encontró la foto "src/assets/artists/${img.file}" (artista "${a.id}").`);
      if (!img.alt.trim()) fail(`la foto "${img.file}" necesita texto alternativo (alt).`);
    }
    for (const l of [...a.links, ...a.socials]) {
      if (!isHttpsUrl(l.url)) fail(`URL inválida o sin https: "${l.url}" (artista "${a.id}").`);
    }
    for (const v of a.videos) {
      if (v.type === 'youtube' && !/^[\w-]{11}$/.test(v.id)) fail(`ID de YouTube inválido "${v.id}" (artista "${a.id}").`);
      if (v.type === 'file' && v.src.startsWith('/')) fail(`la ruta del video "${v.src}" debe ser relativa a public/ (sin "/" inicial).`);
    }
  }
}

let cache: ResolvedArtist[] | undefined;

/** Artistas listos para mostrar, en el orden definido por "order". */
export function getArtists(): ResolvedArtist[] {
  if (cache) return cache;
  validate(rawArtists);
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  cache = [...rawArtists]
    .sort((a, b) => a.order - b.order)
    .map((a) => {
      const resolvedImages = a.images.map((img) => ({ ...img, src: imagesByPath.get(img.file)! }));
      return {
        ...a,
        url: `${base}artistas/${a.id}/`,
        whatsappUrl: buildWhatsappUrl(
          site.contact.whatsappNumber,
          a.whatsappMessage?.trim() || defaultArtistMessage(a.name)
        ),
        resolvedImages,
        cover: resolvedImages[0],
        hasShortDescription: isFilled(a.shortDescription),
        hasBio: isFilled(a.bio),
      };
    });
  return cache;
}

export function getArtist(id: string): ResolvedArtist | undefined {
  return getArtists().find((a) => a.id === id);
}

export const generalWhatsappUrl = buildWhatsappUrl(site.contact.whatsappNumber, site.generalWhatsappMessage);
