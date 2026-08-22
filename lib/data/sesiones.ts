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

/** Hora de cada día según su día de la semana (domingo 10am, entre semana 8pm) */
export function horaDeSesion(dia: number): string {
  const diaSemana = new Date(
    MES_CALENDARIO.anio,
    MES_CALENDARIO.mes,
    dia
  ).getDay();
  return diaSemana === 0 ? "10:00 am" : "8:00 pm";
}

/** Sesión de presentación. Si la fecha ya pasó, el banner se oculta solo. */
export const PRESENTACION = {
  titulo: "Ven a conocer el Meditation Club",
  fechaTexto: "Martes 25 de agosto, 8:00 pm",
  lugar: "Casa Zenia, Mty",
  costo: "Aportación voluntaria",
  /** Monterrey es UTC-6 */
  fecha: new Date("2026-08-25T20:00:00-06:00"),
} as const;

/** Reservas por Instagram mientras no hay sistema de pagos */
export const ENLACE_RESERVA = "https://instagram.com/innerflow.mx";

/** Ubicación pública de las sesiones presenciales */
export const MAPS_CASA_ZENIA =
  "https://www.google.com/maps/place/casa+zenia+monterrey/data=!4m2!3m1!1s0x866297005dcca8d1:0xd1534ad6e7c54ed3";
export const MAPS_CASA_ZENIA_EMBED =
  "https://www.google.com/maps?cid=15077488947854778067&hl=es&z=16&output=embed";
