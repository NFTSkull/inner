/**
 * Precios de membresía y sesiones sueltas. Editable: los montos
 * viven aquí, no en el JSX. Precios en MXN.
 */

export type Renglon = {
  nombre: string;
  detalle?: string;
  precio: number;
  /** true en la membresía que más eligen */
  recomendada?: boolean;
};

export const SUELTAS: readonly Renglon[] = [
  { nombre: "Meditación presencial", detalle: "individual", precio: 180 },
  { nombre: "Meditación online", detalle: "individual", precio: 150 },
];

export const MEMBRESIAS: readonly Renglon[] = [
  {
    nombre: "Presencia",
    detalle: "4 meditaciones presenciales al mes",
    precio: 600,
  },
  {
    nombre: "Presencia profunda",
    detalle: "6 meditaciones presenciales al mes",
    precio: 780,
  },
  {
    nombre: "Desde casa",
    detalle: "4 meditaciones online al mes",
    precio: 480,
  },
  {
    nombre: "Inner Flow",
    detalle: "4 presenciales + 4 online al mes",
    precio: 990,
    recomendada: true,
  },
  {
    nombre: "Experiencia completa",
    detalle: "6 presenciales + 4 online al mes",
    precio: 1150,
  },
];

export const NOTA_PRECIOS =
  "Precios en MXN. Las membresías son personales y vigentan en septiembre de 2026. Los pagos no son reembolsables.";

export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString("en-US")}`;
}
