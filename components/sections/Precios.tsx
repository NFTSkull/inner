import { Reveal } from "@/components/motion/Reveal";
import { CirculoAMano } from "@/components/ui/CirculoAMano";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import Link from "next/link";
import {
  MEMBRESIAS,
  NOTA_PRECIOS,
  SUELTAS,
  formatearPrecio,
  type Renglon,
} from "@/lib/data/precios";

/**
 * Membresía y sesiones sueltas. Renglones con puntos guía y, al
 * pasar el cursor, un círculo a mano alzada alrededor del precio.
 */

function Fila({ renglon, variante }: { renglon: Renglon; variante: 0 | 1 | 2 }) {
  return (
    <div className="group relative py-4">
      {renglon.recomendada && (
        <p
          aria-hidden="true"
          className="display-trazo pointer-events-none absolute -top-4 right-2 rotate-[8deg] text-[1.05rem] lowercase text-azul-hondo sm:left-full sm:right-auto sm:top-1/2 sm:ml-8 sm:w-40 sm:-translate-y-1/2 sm:leading-[1.25]"
          style={{ textTransform: "lowercase" }}
        >
          la que más eligen
        </p>
      )}
      <div className="flex items-baseline gap-3">
        <span className="text-cuerpo-l font-normal text-tinta">
          {renglon.nombre}
          {renglon.recomendada && (
            <span className="sr-only"> (la membresía que más eligen)</span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="mx-1 flex-1 -translate-y-[0.3em] border-b-[2.5px] border-dotted border-tinta/25"
        />
        <span className="numero-tabular relative text-cuerpo-l text-tinta">
          {formatearPrecio(renglon.precio)}
          <CirculoAMano
            variante={variante}
            dibujado={renglon.recomendada ? true : undefined}
            grosor={7}
            className="absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] text-azul-hondo"
          />
        </span>
      </div>
      {renglon.detalle && (
        <p className="text-cuerpo mt-0.5 max-w-[34ch] text-tinta-suave">
          {renglon.detalle}
        </p>
      )}
    </div>
  );
}

export function Precios() {
  return (
    <section
      id="precios"
      aria-label="Membresía"
      className="scroll-mt-24 px-5 py-28 sm:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <TituloTrazo
            texto="Membresía"
            etiqueta="h2"
            className="text-display-l text-tinta"
          />
          <p className="text-cuerpo-l mt-4 max-w-xl text-tinta-suave">
            Empieza con una sesión suelta si quieres probar. La
            membresía es para quedarte.
          </p>
        </Reveal>

        <Reveal indice={1}>
          <div className="tarjeta-papel relative mt-12 px-7 py-10 sm:px-12 sm:py-14">
            <h3 className="text-etiqueta uppercase text-tinta-suave">
              Sesiones sueltas
            </h3>
            <div className="mt-2">
              {SUELTAS.map((renglon, i) => (
                <Fila
                  key={renglon.nombre}
                  renglon={renglon}
                  variante={(i % 3) as 0 | 1 | 2}
                />
              ))}
            </div>

            <h3 className="text-etiqueta mt-10 uppercase text-tinta-suave">
              Membresías mensuales
            </h3>
            <div className="mt-2">
              {MEMBRESIAS.map((renglon, i) => (
                <Fila
                  key={renglon.nombre}
                  renglon={renglon}
                  variante={((i + 2) % 3) as 0 | 1 | 2}
                />
              ))}
            </div>

            <p className="text-etiqueta mt-12 uppercase leading-relaxed text-tinta-suave">
              {NOTA_PRECIOS}
            </p>
            <p className="mt-3">
              <Link
                href="/politicas"
                className="enlace-plumon text-etiqueta uppercase text-tinta-suave"
              >
                Políticas y privacidad
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
