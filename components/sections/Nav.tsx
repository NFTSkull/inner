"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Boton } from "@/components/ui/Boton";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";

const ENLACES = [
  { href: "/#calendario", texto: "Calendario" },
  { href: "/#precios", texto: "Membresía" },
  { href: "/#lugar", texto: "El lugar" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [conFondo, setConFondo] = useState(pathname !== "/");
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const alScrollear = () =>
      setConFondo(pathname !== "/" || window.scrollY > 32);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, [pathname]);

  useEffect(() => {
    if (!menuAbierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [menuAbierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-[600ms] ease-[var(--ease-respiro)] ${
        conFondo
          ? "border-b border-tinta/10 bg-arena/90"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/#hero" aria-label="InnerFlow, volver al inicio">
          <Image
            src="/inner.png"
            alt=""
            width={64}
            height={64}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {ENLACES.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="enlace-plumon text-cuerpo font-normal"
            >
              {enlace.texto}
            </a>
          ))}
          <Boton href="/#calendario" className="!px-6 !py-2.5">
            Reservar
          </Boton>
        </div>

        {/* Móvil */}
        <div className="flex items-center gap-3 md:hidden">
          <Boton href="/#calendario" className="!px-5 !py-2 text-sm">
            Reservar
          </Boton>
          <button
            type="button"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuAbierto((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px]"
          >
            <span
              className={`block h-[2.5px] w-6 rounded-full bg-tinta transition-transform duration-[400ms] ease-[var(--ease-respiro)] ${
                menuAbierto ? "translate-y-[5px] rotate-[43deg]" : "rotate-[-2deg]"
              }`}
            />
            <span
              className={`block h-[2.5px] w-6 rounded-full bg-tinta transition-transform duration-[400ms] ease-[var(--ease-respiro)] ${
                menuAbierto ? "-translate-y-[4.5px] rotate-[-43deg]" : "rotate-[1.5deg]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Hoja completa en móvil */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 top-[72px] z-40 flex flex-col items-center justify-center gap-10 bg-arena md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURACION.corta, ease: EASE_RESPIRO }}
          >
            {ENLACES.map((enlace, i) => (
              <motion.a
                key={enlace.href}
                href={enlace.href}
                onClick={() => setMenuAbierto(false)}
                className="display-trazo text-titulo text-tinta"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURACION.corta,
                  ease: EASE_RESPIRO,
                  delay: 0.09 * (i + 1),
                }}
              >
                {enlace.texto}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
