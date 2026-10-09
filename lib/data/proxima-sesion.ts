/**
 * Capa derivada del calendario del Club: instantes reales en
 * America/Monterrey, estado (próxima / realizada), mes activo y
 * mensaje de reserva. Todo sale de SESIONES_CLUB; nada se infiere
 * de reglas de horario.
 */

import {
  SEDES,
  SESIONES_CLUB,
  enlaceReserva,
  type Modalidad,
  type SedeId,
} from "@/lib/data/sesiones";

export const ZONA_HORARIA = "America/Monterrey";

const DIAS_SEMANA = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
] as const;

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

export type EstadoSesion = "proxima" | "realizada";

export type SesionProgramada = {
  id: string;
  sede: SedeId;
  modalidad: Modalidad;
  /** Inicio exacto (instante absoluto). */
  inicio: Date;
  anio: number;
  /** 1–12 */
  mes: number;
  dia: number;
  /** 0 = domingo */
  diaSemana: number;
  /** Ej. "10:00 a. m." */
  horaTexto: string;
  /** Ej. "Domingo 11 de octubre, 10:00 a. m." */
  fechaTexto: string;
  /** Ej. "Casa Zenia · Vista Hermosa" */
  lugar: string;
};

export type MesCalendario = {
  /** "YYYY-MM" */
  clave: string;
  anio: number;
  /** 1–12 */
  mes: number;
  /** Ej. "Octubre" */
  nombre: string;
  dias: number;
  /** Día de la semana del día 1 (0 = domingo). */
  primerDia: number;
};

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** 1–12 → "Octubre" */
export function nombreMes(mes: number): string {
  return capitalizar(MESES[mes - 1]);
}

let formatoDesfase: Intl.DateTimeFormat | null = null;

/** Desfase de Monterrey respecto a UTC (ms) en un instante dado. */
function desfaseMs(utcMs: number): number {
  formatoDesfase ??= new Intl.DateTimeFormat("en-US", {
    timeZone: ZONA_HORARIA,
    timeZoneName: "longOffset",
  });
  const nombre =
    formatoDesfase
      .formatToParts(new Date(utcMs))
      .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(nombre);
  if (!m) return 0;
  const signo = m[1] === "-" ? -1 : 1;
  return signo * (Number(m[2]) * 60 + Number(m[3] ?? 0)) * 60000;
}

/** Fecha y hora locales de Monterrey → instante absoluto. */
export function instanteLocal(fecha: string, hora: string): Date {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const [h, min] = hora.split(":").map(Number);
  const comoUtc = Date.UTC(anio, mes - 1, dia, h, min);
  return new Date(comoUtc - desfaseMs(comoUtc));
}

/** "20:00" → "8:00 p. m." */
export function formatearHora(hora: string): string {
  const [h, min] = hora.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${h < 12 ? "a. m." : "p. m."}`;
}

function diaSemanaDe(anio: number, mes: number, dia: number): number {
  return new Date(Date.UTC(anio, mes - 1, dia, 12)).getUTCDay();
}

/** Todas las sesiones del Club, en orden cronológico. */
export function sesionesClub(): SesionProgramada[] {
  return SESIONES_CLUB.map(({ fecha, hora, sede }) => {
    const [anio, mes, dia] = fecha.split("-").map(Number);
    const diaSemana = diaSemanaDe(anio, mes, dia);
    const horaTexto = formatearHora(hora);
    const s = SEDES[sede];
    return {
      id: `club-${fecha}-${sede}`,
      sede,
      modalidad: s.modalidad,
      inicio: instanteLocal(fecha, hora),
      anio,
      mes,
      dia,
      diaSemana,
      horaTexto,
      fechaTexto: `${capitalizar(DIAS_SEMANA[diaSemana])} ${dia} de ${MESES[mes - 1]}, ${horaTexto}`,
      lugar: `${s.nombre} · ${s.zona}`,
    };
  }).sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
}

/** Una sesión es próxima mientras su inicio no haya pasado. */
export function estadoSesion(
  sesion: SesionProgramada,
  ahora: Date
): EstadoSesion {
  return sesion.inicio.getTime() >= ahora.getTime() ? "proxima" : "realizada";
}

/** Sesiones con inicio >= ahora, ascendentes. */
export function proximasSesiones(
  ahora: Date = new Date(),
  limite?: number
): SesionProgramada[] {
  const proximas = sesionesClub().filter(
    (s) => estadoSesion(s, ahora) === "proxima"
  );
  return limite === undefined ? proximas : proximas.slice(0, limite);
}

/** Primera sesión cuyo inicio aún no ha llegado. Si todas pasaron, null. */
export function proximaSesion(ahora: Date = new Date()): SesionProgramada | null {
  return proximasSesiones(ahora, 1)[0] ?? null;
}

function mesDe(anio: number, mes: number): MesCalendario {
  return {
    clave: `${anio}-${String(mes).padStart(2, "0")}`,
    anio,
    mes,
    nombre: nombreMes(mes),
    dias: new Date(Date.UTC(anio, mes, 0)).getUTCDate(),
    primerDia: diaSemanaDe(anio, mes, 1),
  };
}

/** Meses que tienen al menos una sesión, en orden. */
export function mesesConSesiones(): MesCalendario[] {
  const vistos = new Map<string, MesCalendario>();
  for (const s of sesionesClub()) {
    const m = mesDe(s.anio, s.mes);
    if (!vistos.has(m.clave)) vistos.set(m.clave, m);
  }
  return [...vistos.values()];
}

/**
 * Mes que se muestra: el de la próxima sesión; si ya no hay
 * próximas, el último mes publicado.
 */
export function mesActivo(ahora: Date = new Date()): MesCalendario | null {
  const siguiente = proximaSesion(ahora);
  if (siguiente) return mesDe(siguiente.anio, siguiente.mes);
  const meses = mesesConSesiones();
  return meses[meses.length - 1] ?? null;
}

export function sesionesDelMes(mes: MesCalendario): SesionProgramada[] {
  return sesionesClub().filter(
    (s) => s.anio === mes.anio && s.mes === mes.mes
  );
}

/** Mensaje de WhatsApp con tipo, fecha, hora y lugar. */
export function mensajeReserva(sesion: SesionProgramada): string {
  const donde =
    sesion.modalidad === "online"
      ? "online"
      : `en ${SEDES[sesion.sede].nombre}`;
  return `Hola, quiero reservar mi lugar para Meditation Club ${donde} el ${DIAS_SEMANA[sesion.diaSemana]} ${sesion.dia} de ${MESES[sesion.mes - 1]} a las ${sesion.horaTexto}`;
}

export function enlaceReservaSesion(sesion: SesionProgramada): string {
  return enlaceReserva(mensajeReserva(sesion));
}

/** Texto de cuenta regresiva legible en español. */
export function formatearRestante(ms: number): string {
  if (ms <= 0) return "empezando…";
  const dias = Math.floor(ms / 86400000);
  const horas = Math.floor((ms % 86400000) / 3600000);
  const minutos = Math.floor((ms % 3600000) / 60000);
  const segundos = Math.floor((ms % 60000) / 1000);

  if (dias > 0) {
    return `faltan ${dias} ${dias === 1 ? "día" : "días"} ${horas} ${horas === 1 ? "hora" : "horas"}`;
  }
  if (horas > 0) {
    return `faltan ${horas} ${horas === 1 ? "hora" : "horas"} ${minutos} min`;
  }
  if (minutos > 0) {
    return `faltan ${minutos} min ${segundos} s`;
  }
  return `faltan ${segundos} s`;
}
