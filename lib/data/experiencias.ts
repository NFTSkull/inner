/**
 * Catalogo tipado de experiencias Inner Flow.
 * Fuente: Restructuración página web (DOCX).
 * Club precioDesde: solo SUELTAS de precios.ts.
 */

import { SUELTAS } from "@/lib/data/precios";
import { RUTAS } from "@/lib/data/rutas";
import { enlaceReserva } from "@/lib/data/sesiones";

export type CategoriaExperiencia =
  | "sesiones"
  | "celebraciones"
  | "empresas"
  | "comunidad"
  | "club";

export type Experiencia = {
  id: string;
  slug: string;
  category: CategoriaExperiencia;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription?: string;
  idealFor?: string;
  idealForChips?: readonly string[];
  duration?: string;
  formats?: readonly string[];
  /** true cuando aun no hay monto factual publicado. */
  precioPendiente?: boolean;
  /** Solo si el monto existe en precios.ts / Club. */
  precioDesde?: number;
  /** Etiqueta de precio factual del documento (preferida en UI). */
  priceLabel?: string;
  participantes?: string;
  includes?: readonly string[];
  requirements?: readonly string[];
  notas?: readonly string[];
  deposito?: string;
  location?: string;
  ctaTexto: string;
  ctaHref: string;
  mood?: string;
};

/** Copy del hero y piezas cortas del Home (documento). */
export const HOME_COPY = {
  heroEyebrow: "Inner Flow · Monterrey",
  heroTituloEstructura: "Espacios para",
  heroTituloFirma: "volver a ti",
  heroSoporte:
    "Movimiento, meditación y experiencias de bienestar para hacer una pausa, conectar y habitar el presente.",
  ctaExplorar: "Explorar experiencias",
  ctaCalendario: "Ver calendario",
  seccionExperiencias: "Experiencias",
  cierreTitulo: "No tienes que saber exactamente por dónde comenzar",
  cierreSoporte:
    "Cuéntame qué estás buscando y te ayudaré a encontrar una experiencia para ti, tu grupo o tu organización.",
  cierreCtaHablemos: "Hablemos",
  cierreCtaExplorar: "Explorar experiencias",
} as const;

/** Posicionamiento factual (documento, literal). */
export const INTRO_INNERFLOW = {
  idea: "Salir del piloto automático.",
  ideaPresente: "Regresar al presente.",
  pregunta: "¿Qué es Inner Flow?",
  texto:
    "Inner Flow es un espacio de bienestar creado para acompañarte a salir del piloto automático y regresar al presente a través del movimiento, la meditación, el sonido y la conexión.",
  textoSecundario:
    "Aquí puedes encontrar prácticas para ti, experiencias para compartir y propuestas de bienestar para grupos y organizaciones.",
  ctaTexto: "Conocer Inner Flow",
  ctaHref: RUTAS.conoceme,
} as const;

/** Cuatro destinos de experiencia (Home + hub /experiencias). */
export type MundoExperiencia = {
  id: string;
  etiqueta: string;
  titulo: string;
  descripcion: string;
  href: string;
  ctaTexto: string;
  /** Superficie oscura: texto en papel. */
  oscuro: boolean;
  acento: string;
  fondo: string;
};

export const HUB_EXPERIENCIAS = {
  titulo: "Encuentra tu forma de volver a ti.",
  soporte:
    "Prácticas para ti, experiencias para compartir y propuestas de bienestar para grupos y organizaciones.",
} as const;

export const MUNDOS_EXPERIENCIA: readonly MundoExperiencia[] = [
  {
    id: "sesiones-privadas",
    etiqueta: "Para ti",
    titulo: "Sesiones privadas",
    descripcion:
      "Yoga, Pilates y meditación con cuencos, para ti o para un grupo pequeño.",
    href: RUTAS.sesionesPrivadas,
    ctaTexto: "Ver sesiones",
    oscuro: false,
    acento: "var(--color-tierra)",
    fondo: "var(--color-crema)",
  },
  {
    id: "celebraciones",
    etiqueta: "Celebrar",
    titulo: "Celebraciones",
    descripcion:
      "Movimiento, sonido y conexión para cumpleaños, despedidas y momentos especiales.",
    href: RUTAS.celebraciones,
    ctaTexto: "Ver celebraciones",
    oscuro: false,
    acento: "var(--color-tinta)",
    fondo: "color-mix(in srgb, var(--color-salvia-doc) 34%, var(--color-papel))",
  },
  {
    id: "empresas-colegios",
    etiqueta: "Organizaciones",
    titulo: "Empresas y colegios",
    descripcion:
      "Pausas activas, movimiento, meditación y programas para equipos e instituciones.",
    href: RUTAS.empresasColegios,
    ctaTexto: "Ver propuestas",
    oscuro: true,
    acento: "var(--color-lima)",
    fondo: "var(--color-bosque)",
  },
  {
    id: "eventos-comunidad",
    etiqueta: "Comunidad",
    titulo: "Eventos y comunidad",
    descripcion:
      "Encuentros abiertos y colaboraciones para vivir el bienestar en comunidad.",
    href: RUTAS.eventosComunidad,
    ctaTexto: "Ver comunidad",
    oscuro: false,
    acento: "var(--color-tinta)",
    fondo: "color-mix(in srgb, var(--color-cielo) 30%, var(--color-papel))",
  },
];

