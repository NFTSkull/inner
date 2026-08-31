/**
 * Pruebas del contador de próxima sesión (algoritmo espejo de
 * lib/data/proxima-sesion.ts). Corre con: npm test
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const ANIO = 2026;
const MES = 8; // septiembre

function pad(n) {
  return String(n).padStart(2, "0");
}

function diaSemana(dia) {
  return new Date(Date.UTC(ANIO, MES, dia, 12)).getUTCDay();
}

function fechaDeSesion(dia) {
  const hora = diaSemana(dia) === 0 ? 10 : 20;
  return new Date(
    `${ANIO}-${pad(MES + 1)}-${pad(dia)}T${pad(hora)}:00:00-06:00`
  );
}

function listar(diasPorModalidad) {
  const items = [];
  for (const [modalidad, dias] of Object.entries(diasPorModalidad)) {
    for (const dia of dias) {
      items.push({ dia, modalidad, fecha: fechaDeSesion(dia) });
    }
  }
  return items.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
}

function proxima(lista, ahora) {
  const t = ahora.getTime();
  return lista.find((s) => s.fecha.getTime() > t) ?? null;
}

function formatearRestante(ms) {
  if (ms <= 0) return "empezando…";
  const dias = Math.floor(ms / 86400000);
  const horas = Math.floor((ms % 86400000) / 3600000);
  const minutos = Math.floor((ms % 3600000) / 60000);
  const segundos = Math.floor((ms % 60000) / 1000);
  if (dias > 0) {
    return `faltan ${dias} ${dias === 1 ? "día" : "días"} ${horas} ${horas === 1 ? "hora" : "horas"}`;
  }
  if (horas > 0) {
    return `faltan ${horas} ${horas === 1 ? "hora" : "horas"} ${minutos} min`;
  }
  if (minutos > 0) {
    return `faltan ${minutos} min ${segundos} s`;
  }
  return `faltan ${segundos} s`;
}

const SESIONES = {
  presencial: [1, 6, 15, 22, 27, 29],
  online: [3, 10, 17, 24],
};

describe("fechaDeSesion", () => {
  it("1 sep 2026 es martes 20:00 Monterrey", () => {
    assert.equal(diaSemana(1), 2);
    assert.equal(fechaDeSesion(1).toISOString(), "2026-09-02T02:00:00.000Z");
  });

  it("6 sep 2026 es domingo 10:00 Monterrey", () => {
    assert.equal(diaSemana(6), 0);
    assert.equal(fechaDeSesion(6).toISOString(), "2026-09-06T16:00:00.000Z");
  });

  it("3 sep 2026 es jueves 20:00 Monterrey", () => {
    assert.equal(diaSemana(3), 4);
    assert.equal(fechaDeSesion(3).toISOString(), "2026-09-04T02:00:00.000Z");
  });
});

describe("proximaSesion", () => {
  const lista = listar(SESIONES);

  it("ordena el mes cronológicamente", () => {
    assert.deepEqual(
      lista.map((s) => s.dia),
      [1, 3, 6, 10, 15, 17, 22, 24, 27, 29]
    );
  });

  it("el 27 ago apunta al 1 sep presencial", () => {
    const ahora = new Date("2026-08-27T10:35:00-06:00");
    const sig = proxima(lista, ahora);
    assert.ok(sig);
    assert.equal(sig.dia, 1);
    assert.equal(sig.modalidad, "presencial");
  });

  it("al pasar el 1 sep salta al 3 online", () => {
    const ahora = new Date("2026-09-01T20:00:01-06:00");
    const sig = proxima(lista, ahora);
    assert.ok(sig);
    assert.equal(sig.dia, 3);
    assert.equal(sig.modalidad, "online");
  });

  it("después de la última del mes no hay siguiente", () => {
    const ahora = new Date("2026-09-29T20:00:01-06:00");
    assert.equal(proxima(lista, ahora), null);
  });
});

describe("formatearRestante", () => {
  it("formatea días y horas", () => {
    assert.equal(formatearRestante(2 * 86400000 + 3 * 3600000), "faltan 2 días 3 horas");
  });

  it("formatea minutos cercanos", () => {
    assert.equal(formatearRestante(5 * 60000 + 12 * 1000), "faltan 5 min 12 s");
  });
});

describe("enlaceReserva WhatsApp", () => {
  const WHATSAPP = "528132608095";

  function enlaceReserva(mensaje) {
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  }

  it("abre wa.me con el número de Monterrey", () => {
    const url = enlaceReserva(
      "Hola, quiero reservar una sesión del Meditation Club Inner Flow."
    );
    assert.match(url, /^https:\/\/wa\.me\/528132608095\?text=/);
    assert.ok(url.includes(encodeURIComponent("Inner Flow")));
  });

  it("incluye día y modalidad en el mensaje del calendario", () => {
    const mensaje =
      "Hola, quiero reservar la sesión del Martes 1 de septiembre a las 8:00 pm (presencial).";
    const url = enlaceReserva(mensaje);
    assert.ok(decodeURIComponent(url).includes("Martes 1 de septiembre"));
    assert.ok(decodeURIComponent(url).includes("presencial"));
  });
});
