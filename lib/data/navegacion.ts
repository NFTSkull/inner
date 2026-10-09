/**
 * Navegación multipágina.
 * Barra: Experiencias · Calendario · Meditation Club · Conóceme · Hablemos
 * Experiencias abre submapa (dropdown / overlay).
 */

import { RUTAS } from "@/lib/data/rutas";

export type EnlaceNav = {
  href: string;
  texto: string;
  enabled?: boolean;
  hijos?: readonly EnlaceNav[];
};

/** Submapa bajo Experiencias. */
export const ENLACES_EXPERIENCIAS: readonly EnlaceNav[] = [
  {
    href: RUTAS.sesionesPrivadas,
    texto: "Sesiones privadas",
    enabled: true,
  },
  {
    href: RUTAS.celebraciones,
    texto: "Celebraciones",
    enabled: true,
  },
  {
    href: RUTAS.empresasColegios,
    texto: "Empresas y colegios",
    enabled: true,
  },
  {
    href: RUTAS.eventosComunidad,
    texto: "Eventos y comunidad",
    enabled: true,
  },
];

/** Barra primaria (desktop + filas del menú móvil). */
export const ENLACES_PRIMARIOS: readonly EnlaceNav[] = [
  {
    href: RUTAS.experiencias,
    texto: "Experiencias",
    enabled: true,
    hijos: ENLACES_EXPERIENCIAS,
  },
  { href: RUTAS.calendario, texto: "Calendario", enabled: true },
  {
    href: RUTAS.club,
    texto: "Meditation Club",
    enabled: true,
    hijos: [
      {
        href: `${RUTAS.club}#calendario`,
        texto: "Calendario del Club",
        enabled: true,
      },
      {
        href: `${RUTAS.club}#precios`,
        texto: "Membresía",
        enabled: true,
      },
    ],
  },
  { href: RUTAS.conoceme, texto: "Conóceme", enabled: true },
];

/**
 * Menú móvil: destinos de experiencia + resto de la barra + contacto.
 * No incluye Recursos (pendiente en el documento).
 */
export const ENLACES_OVERLAY: readonly EnlaceNav[] = [
  { href: RUTAS.calendario, texto: "Calendario", enabled: true },
  { href: RUTAS.club, texto: "Meditation Club", enabled: true },
  { href: RUTAS.conoceme, texto: "Conóceme", enabled: true },
  { href: RUTAS.contacto, texto: "Hablemos", enabled: true },
];

/** Stubs de fase 2: no se renderizan mientras enabled sea false. */
export const ENLACES_FASE2: readonly EnlaceNav[] = [
  { href: "/recursos", texto: "Recursos", enabled: false },
  { href: "/cursos", texto: "Cursos", enabled: false },
  { href: "/blog", texto: "Blog", enabled: false },
];

export const ENLACES_NAV: readonly EnlaceNav[] = ENLACES_PRIMARIOS;

export function enlacesActivos(
  items: readonly EnlaceNav[] = ENLACES_NAV
): EnlaceNav[] {
  return items.filter((item) => item.enabled !== false);
}
