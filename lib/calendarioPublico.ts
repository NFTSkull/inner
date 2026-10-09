/**
 * Items del calendario publico.
 * EVENTOS abiertos confirmados + sesiones reales del Club.
 */

import {
  CALENDARIO_COPY,
  EVENTOS,
  FILTROS_CALENDARIO,
  enlaceReservaEvento,
  inicioEvento,
  rangoEvento,
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
  const inicio = inicioEvento(e)?.getTime();
  const [, mesNum, diaNum] = (e.fecha ?? "").split("-").map(Number);
  const mes = mesNum ? nombreMes(mesNum) : undefined;
  const realizado = inicio !== undefined && inicio < ahora.getTime();
  const online = e.modalidad === "online";
  const categoria = FILTROS_CALENDARIO.find((f) => f.id === e.categoria)?.label;

  return {
    id: e.id,
    inicio,
    estado: realizado ? "realizada" : "proxima",
    name: e.nombre,
    intention: e.intencion,
    description: e.descripcion,
    day: diaNum ? String(diaNum) : undefined,
    month: mes?.slice(0, 3).toUpperCase(),
    startTime: e.horaInicio ? rangoEvento(e.horaInicio, e.horaFin) : undefined,
    location: e.ubicacion,
    categoryLabel: [categoria, e.modalidad && (online ? "Online" : "Presencial")]
      .filter(Boolean)
      .join(" · "),
    filtros: online && e.categoria !== "online" ? [e.categoria, "online"] : [e.categoria],
    ...(realizado
      ? { fuente: mes && `Realizadas · ${mes}` }
      : {
          ctaTexto: e.ctaTexto ?? "Reservar mi lugar",
          ctaHref: enlaceReservaEvento(e),
          ctaExterno: true,
          fuente: mes,
        }),
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
          fuente: mes,
        }
      : { fuente: `Realizadas · ${mes}` }),
  };
}

const porInicio = (a: ItemCalendario, b: ItemCalendario) =>
  (a.inicio ?? Number.POSITIVE_INFINITY) -
  (b.inicio ?? Number.POSITIVE_INFINITY);

/**
 * Agenda agrupada por mes: primero lo próximo (eventos abiertos +
 * sesiones futuras del Club), luego lo ya realizado del mes activo.
 */
export function itemsCalendario(ahora: Date = new Date()): ItemCalendario[] {
  const mes = mesActivo(ahora);
  const claveMes = mes?.clave;
  const abiertos = EVENTOS.filter(
    (e) =>
      (inicioEvento(e)?.getTime() ?? Infinity) >= ahora.getTime() ||
      e.fecha?.slice(0, 7) === claveMes
  ).map((e) => itemDesdeEvento(e, ahora));
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
