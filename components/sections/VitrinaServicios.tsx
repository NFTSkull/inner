"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CirculoAMano } from "@/components/ui/CirculoAMano";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import { rotacionDeTrazo } from "@/lib/breath";
import { ENTRADAS_VITRINA } from "@/lib/data/servicios";

/**
 * Pared de flyers: 5 hojas asimétricas, rotación determinista.
 * El Club lleva insignia. Nada de grilla 3+2.
 */

const POSICION_DESKTOP: Record<
  string,
  { top: string; left: string; width: string }
> = {
  "meditation-club": { top: "10%", left: "62%", width: "32%" },
  "sesiones-privadas": { top: "4%", left: "2%", width: "30%" },
  "eventos-privados": { top: "8%", left: "34%", width: "28%" },
  "empresas-colegios": { top: "48%", left: "10%", width: "34%" },
  comunidad: { top: "52%", left: "48%", width: "28%" },
};

function rotacionFlyer(id: string, indice: number): number {
  return rotacionDeTrazo(id, indice) * 2.2;
}

export function VitrinaServicios() {
  return (
    <section
      id="servicios"
      aria-label="Servicios de InnerFlow"
      className="scroll-mt-24 bg-arena-hondo px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <TituloTrazo
            texto="Cómo quieres bajarle"
            etiqueta="h2"
            className="text-display-l text-tinta"
          />
          <p className="text-cuerpo-l mt-4 max-w-[36ch] text-tinta-suave">
            Cinco caminos. Elige el que se siente tuyo hoy.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5 lg:hidden">
          {ENTRADAS_VITRINA.map((entrada, i) => (
            <Reveal key={entrada.id} indice={i}>
              <Flyer
                entrada={entrada}
                indice={i}
                estilo={{
                  transform: `rotate(${rotacionFlyer(entrada.id, i)}deg)`,
                }}
              />
            </Reveal>
          ))}
        </div>

        <div className="relative mt-16 hidden min-h-[38rem] lg:block xl:min-h-[42rem]">
          {ENTRADAS_VITRINA.map((entrada, i) => {
            const pos = POSICION_DESKTOP[entrada.id];
            const rot = rotacionFlyer(entrada.id, i);
            return (
              <Reveal key={entrada.id} indice={i}>
                <div
                  className="absolute transition-[transform,z-index] duration-[400ms] ease-[var(--ease-respiro)] motion-reduce:transition-none hover:z-20 hover:-translate-y-4 focus-within:z-20 focus-within:-translate-y-4"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    zIndex: entrada.insignia ? 8 : 2 + i,
                  }}
                >
                  <div style={{ transform: `rotate(${rot}deg)` }}>
                    <Flyer entrada={entrada} indice={i} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Flyer({
  entrada,
  indice,
  estilo,
}: {
  entrada: (typeof ENTRADAS_VITRINA)[number];
  indice: number;
  estilo?: CSSProperties;
}) {
  const papel = indice % 2 === 0 ? "tarjeta-papel" : "tarjeta-papel-b";

  return (
    <Link
      href={entrada.href}
      className={`group relative block ${papel} px-7 py-8 transition-shadow duration-[400ms] ease-[var(--ease-respiro)] hover:shadow-[0_8px_32px_rgba(75,58,36,0.12)] focus-visible:shadow-[0_8px_32px_rgba(75,58,36,0.12)] sm:px-8 sm:py-9 ${
        entrada.insignia ? "ring-1 ring-azul-hondo/25" : ""
      }`}
      style={estilo}
    >
      {entrada.insignia && (
        <p
          aria-hidden="true"
          className="display-trazo pointer-events-none absolute -top-3 right-5 rotate-[7deg] text-[0.95rem] lowercase text-azul-hondo"
          style={{ textTransform: "lowercase" }}
        >
          el ancla
        </p>
      )}

      <p className="text-etiqueta uppercase tracking-[0.14em] text-tinta-suave">
        {String(indice + 1).padStart(2, "0")}
      </p>

      <h3 className="display-trazo relative mt-3 text-titulo leading-snug text-tinta">
        {entrada.titulo}
        {entrada.insignia && (
          <CirculoAMano
            variante={1}
            dibujado
            grosor={5}
            className="absolute -inset-x-4 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2rem)] text-azul-hondo opacity-70"
          />
        )}
      </h3>

      <p className="text-cuerpo mt-4 max-w-[28ch] text-tinta-suave">
        {entrada.linea}
      </p>

      <span className="enlace-plumon mt-6 inline-block text-cuerpo font-normal text-tinta">
        Ver más
      </span>
    </Link>
  );
}
