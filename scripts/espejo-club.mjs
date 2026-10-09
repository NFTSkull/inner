/**
 * Espejo (JS) de lib/data/proxima-sesion.ts para las pruebas.
 * SESIONES_CLUB se lee del código fuente real de lib/data/sesiones.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
export const leer = (ruta) => readFileSync(join(RAIZ, ruta), "utf8");

export const FUENTE_SESIONES = leer("lib/data/sesiones.ts");
export const FUENTE_PROXIMA = leer("lib/data/proxima-sesion.ts");

function sesionesDeFuente() {
  const desde = FUENTE_SESIONES.indexOf("export const SESIONES_CLUB");
  if (desde < 0) throw new Error("falta SESIONES_CLUB");
  const lista = FUENTE_SESIONES.slice(desde, FUENTE_SESIONES.indexOf("];", desde));
  return Array.from(
    lista.matchAll(
      /\{ fecha: "(\d{4}-\d{2}-\d{2})", hora: "(\d{2}:\d{2})", sede: "([a-z-]+)" \}/g
    ),
    ([, fecha, hora, sede]) => ({ fecha, hora, sede })
  );
}

export const SESIONES_CLUB = sesionesDeFuente();

export const SEDES = {
  "casa-zenia": { nombre: "Casa Zenia", zona: "Vista Hermosa", modalidad: "presencial" },
  "oh-my-core": { nombre: "Oh my core!", zona: "San Nicolás", modalidad: "presencial" },
  online: { nombre: "En línea", zona: "Virtual", modalidad: "online" },
};

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const formato = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Monterrey",
  timeZoneName: "longOffset",
});

function desfaseMs(utcMs) {
  const nombre =
    formato.formatToParts(new Date(utcMs)).find((p) => p.type === "timeZoneName")
      ?.value ?? "GMT";
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(nombre);
  if (!m) return 0;
  const signo = m[1] === "-" ? -1 : 1;
  return signo * (Number(m[2]) * 60 + Number(m[3] ?? 0)) * 60000;
}

export function instanteLocal(fecha, hora) {
  const [a, mes, d] = fecha.split("-").map(Number);
  const [h, min] = hora.split(":").map(Number);
  const comoUtc = Date.UTC(a, mes - 1, d, h, min);
  return new Date(comoUtc - desfaseMs(comoUtc));
}

export function formatearHora(hora) {
  const [h, min] = hora.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${h < 12 ? "a. m." : "p. m."}`;
}

export function sesionesClub() {
  return SESIONES_CLUB.map(({ fecha, hora, sede }) => {
    const [anio, mes, dia] = fecha.split("-").map(Number);
    return {
      id: `club-${fecha}-${sede}`,
      fecha,
      sede,
      modalidad: SEDES[sede].modalidad,
      inicio: instanteLocal(fecha, hora),
      anio,
      mes,
      dia,
      diaSemana: new Date(Date.UTC(anio, mes - 1, dia, 12)).getUTCDay(),
      horaTexto: formatearHora(hora),
    };
  }).sort((a, b) => a.inicio - b.inicio);
}

export const estadoSesion = (s, ahora) =>
  s.inicio.getTime() >= ahora.getTime() ? "proxima" : "realizada";

export const proximasSesiones = (ahora) =>
  sesionesClub().filter((s) => estadoSesion(s, ahora) === "proxima");

export function mesActivo(ahora) {
  const sig = proximasSesiones(ahora)[0];
  if (sig) return { anio: sig.anio, mes: sig.mes };
  const ultima = sesionesClub().at(-1);
  return ultima ? { anio: ultima.anio, mes: ultima.mes } : null;
}

export function mensajeReserva(s) {
  const donde = s.modalidad === "online" ? "online" : `en ${SEDES[s.sede].nombre}`;
  return `Hola, quiero reservar mi lugar para Meditation Club ${donde} el ${DIAS[s.diaSemana]} ${s.dia} de ${MESES[s.mes - 1]} a las ${s.horaTexto}`;
}

/** Instante con hora local de Monterrey (UTC-6, sin horario de verano). */
export const mty = (iso) => new Date(`${iso}-06:00`);
