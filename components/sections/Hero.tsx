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
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 lg:min-h-[115dvh] lg:pb-28"
    >
      <FondoHero pausado={pausado} />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="relative max-w-xl lg:max-w-[34rem]">
          {/* Halo de papel detrás del copy: las letras nunca se pierden */}
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-12 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-papel)_90%,transparent)_0%,color-mix(in_srgb,var(--color-papel)_55%,transparent)_42%,transparent_72%)] lg:bg-[radial-gradient(ellipse_at_left,color-mix(in_srgb,var(--color-papel)_82%,transparent)_0%,color-mix(in_srgb,var(--color-papel)_40%,transparent)_48%,transparent_78%)]"
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
              className="mt-6 text-[clamp(2rem,3.9vw,4rem)] leading-[1.06] text-tinta lg:text-[clamp(2.4rem,4.4vw,4.6rem)]"
            />
          </Reveal>

          <Reveal indice={2}>
            <p className="text-cuerpo-l mt-8 max-w-lg text-tinta-suave">
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
        <button
          type="button"
          onClick={() => setPausado((v) => !v)}
          aria-pressed={pausado}
          aria-label={
            pausado ? "Reanudar video de fondo" : "Pausar video de fondo"
          }
          className="enlace-plumon absolute bottom-6 left-5 z-10 rounded-full bg-papel/75 px-3.5 py-1.5 text-etiqueta uppercase text-tinta-suave sm:left-8"
        >
          {pausado ? "Reanudar" : "Pausar"}
        </button>
      )}
    </section>
  );
}
