"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Acceso a la instancia de Lenis (para pausar el scroll en el Respirador). */
export function useLenis() {
  return useContext(LenisContext);
}

const OFFSET_NAV = -72;

function destinoDeAncla(ancla: HTMLAnchorElement): Element | null {
  const url = new URL(ancla.href, window.location.href);
  if (url.pathname !== window.location.pathname) return null;
  if (!url.hash) return null;
  return document.querySelector(url.hash);
}

/**
 * Scroll suave con inercia corta. Con prefers-reduced-motion
 * queda el scroll nativo, sin inercia.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    /* Lenis en touch pelea con el scroll nativo: reveals y el
       manifiesto por scroll se sienten rotos o “a tirones”.
       Desktop (≥1024px) sigue igual. */
    const movil = window.matchMedia("(max-width: 1023px)").matches;
    if (reduceMotion || movil) return;

    const instancia = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1.12,
    });
    setLenis(instancia);

    let raf = requestAnimationFrame(function loop(tiempo) {
      instancia.raf(tiempo);
      raf = requestAnimationFrame(loop);
    });

    const irA = (nodo: HTMLElement, inmediata = false) => {
      instancia.scrollTo(nodo, {
        offset: OFFSET_NAV,
        immediate: inmediata,
        duration: 0.85,
      });
    };

    if (window.location.hash) {
      const inicial = document.querySelector(window.location.hash);
      if (inicial) irA(inicial as HTMLElement, true);
    }

    const alHacerClick = (e: MouseEvent) => {
      const ancla = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href]"
      );
      if (!ancla) return;
      const destino = destinoDeAncla(ancla);
      if (!destino) return;
      e.preventDefault();
      irA(destino as HTMLElement);
      history.pushState(null, "", ancla.hash || new URL(ancla.href).hash);
    };
    document.addEventListener("click", alHacerClick, true);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", alHacerClick, true);
      instancia.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
