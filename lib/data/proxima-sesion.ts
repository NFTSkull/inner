/**
 * Próxima sesión del mes a partir de SESIONES.
 * Fechas en horario de Monterrey (UTC-6, sin DST).
 */

import {
  HORARIOS,
  MES_CALENDARIO,
  SESIONES,
  diaSemanaDelCalendario,
  horaDeSesion,
  type Modalidad,
} from "@/lib/data/sesiones";

const DIAS_SEMANA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
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

export type SesionProgramada = {
  dia: number;
  modalidad: Modalidad;
  /** Inicio exacto en Monterrey */
  fecha: Date;
  horaTexto: string;
  /** Ej. "Martes 1 de septiembre, 8:00 pm" */
  fechaTexto: string;
  lugar: string;
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Inicio de la sesión ese día (10:00 am domingo, 8:00 pm entre semana). */
export function fechaDeSesion(dia: number): Date {
  const diaSemana = diaSemanaDelCalendario(dia);
  const hora = diaSemana === 0 ? 10 : 20;
  const mes = MES_CALENDARIO.mes + 1;
  return new Date(
    `${MES_CALENDARIO.anio}-${pad(mes)}-${pad(dia)}T${pad(hora)}:00:00-06:00`
  );
}

export function listarSesionesDelMes(): SesionProgramada[] {
  const items: SesionProgramada[] = [];

  (Object.keys(SESIONES) as Modalidad[]).forEach((modalidad) => {
    SESIONES[modalidad].forEach((dia) => {
      const fecha = fechaDeSesion(dia);
      const horaTexto = horaDeSesion(dia);
      const diaSemana = diaSemanaDelCalendario(dia);
      items.push({
        dia,
        modalidad,
        fecha,
        horaTexto,
        fechaTexto: `${DIAS_SEMANA[diaSemana]} ${dia} de ${MESES[MES_CALENDARIO.mes]}, ${horaTexto}`,
        lugar:
          modalidad === "presencial"
            ? HORARIOS.presencial.lugar
            : HORARIOS.online.lugar,
      });
    });
  });

  return items.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
}

/** Primera sesión cuyo inicio aún no ha llegado. Si todas pasaron, null. */
export function proximaSesion(ahora: Date = new Date()): SesionProgramada | null {
  const t = ahora.getTime();
  return listarSesionesDelMes().find((s) => s.fecha.getTime() > t) ?? null;
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
