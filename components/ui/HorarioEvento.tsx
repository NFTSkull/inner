"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Boton } from "@/components/ui/Boton";
import {
  rangoEvento,
  type BloqueAgenda,
  type ImagenEvento,
} from "@/lib/data/eventos";

type Props = {
  ctaTexto: string;
  enlace: string;
  agenda?: readonly BloqueAgenda[];
  imagenHorario?: ImagenEvento;
};

/** CTAs del evento + horario completo desplegable (sin tabla dura). */
export function HorarioEvento({ ctaTexto, enlace, agenda, imagenHorario }: Props) {
  const [abierto, setAbierto] = useState(false);
  const panelId = useId();
  const hayHorario = !!agenda?.length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        <Boton variante="primario" href={enlace} externo>
          {ctaTexto}
        </Boton>
        {hayHorario && (
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls={panelId}
            className="group inline-flex items-center gap-2.5 text-cuerpo text-tinta underline decoration-salvia-doc/50 decoration-1 underline-offset-[6px] transition-colors duration-[var(--dur-corta)] ease-[var(--ease-respiro)] hover:decoration-salvia-doc"
          >
            {abierto ? "Ocultar horario" : "Ver horario completo"}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              className={`h-4 w-4 shrink-0 text-salvia-doc transition-transform duration-[var(--dur-larga)] ease-[var(--ease-respiro)] motion-reduce:transition-none ${
                abierto ? "rotate-[135deg]" : ""
              }`}
            >
              <path
                d="M 12 3.5 C 11.6 9, 12.4 15, 12 20.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M 3.5 12 C 9 11.6, 15 12.4, 20.5 12"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      {hayHorario && (
        <div
          id={panelId}
          role="region"
          aria-label="Horario completo"
          inert={!abierto}
          className={`grid transition-[grid-template-rows,opacity] duration-[var(--dur-larga)] ease-[var(--ease-respiro)] motion-reduce:transition-none ${
            abierto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-7">
              <ol className="relative ml-1 border-l border-lima pl-6">
                {agenda?.map((b) => (
                  <li key={b.nombre} className="relative pb-5 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.55em] -left-[1.78rem] h-2 w-2 rounded-full bg-salvia-doc"
                    />
                    <p className="text-etiqueta numero-tabular uppercase text-tinta-suave">
                      {rangoEvento(b.inicio, b.fin)}
                    </p>
                    <p className="mt-0.5 text-cuerpo-l text-tinta">{b.nombre}</p>
                  </li>
                ))}
              </ol>

              {imagenHorario && (
                <a
                  href={imagenHorario.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex items-center gap-4"
                >
                  <span className="relative block h-16 w-[3.2rem] shrink-0 overflow-hidden rounded-[6px] shadow-papel">
                    <Image
                      src={imagenHorario.src}
                      alt=""
                      fill
                      sizes="52px"
                      className="object-cover transition-transform duration-[var(--dur-larga)] ease-[var(--ease-respiro)] group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </span>
                  <span className="text-cuerpo text-tinta-suave underline decoration-tinta/25 underline-offset-4 transition-colors duration-[var(--dur-corta)] group-hover:text-tinta">
                    Ver flyer con horario ↗
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
