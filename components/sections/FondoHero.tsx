"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { useEsMovil } from "@/lib/viewport";

const HERO_MP4 = "/hero.mp4?v=13";
const HERO_POSTER = "/hero-poster.jpg?v=13";

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
 * Fondo del hero. En desktop (≥1024) el comportamiento previo se
 * mantiene. En móvil: siempre monta el video, reintenta play al
 * scroll/gesto y no llama load() (rompe autoplay en iOS).
 */
export function FondoHero() {
  const reducir = useReducedMotion();
  const esMovil = useEsMovil();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marcoRef = useRef<HTMLDivElement | null>(null);

  /* En móvil priorizamos el clip aunque haya reduce-motion del SO:
     el still estático se leía como “no hay video”. Desktop respeta reducir. */
  const montarVideo = esMovil || !reducir;

  const asignarVideo = useCallback((nodo: HTMLVideoElement | null) => {
    videoRef.current = nodo;
    if (nodo) prepararParaAutoplay(nodo);
  }, []);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || !montarVideo) return;

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
          if (cancelado || intentos >= 14) return;
          intentos += 1;
          reintento = setTimeout(reproducir, 280 * intentos);
        }
      );
    };

    nodo.addEventListener("canplay", reproducir);
    nodo.addEventListener("loadeddata", reproducir);
    nodo.addEventListener("playing", reproducir);

    const alGesto = () => reproducir();
    const alVisible = () => {
      if (document.visibilityState === "visible") reproducir();
    };

    document.addEventListener("touchstart", alGesto, { passive: true });
    document.addEventListener("touchend", alGesto, { passive: true });
    document.addEventListener("pointerdown", alGesto, { passive: true });
    document.addEventListener("visibilitychange", alVisible);

    const blanco = marcoRef.current ?? nodo;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) reproducir();
      },
      {
        threshold: esMovil ? 0.01 : 0.05,
        rootMargin: esMovil ? "40% 0px" : "120px 0px",
      }
    );
    observador.observe(blanco);

    if (esMovil) {
      /* iOS: el primer scroll cuenta como gesto y desbloquea autoplay. */
      window.addEventListener("scroll", reproducir, { passive: true });
      reproducir();
    } else {
      if (nodo.readyState >= 2) reproducir();
      else {
        nodo.load();
        reproducir();
      }
    }

    const tardio = setTimeout(reproducir, esMovil ? 600 : 1200);

    return () => {
      cancelado = true;
      clearTimeout(reintento);
      clearTimeout(tardio);
      observador.disconnect();
      nodo.removeEventListener("canplay", reproducir);
      nodo.removeEventListener("loadeddata", reproducir);
      nodo.removeEventListener("playing", reproducir);
      document.removeEventListener("touchstart", alGesto);
      document.removeEventListener("touchend", alGesto);
      document.removeEventListener("pointerdown", alGesto);
      document.removeEventListener("visibilitychange", alVisible);
      if (esMovil) window.removeEventListener("scroll", reproducir);
    };
  }, [montarVideo, esMovil]);

  return (
    <div
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
    >
      <div ref={marcoRef} className="marco-hero absolute inset-0">
        <Image
          src={HERO_POSTER}
          alt=""
          fill
          priority
          quality={70}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="media-hero z-0"
        />
        {montarVideo && (
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
