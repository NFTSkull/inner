"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

/**
 * Qué esperar de una sesión, en palabras que cualquiera entiende.
 * Las líneas se encienden con el scroll. La sección más importante
 * después del hero.
 */

const ESTROFAS: string[][] = [
  [
    "Medirtar no hace

    "Que tus probelmas desaparezcan.",
    "pero si muede cambiar la manera en la que los atraviesas."
.",
  ],
  [
    "Te sientas, cierras los ojos, y alguien te va guiando.",
    "Cuarenta y cinco minutos. Luego sigues tu día.",
    "La primera vez se siente raro. A la tercera, ya no.",
  ],
];

const TODAS_LAS_LINEAS = ESTROFAS.flat();
const TOTAL_PALABRAS = TODAS_LAS_LINEAS.join(" ").split(" ").length;

export function Manifiesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.5"],
  });

  let indicePalabra = 0;
  let indiceLinea = 0;

  return (
    <section
      ref={ref}
      aria-label="Qué esperar de una sesión"
      className="px-5 py-28 sm:px-8 sm:py-36"
    >
      <div className="mx-auto max-w-3xl">
        {ESTROFAS.map((estrofa, e) => (
          <div key={e} className={e > 0 ? "mt-12" : ""}>
            {estrofa.map((linea) => {
              const li = indiceLinea++;
              const palabras = linea.split(" ");
              const desde = indicePalabra;
              indicePalabra += palabras.length;
              return (
                <Linea
                  key={li}
                  palabras={palabras}
                  desde={desde}
                  progreso={scrollYProgress}
                  reducir={!!reducir}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function Linea({
  palabras,
  desde,
  progreso,
  reducir,
}: {
  palabras: string[];
  desde: number;
  progreso: ReturnType<typeof useScroll>["scrollYProgress"];
  reducir: boolean;
}) {
  /* La línea se desplaza 12px cuando sus palabras empiezan a encenderse */
  const inicio = desde / TOTAL_PALABRAS;
  const fin = (desde + palabras.length) / TOTAL_PALABRAS;
  const y = useTransform(progreso, [inicio, fin], [12, 0]);

  return (
    <motion.p
      style={reducir ? undefined : { y }}
      className="text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-[1.6] text-tinta"
    >
      {palabras.map((palabra, i) => (
        <Palabra
          key={i}
          texto={palabra}
          indice={desde + i}
          progreso={progreso}
          reducir={reducir}
        />
      ))}
    </motion.p>
  );
}

function Palabra({
  texto,
  indice,
  progreso,
  reducir,
}: {
  texto: string;
  indice: number;
  progreso: ReturnType<typeof useScroll>["scrollYProgress"];
  reducir: boolean;
}) {
  const punto = indice / TOTAL_PALABRAS;
  const opacity = useTransform(
    progreso,
    [punto, Math.min(punto + 2.5 / TOTAL_PALABRAS, 1)],
    [0.16, 1]
  );

  return (
    <motion.span style={reducir ? undefined : { opacity }}>
      {texto}{" "}
    </motion.span>
  );
}
