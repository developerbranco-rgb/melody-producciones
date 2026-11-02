/** Datos esperados para las pruebas (deben coincidir con src/data/artists.ts y src/data/site.ts). */
export const WHATSAPP_NUMBER = '543416192627';
export const EMAIL = 'info.melodyproducciones@gmail.com';
export const BRANCO_SITE = 'https://developerbranco-rgb.github.io/Branco-WebPage/index.html';

export const ARTISTS = [
  { id: 'branco-sax', name: 'Branco.sax', discipline: 'Saxofonista' },
  { id: 'duilio-roman', name: 'Duilio Roman', discipline: 'Humorista y cantante' },
  { id: 'fernando-de-voever', name: 'Fernando De Voever', discipline: 'Humorista y cantante' },
  { id: 'humor-en-3d', name: 'Humor en 3D', discipline: 'Propuesta de humor' },
  { id: 'los-antuna-duo', name: 'Los Antuña Dúo', discipline: 'Dúo musical' },
] as const;

export const artistMessage = (name: string) =>
  `Hola, Melody Producciones. Quisiera consultar por la contratación de ${name}. ¿Me podrían brindar más información?`;

export const GENERAL_MESSAGE =
  'Hola, Melody Producciones. Quisiera hacer una consulta sobre sus artistas. ¿Me podrían brindar más información?';

/** Todas las páginas del sitio (relativas a la base /melody-producciones/). */
export const PAGES = ['', ...ARTISTS.map((a) => `artistas/${a.id}/`)];

export const BASE = '/melody-producciones/';
