# InnerFlow · Meditation Club

Sitio del Meditation Club de InnerFlow en Monterrey. Todo el sitio
respira en un compás de 14 segundos: inhalar 4, sostener 4, exhalar 6.

## Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

| Comando             | Qué hace                              |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                |
| `npm run build`     | Build de producción (estático)        |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | TypeScript sin emitir                 |

## Dónde se edita el contenido

- `lib/data/sesiones.ts`: calendario del mes, sesión de presentación
  (el banner se oculta solo cuando la fecha pasa) y enlace de reserva.
- `lib/data/politicas.ts`: políticas del club y aviso de privacidad.
- `lib/data/precios.ts`: precios y membresías.
- `lib/breath.ts`: el compás de movimiento. Única fuente de verdad de
  todas las duraciones del sitio.

## Sistema de diseño

- Tokens de color y tipografía en `app/globals.css` bajo `@theme`.
- Display: Shantell Sans (ejes BNCE e INFM). Cuerpo: Jost.
- El isotipo vive vectorizado en `components/ui/IsotipoTrazo.tsx`,
  redibujado como paths de línea central para poder animar el trazo.
- El Respirador (el ejercicio guiado de un minuto) está en
  `components/breathe/`.

## Assets

- `public/inner.png`: wordmark completo (nav y footer).
- `public/innerlogo.png`: isotipo original.
- `public/lugar.JPG` y `public/lugar1.jpeg`: fotos de Casa Zenia
  (sección El lugar).
- `public/hero.MOV`: fuente del fondo del hero. No se sirve en la página.
- `public/hero.mp4` y `public/hero-poster.jpg` se regeneran con
  `bash scripts/generar-hero.sh` (requiere ffmpeg).
- `app/icon.png` y `public/og.png` se regeneran con
  `node scripts/generar-assets.mjs`.

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis.
Sin librerías de componentes: cada pieza está escrita a mano.
