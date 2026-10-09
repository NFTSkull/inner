import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { FlowLine } from "@/components/ui/FlowLine";
import { CLUB_HOME } from "@/lib/data/experiencias";

/**
 * Meditation Club en Inicio: una superficie (bosque), una idea, dos CTAs.
 */
export function ClubEnHome() {
  return (
    <section
      id="club-home"
      aria-labelledby="club-home-titulo"
      className="section-bg-bosque relative scroll-mt-24 overflow-hidden page-pad-x py-14 text-papel sm:px-8 lg:py-20"
    >
      <FlowLine
        variante="calm"
        className="pointer-events-none absolute -right-16 top-6 h-40 w-[28rem] max-w-none text-cielo/60 sm:right-0"
      />
      <div className="relative mx-auto grid max-w-[76rem] gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <Reveal className="lg:col-span-7">
          <p className="text-etiqueta uppercase tracking-[0.18em] text-lima">
            Meditation Club
          </p>
          <h2
            id="club-home-titulo"
            className="mt-3 max-w-[34rem] text-[clamp(1.75rem,3.2vw,2.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-papel"
          >
            {CLUB_HOME.subtitulo}
          </h2>
          <p className="mt-4 max-w-[30rem] text-cuerpo-l text-papel/85">
            {CLUB_HOME.texto}
          </p>
        </Reveal>

        <Reveal
          indice={1}
          className="lg:col-span-5 lg:flex lg:justify-end lg:pb-1"
        >
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <Boton
              variante="primario"
              href={CLUB_HOME.ctaConocerHref}
              className="pildora-clara"
            >
              {CLUB_HOME.ctaConocer}
            </Boton>
            <a
              href={CLUB_HOME.ctaSesionesHref}
              className="group inline-flex items-center gap-1.5 text-cuerpo font-normal text-papel"
            >
              <span className="enlace-plumon text-papel after:!bg-papel">
                {CLUB_HOME.ctaSesiones}
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
