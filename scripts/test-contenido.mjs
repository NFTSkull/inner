/**
 * QA de contenido: textos retirados, navegación, precios y media del Hero.
 * Lee el código fuente (sin compilar) para garantizar que el copy
 * eliminado no regrese a los bloques indicados.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const RAIZ = new URL("..", import.meta.url).pathname;

function leer(ruta) {
  return readFileSync(join(RAIZ, ruta), "utf8");
}

function fuentes(dir) {
  return readdirSync(join(RAIZ, dir), { recursive: true })
    .filter((f) => /\.(ts|tsx)$/.test(f))
    .map((f) => join(dir, f));
}

const TODO = ["app", "components", "lib"].flatMap(fuentes);

const HOME = [
  "app/page.tsx",
  ...Array.from(
    leer("app/page.tsx").matchAll(/from "@\/components\/sections\/(\w+)"/g),
    (m) => `components/sections/${m[1]}.tsx`
  ),
];

/** Bloque de texto entre `inicio` y el siguiente `} as const;`. */
function bloque(texto, inicio) {
  const desde = texto.indexOf(inicio);
  assert.ok(desde >= 0, `no se encontró ${inicio}`);
  return texto.slice(desde, texto.indexOf("} as const;", desde));
}

describe("QA de copy retirado", () => {
  const RETIRADOS = [
    "Hay distintas formas de volver a ti",
    "Ver todas las experiencias",
    "Cómo quieres vivirla",
    "Individual o en grupo",
    "Profundiza cuando lo necesites",
    "Diseña tu celebración",
    "Diseñar mi experiencia",
    "Áreas, grupos o turnos",
    "Yogilates o Pilates",
    "Las plantillas del documento",
  ];

  for (const texto of RETIRADOS) {
    it(`"${texto}" no aparece en el sitio`, () => {
      const con = TODO.filter((f) => leer(f).includes(texto));
      assert.deepEqual(con, []);
    });
  }

  it("sin capítulos técnicos numerados (CapituloLabel)", () => {
    const con = TODO.filter((f) => leer(f).includes("<CapituloLabel"));
    assert.deepEqual(con, []);
  });

  it("Home no muestra empty state de fechas", () => {
    for (const f of HOME) {
      const t = leer(f);
      assert.ok(!t.includes("Pronto habrá nuevas fechas"), f);
      assert.ok(!t.includes("Cuando publiquemos clases"), f);
      assert.ok(!t.includes("EmptyState"), f);
    }
  });

  it("teaser del Club en Home es compacto", () => {
    const club = bloque(leer("lib/data/experiencias.ts"), "CLUB_HOME");
    assert.ok(
      !club.includes("Puedes comenzar con una sola sesión"),
      "CLUB_HOME conserva copy retirado"
    );
  });

  it("Home ya no monta bloques redundantes", () => {
    const home = leer("app/page.tsx");
    for (const c of [
      "QueNecesitasHoy",
      "PreviewExperiencias",
      "ProximasExperiencias",
    ]) {
      assert.ok(!home.includes(c), c);
    }
    assert.ok(home.includes("MundosExperiencia"));
    assert.ok(home.includes("ComunidadEnHome"));
  });
});

describe("navegación", () => {
  it("dropdown de Experiencias sin 'Ver todas'", () => {
    assert.ok(!leer("components/sections/Nav.tsx").includes("Ver todas"));
    assert.ok(
      !leer("lib/data/navegacion.ts").includes("Todas las experiencias")
    );
  });

  it("dropdown lista los cuatro destinos", () => {
    const nav = bloque(
      leer("lib/data/navegacion.ts").replace(
        "];\n\n/** Barra primaria",
        "} as const;"
      ),
      "ENLACES_EXPERIENCIAS"
    );
    for (const t of [
      "Sesiones privadas",
      "Celebraciones",
      "Empresas y colegios",
      "Eventos y comunidad",
    ]) {
      assert.ok(nav.includes(t), t);
    }
  });

  it("footer incluye Instagram y políticas", () => {
    const footer = leer("components/sections/Footer.tsx");
    assert.ok(footer.includes("instagramHandle"));
    assert.ok(footer.includes("RUTAS.politicas"));
  });
});

describe("sesiones privadas", () => {
  const datos = leer("lib/data/experiencias.ts");
  const pagina = leer("app/experiencias/sesiones-privadas/page.tsx");

  it("Pilates reemplaza Yogilates en sesiones", () => {
    assert.match(datos, /title: "Pilates",/);
  });

  it("tarifas reales 60/90 min", () => {
    const s = bloque(datos, "SESIONES_PAGE");
    assert.match(s, /individual: 600,\s+grupoHasta5: 1000,\s+adicional: 150/);
    assert.match(s, /individual: 850,\s+grupoHasta5: 1400,\s+adicional: 200/);
  });

  it("precios fijos sin 'Desde' y capacidad máxima visible", () => {
    assert.ok(!/Desde/.test(pagina), "la página usa 'Desde'");
    assert.ok(datos.includes("Máximo 15 personas"));
  });
});

