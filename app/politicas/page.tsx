import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { Reveal } from "@/components/motion/Reveal";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import { POLITICAS_CLUB, PRIVACIDAD } from "@/lib/data/politicas";

export const metadata: Metadata = {
  title: "Políticas y privacidad · InnerFlow",
  description:
    "Políticas del Meditation Club e InnerFlow y aviso de privacidad.",
};

export default function PaginaPoliticas() {
  return (
    <>
      <Nav />
      <main className="px-5 pb-24 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-etiqueta uppercase text-tinta-suave">
              Meditation Club · InnerFlow
            </p>
            <TituloTrazo
              texto="Políticas y privacidad"
              etiqueta="h1"
              className="mt-4 text-display-l text-tinta"
            />
          </Reveal>

          <section id="politicas" className="mt-14 scroll-mt-28">
            <Reveal>
              <h2 className="display-trazo text-titulo text-tinta">
                Políticas del club
              </h2>
            </Reveal>
            <ol className="mt-8 space-y-6">
              {POLITICAS_CLUB.map((punto, i) => (
                <Reveal key={punto} indice={i}>
                  <li className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="numero-tabular mt-0.5 w-6 shrink-0 text-cuerpo text-tinta-suave"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-cuerpo-l text-tinta">{punto}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          <section id="privacidad" className="mt-20 scroll-mt-28">
            <Reveal>
              <h2 className="display-trazo text-titulo text-tinta">
                Privacidad
              </h2>
              <p className="text-cuerpo-l mt-4 max-w-xl text-tinta-suave">
                Aviso breve, en claro: este sitio casi no toca tus datos.
              </p>
            </Reveal>
            <div className="mt-10 space-y-10">
              {PRIVACIDAD.map((bloque, i) => (
                <Reveal key={bloque.titulo} indice={i}>
                  <h3 className="text-etiqueta uppercase text-tinta">
                    {bloque.titulo}
                  </h3>
                  <p className="text-cuerpo-l mt-2 max-w-xl text-tinta">
                    {bloque.cuerpo}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
