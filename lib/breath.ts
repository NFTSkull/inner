/**
 * El compás de InnerFlow. Una sola fuente de verdad.
 *
 * Todo movimiento del sitio deriva de aquí: inhalar 4s, sostener 4s,
 * exhalar 6s. Catorce segundos por ciclo. Si una duración no viene de
 * este archivo, es un bug de diseño.
 *
 * Unidades: segundos (Motion y CSS trabajan en segundos).
 */

export const RESPIRO = {
  inhalar: 4,
  sostener: 4,
  exhalar: 6,
} as const;

/** Un ciclo completo de respiración: 14 segundos. */
export const CICLO =
  RESPIRO.inhalar + RESPIRO.sostener + RESPIRO.exhalar;

/** Duraciones de UI derivadas del compás. Nunca 300ms genérico. */
export const DURACION = {
  /** Inhalar corto: reveals, entradas, subrayados. */
  corta: 0.4,
  /** Exhalar: hovers, despliegues, acordeones, botones. */
  larga: 0.6,
  /** Transiciones de escena, como el velo del Respirador. */
  velo: 1.2,
} as const;

/** La curva de todo el sitio, formato Motion. */
export const EASE_RESPIRO = [0.4, 0, 0.2, 1] as const;

/** La misma curva, formato CSS. */
export const EASE_CSS = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * Puntos del ciclo como porcentaje, para keyframes CSS.
 * Fin de inhalación: 4/14. Fin de sostén: 8/14.
 */
export const FASE_PCT = {
  finInhalar: (RESPIRO.inhalar / CICLO) * 100,
  finSostener: ((RESPIRO.inhalar + RESPIRO.sostener) / CICLO) * 100,
} as const;

/**
 * Rotación determinista para palabras display, entre -1.5 y 1.5 grados.
 * Sembrada por el texto y su posición: el servidor y el cliente
 * calculan lo mismo y no hay brinco de hidratación.
 */
export function rotacionDeTrazo(palabra: string, indice: number): number {
  let hash = indice * 31;
  for (let i = 0; i < palabra.length; i++) {
    hash = (hash * 31 + palabra.charCodeAt(i)) | 0;
  }
  const normalizado = Math.abs(Math.sin(hash)) * 2 - 1;
  return Math.round(normalizado * 1.5 * 100) / 100;
}
