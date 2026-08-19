"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Acceso a la instancia de Lenis (para pausar el scroll en el Respirador). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Scroll suave con inercia larga, en el carácter del compás.
 * Con prefers-reduced-motion el scroll queda nativo, sin inercia.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const instancia = new Lenis({ lerp: 0.08 });
    setLenis(instancia);

    let raf = requestAnimationFrame(function loop(tiempo) {
      instancia.raf(tiempo);
      raf = requestAnimationFrame(loop);
    });

    /* Los anclajes internos navegan con la misma inercia del sitio */
    const alHacerClick = (e: MouseEvent) => {
      const ancla = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!ancla?.hash) return;
      const destino = document.querySelector(ancla.hash);
      if (!destino) return;
      e.preventDefault();
      instancia.scrollTo(destino as HTMLElement, { offset: -72 });
      history.pushState(null, "", ancla.hash);
    };
    document.addEventListener("click", alHacerClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", alHacerClick);
      instancia.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
