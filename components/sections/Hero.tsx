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
      className="relative flex min-h-dvh items-center px-5 pb-24 pt-28 sm:px-8 lg:min-h-[115dvh] lg:pb-28"
    >
      <FondoHero pausado={pausado} />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="relative max-w-[16.5rem] sm:max-w-[18.5rem] lg:max-w-[20.5rem]">
          {/* Mancha de luz, no caja: se disuelve hacia los bordes */}
          <div
            className="pointer-events-none absolute -inset-y-6 -left-4 right-0 -z-10 bg-[radial-gradient(ellipse_at_20%_40%,color-mix(in_srgb,var(--color-arena)_90%,transparent)_0%,color-mix(in_srgb,var(--color-arena)_48%,transparent)_42%,transparent_74%)]"
            aria-hidden="true"
          />

          <Reveal>
            <p className="flex items-center gap-3 text-etiqueta uppercase text-tinta-suave">
              <IsotipoTrazo className="h-5 w-5 shrink-0 text-tinta" />
              Meditation Club · Monterrey
            </p>
          </Reveal>

          <Reveal indice={1}>
            <TituloTrazo
              texto={"Tu pausa empieza aquí."}
              className="mt-6 text-[clamp(1.85rem,6vw,2.65rem)] leading-[1.08] text-tinta"
            />
          </Reveal>

          <Reveal indice={2}>
            <p className="text-cuerpo-l mt-8 text-tinta-suave">
              Meditaciones para hacer una pausa, explorar distintas
              prácticas y conectar contigo. Meditaciones presenciales
              en Casa Zenia y online donde sea que estés. No necesitas
              experiencia.
            </p>
          </Reveal>

          <Reveal indice={3}>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <Boton variante="primario" onClick={abrir}>
                Respira un minuto conmigo
              </Boton>
              <a href="#calendario" className="enlace-plumon text-cuerpo font-normal">
                Ver calendario
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {!reducir && (
        <div className="absolute bottom-6 left-5 z-10 sm:left-8">
          <Boton
            className="!px-5 !py-2 text-sm"
            onClick={() => setPausado((v) => !v)}
          >
            {pausado ? "Reanudar" : "Pausar"}
          </Boton>
        </div>
      )}
    </section>
  );
}
