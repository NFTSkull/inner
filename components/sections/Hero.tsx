"use client";

import { useReducedMotion } from "motion/react";
import { useState } from "react";
import { useRespirador } from "@/components/breathe/RespiradorContext";
import { FondoHero } from "@/components/sections/FondoHero";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";
import { TituloTrazo } from "@/components/ui/TituloTrazo";

export function Hero() {
  const { abrir } = useRespirador();
  const reducir = useReducedMotion();
  const [pausado, setPausado] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh scroll-mt-24 items-start px-5 pb-8 pt-[5.25rem] sm:px-8 sm:pt-28 lg:pt-32"
    >
      <FondoHero pausado={pausado} />

      {/* Franja superior corta: manos + cuenco ocupan el resto sin texto. */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-[30rem]">
          <Reveal>
            <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-tinta-suave sm:text-etiqueta">
              <IsotipoTrazo className="h-4 w-4 shrink-0 text-tinta" />
              Meditation Club · Monterrey
            </p>
          </Reveal>

          <Reveal indice={1}>
            <TituloTrazo
              texto={"Tu pausa\nempieza aquí."}
              className="mt-2 text-[clamp(1.7rem,3.8vw,3rem)] leading-[1.05] text-tinta"
            />
          </Reveal>

          <Reveal indice={2}>
            <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Boton
                variante="primario"
                className="!px-5 !py-2 text-sm"
                onClick={abrir}
              >
                Respira un minuto
              </Boton>
              <a
                href="#calendario"
                className="enlace-plumon text-sm font-normal sm:text-cuerpo"
              >
                Ver calendario
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {!reducir && (
        <div className="absolute right-5 top-[5.25rem] z-10 sm:right-8 sm:top-28">
          <Boton
            className="!px-3.5 !py-1 text-xs sm:text-sm"
            onClick={() => setPausado((v) => !v)}
          >
            {pausado ? "Reanudar" : "Pausar"}
          </Boton>
        </div>
      )}
    </section>
  );
}
