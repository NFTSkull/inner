/**
 * Conflictos y politicas de contenido tras integrar
 * "Restructuración página web" (DOCX en Downloads).
 *
 * El documento SI se encontro. Precios de sesiones, celebraciones
 * y empresas vienen del DOCX. Club sigue anclado a precios.ts.
 */

export const CONFLICTOS_CONTENIDO = {
  documentoRestructuracionEncontrado: true,
  documentoBuscado: "Restructuración página web",
  documentoRuta:
    "/Users/grecovillanuevaortiz/Downloads/Restructuración página web.docx",
  nota:
    "Documento DOCX integrado. Club conserva precios.ts. Celebraciones: discrepancia narrativo vs tabla visual en adicionales (ver celebracionesPrecios).",
  fuentesValidas: [
    "Restructuración página web.docx",
    "lib/data/precios.ts",
    "lib/data/sesiones.ts",
    "lib/data/experiencias.ts → CELEBRACIONES_PRECIOS",
  ] as const,
  celebracionesPrecios: {
    contradiccionTabla: true,
    requiereRevisionManual: true,
    motivo:
      "Texto narrativo: Move & Connect adicional $150; Celebración Inner Flow adicional $200. Una tabla visual del mismo documento muestra montos distintos. UI usa valores narrativos (CELEBRACIONES_PRECIOS.*.usadoEnUi) hasta confirmación manual. No sobrescribir en silencio.",
    valoresNarrativos: {
      moveConnectAdicional: 150,
      celebracionInnerFlowAdicional: 200,
    },
    fuenteDatos: "lib/data/experiencias.ts → CELEBRACIONES_PRECIOS",
  } as const,
  noPublicar: [
    {
      id: "TESTIMONIAL",
      motivo:
        'Plantilla del documento con placeholder "Nombre o inicial". No es testimonio verificado.',
    },
    {
      id: "CALENDARIO_EJEMPLO",
      motivo:
        "Bloque EJEMPLO del documento (15 SEP / Visualización y cuencos). Es plantilla de diseno, no fecha publicada.",
    },
  ] as const,
  pendienteHastaDatoReal: [
    "fechas concretas de eventos abiertos (plantillas en el DOCX)",
    "colaboraciones del mes (placeholders en el DOCX)",
    "RECURSOS (marcado pendiente en el documento)",
    "confirmar adicionales de celebraciones (narrativo vs tabla)",
  ] as const,
} as const;
