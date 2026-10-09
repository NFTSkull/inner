import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/sections/Footer";
import { FormularioContacto } from "@/components/sections/FormularioContacto";
import { Nav } from "@/components/sections/Nav";
import { Boton } from "@/components/ui/Boton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RUTAS } from "@/lib/data/rutas";
import { CONTACTO_COPY } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto · Inner Flow",
  description: CONTACTO_COPY.intro,
};

export default function PaginaContacto() {
  return (
    <>
      <Nav />
      <main>
        <section className="page-top page-pad-x bg-arena pb-8 sm:px-8 sm:pb-10">
          <div className="measure-wide mx-auto">
            <Reveal>
              <SectionHeading
                eyebrow="Contacto"
                title={CONTACTO_COPY.titulo}
                body={CONTACTO_COPY.intro}
                etiqueta="h1"
              />
            </Reveal>
          </div>
        </section>

        <section className="section-bg-crema section-y-tight page-pad-x sm:px-8">
          <div className="measure-wide mx-auto">
            <Reveal>
              <FormularioContacto />
            </Reveal>
          </div>
        </section>

        <section className="section-bg-bosque section-y-tight page-pad-x text-papel sm:px-8">
          <div className="measure-wide mx-auto">
            <Reveal>
              <h2 className="text-[clamp(1.5rem,3.2vw,2.1rem)] font-light leading-[1.1] tracking-[-0.025em] text-papel">
                Empecemos desde donde estás
              </h2>
              <p className="mt-3 max-w-[32rem] text-cuerpo-l text-papel/90">
                {CONTACTO_COPY.cierre}
              </p>
              <div className="mt-7">
                <Boton
                  variante="primario"
                  href={RUTAS.experiencias}
                  className="pildora-clara"
                >
                  Explorar experiencias
                </Boton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
