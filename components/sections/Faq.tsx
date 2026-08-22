"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TituloTrazo } from "@/components/ui/TituloTrazo";

/**
 * Acordeón de preguntas. El contenido se despliega en 600ms,
 * el tiempo de exhalar. El indicador es un trazo de plumón que
 * rota, no un chevron de librería.
 */

const PREGUNTAS = [
  {
    pregunta: "¿Y si nunca he meditado?",
    respuesta:
      "Perfecto. La mitad del grupo tampoco había meditado antes de venir. Todas las sesiones son guiadas de principio a fin.",
  },
  {
    pregunta: "¿Cuánto dura una sesión?",
    respuesta: "De 50 a 60 minutos.",
  },
  {
    pregunta: "¿Puedo ir a una sola antes de comprometerme?",
    respuesta:
      "Sí. Una sesión suelta cuesta $180 presencial y $150 online.",
  },
  {
    pregunta: "¿Qué pasa si no puedo ir a una sesión de mi membresía?",
    respuesta:
      "Avísanos al menos 9 horas antes. Si hay cupo en otra fecha de septiembre, se puede reponer. Con menos de 9 horas, o si no avisas, la sesión se da por usada. Las online son solo en vivo: si no te conectas, no hay reposición.",
  },
  {
    pregunta: "¿Tengo que sentarme en el piso?",
    respuesta:
      "No. Puedes sentarte en silla o en el piso. Si eliges el piso, trae tu tapete o cojín. Lo importante es que la espalda esté cómoda.",
  },
] as const;

export function Faq() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section aria-label="Preguntas frecuentes" className="px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <TituloTrazo
            texto="Preguntas"
            etiqueta="h2"
            className="text-display-l text-tinta"
          />
        </Reveal>

        <div className="mt-10">
          {PREGUNTAS.map((item, i) => {
            const estaAbierta = abierta === i;
            return (
              <Reveal key={i} indice={i}>
                <div className="border-b border-tinta/12">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAbierta(estaAbierta ? null : i)}
                      aria-expanded={estaAbierta}
                      aria-controls={`respuesta-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-cuerpo-l font-normal text-tinta">
                        {item.pregunta}
                      </span>
                      {/* Trazo de plumón que rota: + a raya */}
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-tinta-suave transition-transform duration-[600ms] ease-[var(--ease-respiro)] motion-reduce:transition-none ${
                          estaAbierta ? "rotate-[135deg]" : ""
                        }`}
                        fill="none"
                      >
                        <path
                          d="M 12 3.5 C 11.6 9, 12.4 15, 12 20.5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 3.5 12 C 9 11.6, 15 12.4, 20.5 12"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`respuesta-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-[600ms] ease-[var(--ease-respiro)] motion-reduce:transition-none ${
                      estaAbierta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-cuerpo-l max-w-[56ch] pb-7 text-tinta-suave">
                        {item.respuesta}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
