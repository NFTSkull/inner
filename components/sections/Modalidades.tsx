import { Reveal } from "@/components/motion/Reveal";
import { CirculoAMano } from "@/components/ui/CirculoAMano";
import { TituloTrazo } from "@/components/ui/TituloTrazo";

/**
 * Las dos modalidades del club. La codificación es semántica y
 * no se invierte nunca: azul = presencial, salvia = online.
 */

const MODALIDADES = [
  {
    nombre: "Presencial",
    color: "text-azul-hondo",
    tarjeta: "tarjeta-papel",
    variante: 0 as const,
    lineas: [
      "Casa Zenia, Monterrey",
      "Domingos 10:00 am",
      "Martes 8:00 pm",
    ],
    nota: "Llega 10 minutos antes. Si te sientas en el piso, trae tu tapete.",
  },
  {
    nombre: "Online",
    color: "text-salvia-hondo",
    tarjeta: "tarjeta-papel-b",
    variante: 1 as const,
    lineas: [
      "Desde tu casa, por videollamada",
      "Jueves 8:00 pm",
      "Recibes el enlace 30 min antes",
    ],
    nota: "Solo necesitas audífonos y un lugar donde nadie te hable.",
  },
] as const;

export function Modalidades() {
  return (
    <section
      id="modalidades"
      aria-label="Cómo funciona el club"
      className="px-5 pb-28 pt-4 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <TituloTrazo
            texto="Cómo funciona"
            etiqueta="h2"
            className="text-display-l text-tinta"
          />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {MODALIDADES.map((modalidad, i) => (
            <Reveal key={modalidad.nombre} indice={i}>
              <article
                className={`${modalidad.tarjeta} h-full px-8 py-10 sm:px-10`}
              >
                <h3
                  className={`display-trazo relative inline-block text-titulo ${modalidad.color}`}
                >
                  {modalidad.nombre}
                  <CirculoAMano
                    variante={modalidad.variante}
                    dibujado
                    className="absolute -inset-x-5 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2.5rem)] opacity-60"
                    grosor={4}
                  />
                </h3>
                <ul className="mt-6 space-y-2">
                  {modalidad.lineas.map((linea) => (
                    <li key={linea} className="text-cuerpo-l text-tinta">
                      {linea}
                    </li>
                  ))}
                </ul>
                <p className="text-cuerpo mt-6 max-w-[30ch] text-tinta-suave">
                  {modalidad.nota}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
