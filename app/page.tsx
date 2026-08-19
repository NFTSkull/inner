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

const DATOS_LOCALES = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "InnerFlow Meditation Club",
  description:
    "Club de meditación guiada con sesiones presenciales en Casa Zenia, Monterrey, y sesiones online.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Casa Zenia",
    addressLocality: "Monterrey",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  url: "https://innerflow.mx",
  sameAs: ["https://instagram.com/innerflow.mx"],
  priceRange: "$150 - $1,150 MXN",
};

export default function Home() {
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
        <Calendario />
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
