"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { CirculoAMano } from "@/components/ui/CirculoAMano";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";
import {
  HORARIOS,
  MES_CALENDARIO,
  SESIONES,
  enlaceReservaDia,
  horaDeSesion,
  type Modalidad,
} from "@/lib/data/sesiones";

/**
 * La tarjeta del flyer: hoja de papel con dobleces, encabezados
 * D L M M J V S y círculos trazados a mano sobre los días con
 * sesión, dibujados en cascada cuando la hoja entra al viewport.
 */

const ENCABEZADOS = [
  ["D", "domingo"],
  ["L", "lunes"],
  ["M", "martes"],
  ["M", "miércoles"],
  ["J", "jueves"],
  ["V", "viernes"],
  ["S", "sábado"],
] as const;

const DIAS_SEMANA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

export function Calendario() {
  const hojaRef = useRef<HTMLDivElement>(null);
  const enVista = useInView(hojaRef, { once: true, margin: "-15% 0px" });
  const [diaActivo, setDiaActivo] = useState<number | null>(null);

  const modalidadDe = useMemo(() => {
    const mapa = new Map<number, Modalidad>();
    SESIONES.presencial.forEach((d) => mapa.set(d, "presencial"));
    SESIONES.online.forEach((d) => mapa.set(d, "online"));
    return mapa;
  }, []);

  /* Orden de dibujado de los círculos: cronológico, 80ms entre cada uno */
  const ordenDibujo = useMemo(() => {
    const dias = [...modalidadDe.keys()].sort((a, b) => a - b);
    return new Map(dias.map((d, i) => [d, i]));
  }, [modalidadDe]);

  const semanas = useMemo(() => {
    const celdas: (number | null)[] = [
      ...Array.from({ length: MES_CALENDARIO.primerDia }, () => null),
      ...Array.from({ length: MES_CALENDARIO.dias }, (_, i) => i + 1),
    ];
    while (celdas.length % 7 !== 0) celdas.push(null);
    const filas: (number | null)[][] = [];
    for (let i = 0; i < celdas.length; i += 7) {
      filas.push(celdas.slice(i, i + 7));
    }
    return filas;
  }, []);

  const detalle = diaActivo ? modalidadDe.get(diaActivo) : undefined;

  return (
    <section
      id="calendario"
      aria-label="Calendario de sesiones"
      className="scroll-mt-24 bg-arena-hondo px-5 py-28 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <TituloTrazo
            texto={`${MES_CALENDARIO.nombre} en el club`}
            etiqueta="h2"
            className="text-display-l text-tinta"
          />
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_240px]">
          <Reveal>
            <div
              ref={hojaRef}
              className="tarjeta-papel px-5 py-8 sm:px-10 sm:py-10"
            >
              <table className="w-full border-separate border-spacing-y-1 text-center">
                <caption className="display-trazo mb-6 text-titulo text-tinta">
                  {MES_CALENDARIO.nombre} {MES_CALENDARIO.anio}
                </caption>
                <thead>
                  <tr>
                    {ENCABEZADOS.map(([letra, nombre], i) => (
                      <th
                        key={i}
                        scope="col"
                        className="text-etiqueta pb-3 font-normal uppercase tracking-[0.14em] text-tinta-suave"
                      >
                        <abbr title={nombre} className="no-underline">
                          {letra}
                        </abbr>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {semanas.map((semana, s) => (
                    <tr key={s}>
                      {semana.map((dia, d) => {
                        if (!dia) return <td key={d} aria-hidden="true" />;
                        const modalidad = modalidadDe.get(dia);
                        if (!modalidad) {
                          return (
                            <td
                              key={d}
                              className="numero-tabular py-2 text-cuerpo text-tinta-suave/70"
                            >
                              {dia}
                            </td>
                          );
                        }
                        const orden = ordenDibujo.get(dia) ?? 0;
                        const activo = diaActivo === dia;
                        return (
                          <td key={d} className="py-2">
                            <button
                              type="button"
                              onClick={() =>
                                setDiaActivo(activo ? null : dia)
                              }
                              onMouseEnter={() => setDiaActivo(dia)}
                              aria-expanded={activo}
                              aria-label={`${DIAS_SEMANA[d]} ${dia}, meditación ${modalidad}, ${horaDeSesion(dia)}. Ver detalle`}
                              className={`numero-tabular relative mx-auto flex h-11 w-11 items-center justify-center text-cuerpo font-normal text-tinta transition-transform duration-[400ms] ease-[var(--ease-respiro)] motion-reduce:transition-none ${activo ? "scale-110" : ""}`}
                            >
                              {dia}
                              <CirculoAMano
                                variante={((orden % 3) as 0 | 1 | 2)}
                                dibujado={enVista}
                                retrasoMs={orden * 80}
                                grosor={8}
                                className={`absolute inset-0 h-full w-full ${
                                  modalidad === "presencial"
                                    ? "text-azul-hondo"
                                    : "text-salvia-hondo"
                                }`}
                              />
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Leyenda */}
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-tinta/10 pt-6">
                <p className="flex items-center gap-2 text-cuerpo text-tinta-suave">
                  <CirculoAMano
                    variante={0}
                    dibujado={enVista}
                    retrasoMs={900}
                    grosor={9}
                    className="h-4 w-5 text-azul-hondo"
                  />
                  meditación presencial
                </p>
                <p className="flex items-center gap-2 text-cuerpo text-tinta-suave">
                  <CirculoAMano
                    variante={1}
                    dibujado={enVista}
                    retrasoMs={980}
                    grosor={9}
                    className="h-4 w-5 text-salvia-hondo"
                  />
                  meditación online
                </p>
              </div>

              {/* Detalle del día */}
              <div className="min-h-[92px]" aria-live="polite">
                <AnimatePresence mode="wait">
                  {diaActivo && detalle && (
                    <motion.div
                      key={diaActivo}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: DURACION.corta,
                        ease: EASE_RESPIRO,
                      }}
                      className="mt-6 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-cuerpo-l text-tinta">
                          {
                            DIAS_SEMANA[
                              new Date(
                                MES_CALENDARIO.anio,
                                MES_CALENDARIO.mes,
                                diaActivo
                              ).getDay()
                            ]
                          }{" "}
                          {diaActivo} · {horaDeSesion(diaActivo)}
                        </p>
                        <p className="flex items-center gap-2 text-cuerpo font-normal text-tinta">
                          <span
                            aria-hidden="true"
                            className={`inline-block h-2.5 w-2.5 rounded-full ${
                              detalle === "presencial"
                                ? "bg-azul-hondo"
                                : "bg-salvia-hondo"
                            }`}
                          />
                          {detalle === "presencial"
                            ? `Presencial · ${HORARIOS.presencial.lugar}`
                            : `Online · ${HORARIOS.online.lugar}`}
                        </p>
                      </div>
                      <Boton
                        href={enlaceReservaDia(diaActivo, detalle)}
                        externo
                        className="!px-6 !py-2.5"
                      >
                        Reservar este día
                      </Boton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Nota lateral */}
          <Reveal indice={1}>
            <aside className="lg:pt-10">
              <p className="display-trazo -rotate-2 text-titulo text-tinta-suave">
                Domingo 10am
              </p>
              <p className="display-trazo mt-3 rotate-1 text-titulo text-tinta-suave">
                Martes y Jueves 8pm
              </p>
              <p className="text-cuerpo mt-8 max-w-[26ch] text-tinta">
                Toca cualquier día con círculo para ver el detalle y
                reservar.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
