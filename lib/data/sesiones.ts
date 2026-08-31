/**
 * Calendario del Meditation Club. Editable: cambia aquí los días
 * y el sitio se actualiza solo.
 */

export type Modalidad = "presencial" | "online";

export const MES_CALENDARIO = {
  nombre: "Septiembre",
  anio: 2026,
  /** Mes en formato JS: septiembre = 8 */
  mes: 8,
  dias: 30,
  /** Día de la semana del 1ro (0 = domingo). Sept 1 2026 es martes. */
  primerDia: 2,
} as const;

export const SESIONES: Record<Modalidad, readonly number[]> = {
  presencial: [1, 6, 15, 22, 27, 29],
  online: [3, 10, 17, 24],
};

export const HORARIOS = {
  presencial: {
    lugar: "Casa Zenia, Monterrey",
    lineas: ["Domingos 10:00 am", "Martes 8:00 pm"],
  },
  online: {
    lugar: "Por videollamada",
    lineas: ["Jueves 8:00 pm"],
  },
} as const;

/** Día de la semana estable (mediodía UTC) para no depender del TZ del servidor. */
export function diaSemanaDelCalendario(dia: number): number {
  return new Date(
    Date.UTC(MES_CALENDARIO.anio, MES_CALENDARIO.mes, dia, 12)
  ).getUTCDay();
}

/** Hora de cada día según su día de la semana (domingo 10am, entre semana 8pm) */
export function horaDeSesion(dia: number): string {
  return diaSemanaDelCalendario(dia) === 0 ? "10:00 am" : "8:00 pm";
}

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

/** Reserva de un día concreto del calendario. */
export function enlaceReservaDia(dia: number, modalidad: Modalidad): string {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ] as const;
  const diaSemana = dias[diaSemanaDelCalendario(dia)];
  const hora = horaDeSesion(dia);
  const tipo = modalidad === "presencial" ? "presencial" : "online";
  const mensaje = `Hola, quiero reservar la sesión del ${diaSemana} ${dia} de ${MES_CALENDARIO.nombre.toLowerCase()} a las ${hora} (${tipo}).`;
  return enlaceReserva(mensaje);
}

/** Ubicación pública de las sesiones presenciales */
export const MAPS_CASA_ZENIA =
  "https://www.google.com/maps/place/casa+zenia+monterrey/data=!4m2!3m1!1s0x866297005dcca8d1:0xd1534ad6e7c54ed3";
/** Vista del barrio (OSM). El clic abre el pin de Google Maps. */
export const MAPS_CASA_ZENIA_VISTA =
  "https://www.openstreetmap.org/export/embed.html?bbox=-100.3575%2C25.6855%2C-100.3512%2C25.6909&layer=mapnik&marker=25.6882237%2C-100.3543465";
