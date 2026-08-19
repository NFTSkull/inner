"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Halo de cursor: 24px de azul al 30%, con retraso de seguimiento
 * (lerp 0.12). Sobre un botón crece al doble y baja su opacidad.
 * Solo existe en desktop con puntero fino y sin reduced motion.
 */
export function Cursor() {
  const [activo, setActivo] = useState(false);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fino = window.matchMedia("(pointer: fine)").matches;
    const reducir = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fino || reducir) return;
    setActivo(true);

    const posicion = { x: -100, y: -100 };
    const objetivo = { x: -100, y: -100 };
    let escala = 1;
    let escalaObjetivo = 1;

    const alMover = (e: MouseEvent) => {
      objetivo.x = e.clientX;
      objetivo.y = e.clientY;
      const interactivo = (e.target as HTMLElement).closest?.(
        "a, button, [role=button]"
      );
      escalaObjetivo = interactivo ? 2 : 1;
    };
    window.addEventListener("mousemove", alMover, { passive: true });

    let raf = requestAnimationFrame(function ciclo() {
      posicion.x += (objetivo.x - posicion.x) * 0.12;
      posicion.y += (objetivo.y - posicion.y) * 0.12;
      escala += (escalaObjetivo - escala) * 0.14;
      const halo = haloRef.current;
      if (halo) {
        halo.style.transform = `translate3d(${posicion.x - 12}px, ${
          posicion.y - 12
        }px, 0) scale(${escala})`;
        halo.style.opacity = String(0.3 - (escala - 1) * 0.14);
      }
      raf = requestAnimationFrame(ciclo);
    });

    return () => {
      window.removeEventListener("mousemove", alMover);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!activo) return null;

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-6 w-6 rounded-full bg-azul"
      style={{ opacity: 0 }}
    />
  );
}
