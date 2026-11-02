/**
 * Tipos de datos de los artistas. Normalmente NO hace falta editar este archivo:
 * los datos se editan en src/data/artists.ts
 */

/** Marcador para información que todavía no fue confirmada. Nunca se muestra en la web. */
export const PENDIENTE = 'PENDIENTE_DE_COMPLETAR' as const;
export type Pendiente = typeof PENDIENTE;

export interface ArtistImage {
  /**
   * Ruta del archivo dentro de src/assets/artists/ (ej. 'branco-sax/foto-01.jpg').
   * Formatos admitidos: .jpg, .jpeg, .png, .webp, .avif
   */
  file: string;
  /** Texto alternativo: describí qué se ve en la foto (obligatorio para accesibilidad). */
  alt: string;
  /** Crédito del fotógrafo, si corresponde (opcional). */
  credit?: string;
}

export type ArtistVideo =
  | {
      /** Video publicado en YouTube. */
      type: 'youtube';
      /** ID del video: lo que aparece después de "v=" (ej. 'dQw4w9WgXcQ'). */
      id: string;
      title: string;
    }
  | {
      /** Video propio dentro de public/media/videos/ (recomendado: .mp4 H.264, < 15 MB). */
      type: 'file';
      /** Ruta relativa a public/ (ej. 'media/videos/branco-sax/show.mp4'). */
      src: string;
      title: string;
      /** Imagen de portada opcional, relativa a public/ (ej. 'media/videos/branco-sax/show.jpg'). */
      poster?: string;
    };

export interface ExternalLink {
  label: string;
  url: string;
}

export interface Artist {
  /** Identificador estable: se usa en la URL (/artistas/<id>/). Sólo minúsculas, números y guiones. NO cambiar una vez publicado. */
  id: string;
  /** Nombre público tal como debe mostrarse. */
  name: string;
  /** Disciplina o descripción breve confirmada (ej. 'Saxofonista'). */
  discipline: string;
  /** Descripción corta para tarjetas y vista rápida (1–2 oraciones). PENDIENTE = se oculta. */
  shortDescription: string | Pendiente;
  /** Biografía: un texto por párrafo. PENDIENTE = la sección se oculta. */
  bio: string[] | Pendiente;
  /** Fotos. La primera es la portada. Lista vacía = se muestra un póster gráfico con el nombre. */
  images: ArtistImage[];
  /** Videos. Lista vacía = la sección se oculta. */
  videos: ArtistVideo[];
  /** Redes sociales verificadas del artista. Lista vacía = la sección se oculta. */
  socials: ExternalLink[];
  /** Otros enlaces pertinentes (ej. sitio oficial). */
  links: ExternalLink[];
  /**
   * Mensaje de WhatsApp personalizado (opcional). Si se omite, se usa:
   * "Hola, Melody Producciones. Quisiera consultar por la contratación de <NOMBRE>. ¿Me podrían brindar más información?"
   */
  whatsappMessage?: string;
  /** Motivo gráfico del póster cuando no hay fotos: 'music' (nota), 'humor' (máscara) o 'both'. */
  motif: 'music' | 'humor' | 'both';
  /** Posición en el catálogo (menor = primero). */
  order: number;
  /** Notas internas sobre recursos faltantes. NO se muestran en la web. */
  pending: string[];
}
