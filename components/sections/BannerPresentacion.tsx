"use client";

import { useEffect, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { ENLACE_RESERVA, PRESENTACION } from "@/lib/data/sesiones";

/**
 * Franja de la sesión de presentación con cuenta regresiva en vivo.
 * Es data-driven: si la fecha ya pasó, se oculta sola.
 */
export function BannerPresentacion() {
  const [restante, setRestante] = useState<string | null>(null);
  const [pasada, setPasada] = useState(false);

  useEffect(() => {
    const calcular = () => {
      const ms = PRESENTACION.fecha.getTime() - Date.now();
      if (ms <= 0) {
        setPasada(true);
        return;
      }
      const dias = Math.floor(ms / 86400000);
      const horas = Math.floor((ms % 86400000) / 3600000);
      const minutos = Math.floor((ms % 3600000) / 60000);
      setRestante(
        dias > 0
          ? `faltan ${dias} ${dias === 1 ? "día" : "días"} ${horas} ${horas === 1 ? "hora" : "horas"}`
          : `faltan ${horas} ${horas === 1 ? "hora" : "horas"} ${minutos} min`
      );
    };
    calcular();
    const intervalo = setInterval(calcular, 30000);
    return () => clearInterval(intervalo);
  }, []);

  if (pasada) return null;

  return (
    <aside
      aria-label="Sesión de presentación"
      className="bg-salvia-hondo px-5 py-10 text-papel sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="display-trazo text-titulo">
            Ven a conocer el Meditation Club
          </h2>
          <p className="mt-3 text-[1.17rem] font-bold leading-relaxed">
            {PRESENTACION.fechaTexto} · {PRESENTACION.lugar}
            <span className="block font-bold opacity-95">
              {PRESENTACION.costo}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Boton
            href={ENLACE_RESERVA}
            externo
            className="!border-papel !text-papel !text-[1.17rem] !font-bold hover:!text-salvia-hondo focus-visible:!text-salvia-hondo [&::before]:!bg-papel"
          >
            Apartar mi lugar
          </Boton>
          <p
            className="numero-tabular !font-bold text-[1.17rem] uppercase tracking-[0.1em]"
            aria-live="off"
          >
            {restante ?? "\u00a0"}
          </p>
        </div>
      </div>
    </aside>
  );
}
