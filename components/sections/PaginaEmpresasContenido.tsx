"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { precioExperiencia } from "@/lib/experienciaUi";
import {
  EMPRESAS_PAGE,
  experienciasPorCategoria,
} from "@/lib/data/experiencias";
import { enlaceReserva } from "@/lib/data/sesiones";

const NAV_INTERNO = [
  { id: "experiencias", label: "Experiencias" },
  { id: "programas", label: "Programas" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "propuesta", label: "Propuesta" },
] as const;

const CLASE_H2 =
  "text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-[1.08] tracking-[-0.025em]";

const CTA_PAPEL = "pildora-clara";

/**
 * Empresas y colegios: servicios → programas → cómo funciona → propuesta.
 * Precio y duración siempre visibles; el detalle se abre a demanda.
 */
export function PaginaEmpresasContenido() {
  const todas = experienciasPorCategoria("empresas");
  const ofertas = todas.filter((e) => e.subtitle !== "Programa mensual");
  const programas = todas.filter((e) => e.subtitle === "Programa mensual");
  const p = EMPRESAS_PAGE;
  const [activa, setActiva] = useState<string>("experiencias");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiva(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    for (const item of NAV_INTERNO) {
      const el = document.getElementById(item.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section className="section-bg-bosque page-top page-pad-x pb-12 text-papel sm:px-8 sm:pb-16">
        <div className="mx-auto max-w-[76rem]">
          <Reveal>
            <p className="text-etiqueta uppercase tracking-[0.18em] text-lima">
              Empresas y colegios
            </p>
            <h1 className="mt-3 max-w-[42rem] text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.03] tracking-[-0.03em] text-papel">
              {p.titulo}
            </h1>
            <p className="mt-4 max-w-[34rem] text-cuerpo-l text-papel/85">
              {p.intro}
            </p>
          </Reveal>
          <Reveal indice={1}>
            <div className="mt-8">
              <Boton
                variante="primario"
                href={p.ctaPropuestaHref}
                externo
                className={CTA_PAPEL}
              >
                {p.ctaPropuesta}
              </Boton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="sticky top-[68px] z-30 border-b border-tinta/10 bg-arena/95 backdrop-blur-sm">
        <nav
          aria-label="En esta página"
          className="mx-auto flex max-w-[76rem] gap-1 overflow-x-auto page-pad-x py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-0"
        >
          {NAV_INTERNO.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 px-3 py-1.5 text-etiqueta uppercase tracking-[0.1em] transition-colors duration-[400ms] ease-[var(--ease-respiro)] first:pl-0"
              style={{
                color:
                  activa === item.id
                    ? "var(--color-tinta)"
                    : "var(--color-tinta-suave)",
                borderBottom:
                  activa === item.id
                    ? "2px solid var(--color-bosque)"
                    : "2px solid transparent",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <section
        id="experiencias"
        aria-labelledby="experiencias-titulo"
        className="scroll-mt-32 bg-arena page-pad-x py-14 sm:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[76rem]">
          <Reveal>
            <h2 id="experiencias-titulo" className={`${CLASE_H2} text-tinta`}>
              Lo que podemos llevar a tu equipo
            </h2>
            <p className="mt-3 text-cuerpo text-tinta-suave">
              El precio se ajusta de acuerdo con el tamaño del grupo.
            </p>
          </Reveal>
          <ul className="mt-8 border-t border-tinta/15">
            {ofertas.map((exp, i) => (
              <li key={exp.id} className="border-b border-tinta/15">
                <Reveal indice={Math.min(i, 3)}>
                  <article className="grid gap-4 py-7 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-7">
                      <h3 className="text-[clamp(1.35rem,2.2vw,1.7rem)] font-light leading-[1.12] tracking-[-0.02em] text-tinta">
                        {exp.title}
                      </h3>
                      <p className="mt-2 max-w-[34rem] text-cuerpo text-tinta-suave">
                        {exp.shortDescription}
                      </p>
                      {exp.includes && exp.includes.length > 0 && (
                        <details className="group mt-3">
                          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-etiqueta uppercase tracking-[0.14em] text-tinta-suave transition-colors hover:text-tinta [&::-webkit-details-marker]:hidden">
                            Qué incluye
                            <span
                              aria-hidden="true"
                              className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-open:rotate-45"
                            >
                              +
                            </span>
                          </summary>
                          <ul className="mt-3 space-y-1.5 text-cuerpo text-tinta">
                            {[...exp.includes, ...(exp.requirements ?? [])].map(
                              (item) => (
                                <li key={item} className="flex gap-2.5">
                                  <span className="text-tierra" aria-hidden="true">
                                    ·
                                  </span>
                                  <span>{item}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </details>
                      )}
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 md:col-span-5 md:flex-col md:items-end md:justify-start md:text-right">
                      <div>
                        <p className="numero-tabular text-[1.35rem] text-tinta">
                          {precioExperiencia(exp)}
                        </p>
                        <p className="text-etiqueta tracking-normal text-tinta-suave">
                          {exp.duration}
                        </p>
                      </div>
                      <a
                        href={exp.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta inline-flex items-center gap-1.5 text-cuerpo font-normal text-tinta"
                      >
                        <span className="enlace-plumon">Cotizar</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover/cta:translate-x-0.5"
                        >
                          →
                        </span>
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="programas"
        aria-labelledby="programas-titulo"
        className="section-bg-crema scroll-mt-32 page-pad-x py-14 sm:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-[76rem]">
          <Reveal>
            <h2 id="programas-titulo" className={`${CLASE_H2} text-tinta`}>
              Programas mensuales
            </h2>
            <p className="mt-3 text-cuerpo-l text-tinta-suave">
              {p.programasIntro}
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-px overflow-hidden border border-tinta/12 bg-tinta/12 sm:grid-cols-2 lg:grid-cols-4">
            {programas.map((exp, i) => (
              <li key={exp.id} className="bg-crema">
                <Reveal indice={Math.min(i, 3)} className="flex h-full flex-col p-5 sm:p-6">
                  <h3 className="text-[1.2rem] font-normal tracking-[-0.01em] text-tinta">
                    {exp.title}
                  </h3>
                  <p className="mt-2 flex-1 text-cuerpo text-tinta-suave">
                    {exp.shortDescription}
                  </p>
                  <p className="numero-tabular mt-5 text-[1.15rem] text-tinta">
                    {precioExperiencia(exp)}
                  </p>
                  <p className="text-etiqueta tracking-normal text-tinta-suave">
                    {exp.duration}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Boton
              variante="primario"
              href={enlaceReserva(
                "Hola, quiero crear un programa mensual de bienestar con Inner Flow."
              )}
              externo
            >
              Crear un programa mensual
            </Boton>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        aria-labelledby="como-titulo"
        className="scroll-mt-32 bg-arena page-pad-x py-14 sm:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h2 id="como-titulo" className={`${CLASE_H2} text-tinta`}>
              Cómo funciona
            </h2>
            <ol className="mt-6 border-t border-tinta/15">
              {p.comoFunciona.map((paso, i) => (
                <li
                  key={paso}
                  className="flex items-baseline gap-4 border-b border-tinta/15 py-3.5 text-cuerpo text-tinta"
                >
                  <span className="numero-tabular text-etiqueta text-tinta-suave">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal indice={1} className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <div>
              <h3 className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
                Inner Flow lleva
              </h3>
              <ul className="mt-4 space-y-2 text-cuerpo text-tinta">
                {p.proporcionaIF.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-tierra" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
                La organización proporciona
              </h3>
              <ul className="mt-4 space-y-2 text-cuerpo text-tinta">
                {p.proporcionaOrg.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-tierra" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="propuesta"
        aria-labelledby="propuesta-titulo"
        className="section-bg-bosque scroll-mt-32 page-pad-x py-14 text-papel sm:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-[76rem] gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12 lg:gap-y-6">
          <Reveal className="lg:col-span-5">
            <h2 id="propuesta-titulo" className={`${CLASE_H2} text-papel`}>
              Información importante
            </h2>
          </Reveal>
          <Reveal indice={1} className="lg:col-span-7 lg:row-span-2">
            <ul className="border-t border-papel/20">
              {p.infoImportante.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 border-b border-papel/20 py-3.5 text-cuerpo text-papel/90"
                >
                  <span className="text-lima" aria-hidden="true">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal indice={2} className="lg:col-span-5">
            <Boton
              variante="primario"
              href={p.ctaPropuestaHref}
              externo
              className={CTA_PAPEL}
            >
              {p.ctaPropuesta}
            </Boton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
