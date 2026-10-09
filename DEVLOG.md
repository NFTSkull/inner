# Devlog: decisiones

## 2026-10-09 · Yoga & Matcha

- **Una sola fuente.** El evento vive en `lib/data/eventos.ts`
  (fecha ISO + horas 24 h locales + agenda + imágenes). Home
  (`proximosEventos`), Eventos (`EventoDestacado`) y Calendario
  (`itemsCalendario`) leen de ahí; ningún componente repite fecha,
  lugar ni rutas de imagen (lo verifica `test-calendario`).
- **Hora real de Monterrey.** `itemDesdeEvento` usaba
  `new Date(fecha)` (medianoche UTC = día anterior en Mty). Ahora usa
  `instanteLocal(fecha, horaInicio)`, igual que el Club, para ordenar
  y decidir próximo/realizado.
- **Reserva por el helper existente.** `enlaceReservaEvento` arma el
  mensaje desde los datos y lo pasa a `enlaceReserva` (mismo número de
  WhatsApp). Formato de hora “2:00 PM” como en el flyer; el Club
  conserva “10:00 a. m.”.
- **La imagen no es un póster.** El flyer trae texto impreso en el 41 %
  inferior; se recorta 7:5 anclado arriba (vasos + bandeja) y toda la
  información va en HTML. El flyer con horario queda como miniatura
  opcional dentro del desplegable.
- **Horario desplegable** con el patrón de `Faq` (grid-rows 0fr→1fr,
  `aria-expanded`/`aria-controls`, `inert` cerrado, sin animación con
  reduce-motion). En desktop las columnas se alinean arriba para que
  la imagen no salte al abrir.
- **Rosa como acento mínimo.** Token nuevo `--color-rosa` solo para el
  “&” del título en Shantell; matcha = `lima`/`salvia-doc` existentes.
- **Agrupación del calendario por mes.** Con eventos mezclados, la
  etiqueta “Meditation Club · Octubre” quedaba encima del evento;
  ahora es “Octubre” / “Realizadas · Octubre” y cada tarjeta dice su
  categoría.
- **Revalidate 3600 en Home y Eventos** para que el bloque desaparezca
  solo cuando el evento pase, sin redeploy.

## 2026-10-09 · Botones en reposo

- **Un solo punto de cambio.** Todos los CTA píldora salen de
  `@utility pildora`; el default pasa de transparente a tierra/crema
  con los tokens existentes (contraste crema sobre tierra ≈ 5.6:1).
  El hover conserva el relleno tinta que sube y el texto papel.
- **Variante clara anidada en la utilidad** (`&.pildora-clara`) en
  lugar de sobrescrituras `!border-papel …` por página: café sobre
  bosque perdía contraste, así que en fondos oscuros se invierte
  (crema + tinta) y el hover mantiene la intención original (papel
  que sube, texto del color del fondo).
- **El botón del Hero sobre video** ya tenía su variante clara
  explícita (`!bg-papel`); no se tocó.
- **Isotipo: la causa era la opacidad, no el color.** `IsotipoTrazo`
  ya pinta con `stroke="currentColor"` y hereda el color del botón
  (medido cuadro a cuadro: mismo valor que el texto durante toda la
  transición). Estaba en `opacity-0` hasta el hover, así que en
  reposo “desaparecía” y solo se veía con el botón ya oscuro. Ahora
  es visible siempre; conserva el giro con `--dur-larga`. Sin colores
  por variante: cada botón controla `color` y el icono lo hereda.

## 2026-10-09 · Calendario del Club dinámico

- **Lista explícita como fuente de verdad.** `SESIONES_CLUB` guarda
  fecha ISO + hora local + sede; nada se genera por día de la
  semana. El patrón de horarios es solo texto (`HORARIOS_CLUB`).
  Publicar noviembre = agregar renglones; ningún componente cambia.
- **Instantes, no cadenas.** `instanteLocal` convierte fecha/hora
  de Monterrey a instante absoluto leyendo el desfase con `Intl`
  (`longOffset`), así no depende de la zona del servidor ni de que
  Monterrey vuelva a tener horario de verano.
- **Próxima = `inicio >= ahora`.** Una sesión que empieza en este
  minuto todavía se puede reservar; un segundo después es
  “realizada”. Estado derivado, no guardado.
- **Mes activo derivado.** El de la próxima sesión; si ya pasaron
  todas, el último publicado (el calendario no queda vacío).
