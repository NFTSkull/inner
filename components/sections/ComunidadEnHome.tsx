import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { NombreEvento } from "@/components/ui/NombreEvento";
import { COMUNIDAD_HOME } from "@/lib/data/experiencias";
import { fechaEvento, proximosEventos } from "@/lib/data/eventos";
import { SITE } from "@/lib/data/site";

export function ComunidadEnHome() {
  const p = COMUNIDAD_HOME;
  const proximo = proximosEventos(new Date())[0];
  const imagen = proximo?.imagen;

  return (
    <section
      id="comunidad"
      aria-labelledby="comunidad-titulo"
      className="section-bg-crema scroll-mt-24 page-pad-x py-14 sm:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-[76rem] items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
        <Reveal className="md:col-span-5">
          {imagen ? (
            <Link
              href={proximo?.detalleHref ?? p.ctaHref}
              className="group relative block aspect-[4/5] overflow-hidden bg-white shadow-papel sm:aspect-[7/5]"
              style={{ borderRadius: "var(--radius-papel)" }}
              aria-label={`Conocer ${proximo?.nombre ?? "el próximo evento"}`}
            >
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-respiro)] group-hover:scale-[1.018] motion-reduce:transition-none"
              />
            </Link>
          ) : (
            <div
              className="relative aspect-[16/10] overflow-hidden md:aspect-[5/4]"
              style={{ borderRadius: "var(--radius-papel)" }}
            >
              <Image
                src="/lugar1.jpeg"
                alt="Espacio de práctica con cuencos de cuarzo"
                fill
                quality={70}
                sizes="(min-width: 768px) 32vw, 100vw"
                className="object-cover object-[50%_70%]"
              />
            </div>
          )}
        </Reveal>

        <Reveal indice={1} className="md:col-span-7">
          <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
            {p.etiqueta}
          </p>
          <h2
            id="comunidad-titulo"
            className="mt-3 max-w-[34rem] text-[clamp(1.75rem,3.2vw,2.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-tinta"
          >
            {p.titulo}
          </h2>
          <p className="mt-4 max-w-[30rem] text-cuerpo-l text-tinta">
            {p.texto}
          </p>

          {proximo && (
            <div className="mt-7 max-w-[34rem] border-t border-tinta/12 pt-5">
              <p className="flex items-center gap-2.5 text-etiqueta uppercase text-tinta-suave">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-salvia-doc"
                />
                Próximo evento
              </p>
              <h3 className="mt-2 text-[clamp(1.75rem,2.8vw,2.35rem)] font-light leading-tight tracking-[-0.025em] text-tinta">
                <NombreEvento nombre={proximo.nombre} />
              </h3>
              {proximo.intencion && (
                <p className="mt-1 firma-trazo text-[1.05rem] text-salvia-hondo">
                  {proximo.intencion}
                </p>
              )}
              <p className="mt-2 text-cuerpo text-tinta-suave">
                {[fechaEvento(proximo), proximo.ubicacion]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {proximo.tags && (
                <p className="mt-2 text-cuerpo text-tinta">
                  {proximo.tags.slice(0, 3).join(" · ")}
                </p>
              )}
              {proximo.detalleHref && (
                <p className="mt-4">
                  <Link
                    href={proximo.detalleHref}
                    className="enlace-plumon text-cuerpo font-normal text-tinta"
                  >
                    Conocer el evento →
                  </Link>
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Boton variante="primario" href={p.ctaHref}>
              {p.ctaTexto} →
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
  );
}
