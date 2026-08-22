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
  const [enVista, setEnVista] = useState(true);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setEnVista(entrada.isIntersecting),
      { threshold: 0.2 }
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [reducir]);

  useEffect(() => {
    const nodo = videoRef.current;
    if (!nodo || reducir) return;
    nodo.muted = true;
    nodo.playsInline = true;
    if (!pausado && enVista) {
      void nodo.play().catch(() => {
        /* Autoplay bloqueado: se queda el still. */
      });
    } else {
      nodo.pause();
    }
  }, [pausado, enVista, reducir]);

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
        className="media-hero"
      />
      {!reducir && (
        <video
          ref={videoRef}
          className="media-hero"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          disablePictureInPicture
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="velo-hero absolute inset-0" />
    </div>
  );
}
