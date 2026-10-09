"use client";

import { FondoHero, type MediosHero } from "@/components/sections/FondoHero";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import { HOME_COPY } from "@/lib/data/experiencias";
import { RUTAS } from "@/lib/data/rutas";

const MEDIOS_INICIO: MediosHero = {
  mp4: "/inicio-hero.mp4",
  mp4Movil: "/inicio-hero-movil.mp4",
  webm: "/inicio-hero.webm",
  poster: "/inicio-hero-poster.jpg",
  posterMovil: "/inicio-hero-movil-poster.jpg",
  sizes: "(min-width: 1600px) 1560px, 100vw",
  claseMedia:
    "absolute inset-0 h-full w-full object-cover object-[50%_60%] md:object-[50%_86%]",
};

/** Botón primario en papel sobre el video (desktop). */
const PRIMARIO_SOBRE_VIDEO =
  "!border-papel !bg-papel !text-tinta hover:!text-papel focus-visible:!text-papel [&::before]:!bg-tinta";

function CtaSecundario({ claro }: { claro: boolean }) {
  return (
    <a
      href={RUTAS.calendario}
      className={`group inline-flex items-center gap-1.5 border-b pb-0.5 text-cuerpo font-normal transition-[border-color,color] duration-[400ms] ease-[var(--ease-respiro)] ${
        claro
          ? "border-papel/45 text-papel hover:border-papel"
          : "border-tinta/25 text-tinta hover:border-tinta hover:text-tierra"
      }`}
    >
      {HOME_COPY.ctaCalendario}
      <span
        aria-hidden="true"
        className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

/**
 * Hero de Inicio: superficie audiovisual protagonista.
 * Desktop: copy en el tercio inferior izquierdo sobre un velo localizado.
 * Móvil: titular sobre la copa de los árboles; soporte y CTAs debajo.
 */
export function HeroInicio() {
  return (
    <section
      id="hero"
      aria-label="Inner Flow"
      className="scroll-mt-24 bg-arena px-3 pt-[76px] sm:px-6 lg:px-8"
    >
      <div className="relative mx-auto h-[68svh] min-h-[30rem] max-w-[97.5rem] overflow-hidden rounded-[26px] md:h-[clamp(540px,74vh,780px)] md:rounded-[40px]">
        <FondoHero medios={MEDIOS_INICIO} />
        <div
          className="velo-hero-inicio pointer-events-none absolute inset-0 z-[3]"
          aria-hidden="true"
        />

        <Reveal className="absolute inset-x-0 top-0 z-10 px-5 pt-6 md:inset-x-auto md:bottom-0 md:left-0 md:top-auto md:max-w-[44rem] md:px-12 md:pb-12 lg:px-16 lg:pb-16">
          <p className="text-etiqueta uppercase tracking-[0.2em] text-papel/85">
            {HOME_COPY.heroEyebrow}
          </p>
          <h1 className="mt-4 text-papel md:mt-5">
            <span className="block text-[clamp(2.25rem,4.9vw,4.85rem)] font-light leading-[1.02] tracking-[-0.03em]">
              {HOME_COPY.heroTituloEstructura}
            </span>
            <TituloTrazo
              texto={HOME_COPY.heroTituloFirma}
              etiqueta="span"
              mayusculas={false}
              className="block text-[clamp(3rem,6vw,6rem)] leading-[0.98]"
            />
          </h1>
          <p className="mt-5 hidden max-w-[30rem] text-cuerpo-l font-normal text-papel [text-shadow:0_1px_12px_rgb(36_27_16/0.45)] md:block">
            {HOME_COPY.heroSoporte}
          </p>
          <div className="mt-8 hidden flex-wrap items-center gap-x-7 gap-y-3 md:flex">
            <Boton
              variante="primario"
              href={RUTAS.experiencias}
              className={PRIMARIO_SOBRE_VIDEO}
            >
              {HOME_COPY.ctaExplorar}
            </Boton>
            <CtaSecundario claro />
          </div>
        </Reveal>
      </div>

      <div className="px-2 pb-2 pt-6 md:hidden">
        <p className="max-w-[24rem] text-cuerpo-l text-tinta">
          {HOME_COPY.heroSoporte}
        </p>
        <div className="mt-6 flex flex-col items-start gap-4">
          <Boton variante="primario" href={RUTAS.experiencias}>
            {HOME_COPY.ctaExplorar}
          </Boton>
          <CtaSecundario claro={false} />
        </div>
      </div>
    </section>
  );
}
