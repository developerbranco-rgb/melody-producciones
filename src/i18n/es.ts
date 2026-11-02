/**
 * Textos de la interfaz en español.
 * Para agregar inglés: copiar este archivo como en.ts, traducir los valores y registrarlo en index.ts.
 */
export const es = {
  skipToContent: 'Saltar al contenido',
  nav: {
    label: 'Navegación principal',
    home: 'Inicio',
    artists: 'Artistas',
    about: 'Nosotros',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    homeLink: 'Melody Producciones, ir al inicio',
    cta: 'Consultar',
  },
  hero: {
    eyebrow: 'Productora artística · Rosario',
    cta: 'Encontrá el espectáculo ideal',
    secondaryCta: 'Contactanos',
    creditsLabel: 'Artistas de Melody Producciones',
    scroll: 'Ver artistas',
  },
  catalog: {
    eyebrow: 'Catálogo',
    title: 'Nuestros artistas',
    intro:
      'Música y humor para escenarios de todo tipo. Conocé cada propuesta y consultanos directamente por la contratación.',
    quickView: 'Vista rápida',
    quickViewOf: 'Vista rápida de',
    viewProfile: 'Ver perfil completo',
    hire: 'Consultar contratación',
    close: 'Cerrar',
    closeDialog: 'Cerrar vista rápida',
  },
  about: {
    eyebrow: 'Sobre nosotros',
    title: 'Representamos artistas y acercamos sus espectáculos a tu evento',
    paragraphs: [
      'Melody Producciones es una productora artística de Rosario, Santa Fe, dedicada a la representación y promoción de artistas de música y humor.',
      'Nuestro trabajo es acompañar a cada artista y facilitar el contacto con quienes buscan un espectáculo: recibimos tu consulta, te brindamos la información sobre la propuesta que elegiste y coordinamos la contratación de forma directa y clara.',
    ],
    audienceTitle: 'Propuestas para',
    audience: [
      'Bares y restaurantes',
      'Cumpleaños y fiestas privadas',
      'Casamientos',
      'Empresas y eventos corporativos',
      'Salones, teatros y centros culturales',
      'Productoras y organizadores',
      'Municipios, comunas e instituciones',
    ],
    stepsTitle: 'Cómo consultar',
    steps: [
      { title: 'Explorá', text: 'Recorré el catálogo y conocé a cada artista.' },
      { title: 'Elegí', text: 'Abrí el perfil de la propuesta que te interesa.' },
      { title: 'Consultá', text: 'Escribinos por WhatsApp o correo con los datos de tu evento.' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos de tu evento',
    intro:
      'Escribinos directamente por WhatsApp o correo electrónico. Contanos qué artista te interesa, la fecha y el tipo de evento.',
    whatsapp: 'WhatsApp',
    whatsappAction: 'Escribir por WhatsApp',
    email: 'Correo electrónico',
    emailAction: 'Enviar un correo',
    emailSubject: 'Consulta desde la web — Melody Producciones',
    location: 'Ubicación',
    socials: 'Redes sociales',
  },
  artist: {
    breadcrumb: 'Ruta de navegación',
    backToCatalog: 'Volver al catálogo',
    about: 'Sobre',
    gallery: 'Galería',
    videos: 'Videos',
    socials: 'Redes sociales',
    links: 'Enlaces',
    hireTitle: '¿Querés contratar a',
    hireText:
      'Consultá por disponibilidad y condiciones directamente con Melody Producciones, por WhatsApp o correo electrónico.',
    otherArtists: 'Otros artistas',
    playVideo: 'Reproducir video',
    opensNewTab: '(se abre en una pestaña nueva)',
    photoOf: 'Foto',
    posterLabel: 'Imagen gráfica con el nombre de',
  },
  floating: {
    whatsapp: 'Escribir por WhatsApp a Melody Producciones',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    tagline: 'Representación, promoción y contratación de artistas.',
  },
  notFound: {
    title: 'Página no encontrada',
    text: 'La página que buscás no existe o cambió de dirección.',
    cta: 'Volver al inicio',
  },
} as const;

export type UiStrings = typeof es;
