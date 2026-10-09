/**
 * Pruebas del calendario del Meditation Club.
 * Datos reales (SESIONES_CLUB leído de lib/data/sesiones.ts) + espejo
 * de la lógica de lib/data/proxima-sesion.ts.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FUENTE_PROXIMA,
  FUENTE_SESIONES,
  SESIONES_CLUB,
  instanteLocal,
  mensajeReserva,
  mesActivo,
  mty,
  proximasSesiones as proximas,
  sesionesClub,
} from "./espejo-club.mjs";

describe("datos de octubre 2026", () => {
  const ESPERADAS = [
    ["2026-10-01", "20:00", "online"],
    ["2026-10-02", "10:00", "oh-my-core"],
    ["2026-10-04", "10:00", "casa-zenia"],
    ["2026-10-06", "20:00", "casa-zenia"],
    ["2026-10-08", "20:00", "online"],
    ["2026-10-09", "10:00", "oh-my-core"],
    ["2026-10-11", "10:00", "casa-zenia"],
    ["2026-10-20", "20:00", "casa-zenia"],
    ["2026-10-22", "20:00", "online"],
    ["2026-10-23", "10:00", "oh-my-core"],
    ["2026-10-25", "10:00", "casa-zenia"],
    ["2026-10-27", "20:00", "casa-zenia"],
    ["2026-10-29", "20:00", "online"],
  ];

  it("son exactamente las 13 sesiones publicadas, sin inventar fechas", () => {
    assert.deepEqual(
      SESIONES_CLUB.map((s) => [s.fecha, s.hora, s.sede]),
      ESPERADAS
    );
  });

  it("no hay fechas duplicadas", () => {
    const fechas = SESIONES_CLUB.map((s) => s.fecha);
    assert.equal(new Set(fechas).size, fechas.length);
  });

  it("no quedan sesiones de septiembre ni del calendario anterior", () => {
    assert.ok(SESIONES_CLUB.every((s) => s.fecha.startsWith("2026-10-")));
    assert.doesNotMatch(FUENTE_SESIONES, /MES_CALENDARIO|Septiembre|horaDeSesion/);
  });

  it("el patrón (vie/dom 10:00, mar/jue 20:00) se cumple pero no genera fechas", () => {
    for (const s of sesionesClub()) {
      const manana = s.diaSemana === 5 || s.diaSemana === 0;
      const noche = s.diaSemana === 2 || s.diaSemana === 4;
      assert.ok(manana || noche, `${s.fecha} cae fuera del patrón`);
      assert.equal(s.horaTexto, manana ? "10:00 a. m." : "8:00 p. m.");
    }
    assert.doesNotMatch(FUENTE_PROXIMA, /getDay\(\)\s*===|diaSemana\s*===/);
  });

  it("cada sede usa su token de color", () => {
    assert.match(FUENTE_SESIONES, /"casa-zenia": \{ texto: "text-azul-hondo"/);
    assert.match(FUENTE_SESIONES, /"oh-my-core": \{ texto: "text-tierra"/);
    assert.match(FUENTE_SESIONES, /online: \{ texto: "text-salvia-hondo"/);
  });
});

describe("instantes en America/Monterrey", () => {
  it("20:00 del 1 de octubre es 02:00 UTC del día siguiente", () => {
    assert.equal(
      instanteLocal("2026-10-01", "20:00").toISOString(),
      "2026-10-02T02:00:00.000Z"
    );
  });

  it("10:00 del 25 de octubre es 16:00 UTC (sin horario de verano)", () => {
    assert.equal(
      instanteLocal("2026-10-25", "10:00").toISOString(),
      "2026-10-25T16:00:00.000Z"
    );
  });

  it("la lógica real compara instantes, no cadenas", () => {
    assert.match(FUENTE_PROXIMA, /inicio\.getTime\(\) >= ahora\.getTime\(\)/);
    assert.match(FUENTE_PROXIMA, /ZONA_HORARIA = "America\/Monterrey"/);
  });
});

describe("próximas sesiones", () => {
  it("se ordenan ascendente y excluyen las pasadas", () => {
    const lista = proximas(mty("2026-10-09T09:00:00"));
    assert.equal(lista[0].fecha, "2026-10-09");
    assert.ok(lista.every((s, i) => i === 0 || lista[i - 1].inicio < s.inicio));
    assert.equal(lista.length, 8);
  });

  it("una sesión que empieza justo ahora sigue siendo próxima", () => {
    assert.equal(proximas(mty("2026-10-09T10:00:00"))[0].fecha, "2026-10-09");
    assert.equal(proximas(mty("2026-10-09T10:00:01"))[0].fecha, "2026-10-11");
  });

  it("del 12 al 19 no hay sesiones: la siguiente es el martes 20", () => {
    assert.equal(proximas(mty("2026-10-15T12:00:00"))[0].fecha, "2026-10-20");
  });

  it("después de la última, no hay próximas y el mes activo sigue siendo octubre", () => {
    const ahora = mty("2026-10-29T20:00:01");
    assert.equal(proximas(ahora).length, 0);
    assert.deepEqual(mesActivo(ahora), { anio: 2026, mes: 10 });
  });

  it("el mes activo sale de los datos", () => {
    assert.deepEqual(mesActivo(mty("2026-09-20T12:00:00")), { anio: 2026, mes: 10 });
  });
});

describe("mensaje de reserva", () => {
  const de = (fecha) => sesionesClub().find((s) => s.fecha === fecha);

  it("presencial incluye sede, día, fecha y hora", () => {
    assert.equal(
      mensajeReserva(de("2026-10-25")),
      "Hola, quiero reservar mi lugar para Meditation Club en Casa Zenia el domingo 25 de octubre a las 10:00 a. m."
    );
    assert.equal(
      mensajeReserva(de("2026-10-23")),
      "Hola, quiero reservar mi lugar para Meditation Club en Oh my core! el viernes 23 de octubre a las 10:00 a. m."
    );
  });

  it("online lo indica sin sede física", () => {
    assert.equal(
      mensajeReserva(de("2026-10-29")),
      "Hola, quiero reservar mi lugar para Meditation Club online el jueves 29 de octubre a las 8:00 p. m."
    );
  });

  it("usa el helper único de WhatsApp", () => {
    assert.match(FUENTE_PROXIMA, /return enlaceReserva\(mensajeReserva\(sesion\)\)/);
  });
});
