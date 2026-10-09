import { RUTAS } from "@/lib/data/rutas";

/**
 * Conóceme / Analú. Fuente: Restructuración página web.
 */

export const ABOUT = {
  headline: "Hola, soy Analú",
  pendienteDocumento: false as const,
  roles:
    "Soy maestra de yoga, facilitadora de meditación y creadora de Inner Flow.",
  bioCorta:
    "Creo espacios de movimiento, pausa y conexión para ayudar a las personas a regresar al presente y relacionarse con su bienestar de una manera más consciente.",
  bioPracticas:
    "A través de yoga, Pilates, meditación, cuencos de cuarzo y journaling, diseño experiencias para personas, grupos, celebraciones, empresas y comunidades.",
  formacion: [
    "Maestra de yoga certificada RYT-200 por Yoga Alliance.",
    "En proceso de certificación en Psicología del Yoga, profundizando en la relación entre la práctica, la mente y la consciencia.",
    "Mi experiencia como maestra y facilitadora me permite crear sesiones con una intención clara y explicar cada práctica de una manera cercana, accesible y adaptable.",
  ] as const,
  paraTiSi: [
    "Sientes que vives con prisa y quieres hacer una pausa.",
    "Buscas moverte de una manera consciente y disfrutable.",
    "Quieres comenzar a meditar, pero no sabes cómo.",
    "Deseas compartir una experiencia diferente con otras personas.",
    "Buscas llevar bienestar a tu equipo o comunidad.",
    "Quieres reconectar contigo sin exigirte hacerlo perfecto.",
  ] as const,
  invitacion: "Puedes comenzar desde donde estás.",
  pathways: [
    {
      id: "sesiones",
      texto: "Sesiones privadas",
      detalle:
        "Prácticas personalizadas de yoga, Pilates, Yogilates, meditación o cuencos para ti o para un grupo pequeño.",
      href: RUTAS.sesionesPrivadas,
      cta: "Conocer sesiones privadas",
    },
    {
      id: "celebraciones",
      texto: "Celebraciones y eventos",
      detalle:
        "Experiencias de movimiento, meditación, sonido y conexión para cumpleaños, reuniones y momentos especiales.",
      href: RUTAS.celebraciones,
      cta: "Conocer celebraciones",
    },
    {
      id: "empresas",
      texto: "Empresas y colegios",
      detalle:
        "Pausas activas, movimiento, meditación y programas de bienestar adaptados a equipos y comunidades.",
      href: RUTAS.empresasColegios,
      cta: "Conocer experiencias corporativas",
    },
    {
      id: "comunidad",
      texto: "Eventos abiertos y Meditation Club",
      detalle:
        "Encuentros para practicar, aprender y conectar en comunidad.",
      href: RUTAS.calendario,
      cta: "Ver próximas experiencias",
    },
  ] as const,
} as const;

/** Testimonio del documento: plantilla con "Nombre o inicial". No publicar. */
export const TESTIMONIO_DOCUMENTO = {
  publicar: false as const,
  motivo:
    "El bloque de testimonios del documento usa placeholder (Nombre o inicial). No es un testimonio verificado.",
} as const;
