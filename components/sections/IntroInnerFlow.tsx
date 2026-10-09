import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { INTRO_INNERFLOW } from "@/lib/data/experiencias";

/** Intro editorial: idea (izquierda) | definición (derecha). */
export function IntroInnerFlow() {
  const p = INTRO_INNERFLOW;
  return (
    <section
      id="intro"
      aria-labelledby="intro-titulo"
      className="scroll-mt-24 bg-arena page-pad-x pb-14 pt-14 sm:px-8 sm:pt-20 lg:pb-20 lg:pt-24"
    >
      <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <p className="text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-tinta">
            {p.idea}
          </p>
          <p className="mt-2 text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.04] tracking-[-0.03em] text-tierra/80">
            {p.ideaPresente}
          </p>
        </Reveal>

        <Reveal indice={1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
          <h2
            id="intro-titulo"
            className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave"
          >
            {p.pregunta}
          </h2>
          <p className="mt-4 text-cuerpo-l text-tinta">{p.texto}</p>
          <p className="mt-3 text-cuerpo text-tinta-suave">
            {p.textoSecundario}
          </p>
          <Link
            href={p.ctaHref}
            className="group mt-6 inline-flex items-center gap-1.5 border-b border-tinta/25 pb-0.5 text-cuerpo font-normal text-tinta transition-[border-color,color] duration-[400ms] ease-[var(--ease-respiro)] hover:border-tinta hover:text-tierra"
          >
            {p.ctaTexto}
            <span
              aria-hidden="true"
              className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
