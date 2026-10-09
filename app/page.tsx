import { BotonFlotante } from "@/components/breathe/BotonFlotante";
import { RespiradorProvider } from "@/components/breathe/RespiradorContext";
import { ClubEnHome } from "@/components/sections/ClubEnHome";
import { ComunidadEnHome } from "@/components/sections/ComunidadEnHome";
import { CtaContactoHome } from "@/components/sections/CtaContactoHome";
import { Footer } from "@/components/sections/Footer";
import { HeroInicio } from "@/components/sections/HeroInicio";
import { IntroInnerFlow } from "@/components/sections/IntroInnerFlow";
import { MundosExperiencia } from "@/components/sections/MundosExperiencia";
import { Nav } from "@/components/sections/Nav";

/** Re-evalúa cada hora el próximo evento de Comunidad. */
export const revalidate = 3600;

const DATOS_LOCALES = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Inner Flow",
  description:
    "Movimiento, meditación y experiencias de bienestar en Monterrey.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sto. Domingo 218, Vista Hermosa",
    addressLocality: "Monterrey",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  url: "https://innerflow.mx",
  sameAs: ["https://instagram.com/innerflow.mx"],
};

/**
 * Inicio: Hero audiovisual → qué es → experiencias → comunidad →
 * Meditation Club → hablemos.
 */
export default function Home() {
  return (
    <RespiradorProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DATOS_LOCALES) }}
      />
      <Nav />
      <main>
        <HeroInicio />
        <IntroInnerFlow />
        <MundosExperiencia variante="inicio" />
        <ComunidadEnHome />
        <ClubEnHome />
        <CtaContactoHome />
      </main>
      <Footer />
      <BotonFlotante />
    </RespiradorProvider>
  );
}
