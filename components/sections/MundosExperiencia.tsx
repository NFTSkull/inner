import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import {
  HOME_COPY,
  HUB_EXPERIENCIAS,
  MUNDOS_EXPERIENCIA,
} from "@/lib/data/experiencias";

/** Ritmo asimétrico 7/5 · 5/7 en desktop. */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

/**
 * Cuatro destinos de experiencia: tarjetas editoriales enlazadas.
 * Inicio: bloque bajo la intro. Hub: encabezado h1 propio.
 */
export function MundosExperiencia({
  variante = "hub",
}: {
  variante?: "inicio" | "hub";
}) {
  const esHub = variante === "hub";

  return (
    <section
      id={esHub ? undefined : "experiencias"}
      aria-labelledby="mundos-titulo"
      className={`scroll-mt-24 bg-arena page-pad-x sm:px-8 ${
        esHub ? "pb-[var(--space-section)]" : "pb-16 lg:pb-24"
      }`}
    >
      <div className="mx-auto max-w-[76rem]">
        <Reveal>
          {esHub ? (
            <div>
              <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
                Experiencias
              </p>
              <h1
                id="mundos-titulo"
                className="mt-3 max-w-[40rem] text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.03] tracking-[-0.03em] text-tinta"
              >
                {HUB_EXPERIENCIAS.titulo}
              </h1>
              <p className="mt-4 max-w-[32rem] text-cuerpo-l text-tinta">
                {HUB_EXPERIENCIAS.soporte}
              </p>
            </div>
          ) : (
            <h2
              id="mundos-titulo"
              className="text-[clamp(1.75rem,3.2vw,2.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-tinta"
            >
              {HOME_COPY.seccionExperiencias}
            </h2>
          )}
        </Reveal>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-10 lg:grid-cols-12">
          {MUNDOS_EXPERIENCIA.map((mundo, i) => (
            <li key={mundo.id} className={SPANS[i] ?? "lg:col-span-6"}>
              <Reveal indice={Math.min(i, 3)} className="h-full">
                <Link
                  href={mundo.href}
                  className={`group flex h-full min-h-[11rem] flex-col justify-between gap-8 p-6 sm:min-h-[15rem] sm:p-8 lg:min-h-[18.5rem] ${
                    mundo.oscuro ? "text-papel" : "text-tinta"
                  }`}
                  style={{
                    backgroundColor: mundo.fondo,
                    borderRadius: "var(--radius-papel)",
                  }}
                >
                  <p
                    className="text-etiqueta uppercase tracking-[0.18em]"
                    style={{ color: mundo.acento, opacity: mundo.oscuro ? 1 : 0.75 }}
                  >
                    {mundo.etiqueta}
                  </p>
                  <div>
                    <h3 className="text-[clamp(1.6rem,2.8vw,2.45rem)] font-light leading-[1.02] tracking-[-0.025em]">
                      {mundo.titulo}
                    </h3>
                    <p
                      className={`mt-3 max-w-[26rem] text-cuerpo ${
                        mundo.oscuro ? "text-papel/80" : "text-tinta-suave"
                      }`}
                    >
                      {mundo.descripcion}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 border-b border-current/30 pb-0.5 text-cuerpo font-normal transition-[border-color] duration-[400ms] ease-[var(--ease-respiro)] group-hover:border-current">
                      {mundo.ctaTexto}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
