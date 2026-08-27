"use client";

import { useSyncExternalStore } from "react";

const QUERY_MOVIL = "(max-width: 1023px)";

function suscribir(onChange: () => void) {
  const mq = window.matchMedia(QUERY_MOVIL);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function leerMovil() {
  return window.matchMedia(QUERY_MOVIL).matches;
}

/** SSR/desktop-first: false hasta hidratar. */
function leerServidor() {
  return false;
}

/** true bajo 1024px (columna única del hero). Desktop = false. */
export function useEsMovil() {
  return useSyncExternalStore(suscribir, leerMovil, leerServidor);
}
