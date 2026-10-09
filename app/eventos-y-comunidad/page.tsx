import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { Boton } from "@/components/ui/Boton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMUNIDAD_PAGE } from "@/lib/data/experiencias";
import { EVENTOS } from "@/lib/data/eventos";
import { SITE } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos y comunidad · Inner Flow",
  description: COMUNIDAD_PAGE.intro,
};

const CTA_PAPEL =
  "!border-papel !text-papel hover:!text-bosque focus-visible:!text-bosque [&::before]:!bg-papel";

export default function PaginaComunidad() {
  const p = COMUNIDAD_PAGE;
  const n = EVENTOS.length;

  return (
    <>
      <Nav />
      <main>
        <section className="page-top page-pad-x bg-arena pb-12 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
                Eventos y comunidad
              </p>
              <h1 className="mt-3 max-w-[42rem] text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.03] tracking-[-0.03em] text-tinta">
                {p.titulo}
              </h1>
              <p className="mt-4 max-w-[34rem] text-cuerpo-l text-tinta">
                {p.intro}
              </p>
              <p className="mt-3 text-cuerpo text-tinta-suave">
                {p.cierreIntro}
              </p>
            </Reveal>
            <Reveal indice={1}>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Boton variante="primario" href={p.ctaProximasHref}>
                  {p.ctaProximas}
                </Boton>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-cuerpo font-normal text-tinta"
                >
                  <span className="enlace-plumon">{SITE.instagramHandle}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {n > 0 && (
          <section className="section-bg-crema section-y-tight page-pad-x sm:px-8">
            <div className="mx-auto max-w-[76rem]">
              <Reveal>
                <SectionHeading title="Próximas experiencias" />
                <ul
                  className={`mt-8 grid gap-6 ${
                    n === 2
                      ? "sm:grid-cols-2"
                      : n > 2
                        ? "sm:grid-cols-2 lg:grid-cols-3"
                        : ""
                  }`}
                >
                  {EVENTOS.map((ev) => (
                    <li key={ev.id} className="border-t-2 border-tierra pt-5">
                      <p className="numero-tabular text-[clamp(1.6rem,3.6vw,2.2rem)] leading-none text-tierra">
                        {ev.fecha ?? "—"}
                      </p>
                      <h3 className="mt-3 text-titulo font-normal text-tinta">
                        {ev.nombre}
                      </h3>
                      {ev.descripcion ? (
                        <p className="mt-2 text-cuerpo text-tinta-suave">
                          {ev.descripcion}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}

        <section className="section-bg-crema page-pad-x py-14 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[76rem] gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading
                title={p.clubBloque.titulo}
                body={p.clubBloque.texto}
              />
              <div className="mt-7">
                <Boton variante="primario" href={p.clubBloque.ctaHref}>
                  {p.clubBloque.ctaTexto}
                </Boton>
              </div>
            </Reveal>
            <Reveal indice={1}>
              <SectionHeading
                title={p.propuestaColab.titulo}
                body={p.propuestaColab.texto}
              />
              <div className="mt-7">
                <Boton
                  variante="secundario"
                  href={p.propuestaColab.ctaHref}
                  externo
                >
                  {p.propuestaColab.ctaTexto}
                </Boton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-bg-bosque page-pad-x py-14 text-papel sm:px-8 lg:py-16">
          <div className="mx-auto grid max-w-[76rem] gap-8 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <p className="max-w-[36rem] text-cuerpo-l text-papel/90">
                {p.mantenteCerca}
              </p>
            </Reveal>
            <Reveal indice={1} className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Boton
                  variante="primario"
                  href={p.ctaUnirmeHref}
                  externo
                  className={CTA_PAPEL}
                >
                  {p.ctaUnirme}
                </Boton>
                <a
                  href={p.ctaCalendarioHref}
                  className="enlace-plumon text-cuerpo font-normal text-papel after:!bg-papel"
                >
                  {p.ctaCalendario} →
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
