/**
 * Identidad publica y contacto.
 * Fuente: Restructuración página web + sesiones.ts (WhatsApp).
 */

import { ENLACE_INSTAGRAM, WHATSAPP_RESERVA } from "@/lib/data/sesiones";

export const SITE = {
  name: "Inner Flow",
  tagline: "Espacios para volver a ti",
  whatsapp: WHATSAPP_RESERVA,
  /** Digitos internacionales ya en WHATSAPP_RESERVA; display humano del doc. */
  whatsappDisplay: "+52 81 3260 8095",
  email: "innerflowmx@gmail.com",
  emailHref: "mailto:innerflowmx@gmail.com",
  instagram: ENLACE_INSTAGRAM,
  instagramHandle: "@innerflow.mx",
  city: "Monterrey",
  /** Correo recomendado para corporativo, colegios, eventos y colaboraciones. */
  canalCorporativo: "email" as const,
  /** WhatsApp para reservaciones y preguntas rapidas. */
  canalRapido: "whatsapp" as const,
} as const;

export const CONTACTO_COPY = {
  titulo: "Hablemos",
  intro:
    "Si quieres reservar una experiencia, solicitar una propuesta o explorar una colaboración, completa el formulario. No necesitas saber exactamente qué servicio elegir.",
  notaRespuesta:
    "Responderé a tu correo con la información y los siguientes pasos. Mientras tanto, al enviar puedes abrir WhatsApp con el mensaje compuesto.",
  cierre:
    "Moverte, descansar, celebrar o hacer una pausa: podemos crear un espacio adecuado para ti.",
} as const;

/** Intereses del formulario (documento). */
export const CONTACTO_INTERESES = [
  { id: "sesion-privada", label: "Sesión privada" },
  { id: "celebracion-evento", label: "Celebración o evento" },
  { id: "empresa-colegio", label: "Empresa o colegio" },
  { id: "meditation-club", label: "Meditation Club" },
  { id: "evento-abierto", label: "Evento abierto" },
  { id: "colaboracion", label: "Colaboración" },
  { id: "otra", label: "Otra consulta" },
] as const;

export type ContactoInteresId = (typeof CONTACTO_INTERESES)[number]["id"];
