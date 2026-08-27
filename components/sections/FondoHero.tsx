"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_MP4 = "/hero.mp4?v=11";
const HERO_POSTER = "/hero-poster.jpg?v=11";

/**
 * Atributos iOS/Safari que React a veces no aplica a tiempo
 * para que el autoplay muted pase la política del navegador.
 */
function prepararParaAutoplay(nodo: HTMLVideoElement) {
  nodo.defaultMuted = true;
  nodo.muted = true;
  nodo.volume = 0;
  nodo.playsInline = true;
  nodo.setAttribute("muted", "");
  nodo.setAttribute("playsinline", "");
  nodo.setAttribute("webkit-playsinline", "true");
}

/**
 * Fondo del hero: video en lazo continuo.
 * Still encima hasta que play() confirma; si el autoplay falla,
 * el still se queda (Safari Low Power / políticas del navegador).
 */
export function FondoHero() {
  const reducir = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoActivo, setVideoActivo] = useState(false);

  const asignarVideo = useCallback((nodo: HTMLVideoElement | null) => {
    videoRef.current = nodo;
    if (nodo) prepararParaAutoplay(nodo);
  }, []);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || reducir) return;

    let cancelado = false;
    let reintento: ReturnType<typeof setTimeout> | undefined;
    let intentos = 0;

    prepararParaAutoplay(nodo);

    const marcarActivo = () => {
      if (!cancelado) setVideoActivo(true);
    };

    const marcarInactivo = () => {
      if (!cancelado) setVideoActivo(false);
    };

    const reproducir = () => {
      if (cancelado || document.visibilityState === "hidden") return;
      prepararParaAutoplay(nodo);

      void nodo
        .play()
        .then(() => {
          intentos = 0;
          marcarActivo();
        })
        .catch(() => {
          marcarInactivo();
          /* Reintentos cortos: Safari a veces bloquea el primer play(). */
          if (cancelado || intentos >= 10) return;
          intentos += 1;
          reintento = setTimeout(reproducir, 350 * intentos);
        });
    };

    const alPlaying = () => marcarActivo();
    const alCanPlay = () => reproducir();

    nodo.addEventListener("playing", alPlaying);
    nodo.addEventListener("canplay", alCanPlay);
    nodo.addEventListener("loadeddata", alCanPlay);

    const alGesto = () => reproducir();
    const alVisible = () => {
      if (document.visibilityState === "visible") reproducir();
    };

    /* once: el primer gesto desbloquea políticas estrictas sin spamear play(). */
    document.addEventListener("touchstart", alGesto, {
      passive: true,
      once: true,
    });
    document.addEventListener("pointerdown", alGesto, {
      passive: true,
      once: true,
    });
    document.addEventListener("visibilitychange", alVisible);

    if (nodo.readyState >= 2) {
      reproducir();
    } else {
      nodo.load();
      reproducir();
    }

    /* Si tras 1.5s sigue pausado, otro intento (preloader / hidratación). */
    const tardio = setTimeout(reproducir, 1500);

    return () => {
      cancelado = true;
      clearTimeout(reintento);
      clearTimeout(tardio);
      nodo.removeEventListener("playing", alPlaying);
      nodo.removeEventListener("canplay", alCanPlay);
      nodo.removeEventListener("loadeddata", alCanPlay);
      document.removeEventListener("touchstart", alGesto);
      document.removeEventListener("pointerdown", alGesto);
      document.removeEventListener("visibilitychange", alVisible);
    };
  }, [reducir]);

  return (
    <div
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
    >
      <div className="marco-hero absolute inset-0">
        {!reducir && (
          <video
            ref={asignarVideo}
            className="media-hero media-hero-video z-0"
            src={HERO_MP4}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            disablePictureInPicture
          />
        )}
        <Image
          src={reducir ? "/lugar.JPG" : HERO_POSTER}
          alt=""
          fill
          priority
          quality={70}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={`media-hero z-[1] transition-opacity duration-500 ${
            videoActivo && !reducir
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
        />
      </div>
      <div className="velo-hero absolute inset-0 z-[2]" />
    </div>
  );
}