/** Bloque compacto de Comunidad en Home (documento). */
export const COMUNIDAD_HOME = {
  etiqueta: "Comunidad",
  titulo: "Experiencias para volver a ti y compartir con otros",
  texto:
    "Encuentros abiertos para moverse, hacer una pausa, conectar y vivir el bienestar en comunidad.",
  formatos: [
    "Clases especiales",
    "Meditaciones",
    "Talleres",
    "Ceremonias",
    "Colaboraciones",
  ],
  ctaTexto: "Ver eventos y comunidad",
  ctaHref: RUTAS.eventosComunidad,
} as const;

/** Copy de página Sesiones privadas (documento). */
export const SESIONES_PAGE = {
  titulo: "Una práctica creada para ti",
  intro:
    "Yoga, Pilates y meditación con cuencos, diseñadas de acuerdo con tus necesidades e intención.",
  ctaAgendar: "Quiero agendar una sesión",
  ctaElegir: "Ayúdame a elegir mi experiencia",
  ctaAgendarHref: enlaceReserva(
    "Hola, quiero agendar una sesión privada con Inner Flow."
  ),
  ctaElegirHref: enlaceReserva(
    "Hola, ayúdame a elegir mi experiencia de sesión privada con Inner Flow."
  ),
  incluye: [
    "Práctica guiada de principio a fin",
    "Adaptaciones de acuerdo con el nivel del participante o grupo",
    "Traslado dentro de la zona incluida",
    "Seguimiento para elegir la práctica más adecuada",
  ] as const,
  dondeOcurre: "A domicilio o en un espacio privado acordado",
  duraciones: "Sesiones de 60 o 90 minutos",
  capacidad: "Máximo 15 personas",
  tarifas60: {
    individual: 600,
    grupoHasta5: 1000,
    adicional: 150,
  } as const,
  tarifas90: {
    individual: 850,
    grupoHasta5: 1400,
    adicional: 200,
  } as const,
  notaPrecios:
    "Precios a domicilio dentro de la zona establecida. Renta de espacio o traslado adicional se cotizan por separado.",
  deposito: "50% de anticipo para reservar",
  enlaceEmpresasTexto: "Ver experiencias para empresas y colegios",
  enlaceEmpresasHref: RUTAS.empresasColegios,
} as const;

/**
 * Precios de celebraciones centralizados.
 * CONFLICTO: el texto narrativo del documento indica adicionales
 * Move & Connect $150 y Celebración Inner Flow $200; una tabla
 * visual del mismo documento muestra montos distintos.
 * UI usa valores narrativos hasta revisión manual.
 */
export const CELEBRACIONES_PRECIOS = {
  pausaCompartida: {
    base: 2200,
    adicionalNarrativo: 150,
    adicionalTabla: null as number | null,
    usadoEnUi: 150,
    requiereRevisionManual: false,
  },
  moveConnect: {
    base: 2800,
    adicionalNarrativo: 150,
    /** Tabla visual del documento: discrepante; confirmar con Analú. */
    adicionalTabla: null as number | null,
    usadoEnUi: 150,
    requiereRevisionManual: true,
  },
  celebracionInnerFlow: {
    base: 3800,
    adicionalNarrativo: 200,
    /** Tabla visual del documento: discrepante; confirmar con Analú. */
    adicionalTabla: null as number | null,
    usadoEnUi: 200,
    requiereRevisionManual: true,
  },
  personalizadaDesde: 2200,
} as const;

/** Copy de página Celebraciones / eventos privados (documento). */
export const CELEBRACIONES_PAGE = {
  titulo: "Celebra desde la presencia",
  intro:
    "Movimiento, meditación, sonido y dinámicas conscientes para celebrar cumpleaños, despedidas y ocasiones especiales.",
  ctaPrincipal: "Quiero celebrar con Inner Flow",
  ctaPrincipalHref: enlaceReserva(
    "Hola, quiero celebrar con Inner Flow. Cuéntame sobre una celebración o evento privado."
  ),
  infoImportante: [
    "Los tapetes para participantes no están incluidos.",
    "La renta del espacio se cotiza por separado.",
    "Puede aplicarse un costo adicional de traslado según la ubicación.",
    "La fecha se reserva con un anticipo del 50%.",
  ] as const,
  deposito: "50% de anticipo",
  precios: CELEBRACIONES_PRECIOS,
} as const;

