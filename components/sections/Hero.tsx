"use client";

import { useRespirador } from "@/components/breathe/RespiradorContext";
import { FondoHero } from "@/components/sections/FondoHero";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { TituloTrazo } from "@/components/ui/TituloTrazo";

/**
 * Hero “marca | escena”: el copy vive en papel; el video es puro
 * (mujer + cuenco enteros), sin texto encima.
 */
export function Hero() {
  const { abrir } = useRespirador();

  return (
    <section
      id="hero"
      className="hero-escena relative grid min-h-dvh scroll-mt-24 grid-cols-1 lg:grid-cols-[minmax(22rem,40%)_minmax(0,1fr)]"
    >
      {/* Papel: marca y promesa. Nunca se superpone al cuenco. */}
      <div className="relative z-10 flex flex-col justify-end bg-arena px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32 lg:justify-center lg:px-10 lg:pb-16 lg:pt-28 xl:px-14">
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <Reveal>
            <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
              Meditation Club · Monterrey
            </p>
          </Reveal>

          <Reveal indice={1}>
            <TituloTrazo
              texto="InnerFlow"
              className="mt-4 text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] text-tinta"
            />
          </Reveal>

          <Reveal indice={2}>
            <p className="display-trazo mt-4 text-[clamp(1.2rem,2.2vw,1.65rem)] leading-snug text-tinta">
              Tu pausa empieza aquí.
            </p>
          </Reveal>

          <Reveal indice={3}>
            <p className="text-cuerpo mt-3 max-w-[22rem] text-tinta-suave">
              Presencial en Casa Zenia y online. Sin experiencia.
            </p>
          </Reveal>

          <Reveal indice={4}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Boton variante="primario" onClick={abrir}>
                Respira un minuto
              </Boton>
              <a href="#calendario" className="enlace-plumon text-cuerpo font-normal">
                Ver calendario
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Escena: video en lazo continuo. */}
      <div className="relative min-h-[62dvh] overflow-hidden lg:min-h-dvh">
        <FondoHero />
      </div>
    </section>
  );
}
