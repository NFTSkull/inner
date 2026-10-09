/**
 * Copy legacy de servicios + vitrina teaser del Home.
 * Detalle completo vive en páginas de experiencia.
 */

import { RUTAS } from "@/lib/data/rutas";
import { enlaceReserva } from "@/lib/data/sesiones";

export type ModalidadServicio = {
  nombre: string;
  detalle?: string;
  valor?: string;
};

export type EventoComunidad = {
  titulo: string;
  cuando: string;
  nota: string;
};

export type ServicioPagina = {
  id: string;
  eyebrow: string;
  titulo: string;
  intro: string;
  modalidades: readonly ModalidadServicio[];
  tags?: readonly string[];
  ctaTexto: string;
  ctaHref: string;
  tono?: "calido" | "profesional";
  proximamente?: boolean;
  eventosEjemplo?: readonly EventoComunidad[];
};

export type EntradaVitrina = {
  id: string;
  titulo: string;
  linea: string;
  href: string;
  insignia?: boolean;
};

export const SERVICIO_SESIONES: ServicioPagina = {
  id: "sesiones-privadas",
  eyebrow: "Sesiones privadas",
  titulo: "Solo tú, o tú y los tuyos.",
  intro:
    "A veces lo que necesitas no es un grupo abierto. El espacio y la guía se ajustan a ustedes.",
  tags: ["yoga", "stretch", "meditación"],
  modalidades: [
    {
      nombre: "1 a 1",
      detalle: "Individual o para una o dos personas.",
    },
    {
      nombre: "Grupo privado",
      detalle: "Mínimo cinco personas. Experiencia solo para tu grupo.",
    },
  ],
  ctaTexto: "Cotización personalizada",
  ctaHref: enlaceReserva(
    "Hola, quiero una cotización para sesiones privadas de InnerFlow."
  ),
  tono: "calido",
};

export const SERVICIO_EVENTOS: ServicioPagina = {
  id: "eventos-privados",
  eyebrow: "Eventos privados",
  titulo: "Cuando el momento merece algo distinto.",
  intro:
    "Cumpleaños, despedidas, retiros pequeños, celebraciones íntimas. Llevamos la sesión a donde estés.",
  modalidades: [
    { nombre: "Yoga", valor: "1 hora" },
    { nombre: "Yoga + meditación", valor: "1 hora" },
    { nombre: "Yoga + meditación + ceremonia", valor: "1.5 horas" },
    { nombre: "Meditación", valor: "1 hora" },
    { nombre: "Personalizado", valor: "Contáctanos" },
  ],
  ctaTexto: "Cotización personalizada",
  ctaHref: enlaceReserva(
    "Hola, quiero una cotización para un evento privado con InnerFlow."
  ),
  tono: "calido",
};

export const SERVICIO_EMPRESAS: ServicioPagina = {
  id: "empresas-colegios",
  eyebrow: "Empresas y colegios",
  titulo: "Bienestar donde trabaja y estudia tu gente.",
  intro:
    "Programas para oficinas y escuelas. Claros de agendar, fáciles de explicar al equipo.",
  modalidades: [
    { nombre: "Sound healing" },
    { nombre: "Yoga / Pilates + sound healing" },
    { nombre: "Yoga / Pilates" },
    { nombre: "Full experience" },
  ],
  ctaTexto: "Agenda una llamada",
  ctaHref: enlaceReserva(
    "Hola, escribo desde el área de empresas/colegios. Quiero agendar una llamada sobre bienestar con InnerFlow."
  ),
  tono: "profesional",
};

export const SERVICIO_COMUNIDAD: ServicioPagina = {
  id: "comunidad",
  eyebrow: "Comunidad",
  titulo: "Encuentros abiertos, gente real.",
  intro:
    "Talleres y círculos aparte del calendario fijo del Meditation Club. Estamos armando las próximas fechas.",
  modalidades: [],
  ctaTexto: "Avisarme por WhatsApp",
  ctaHref: enlaceReserva(
    "Hola, avísame cuando haya eventos abiertos de la comunidad InnerFlow."
  ),
  tono: "calido",
  proximamente: true,
  eventosEjemplo: [
    {
      titulo: "Taller de respiración",
      cuando: "Fecha por confirmar · Casa Zenia",
      nota: "Una tarde para practicar juntos, sin membresía.",
    },
    {
      titulo: "Círculo de cierre de mes",
      cuando: "Fecha por confirmar · Online",
      nota: "Compartir cómo va la práctica, sin prisa.",
    },
  ],
};

export const PAGINAS_SERVICIO = {
  "sesiones-privadas": SERVICIO_SESIONES,
  "eventos-privados": SERVICIO_EVENTOS,
  "empresas-colegios": SERVICIO_EMPRESAS,
  comunidad: SERVICIO_COMUNIDAD,
} as const;

/** Teaser de universos en Home (no catálogo completo). */
export const ENTRADAS_VITRINA: readonly EntradaVitrina[] = [
  {
    id: "sesiones-privadas",
    titulo: "Para mí",
    linea: "Sesiones privadas de movimiento y meditación.",
    href: RUTAS.sesionesPrivadas,
  },
  {
    id: "celebraciones",
    titulo: "Celebrar",
    linea: "Experiencias para momentos con intención.",
    href: RUTAS.celebraciones,
  },
  {
    id: "empresas-colegios",
    titulo: "Organizaciones",
    linea: "Bienestar para equipos, empresas y colegios.",
    href: RUTAS.empresasColegios,
  },
  {
    id: "comunidad",
    titulo: "Comunidad",
    linea: "Encuentros abiertos y colaboraciones.",
    href: RUTAS.eventosComunidad,
  },
];
