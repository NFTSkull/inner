/**
 * Calendario del Meditation Club. Editable: agrega aquí cada sesión
 * con su fecha real (ISO) y el sitio deriva mes, año y día de la semana.
 * La lista explícita es la fuente de verdad: no se generan fechas
 * a partir de reglas de horario.
 */

export type Modalidad = "presencial" | "online";

export type SedeId = "casa-zenia" | "oh-my-core" | "online";

export type Sede = {
  nombre: string;
  zona: string;
  modalidad: Modalidad;
};

export const SEDES: Record<SedeId, Sede> = {
  "casa-zenia": {
    nombre: "Casa Zenia",
    zona: "Vista Hermosa",
    modalidad: "presencial",
  },
  "oh-my-core": {
    nombre: "Oh my core!",
    zona: "San Nicolás",
    modalidad: "presencial",
  },
  online: { nombre: "En línea", zona: "Virtual", modalidad: "online" },
};

/** Orden de la leyenda. */
export const ORDEN_SEDES: readonly SedeId[] = [
  "casa-zenia",
  "oh-my-core",
  "online",
];

/** Color por sede (tokens): Casa Zenia azul, Oh my core! tierra, online salvia. */
export const COLOR_SEDE: Record<SedeId, { texto: string; fondo: string }> = {
  "casa-zenia": { texto: "text-azul-hondo", fondo: "bg-azul-hondo" },
  "oh-my-core": { texto: "text-tierra", fondo: "bg-tierra" },
  online: { texto: "text-salvia-hondo", fondo: "bg-salvia-hondo" },
};

/** Solo explicación visual del patrón; no se usa para crear fechas. */
export const HORARIOS_CLUB = [
  "Viernes y domingo · 10:00 a. m.",
  "Martes y jueves · 8:00 p. m.",
] as const;

export type SesionClub = {
  /** Fecha local de Monterrey, YYYY-MM-DD. */
  fecha: string;
  /** Hora local de Monterrey, HH:MM (24 h). */
  hora: string;
  sede: SedeId;
};

export const SESIONES_CLUB: readonly SesionClub[] = [
  { fecha: "2026-10-01", hora: "20:00", sede: "online" },
  { fecha: "2026-10-02", hora: "10:00", sede: "oh-my-core" },
  { fecha: "2026-10-04", hora: "10:00", sede: "casa-zenia" },
  { fecha: "2026-10-06", hora: "20:00", sede: "casa-zenia" },
  { fecha: "2026-10-08", hora: "20:00", sede: "online" },
  { fecha: "2026-10-09", hora: "10:00", sede: "oh-my-core" },
  { fecha: "2026-10-11", hora: "10:00", sede: "casa-zenia" },
  { fecha: "2026-10-20", hora: "20:00", sede: "casa-zenia" },
  { fecha: "2026-10-22", hora: "20:00", sede: "online" },
  { fecha: "2026-10-23", hora: "10:00", sede: "oh-my-core" },
  { fecha: "2026-10-25", hora: "10:00", sede: "casa-zenia" },
  { fecha: "2026-10-27", hora: "20:00", sede: "casa-zenia" },
  { fecha: "2026-10-29", hora: "20:00", sede: "online" },
];

/** WhatsApp de reservas (México, sin +) */
export const WHATSAPP_RESERVA = "528132608095";

const MENSAJE_RESERVA_BASE =
  "Hola, quiero reservar una sesión del Meditation Club Inner Flow.";

/** Instagram (red social, no canal de reserva) */
export const ENLACE_INSTAGRAM = "https://instagram.com/innerflow.mx";

/** Abre WhatsApp con un mensaje listo para enviar. */
export function enlaceReserva(mensaje: string = MENSAJE_RESERVA_BASE): string {
  return `https://wa.me/${WHATSAPP_RESERVA}?text=${encodeURIComponent(mensaje)}`;
}

/** Reserva genérica (nav, footer, banner). */
export const ENLACE_RESERVA = enlaceReserva();

/** Ubicación pública de las sesiones presenciales */
export const MAPS_CASA_ZENIA =
  "https://www.google.com/maps/place/casa+zenia+monterrey/data=!4m2!3m1!1s0x866297005dcca8d1:0xd1534ad6e7c54ed3";
/** Vista del barrio (OSM). El clic abre el pin de Google Maps. */
export const MAPS_CASA_ZENIA_VISTA =
  "https://www.openstreetmap.org/export/embed.html?bbox=-100.3575%2C25.6855%2C-100.3512%2C25.6909&layer=mapnik&marker=25.6882237%2C-100.3543465";
