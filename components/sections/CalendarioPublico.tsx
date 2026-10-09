"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventCard } from "@/components/ui/EventCard";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";
import {
  filtrarItems,
  itemsCalendario,
  type ItemCalendario,
} from "@/lib/calendarioPublico";
import {
  CALENDARIO_COPY,
  FILTROS_CALENDARIO,
  type FiltroCalendarioId,
} from "@/lib/data/eventos";
import { enlaceReserva } from "@/lib/data/sesiones";
import { useAhora } from "@/lib/useAhora";

const AVISO_WHATSAPP = enlaceReserva(
  "Hola, avísame cuando haya nuevas fechas en el calendario de Inner Flow."
);

export function CalendarioPublico({ ahoraISO }: { ahoraISO: string }) {
  const ahora = useAhora(ahoraISO);
  const [filtro, setFiltro] = useState<FiltroCalendarioId>("todos");
  const todos = useMemo(() => itemsCalendario(ahora), [ahora]);
  const visibles = useMemo(
    () => filtrarItems(todos, filtro),
    [todos, filtro]
  );

  return (
    <div>
      <LayoutGroup>
        <div
          role="tablist"
          aria-label="Filtrar calendario"
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {FILTROS_CALENDARIO.map((f) => {
            const activo = filtro === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activo}
                onClick={() => setFiltro(f.id)}
                className={`relative px-4 py-2 text-etiqueta uppercase tracking-[0.12em] transition-colors duration-[var(--dur-corta)] ease-[var(--ease-respiro)] ${
                  activo ? "text-tinta" : "text-tinta-suave hover:text-tinta"
                }`}
              >
                {activo && (
                  <motion.span
                    layoutId="filtro-calendario"
                    className="absolute inset-0 border border-tinta/25 bg-papel"
                    style={{ borderRadius: "var(--radius-papel)" }}
                    transition={{
                      duration: DURACION.corta,
                      ease: EASE_RESPIRO,
                    }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

          <div className="mt-8">
        <AnimatePresence mode="wait">
          {visibles.length === 0 ? (
            <motion.div
              key={`vacio-${filtro}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DURACION.corta, ease: EASE_RESPIRO }}
            >
              <EmptyState
                title={CALENDARIO_COPY.vacioTitulo}
                body={
                  filtro === "todos"
                    ? CALENDARIO_COPY.vacioTexto
                    : "No hay fechas en este filtro por ahora. Prueba otro o mira el Meditation Club."
                }
                primary={{
                  texto: "Conocer Meditation Club",
                  href: "/club",
                }}
                secondary={{
                  texto: "Volver a comunidad",
                  href: "/eventos-y-comunidad",
                }}
              />
              <p className="mt-6 text-center text-cuerpo text-tinta-suave">
                <a
                  href={AVISO_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-plumon font-normal"
                >
                  Avisarme por WhatsApp
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.ul
              key={`lista-${filtro}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DURACION.corta, ease: EASE_RESPIRO }}
              className="space-y-2.5"
            >
              {visibles.map((item, i) => (
                <li key={item.id}>
                  <TarjetaItem
                    item={item}
                    conFuente={item.fuente !== visibles[i - 1]?.fuente}
                    primero={i === 0}
                  />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TarjetaItem({
  item,
  conFuente,
  primero,
}: {
  item: ItemCalendario;
  conFuente: boolean;
  primero: boolean;
}) {
  return (
    <div>
      {item.fuente && conFuente && (
        <p
          className={`mb-3 text-etiqueta uppercase tracking-[0.12em] text-tinta-suave ${primero ? "" : "pt-6"}`}
        >
          {item.fuente}
        </p>
      )}
      <EventCard
        name={item.name}
        intention={item.intention}
        description={item.description}
        day={item.day}
        month={item.month}
        startTime={item.startTime}
        location={item.location}
        category={item.categoryLabel}
        ctaTexto={item.ctaTexto}
        ctaHref={item.ctaHref}
        ctaExterno={item.ctaExterno}
        realizada={item.estado === "realizada"}
      />
    </div>
  );
}
