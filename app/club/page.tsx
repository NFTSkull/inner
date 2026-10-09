import { BotonFlotante } from "@/components/breathe/BotonFlotante";
import { RespiradorProvider } from "@/components/breathe/RespiradorContext";
import { BannerPresentacion } from "@/components/sections/BannerPresentacion";
import { Calendario } from "@/components/sections/Calendario";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Lugar } from "@/components/sections/Lugar";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Modalidades } from "@/components/sections/Modalidades";
import { Nav } from "@/components/sections/Nav";
import { Precios } from "@/components/sections/Precios";
import { OndaDivisor } from "@/components/ui/OndaDivisor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditation Club · Inner Flow",
  description:
    "Programa recurrente de meditación guiada en Casa Zenia (Vista Hermosa), Oh my core! (San Nicolás) y online. No se requiere experiencia previa.",
};

/** Recalcula próximas/realizadas en el HTML al menos cada hora. */
export const revalidate = 3600;

const DATOS_LOCALES = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "InnerFlow Meditation Club",
  description:
    "Club de meditación guiada con sesiones presenciales en Casa Zenia (Vista Hermosa) y Oh my core! (San Nicolás), y sesiones online.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sto. Domingo 218, Vista Hermosa",
    addressLocality: "Monterrey",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  url: "https://innerflow.mx/club",
  sameAs: ["https://instagram.com/innerflow.mx"],
  priceRange: "$150 - $1,150 MXN",
};

/**
 * Meditation Club: sub-universo.
 * Home solo lo previsualiza; El lugar vive aquí.
 */
export default function PaginaClub() {
  const ahoraISO = new Date().toISOString();

  return (
    <RespiradorProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATOS_LOCALES) }}
      />
      <Nav />
      <main>
        <Hero />
        <BannerPresentacion />
        <Manifiesto />
        <OndaDivisor />
        <Modalidades />
        <Calendario ahoraISO={ahoraISO} />
        <OndaDivisor className="mt-2" />
        <Precios />
        <Lugar />
        <Faq />
      </main>
      <Footer />
      <BotonFlotante />
    </RespiradorProvider>
  );
}
