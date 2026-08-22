"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useState } from "react";

const Respirador = dynamic(
  () =>
    import("@/components/breathe/Respirador").then((m) => m.Respirador),
  { ssr: false }
);

const Contexto = createContext<{ abrir: () => void }>({ abrir: () => {} });

/** Cualquier componente puede lanzar El Respirador con esto */
export function useRespirador() {
  return useContext(Contexto);
}

export function RespiradorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [abierto, setAbierto] = useState(false);
  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => setAbierto(false), []);

  return (
    <Contexto.Provider value={{ abrir }}>
      {children}
      <Respirador abierto={abierto} alCerrar={cerrar} />
    </Contexto.Provider>
  );
}