- **SSR sin desajuste.** La página pasa `ahoraISO` del servidor
  (`revalidate = 3600`) y `useAhora` arranca con ese valor y luego
  usa el reloj del navegador cada minuto: el HTML estático nunca
  queda más de una hora atrás y la hidratación coincide.
- **Realizadas visibles pero discretas.** En el calendario mensual
  conservan su círculo atenuado (contexto del mes) y en el detalle
  dicen “Sesión realizada” sin CTA. En `/calendario` van al final;
  solo las del mes activo, para no acumular meses viejos.
- **Color por sede con tokens existentes** (`azul-hondo`, `tierra`,
  `salvia-hondo`); clases literales en `COLOR_SEDE` para que
  Tailwind las detecte.
- **Home sin cambios.** No consume sesiones (solo el teaser del
  Club con su CTA), así que no se agregó un bloque nuevo.

## 2026-10-09

- **Video del Hero: HEVC → H.264/VP9.** El MOV es HEVC (solo fiable
  en Safari). Se generaron derivados con ffmpeg (H.264 High, CRF
  ~30, sin audio, `faststart`; VP9 de respaldo) y se dejan como
  `<source>`; el MOV queda intacto en `public/`. Móvil recibe un
  recorte vertical centrado en la práctica (`media` en `<source>`)
  y un poster propio vía `<picture>`/`getImageProps`, así el LCP es
  el poster con `priority` y no se descarga el video de escritorio.
- **Copy del Hero arriba en móvil.** En vertical la parte baja es el
  sujeto; el titular va arriba con velo superior, y subcopy + CTAs
  bajo la tarjeta para no tapar el video. En escritorio, velo radial
  abajo-izquierda (no oscurece todo el video) + sombra de texto
  sutil en el subcopy por las hojas.
- **Progressive disclosure por eliminación, no por acordeones.** Se
  quitaron capítulos numerados (“03 — DETALLE”), selectores y
  disclosures; cada bloque se entiende en una lectura. Solo Empresas
  conserva `<details>` nativo para “Qué incluye”.
- **CTA después de la información.** En celebraciones/empresas el
  CTA va tras los 4 puntos en móvil y bajo el título en escritorio
  (`grid-rows-[auto_1fr]` + `row-span-2` en la lista).
- **Calendario sin Shantell.** Una lista de N sesiones con el mismo
  título en Shantell era ruido; filas compactas Jost reducen la
  página ~55%. El empty state contextual del calendario se conserva
  (solo se retiró el de Home).
- **Color por viewport.** El cierre de Home pasa a arena para no
  apilar bosque (Club) + tierra; acento único por bloque.
- **Entorno.** El proyecto vive en Escritorio con iCloud “Optimizar
  almacenamiento”: archivos de `node_modules` y algunos recién
  escritos quedaban sin descargar (lecturas con bytes NUL). Los
  checks se corrieron en una copia local fuera de iCloud, verificando
  que ningún archivo fuente tenga bytes NUL antes de copiar.

## 2026-09-23

- **Home Hero/Intro art direction.** El hero con isotipo fantasma +
  título Shantell completo se leía como layout temprano. Solución:
  escena marca|media (mismo patrón del Club, con `hero.mp4`),
  contraste tipográfico Jost/Shantell en el claim, CTA secundario
  editorial. Intro deja el bloque centrado: grid 5/7 con extractos
  del texto factual (“piloto automático” / “presente”) + pilares
  tipográficos (no cards). Un solo puente: solape de la media hacia
  crema. Comprensión > ornamentación.
- **Jerarquía > efectos.** El canvas crema continuo + lavados
  multi-tono (lima/bosque/tierra) aplanaba la lectura: todo pesaba
  igual. Solución: capítulos cognitivos (1 viewport ≈ 1 decisión),
  1–2 neutros + 1 acento + cierre oscuro por página; bordes limpios
  o FlowLine corto (~no wash 120–180px turbio). Sesiones = plantilla
  de claridad (práctica → formato → incluye → precio → reservar).
  Tipografía: Jost estructural por defecto; Shantell solo acento.
  Pills sustituidas por listas. Contraste secundario subido
  (`--color-tinta-suave`). IA y copy intactos.

## 2026-09-22

