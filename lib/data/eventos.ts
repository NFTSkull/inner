/**
 * Calendario de eventos abiertos.
 * Vacio a proposito: no inventar fechas ni eventos.
 */

export type EstadoEvento =
  | "disponible"
  | "pocos-lugares"
  | "agotado"
  | "proximamente";

export type Evento = {
  id: string;
  nombre: string;
  intencion?: string;
  descripcion?: string;
  fecha?: string;
  horaInicio?: string;
  horaFin?: string;
  ubicacion?: string;
  duracion?: string;
  precio?: number;
  precioPendiente?: boolean;
  cupo?: number;
  disponibles?: number;
  incluye?: readonly string[];
  categoria: "meditacion" | "movimiento" | "eventos" | "online";
  estado?: EstadoEvento;
  ctaTexto?: string;
  ctaHref?: string;
};

/** Sin eventos reales hasta que exista dataset o documento. */
export const EVENTOS: readonly Evento[] = [];

/** Filtros del calendario (brief master). */
export const FILTROS_CALENDARIO = [
  { id: "todos", label: "Todos" },
  { id: "meditacion", label: "Meditación" },
  { id: "movimiento", label: "Movimiento" },
  { id: "eventos", label: "Eventos y colaboraciones" },
  { id: "online", label: "Online" },
] as const;

export type FiltroCalendarioId = (typeof FILTROS_CALENDARIO)[number]["id"];

export const CALENDARIO_COPY = {
  titulo: "Calendario",
  soporte:
    "Encuentra las próximas clases, meditaciones y experiencias de Inner Flow.",
  vacioTitulo: "Pronto habrá nuevas fechas",
  vacioTexto:
    "Cuando publiquemos clases, meditaciones o experiencias, aparecerán aquí.",
} as const;