/** Copy de página Empresas y colegios (documento). */
export const EMPRESAS_PAGE = {
  titulo: "Equipos que hacen una pausa también avanzan mejor",
  intro:
    "Cuando el ritmo de trabajo se vuelve acelerado, hacer una pausa puede ayudar a recuperar energía, liberar tensión y regresar a las actividades con mayor presencia.",
  ctaPropuesta: "Solicitar una propuesta",
  ctaPropuestaHref: enlaceReserva(
    "Hola, escribo desde una organización. Quiero solicitar una propuesta de bienestar con Inner Flow."
  ),
  proporcionaIF: [
    "Cuencos de cuarzo",
    "Bocina",
    "Micrófono",
    "Música para la sesión",
    "Material pequeño necesario para las dinámicas",
    "Planeación y adaptación de la experiencia",
    "Guía completa de la actividad",
  ] as const,
  proporcionaOrg: [
    "Un espacio limpio, seguro y adecuado para el grupo",
    "Acceso al lugar con tiempo suficiente para el montaje",
    "Conexión eléctrica cuando sea necesaria",
    "Tapetes para los participantes en las experiencias de piso",
    "Sillas para yoga corporativo o pausas activas, cuando corresponda",
  ] as const,
  comoFunciona: [
    "Cuéntame qué necesita tu equipo",
    "Recibe una propuesta",
    "Reserva la fecha",
    "Vivamos la experiencia",
  ] as const,
  infoImportante: [
    "Las inversiones mostradas son precios iniciales.",
    "La cotización final depende del número de participantes, ubicación, duración, frecuencia y requerimientos técnicos.",
    "Puede aplicarse un cargo adicional por traslados fuera de la zona establecida.",
    "La fecha se reserva con un anticipo del 50%.",
  ] as const,
  deposito: "50% de anticipo",
  programasIntro: "Que el bienestar no sea solamente para una fecha especial.",
} as const;

/** Copy de página Eventos y comunidad (documento). */
export const COMUNIDAD_PAGE = {
  titulo: "Experiencias para volver a ti y compartir con otros",
  intro:
    "Encuentros abiertos para moverse, hacer una pausa, conectar y vivir el bienestar en comunidad: clases especiales, meditaciones, talleres, ceremonias y colaboraciones en distintos espacios de Monterrey.",
  cierreIntro: "Puedes llegar tal como eres.",
  ctaProximas: "Ver próximas experiencias",
  ctaProximasHref: RUTAS.calendario,
  clubBloque: {
    titulo: "Un espacio para hacer de la pausa una práctica",
    texto:
      "Meditation Club es el espacio recurrente de Inner Flow para conocer distintas formas de meditar. Puedes asistir a una sesión individual o elegir una membresía.",
    ctaTexto: "Conocer Meditation Club",
    ctaHref: RUTAS.club,
  } as const,
  colaboracionesIntro:
    "Inner Flow colabora con proyectos, espacios y marcas que comparten una forma consciente de crear comunidad.",
  colaboracionesCta: "Conocer la colaboración",
  propuestaColab: {
    titulo: "¿Quieres crear algo con Inner Flow?",
    texto:
      "Si tienes un espacio, proyecto o marca y te gustaría crear una experiencia en colaboración, cuéntame tu idea.",
    ctaTexto: "Proponer una colaboración",
    ctaHref: enlaceReserva(
      "Hola, me gustaría proponer una colaboración con Inner Flow."
    ),
  } as const,
  mantenteCerca:
    "Las experiencias cambian cada mes y algunas cuentan con pocos lugares.",
  ctaCalendario: "Ver calendario",
  ctaCalendarioHref: RUTAS.calendario,
  ctaUnirme: "Unirme a la comunidad",
  ctaUnirmeHref: enlaceReserva(
    "Hola, quiero unirme a la comunidad Inner Flow y enterarme de nuevas fechas."
  ),
} as const;

/** Copy del bloque Meditation Club en Home (documento). */
export const CLUB_HOME = {
  subtitulo: "Practicar en comunidad cambia la experiencia",
  texto:
    "Un espacio para conocer diferentes formas de meditar, hacer una pausa y encontrar la práctica que mejor se adapte a ti.",
  ctaConocer: "Conocer Meditation Club",
  ctaConocerHref: RUTAS.club,
  ctaSesiones: "Ver próximas sesiones",
  ctaSesionesHref: RUTAS.calendario,
} as const;

/** Precio suelto mas bajo del Club (fuente: precios.ts). */
const PRECIO_CLUB_DESDE = Math.min(...SUELTAS.map((r) => r.precio));

const PRICE_SESIONES =
  "60 min: $600 individual · $1,000 grupo hasta cinco";

