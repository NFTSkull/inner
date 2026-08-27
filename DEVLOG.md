# Devlog: decisiones

## 2026-08-25

- **Nav legible, video en lazo.** El header transparente
  perdía los enlaces sobre el verde del clip. Queda fondo
  `arena` siempre. Se elimina Pausar/Reanudar: el fondo es
  decorativo y corre en loop (muted, playsInline).
- **Hero marca | escena.** El overlay full-bleed tapaba el
  cuenco en desktop (cover solo ve ~1/3 del 9:16). Nueva
  composición en dos columnas: papel con marca `InnerFlow` a
  la izquierda; video puro a la derecha (y abajo en móvil).
  El cuenco ya no compite con el texto. Cuadro completo sin
  zoom agresivo.
- **Still encima hasta play confirmado.** En `FondoHero`,
  `setVideoActivo(true)` en `loadeddata` ocultaba el still aunque
  `play()` fallara (Low Power Mode / políticas de Safari). El still
  queda en `z-[1]` sobre el `<video>` y solo pasa a `opacity-0`
  cuando `play()` o el evento `playing` confirman. Tras el primer
  gesto (`touchstart`/`click`) se reintenta el autoplay.

## 2026-08-22

- **Sin cursor custom.** El halo azul que seguía al mouse se
  percibía como un defecto. Queda el cursor nativo.
- **Scroll más ágil.** Lenis bajó la inercia (lerp 0.14) y las
  anclas del nav llegan en 0.85s, con offset del header. El video
  del hero usa `preload=metadata` y el still es `hero-poster.jpg`
  (247 KB) en vez de `lugar.JPG` (2.7 MB). El Respirador se importa
  en diferido.
