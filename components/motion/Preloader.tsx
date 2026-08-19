"use client";

import { useEffect, useState } from "react";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";

/**
 * Preloader de máximo 1.4s: el trazo del isotipo se dibuja sobre
 * el fondo arena. Si ya se vio en esta sesión, se salta.
 */

type Estado = "pendiente" | "dibujando" | "saliendo" | "fuera";

const LLAVE = "innerflow-preloader";

export function Preloader() {
  const [estado, setEstado] = useState<Estado>("pendiente");

  useEffect(() => {
    if (sessionStorage.getItem(LLAVE)) {
      setEstado("fuera");
      return;
    }
    sessionStorage.setItem(LLAVE, "1");

    const reducir = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducir) {
      const t = setTimeout(() => setEstado("fuera"), 300);
      return () => clearTimeout(t);
    }

    /* dibujar 1s, salir 0.4s: nunca más de 1.4s en total */
    const iniciar = requestAnimationFrame(() => setEstado("dibujando"));
    const salir = setTimeout(() => setEstado("saliendo"), 1000);
    const quitar = setTimeout(() => setEstado("fuera"), 1400);
    return () => {
      cancelAnimationFrame(iniciar);
      clearTimeout(salir);
      clearTimeout(quitar);
    };
  }, []);

  if (estado === "fuera") return null;

  return (
    <div
      aria-hidden="true"
      className={`preloader-trazo fixed inset-0 z-[90] flex items-center justify-center bg-arena transition-opacity duration-[400ms] ease-[var(--ease-respiro)] ${
        estado === "saliendo" ? "opacity-0" : "opacity-100"
      }`}
    >
      <IsotipoTrazo
        dibujado={estado === "pendiente" ? 0 : 1}
        className="h-28 w-28 text-tinta"
      />
    </div>
  );
}
