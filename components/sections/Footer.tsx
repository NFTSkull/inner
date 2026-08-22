import Image from "next/image";
import Link from "next/link";
import { Boton } from "@/components/ui/Boton";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";
import { ENLACE_RESERVA } from "@/lib/data/sesiones";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-arena px-5 pb-14 pt-24 sm:px-8">
      {/* El isotipo respirando muy lento al fondo */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <IsotipoTrazo className="respira-lento h-[85%] text-tinta opacity-[0.08]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <Image
          src="/inner.png"
          alt="InnerFlow"
          width={420}
          height={420}
          className="logo-tinta h-auto w-56 sm:w-72"
          sizes="(min-width: 640px) 18rem, 14rem"
          quality={70}
        />

        <p className="text-cuerpo-l mt-10 max-w-md text-tinta-suave">
          Meditación guiada en Monterrey y online.
          <br />
          Domingos 10:00 am · Martes y Jueves 8:00 pm
        </p>

        <div className="mt-10">
          <Boton variante="primario" href="/#calendario">
            Reservar
          </Boton>
        </div>

        <div className="mt-16 flex w-full flex-col items-center gap-4 border-t border-tinta/10 pt-8 sm:flex-row sm:justify-between">
          <a
            href={ENLACE_RESERVA}
            target="_blank"
            rel="noopener noreferrer"
            className="enlace-plumon text-cuerpo font-normal"
          >
            @innerflow.mx
          </a>
          <Link
            href="/politicas"
            className="enlace-plumon text-etiqueta uppercase text-tinta-suave"
          >
            Políticas y privacidad
          </Link>
          <p className="text-etiqueta uppercase text-tinta-suave">
            InnerFlow · Meditation Club · Monterrey, México
          </p>
        </div>
      </div>
    </footer>
  );
}
