import { TituloTrazo } from "@/components/ui/TituloTrazo";

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  /** Si true, usa TituloTrazo (acento Shantell). Por defecto Jost estructural. */
  trazo?: boolean;
  etiqueta?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Encabezado de sección: eyebrow opcional, título estructural, cuerpo corto.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  trazo = false,
  etiqueta = "h2",
  className = "",
}: Props) {
  const Etiqueta = etiqueta;
  const alineacion =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-left";
  const tituloClase = `${eyebrow ? "mt-2" : ""} text-[clamp(1.65rem,3.6vw,2.5rem)] leading-[1.08] text-tinta`;

  return (
    <header
      className={`flex max-w-[var(--measure-copy)] flex-col ${alineacion} ${className}`}
    >
      {eyebrow && (
        <p className="text-etiqueta uppercase tracking-[0.14em] text-tinta-suave">
          {eyebrow}
        </p>
      )}
      {trazo ? (
        <TituloTrazo
          texto={title}
          etiqueta={etiqueta}
          className={tituloClase}
        />
      ) : (
        <Etiqueta
          className={`${eyebrow ? "mt-2" : ""} text-[clamp(1.65rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-[-0.025em] text-tinta`}
        >
          {title}
        </Etiqueta>
      )}
      {body && (
        <p className="mt-3 max-w-xl text-cuerpo-l text-tinta">{body}</p>
      )}
    </header>
  );
}
