import "server-only";

import { OPENAI_ADS_PIXEL_ID } from "@/lib/openai-ads";

const OPENAI_CONVERSIONS_ENDPOINT = "https://bzr.openai.com/v1/events";

export type OpenAIConversionInput = {
  eventId: string;
  sourceUrl: string;
  timestampMs?: number;
  oppref?: string;
  validateOnly?: boolean;
};

type OpenAIConversionsResponse = {
  ok: boolean;
  status: number;
  body: unknown;
};

/**
 * Enviar SOLO después de una confirmación real de registro.
 * La API key vive exclusivamente en OPENAI_CONVERSIONS_API_KEY.
 *
 * Si la misma conversión también se envía por Pixel, reutiliza eventId
 * para que OpenAI pueda deduplicar browser + server.
 */
export async function enviarRegistroCompletadoOpenAI(
  input: OpenAIConversionInput
): Promise<OpenAIConversionsResponse> {
  const apiKey = process.env.OPENAI_CONVERSIONS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Falta OPENAI_CONVERSIONS_API_KEY; no se puede reportar registration_completed."
    );
  }

  const payload = {
    validate_only: input.validateOnly ?? false,
    events: [
      {
        id: input.eventId,
        type: "registration_completed",
        timestamp_ms: input.timestampMs ?? Date.now(),
        source_url: input.sourceUrl,
        action_source: "web",
        ...(input.oppref ? { oppref: input.oppref } : {}),
        data: {
          type: "customer_action",
        },
      },
    ],
  };

  const response = await fetch(
    OPENAI_CONVERSIONS_ENDPOINT +
      "?pid=" +
      encodeURIComponent(OPENAI_ADS_PIXEL_ID),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const texto = await response.text();
  let body: unknown = null;
  if (texto) {
    try {
      body = JSON.parse(texto);
    } catch {
      body = texto;
    }
  }

  if (!response.ok) {
    throw new Error(
      "OpenAI Conversions API respondió " +
        response.status +
        ": " +
        (texto || "sin cuerpo")
    );
  }

  return { ok: true, status: response.status, body };
}
