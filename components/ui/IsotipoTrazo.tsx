import type { CSSProperties } from "react";

/**
 * El isotipo de InnerFlow redibujado como paths de línea central,
 * con stroke grueso y puntas redondas, igual que el trazo de plumón
 * del original. Al ser strokes, el preloader y el Respirador pueden
 * dibujarlo con stroke-dasharray.
 *
 * Coordenadas medidas sobre el PNG original (lienzo 2084x2084)
 * con scripts/medir-isotipo.mjs, no calcadas a ojo.
 */

export const TRAZOS_ISOTIPO = [
  /* aura izquierda */
  "M 755 175 C 585 215, 468 355, 466 545 C 464 720, 540 895, 638 1000",
  /* aura derecha */
  "M 1210 180 C 1372 220, 1490 360, 1490 548 C 1490 715, 1418 925, 1338 1030",
  /* torso y piernas: un solo trazo continuo que termina bajo el cruce */
  "M 966 1115 C 978 1230, 984 1330, 956 1428 C 935 1495, 850 1520, 760 1528 C 620 1540, 470 1495, 400 1560 C 335 1630, 345 1745, 450 1805 C 540 1852, 680 1850, 790 1810 C 900 1772, 1000 1710, 1120 1622 C 1240 1535, 1400 1480, 1520 1520 C 1640 1560, 1700 1640, 1688 1720 C 1670 1830, 1560 1905, 1440 1906 C 1330 1907, 1240 1870, 1185 1822",
] as const;

/* La cabeza es un anillo elíptico grueso; el hueco es transparente */
const CABEZA = { cx: 966, cy: 632, rx: 173, ry: 214, grosor: 160 };

export const GROSOR_TRAZO = 160;

type Props = {
  className?: string;
  style?: CSSProperties;
  /** Etiqueta accesible. Si se omite, el SVG es decorativo. */
  titulo?: string;
  /**
   * Progreso de dibujado de 0 a 1. Con 1 (default) el isotipo está
   * completo. Valores menores dibujan el trazo parcialmente,
   * para el preloader.
   */
  dibujado?: number;
};

export function IsotipoTrazo({
  className,
  style,
  titulo,
  dibujado = 1,
}: Props) {
  const oculto = titulo ? undefined : true;
  return (
    <svg
      viewBox="0 0 2084 2084"
      className={className}
      style={style}
      aria-hidden={oculto}
      role={titulo ? "img" : undefined}
      aria-label={titulo}
      fill="none"
    >
      {TRAZOS_ISOTIPO.map((d) => (
        <path
          key={d.slice(0, 24)}
          d={d}
          stroke="currentColor"
          strokeWidth={GROSOR_TRAZO}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - dibujado}
        />
      ))}
      <ellipse
        cx={CABEZA.cx}
        cy={CABEZA.cy}
        rx={CABEZA.rx}
        ry={CABEZA.ry}
        stroke="currentColor"
        strokeWidth={CABEZA.grosor}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - dibujado}
      />
    </svg>
  );
}
