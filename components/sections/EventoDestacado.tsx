import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { HorarioEvento } from "@/components/ui/HorarioEvento";
import { NombreEvento } from "@/components/ui/NombreEvento";
import {
  enlaceReservaEvento,
  fechaEvento,
  rangoEvento,
  type Evento,
} from "@/lib/data/eventos";

export function EventoDestacado({ evento }: { evento: Evento }) {
  const meta = [
    { etiqueta: "Fecha", valor: fechaEvento(evento) },
    {
      etiqueta: "Horario",
      valor: evento.horaInicio && rangoEvento(evento.horaInicio, evento.horaFin),
    },
    { etiqueta: "Lugar", valor: evento.ubicacion },
  ].filter((m): m is { etiqueta: string; valor: string } => !!m.valor);

  return (
    <section
      aria-labelledby={`evento-${evento.id}`}
      className="bg-papel page-pad-x py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[76rem] gap-9 lg:grid-cols-12 lg:items-start lg:gap-14">
        {evento.imagen && (
          <Reveal className="lg:order-2 lg:col-span-7">
            <Link
              href={evento.detalleHref ?? "#"}
              className="group relative block aspect-[4/5] overflow-hidden bg-white shadow-papel sm:aspect-[7/5]"
              style={{ borderRadius: "var(--radius-papel)" }}
              aria-label={`Conocer ${evento.nombre}`}
            >
              <Image
                src={evento.imagen.src}
                alt={evento.imagen.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-respiro)] group-hover:scale-[1.018] motion-reduce:transition-none"
              />
            </Link>
          </Reveal>
        )}

        <Reveal indice={1} className="lg:order-1 lg:col-span-5">
          <p className="flex items-center gap-2.5 text-etiqueta uppercase text-tinta-suave">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-salvia-doc" />
            Próximo encuentro
          </p>
          <h2
            id={`evento-${evento.id}`}
            className="mt-4 text-[clamp(2.6rem,5vw,4rem)] leading-[0.98] font-light tracking-[-0.035em] text-tinta"
          >
            <NombreEvento nombre={evento.nombre} />
          </h2>
          {evento.intencion && (
            <p className="mt-2 firma-trazo text-[1.25rem] text-salvia-hondo">
              {evento.intencion}
            </p>
          )}

          {evento.tags && (
            <div className="mt-6 flex flex-wrap gap-2">
              {evento.tags.map((tag, i) => {
                const clases = [
                  "border-tierra/30 text-tierra",
                  "border-salvia-doc/40 text-salvia-hondo",
                  "border-cielo/80 text-bosque",
                ];
                return (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1.5 text-etiqueta font-normal ${clases[i % clases.length]}`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          <dl className="mt-7 border-t border-tinta/12">
            {meta.map((m) => (
              <div
                key={m.etiqueta}
                className="flex flex-col gap-0.5 border-b border-tinta/12 py-3 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <dt className="shrink-0 text-etiqueta uppercase text-tinta-suave sm:w-[4.75rem]">
                  {m.etiqueta}
                </dt>
                <dd className="numero-tabular text-cuerpo-l text-tinta">{m.valor}</dd>
              </div>
            ))}
          </dl>

          {evento.descripcion && (
            <p className="mt-6 max-w-[30rem] text-cuerpo-l text-tinta-suave">
              {evento.descripcion}
            </p>
          )}

          {evento.detalleHref && (
            <p className="mt-5">
              <Link
                href={evento.detalleHref}
                className="enlace-plumon text-cuerpo font-normal text-tinta"
              >
                Conocer el evento →
              </Link>
            </p>
          )}

          <div className="mt-8">
            <HorarioEvento
              ctaTexto={evento.ctaTexto ?? "Reservar mi lugar"}
              enlace={enlaceReservaEvento(evento)}
              eventKey={evento.id}
              agenda={evento.agenda}
              imagenHorario={evento.imagenHorario}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