- **Coreografía de secciones.** Problema: bandas rectangulares con
  corte duro de fondo. Solución: 3 tipos (Continuidad / Chapter wash
  120–180px / Signature máx 1–2). Home: hero→crema wash; intro+
  intenciones en crema; wash a arena; Universos con filas Jost 01–04
  y COMUNIDAD como puente lima; wash arena→lima + label “Lo que
  viene”; Club/Cierre con lavados lima→bosque y bosque→tierra.
  Sesiones: un capítulo arena para práctica/formatos/incluye;
  Individual/Grupo 4+8; CTA editorial a organizaciones. Celebraciones/
  empresas/comunidad/conoceme/contacto: menos bandas, más soft-rule.
  Shantell reducido en intenciones/universos/hub. IA intacta.
- **Pass UX/UI + art direction.** Sin tocar IA. Tokens de ritmo
  (`--space-section*`, `section-y`/`tight`/`expressive`,
  `measure-copy/prose/wide`, radios ui/tactil/papel). Home continuo
  sin OndaDivisor entre bloques; intro compacta; firma en
  intenciones; universos como filas; Club = PAUSE; hero sin kinetic
  words. Hub: asimetría 7/5. Sesiones: `SelectorSesiones`.
  Celebraciones: progresión 3/4/5 sin cards. Empresas: sticky nav +
  densidad (filas, no tarjetas). Comunidad/About/Contact densificados;
  contacto con paths de interés. EmptyState editorial. Club: solo
  less padding. QA browser en `/`, hub y empresas. lint/typecheck/
  21 tests OK.
- **IA multipágina (corrección).** Home deja de ser one-page de
  servicios: portal de 7 secciones (Hero → Intro → Intenciones →
  Universos teaser → Próximas → Club preview → CTA). Detalle en
  rutas dedicadas. Hub `/experiencias` con cuatro mundos.
  Canónicas: `/experiencias/sesiones-privadas`,
  `/experiencias/celebraciones`, `/empresas-y-colegios`,
  `/eventos-y-comunidad`. `/club` se conserva. Redirects permanentes
  desde legacy. Nav: Experiencias (dropdown) · Calendario · Club ·
  Conóceme · Hablemos. `CELEBRACIONES_PRECIOS` +
  `CONFLICTOS_CONTENIDO.celebracionesPrecios` marcan discrepancia
  narrativo/tabla sin sobrescribir. El lugar vuelve al Club.
  Test `scripts/test-rutas.mjs`. Sin `/recursos`.
- **Runtime 404 de `/_next/static`.** Causa raíz: caché `.next`
  inconsistente (proceso `next dev` longevo + ENOSPC previo). El HTML
  referenciaba chunks/CSS que ya no estaban en disco. Diagnóstico
  descartó middleware (no existe), `basePath`/`assetPrefix`/rewrites/
  redirects (ausentes en `next.config.ts`) y reestructura de rutas.
  Un `rm -rf .next` en paralelo a `next dev` empeoraba el síntoma
  (faltaban `middleware-manifest.json` / `routes-manifest.json` → 500).
  Fix: matar procesos en :3000, borrar `.next` con el server parado,
  reiniciar una sola instancia. Script `npm run dev:fresh`. Nota: en
  App Router el chunk es `app-pages-internals.js`, no
  `pages-internals.js`. Verificado 200 en `next dev` (3000/3001) y
  `next start` tras `build`.
- **Integración DOCX “Restructuración página web”.** Reemplazo de
  placeholders: precios sesiones/celebraciones/empresas, bio Analú
  (RYT-200), contacto email, políticas operativas, INTRO/INTENCIONES/
  CTAs del documento. Testimonio y EJEMPLO de calendario no
  publicados (plantillas). Club KEEP IT. Empty states intencionales
  para eventos abiertos.
- **Nav móvil.** Overlay incluye fila de primaria (Experiencias,
  Calendario, Club) + Hablemos porque en <lg la barra solo muestra
  Explorar.
- **Páginas de experiencia sin PaginaServicio.** Cada ruta arma
  hero + mood (`crema`, `lima`, `bosque`, `arena`) +
  ExperienceDisclosure / EmptyState desde datos tipados. CTAs vía
  `enlaceReserva`. Comunidad y calendario no inventan fechas
  (`EVENTOS = []`); el calendario mapea sesiones del Club como
  meditación con fuente "Calendario Club". Contacto compone
  WhatsApp sin backend. Conóceme con bio y RYT-200 del documento.
  Club: KEEP IT (copy e interacciones intactas).
