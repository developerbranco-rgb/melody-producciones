/**
 * DATOS GENERALES DE MELODY PRODUCCIONES
 * ======================================
 * Editá este archivo para cambiar los datos de contacto o agregar redes sociales.
 * Sólo publicar datos confirmados por la productora.
 */

export interface SocialLink {
  /** Nombre visible de la red (ej. "Instagram"). */
  label: string;
  /** URL completa y verificada (https://...). */
  url: string;
}

export const site = {
  name: 'Melody Producciones',
  /** Eslogan visible en la portada. */
  tagline: 'Música y humor en vivo para cada escenario',
  description:
    'Melody Producciones es una productora artística de Rosario, Santa Fe, dedicada a la representación, promoción y contratación de artistas de música y humor.',
  locale: 'es-AR',

  contact: {
    email: 'info.melodyproducciones@gmail.com',
    /** Número tal como se muestra en la web. */
    whatsappDisplay: '+54 341 619-2627',
    /** Número internacional normalizado para wa.me: sólo dígitos, sin "+", espacios ni guiones. */
    whatsappNumber: '543416192627',
    location: 'Rosario, Santa Fe, Argentina',
    city: 'Rosario',
    region: 'Santa Fe',
    country: 'AR',
  },

  /** Mensaje inicial del botón flotante y del contacto general. */
  generalWhatsappMessage:
    'Hola, Melody Producciones. Quisiera hacer una consulta sobre sus artistas. ¿Me podrían brindar más información?',

  /**
   * Redes sociales de la productora.
   * Se muestran SÓLO las que tengan una URL cargada. Instagram, Facebook y YouTube están
   * pendientes de crear/confirmar: cuando existan, agregalas así:
   *   { label: 'Instagram', url: 'https://www.instagram.com/usuario/' },
   */
  socials: [] as SocialLink[],
} as const;
