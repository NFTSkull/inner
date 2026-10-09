import { Reveal } from "@/components/motion/Reveal";
import { Boton } from "@/components/ui/Boton";
import { HOME_COPY } from "@/lib/data/experiencias";
import { RUTAS } from "@/lib/data/rutas";

/**
 * Cierre claro sobre arena: una sola idea (decidir) antes del footer.
 */
export function CtaContactoHome() {
  return (
    <section
      id="hablemos"
      aria-labelledby="hablemos-titulo"
      className="scroll-mt-24 bg-arena page-pad-x py-16 sm:px-8 lg:py-24"
    >
      <Reveal className="mx-auto max-w-[44rem] text-center">
        <h2
          id="hablemos-titulo"
          className="text-balance text-[clamp(1.75rem,3.2vw,2.6rem)] font-light leading-[1.08] tracking-[-0.025em] text-tinta"
        >
          {HOME_COPY.cierreTitulo}
        </h2>
        <p className="mx-auto mt-4 max-w-[30rem] text-balance text-cuerpo-l text-tinta-suave">
          {HOME_COPY.cierreSoporte}
        </p>
        <div className="mt-8 flex justify-center">
          <Boton
            variante="primario"
            href={RUTAS.contacto}
            className="pildora-blanca"
          >
            {HOME_COPY.cierreCtaHablemos}
          </Boton>
        </div>
      </Reveal>
    </section>
  );
}
