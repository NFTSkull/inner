import Image from "next/image";
import type { Metadata } from "next";
import { TrackedReservationButton } from "@/components/analytics/TrackedReservationButton";
import { Reveal } from "@/components/motion/Reveal";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import {
  MINDFUL_HANGOUT,
  enlaceReservaEvento,
  fechaEvento,
  horaEvento,
  rangoEvento,
} from "@/lib/data/eventos";

const evento = MINDFUL_HANGOUT;

export const metadata: Metadata = {
  title: "The Mindful Hangout · Segunda edición · Inner Flow",
  description:
    "Pilates, sound healing, matcha y comunidad el sábado 28 de noviembre en Gran Parque San Nicolás.",
  openGraph: {
    title: "The Mindful Hangout · Segunda edición",
    description:
      "Una mañana para moverte, hacer una pausa y compartir en comunidad.",
    images: [evento.imagen?.src ?? "/og.png"],
  },
};

const COLORES_TAG = [
  "border-tierra text-tierra",
  "border-salvia-doc bg-salvia-doc text-papel",
  "border-tierra bg-tierra text-crema",
  "border-cielo bg-cielo text-tinta",
  "border-bosque bg-bosque text-crema",
];

export default function MindfulHangoutPage() {
  const reserva = enlaceReservaEvento(evento);

  return (
    <>
      <Nav />
      <main>
        <section className="page-top bg-arena page-pad-x pb-14 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-5">
              <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
                Evento especial · {evento.intencion}
              </p>

              <h1 className="mt-5 text-tinta">
                <span className="block text-[clamp(2rem,4vw,3.2rem)] font-light uppercase tracking-[0.12em]">
                  The
                </span>
                <span className="firma-trazo -mt-1 block text-[clamp(4rem,8vw,7rem)] leading-[0.8] text-salvia-hondo">
                  Mindful
                </span>
                <span className="mt-3 block text-[clamp(3rem,6vw,5rem)] font-light uppercase leading-none tracking-[-0.04em]">
                  Hangout
                </span>
              </h1>

              <p className="mt-7 max-w-[29rem] text-cuerpo-l text-tinta">
                {evento.descripcion}
              </p>

              <dl className="mt-7 border-y border-tinta/15 py-1">
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-tinta/10 py-3">
                  <dt className="text-etiqueta uppercase text-tinta-suave">Fecha</dt>
                  <dd className="text-cuerpo text-tinta">{fechaEvento(evento)}</dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-tinta/10 py-3">
                  <dt className="text-etiqueta uppercase text-tinta-suave">Hora</dt>
                  <dd className="numero-tabular text-cuerpo text-tinta">
                    {evento.horaInicio &&
                      rangoEvento(evento.horaInicio, evento.horaFin)}
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                  <dt className="text-etiqueta uppercase text-tinta-suave">Lugar</dt>
                  <dd className="text-cuerpo text-tinta">{evento.ubicacion}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <TrackedReservationButton
                  href={reserva}
                  eventKey={evento.id}
                >
                  Reservar mi lugar
                </TrackedReservationButton>
              </div>
            </Reveal>

            {evento.imagen && (
              <Reveal indice={1} className="lg:col-span-7">
                <div
                  className="relative mx-auto aspect-[4/5] w-full max-w-[38rem] overflow-hidden bg-papel shadow-papel lg:ml-auto"
                  style={{ borderRadius: "var(--radius-papel)" }}
                >
                  <Image
                    src={evento.imagen.src}
                    alt={evento.imagen.alt}
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="section-bg-crema page-pad-x py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-[76rem]">
            <Reveal>
              <p className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
                Lo que vas a vivir
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                {evento.tags?.map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-4 py-2 text-cuerpo font-normal ${COLORES_TAG[i % COLORES_TAG.length]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-papel page-pad-x py-14 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
                El ritmo de la mañana
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-light tracking-[-0.03em] text-tinta">
                Un encuentro, paso a paso.
              </h2>

              <ol className="relative mt-9 border-l border-salvia-doc/45 pl-7">
                {evento.agenda?.map((bloque) => (
                  <li key={bloque.nombre} className="relative pb-7 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.55rem] -left-[2.02rem] h-2.5 w-2.5 rounded-full bg-salvia-doc"
                    />
                    <p className="numero-tabular text-etiqueta uppercase tracking-[0.13em] text-tinta-suave">
                      {horaEvento(bloque.inicio)}
                    </p>
                    <p className="mt-1 text-[1.3rem] font-normal text-tinta">
                      {bloque.nombre}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {evento.imagenHorario && (
              <Reveal indice={1} className="lg:col-span-6">
                <div
                  className="relative mx-auto aspect-[4/5] w-full max-w-[31rem] overflow-hidden bg-arena shadow-papel lg:mr-0"
                  style={{ borderRadius: "var(--radius-papel)" }}
                >
                  <Image
                    src={evento.imagenHorario.src}
                    alt={evento.imagenHorario.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="section-bg-bosque page-pad-x py-14 text-crema sm:px-8 lg:py-20">
          <Reveal className="mx-auto max-w-[76rem]">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-etiqueta uppercase tracking-[0.17em] text-crema/70">
                  28 NOV · SAN NICOLÁS
                </p>
                <h2 className="mt-3 max-w-[42rem] text-[clamp(2.2rem,4.8vw,4rem)] font-light leading-[1.02] tracking-[-0.035em] text-crema">
                  The Mindful Hangout
                </h2>
                <p className="mt-3 firma-trazo text-[1.25rem] text-lima">
                  Segunda edición
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <TrackedReservationButton
                  href={reserva}
                  eventKey={evento.id}
                  className="pildora-clara"
                >
                  Reservar mi lugar
                </TrackedReservationButton>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
