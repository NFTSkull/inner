"use client";

import Image, { getImageProps } from "next/image";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { useEsMovil } from "@/lib/viewport";

export type MediosHero = {
  mp4: string;
  /** Recorte vertical para pantallas < 768px (se elige con <source media>). */
  mp4Movil?: string;
  /** Respaldo para navegadores sin H.264. */
  webm?: string;
  poster: string;
  posterMovil?: string;
  sizes?: string;
  /** Clases de encuadre para video y poster. */
  claseMedia?: string;
};

const MEDIOS_CLUB: MediosHero = {
  mp4: "/hero.mp4?v=13",
  poster: "/hero-poster.jpg?v=13",
  sizes: "(min-width: 1024px) 60vw, 100vw",
  claseMedia: "media-hero",
};

const MEDIA_MOVIL = "(max-width: 767px)";
const MEDIA_DESKTOP = "(min-width: 768px)";

function Poster({ medios }: { medios: MediosHero }) {
  const clase = `${medios.claseMedia ?? "media-hero"} z-0`;
  const sizes = medios.sizes ?? "100vw";

  if (!medios.posterMovil) {
    return (
      <Image
        src={medios.poster}
        alt=""
        fill
        priority
        quality={70}
        sizes={sizes}
        className={clase}
      />
    );
  }

  const comun = { alt: "", fill: true, priority: true, quality: 70, sizes };
  const {
    props: { srcSet: srcDesktop },
  } = getImageProps({ ...comun, src: medios.poster });
  const {
    props: { srcSet: srcMovil, ...resto },
  } = getImageProps({ ...comun, src: medios.posterMovil });

  return (
    <picture>
      <source media={MEDIA_DESKTOP} srcSet={srcDesktop} />
      <source media={MEDIA_MOVIL} srcSet={srcMovil} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...resto} className={clase} />
    </picture>
  );
}

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
export function FondoHero({ medios = MEDIOS_CLUB }: { medios?: MediosHero }) {
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
        <Poster medios={medios} />
        {montarVideo && (
          <video
            ref={asignarVideo}
            className={`${medios.claseMedia ?? "media-hero"} z-[1]`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={medios.posterMovil ? undefined : medios.poster}
            disablePictureInPicture
          >
            {medios.mp4Movil && (
              <source
                src={medios.mp4Movil}
                type="video/mp4"
                media={MEDIA_MOVIL}
              />
            )}
            <source src={medios.mp4} type="video/mp4" />
            {medios.webm && <source src={medios.webm} type="video/webm" />}
          </video>
        )}
      </div>
      <div className="velo-hero absolute inset-0 z-[2]" />
    </div>
  );
}