- **Home rearmada por secciones.** Orden: Hero → Intro (crema) →
  Intenciones (filas, no cards) → Preview editorial → Próximas
  (EmptyState + Club/Comunidad/IG) → Club calm (bosque) → Lugar →
  Hablemos. Copy solo de `experiencias`, `eventos`, `servicios`,
  `about`, `site`. Sin video en hero; FlowLine/Onda con mesura.
- **Footer.** Tagline de marca + meditación Monterrey/online;
  se quita el claim estrecho “solo Meditation Club” en la línea final.
- **Nav UI híbrida.** Barra con primaria + Explorar + Hablemos.
  Overlay fullscreen de hojas (radius/shadow papel, rotacionDeTrazo).
  Escape, focus trap, scroll lock, lenis stop/start. Sin hamburguesa.
- **Primitivos de sistema.** FlowLine (5 variantes), EmptyState,
  SectionHeading, ExperienceDisclosure (Descubrir), EventCard
  (póster o mínimo). Boton con aria para el dialog.
- **Documento de reestructuración.** Antes ausente; ahora integrado
  (ver entrada superior de este día). La nota antigua de “ausente”
  queda superada.
- **Nav híbrida en datos.** `ENLACES_PRIMARIOS` (Experiencias,
  Calendario, Club) y `ENLACES_OVERLAY` (Explorar). `ENLACES_NAV`
  alias de primaria.
- **Paleta ampliada.** Tokens `tierra`, `salvia-doc`, `lima`,
  `crema`, `cielo`, `bosque` sin borrar arena/tinta/azul/salvia.
  `MODO_MOTION` deriva duraciones de `DURACION`.
- **PENDIENTE MANUAL (sigue vigente):** bio Instagram
  (@innerflow.mx) raíz → `/club` el día del deploy del Home nuevo.

## 2026-09-10

- **Expansión a todos los servicios.** Home de marca en `/`;
  Meditation Club mudado a `/club` sin reescribir copy. Cuatro
  páginas nuevas consumen `lib/data/servicios.ts`. Nav sin botón
  Reservar suelto: reservar vive en el Club y en cada CTA de
  servicio (WhatsApp).
- **Vitrina: pared de flyers.** Rotación determinista con
  `rotacionDeTrazo`. Posiciones asimétricas. Club con insignia.
  Móvil: pila. Sin foto ni video en el Home nuevo.
- **El lugar en Home.** No viaja a `/club`; el submenú del Club
  apunta a `/#lugar`. Membresía usa `/club#precios` (id existente).
- **PENDIENTE MANUAL:** actualizar el link de la bio de Instagram
  (@innerflow.mx) de la raíz del dominio a `/club` antes o el
  mismo día del deploy. El Club arrancó el 1 de septiembre y la
  bio probablemente apunta a la raíz esperando llegar directo al
  calendario. En cuanto este Home nuevo quede en producción, ese
  tráfico va a caer en la vitrina de servicios en vez del
  calendario, y se pierde conversión de gente que ya trae el
  hábito de esa liga.

## 2026-08-30

- **Header → calendario.** El botón Reservar del nav hace scroll
  a `#calendario`; WhatsApp queda para “Reservar este día”, banner,
  footer y el cierre del Respirador.
- **Reservas → WhatsApp.** Todos los “Reservar” abren
  `wa.me/528132608095` con texto listo. Día del calendario lleva
  fecha/hora/modalidad. Instagram queda solo como red social.

## 2026-08-27

- **Copy del hero y modalidades.** Marca visible “Inner Flow”;
  experiencia previa no requerida; reserva obligatoria en Cómo funciona.
- **Móvil ≠ desktop en motion.** Lenis en touch hacía que
  reveals y el manifiesto por scroll se sintieran rotos o
  instantáneos. Lenis solo corre en ≥1024px. En móvil: scroll
  nativo, Reveal más lento, Manifiesto por línea (`lg:hidden` /
  `lg:block` para no alterar el scrub de escritorio), y autoplay
  del hero con reintentos en scroll/gesto sin `video.load()`.
- **Video invisible en móvil.** `hero-entra` con `fill-mode: both`
  partía en `opacity: 0`. En la columna bajo el fold el motor
  dejaba la animación colgada y el still (poster) tapaba todo.
  Se elimina esa animación; el `<video>` queda encima a opacity 1
  y el poster detrás como fallback. Fuera `lugar.JPG` del hero.

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
