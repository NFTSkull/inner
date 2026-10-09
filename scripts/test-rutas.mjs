/**
 * Pruebas de arquitectura multipágina: rutas canónicas + legacy.
 * Espejo de lib/data/rutas.ts (sin inventar rutas).
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const RUTAS = {
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
};

const REDIRECTS_LEGACY = [
  { source: "/sesiones-privadas", destination: RUTAS.sesionesPrivadas },
  { source: "/eventos-privados", destination: RUTAS.celebraciones },
  { source: "/empresas-colegios", destination: RUTAS.empresasColegios },
  { source: "/comunidad", destination: RUTAS.eventosComunidad },
];

describe("rutas multipagina", () => {
  it("home es portal, no hub de servicios", () => {
    assert.equal(RUTAS.home, "/");
    assert.notEqual(RUTAS.sesionesPrivadas, RUTAS.home);
    assert.ok(RUTAS.sesionesPrivadas.startsWith("/experiencias/"));
  });

  it("hub de experiencias existe como ruta propia", () => {
    assert.equal(RUTAS.experiencias, "/experiencias");
  });

  it("club conserva /club", () => {
    assert.equal(RUTAS.club, "/club");
  });

  it("recursos no está en el mapa canónico", () => {
    assert.equal("recursos" in RUTAS, false);
  });

  it("legacy redirige a canónicas", () => {
    assert.equal(REDIRECTS_LEGACY.length, 4);
    for (const r of REDIRECTS_LEGACY) {
      assert.notEqual(r.source, r.destination);
      assert.ok(r.destination.startsWith("/"));
    }
  });
});
