"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { CirculoAMano } from "@/components/ui/CirculoAMano";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";
import {
  enlaceReservaSesion,
  estadoSesion,
  mesActivo,
  mesesConSesiones,
  sesionesDelMes,
  type SesionProgramada,
} from "@/lib/data/proxima-sesion";
import {
  COLOR_SEDE,
  HORARIOS_CLUB,
  ORDEN_SEDES,
  SEDES,
} from "@/lib/data/sesiones";
import { useAhora } from "@/lib/useAhora";

/**
 * La tarjeta del flyer: hoja de papel con dobleces, encabezados
 * D L M M J V S y círculos trazados a mano sobre los días con
 * sesión, dibujados en cascada cuando la hoja entra al viewport.
 * Mes, días y estado salen de las fechas reales del calendario.
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

export function Calendario({ ahoraISO }: { ahoraISO: string }) {
  const ahora = useAhora(ahoraISO);
  const hojaRef = useRef<HTMLDivElement>(null);
  const enVista = useInView(hojaRef, { once: true, margin: "-15% 0px" });
  const [diaActivo, setDiaActivo] = useState<number | null>(null);

  const claveMes = mesActivo(ahora)?.clave ?? null;
  const mes = useMemo(
    () => mesesConSesiones().find((m) => m.clave === claveMes) ?? null,
    [claveMes]
  );

  const sesionDe = useMemo(() => {
    const mapa = new Map<number, SesionProgramada>();
    if (mes) sesionesDelMes(mes).forEach((s) => mapa.set(s.dia, s));
    return mapa;
  }, [mes]);

  /* Orden de dibujado de los círculos: cronológico, 80ms entre cada uno */
  const ordenDibujo = useMemo(
    () => new Map([...sesionDe.keys()].map((d, i) => [d, i])),
    [sesionDe]
  );

  const semanas = useMemo(() => {
    if (!mes) return [];
    const celdas: (number | null)[] = [
      ...Array.from({ length: mes.primerDia }, () => null),
      ...Array.from({ length: mes.dias }, (_, i) => i + 1),
    ];
    while (celdas.length % 7 !== 0) celdas.push(null);
    const filas: (number | null)[][] = [];
    for (let i = 0; i < celdas.length; i += 7) {
      filas.push(celdas.slice(i, i + 7));
    }
    return filas;
  }, [mes]);

  if (!mes) return null;

  const detalle = diaActivo ? sesionDe.get(diaActivo) : undefined;
  const detalleRealizada = detalle
    ? estadoSesion(detalle, ahora) === "realizada"
    : false;

  return (
    <section
      id="calendario"
      aria-label="Calendario de sesiones"
      className="scroll-mt-24 bg-arena-hondo px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <TituloTrazo
            texto={`${mes.nombre} en el club`}
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
                  {mes.nombre} {mes.anio}
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
                        const sesion = sesionDe.get(dia);
                        if (!sesion) {
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
                        const realizada =
                          estadoSesion(sesion, ahora) === "realizada";
                        return (
                          <td key={d} className="py-2">
                            <button
                              type="button"
                              onClick={() =>
                                setDiaActivo(activo ? null : dia)
                              }
                              onMouseEnter={() => setDiaActivo(dia)}
                              aria-expanded={activo}
                              aria-label={`${DIAS_SEMANA[sesion.diaSemana]} ${dia}, ${sesion.horaTexto}, ${sesion.modalidad === "online" ? "online" : sesion.lugar}${realizada ? ", sesión realizada" : ""}, ver detalle`}
                              className={`numero-tabular relative mx-auto flex h-11 w-11 items-center justify-center text-cuerpo font-normal transition-transform duration-[400ms] ease-[var(--ease-respiro)] motion-reduce:transition-none ${realizada ? "text-tinta-suave/70" : "text-tinta"} ${activo ? "scale-110" : ""}`}
                            >
                              {dia}
                              <CirculoAMano
                                variante={((orden % 3) as 0 | 1 | 2)}
                                dibujado={enVista}
                                retrasoMs={orden * 80}
                                grosor={8}
                                className={`absolute inset-0 h-full w-full ${COLOR_SEDE[sesion.sede].texto} ${realizada ? "opacity-35" : ""}`}
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
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-tinta/10 pt-6">
                {ORDEN_SEDES.map((id, i) => (
                  <li
                    key={id}
                    className="flex items-center gap-2 text-cuerpo text-tinta-suave"
                  >
                    <CirculoAMano
                      variante={((i % 3) as 0 | 1 | 2)}
                      dibujado={enVista}
                      retrasoMs={900 + i * 80}
                      grosor={9}
                      className={`h-4 w-5 ${COLOR_SEDE[id].texto}`}
                    />
                    {SEDES[id].nombre} · {SEDES[id].zona}
                  </li>
                ))}
              </ul>

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
                          {DIAS_SEMANA[detalle.diaSemana]} {detalle.dia} ·{" "}
                          {detalle.horaTexto}
                        </p>
                        <p className="flex items-center gap-2 text-cuerpo font-normal text-tinta">
                          <span
                            aria-hidden="true"
                            className={`inline-block h-2.5 w-2.5 rounded-full ${COLOR_SEDE[detalle.sede].fondo}`}
                          />
                          {detalle.modalidad === "online"
                            ? `Online · ${detalle.lugar}`
                            : `Presencial · ${detalle.lugar}`}
                        </p>
                      </div>
                      {detalleRealizada ? (
                        <p className="text-etiqueta uppercase tracking-[0.14em] text-tinta-suave">
                          Sesión realizada
                        </p>
                      ) : (
                        <Boton
                          href={enlaceReservaSesion(detalle)}
                          externo
                          className="!px-6 !py-2.5"
                        >
                          Reservar este día
                        </Boton>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Nota lateral */}
          <Reveal indice={1}>
            <aside className="lg:pt-10">
              {HORARIOS_CLUB.map((linea, i) => (
                <p
                  key={linea}
                  className={`display-trazo text-titulo text-tinta-suave ${i === 0 ? "-rotate-2" : "mt-3 rotate-1"}`}
                >
                  {linea}
                </p>
              ))}
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
