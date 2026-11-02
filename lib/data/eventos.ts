/**
 * Eventos abiertos de Inner Flow. Fuente única para Home, Eventos y
 * comunidad y Calendario. Solo eventos confirmados: no inventar fechas.
 */

import { fechaLarga, instanteLocal } from "@/lib/data/proxima-sesion";
import { enlaceReserva } from "@/lib/data/sesiones";

export type EstadoEvento =
  | "disponible"
  | "pocos-lugares"
  | "agotado"
  | "proximamente";

export type BloqueAgenda = {
  nombre: string;
  /** HH:MM, hora local de Monterrey */
  inicio: string;
  /** Opcional cuando el flyer solo confirma la hora de inicio. */
  fin?: string;
};

export type ImagenEvento = {
  src: string;
  alt: string;
  ancho: number;
  alto: number;
};

export type Evento = {
  id: string;
  nombre: string;
  intencion?: string;
  descripcion?: string;
  /** YYYY-MM-DD, fecha local de Monterrey */
  fecha?: string;
  /** HH:MM (24 h), hora local de Monterrey */
  horaInicio?: string;
  horaFin?: string;
  ubicacion?: string;
  modalidad?: "presencial" | "online";
  duracion?: string;
  precio?: number;
  precioPendiente?: boolean;
  cupo?: number;
  disponibles?: number;
  incluye?: readonly string[];
  agenda?: readonly BloqueAgenda[];
  tags?: readonly string[];
  detalleHref?: string;
  imagen?: ImagenEvento;
  imagenHorario?: ImagenEvento;
  categoria: "meditacion" | "movimiento" | "eventos" | "online";
  estado?: EstadoEvento;
  ctaTexto?: string;
  ctaHref?: string;
};

export const MINDFUL_HANGOUT: Evento = {
  id: "mindful-hangout-2026-11-28",
  nombre: "The Mindful Hangout",
  intencion: "Segunda edición",
  descripcion:
    "Una mañana para moverte, hacer una pausa y compartir en comunidad.",
  fecha: "2026-11-28",
  horaInicio: "08:00",
  horaFin: "10:30",
  ubicacion: "Gran Parque San Nicolás",
  modalidad: "presencial",
  categoria: "eventos",
  tags: [
    "Pilates",
    "Sound healing",
    "Matcha bar",
    "Goodies",
    "Costume tote",
  ],
  agenda: [
    { nombre: "Registro", inicio: "08:00" },
    { nombre: "Pilates", inicio: "08:30" },
    { nombre: "Sound healing", inicio: "09:10" },
    { nombre: "Matcha bar · Costume tote · Goodies", inicio: "09:30" },
    { nombre: "Convivencia", inicio: "10:00" },
  ],
  imagen: {
    src: "/mindful-hangout-main.webp",
    alt: "Flyer de The Mindful Hangout, segunda edición, con fecha, horario, lugar y experiencias.",
    ancho: 720,
    alto: 900,
  },
  imagenHorario: {
    src: "/mindful-hangout-agenda.webp",
    alt: "Programa de The Mindful Hangout con registro, Pilates, sound healing, matcha bar, goodies, costume tote y convivencia.",
    ancho: 720,
    alto: 900,
  },
  detalleHref: "/eventos-y-comunidad/the-mindful-hangout",
  ctaTexto: "Reservar mi lugar",
};

export const EVENTOS: readonly Evento[] = [MINDFUL_HANGOUT];

/** "14:00" → "2:00 PM" */
export function horaEvento(hora: string): string {
  const [h, min] = hora.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/** "2:00 PM – 4:30 PM" */
export function rangoEvento(inicio: string, fin?: string): string {
  return fin ? `${horaEvento(inicio)} – ${horaEvento(fin)}` : horaEvento(inicio);
}

export function fechaEvento(e: Evento): string | undefined {
  return e.fecha ? fechaLarga(e.fecha) : undefined;
}

export function inicioEvento(e: Evento): Date | undefined {
  return e.fecha ? instanteLocal(e.fecha, e.horaInicio ?? "00:00") : undefined;
}

/** Eventos con inicio >= ahora, en orden cronológico. */
export function proximosEventos(ahora: Date = new Date()): Evento[] {
  return EVENTOS.map((e) => ({ e, t: inicioEvento(e)?.getTime() }))
    .filter((x): x is { e: Evento; t: number } =>
      x.t !== undefined && x.t >= ahora.getTime()
    )
    .sort((a, b) => a.t - b.t)
    .map((x) => x.e);
}

export function mensajeReservaEvento(e: Evento): string {
  const nombre = [e.nombre, e.intencion].filter(Boolean).join(" — ");
  const partes = [`Hola, quiero reservar mi lugar para ${nombre}`];
  if (e.fecha) {
    partes.push(`el ${fechaLarga(e.fecha).replace(",", "").toLowerCase()}`);
  }
  if (e.horaInicio) {
    partes.push(
      e.horaFin
        ? `de ${horaEvento(e.horaInicio)} a ${horaEvento(e.horaFin)}`
        : `a las ${horaEvento(e.horaInicio)}`
    );
  }
  if (e.ubicacion) partes.push(`en ${e.ubicacion}`);
  const mensaje = partes.join(" ");
  return mensaje.endsWith(".") ? mensaje : `${mensaje}.`;
}

/** Reserva por WhatsApp (helper único) salvo que el evento traiga otro enlace. */
export function enlaceReservaEvento(e: Evento): string {
  return e.ctaHref ?? enlaceReserva(mensajeReservaEvento(e));
}

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
