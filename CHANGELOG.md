# Changelog

## 2026-10-09 · Evento Yoga & Matcha

- Primer evento abierto real en `EVENTOS`: Yoga & Matcha, sábado 31
  de octubre de 2026, 2:00 PM – 4:30 PM, Cuarto Vital, Mty.
  (presencial, Eventos y colaboraciones), con agenda Registro / Yoga /
  Matcha & tisanas e imágenes del flyer.
- Eventos y comunidad: bloque “Próximo encuentro” (texto 5 / imagen 7
  en desktop, imagen arriba en móvil) con fecha, horario, lugar,
  “Reservar mi lugar” por WhatsApp y “Ver horario completo”
  desplegable (línea de tiempo + miniatura del flyer).
- Home · Comunidad: preview “Próximo evento” con recorte de la imagen
  principal; mantiene “Ver eventos y comunidad →”.
- Calendario: el evento aparece en Todos y en “Eventos y
  colaboraciones” con hora local correcta y reserva; la agenda se
  agrupa por mes (“Octubre”, “Realizadas · Octubre”).
- Token `--color-rosa` (acento suave, solo en el “&” del título).
- Home y Eventos se re-evalúan cada hora: el evento sale solo al pasar.

## 2026-10-09 · Botones con presencia en reposo

- Botones píldora (`.pildora`, usada por `Boton`): estado default café
  sólido `--color-tierra` (#695537) con texto `--color-crema`
  (#f1e4d0) y borde café. Hover, tamaños, radio, tipografía y motion
  sin cambios.
- Sobre fondos bosque/salvia: variante global `pildora-clara` (crema
  con texto oscuro; el hover sube papel). Reemplaza los contornos
  blancos que se repetían en Club (Home y banner), Contacto,
  Sesiones privadas, Empresas y Comunidad.
- Links editoriales (Instagram, “Ver calendario”, “Conocer Inner
  Flow”, “Hablemos” del header) siguen como links.
- “Hablemos” del cierre de Home: variante `pildora-blanca` (blanco en
  reposo; al hover sube la tinta y texto + isotipo quedan blancos).
- Isotipo de los botones primarios visible en reposo con el color del
  texto (`currentColor`): café en botones claros, crema en café; cambia
  junto con el texto en hover/focus. Conserva el giro al hover.

## 2026-10-09 · Meditation Club octubre

- Calendario del Club: octubre 2026 con 13 sesiones explícitas
  (`SESIONES_CLUB`, fecha ISO + hora + sede); septiembre deja de
  mostrarse. Sedes Casa Zenia · Vista Hermosa (azul), Oh my core! ·
  San Nicolás (tierra) y En línea · Virtual (salvia), con leyenda y
  horarios “Viernes y domingo · 10:00 a. m.” / “Martes y jueves ·
  8:00 p. m.” solo como explicación.
- Mes, año, día de la semana y cuadrícula se derivan de las fechas;
  el mes activo es el de la próxima sesión (o el último publicado).
- Sesiones pasadas: siguen en el calendario mensual, atenuadas, con
  “Sesión realizada” y sin reserva. En `/calendario` van al final
  bajo “Sesiones realizadas · Octubre”.
- Próximas sesiones: instante real en America/Monterrey, `inicio >=
  ahora`, orden ascendente. `/club` y `/calendario` se regeneran
  cada hora y el cliente actualiza el estado cada minuto.
- Reserva por sesión vía `enlaceReserva`: “Hola, quiero reservar mi
  lugar para Meditation Club en Casa Zenia el domingo 25 de octubre
  a las 10:00 a. m.” / “… online el jueves 29 …”.
- Precios del Club confirmados sin cambios; el FAQ toma los de
  sesión suelta de `precios.ts`. Modalidades, Hero y metadatos del
  Club mencionan Oh my core!.
- Pruebas: `test-proxima` y `test-calendario` reescritas sobre los
  datos reales (espejo en `scripts/espejo-club.mjs`) + QA de
  contenido (sin septiembre, precios, sin disponibilidad inventada).

## 2026-10-09

- Home: se retira la franja de pilares 01 Movimiento · 02 Meditación ·
  03 Sonido · 04 Conexión de la Intro.
- Hero de Home audiovisual: bloque editorial redondeado con el video
  del MOV original convertido a H.264 (escritorio 1600×900 y recorte
  vertical móvil 600×800) + VP9 de respaldo y posters por breakpoint.
  Copy “Espacios para / volver a ti” sobre velo localizado, CTAs
  “Explorar experiencias” y “Ver calendario →”. El MOV queda intacto.
- Header: cápsula central (Experiencias ▾, Calendario, Meditation
  Club, Conóceme) + “Hablemos →”; dropdown con los 4 destinos (sin
  “Ver todas”); el clic tras hover ya no lo cierra. Menú móvil con
  hojas de experiencias + filas.
- Home: Intro editorial sin eyebrow + pilares 01–04 en franja;
  4 tarjetas de experiencias (reemplaza intenciones y lista 01–04);
  bloque Comunidad compacto con Instagram; Club compacto; sin
  empty state ni “Próximas”. Footer compacto de 3 columnas.
- Sesiones privadas: descripciones de una línea, “Pilates”, tabla
  60/90 min sin “Desde”, máximo 15 personas; fuera “Cómo quieres
  vivirla”. Celebraciones: cada experiencia autocontenida, logística
  en 4 puntos, CTA principal después de la información. Empresas:
  sin intro larga, sin bullets/consecutivas; cierre “Información
  importante” + CTA. Comunidad/Contacto: textos acortados.
- Calendario: filas compactas en Jost (sin Shantell en lista larga),
  etiqueta de mes una sola vez, sin descripción genérica por sesión.
- Encabezados `SectionHeading` en Jost light; hub de Experiencias y
  Calendario alineados al patrón de héroes internos; `page-top`
  con más aire bajo el header en móvil.
- Eliminados: `QueNecesitasHoy`, `PreviewExperiencias`,
  `ProximasExperiencias`, `SelectorSesiones`, `CapituloLabel`,
  `ExperienceDisclosure`. Nueva prueba `scripts/test-contenido.mjs`.

## 2026-09-23

- Home Hero + Intro: composición editorial (copy | video `FondoHero`),
  tipografía “Espacios para” Jost + “volver a ti” Shantell, CTA
  secundario subrayado. Intro asimétrica (idea emocional | factual) +
  pilares tipográficos Movimiento/Meditación/Sonido/Conexión. Puente
  único: media solapa hacia Intro. Sin copy inventado ni secciones
  nuevas.
- Pass de jerarquía informativa (claridad): capítulos tonales por
  página, sin lavados turbios multi-color. Sesiones privadas 01–06
  (crema→papel→arena→papel→lima→bosque); selector con activo claro
  y panel editorial; Ideal para como lista. Home: Club bosque limpio
  + FlowLine; cierre tierra sin wash barroso. Empresas/celebraciones/
  eventos/contacto/conóceme: capítulos separados, CTA bosque, menos
  Shantell (SectionHeading default Jost), contraste tinta-suave
  reforzado. Sin nuevas rutas ni contenido inventado.

## 2026-09-22

- Coreografía entre secciones: lavados `chapter-wash-*`
  (arena↔crema↔lima↔bosque↔tierra), soft-rules de continuidad,
  Universos editorial + puente “Lo que viene” hacia Próximas,
  Sesiones 4/8 sin dead space, menos Shantell en listas.
  Sin nuevas rutas ni ondas decorativas.
- Pass visual premium: sistema de ritmo
  (`section-y` / tight / expressive), densidades controladas,
  menos cards, tipografía Jost estructural vs Shantell puntual,
  firmas por página (selector sesiones, mundos hub, nav sticky
  empresas, form paths contacto). Sin nuevas rutas ni reescritura
  factual. Club solo densificado.
- Arquitectura multipágina: Home = portal; hub `/experiencias`;
  sesiones y celebraciones bajo `/experiencias/*`;
  `/empresas-y-colegios`, `/eventos-y-comunidad`; Club en `/club`.
  Redirects 308 desde URLs legacy. Nav con dropdown Experiencias.
  Precios de celebraciones centralizados con flag de revisión
  (discrepancia narrativo vs tabla). Sin `/recursos`.
- Runtime: script `npm run dev:fresh` (`rm -rf .next && next dev`)
  para recuperar tras caché `.next` inconsistente que provocaba
  404 en `/_next/static/*`. Sin cambios de diseño ni de rutas.
- Contenido factual del DOCX "Restructuración página web" en
  `experiencias.ts`: INTRO, INTENCIONES, SESIONES/CELEBRACIONES/
  EMPRESAS/COMUNIDAD_PAGE, CLUB_HOME, precios y copy por experiencia.
  `experienciaUi` prioriza `priceLabel` e `idealForChips`.
  `conflictos.ts`: documento encontrado; testimonio y EJEMPLO de
  calendario no publicados.
- Páginas de experiencias y meta: sesiones privadas, celebraciones,
  empresas/colegios, comunidad, calendario, conóceme y contacto.
  Datos tipados; sin inventar precios, eventos ni certificaciones.
  Calendario muestra sesiones reales del Club (Septiembre) como
  meditación. Contacto abre WhatsApp (sin backend falso).
- Home de marca completa: HeroInicio (HOME_COPY), IntroInnerFlow,
  QueNecesitasHoy (filas de intenciones), PreviewExperiencias,
  ProximasExperiencias (EmptyState si EVENTOS vacío), ClubEnHome,
  CtaContactoHome; Lugar y Footer suavizado (menos claim solo-Club).
- Primitivos UI: FlowLine, EmptyState, SectionHeading,
  ExperienceDisclosure, EventCard. Boton con aria-expanded/controls/haspopup.
- Nav híbrida: barra (Experiencias / Calendario / Club) + Explorar
  (overlay de hojas, sin hamburguesa) + Hablemos → `/contacto`.
- Capa de datos de reestructuración: `site`, `experiencias`, `eventos`,
  `about`, `conflictos`; nav primaria + overlay; tokens de color del
  brief y `MODO_MOTION` en `breath.ts`. Precios fuera del Club
  ya integrados desde el DOCX (ver bullet de contenido factual).

## 2026-09-22

- Integración del documento de reestructuración: precios reales,
  bio de Analú, contacto (email + WhatsApp + IG), políticas
  operativas y CTAs factuales. Sin testimonios ni eventos de ejemplo.

## 2026-09-10

- Home de marca InnerFlow: hero sin media, vitrina de 5 servicios,
  El lugar. Meditation Club en `/club` (contenido anterior intacto).
- Páginas: sesiones privadas, eventos privados, empresas y colegios,
  comunidad. Nav global con submenú del Club; sin CTA Reservar suelto.

## 2026-08-30

- El “Reservar” del header vuelve a llevar al calendario; el resto
  de reservas sigue abriendo WhatsApp con mensaje preestablecido.
- Reservas por WhatsApp al 81 3260 8095 con mensaje preestablecido.
  En el calendario el mensaje incluye día, hora y modalidad.

## 2026-08-27

- Copy: **Inner Flow** (con espacio) en el hero; “No es necesario
  experiencia previa”; en Cómo funciona se aclara que hay que reservar.
- Solo móvil: Lenis desactivado (scroll nativo); video con
  autoplay más agresivo (gesto/scroll, sin `load()`); reveals
  un poco más lentos; manifiesto por línea en vez de scrub.
  Desktop (≥1024px) sin cambios de comportamiento.
- Hero móvil: el video ya se ve. Se elimina la animación
  `hero-entra` (opacity 0→1) que en la columna bajo el fold
  quedaba congelada en 0; el clip va encima del poster del
  mismo video (nunca `lugar.JPG`).
- Autoplay del hero: se quita el IntersectionObserver que
  pausaba el clip al cargar; se refuerza `muted`/`playsInline`,
  y la animación de entrada ya no bloquea el fade-out del still.
- Banner de próxima meditación: cuenta regresiva en vivo a la
  siguiente sesión del calendario (Septiembre). Al pasar la hora,
  salta sola a la que sigue; si el mes se acabó, se oculta.

## 2026-08-25

- Nav siempre sobre papel (`bg-arena`): los enlaces ya no se
  pierden contra el video. Se quita Pausar/Reanudar; el hero
  corre en lazo continuo.
- Hero rediseñado (“marca | escena”): columna de papel con
  **InnerFlow** + promesa; video a cuadro completo al lado
  (abajo en móvil). El cuenco ya no queda bajo el texto.
- Hero en móvil: el still ya no se oculta si Safari bloquea el
  autoplay; solo cede cuando `play()` confirma. Reintento tras
  el primer toque/click y al volver a la pestaña.

## 2026-08-22

- El hero en móvil vuelve a mostrar el video: velo más ligero,
  precarga auto y reintento de autoplay en Safari.
- Se elimina el halo que seguía al cursor.
- El lugar: fotos más grandes, como impresos superpuestos.
- Logos del nav y del footer en `--tinta` (café), no negros.
- Copy: tapete, online sin interrupciones, vigencia del mes, terraza,
  sesión de 50 a 60 minutos.
- El lugar: mapa de Casa Zenia en lugar del texto de cómo llegar.

## 2026-08-19

### Hero: composición cinematográfica

- El copy del hero baja a la esquina inferior izquierda, anclado a
  la base del viewport, con el título en dos líneas fijas
  (`Tu pausa` / `empieza aquí.`) y tamaño hasta 3.8rem.
- Se quita el lavado global de arena (`multiply`) que apagaba el
  video: ahora la escena respira limpia en el centro y solo hay
  velo donde hace falta (nav arriba, mancha radial abajo a la
  izquierda y base que sube en móvil).
- El botón de pausa pasa a la esquina inferior derecha para no
  chocar con el copy.
- Verificado a 390, 768, 1440 y 2560 px.

## 2026-08-17

### Bloque 10: políticas y privacidad

- Página `/politicas` con las 9 reglas del club (septiembre 2026,
  9 horas, sin reembolso, online solo en vivo) y aviso de
  privacidad. Enlace en el footer y en Membresía. FAQ alineada.

### Bloque 9: copy y ritmo

- El lugar: las dos fotos van en fila (enteras) para no alargar
  la sección. Ya no se ofrece tapete ni cobija: se pide traerlos
  si te sientas en el piso.
- Hero más alto y más abierto en escritorio (`115dvh`, velo más
  corto); el móvil no cambia de recorte ni de velo.
- Manifiesto reescrito en lenguaje claro.
- La sección de precios se titula Membresía.

### Bloque 8: fotos de Casa Zenia

- La sección El lugar deja el placeholder del isotipo y monta
  `lugar.JPG` (sala, 4/3) y `lugar1.jpeg` (detalle vertical, 3/4)
  enteras, sin recorte ni solape.

### Bloque 7: video de fondo en el hero

- `hero.MOV` (4K vertical, 24 MB) se deriva a `hero.mp4` (~3 MB, lazo
  palíndromo de ~8s, sin audio) y `hero-poster.jpg` para el LCP.
- Fondo a pantalla completa con recorte `cover`, velo de papel (no
  negro) para que la tinta siga leyéndose, y grado cálido al arena.
- Pausa visible (WCAG 2.2.2), `prefers-reduced-motion` deja el still,
  y el video se detiene al salir de vista.

## 2026-08-16

### Bloque 1: fundación

- Proyecto Next.js 15 con TypeScript, Tailwind v4, Motion y Lenis.
- Tokens de color, escala tipográfica fluida y compás de animación
  (4-4-6, ciclo de 14s) definidos en `@theme` y `lib/breath.ts`.
- Grano de papel global con feTurbulence, tarjetas de papel con
  dobleces, tipografía Shantell Sans (ejes BNCE/INFM) y Jost.
- Componente `TituloTrazo` con rotación determinista por palabra.

### Bloque 2: hero, nav y El Respirador

- Isotipo vectorizado como paths de línea central
  (`IsotipoTrazo`), medido pixel a pixel contra el PNG original.
- Nav fija con estado de scroll y menú móvil de hoja completa.
- Hero con las cuatro líneas del copy, isotipo respirando y
  parallax sutil de 40px.
- El Respirador: overlay guiado de 4 ciclos (56s) con máquina de
  estados, anillo-reloj SVG, palabras guía, contador, cierre con
  Esc/click fuera, foco atrapado y aterrizaje en precios.
- Botón flotante que reaparece al salir del hero.

### Bloques 3-5: contenido

- Franja de presentación con cuenta regresiva en vivo, data-driven
  (se oculta sola al pasar la fecha).
- Manifiesto con palabras que se encienden ligadas al scroll.
- Modalidades presencial/online con codificación azul/salvia.
- Calendario real (tabla semántica) con círculos a mano dibujados
  en cascada y detalle por día con botón de reserva.
- La carta de precios con puntos guía, números tabulares, círculo
  al hover y anotación "la que más eligen".
- Casa Zenia, FAQ acordeón (600ms) y footer con isotipo respirando.

### Bloque 6: pulido

- Contraste AA: tinta-suave subida a #6B573E, banner en
  salvia-hondo con pesos que pasan umbral, textos chicos en tinta
  sobre arena-hondo.
- Halo de cursor con lerp, preloader de trazo (máx 1.4s),
  metadata OG, favicon, JSON-LD LocalBusiness, README.
- Build de producción estático verificado (171kB First Load JS).
