"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/motion/LenisProvider";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";
import { Boton } from "@/components/ui/Boton";
import { CICLO, DURACION, EASE_RESPIRO, RESPIRO } from "@/lib/breath";

/**
 * El Respirador: un minuto de respiración guiada en el compás 4-4-6.
 * Cuatro ciclos, 56 segundos. El anillo es el reloj, no hay números.
 * Al terminar: "Eso fue un minuto. Una sesión del club dura
 * de 50 a 60 minutos." Ese momento es el que convierte.
 */

type Fase = "velo" | "inhala" | "sosten" | "exhala" | "final";

const CICLOS_TOTALES = 4;

const GUIA: Record<string, string> = {
  inhala: "inhala",
  sosten: "sostén",
  exhala: "exhala",
};

type Props = {
  abierto: boolean;
  alCerrar: () => void;
};

export function Respirador({ abierto, alCerrar }: Props) {
  const [fase, setFase] = useState<Fase>("velo");
  const [ciclo, setCiclo] = useState(1);
  const reducir = useReducedMotion();
  const lenis = useLenis();
  const dialogoRef = useRef<HTMLDivElement>(null);
  const terminadoRef = useRef(false);

  /* Al abrir: velo de 1.2s, bloquear scroll, foco al diálogo */
  useEffect(() => {
    if (!abierto) return;
    setFase("velo");
    setCiclo(1);
    terminadoRef.current = false;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    dialogoRef.current?.focus();

    const t = setTimeout(() => setFase("inhala"), DURACION.velo * 1000);
    return () => {
      clearTimeout(t);
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [abierto, lenis]);

  /* La máquina de estados del compás */
  useEffect(() => {
    if (!abierto || fase === "velo" || fase === "final") return;

    const duracion =
      fase === "inhala"
        ? RESPIRO.inhalar
        : fase === "sosten"
          ? RESPIRO.sostener
          : RESPIRO.exhalar;

    const t = setTimeout(() => {
      if (fase === "inhala") setFase("sosten");
      else if (fase === "sosten") setFase("exhala");
      else if (ciclo >= CICLOS_TOTALES) {
        terminadoRef.current = true;
        setFase("final");
      } else {
        setCiclo((c) => c + 1);
        setFase("inhala");
      }
    }, duracion * 1000);

    return () => clearTimeout(t);
  }, [abierto, fase, ciclo]);

  /* Esc cierra desde cualquier estado */
  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") alCerrar();
      if (e.key === "Tab") {
        /* trampa de foco: los pocos focusables viven en el diálogo */
        const foco = dialogoRef.current?.querySelectorAll<HTMLElement>(
          "button, a[href]"
        );
        if (!foco || foco.length === 0) return;
        const primero = foco[0];
        const ultimo = foco[foco.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto, alCerrar]);

  /* Al cerrar después de terminar, el scroll cae en precios */
  const cerrarYSeguir = () => {
    const terminado = terminadoRef.current;
    alCerrar();
    if (terminado) {
      setTimeout(() => {
        const precios = document.querySelector("#precios");
        if (!precios) return;
        if (lenis) lenis.scrollTo(precios as HTMLElement, { offset: -72 });
        else precios.scrollIntoView();
      }, 600);
    }
  };

  /* Animación del isotipo: escala en el compás. Con reduced motion
     no escala: respira con opacidad. */
  const animacionIsotipo = reducir
    ? {
        inhala: { opacity: 1 },
        sosten: { opacity: 1 },
        exhala: { opacity: 0.45 },
        velo: { opacity: 0.45 },
        final: { opacity: 1 },
      }
    : {
        inhala: { scale: 1.35 },
        sosten: { scale: 1.35 },
        exhala: { scale: 1 },
        velo: { scale: 1 },
        final: { scale: 1 },
      };

  const duracionFase =
    fase === "inhala"
      ? RESPIRO.inhalar
      : fase === "exhala"
        ? RESPIRO.exhalar
        : DURACION.corta;

  const enCompas = fase === "inhala" || fase === "sosten" || fase === "exhala";

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          ref={dialogoRef}
          role="dialog"
          aria-modal="true"
          aria-label="Respira un minuto conmigo, ejercicio guiado"
          tabIndex={-1}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-arena px-6 outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURACION.velo, ease: EASE_RESPIRO }}
          onClick={cerrarYSeguir}
        >
          <button
            type="button"
            onClick={cerrarYSeguir}
            className="text-etiqueta absolute right-5 top-5 uppercase text-tinta-suave transition-colors duration-[400ms] hover:text-tinta sm:right-8 sm:top-7"
          >
            Salir
          </button>

          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {fase !== "final" ? (
              <>
                <div className="relative h-[min(64vmin,480px)] w-[min(64vmin,480px)]">
                  {/* El anillo es el reloj: se dibuja en 14 segundos */}
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full -rotate-90"
                    aria-hidden="true"
                    fill="none"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48.5"
                      stroke="var(--color-tinta)"
                      strokeWidth="0.6"
                      opacity="0.14"
                    />
                    {enCompas && (
                      <motion.circle
                        key={ciclo}
                        cx="50"
                        cy="50"
                        r="48.5"
                        stroke="var(--color-azul-hondo)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: CICLO, ease: "linear" }}
                      />
                    )}
                  </svg>

                  <motion.div
                    className="absolute inset-[17%]"
                    variants={animacionIsotipo}
                    animate={fase}
                    transition={{
                      duration: duracionFase,
                      ease: EASE_RESPIRO,
                    }}
                  >
                    <IsotipoTrazo className="h-full w-full text-tinta" />
                  </motion.div>
                </div>

                <div
                  className="mt-8 h-[3.2rem] text-center"
                  aria-live="polite"
                >
                  <AnimatePresence mode="wait">
                    {enCompas && (
                      <motion.p
                        key={fase}
                        className="display-trazo text-titulo lowercase text-tinta"
                        style={{ textTransform: "lowercase" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: DURACION.corta,
                          ease: EASE_RESPIRO,
                        }}
                      >
                        {GUIA[fase]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-etiqueta mt-4 uppercase text-tinta-suave">
                  {enCompas ? `ciclo ${ciclo} de ${CICLOS_TOTALES}` : "\u00a0"}
                </p>
              </>
            ) : (
              <motion.div
                className="flex max-w-xl flex-col items-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: DURACION.velo, ease: EASE_RESPIRO }}
              >
                <TituloFinal />
                <p className="text-cuerpo-l mt-6 text-tinta-suave">
                  Una sesión del club dura de 50 a 60 minutos.
                </p>
                <div className="mt-10">
                  <Boton variante="primario" onClick={cerrarYSeguir}>
                    Reservar mi primera sesión
                  </Boton>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TituloFinal() {
  return (
    <h2 className="display-trazo text-display-l text-tinta">
      Eso fue un minuto.
    </h2>
  );
}
