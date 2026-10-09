/**
 * Pruebas del calendario público: filtros, orden y estado de las
 * sesiones reales del Club. Espejo de lib/calendarioPublico.ts
 * (sin inventar eventos abiertos).
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  estadoSesion,
  leer,
  mesActivo,
  mty,
  proximasSesiones,
  sesionesClub,
} from "./espejo-club.mjs";

const EVENTOS = [];

function itemDesdeClub(s, ahora) {
  const online = s.modalidad === "online";
  const estado = estadoSesion(s, ahora);
  return {
    id: s.id,
    inicio: s.inicio.getTime(),
    estado,
    filtros: online ? ["meditacion", "online"] : ["meditacion"],
    categoryLabel: online ? "Meditación · Online" : "Meditación · Presencial",
    ...(estado === "proxima" ? { ctaHref: "wa.me" } : {}),
  };
}

function itemsCalendario(ahora) {
  const mes = mesActivo(ahora);
  const delMes = sesionesClub().filter(
    (s) => mes && s.anio === mes.anio && s.mes === mes.mes
  );
  const club = [
    ...proximasSesiones(ahora),
    ...delMes.filter((s) => estadoSesion(s, ahora) === "realizada"),
  ].map((s) => itemDesdeClub(s, ahora));
  const porInicio = (a, b) => a.inicio - b.inicio;
  const todos = [...EVENTOS, ...club];
  return [
    ...todos.filter((i) => i.estado === "proxima").sort(porInicio),
    ...todos.filter((i) => i.estado === "realizada").sort(porInicio),
  ];
}

function filtrar(items, filtro) {
  if (filtro === "todos") return items;
  return items.filter((item) => item.filtros.includes(filtro));
}

const AHORA = mty("2026-10-09T12:00:00");

describe("calendario público", () => {
  it("no inventa eventos abiertos", () => {
    assert.equal(EVENTOS.length, 0);
    assert.match(leer("lib/data/eventos.ts"), /export const EVENTOS[^=]*= \[\];/);
  });

  it("incluye las 13 sesiones de octubre (próximas + realizadas del mes)", () => {
    assert.equal(itemsCalendario(AHORA).length, 13);
  });

  it("primero las próximas en orden ascendente, luego las realizadas", () => {
    const items = itemsCalendario(AHORA);
    const proximas = items.filter((i) => i.estado === "proxima");
    assert.equal(proximas.length, 7);
    assert.ok(items.slice(0, 7).every((i) => i.estado === "proxima"));
    assert.ok(proximas.every((s, i) => i === 0 || proximas[i - 1].inicio < s.inicio));
    assert.equal(items[0].id, "club-2026-10-11-casa-zenia");
  });

  it("las realizadas no ofrecen reserva", () => {
    const realizadas = itemsCalendario(AHORA).filter((i) => i.estado === "realizada");
    assert.equal(realizadas.length, 6);
    assert.ok(realizadas.every((i) => !i.ctaHref));
  });

  it("filtro meditación cubre presencial y online", () => {
    assert.equal(filtrar(itemsCalendario(AHORA), "meditacion").length, 13);
  });

  it("filtro online solo sesiones en línea", () => {
    const items = filtrar(itemsCalendario(AHORA), "online");
    assert.equal(items.length, 4);
    assert.ok(items.every((i) => i.id.endsWith("-online")));
  });

  it("filtro movimiento y eventos quedan vacíos sin dataset", () => {
    assert.equal(filtrar(itemsCalendario(AHORA), "movimiento").length, 0);
    assert.equal(filtrar(itemsCalendario(AHORA), "eventos").length, 0);
  });

  it("el código real ordena por instante y quita la reserva a lo realizado", () => {
    const fuente = leer("lib/calendarioPublico.ts");
    assert.match(fuente, /sort\(porInicio\)/);
    assert.match(fuente, /estado === "proxima"\s*\?\s*\{\s*ctaTexto/);
    assert.doesNotMatch(fuente, /MES_CALENDARIO|SESIONES\.presencial/);
    assert.match(
      leer("components/ui/EventCard.tsx"),
      /!realizada && ctaTexto && ctaHref/
    );
  });
});
