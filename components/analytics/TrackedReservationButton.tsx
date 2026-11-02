"use client";

import { Boton } from "@/components/ui/Boton";
import { medirLeadReserva } from "@/lib/openai-ads";

type Props = {
  href: string;
  eventKey: string;
  children: React.ReactNode;
  className?: string;
};

export function TrackedReservationButton({
  href,
  eventKey,
  children,
  className = "",
}: Props) {
  return (
    <Boton
      variante="primario"
      href={href}
      externo
      className={className}
      onClick={() => {
        medirLeadReserva(eventKey);
      }}
    >
      {children}
    </Boton>
  );
}