- **Logo en tinta, no negro.** El PNG es negro. Un filtro CSS lo
  lleva a `--tinta` (#4b3a24) en nav y footer, sin un asset nuevo.
- **Vigencia del mes.** La política deja de anclarse a septiembre
  2026 y habla del mes vigente. La nota de precios sigue el mismo
  criterio.
- **Mapa en El lugar.** Google bloquea el embed por cid (salía el
  mundo). Ahora se ve el barrio de Vista Hermosa y todo el recuadro
  abre el pin de Casa Zenia en Google Maps.

## 2026-08-19

- **Hero cinematográfico, no columna de velo.** El clip es 9:16 con
  la protagonista centrada: no se puede mover a un lado con
  `object-position`. La composición correcta es ella al centro y el
  copy anclado abajo a la izquierda sobre un degradado de base, como
  en cine. Se elimina el `bg-arena/40 mix-blend-multiply` de pantalla
  completa que dejaba todo lechoso.
- **Título en dos líneas fijas.** `\n` en TituloTrazo
  (`Tu pausa` / `empieza aquí.`) en vez de depender del `max-width`:
  el quiebre es idéntico en todos los anchos.
- **Velo por zonas.** Arriba un degradado corto para el nav, abajo a
  la izquierda una mancha radial de arena que se disuelve (no una
  caja), y en móvil una base densa que sube desde abajo.

## 2026-08-17

- **Políticas en una página, no en un modal.** El texto es largo
  y hay que poder leerlo, copiarlo y enlazarlo. `/politicas` tiene
  dos bloques: las 9 reglas del club (fieles al original) y un
  aviso de privacidad honesto: este sitio no tiene formularios ni
  pagos. El contacto ARCO es Instagram.
- **FAQ y nota de precios alineadas.** Antes decía 4 horas y
  “se renuevan cada mes”. Ahora: 9 horas, vigencia septiembre
  2026, pagos no reembolsables.
- **Membresía, no carta.** "La carta" sonaba a restaurante. El
  título visible, el nav y el aria-label dicen Membresía. El id
  `#precios` se queda para no romper anclas.
- **No ponemos tapete ni cobija.** En El lugar, modalidades y FAQ
  se pide traer tapete o cojín si te sientas en el piso. Lo que
  sí hay: el espacio, la guía y el té.
- **Manifiesto sin jerga.** Se quitó "mente en blanco" y "flor de
  loto". Quedó: no tienes que haber meditado, te guiamos 45
  minutos, la tercera vez ya no se siente raro.
- **Lugar en una fila.** Apiladas, las dos fotos (4/3 + 3/4)
  ocupaban de más. En fila, cada una sigue completa y la sección
  baja a la altura de una.
- **Hero extendido solo en lg.** `min-h-[115dvh]` y velo que abre
  a partir del 38% para que el parque se vea. Móvil sigue en
  `min-h-dvh` y velo denso.
- **Fotos enteras, cada una en su proporción.** `lugar.JPG` es 4/3
  (la sala). `lugar1.jpeg` es 3/4 vertical por el EXIF del iPhone:
  forzarla a horizontal la cortaba. Hoy van en fila, cada una
  completa.
- **El MOV no se sirve.** `public/hero.MOV` es fuente (iPhone, 4K,
  rotado -90°, 24 MB, 4.2s). El sitio usa `hero.mp4` H.264 1080×1920
  generado con `scripts/generar-hero.sh`. Chrome no es fiable con
  QuickTime; 24 MB en el hero rompería el first load.
- **Lazo palíndromo, no corte.** El gesto de los cuencos no cierra
  en el primer frame. Ida + vuelta (~8s) evita el salto y se siente
  como un ciclo, no como un clip que se reinicia.
- **Velo de papel, no scrim negro.** Invertir el hero a texto blanco
  sobre oscuro rompería la marca (tinta sobre papel). El velo usa
  `color-mix` de papel y arena: denso a la izquierda y arriba (copy
  y nav), abierto a la derecha para que se vea el parque. Un
  `mix-blend-multiply` de arena acerca el verde al resto del sitio.
- **Pausa explícita.** Un loop infinito de más de 5s exige mecanismo
  de pausa (WCAG 2.2.2). `prefers-reduced-motion` no basta: quien no
  tenga esa preferencia del sistema también puede detenerlo. El
  video además se pausa fuera de vista para no gastar batería.
- **Sin isotipo grande a la derecha.** El footage ya es la figura.
  El isotipo queda como sello de 20px junto a la etiqueta.

## 2026-08-16

- **Isotipo medido, no calcado.** El SVG del isotipo se construyó
  midiendo el PNG original (2084px) con un script de sharp que
  escanea corridas de tinta por filas y columnas. Hallazgo: la
  cabeza es un anillo grueso con hueco transparente, sin punto
  central; el torso y las piernas son un solo trazo continuo.
- **Un solo reloj.** Todas las duraciones del sitio derivan de
  `lib/breath.ts` (4-4-6). Nada anima fuera de ese compás.
- **Reservas por Instagram.** No hay pasarela de pago; los botones
  de reserva llevan al perfil de Instagram (`ENLACE_RESERVA` en
  `lib/data/sesiones.ts`). Cambiar ahí cuando exista un sistema real.
- **Banner en salvia-hondo, no salvia.** El salvia claro no pasa
  contraste AA con texto papel; el tono hondo sí en tamaños
  grandes/bold. La codificación semántica (salvia = online) se
  mantiene.
- **tinta-suave #756046 → #6B573E** para pasar 4.5:1 sobre arena en
  texto chico. Sobre arena-hondo, los textos chicos usan tinta.
- **Next 15, no 16.** El brief pide Next 15; `create-next-app`
  instaló 16 y se bajó de versión. `npm audit` reporta avisos en
  dependencias internas de Next 15; se aceptan porque subir a 16
  contradice el brief y el sitio es estático sin datos de usuario.
- **Sin audio en El Respirador.** El tono opcional de Web Audio se
  omitió a propósito: mejor sin sonido que con un sonido mediocre.
- **Regla de pruebas.** El proyecto no tiene runner de tests aún;
  el criterio de bloque se cumplió con lint + typecheck + build +
  verificación visual y funcional en navegador (desktop y 360px).
