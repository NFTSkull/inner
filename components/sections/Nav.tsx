"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useLenis } from "@/components/motion/LenisProvider";
import { Boton } from "@/components/ui/Boton";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";
import { DURACION, EASE_RESPIRO, rotacionDeTrazo } from "@/lib/breath";
import {
  ENLACES_EXPERIENCIAS,
  ENLACES_OVERLAY,
  ENLACES_PRIMARIOS,
  enlacesActivos,
  type EnlaceNav,
} from "@/lib/data/navegacion";
import { RUTAS } from "@/lib/data/rutas";

/**
 * Nav multipágina ligera: logo · cápsula (Experiencias ▾ · Calendario ·
 * Meditation Club · Conóceme) · Hablemos →.
 * Móvil: overlay con todos los destinos visibles (sin navegación oculta).
 */

function rotacionHoja(id: string, indice: number): number {
  return rotacionDeTrazo(id, indice) * 2.2;
}

function Enlace({
  enlace,
  className,
  onClick,
}: {
  enlace: EnlaceNav;
  className: string;
  onClick?: () => void;
}) {
  if (enlace.href.includes("#")) {
    return (
      <a href={enlace.href} className={className} onClick={onClick}>
        {enlace.texto}
      </a>
    );
  }
  return (
    <Link href={enlace.href} className={className} onClick={onClick}>
      {enlace.texto}
    </Link>
  );
}

