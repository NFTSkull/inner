/**
 * Items del calendario publico.
 * EVENTOS abiertos (vacio a proposito) + sesiones reales del Club.
 */

import {
  CALENDARIO_COPY,
  EVENTOS,
  type Evento,
  type FiltroCalendarioId,
} from "@/lib/data/eventos";
import {
  enlaceReservaSesion,
  estadoSesion,
  mesActivo,
  nombreMes,
  proximasSesiones,
  sesionesDelMes,
  type EstadoSesion,
  type SesionProgramada,
} from "@/lib/data/proxima-sesion";

export type ItemCalendario = {
  id: string;
  /** Instante de inicio (ms). Ordena la agenda. */
  inicio?: number;
  estado: EstadoSesion;
  name: string;
  intention?: string;
  description?: string;
  day?: string;
  month?: string;
  startTime?: string;
  location?: string;
  categoryLabel?: string;
  /** Filtros que hacen match (sin "todos"). */
  filtros: readonly Exclude<FiltroCalendarioId, "todos">[];
  ctaTexto?: string;
  ctaHref?: string;
  ctaExterno?: boolean;
  fuente?: string;
};

function itemDesdeEvento(e: Evento, ahora: Date): ItemCalendario {
  let day: string | undefined;
  let month: string | undefined;
  let inicio: number | undefined;
  if (e.fecha) {
    const d = new Date(e.fecha);
    if (!Number.isNaN(d.getTime())) {
      inicio = d.getTime();
      day = String(d.getUTCDate());
      month = d
        .toLocaleString("es-MX", { month: "short", timeZone: "UTC" })
        .replace(".", "")
        .toUpperCase()
        .slice(0, 3);
    }
  }

  const realizado = inicio !== undefined && inicio < ahora.getTime();

  return {
    id: e.id,
    inicio,
    estado: realizado ? "realizada" : "proxima",
    name: e.nombre,
    intention: e.intencion,
    description: e.descripcion,
    day,
    month,
    startTime: e.horaInicio,
    location: e.ubicacion,
    categoryLabel: e.categoria,
    filtros: [e.categoria],
    ...(realizado
      ? {}
      : { ctaTexto: e.ctaTexto, ctaHref: e.ctaHref, ctaExterno: true }),
  };
}

function itemDesdeClub(s: SesionProgramada, ahora: Date): ItemCalendario {
  const online = s.modalidad === "online";
  const estado = estadoSesion(s, ahora);
  const mes = nombreMes(s.mes);

  return {
    id: s.id,
    inicio: s.inicio.getTime(),
    estado,
    name: "Meditation Club",
    day: String(s.dia),
    month: mes.slice(0, 3).toUpperCase(),
    startTime: s.horaTexto,
    location: s.lugar,
    categoryLabel: online ? "Meditación · Online" : "Meditación · Presencial",
    filtros: online ? ["meditacion", "online"] : ["meditacion"],
    ...(estado === "proxima"
      ? {
          ctaTexto: "Reservar este día",
          ctaHref: enlaceReservaSesion(s),
          ctaExterno: true,
          fuente: `Meditation Club · ${mes}`,
        }
      : { fuente: `Sesiones realizadas · ${mes}` }),
  };
}

const porInicio = (a: ItemCalendario, b: ItemCalendario) =>
  (a.inicio ?? Number.POSITIVE_INFINITY) -
  (b.inicio ?? Number.POSITIVE_INFINITY);

/**
 * Agenda: primero lo próximo (eventos abiertos + todas las sesiones
 * futuras del Club), luego lo ya realizado del mes activo, discreto.
 */
export function itemsCalendario(ahora: Date = new Date()): ItemCalendario[] {
  const abiertos = EVENTOS.map((e) => itemDesdeEvento(e, ahora));
  const mes = mesActivo(ahora);
  const club = [
    ...proximasSesiones(ahora),
    ...(mes ? sesionesDelMes(mes) : []).filter(
      (s) => estadoSesion(s, ahora) === "realizada"
    ),
  ].map((s) => itemDesdeClub(s, ahora));

  const todos = [...abiertos, ...club];
  return [
    ...todos.filter((i) => i.estado === "proxima").sort(porInicio),
    ...todos.filter((i) => i.estado === "realizada").sort(porInicio),
  ];
}

export function filtrarItems(
  items: readonly ItemCalendario[],
  filtro: FiltroCalendarioId
): ItemCalendario[] {
  if (filtro === "todos") return [...items];
  return items.filter((item) =>
    item.filtros.includes(filtro as Exclude<FiltroCalendarioId, "todos">)
  );
}

export { CALENDARIO_COPY };
