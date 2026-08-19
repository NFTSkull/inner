import type { CSSProperties } from "react";

/**
 * Círculo trazado a mano, como los del flyer del calendario.
 * Son paths irregulares con overshoot, no un circle perfecto.
 * Hay tres variantes para que dos círculos juntos nunca se vean
 * sellados con el mismo troquel.
 *
 * Se dibuja con stroke-dasharray: en modo hover lo dispara el
 * .group padre por CSS; en modo controlado, la prop dibujado.
 */

const VARIANTES = [
  "M 68 10 C 32 2, 6 24, 8 52 C 10 82, 40 98, 64 92 C 90 85, 98 60, 90 38 C 82 16, 60 6, 44 12",
  "M 40 8 C 12 18, 2 44, 10 66 C 18 90, 52 100, 74 88 C 94 77, 100 50, 88 30 C 76 10, 48 2, 34 12",
  "M 74 18 C 94 34, 100 62, 84 80 C 66 99, 30 98, 14 78 C 0 60, 4 30, 24 16 C 44 3, 68 8, 80 22",
] as const;

type Props = {
  variante?: 0 | 1 | 2;
  className?: string;
  /** Modo controlado: true dibuja, false borra. Si se omite, manda el hover del .group padre. */
  dibujado?: boolean;
  /** Retraso del trazo en ms, para escalonar círculos vecinos */
  retrasoMs?: number;
  grosor?: number;
};

export function CirculoAMano({
  variante = 0,
  className = "",
  dibujado,
  retrasoMs = 0,
  grosor = 7,
}: Props) {
  const controlado = dibujado !== undefined;

  const estilo: CSSProperties = {
    strokeDashoffset: controlado ? (dibujado ? 0 : 1) : undefined,
    transitionDelay: retrasoMs ? `${retrasoMs}ms` : undefined,
  };

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none overflow-visible ${className}`}
      fill="none"
    >
      <path
        d={VARIANTES[variante]}
        stroke="currentColor"
        strokeWidth={grosor}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        style={estilo}
        className={`circulo-trazo ${
          controlado
            ? ""
            : "group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0]"
        }`}
      />
    </svg>
  );
}