const CLASE_ITEM_CAPSULA =
  "rounded-full px-4 py-2 text-[0.95rem] font-normal text-tinta transition-colors duration-[400ms] ease-[var(--ease-respiro)] hover:bg-papel/80 focus-visible:bg-papel/80";

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const overlayId = useId();
  const dropId = useId();
  const [conFondo, setConFondo] = useState(pathname !== "/");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [dropExp, setDropExp] = useState(false);
  const hojasRef = useRef<HTMLDivElement>(null);
  const explorarRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  /** El hover ya abrió el menú: el clic siguiente no debe cerrarlo. */
  const abiertoPorHover = useRef(false);
  const primerHojaRef = useRef<HTMLElement | null>(null);

  const cerrar = useCallback(() => {
    setMenuAbierto(false);
    setDropExp(false);
  }, []);

  useEffect(() => {
    const alScrollear = () =>
      setConFondo(pathname !== "/" || window.scrollY > 32);
    alScrollear();
    if (lenis) {
      lenis.on("scroll", alScrollear);
      return () => lenis.off("scroll", alScrollear);
    }
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, [pathname, lenis]);

  useEffect(() => {
    cerrar();
  }, [pathname, cerrar]);

  useEffect(() => {
    if (!menuAbierto) return;

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrar();
        return;
      }
      if (e.key !== "Tab") return;

      const focoables = [
        ...(explorarRef.current?.querySelectorAll<HTMLElement>(
          "button, a[href]"
        ) ?? []),
        ...(hojasRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])"
        ) ?? []),
      ].filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

      if (focoables.length === 0) return;
      const primero = focoables[0];
      const ultimo = focoables[focoables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    window.addEventListener("keydown", alTeclear);
    const t = window.setTimeout(() => {
      primerHojaRef.current?.focus();
    }, 50);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      window.removeEventListener("keydown", alTeclear);
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [menuAbierto, cerrar, lenis]);

  useEffect(() => {
    if (!dropExp) return;
    const alClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropExp(false);
      }
    };
    const alEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropExp(false);
    };
    window.addEventListener("mousedown", alClick);
    window.addEventListener("keydown", alEsc);
    return () => {
      window.removeEventListener("mousedown", alClick);
      window.removeEventListener("keydown", alEsc);
    };
  }, [dropExp]);

  const alClickFondo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hojasRef.current && !hojasRef.current.contains(e.target as Node)) {
      cerrar();
    }
  };

  const activo = (href: string) =>
    href !== RUTAS.home && pathname.startsWith(href.split("#")[0]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-[600ms] ease-[var(--ease-respiro)] ${
        conFondo || menuAbierto
          ? "border-tinta/10 bg-arena/95"
          : "border-transparent bg-arena"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto grid h-[68px] w-full max-w-[97.5rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href={RUTAS.home}
          aria-label="Inner Flow, volver al inicio"
          className="shrink-0"
        >
          <Image
            src="/inner.png"
            alt=""
            width={64}
            height={64}
            className="logo-tinta h-10 w-auto sm:h-11"
            sizes="44px"
            quality={70}
            priority
          />
        </Link>

        <div className="hidden min-w-0 justify-center lg:flex">
          <div className="flex items-center gap-0.5 rounded-full border border-tinta/10 bg-papel/55 p-1 backdrop-blur-md">
            {enlacesActivos(ENLACES_PRIMARIOS).map((enlace) => {
              if (enlace.hijos && enlace.href === RUTAS.experiencias) {
                const enExperiencias =
                  activo(RUTAS.experiencias) ||
                  ENLACES_EXPERIENCIAS.some((h) => activo(h.href));
                return (
                  <div
                    key={enlace.href}
                    ref={dropRef}
                    className="relative"
                    onMouseEnter={() => {
                      abiertoPorHover.current = true;
                      setDropExp(true);
                    }}
                    onMouseLeave={() => {
                      abiertoPorHover.current = false;
                      setDropExp(false);
                    }}
                  >
                    <button
                      type="button"
                      className={`${CLASE_ITEM_CAPSULA} inline-flex items-center gap-1.5 ${
                        enExperiencias ? "bg-papel" : ""
                      }`}
                      aria-expanded={dropExp}
                      aria-controls={dropId}
                      aria-haspopup="true"
                      onClick={() => {
                        if (abiertoPorHover.current) {
                          abiertoPorHover.current = false;
                          setDropExp(true);
                          return;
                        }
                        setDropExp((v) => !v);
                      }}
                    >
                      {enlace.texto}
                      <span
                        aria-hidden="true"
                        className={`text-[0.7em] text-tinta-suave transition-transform duration-[400ms] ease-[var(--ease-respiro)] ${
                          dropExp ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                    <AnimatePresence>
                      {dropExp && (
                        <motion.div
                          id={dropId}
                          role="menu"
                          aria-label="Experiencias"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{
                            duration: DURACION.corta,
                            ease: EASE_RESPIRO,
                          }}
                          className="absolute left-0 top-full z-50 pt-2"
                        >
                          <ul
                            className="w-60 border border-tinta/10 bg-papel p-1.5"
                            style={{
                              borderRadius: "18px",
                              boxShadow: "var(--shadow-papel)",
                            }}
                          >
                            {ENLACES_EXPERIENCIAS.map((hijo) => (
                              <li key={hijo.href}>
                                <Link
                                  href={hijo.href}
                                  role="menuitem"
                                  className="group flex items-center justify-between rounded-[12px] px-3.5 py-2.5 text-cuerpo text-tinta transition-colors duration-[400ms] ease-[var(--ease-respiro)] hover:bg-arena/60"
                                  onClick={() => setDropExp(false)}
                                >
                                  {hijo.texto}
                                  <span
                                    aria-hidden="true"
                                    className="text-tinta-suave opacity-0 transition-[opacity,transform] duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-0.5 group-hover:opacity-100"
                                  >
                                    →
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Enlace
                  key={enlace.href}
                  enlace={enlace}
                  className={`${CLASE_ITEM_CAPSULA} ${
                    activo(enlace.href) ? "bg-papel" : ""
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div
          ref={explorarRef}
          className="col-start-3 flex items-center justify-end gap-2 sm:gap-3"
        >
          <Link
            href={RUTAS.contacto}
            className="group hidden items-center gap-1.5 text-cuerpo font-normal text-tinta sm:inline-flex"
          >
            <span className="enlace-plumon">Hablemos</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <Boton
            variante="primario"
            className="!px-5 !py-2 lg:hidden"
            aria-expanded={menuAbierto}
            aria-controls={overlayId}
            aria-haspopup="dialog"
            onClick={() => setMenuAbierto((v) => !v)}
          >
            {menuAbierto ? "Cerrar" : "Menú"}
          </Boton>
        </div>
      </nav>

      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            id={overlayId}
            role="dialog"
            aria-modal="true"
            aria-label="Menú Inner Flow"
            className="fixed inset-0 top-[68px] z-40 overflow-y-auto bg-arena lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURACION.corta, ease: EASE_RESPIRO }}
            onMouseDown={alClickFondo}
          >
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <IsotipoTrazo className="respira-lento h-[min(70vw,28rem)] text-tinta opacity-[0.08]" />
            </div>

            <div
              ref={hojasRef}
              className="relative mx-auto flex max-w-3xl flex-col gap-8 px-5 py-7 sm:px-8 sm:py-10"
            >
              <div>
                <Link
                  href={RUTAS.experiencias}
                  onClick={cerrar}
                  className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave"
                >
                  Experiencias
                </Link>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                  {ENLACES_EXPERIENCIAS.map((enlace, i) => {
                    const rot = rotacionHoja(enlace.href, i);
                    return (
                      <motion.div
                        key={enlace.href}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: DURACION.corta,
                          ease: EASE_RESPIRO,
                          delay: 0.07 * (i + 1),
                        }}
                        style={{
                          transform: `rotate(${rot}deg)`,
                          borderRadius: "var(--radius-papel)",
                          boxShadow: "var(--shadow-papel)",
                        }}
                      >
                        <Link
                          href={enlace.href}
                          ref={
                            i === 0
                              ? (el) => {
                                  primerHojaRef.current = el;
                                }
                              : undefined
                          }
                          onClick={cerrar}
                          className="flex min-h-[4.75rem] items-end bg-papel px-4 py-4 text-[1.05rem] font-normal leading-snug text-tinta sm:px-5"
                          style={{ borderRadius: "var(--radius-papel)" }}
                        >
                          {enlace.texto}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <ul className="border-t border-tinta/12">
                {enlacesActivos(ENLACES_OVERLAY).map((enlace) => (
                  <li key={enlace.href} className="border-b border-tinta/12">
                    <Link
                      href={enlace.href}
                      onClick={cerrar}
                      className="flex items-center justify-between py-4 text-[1.35rem] font-normal tracking-[-0.01em] text-tinta"
                    >
                      {enlace.texto}
                      <span aria-hidden="true" className="text-tinta-suave">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
