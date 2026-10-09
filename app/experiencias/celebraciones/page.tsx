import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { Boton } from "@/components/ui/Boton";
import {
  CELEBRACIONES_PAGE,
  CELEBRACIONES_PRECIOS,
  experienciasPorCategoria,
  type Experiencia,
} from "@/lib/data/experiencias";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celebraciones · Inner Flow",
  description: CELEBRACIONES_PAGE.intro,
};

const PRECIOS: Record<string, { base: number; adicional: number }> = {
  "celeb-pausa": {
    base: CELEBRACIONES_PRECIOS.pausaCompartida.base,
    adicional: CELEBRACIONES_PRECIOS.pausaCompartida.usadoEnUi,
  },
  "celeb-move": {
    base: CELEBRACIONES_PRECIOS.moveConnect.base,
    adicional: CELEBRACIONES_PRECIOS.moveConnect.usadoEnUi,
  },
  "celeb-inner": {
    base: CELEBRACIONES_PRECIOS.celebracionInnerFlow.base,
    adicional: CELEBRACIONES_PRECIOS.celebracionInnerFlow.usadoEnUi,
  },
};

const ACENTOS: Record<string, string> = {
  "celeb-pausa": "var(--color-cielo)",
  "celeb-move": "var(--color-salvia-doc)",
  "celeb-inner": "var(--color-tierra)",
};

function formatear(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/**
 * Celebraciones: hero directo → tres formatos autosuficientes +
 * personalizada → información importante con el CTA principal.
 */
export default function PaginaCelebraciones() {
  const celebraciones = experienciasPorCategoria("celebraciones");
  const principales = celebraciones.filter((e) => e.id in PRECIOS);
  const personalizada = celebraciones.find(
    (e) => e.id === "celeb-personalizada"
  );
  const p = CELEBRACIONES_PAGE;

  return (
    <>
      <Nav />
      <main>
        <section className="section-bg-lima page-top page-pad-x pb-12 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
                Celebraciones
              </p>
              <h1 className="mt-3 max-w-[40rem] text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.03] tracking-[-0.03em] text-tinta">
                {p.titulo}
              </h1>
              <p className="mt-4 max-w-[32rem] text-cuerpo-l text-tinta">
                {p.intro}
              </p>
            </Reveal>
            <Reveal indice={1}>
              <div className="mt-8">
                <Boton variante="primario" href={p.ctaPrincipalHref} externo>
                  {p.ctaPrincipal}
                </Boton>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          aria-label="Experiencias de celebración"
          className="bg-arena page-pad-x py-14 sm:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-[76rem]">
            <ul className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
              {principales.map((exp, i) => (
                <li key={exp.id}>
                  <Reveal indice={i} className="h-full">
                    <Celebracion
                      exp={exp}
                      acento={ACENTOS[exp.id] ?? "var(--color-tinta)"}
                      precio={PRECIOS[exp.id]}
                    />
                  </Reveal>
                </li>
              ))}
            </ul>

            {personalizada && (
              <Reveal>
                <article
                  className="mt-12 grid gap-6 bg-papel p-6 sm:p-8 md:grid-cols-12 md:items-end md:gap-8 lg:mt-14"
                  style={{ borderRadius: "var(--radius-papel)" }}
                >
                  <div className="md:col-span-7">
                    <h2 className="text-[clamp(1.4rem,2.4vw,1.85rem)] font-light leading-[1.1] tracking-[-0.02em] text-tinta">
                      {personalizada.title}
                    </h2>
                    <p className="mt-3 max-w-[34rem] text-cuerpo text-tinta-suave">
                      {personalizada.shortDescription}
                    </p>
                  </div>
                  <div className="md:col-span-5 md:justify-self-end md:text-right">
                    <p className="text-cuerpo text-tinta">
                      {personalizada.participantes}
                      <span className="mx-2 text-tinta-suave" aria-hidden="true">
                        ·
                      </span>
                      <span className="numero-tabular">
                        {personalizada.priceLabel}
                      </span>
                    </p>
                    <div className="mt-4">
                      <Boton
                        variante="secundario"
                        href={personalizada.ctaHref}
                        externo
                      >
                        {personalizada.ctaTexto}
                      </Boton>
                    </div>
                  </div>
                </article>
              </Reveal>
            )}
          </div>
        </section>

        <section
          aria-labelledby="info-titulo"
          className="section-bg-crema page-pad-x py-14 sm:px-8 lg:py-16"
        >
          <div className="mx-auto grid max-w-[76rem] gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12 lg:gap-y-6">
            <Reveal className="lg:col-span-5">
              <h2
                id="info-titulo"
                className="text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-[1.08] tracking-[-0.025em] text-tinta"
              >
                Información importante
              </h2>
            </Reveal>
            <Reveal indice={1} className="lg:col-span-7 lg:row-span-2">
              <ul className="grid gap-x-8 border-t border-tinta/12 sm:grid-cols-2">
                {p.infoImportante.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 border-b border-tinta/12 py-4 text-cuerpo text-tinta"
                  >
                    <span className="text-tierra" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal indice={2} className="lg:col-span-5">
              <Boton variante="primario" href={p.ctaPrincipalHref} externo>
                {p.ctaPrincipal}
              </Boton>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Celebracion({
  exp,
  acento,
  precio,
}: {
  exp: Experiencia;
  acento: string;
  precio?: { base: number; adicional: number };
}) {
  return (
    <article
      className="flex h-full flex-col border-t-2 pt-5"
      style={{ borderColor: acento }}
    >
      <p className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
        {[exp.duration, exp.participantes].filter(Boolean).join(" · ")}
      </p>
      <h2 className="mt-3 text-[clamp(1.4rem,2.4vw,1.85rem)] font-light leading-[1.1] tracking-[-0.02em] text-tinta">
        {exp.title}
      </h2>
      <p className="mt-3 text-cuerpo text-tinta">{exp.shortDescription}</p>
      {exp.idealForChips && exp.idealForChips.length > 0 && (
        <p className="mt-3 text-[0.875rem] leading-relaxed text-tinta-suave">
          Ideal para · {exp.idealForChips.join(" · ")}
        </p>
      )}

      {precio && (
        <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="numero-tabular text-[1.6rem] text-tinta">
            {formatear(precio.base)}
          </span>
          <span className="text-etiqueta tracking-normal text-tinta-suave">
            Persona adicional +{formatear(precio.adicional)}
          </span>
        </p>
      )}

      {exp.includes && exp.includes.length > 0 && (
        <div className="mt-5 border-t border-tinta/10 pt-4">
          <h3 className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
            Incluye
          </h3>
          <ul className="mt-2.5 space-y-1.5 text-cuerpo text-tinta">
            {exp.includes.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="text-tierra" aria-hidden="true">
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-7">
        <Boton variante="secundario" href={exp.ctaHref} externo>
          {exp.ctaTexto}
        </Boton>
      </div>
    </article>
  );
}
