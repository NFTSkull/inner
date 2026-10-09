import type { Experiencia } from "@/lib/data/experiencias";

/**
 * Precio para UI: preferir priceLabel factual del documento,
 * luego precioDesde (Club / montos numericos).
 */
export function precioExperiencia(e: Experiencia): string | undefined {
  if (e.priceLabel) return e.priceLabel;
  if (e.precioDesde != null) {
    return `Desde $${e.precioDesde} MXN`;
  }
  return undefined;
}