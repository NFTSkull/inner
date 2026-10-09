import Link from "next/link";
import { IsotipoTrazo } from "@/components/ui/IsotipoTrazo";
import { RUTAS } from "@/lib/data/rutas";
import { SITE } from "@/lib/data/site";

const MAPA = [
  { href: RUTAS.experiencias, texto: "Experiencias" },
  { href: RUTAS.calendario, texto: "Calendario" },
  { href: RUTAS.club, texto: "Meditation Club" },
  { href: RUTAS.conoceme, texto: "Conóceme" },
  { href: RUTAS.contacto, texto: "Contacto" },
] as const;

/** Footer compacto: marca · mapa · Instagram, y una fila legal. */
export function Footer() {
  return (
    <footer className="border-t border-tinta/10 bg-arena page-pad-x pb-24 pt-10 md:pb-6 sm:px-8 lg:pt-12">
      <div className="mx-auto grid max-w-[76rem] gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-10">
        <div className="flex items-center gap-3">
          <IsotipoTrazo className="h-9 w-9 shrink-0 text-tinta" />
          <div>
            <p className="text-cuerpo font-normal text-tinta">{SITE.name}</p>
            <p className="text-etiqueta text-tinta-suave">
              {SITE.city}, México
            </p>
          </div>
        </div>

        <nav aria-label="Mapa del sitio">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {MAPA.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="enlace-plumon text-cuerpo text-tinta-suave transition-colors duration-[400ms] ease-[var(--ease-respiro)] hover:text-tinta"
                >
                  {item.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:text-right">
          <p className="text-etiqueta uppercase tracking-[0.16em] text-tinta-suave">
            Instagram
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-1 inline-flex items-center gap-1.5 text-cuerpo-l font-normal text-tinta"
          >
            <span className="enlace-plumon">{SITE.instagramHandle}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-[400ms] ease-[var(--ease-respiro)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[76rem] flex-wrap items-center justify-between gap-3 border-t border-tinta/10 pt-5 lg:mt-10">
        <p className="text-etiqueta text-tinta-suave">© {SITE.name}</p>
        <Link
          href={RUTAS.politicas}
          className="enlace-plumon text-etiqueta text-tinta-suave"
        >
          Políticas y privacidad
        </Link>
      </div>
    </footer>
  );
}
