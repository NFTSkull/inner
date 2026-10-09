import Link from "next/link";
import { Boton } from "@/components/ui/Boton";

type Cta = {
  texto: string;
  href?: string;
  onClick?: () => void;
  externo?: boolean;
};

type Props = {
  title: string;
  body: string;
  primary: Cta;
  secondary?: { texto: string; href: string };
  className?: string;
};

/**
 * Empty state editorial (sin tarjeta forzada).
 */
export function EmptyState({
  title,
  body,
  primary,
  secondary,
  className = "",
}: Props) {
  return (
    <div
      className={`max-w-lg border-t-2 border-tierra/40 pt-6 text-left ${className}`}
    >
      <h2 className="text-titulo font-normal text-tinta">{title}</h2>
      <p className="mt-3 text-cuerpo text-tinta-suave">{body}</p>
      <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
        <Boton
          variante="primario"
          href={primary.href}
          onClick={primary.onClick}
          externo={primary.externo}
        >
          {primary.texto}
        </Boton>
        {secondary && (
          <Link
            href={secondary.href}
            className="enlace-plumon text-cuerpo font-normal text-tinta-suave"
          >
            {secondary.texto}
          </Link>
        )}
      </div>
    </div>
  );
}
