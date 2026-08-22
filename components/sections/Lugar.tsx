import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import {
  MAPS_CASA_ZENIA,
  MAPS_CASA_ZENIA_VISTA,
} from "@/lib/data/sesiones";

export function Lugar() {
  return (
    <section
      id="lugar"
      aria-label="El lugar, Casa Zenia"
      className="scroll-mt-24 bg-arena-hondo px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
        <Reveal className="lg:col-span-7 lg:row-start-1">
          <figure className="tarjeta-papel overflow-hidden p-2 sm:p-2.5">
            <Image
              src="/lugar.JPG"
              alt="Sala de Casa Zenia: cuencos de cristal alineados sobre el tapete, entre plantas y el arco de madera."
              width={4032}
              height={3024}
              sizes="(min-width: 1024px) 40rem, 92vw"
              quality={72}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        <Reveal
          indice={1}
          className="mx-auto w-[78%] sm:w-[62%] lg:col-span-4 lg:col-start-3 lg:row-start-2 lg:mx-0 lg:w-full"
        >
          <figure className="tarjeta-papel-b origin-top rotate-[-1.8deg] overflow-hidden p-2 sm:p-2.5">
            <Image
              src="/lugar1.jpeg"
              alt="Detalle de los cuencos de cristal y un ramo sobre el tapete, en Casa Zenia."
              width={4284}
              height={5712}
              sizes="(min-width: 1024px) 18rem, 62vw"
              quality={72}
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:pt-1">
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
              Una casa tranquila, con terraza y espacio para estar en
              silencio.
            </p>
          </Reveal>
          <Reveal indice={2}>
            <div className="tarjeta-papel relative mt-8 overflow-hidden">
              <iframe
                title="Mapa de Casa Zenia, Vista Hermosa, Monterrey"
                src={MAPS_CASA_ZENIA_VISTA}
                className="pointer-events-none h-52 w-full border-0 grayscale-[0.25] contrast-[0.96] sm:h-56"
                loading="lazy"
                tabIndex={-1}
              />
              <a
                href={MAPS_CASA_ZENIA}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-end"
              >
                <span className="w-full bg-arena/90 px-4 py-3 text-cuerpo text-tinta">
                  Ver en Google Maps
                </span>
              </a>
            </div>
          </Reveal>
          <Reveal indice={3}>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-etiqueta uppercase text-tinta">
                  Qué traer
                </dt>
                <dd className="text-cuerpo-l mt-1 text-tinta">
                  Ropa cómoda. Trae tu tapete.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
