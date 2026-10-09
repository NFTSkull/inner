import { Reveal } from "@/components/motion/Reveal";
import { CalendarioPublico } from "@/components/sections/CalendarioPublico";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { CALENDARIO_COPY } from "@/lib/data/eventos";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendario · Inner Flow",
  description: CALENDARIO_COPY.soporte,
};

/** Recalcula próximas/realizadas en el HTML al menos cada hora. */
export const revalidate = 3600;

export default function PaginaCalendario() {
  const ahoraISO = new Date().toISOString();
  return (
    <>
      <Nav />
      <main>
        <section className="page-top page-pad-x bg-arena pb-8 sm:px-8 sm:pb-10">
          <div className="measure-wide mx-auto">
            <Reveal>
              <h1 className="text-[clamp(2.1rem,4.6vw,3.6rem)] font-light leading-[1.03] tracking-[-0.03em] text-tinta">
                {CALENDARIO_COPY.titulo}
              </h1>
              <p className="mt-4 max-w-[32rem] text-cuerpo-l text-tinta">
                {CALENDARIO_COPY.soporte}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-bg-crema section-y-tight page-pad-x sm:px-8">
          <div className="measure-wide mx-auto">
            <CalendarioPublico ahoraISO={ahoraISO} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
