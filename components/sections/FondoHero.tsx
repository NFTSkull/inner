"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  pausado: boolean;
};

/**
 * Fondo del hero: video en lazo, velo de arena, y lugar.JPG
 * si hay prefers-reduced-motion.
 */
export function FondoHero({ pausado }: Props) {
  const reducir = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoActivo, setVideoActivo] = useState(false);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || reducir) return;

    nodo.muted = true;
    nodo.playsInline = true;
    nodo.setAttribute("webkit-playsinline", "true");

    const reproducir = () => {
      if (pausado) {
        nodo.pause();
        return;
      }
      void nodo.play().then(() => setVideoActivo(true)).catch(() => {
        /* Autoplay bloqueado: se queda el still. */
      });
    };

    const alListo = () => {
      setVideoActivo(true);
      reproducir();
    };

    nodo.addEventListener("loadeddata", alListo);
    nodo.addEventListener("canplay", alListo);

    if (nodo.readyState >= 2) {
      alListo();
    } else {
      nodo.load();
    }

    return () => {
      nodo.removeEventListener("loadeddata", alListo);
      nodo.removeEventListener("canplay", alListo);
    };
  }, [pausado, reducir]);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || reducir) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting && !pausado) {
          void nodo.play().catch(() => {});
        } else {
          nodo.pause();
        }
      },
      { threshold: 0.1 }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [pausado, reducir]);

  return (
    <div
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src={reducir ? "/lugar.JPG" : "/hero-poster.jpg"}
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className={`media-hero transition-opacity duration-500 ${
          videoActivo && !reducir ? "opacity-0" : "opacity-100"
        }`}
      />
      {!reducir && (
        <video
          ref={videoRef}
          className="media-hero z-[1]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          disablePictureInPicture
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="velo-hero absolute inset-0 z-[2]" />
    </div>
  );
}
