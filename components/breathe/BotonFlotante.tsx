"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRespirador } from "@/components/breathe/RespiradorContext";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";
import { DURACION, EASE_RESPIRO } from "@/lib/breath";

/**
 * El isotipo a 40px latiendo lento en la esquina inferior derecha.
 * Aparece cuando el hero sale del viewport y relanza El Respirador.
 */
export function BotonFlotante() {
  const { abrir } = useRespirador();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setVisible(!entrada.isIntersecting),
      { threshold: 0.1 }
    );
    observador.observe(hero);
    return () => observador.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={abrir}
          aria-label="Respira un minuto conmigo"
          className="fixed bottom-6 right-6 z-40 cursor-pointer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: DURACION.corta, ease: EASE_RESPIRO }}
        >
          <IsotipoTrazo className="respira-lento h-10 w-10 text-tinta transition-colors duration-[400ms] hover:text-azul-hondo" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