describe("celebraciones y empresas", () => {
  const datos = leer("lib/data/experiencias.ts");

  it("logística de celebraciones: solo cuatro puntos", () => {
    const c = bloque(datos, "CELEBRACIONES_PAGE");
    const info = c.slice(c.indexOf("infoImportante"));
    const items = info.slice(0, info.indexOf("]")).match(/^\s+"/gm) ?? [];
    assert.equal(items.length, 4);
  });

  it("empresas sin sesiones consecutivas ni bullets 'ideal para' de pausas", () => {
    const e = bloque(datos, "EMPRESAS_PAGE");
    assert.ok(!e.includes("sesionesConsecutivas"));
    assert.ok(!e.includes("notaConsecutivas"));
    assert.ok(!datos.includes('"Equipos sentados"'));
    assert.ok(
      !leer("components/sections/PaginaEmpresasContenido.tsx").includes(
        "consecutivas"
      )
    );
  });
});

describe("media del Hero", () => {
  it("derivados H.264 + poster existen y el MOV original se conserva", () => {
    for (const f of [
      "public/copy_E9FF2E56-BDF1-4EF9-8FF7-86347331888F.MOV",
      "public/inicio-hero.mp4",
      "public/inicio-hero-movil.mp4",
      "public/inicio-hero.webm",
      "public/inicio-hero-poster.jpg",
      "public/inicio-hero-movil-poster.jpg",
    ]) {
      assert.ok(existsSync(join(RAIZ, f)), f);
    }
  });

  it("el Hero usa los derivados, no el MOV directo", () => {
    const hero = leer("components/sections/HeroInicio.tsx");
    assert.ok(hero.includes("/inicio-hero.mp4"));
    assert.ok(!hero.includes(".MOV"));
  });
});

describe("calendario y cierres de página", () => {
  it("las filas del calendario usan Jost (sin Shantell en la lista)", () => {
    assert.ok(!leer("components/ui/EventCard.tsx").includes("display-trazo"));
  });

  it("el calendario no repite una descripción genérica por sesión", () => {
    assert.ok(
      !leer("lib/calendarioPublico.ts").includes("Sesión del calendario")
    );
  });

  it("empresas: el título de cierre no duplica el texto del CTA", () => {
    const e = leer("components/sections/PaginaEmpresasContenido.tsx");
    const h2 = e.slice(e.indexOf('id="propuesta-titulo"'));
    assert.ok(!h2.slice(0, h2.indexOf("</h2>")).includes("ctaPropuesta"));
  });
});

describe("intro de Home", () => {
  it("sin franja de pilares 01–04", () => {
    assert.ok(!leer("components/sections/IntroInnerFlow.tsx").includes("pilar"));
    assert.ok(!bloque(leer("lib/data/experiencias.ts"), "INTRO_INNERFLOW").includes("pilares"));
  });
});

describe("Meditation Club: octubre y precios", () => {
  it("sin calendario de septiembre ni mes fijo en código productivo", () => {
    for (const ruta of TODO) {
      const texto = leer(ruta);
      assert.doesNotMatch(texto, /MES_CALENDARIO|enlaceReservaDia|horaDeSesion/, ruta);
      if (ruta !== "lib/data/proxima-sesion.ts") {
        assert.doesNotMatch(texto, /septiembre/i, ruta);
      }
    }
  });

  it("precios del Club centralizados y confirmados", () => {
    const p = leer("lib/data/precios.ts");
    for (const [nombre, precio] of [
      ["Meditación presencial", 180],
      ["Meditación online", 150],
      ["Presencia", 600],
      ["Presencia profunda", 780],
      ["Desde casa", 480],
      ["Inner Flow", 990],
      ["Experiencia completa", 1150],
    ]) {
      assert.match(p, new RegExp(`nombre: "${nombre}",[^}]*?precio: ${precio}\\b`));
    }
    const faq = leer("components/sections/Faq.tsx");
    assert.ok(faq.includes("SUELTAS"));
    assert.doesNotMatch(faq, /\$1[58]0/);
  });

  it("sin disponibilidad inventada", () => {
    for (const ruta of TODO) {
      assert.doesNotMatch(leer(ruta), /lugares disponibles|cupo limitado/i, ruta);
    }
  });

  it("el calendario del Club deriva el mes de los datos", () => {
    const c = leer("components/sections/Calendario.tsx");
    assert.match(c, /mesActivo\(ahora\)/);
    assert.match(c, /HORARIOS_CLUB/);
    assert.match(c, /Sesión realizada/);
  });
});
