import Link from "next/link";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";

type Props = {
  children: React.ReactNode;
  /** Si hay href se renderiza como enlace */
  href?: string;
  onClick?: () => void;
  /** El primario lleva el isotipo, que aparece al hover con giro */
  variante?: "primario" | "secundario";
  className?: string;
  externo?: boolean;
  /** Solo aplica cuando es <button> (sin href). */
  type?: "button" | "submit";
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: boolean | "dialog" | "menu" | "listbox" | "tree" | "grid";
};

export function Boton({
  children,
  href,
  onClick,
  variante = "secundario",
  className = "",
  externo = false,
  type = "button",
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  "aria-haspopup": ariaHaspopup,
}: Props) {
  const clases = `pildora group px-7 py-3 text-cuerpo ${className}`;

  const contenido = (
    <>
      {variante === "primario" && (
        <IsotipoTrazo
          className="h-[1.2em] w-[1.2em] -rotate-12 opacity-0 transition-[opacity,transform] duration-[600ms] ease-[var(--ease-respiro)] group-hover:rotate-0 group-hover:opacity-100 group-focus-visible:rotate-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        />
      )}
      <span>{children}</span>
    </>
  );

  if (href) {
    if (externo) {
      return (
        <a
          href={href}
          className={clases}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {contenido}
        </a>
      );
    }
    if (href.includes("#")) {
      return (
        <a href={href} className={clases} onClick={onClick}>
          {contenido}
        </a>
      );
    }
    return (
      <Link href={href} className={clases} onClick={onClick}>
        {contenido}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={clases}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-haspopup={ariaHaspopup}
    >
      {contenido}
    </button>
  );
}
