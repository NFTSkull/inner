"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";

/**
 * Firma visual de Inner Flow: trazo orgánico que cambia de carácter
 * según el contexto (hero, calma, energía, estructura, conexión).
 */

export type VarianteFlowLine =
  | "hero"
  | "calm"
  | "energy"
  | "structure"
  | "connect";

type Props = {
  variante?: VarianteFlowLine;
  className?: string;
};

const PATHS: Record<VarianteFlowLine, string> = {
  hero: "M 8 62 C 48 18, 92 108, 148 48 C 198 4, 248 78, 312 42 C 360 18, 402 58, 432 36",
  calm: "M 40 80 C 40 28, 200 8, 220 80 C 240 152, 400 172, 400 80 C 400 28, 240 8, 220 80",
  energy:
    "M 6 70 C 36 20, 58 110, 96 44 C 128 0, 156 96, 198 38 C 232 0, 268 88, 310 48 C 348 16, 392 72, 434 40",
  structure:
    "M 12 78 L 78 28 L 148 78 L 218 28 L 288 78 L 358 28 L 428 78",
  connect:
    "M 10 90 C 90 90, 90 20, 170 20 C 250 20, 250 90, 330 90 C 380 90, 410 55, 430 40",
};

export function FlowLine({
  variante = "hero",
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const d = PATHS[variante];
  const lento = variante === "calm" || variante === "hero";

  return (
    <svg
      viewBox="0 0 440 160"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none overflow-visible text-tinta ${className}`}
      fill="none"
    >
      {reduce ? (
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={variante === "structure" ? 2.4 : 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.28}
        />
      ) : lento ? (
        <path
          d={d}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.28}
          className="respira-lento origin-center"
          style={{ transformBox: "fill-box" }}
        />
      ) : (
        <motion.path
          d={d}
          stroke="currentColor"
          strokeWidth={variante === "structure" ? 2.4 : 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.28}
          initial={{ pathLength: 0.92, pathOffset: 0 }}
          animate={{
            pathLength: [0.92, 1, 0.92],
            pathOffset: variante === "energy" ? [0, 0.04, 0] : [0, 0.02, 0],
          }}
          transition={{
            duration:
              variante === "energy"
                ? DURACION.velo * 2
                : DURACION.velo * 3,
            ease: EASE_RESPIRO,
            repeat: Infinity,
          }}
        />
      )}
    </svg>
  );
}
