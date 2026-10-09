"use client";

import { useEffect, useState } from "react";

/**
 * "Ahora" compartido entre servidor y cliente: el primer render usa el
 * instante del servidor (sin desajuste de hidratación) y después se
 * actualiza con el reloj del navegador.
 */
export function useAhora(inicialISO: string, cadaMs = 60000): Date {
  const [ahora, setAhora] = useState(() => new Date(inicialISO));

  useEffect(() => {
    setAhora(new Date());
    const intervalo = setInterval(() => setAhora(new Date()), cadaMs);
    return () => clearInterval(intervalo);
  }, [cadaMs]);

  return ahora;
}
