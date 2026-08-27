"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Fondo del hero: video en lazo continuo, y still si hay
 * prefers-reduced-motion o si el autoplay falla (Safari/iOS).
 */
export function FondoHero() {
  const reducir = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoActivo, setVideoActivo] = useState(false);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || reducir) return;

    let cancelado = false;

    nodo.defaultMuted = true;
    nodo.muted = true;
    nodo.playsInline = true;
    nodo.setAttribute("muted", "");
    nodo.setAttribute("playsinline", "");
    nodo.setAttribute("webkit-playsinline", "true");

    const marcarActivo = () => {
      if (!cancelado) setVideoActivo(true);
    };

    const marcarInactivo = () => {
      if (!cancelado) setVideoActivo(false);
    };

    const reproducir = () => {
      if (cancelado) return;
      void nodo.play().then(marcarActivo).catch(marcarInactivo);
    };

    const alPlaying = () => marcarActivo();

    nodo.addEventListener("loadeddata", reproducir);
    nodo.addEventListener("canplay", reproducir);
    nodo.addEventListener("playing", alPlaying);

    const alGesto = () => reproducir();
    const alVisible = () => {
      if (document.visibilityState === "visible") reproducir();
    };
    document.addEventListener("touchstart", alGesto, { passive: true });
    document.addEventListener("click", alGesto, { passive: true });
    document.addEventListener("visibilitychange", alVisible);

    if (nodo.readyState >= 2) {
      reproducir();
    } else {
      nodo.load();
    }

    return () => {
      cancelado = true;
      nodo.removeEventListener("loadeddata", reproducir);
      nodo.removeEventListener("canplay", reproducir);
      nodo.removeEventListener("playing", alPlaying);
      document.removeEventListener("touchstart", alGesto);
      document.removeEventListener("click", alGesto);
      document.removeEventListener("visibilitychange", alVisible);
    };
  }, [reducir]);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || reducir) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          void nodo
            .play()
            .then(() => setVideoActivo(true))
            .catch(() => setVideoActivo(false));
        } else {
          nodo.pause();
        }
      },
      { threshold: 0.1 }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [reducir]);

  return (
    <div
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
    >
      <div className="marco-hero absolute inset-0">
        {!reducir && (
          <video
            ref={videoRef}
            className="media-hero z-0"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg?v=10"
            disablePictureInPicture
          >
            <source src="/hero.mp4?v=10" type="video/mp4" />
          </video>
        )}
        <Image
          src={reducir ? "/lugar.JPG" : "/hero-poster.jpg?v=10"}
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          className={`media-hero z-[1] transition-opacity duration-500 ${
            videoActivo && !reducir ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="velo-hero absolute inset-0 z-[2]" />
    </div>
  );
}
