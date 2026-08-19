import { rotacionDeTrazo } from "@/lib/breath";

type Props = {
  /** Texto del título. Los saltos de línea con \n se respetan. */
  texto: string;
  etiqueta?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
};

/**
 * Lettering de plumón: cada palabra va en un span con una rotación
 * determinista entre -1.5 y 1.5 grados, para imitar el trazo humano
 * del flyer sin brincar en la hidratación.
 */
export function TituloTrazo({
  texto,
  etiqueta: Etiqueta = "h1",
  className = "",
}: Props) {
  const lineas = texto.split("\n");
  let indice = 0;

  return (
    <Etiqueta className={`display-trazo ${className}`}>
      {lineas.map((linea, l) => (
        <span key={l} className="block">
          {linea
            .split(" ")
            .filter(Boolean)
            .map((palabra) => {
              const rotacion = rotacionDeTrazo(palabra, indice++);
              return (
                <span key={`${l}-${indice}`}>
                  <span
                    className="inline-block"
                    style={{ transform: `rotate(${rotacion}deg)` }}
                  >
                    {palabra}
                  </span>{" "}
                </span>
              );
            })}
        </span>
      ))}
    </Etiqueta>
  );
}
