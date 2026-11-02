/**
 * Pruebas del calendario público: filtros, orden y estado de las
 * sesiones reales del Club + eventos abiertos confirmados.
 * Espejo de lib/calendarioPublico.ts y lib/data/eventos.ts; los datos
 * del evento se leen del código fuente real.
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  estadoSesion,
  instanteLocal,
  leer,
  mesActivo,
  mty,
  proximasSesiones,
  sesionesClub,
} from "./espejo-club.mjs";

const FUENTE_EVENTOS = leer("lib/data/eventos.ts");

function eventosDeFuente() {
  const desde = FUENTE_EVENTOS.indexOf("export const EVENTOS");
  const lista = FUENTE_EVENTOS.slice(desde, FUENTE_EVENTOS.indexOf("\n];", desde));
  return lista
    .split(/\n  \{\n/)
    .slice(1)
    .map((b) => `\n${b}`)
    .map((bloque) => {
      const campo = (k) => new RegExp(`\\n    ${k}: "([^"]*)"`).exec(bloque)?.[1];
      return {
        id: campo("id"),
        nombre: campo("nombre"),
        descripcion: campo("descripcion"),
        fecha: campo("fecha"),
        horaInicio: campo("horaInicio"),
        horaFin: campo("horaFin"),
        ubicacion: campo("ubicacion"),
        modalidad: campo("modalidad"),
        categoria: campo("categoria"),
        intencion: campo("intencion"),
        detalleHref: campo("detalleHref"),
        agenda: Array.from(
          bloque.matchAll(
            /\{ nombre: "([^"]+)", inicio: "(\d{2}:\d{2})"(?:, fin: "(\d{2}:\d{2})")? \}/g
          ),
          ([, nombre, inicio, fin]) => ({ nombre, inicio, fin })
        ),
        imagenes: Array.from(bloque.matchAll(/src: "([^"]+)"/g), (m) => m[1]),
      };
    });
}

const EVENTOS = eventosDeFuente();

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function horaEvento(hora) {
  const [h, min] = hora.split(":").map(Number);
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function fechaLarga(fecha) {
  const [a, m, d] = fecha.split("-").map(Number);
  const dia = DIAS[new Date(Date.UTC(a, m - 1, d, 12)).getUTCDay()];
  return `${dia[0].toUpperCase()}${dia.slice(1)}, ${d} de ${MESES[m - 1]} de ${a}`;
}

function mensajeReservaEvento(e) {
  const partes = [`Hola, quiero reservar mi lugar para ${e.nombre}`];
  if (e.fecha) partes.push(`el ${fechaLarga(e.fecha).replace(",", "").toLowerCase()}`);
  if (e.horaInicio) {
    partes.push(
      e.horaFin
        ? `de ${horaEvento(e.horaInicio)} a ${horaEvento(e.horaFin)}`
        : `a las ${horaEvento(e.horaInicio)}`
    );
  }
  if (e.ubicacion) partes.push(`en ${e.ubicacion}`);
  const mensaje = partes.join(" ");
  return mensaje.endsWith(".") ? mensaje : `${mensaje}.`;
}

const inicioEvento = (e) => instanteLocal(e.fecha, e.horaInicio ?? "00:00");

function itemDesdeEvento(e, ahora) {
  const inicio = inicioEvento(e).getTime();
  const realizado = inicio < ahora.getTime();
  return {
    id: e.id,
    inicio,
    estado: realizado ? "realizada" : "proxima",
    filtros: e.modalidad === "online" ? [e.categoria, "online"] : [e.categoria],
    categoryLabel: `Eventos y colaboraciones · ${e.modalidad === "online" ? "Online" : "Presencial"}`,
    startTime: `${horaEvento(e.horaInicio)} – ${horaEvento(e.horaFin)}`,
    ...(realizado ? {} : { ctaHref: "wa.me" }),
  };
}

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
  const clave = mes && `${mes.anio}-${String(mes.mes).padStart(2, "0")}`;
  const delMes = sesionesClub().filter(
    (s) => mes && s.anio === mes.anio && s.mes === mes.mes
  );
  const abiertos = EVENTOS.filter(
    (e) => inicioEvento(e).getTime() >= ahora.getTime() || e.fecha.slice(0, 7) === clave
  ).map((e) => itemDesdeEvento(e, ahora));
  const club = [
    ...proximasSesiones(ahora),
    ...delMes.filter((s) => estadoSesion(s, ahora) === "realizada"),
  ].map((s) => itemDesdeClub(s, ahora));
  const porInicio = (a, b) => a.inicio - b.inicio;
  const todos = [...abiertos, ...club];
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
const ID_MH = "mindful-hangout-2026-11-28";

describe("evento The Mindful Hangout (fuente única)", () => {
  it("solo hay un evento abierto y es el confirmado", () => {
    assert.equal(EVENTOS.length, 1);
    assert.equal(EVENTOS[0].id, ID_MH);
    assert.equal(EVENTOS[0].nombre, "The Mindful Hangout");
    assert.equal(EVENTOS[0].intencion, "Segunda edición");
    assert.equal(EVENTOS[0].fecha, "2026-11-28");
    assert.equal(EVENTOS[0].horaInicio, "08:00");
    assert.equal(EVENTOS[0].horaFin, "10:30");
    assert.equal(EVENTOS[0].ubicacion, "Gran Parque San Nicolás");
    assert.equal(EVENTOS[0].modalidad, "presencial");
    assert.equal(EVENTOS[0].categoria, "eventos");
    assert.equal(
      EVENTOS[0].detalleHref,
      "/eventos-y-comunidad/the-mindful-hangout"
    );
  });

  it("agenda respeta las horas confirmadas del flyer", () => {
    assert.deepEqual(
      EVENTOS[0].agenda.map((b) => [b.nombre, b.inicio]),
      [
        ["Registro", "08:00"],
        ["Pilates", "08:30"],
        ["Sound healing", "09:10"],
        ["Matcha bar · Costume tote · Goodies", "09:30"],
        ["Convivencia", "10:00"],
      ]
    );
  });

  it("fecha larga y horario legibles", () => {
    assert.equal(fechaLarga("2026-11-28"), "Sábado, 28 de noviembre de 2026");
    assert.equal(horaEvento("08:00"), "8:00 AM");
    assert.equal(horaEvento("10:30"), "10:30 AM");
  });

  it("inicia a las 8:00 AM hora de Monterrey", () => {
    assert.equal(
      inicioEvento(EVENTOS[0]).toISOString(),
      "2026-11-28T14:00:00.000Z"
    );
  });

  it("mensaje de WhatsApp incluye evento, edición, fecha, hora y lugar", () => {
    assert.equal(
      mensajeReservaEvento(EVENTOS[0]),
      "Hola, quiero reservar mi lugar para The Mindful Hangout — Segunda edición el sábado 28 de noviembre de 2026 de 8:00 AM a 10:30 AM en Gran Parque San Nicolás."
    );
  });

  it("la reserva usa el helper único de WhatsApp y tracking de lead", () => {
    assert.match(FUENTE_EVENTOS, /enlaceReserva\(mensajeReservaEvento\(e\)\)/);
    assert.match(leer("lib/calendarioPublico.ts"), /trackingEventId: e\.id/);
    assert.match(
      leer("components/ui/HorarioEvento.tsx"),
      /TrackedReservationButton/
    );
    assert.match(leer("lib/openai-ads.ts"), /"lead_created"/);
  });

  it("las imágenes del evento existen en public/", () => {
    const raiz = fileURLToPath(new URL("..", import.meta.url));
    const { imagenes } = EVENTOS[0];
    assert.ok(imagenes.length >= 1);
    for (const src of imagenes) assert.ok(existsSync(join(raiz, "public", src)), src);
  });

  it("Yoga & Matcha ya no está en la fuente activa", () => {
    assert.doesNotMatch(FUENTE_EVENTOS, /Yoga & Matcha|2026-10-31|Cuarto Vital/);
  });

  it("Home, Eventos y Calendario consumen la misma fuente", () => {
    assert.match(leer("components/sections/ComunidadEnHome.tsx"), /proximosEventos\(new Date\(\)\)/);
    assert.match(leer("app/eventos-y-comunidad/page.tsx"), /proximosEventos\(new Date\(\)\)/);
    assert.match(leer("lib/calendarioPublico.ts"), /EVENTOS\.filter\(/);
  });

  it("Home y Eventos se re-evalúan cada hora", () => {
    assert.match(leer("app/page.tsx"), /export const revalidate = 3600;/);
    assert.match(leer("app/eventos-y-comunidad/page.tsx"), /export const revalidate = 3600;/);
  });
});

describe("calendario público", () => {
  it("incluye las 13 sesiones de octubre + The Mindful Hangout", () => {
    assert.equal(itemsCalendario(AHORA).length, 14);
  });

  it("primero las próximas en orden ascendente, luego las realizadas", () => {
    const items = itemsCalendario(AHORA);
    const proximas = items.filter((i) => i.estado === "proxima");
    assert.equal(proximas.length, 8);
    assert.ok(items.slice(0, 8).every((i) => i.estado === "proxima"));
    assert.ok(proximas.every((s, i) => i === 0 || proximas[i - 1].inicio < s.inicio));
    assert.equal(items[0].id, "club-2026-10-11-casa-zenia");
  });

  it("las realizadas no ofrecen reserva", () => {
    const realizadas = itemsCalendario(AHORA).filter((i) => i.estado === "realizada");
    assert.equal(realizadas.length, 6);
    assert.ok(realizadas.every((i) => !i.ctaHref));
  });

  it("The Mindful Hangout solo en Todos y Eventos y colaboraciones", () => {
    const items = itemsCalendario(AHORA);
    const ym = items.find((i) => i.id === ID_MH);
    assert.equal(ym.categoryLabel, "Eventos y colaboraciones · Presencial");
    assert.equal(ym.startTime, "8:00 AM – 10:30 AM");
    assert.ok(ym.ctaHref);
    assert.deepEqual(filtrar(items, "eventos").map((i) => i.id), [ID_MH]);
    for (const f of ["meditacion", "movimiento", "online"]) {
      assert.ok(!filtrar(items, f).some((i) => i.id === ID_MH), f);
    }
  });

  it("filtro meditación cubre presencial y online", () => {
    assert.equal(filtrar(itemsCalendario(AHORA), "meditacion").length, 13);
  });

  it("filtro online solo sesiones en línea", () => {
    const items = filtrar(itemsCalendario(AHORA), "online");
    assert.equal(items.length, 4);
    assert.ok(items.every((i) => i.id.endsWith("-online")));
  });

  it("filtro movimiento queda vacío sin dataset", () => {
    assert.equal(filtrar(itemsCalendario(AHORA), "movimiento").length, 0);
  });

  it("tras el evento no queda como próxima reserva", () => {
    const items = itemsCalendario(mty("2026-11-28T10:31:00"));
    const mh = items.find((i) => i.id === ID_MH);
    if (mh) {
      assert.equal(mh.estado, "realizada");
      assert.ok(!mh.ctaHref);
    }
    assert.ok(!items.some((i) => i.id === ID_MH && i.estado === "proxima"));
  });

  it("un evento pasado de otro mes no aparece", () => {
    const pasado = { ...EVENTOS[0], id: "x", fecha: "2026-09-30" };
    const visible =
      inicioEvento(pasado).getTime() >= AHORA.getTime() ||
      pasado.fecha.slice(0, 7) === "2026-10";
    assert.equal(visible, false);
  });

  it("el código real ordena por instante y quita la reserva a lo realizado", () => {
    const fuente = leer("lib/calendarioPublico.ts");
    assert.match(fuente, /sort\(porInicio\)/);
    assert.match(fuente, /estado === "proxima"\s*\?\s*\{\s*ctaTexto/);
    assert.match(fuente, /inicioEvento\(e\)/);
    assert.doesNotMatch(fuente, /new Date\(e\.fecha\)/);
    assert.doesNotMatch(fuente, /MES_CALENDARIO|SESIONES\.presencial/);
    assert.match(
      leer("components/ui/EventCard.tsx"),
      /!realizada && ctaTexto && ctaHref/
    );
  });
});
