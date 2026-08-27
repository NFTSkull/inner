"use client";

import { useEffect, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { ENLACE_RESERVA } from "@/lib/data/sesiones";
import {
  formatearRestante,
  proximaSesion,
  type SesionProgramada,
} from "@/lib/data/proxima-sesion";

/**
 * Franja con la próxima meditación del mes y cuenta regresiva.
 * Cuando la hora pasa, salta sola a la siguiente sesión del calendario.
 */
export function BannerPresentacion() {
  const [sesion, setSesion] = useState<SesionProgramada | null | undefined>(
    undefined
  );
  const [restante, setRestante] = useState("");

  useEffect(() => {
    const tick = () => {
      const siguiente = proximaSesion(new Date());
      setSesion(siguiente);
      if (!siguiente) {
        setRestante("");
        return;
      }
      setRestante(formatearRestante(siguiente.fecha.getTime() - Date.now()));
    };

    tick();
    const intervalo = setInterval(tick, 1000);
    return () => clearInterval(intervalo);
  }, []);

  /* Evita flash vacío en SSR: no montar hasta el primer tick en cliente. */
  if (sesion === undefined) {
    return (
      <aside
        aria-hidden="true"
        className="bg-salvia-hondo px-5 py-10 text-papel sm:px-8"
      >
        <div className="mx-auto h-[7.5rem] max-w-6xl" />
      </aside>
    );
  }

  if (!sesion) return null;

  const modalidadTexto =
    sesion.modalidad === "presencial" ? "Presencial" : "Online";

  return (
    <aside
      aria-label="Próxima meditación"
      className="bg-salvia-hondo px-5 py-10 text-papel sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-etiqueta uppercase tracking-[0.14em] text-papel/80">
            Próxima meditación · {modalidadTexto}
          </p>
          <h2 className="display-trazo mt-2 text-titulo">
            {sesion.fechaTexto}
          </h2>
          <p className="mt-2 text-[1.17rem] font-bold leading-relaxed opacity-95">
            {sesion.lugar}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Boton
            href={ENLACE_RESERVA}
            externo
            className="!border-papel !text-papel !text-[1.17rem] !font-bold hover:!text-salvia-hondo focus-visible:!text-salvia-hondo [&::before]:!bg-papel"
          >
            Reservar lugar
          </Boton>
          <p
            className="numero-tabular !font-bold text-[1.17rem] uppercase tracking-[0.1em]"
            aria-live="polite"
          >
            {restante || "\u00a0"}
          </p>
        </div>
      </div>
    </aside>
  );
}
