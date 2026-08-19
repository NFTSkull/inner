import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TituloTrazo } from "@/components/ui/TituloTrazo";

export function Lugar() {
  return (
    <section
      id="lugar"
      aria-label="El lugar, Casa Zenia"
      className="bg-arena-hondo px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div className="grid grid-cols-[1.35fr_0.9fr] items-end gap-3">
            <figure className="tarjeta-papel overflow-hidden">
              <Image
                src="/lugar.JPG"
                alt="Sala de Casa Zenia: cuencos de cristal alineados sobre el tapete, entre plantas y el arco de madera."
                width={4032}
                height={3024}
                sizes="(min-width: 1024px) 18rem, 55vw"
                className="h-auto w-full"
              />
            </figure>
            <figure className="tarjeta-papel-b origin-bottom rotate-[1.2deg] overflow-hidden">
              <Image
                src="/lugar1.jpeg"
                alt="Detalle de los cuencos de cristal y un ramo sobre el tapete, en Casa Zenia."
                width={4284}
                height={5712}
                sizes="(min-width: 1024px) 12rem, 38vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <TituloTrazo
              texto="El lugar"
              etiqueta="h2"
              className="text-display-l text-tinta"
            />
          </Reveal>
          <Reveal indice={1}>
            <p className="text-cuerpo-l mt-5 text-tinta">
              Casa Zenia, Monterrey.
            </p>
            <p className="text-cuerpo-l mt-2 max-w-md text-tinta">
              Una casa tranquila, con jardín y espacio para estar en
              silencio. Te mandamos la ubicación exacta y cómo llegar
              cuando reserves.
            </p>
          </Reveal>
          <Reveal indice={2}>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-etiqueta uppercase text-tinta">
                  Qué traer
                </dt>
                <dd className="text-cuerpo-l mt-1 text-tinta">
                  Ropa cómoda. Si te sientas en el piso, tu tapete o
                  cojín.
                </dd>
              </div>
              <div>
                <dt className="text-etiqueta uppercase text-tinta">
                  Qué encuentras
                </dt>
                <dd className="text-cuerpo-l mt-1 text-tinta">
                  El espacio, la guía y un té al final.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