export const EXPERIENCIAS: readonly Experiencia[] = [
  /* ---- Sesiones privadas ---- */
  {
    id: "sesion-yoga",
    slug: "yoga",
    category: "sesiones",
    title: "Yoga",
    shortDescription:
      "Una práctica personalizada de movimiento y respiración, adaptada a tu nivel, objetivos y necesidades.",
    fullDescription:
      "Una práctica personalizada de movimiento y respiración, adaptada a tu nivel, objetivos y necesidades. Puede enfocarse en movilidad, fuerza, equilibrio, flexibilidad o relajación.",
    idealFor:
      "Comenzar a practicar, mejorar tu técnica, complementar otra actividad física o conectar contigo a través del movimiento.",
    idealForChips: [
      "Comenzar a practicar",
      "Mejorar tu técnica",
      "Complementar otra actividad física",
      "Conectar contigo a través del movimiento",
    ],
    duration: "60 o 90 minutos",
    formats: ["individual", "grupo privado"],
    priceLabel: PRICE_SESIONES,
    participantes: "Individual o grupo privado (base hasta 5)",
    location: "A domicilio o en un espacio privado acordado",
    deposito: "50% de anticipo para reservar",
    ctaTexto: "Quiero agendar una sesión",
    ctaHref: enlaceReserva(
      "Hola, quiero agendar una sesión privada de Yoga con Inner Flow."
    ),
    mood: "intimate",
  },
  {
    id: "sesion-pilates",
    slug: "pilates",
    category: "sesiones",
    title: "Pilates",
    shortDescription:
      "Una sesión que combina fuerza, estabilidad, movilidad y control corporal.",
    fullDescription:
      "Una sesión que combina fuerza, estabilidad, movilidad y control corporal. La intensidad y los ejercicios se adaptan a tu experiencia para ofrecerte una práctica retadora y consciente.",
    idealFor:
      "Fortalecer todo el cuerpo, mejorar la postura, trabajar el core y desarrollar mayor conciencia corporal.",
    idealForChips: [
      "Fortalecer todo el cuerpo",
      "Mejorar la postura",
      "Trabajar el core",
      "Desarrollar mayor conciencia corporal",
    ],
    duration: "60 o 90 minutos",
    formats: ["individual", "grupo privado"],
    priceLabel: PRICE_SESIONES,
    participantes: "Individual o grupo privado (base hasta 5)",
    location: "A domicilio o en un espacio privado acordado",
    deposito: "50% de anticipo para reservar",
    ctaTexto: "Quiero agendar una sesión",
    ctaHref: enlaceReserva(
      "Hola, quiero agendar una sesión privada de Pilates con Inner Flow."
    ),
    mood: "intimate",
  },
  {
    id: "sesion-cuencos",
    slug: "meditacion-con-cuencos",
    category: "sesiones",
    title: "Meditación con cuencos",
    shortDescription:
      "Una experiencia guiada para hacer una pausa, volver al presente y permitir que el cuerpo descanse.",
    fullDescription:
      "Una experiencia guiada para hacer una pausa, volver al presente y permitir que el cuerpo descanse. La sesión combina meditación, respiración y sonidos de cuencos de cuarzo.",
    idealFor:
      "Grupos o personas que buscan disminuir el ritmo, descansar mentalmente y experimentar una forma diferente de meditar.",
    idealForChips: [
      "Disminuir el ritmo",
      "Descansar mentalmente",
      "Una forma diferente de meditar",
    ],
    duration: "60 o 90 minutos",
    formats: ["individual", "grupo privado"],
    priceLabel: PRICE_SESIONES,
    participantes: "Individual o grupo privado (base hasta 5)",
    location: "A domicilio o en un espacio privado acordado",
    deposito: "50% de anticipo para reservar",
    ctaTexto: "Quiero agendar una sesión",
    ctaHref: enlaceReserva(
      "Hola, quiero agendar una sesión privada de Meditación con cuencos con Inner Flow."
    ),
    mood: "intimate",
  },
  {
    id: "sesion-personalizada",
    slug: "experiencia-personalizada-sesiones",
    category: "sesiones",
    title: "Experiencia personalizada",
    shortDescription:
      "Si buscas combinar movimiento, meditación y sonido, podemos crear una sesión especial de acuerdo con tu intención.",
    fullDescription:
      "Si buscas combinar movimiento, meditación y sonido, podemos crear una sesión especial de acuerdo con tu intención.",
    notas: [
      "Yoga + meditación con cuencos",
      "Pilates + meditación guiada",
      "Yoga suave y baño de sonido",
    ],
    duration: "60 o 90 minutos",
    formats: ["individual", "grupo privado"],
    priceLabel: PRICE_SESIONES,
    participantes: "Individual o grupo privado (base hasta 5)",
    location: "A domicilio o en un espacio privado acordado",
    deposito: "50% de anticipo para reservar",
    ctaTexto: "Ayúdame a elegir mi experiencia",
    ctaHref: enlaceReserva(
      "Hola, quiero una experiencia personalizada de sesiones privadas con Inner Flow. Ayúdame a elegir."
    ),
    mood: "intimate",
  },

  /* ---- Celebraciones ---- */
  {
    id: "celeb-pausa",
    slug: "pausa-compartida",
    category: "celebraciones",
    title: "Pausa compartida",
    subtitle: "Meditación guiada con cuencos de cuarzo",
    shortDescription:
      "Un espacio para bajar el ritmo y conectar con el momento presente.",
    fullDescription:
      "Un espacio para bajar el ritmo y conectar con el momento presente. La experiencia comienza con respiración y meditación guiada, seguida por un baño de sonido con cuencos de cuarzo. La práctica se adapta a la intención de la celebración.",
    idealFor:
      "Cumpleaños, reuniones íntimas, despedidas o grupos que buscan una experiencia tranquila y accesible, incluso si nunca han meditado.",
    idealForChips: [
      "Cumpleaños",
      "Reuniones íntimas",
      "Despedidas",
      "Sin experiencia previa",
    ],
    duration: "60 minutos",
    participantes: "Hasta 15 personas",
    priceLabel: `Inversión: $${CELEBRACIONES_PRECIOS.pausaCompartida.base.toLocaleString("en-US")} · Persona adicional: $${CELEBRACIONES_PRECIOS.pausaCompartida.usadoEnUi}`,
    includes: [
      "Meditación guiada",
      "Baño de sonido con cuencos de cuarzo",
      "Momento dedicado a la celebración",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Elegir Pausa compartida",
    ctaHref: enlaceReserva(
      "Hola, quiero cotizar la celebración Pausa compartida con Inner Flow."
    ),
    mood: "joyful",
  },
  {
    id: "celeb-move",
    slug: "move-and-connect",
    category: "celebraciones",
    title: "Move & Connect",
    subtitle: "Movimiento consciente y meditación",
    shortDescription:
      "Una experiencia para moverse, disfrutar y terminar con un momento de calma.",
    fullDescription:
      "Una experiencia para moverse, disfrutar y terminar con un momento de calma. Puedes elegir entre yoga, yogilates o pilates, seguido de una meditación guiada con cuencos para integrar la práctica. La intensidad se adapta al grupo, por lo que no es necesario tener experiencia previa.",
    idealFor:
      "Cumpleaños, despedidas, reuniones entre amigas o grupos que quieren compartir una actividad diferente, dinámica y consciente.",
    idealForChips: [
      "Cumpleaños",
      "Despedidas",
      "Reuniones entre amigas",
      "Actividad dinámica y consciente",
    ],
    duration: "75 minutos",
    participantes: "Hasta 15 personas",
    priceLabel: `Inversión: $${CELEBRACIONES_PRECIOS.moveConnect.base.toLocaleString("en-US")} · Persona adicional: $${CELEBRACIONES_PRECIOS.moveConnect.usadoEnUi}`,
    includes: [
      "Sesión de yoga, yogilates o pilates",
      "Adaptaciones para diferentes niveles",
      "Relajación y meditación final",
      "Cierre dedicado a la persona celebrada",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Elegir Move & Connect",
    ctaHref: enlaceReserva(
      "Hola, quiero cotizar la celebración Move & Connect con Inner Flow."
    ),
    mood: "joyful",
  },
  {
    id: "celeb-inner",
    slug: "celebracion-inner-flow",
    category: "celebraciones",
    title: "Celebración Inner Flow",
    subtitle: "Movimiento, meditación, sonido y ritual",
    shortDescription:
      "La experiencia más completa de Inner Flow, creada para celebrar a una persona y hacerla sentir acompañada, reconocida y querida.",
    fullDescription:
      "La experiencia más completa de Inner Flow, creada para celebrar a una persona y hacerla sentir acompañada, reconocida y querida. Comenzaremos con movimiento consciente, continuaremos con una meditación acompañada por cuencos de cuarzo y cerraremos con una ceremonia grupal alrededor de un círculo de flores. Las dinámicas se personalizan de acuerdo con la ocasión y la intención que quieras compartir.",
    idealFor:
      "Cumpleaños especiales, despedidas, nuevos comienzos, cierres de etapa y celebraciones con intención.",
    idealForChips: [
      "Cumpleaños especiales",
      "Despedidas",
      "Nuevos comienzos",
      "Cierres de etapa",
    ],
    duration: "90 minutos",
    participantes: "Hasta 15 personas",
    priceLabel: `Inversión: $${CELEBRACIONES_PRECIOS.celebracionInnerFlow.base.toLocaleString("en-US")} · Persona adicional: $${CELEBRACIONES_PRECIOS.celebracionInnerFlow.usadoEnUi}`,
    includes: [
      "Sesión de movimiento consciente",
      "Meditación guiada con cuencos de cuarzo",
      "Flores y material necesario para las dinámicas",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Elegir Celebración Inner Flow",
    ctaHref: enlaceReserva(
      "Hola, quiero cotizar la Celebración Inner Flow."
    ),
    mood: "joyful",
  },
  {
    id: "celeb-personalizada",
    slug: "experiencia-personalizada-celebraciones",
    category: "celebraciones",
    title: "Crea tu propia experiencia",
    subtitle: "¿Tienes algo diferente en mente?",
    shortDescription:
      "Podemos combinar prácticas, modificar la duración o crear una dinámica especial según la ocasión, el grupo y la intención de la celebración.",
    fullDescription:
      "Podemos combinar prácticas, modificar la duración o crear una dinámica especial según la ocasión, el grupo y la intención de la celebración. Cuéntame qué estás celebrando, cuántas personas asistirán y cómo quieres que se sienta la experiencia. A partir de eso crearé una propuesta para ti.",
    notas: [
      "Meditación con cuencos y ceremonia",
      "Movimiento, journaling y relajación",
      "Experiencia temática para un momento especial",
    ],
    priceLabel: `Desde $${CELEBRACIONES_PRECIOS.personalizadaDesde.toLocaleString("en-US")}`,
    participantes: "Hasta 15 personas",
    deposito: "50% de anticipo",
    ctaTexto: "Crear mi experiencia",
    ctaHref: enlaceReserva(
      "Hola, quiero diseñar una celebración personalizada con Inner Flow."
    ),
    mood: "joyful",
  },

  /* ---- Empresas y colegios ---- */
  {
    id: "corp-pausas",
    slug: "pausas-activas-yoga-corporativo",
    category: "empresas",
    title: "Pausas activas y yoga corporativo",
    subtitle: "Una pausa breve dentro de la jornada",
    shortDescription:
      "Sesiones accesibles de movilidad, respiración y estiramiento para interrumpir periodos prolongados de trabajo.",
    fullDescription:
      "Sesiones accesibles de movilidad, respiración y estiramiento para interrumpir periodos prolongados de trabajo, liberar tensión corporal y brindar un momento de descanso consciente. Las prácticas pueden realizarse de pie o desde una silla, sin necesidad de cambiarse de ropa ni utilizar tapete.",
    duration: "20 a 30 minutos",
    priceLabel: "Desde $1,600",
    participantes:
      "El precio se ajusta de acuerdo con el tamaño del grupo",
    includes: [
      "Movilidad articular",
      "Estiramientos desde la silla o de pie",
      "Ejercicios para cuello, hombros, espalda y cadera",
      "Respiración consciente",
      "Pausa breve de atención plena",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Cotizar una pausa activa",
    ctaHref: enlaceReserva(
      "Hola, escribo desde una organización. Quiero cotizar Pausas activas y yoga corporativo con Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-movimiento",
    slug: "movimiento-completo",
    category: "empresas",
    title: "Movimiento completo",
    subtitle: "Una clase para moverse, fortalecerse y reconectar",
    shortDescription:
      "Una sesión completa de yoga, pilates o yogilates adaptada al nivel y las necesidades del equipo.",
    fullDescription:
      "Una sesión completa de yoga, pilates o yogilates adaptada al nivel y las necesidades del equipo. La experiencia combina movilidad, fuerza, equilibrio, respiración y relajación. No es necesario que los participantes tengan experiencia previa: la práctica se diseña para ser accesible, segura y disfrutable para el grupo. La intensidad puede ajustarse según el objetivo de la organización, desde una sesión suave de movilidad hasta una clase más dinámica y energizante.",
    idealFor:
      "Actividades de integración, eventos internos, semanas de salud y bienestar, celebraciones corporativas, colegios y comunidades educativas, programas recurrentes de actividad física.",
    idealForChips: [
      "Integración",
      "Eventos internos",
      "Semanas de salud",
      "Celebraciones corporativas",
      "Colegios",
      "Programas recurrentes",
    ],
    duration: "60 minutos",
    priceLabel: "Desde $2,500",
    participantes:
      "El precio se ajusta de acuerdo con el tamaño del grupo",
    includes: [
      "Planeación adaptada al grupo",
      "Clase de yoga, Pilates o Yogilates",
      "Respiración y relajación final",
    ],
    requirements: [
      "Cada participante deberá contar con su propio tapete.",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Cotizar una clase para mi equipo",
    ctaHref: enlaceReserva(
      "Hola, escribo desde una organización. Quiero cotizar Movimiento completo con Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-cuencos",
    slug: "meditacion-y-cuencos-empresas",
    category: "empresas",
    title: "Meditación y cuencos",
    subtitle: "Un espacio para bajar el ritmo",
    shortDescription:
      "Una experiencia de meditación guiada acompañada por cuencos de cuarzo para el equipo.",
    fullDescription:
      "Una experiencia de meditación guiada acompañada por cuencos de cuarzo, creada para ofrecer al equipo una pausa de relajación, presencia y descanso mental. La sesión comienza con respiración y conexión corporal, continúa con una meditación accesible para principiantes y cierra con un baño de sonido. No se necesita experiencia previa en meditación. La práctica se adapta al contexto de la empresa y puede enfocarse en relajación, manejo consciente del estrés, agradecimiento, cierre de ciclos o reconexión con el momento presente.",
    idealFor:
      "Equipos con jornadas de alta demanda, actividades de bienestar emocional, cierres de proyectos o ciclos, jornadas de salud, eventos internos, experiencias de integración, personal docente y comunidades educativas.",
    idealForChips: [
      "Alta demanda",
      "Bienestar emocional",
      "Cierres de ciclo",
      "Jornadas de salud",
      "Integración",
      "Comunidades educativas",
    ],
    duration: "60 minutos",
    priceLabel: "Desde $3,200",
    participantes:
      "El precio se ajusta de acuerdo con el tamaño del grupo",
    includes: [
      "Ejercicios de respiración",
      "Meditación guiada",
      "Baño de sonido con cuencos de cuarzo",
    ],
    requirements: [
      "Los participantes deberán contar con tapete o un lugar cómodo para sentarse o recostarse.",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Llevar una pausa consciente a mi equipo",
    ctaHref: enlaceReserva(
      "Hola, escribo desde una organización. Quiero llevar Meditación y cuencos a mi equipo con Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-integral",
    slug: "experiencia-integral-inner-flow",
    category: "empresas",
    title: "Experiencia integral Inner Flow",
    subtitle: "Movimiento, sonido y conexión en una misma experiencia",
    shortDescription:
      "Una experiencia especial que combina movimiento consciente, respiración, meditación, cuencos de cuarzo y una dinámica de conexión grupal.",
    fullDescription:
      "Una experiencia especial que combina movimiento consciente, respiración, meditación, cuencos de cuarzo y una dinámica de conexión grupal. La propuesta se diseña de acuerdo con la intención de la organización. Puede enfocarse en disminuir el ritmo, fortalecer la conexión del equipo, agradecer el trabajo compartido, cerrar una etapa o crear un momento de consciencia dentro de un evento corporativo. La dinámica final puede incluir journaling, reflexión personal, agradecimiento o una actividad de conexión entre participantes.",
    idealFor:
      "Wellness days, actividades de integración, aniversarios empresariales, cierres de año o proyectos, celebraciones institucionales, congresos y retiros de equipo, jornadas especiales para docentes o colaboradores.",
    idealForChips: [
      "Wellness days",
      "Integración",
      "Aniversarios",
      "Cierres de año",
      "Congresos y retiros",
      "Jornadas docentes",
    ],
    duration: "90 minutos",
    priceLabel: "Desde $4,500",
    participantes:
      "El precio se ajusta de acuerdo con el tamaño del grupo",
    includes: [
      "Movimiento consciente",
      "Ejercicios de respiración",
      "Meditación guiada",
      "Baño de sonido con cuencos de cuarzo",
      "Dinámica de conexión, consciencia o agradecimiento",
    ],
    notas: [
      "Si la experiencia requiere journals impresos, velas, flores, kits u otros materiales individuales, estos se cotizan adicionalmente de acuerdo con el número de participantes.",
    ],
    deposito: "50% de anticipo",
    ctaTexto: "Diseñar una experiencia para mi equipo",
    ctaHref: enlaceReserva(
      "Hola, escribo desde una organización. Quiero diseñar una Experiencia integral Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-prog-pausas",
    slug: "pausas-conscientes",
    category: "empresas",
    title: "Pausas conscientes",
    subtitle: "Programa mensual",
    shortDescription:
      "Cuatro sesiones mensuales de movilidad, estiramiento, yoga en silla y respiración.",
    fullDescription:
      "Cuatro sesiones mensuales de movilidad, estiramiento, yoga en silla y respiración. Las prácticas cambian cada semana para trabajar distintas necesidades, como movilidad de espalda, liberación de tensión, yoga en silla, postura y respiración consciente.",
    duration: "20 a 30 minutos por sesión",
    priceLabel: "Desde $5,800 (mensual, un grupo semanal)",
    participantes: "Varios grupos o turnos: propuesta personalizada",
    deposito: "50% de anticipo",
    ctaTexto: "Crear un programa mensual",
    ctaHref: enlaceReserva(
      "Hola, quiero una propuesta del programa mensual Pausas conscientes con Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-prog-movimiento",
    slug: "movimiento-continuo",
    category: "empresas",
    title: "Movimiento continuo",
    subtitle: "Programa mensual",
    shortDescription:
      "Cuatro clases mensuales de yoga, Pilates o Yogilates.",
    fullDescription:
      "Cuatro clases mensuales de yoga, Pilates o Yogilates.",
    duration: "60 minutos por sesión",
    priceLabel: "Desde $9,000 (mensual)",
    deposito: "50% de anticipo",
    ctaTexto: "Crear un programa mensual",
    ctaHref: enlaceReserva(
      "Hola, quiero una propuesta del programa mensual Movimiento continuo con Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-prog-balance",
    slug: "balance-mensual",
    category: "empresas",
    title: "Balance mensual",
    subtitle: "Programa mensual",
    shortDescription:
      "Dos clases completas de movimiento y dos sesiones de meditación con cuencos.",
    fullDescription:
      "Dos clases completas de movimiento y dos sesiones de meditación con cuencos.",
    duration: "60 minutos por sesión",
    priceLabel: "Desde $10,300 (mensual)",
    deposito: "50% de anticipo",
    ctaTexto: "Crear un programa mensual",
    ctaHref: enlaceReserva(
      "Hola, quiero una propuesta del programa mensual Balance mensual con Inner Flow."
    ),
    mood: "structured",
  },
  {
    id: "corp-prog-integral",
    slug: "programa-integral",
    category: "empresas",
    title: "Programa integral",
    subtitle: "Programa mensual",
    shortDescription:
      "Tres sesiones de 60 minutos y una experiencia integral de 90 minutos para cerrar el mes.",
    fullDescription:
      "Tres sesiones de 60 minutos y una experiencia integral de 90 minutos para cerrar el mes. La selección de prácticas puede adaptarse entre movimiento, movilidad, meditación, respiración y cuencos.",
    duration: "Tres de 60 min y una de 90 min",
    priceLabel: "Desde $12,000 (mensual)",
    deposito: "50% de anticipo",
    ctaTexto: "Crear un programa mensual",
    ctaHref: enlaceReserva(
      "Hola, quiero una propuesta del Programa integral mensual con Inner Flow."
    ),
    mood: "structured",
  },

  /* ---- Comunidad ---- */
  {
    id: "comunidad-abierta",
    slug: "eventos-y-comunidad",
    category: "comunidad",
    title: "Eventos y comunidad",
    subtitle: "Experiencias para volver a ti y compartir con otros",
    shortDescription:
      "Encuentros abiertos para moverse, hacer una pausa, conectar y vivir el bienestar en comunidad.",
    fullDescription:
      "Inner Flow también crea encuentros abiertos para quienes quieren moverse, hacer una pausa, conectar y vivir el bienestar en comunidad. A lo largo del año encontrarás clases especiales, meditaciones, talleres, ceremonias y colaboraciones en distintos espacios de Monterrey. Cada experiencia tiene una intención diferente, pero todas nacen de la misma idea: abrir momentos para salir del piloto automático y volver al presente. No necesitas pertenecer a un grupo, tener experiencia previa ni asistir con alguien. Puedes llegar tal como eres.",
    location: "Distintos espacios de Monterrey",
    ctaTexto: "Ver próximas experiencias",
    ctaHref: RUTAS.calendario,
    mood: "alive",
  },

  /* ---- Meditation Club (precios reales del codebase) ---- */
  {
    id: "club-meditation",
    slug: "meditation-club",
    category: "club",
    title: "Meditation Club",
    subtitle: "Practicar en comunidad cambia la experiencia",
    shortDescription:
      "Meditation Club es un espacio para conocer diferentes formas de meditar, hacer una pausa y encontrar la práctica que mejor se adapte a ti. No necesitas experiencia previa. Puedes comenzar con una sola sesión o elegir una membresía para practicar con mayor constancia.",
    fullDescription:
      "Meditation Club es el espacio recurrente de Inner Flow para conocer distintas formas de meditar y encontrar la que mejor se adapte a ti. A lo largo de las sesiones exploramos prácticas como meditación guiada, visualizaciones, atención plena, movimiento consciente y baños de sonido con cuencos de cuarzo. Puedes asistir a una sesión individual o elegir una membresía para practicar con mayor constancia.",
    formats: ["presencial", "online", "membresía"],
    location: "Casa Zenia · Oh my core! · online",
    precioDesde: PRECIO_CLUB_DESDE,
    priceLabel: `Desde $${PRECIO_CLUB_DESDE}`,
    ctaTexto: "Conocer Meditation Club",
    ctaHref: RUTAS.club,
    mood: "calm",
  },
];

export function experienciasPorCategoria(
  category: CategoriaExperiencia
): Experiencia[] {
  return EXPERIENCIAS.filter((e) => e.category === category);
}

export function experienciaPorSlug(slug: string): Experiencia | undefined {
  return EXPERIENCIAS.find((e) => e.slug === slug);
}
