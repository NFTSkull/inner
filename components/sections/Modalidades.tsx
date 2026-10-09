import { Reveal } from "@/components/motion/Reveal";
import { CirculoAMano } from "@/components/ui/CirculoAMano";
import { TituloTrazo } from "@/components/ui/TituloTrazo";
import { COLOR_SEDE, SEDES, type SedeId } from "@/lib/data/sesiones";

/**
 * Las dos modalidades del club. Cada sede conserva su color del
 * calendario; fechas y horarios viven solo en el calendario del mes.
 */

type Linea = { texto: string; sede?: SedeId };

const sede = (id: SedeId): Linea => ({
  texto: `${SEDES[id].nombre} · ${SEDES[id].zona}`,
  sede: id,
});

const MODALIDADES: readonly {
  nombre: string;
  color: string;
  tarjeta: string;
  variante: 0 | 1;
  lineas: readonly Linea[];
  nota: string;
}[] = [
  {
    nombre: "Presencial",
    color: "text-azul-hondo",
    tarjeta: "tarjeta-papel",
    variante: 0,
    lineas: [
      sede("casa-zenia"),
      sede("oh-my-core"),
      { texto: "Fechas y horarios en el calendario del mes" },
    ],
    nota: "Llega 10 minutos antes. Trae tu tapete.",
  },
  {
    nombre: "Online",
    color: "text-salvia-hondo",
    tarjeta: "tarjeta-papel-b",
    variante: 1,
    lineas: [
      { texto: "Desde tu casa, por videollamada", sede: "online" },
      { texto: "Recibes el enlace 30 min antes" },
    ],
    nota: "Solo necesitas audífonos y un lugar sin interrupciones.",
  },
];

export function Modalidades() {
  return (
    <section
      id="modalidades"
      aria-label="Cómo funciona el club"
      className="scroll-mt-24 px-5 pb-28 pt-4 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <TituloTrazo
            texto="Cómo funciona"
            etiqueta="h2"
            className="text-display-l text-tinta"
          />
          <p className="text-cuerpo-l mt-4 max-w-[36ch] text-tinta-suave">
            Es necesario reservar antes de asistir.
          </p>
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
                    <li
                      key={linea.texto}
                      className="flex items-center gap-2.5 text-cuerpo-l text-tinta"
                    >
                      {linea.sede && (
                        <span
                          aria-hidden="true"
                          className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${COLOR_SEDE[linea.sede].fondo}`}
                        />
                      )}
                      {linea.texto}
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
