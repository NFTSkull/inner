import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import type { ServicioPagina } from "@/lib/data/servicios";

/**
 * Shell tipográfico para las páginas de servicio.
 * Misma familia visual del sitio: papel, trazo, píldora.
 * Tono profesional: intro un poco más contenida, CTA sin rotación.
 */
export function PaginaServicio({ servicio }: { servicio: ServicioPagina }) {
  const profesional = servicio.tono === "profesional";

  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
      <Reveal>
        <p className="text-etiqueta uppercase tracking-[0.18em] text-tinta-suave">
          {servicio.eyebrow}
        </p>
        <TituloTrazo
          texto={servicio.titulo}
          etiqueta="h1"
          className="mt-4 text-display-l text-tinta"
        />
      </Reveal>

      <Reveal indice={1}>
        <p
          className={`mt-6 text-cuerpo-l text-tinta ${
            profesional ? "max-w-[44ch]" : "max-w-[40ch]"
          }`}
        >
          {servicio.intro}
        </p>
      </Reveal>

      {servicio.tags && servicio.tags.length > 0 && (
        <Reveal indice={2}>
          <ul className="mt-8 flex flex-wrap gap-3">
            {servicio.tags.map((tag) => (
              <li
                key={tag}
                className="text-etiqueta rotate-[-1deg] border border-tinta/20 bg-papel px-3 py-1.5 uppercase tracking-[0.12em] text-tinta-suave"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {servicio.modalidades.length > 0 && (
        <Reveal indice={3}>
          <div
            className={`mt-12 px-7 py-10 sm:px-10 sm:py-12 ${
              profesional ? "border border-tinta/15 bg-papel" : "tarjeta-papel"
            }`}
          >
            <ul>
              {servicio.modalidades.map((item, i) => (
                <li
                  key={item.nombre}
                  className={`py-4 ${
                    i > 0 ? "border-t border-tinta/10" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-cuerpo-l font-normal text-tinta">
                      {item.nombre}
                    </span>
                    {item.valor && (
                      <>
                        <span
                          aria-hidden="true"
                          className="mx-1 flex-1 -translate-y-[0.3em] border-b-[2.5px] border-dotted border-tinta/25"
                        />
                        <span className="numero-tabular text-cuerpo-l text-tinta">
                          {item.valor}
                        </span>
                      </>
                    )}
                  </div>
                  {item.detalle && (
                    <p className="text-cuerpo mt-1 max-w-[36ch] text-tinta-suave">
                      {item.detalle}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      {servicio.proximamente && servicio.eventosEjemplo && (
        <Reveal indice={3}>
          <div className="mt-12">
            <p className="display-trazo rotate-[-1.5deg] text-titulo text-tinta-suave">
              Próximamente
            </p>
            <ul className="mt-8 space-y-8">
              {servicio.eventosEjemplo.map((evento) => (
                <li key={evento.titulo} className="tarjeta-papel-b px-7 py-8">
                  <h2 className="display-trazo text-titulo text-tinta">
                    {evento.titulo}
                  </h2>
                  <p className="text-etiqueta mt-2 uppercase tracking-[0.12em] text-tinta-suave">
                    {evento.cuando}
                  </p>
                  <p className="text-cuerpo mt-3 max-w-[34ch] text-tinta">
                    {evento.nota}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}

      <Reveal indice={4}>
        <div className="mt-12">
          <Boton
            variante="primario"
            href={servicio.ctaHref}
            externo
            className="!px-7 !py-3"
          >
            {servicio.ctaTexto}
          </Boton>
        </div>
      </Reveal>
    </article>
  );
}
