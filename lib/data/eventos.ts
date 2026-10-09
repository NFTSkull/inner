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
  fin: string;
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
  /** Imagen principal (se recorta la parte superior, sin el texto del flyer). */
  imagen?: ImagenEvento;
  /** Flyer con el desglose de horarios (apoyo). */
  imagenHorario?: ImagenEvento;
  categoria: "meditacion" | "movimiento" | "eventos" | "online";
  estado?: EstadoEvento;
  ctaTexto?: string;
  ctaHref?: string;
};

export const EVENTOS: readonly Evento[] = [
  {
    id: "yoga-matcha-2026-10-31",
    nombre: "Yoga & Matcha",
    descripcion: "Una tarde para pausar, moverte y cerrar con matcha & tisanas.",
    fecha: "2026-10-31",
    horaInicio: "14:00",
    horaFin: "16:30",
    ubicacion: "Cuarto Vital, Mty.",
    modalidad: "presencial",
    categoria: "eventos",
    agenda: [
      { nombre: "Registro", inicio: "14:00", fin: "14:30" },
      { nombre: "Yoga", inicio: "14:30", fin: "15:30" },
      { nombre: "Matcha & tisanas", inicio: "15:30", fin: "16:30" },
    ],
    imagen: {
      src: "/e5e2a923-8ba7-4046-bf26-08fc2e984bc7.JPG",
      alt: "Mano con guante verde sosteniendo dos matchas helados en un portavasos.",
      ancho: 1080,
      alto: 1350,
    },
    imagenHorario: {
      src: "/2bf9330b-8659-428b-8881-a153ff217bb7.JPG",
      alt: "Flyer de Yoga & Matcha con el horario: registro, yoga y matcha & tisanas.",
      ancho: 1080,
      alto: 1350,
    },
    ctaTexto: "Reservar mi lugar",
  },
];

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
  const partes = [`Hola, quiero reservar mi lugar para ${e.nombre}`];
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
