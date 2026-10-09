import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { Boton } from "@/components/ui/Boton";
import {
  SESIONES_PAGE,
  experienciasPorCategoria,
} from "@/lib/data/experiencias";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sesiones privadas · Inner Flow",
  description: SESIONES_PAGE.intro,
};

function formatear(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

const CLASE_H2 =
  "text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-[1.08] tracking-[-0.025em] text-tinta";

/**
 * Sesiones privadas: práctica → precio → reservar.
 * Una descripción por práctica; individual/grupo vive en la tabla de precios.
 */
export default function PaginaSesionesPrivadas() {
  const sesiones = experienciasPorCategoria("sesiones");
  const p = SESIONES_PAGE;

  const tarifas = [
    { titulo: "60 min", t: p.tarifas60 },
    { titulo: "90 min", t: p.tarifas90 },
  ] as const;

  return (
    <>
      <Nav />
      <main>
        <section className="section-bg-crema page-top page-pad-x pb-12 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
                Sesiones privadas
              </p>
              <h1 className="mt-3 max-w-[40rem] text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.03] tracking-[-0.03em] text-tinta">
                {p.titulo}
              </h1>
              <p className="mt-4 max-w-[32rem] text-cuerpo-l text-tinta">
                {p.intro}
              </p>
            </Reveal>
            <Reveal indice={1}>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Boton variante="primario" href={p.ctaAgendarHref} externo>
                  {p.ctaAgendar}
                </Boton>
                <a
                  href="#precios"
                  className="group inline-flex items-center gap-1.5 text-cuerpo font-normal text-tinta"
                >
                  <span className="enlace-plumon">Ver precios</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="practica"
          aria-labelledby="practica-titulo"
          className="scroll-mt-24 bg-papel page-pad-x py-14 sm:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <h2 id="practica-titulo" className={CLASE_H2}>
                Elige tu práctica
              </h2>
            </Reveal>
            <ul className="mt-8 grid border-t border-tinta/12 md:grid-cols-2">
              {sesiones.map((s, i) => (
                <li
                  key={s.id}
                  className={`border-b border-tinta/12 py-7 md:py-9 ${
                    i % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10"
                  }`}
                >
                  <Reveal indice={i % 2}>
                    <h3 className="text-[clamp(1.4rem,2.4vw,1.85rem)] font-light leading-[1.1] tracking-[-0.02em] text-tinta">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[28rem] text-cuerpo text-tinta-suave">
                      {s.shortDescription}
                    </p>
                    <a
                      href={s.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center gap-1.5 text-cuerpo font-normal text-tinta"
                    >
                      <span className="enlace-plumon">{s.ctaTexto}</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="precios"
          aria-labelledby="precios-titulo"
          className="scroll-mt-24 bg-arena page-pad-x py-14 sm:px-8 lg:py-20"
        >
          <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 id="precios-titulo" className={CLASE_H2}>
                  Precios
                </h2>
                <p className="mt-3 text-cuerpo text-tinta-suave">
                  {p.duraciones} · {p.capacidad}
                </p>
              </Reveal>
              <div className="mt-8 grid gap-0 border-t border-tinta/20 sm:grid-cols-2">
                {tarifas.map(({ titulo, t }, i) => (
                  <Reveal
                    key={titulo}
                    indice={i}
                    className={`border-b border-tinta/20 py-6 sm:border-b-0 ${
                      i === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"
                    }`}
                  >
                    <p className="text-etiqueta uppercase tracking-[0.18em] text-tierra">
                      {titulo}
                    </p>
                    <dl className="mt-4 space-y-3 text-cuerpo text-tinta">
                      <div className="flex justify-between gap-4 border-b border-tinta/10 pb-3">
                        <dt>Individual</dt>
                        <dd className="numero-tabular text-[1.15rem]">
                          {formatear(t.individual)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-tinta/10 pb-3">
                        <dt>Grupo hasta cinco</dt>
                        <dd className="numero-tabular text-[1.15rem]">
                          {formatear(t.grupoHasta5)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Participante adicional</dt>
                        <dd className="numero-tabular text-[1.15rem]">
                          +{formatear(t.adicional)}
                        </dd>
                      </div>
                    </dl>
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 max-w-[40rem] text-[0.875rem] leading-relaxed text-tinta-suave">
                {p.notaPrecios} {p.deposito}.
              </p>
            </div>

            <Reveal indice={1} className="lg:col-span-4 lg:pt-2">
              <h3 className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
                Incluye
              </h3>
              <ul className="mt-4 space-y-2.5 text-cuerpo text-tinta">
                {p.incluye.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-tierra" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-cuerpo text-tinta-suave">
                {p.dondeOcurre}.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-bg-bosque page-pad-x py-14 text-papel sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[76rem] gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-[1.08] tracking-[-0.025em] text-papel">
                Agenda tu sesión
              </h2>
              <p className="mt-3 max-w-[30rem] text-cuerpo-l text-papel/85">
                Cuéntame qué práctica buscas y te ayudo a confirmar formato,
                duración y fecha.
              </p>
            </Reveal>
            <Reveal indice={1} className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <Boton
                  variante="primario"
                  href={p.ctaAgendarHref}
                  externo
                  className="!border-papel !text-papel hover:!text-bosque focus-visible:!text-bosque [&::before]:!bg-papel"
                >
                  {p.ctaAgendar}
                </Boton>
                <Link
                  href={p.enlaceEmpresasHref}
                  className="enlace-plumon text-cuerpo font-normal text-papel after:!bg-papel"
                >
                  Para equipos →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
