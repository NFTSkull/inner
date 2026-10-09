/**
 * Rutas canónicas del ecosistema multipágina.
 * Las URLs legacy redirigen vía next.config.ts.
 */

export const RUTAS = {
  home: "/",
  experiencias: "/experiencias",
  sesionesPrivadas: "/experiencias/sesiones-privadas",
  celebraciones: "/experiencias/celebraciones",
  empresasColegios: "/empresas-y-colegios",
  eventosComunidad: "/eventos-y-comunidad",
  calendario: "/calendario",
  club: "/club",
  conoceme: "/conoceme",
  contacto: "/contacto",
  politicas: "/politicas",
} as const;

/** Legacy → canónica (fuente de verdad para redirects). */
export const REDIRECTS_LEGACY: readonly {
  source: string;
  destination: string;
}[] = [
  {
    source: "/sesiones-privadas",
    destination: RUTAS.sesionesPrivadas,
  },
  {
    source: "/eventos-privados",
    destination: RUTAS.celebraciones,
  },
  {
    source: "/empresas-colegios",
    destination: RUTAS.empresasColegios,
  },
  {
    source: "/comunidad",
    destination: RUTAS.eventosComunidad,
  },
] as const;
