"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

const HERO_MP4 = "/hero.mp4?v=12";
const HERO_POSTER = "/hero-poster.jpg?v=12";

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
 * Fondo del hero: video encima del poster del mismo clip.
 * Sin animación de opacity (en móvil quedaba congelada en 0).
 * Nunca usamos lugar.JPG aquí.
 */
export function FondoHero() {
  const reducir = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

    const reproducir = () => {
      if (cancelado || document.visibilityState === "hidden") return;
      prepararParaAutoplay(nodo);

      void nodo.play().then(
        () => {
          intentos = 0;
        },
        () => {
          if (cancelado || intentos >= 12) return;
          intentos += 1;
          reintento = setTimeout(reproducir, 300 * intentos);
        }
      );
    };

    nodo.addEventListener("canplay", reproducir);
    nodo.addEventListener("loadeddata", reproducir);

    const alGesto = () => reproducir();
    const alVisible = () => {
      if (document.visibilityState === "visible") reproducir();
    };

    document.addEventListener("touchstart", alGesto, { passive: true });
    document.addEventListener("pointerdown", alGesto, { passive: true });
    document.addEventListener("visibilitychange", alVisible);

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) reproducir();
      },
      { threshold: 0.05, rootMargin: "120px 0px" }
    );
    observador.observe(nodo);

    if (nodo.readyState >= 2) {
      reproducir();
    } else {
      nodo.load();
      reproducir();
    }

    const tardio = setTimeout(reproducir, 1200);

    return () => {
      cancelado = true;
      clearTimeout(reintento);
      clearTimeout(tardio);
      observador.disconnect();
      nodo.removeEventListener("canplay", reproducir);
      nodo.removeEventListener("loadeddata", reproducir);
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
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          quality={70}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="media-hero z-0"
        />
        {!reducir && (
          <video
            ref={asignarVideo}
            className="media-hero z-[1]"
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
      </div>
      <div className="velo-hero absolute inset-0 z-[2]" />
    </div>
  );
}
