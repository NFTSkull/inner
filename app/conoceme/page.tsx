import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { Boton } from "@/components/ui/Boton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT } from "@/lib/data/about";
import { RUTAS } from "@/lib/data/rutas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conóceme · Inner Flow",
  description: `${ABOUT.headline}. ${ABOUT.roles}`,
};

export default function PaginaConoceme() {
  return (
    <>
      <Nav />
      <main>
        <section className="section-bg-crema page-top page-pad-x pb-12 sm:px-8 sm:pb-14">
          <div className="measure-wide mx-auto grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading
                  eyebrow="Conóceme"
                  title={ABOUT.headline}
                  body={ABOUT.roles}
                  etiqueta="h1"
                />
                <p className="mt-5 max-w-xl text-cuerpo-l text-tinta">
                  {ABOUT.bioCorta}
                </p>
                <p className="mt-3 max-w-xl text-cuerpo text-tinta-suave">
                  {ABOUT.bioPracticas}
                </p>
                <p
                  className="display-trazo mt-6 text-[clamp(1.1rem,2.5vw,1.35rem)] text-tierra"
                  aria-hidden="true"
                >
                  Con presencia.
                </p>
              </Reveal>
              <Reveal indice={1}>
                <div className="mt-8">
                  <Boton variante="primario" href={RUTAS.experiencias}>
                    Conoce las experiencias
                  </Boton>
                </div>
              </Reveal>
            </div>
            <Reveal indice={1} className="lg:col-span-5">
              <figure className="overflow-hidden" style={{ borderRadius: "var(--radius-papel)" }}>
                <Image
                  src="/lugar.JPG"
                  alt="Espacio de práctica Inner Flow en Casa Zenia."
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 22rem, 92vw"
                  quality={70}
                  className="h-auto w-full"
                />
                <figcaption className="mt-3 text-etiqueta uppercase tracking-[0.12em] text-tinta-suave">
                  Casa Zenia · Monterrey
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="section-y-tight bg-arena page-pad-x sm:px-8">
          <div className="measure-wide mx-auto grid gap-6 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <SectionHeading title="Formación" trazo={false} />
            </Reveal>
            <Reveal indice={1} className="lg:col-span-7">
              <ul className="space-y-3 text-cuerpo-l text-tinta">
                {ABOUT.formacion.map((linea) => (
                  <li key={linea} className="border-l-2 border-tierra/35 pl-4">
                    {linea}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section-bg-crema section-y page-pad-x sm:px-8">
          <div className="measure-wide mx-auto grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                title="Inner Flow es para ti si…"
                body={ABOUT.invitacion}
              />
            </Reveal>
            <Reveal indice={1} className="lg:col-span-7">
              <ul className="space-y-3">
                {ABOUT.paraTiSi.map((item) => (
                  <li
                    key={item}
                    className="border-b border-tinta/10 pb-3 text-cuerpo text-tinta last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Boton variante="primario" href={RUTAS.experiencias}>
                  Encontrar una experiencia para mí
                </Boton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-y-tight bg-arena page-pad-x sm:px-8">
          <div className="measure-wide mx-auto">
            <Reveal>
              <SectionHeading title="Formas de trabajar conmigo" trazo={false} />
            </Reveal>
            <ul className="mt-8 divide-y divide-tinta/12 border-y border-tinta/12">
              {ABOUT.pathways.map((path) => (
                <li
                  key={path.id}
                  className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  <h3 className="text-[1.05rem] font-normal text-tinta sm:col-span-4">
                    {path.texto}
                  </h3>
                  <p className="text-cuerpo text-tinta-suave sm:col-span-5">
                    {path.detalle}
                  </p>
                  <div className="sm:col-span-3 sm:text-right">
                    <Link
                      href={path.href}
                      className="enlace-plumon text-cuerpo font-normal"
                    >
                      {path.cta}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
