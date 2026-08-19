# Changelog

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
