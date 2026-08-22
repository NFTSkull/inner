/**
 * El grano del papel. Un solo nodo fijo para todo el sitio,
 * generado con feTurbulence. Nada de imágenes de grano descargadas.
 */
export function Grano() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] h-full w-full opacity-[0.16] mix-blend-multiply"
    >
      <filter id="grano-papel" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="2"
          stitchTiles="stitch"
          result="ruido"
        />
        <feColorMatrix in="ruido" type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grano-papel)" />
    </svg>
  );
}
