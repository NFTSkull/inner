"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Índice entre hermanos: escalona 90ms por posición */
  indice?: number;
  /** Segundos extra de retraso */
  retraso?: number;
};

/**
 * Reveal de scroll: opacidad 0 a 1 y 16px de desplazamiento,
 * una sola vez, en el tiempo de inhalar corto.
 */
export function Reveal({
  children,
  className,
  indice = 0,
  retraso = 0,
}: Props) {
  const reducir = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducir ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: DURACION.corta,
        ease: EASE_RESPIRO,
        delay: retraso + indice * 0.09,
      }}
    >
      {children}
    </motion.div>
  );
}
