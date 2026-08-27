"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";
import { useEsMovil } from "@/lib/viewport";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Índice entre hermanos: escalona 90ms por posición */
  indice?: number;
  /** Segundos extra de retraso */
  retraso?: number;
};

/**
 * Reveal de scroll. En desktop no cambia.
 * En móvil: un poco más lento y no se salta por reduce-motion
 * del SO (en iPhone suele dejar todo “en seco”).
 */
export function Reveal({
  children,
  className,
  indice = 0,
  retraso = 0,
}: Props) {
  const reducir = useReducedMotion();
  const esMovil = useEsMovil();
  const sinAnimar = !!reducir && !esMovil;

  return (
    <motion.div
      className={className}
      initial={sinAnimar ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: esMovil ? "0px 0px -4% 0px" : "0px 0px -8% 0px",
      }}
      transition={{
        duration: esMovil ? DURACION.larga : DURACION.corta,
        ease: EASE_RESPIRO,
        delay: retraso + indice * (esMovil ? 0.11 : 0.09),
      }}
    >
      {children}
    </motion.div>
  );
}
