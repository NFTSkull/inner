/**
 * Cliente mínimo para OpenAI Ads Measurement Pixel.
 * El Pixel ID es público; nunca pongas la API key de Conversions API aquí.
 */

export const OPENAI_ADS_PIXEL_ID = "QWJNvVSpHeLx5yCHcmxXus";

export type OpenAIAdsBrowserEvent =
  | "lead_created"
  | "registration_completed"
  | "contents_viewed";

type Oaiq = (
  command: "measure",
  eventName: OpenAIAdsBrowserEvent,
  data: { type: "customer_action" },
  options?: { event_id?: string }
) => void;

declare global {
  interface Window {
    oaiq?: Oaiq;
  }
}

function limpiarPrefijo(valor: string): string {
  return valor
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function crearOpenAIEventId(prefijo: string): string {
  const base = limpiarPrefijo(prefijo) || "inner-flow";
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now()) + "-" + Math.random().toString(36).slice(2);
  return base + "-" + id;
}

export function medirOpenAIAds(
  eventName: OpenAIAdsBrowserEvent,
  eventId: string
): void {
  if (typeof window === "undefined" || !window.oaiq) return;
  window.oaiq(
    "measure",
    eventName,
    { type: "customer_action" },
    { event_id: eventId }
  );
}

/**
 * Abrir el flujo de reserva por WhatsApp es intención de contacto,
 * no una reserva confirmada. Por eso se mide como lead_created.
 */
export function medirLeadReserva(contexto: string): string {
  const eventId = crearOpenAIEventId("lead-" + contexto);
  medirOpenAIAds("lead_created", eventId);
  return eventId;
}
