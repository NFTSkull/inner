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
      className="relative flex min-h-dvh items-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:pb-24"
    >
      <FondoHero pausado={pausado} />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-[40rem]">
          <Reveal>
            <p className="flex items-center gap-3 text-etiqueta uppercase text-tinta-suave">
              <IsotipoTrazo className="h-5 w-5 shrink-0 text-tinta" />
              Meditation Club · Monterrey
            </p>
          </Reveal>

          <Reveal indice={1}>
            <TituloTrazo
              texto={"Tu pausa\nempieza aquí."}
              className="mt-5 text-[clamp(2.35rem,4.6vw,3.8rem)] leading-[1.05] text-tinta"
            />
          </Reveal>

          <Reveal indice={2}>
            <p className="text-cuerpo-l mt-6 max-w-[26rem] text-tinta-suave">
              Meditaciones para hacer una pausa, explorar distintas
              prácticas y conectar contigo. Meditaciones presenciales
              en Casa Zenia y online donde sea que estés. No necesitas
              experiencia.
            </p>
          </Reveal>

          <Reveal indice={3}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
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
        <div className="absolute bottom-6 right-5 z-10 sm:right-8">
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
