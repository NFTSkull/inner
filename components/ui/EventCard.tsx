export type EventCardData = {
  name?: string;
  intention?: string;
  description?: string;
  /** Día grande (ej. "15"). */
  day?: string;
  /** Mes corto (ej. "OCT"). */
  month?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  duration?: string;
  price?: string;
  capacity?: string;
  availability?: string;
  includes?: readonly string[];
  category?: string;
  ctaTexto?: string;
  ctaHref?: string;
  ctaExterno?: boolean;
  /** Ya ocurrió: se atenúa y no ofrece reserva. */
  realizada?: boolean;
};

type Props = EventCardData & {
  className?: string;
};

/**
 * Fila editorial de evento: fecha · nombre y datos · reservar.
 * Solo renderiza campos presentes.
 */
export function EventCard({
  name,
  intention,
  description,
  day,
  month,
  startTime,
  endTime,
  location,
  duration,
  price,
  capacity,
  availability,
  includes,
  category,
  ctaTexto,
  ctaHref,
  ctaExterno = true,
  realizada = false,
  className = "",
}: Props) {
  const hora =
    startTime && endTime
      ? `${startTime} a ${endTime}`
      : startTime || endTime;
  const datos = [hora, location, duration, price, capacity, availability].filter(
    Boolean
  );

  return (
    <article
      className={`grid grid-cols-[3.5rem_1fr] gap-x-5 gap-y-4 bg-papel px-5 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-x-7 sm:px-7 ${realizada ? "opacity-55" : ""} ${className}`}
      style={{ borderRadius: "var(--radius-papel)" }}
    >
      <div className="text-center leading-none">
        {day && (
          <p className="numero-tabular text-[clamp(2rem,4vw,2.6rem)] font-light text-tinta">
            {day}
          </p>
        )}
        {month && (
          <p className="mt-1 text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
            {month}
          </p>
        )}
      </div>

      <div className="min-w-0">
        {category && (
          <p className="text-etiqueta uppercase tracking-[0.12em] text-tinta-suave">
            {category}
          </p>
        )}
        {name && (
          <h3 className="mt-1 text-[1.25rem] font-normal leading-snug tracking-[-0.01em] text-tinta">
            {name}
            {intention && (
              <span className="font-light text-tinta-suave"> · {intention}</span>
            )}
          </h3>
        )}
        {description && (
          <p className="mt-1 text-cuerpo text-tinta-suave">{description}</p>
        )}
        {datos.length > 0 && (
          <p className="numero-tabular mt-1 text-cuerpo text-tinta">
            {datos.join(" · ")}
          </p>
        )}
        {includes && includes.length > 0 && (
          <p className="mt-1 text-cuerpo text-tinta-suave">
            {includes.join(" · ")}
          </p>
        )}
      </div>

      {!realizada && ctaTexto && ctaHref && (
        <a
          href={ctaHref}
          {...(ctaExterno
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="group col-start-2 inline-flex items-center gap-1.5 justify-self-start text-cuerpo font-normal text-tinta sm:col-start-3 sm:justify-self-end"
        >
          <span className="enlace-plumon">{ctaTexto}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      )}
    </article>
  );
}
