/**
 * ARCHIVO CENTRAL DE ARTISTAS — MELODY PRODUCCIONES
 * =================================================
 * Acá se edita toda la información de los artistas. Los componentes visuales leen estos datos
 * automáticamente: no hace falta tocar ningún otro archivo para actualizar un perfil.
 *
 * Reglas:
 *  - Cargar SÓLO información confirmada por el artista / la productora.
 *  - Lo que falte se marca con PENDIENTE (o con una lista vacía []): esa sección se oculta en la web.
 *  - Las fotos van en src/assets/artists/<id>/ y se referencian como '<id>/archivo.jpg'.
 *  - Los videos van en public/media/videos/<id>/ y se referencian como 'media/videos/<id>/archivo.mp4'.
 *  - Guía completa: docs/GUIA-DE-MANTENIMIENTO.md
 *
 * Buscar "PENDIENTE" en este archivo muestra todo lo que falta completar.
 */
import { PENDIENTE, type Artist } from './types';

export const artists: Artist[] = [
  {
    id: 'branco-sax',
    name: 'Branco.sax',
    discipline: 'Saxofonista',
    shortDescription: PENDIENTE,
    bio: PENDIENTE,
    images: [
      {
        file: 'branco-sax/branco-01.jpg',
        alt: 'Branco.sax tocando el saxofón en un escenario oscuro, con traje negro',
      },
      {
        file: 'branco-sax/branco-02.png',
        alt: 'Branco.sax tocando el saxofón con remera blanca bajo luces azules',
      },
      {
        file: 'branco-sax/branco-03.jpg',
        alt: 'Branco.sax durante una presentación en un escenario iluminado en azul',
      },
      {
        file: 'branco-sax/branco-04.jpg',
        alt: 'Branco.sax tocando el saxofón en una escalera de un salón',
      },
      {
        file: 'branco-sax/branco-05.jpg',
        alt: 'Branco.sax en vivo con iluminación verde y humo sobre el escenario',
      },
      {
        file: 'branco-sax/branco-06.jpg',
        alt: 'Branco.sax tocando el saxofón frente a un micrófono en un recital',
      },
      {
        file: 'branco-sax/branco-07.jpg',
        alt: 'Primer plano de Branco.sax tocando el saxofón en un show',
      },
      {
        file: 'branco-sax/branco-08.jpg',
        alt: 'Branco.sax en vivo en el bar ZEN, con el logo iluminado detrás',
      },
      {
        file: 'branco-sax/branco-09.jpg',
        alt: 'Branco.sax tocando el saxofón en un bar con luces violetas',
      },
      {
        file: 'branco-sax/branco-logo.png',
        alt: 'Escudo gráfico de Branco.sax con un saxofón y motivos de estudio de grabación',
      },
    ],
    videos: [
      {
        type: 'file',
        src: 'media/videos/branco-sax/dopashock-en-el-aserradero.mp4',
        poster: 'media/videos/branco-sax/dopashock-en-el-aserradero.jpg',
        title: 'DOPASHOCK en el Aserradero',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/en-capitan.mp4',
        poster: 'media/videos/branco-sax/en-capitan.jpg',
        title: 'En Capitán',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/eventos.mp4',
        poster: 'media/videos/branco-sax/eventos.jpg',
        title: 'Branco.sax en vivo en un evento',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/get-lucky-una-parte.mp4',
        poster: 'media/videos/branco-sax/get-lucky-una-parte.jpg',
        title: 'Get Lucky — una parte',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/psico.mp4',
        poster: 'media/videos/branco-sax/psico.jpg',
        title: 'Psico',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/psicostevia-en-casa-brava.mp4',
        poster: 'media/videos/branco-sax/psicostevia-en-casa-brava.jpg',
        title: 'Psicostevia en Casa Brava',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/forest-eminem.mp4',
        poster: 'media/videos/branco-sax/forest-eminem.jpg',
        title: 'Forest (Eminem)',
      },
      {
        type: 'file',
        src: 'media/videos/branco-sax/nano-forest.mp4',
        poster: 'media/videos/branco-sax/nano-forest.jpg',
        title: 'Nano Forest',
      },
    ],
    socials: [],
    links: [
      {
        label: 'Sitio oficial de Branco.sax',
        url: 'https://developerbranco-rgb.github.io/Branco-WebPage/index.html',
      },
    ],
    motif: 'music',
    order: 1,
    pending: [
      'Descripción corta y biografía aprobadas',
      'Redes sociales confirmadas (en su sitio figura Instagram @branco.sax: confirmar si se publica)',
    ],
  },
  {
    id: 'humor-en-3d',
    name: 'Humor en 3D',
    discipline: 'Propuesta de humor',
    shortDescription: PENDIENTE,
    bio: PENDIENTE,
    images: [
      {
        file: 'humor-en-3d/humor-en-3d-01.jpeg',
        alt: 'Los tres integrantes de Humor en 3D con camisa negra y corbata de colores, en un escenario con cortinas rojas y luces cálidas',
      },
      {
        file: 'humor-en-3d/humor-en-3d-02.jpeg',
        alt: 'Humor en 3D posando frente al cartel del espectáculo',
      },
      {
        file: 'humor-en-3d/humor-en-3d-03.jpeg',
        alt: 'Humor en 3D en escena con guitarra, delante de una pantalla con el nombre del grupo',
      },
      {
        file: 'humor-en-3d/humor-en-3d-04.jpeg',
        alt: 'Los integrantes de Humor en 3D con batas rojas, negras y amarillas sobre el escenario',
      },
      {
        file: 'humor-en-3d/humor-en-3d-05.jpeg',
        alt: 'Humor en 3D en escena junto a una moto en miniatura',
      },
      {
        file: 'humor-en-3d/humor-en-3d-logo.jpeg',
        alt: 'Logotipo de Humor en 3D',
      },
    ],
    videos: [
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/lo-que-das-3d-eltrece.mp4',
        poster: 'media/videos/humor-en-3d/lo-que-das-3d-eltrece.jpg',
        title: 'Humor en 3D en #LoQueDas3D (eltrece)',
      },
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/teatro-zorba-01.mp4',
        poster: 'media/videos/humor-en-3d/teatro-zorba-01.jpg',
        title: 'Humor en 3D en Teatro Zorba, Carlos Paz (1)',
      },
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/presentacion-humoren3d.mp4',
        poster: 'media/videos/humor-en-3d/presentacion-humoren3d.jpg',
        title: 'Humor en 3D — presentación oficial',
      },
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/teatro-zorba-02.mp4',
        poster: 'media/videos/humor-en-3d/teatro-zorba-02.jpg',
        title: 'Humor en 3D en Teatro Zorba, Carlos Paz (2)',
      },
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/tres-pianistas-extracto-6.mp4',
        poster: 'media/videos/humor-en-3d/tres-pianistas-extracto-6.jpg',
        title: 'Los pianistas — extracto 6',
      },
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/para-reir.mp4',
        poster: 'media/videos/humor-en-3d/para-reir.jpg',
        title: 'Humor en 3D, para reír',
      },
      {
        type: 'file',
        src: 'media/videos/humor-en-3d/video-humor-en-3d.mp4',
        poster: 'media/videos/humor-en-3d/video-humor-en-3d.jpg',
        title: 'Humor en 3D — video de presentación',
      },
    ],
    socials: [],
    links: [],
    motif: 'humor',
    order: 2,
    pending: [
      'Descripción corta y biografía aprobadas (integrantes, formato del espectáculo)',
      'Redes sociales confirmadas',
    ],
  },
  {
    id: 'fernando-de-voever',
    name: 'Fernando De Voever',
    discipline: 'Humorista y cantante',
    shortDescription: PENDIENTE,
    bio: PENDIENTE,
    images: [
      {
        file: 'fernando-de-voever/fernando-01.webp',
        alt: 'Fernando De Voever con campera estampada cantando frente al público y señalando hacia arriba',
      },
      {
        file: 'fernando-de-voever/fernando-02.webp',
        alt: 'Fernando De Voever sobre el escenario frente a una multitud, con luces azules',
      },
      {
        file: 'fernando-de-voever/fernando-03.webp',
        alt: 'Fernando De Voever de espaldas al público durante un show nocturno',
      },
      {
        file: 'fernando-de-voever/fernando-04.webp',
        alt: 'Fernando De Voever cantando en un escenario al aire libre con el público sentado',
      },
    ],
    videos: [
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/fernando-01.mp4',
        poster: 'media/videos/fernando-de-voever/fernando-01.jpg',
        title: 'Fernando De Voever — presentación',
      },
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/fernando-02.mp4',
        poster: 'media/videos/fernando-de-voever/fernando-02.jpg',
        title: 'Fernando De Voever en un evento',
      },
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/fernando-03.mp4',
        poster: 'media/videos/fernando-de-voever/fernando-03.jpg',
        title: 'Fernando De Voever en un festival al aire libre',
      },
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/fernando-04.mp4',
        poster: 'media/videos/fernando-de-voever/fernando-04.jpg',
        title: 'Fernando De Voever cantando en vivo',
      },
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/fernando-06.mp4',
        poster: 'media/videos/fernando-de-voever/fernando-06.jpg',
        title: 'Fernando De Voever en un evento de la Secretaría de Cultura y Deporte',
      },
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/algo-esta-pasando.mp4',
        poster: 'media/videos/fernando-de-voever/algo-esta-pasando.jpg',
        title: 'El humor de Fernando De Voever en #AlgoEstáPasando',
      },
      {
        type: 'file',
        src: 'media/videos/fernando-de-voever/gracias-maestro.mp4',
        poster: 'media/videos/fernando-de-voever/gracias-maestro.jpg',
        title: 'Gracias, maestro',
      },
    ],
    socials: [],
    links: [],
    motif: 'both',
    order: 3,
    pending: [
      'Descripción corta y biografía aprobadas',
      'Redes sociales confirmadas',
    ],
  },
  {
    id: 'los-antuna-duo',
    name: 'Los Antuña Dúo',
    discipline: 'Dúo musical',
    shortDescription: PENDIENTE,
    bio: PENDIENTE,
    images: [
      {
        file: 'los-antuna-duo/antuna-01.jpeg',
        alt: 'Los Antuña Dúo en vivo, con guitarra y un instrumento de viento, en un salón con luces violetas',
      },
      {
        file: 'los-antuna-duo/antuna-02.jpeg',
        alt: 'Los Antuña Dúo tocando la guitarra juntos durante una presentación',
      },
      {
        file: 'los-antuna-duo/antuna-03.jpeg',
        alt: 'Los Antuña Dúo en el escenario del City Center, con pantalla de fondo',
      },
      {
        file: 'los-antuna-duo/antuna-04.jpeg',
        alt: 'Los Antuña Dúo tocando la guitarra en un evento, con una moto roja en primer plano',
      },
      {
        file: 'los-antuna-duo/antuna-05.jpeg',
        alt: 'Los Antuña Dúo en vivo con guitarra y flauta, con globos y luces de colores',
      },
      {
        file: 'los-antuna-duo/antuna-06.jpeg',
        alt: 'Los Antuña Dúo tocando juntos con guitarra en un salón',
      },
      {
        file: 'los-antuna-duo/antuna-07.jpeg',
        alt: 'Los Antuña Dúo en el escenario del City Center, vistos desde el público',
      },
      {
        file: 'los-antuna-duo/antuna-08.jpeg',
        alt: 'Los Antuña Dúo tocando en el City Center frente a una pantalla gigante',
      },
      {
        file: 'los-antuna-duo/antuna-09.jpeg',
        alt: 'Los Antuña Dúo en el escenario del City Center con iluminación violeta',
      },
      {
        file: 'los-antuna-duo/antuna-10.jpeg',
        alt: 'Los Antuña Dúo durante un show en el City Center',
      },
      {
        file: 'los-antuna-duo/antuna-11.jpeg',
        alt: 'Diego, integrante de Los Antuña Dúo, tocando la guitarra en un evento',
      },
    ],
    videos: [
      {
        type: 'file',
        src: 'media/videos/los-antuna-duo/city-center.mp4',
        poster: 'media/videos/los-antuna-duo/city-center.jpg',
        title: 'Los Antuña Dúo en City Center (1)',
      },
      {
        type: 'file',
        src: 'media/videos/los-antuna-duo/city-center-2.mp4',
        poster: 'media/videos/los-antuna-duo/city-center-2.jpg',
        title: 'Los Antuña Dúo en City Center (2)',
      },
      {
        type: 'file',
        src: 'media/videos/los-antuna-duo/en-vivo.mp4',
        poster: 'media/videos/los-antuna-duo/en-vivo.jpg',
        title: 'Los Antuña Dúo en televisión — Humor en 3D',
      },
    ],
    socials: [],
    links: [],
    motif: 'music',
    order: 4,
    pending: [
      'Descripción corta y biografía aprobadas (integrantes, estilo musical)',
      'Redes sociales confirmadas',
    ],
  },
  {
    id: 'duilio-roman',
    name: 'Duilio Roman',
    discipline: 'Humorista y cantante',
    shortDescription: PENDIENTE,
    bio: PENDIENTE,
    images: [
      {
        file: 'duilio-roman/duilio-01.jpg',
        alt: 'Duilio Roman con traje borravino y corbata roja',
      },
    ],
    videos: [
      {
        type: 'file',
        src: 'media/videos/duilio-roman/duilio-roman-militello-01.mp4',
        poster: 'media/videos/duilio-roman/duilio-roman-militello-01.jpg',
        title: 'Duilio Roman en Militello Eventos y Shows (1)',
      },
      {
        type: 'file',
        src: 'media/videos/duilio-roman/duilio-roman-militello-02.mp4',
        poster: 'media/videos/duilio-roman/duilio-roman-militello-02.jpg',
        title: 'Duilio Roman en Militello Eventos y Shows (2)',
      },
      {
        type: 'file',
        src: 'media/videos/duilio-roman/duilio-roman-militello-03.mp4',
        poster: 'media/videos/duilio-roman/duilio-roman-militello-03.jpg',
        title: 'Duilio Roman en El Casting de Tele',
      },
      {
        type: 'file',
        src: 'media/videos/duilio-roman/duilio-roman-musife.mp4',
        poster: 'media/videos/duilio-roman/duilio-roman-musife.jpg',
        title: 'Duilio Roman (humor cordobés) — Musife Espectáculos',
      },
      {
        type: 'file',
        src: 'media/videos/duilio-roman/se-pico-el-dia-del-amigo.mp4',
        poster: 'media/videos/duilio-roman/se-pico-el-dia-del-amigo.jpg',
        title: 'Se picó el Día del Amigo — Parrilla Milver, Melincué',
      },
    ],
    socials: [],
    links: [],
    motif: 'both',
    order: 5,
    pending: [
      'Descripción corta y biografía aprobadas',
      'Redes sociales confirmadas',
    ],
  },
];
