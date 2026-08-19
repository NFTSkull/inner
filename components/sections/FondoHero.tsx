import Image from "next/image";

/**
 * Fondo del hero: la sala de Casa Zenia, con velo de arena
 * para que la tinta del copy se lea.
 */
export function FondoHero() {
  return (
    <div
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/lugar.JPG"
        alt=""
        fill
        priority
        sizes="100vw"
        className="media-hero"
      />
      <div className="absolute inset-0 bg-arena/40 mix-blend-multiply" />
      <div className="velo-hero absolute inset-0" />
    </div>
  );
}
