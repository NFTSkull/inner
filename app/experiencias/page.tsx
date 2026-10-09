import { Footer } from "@/components/sections/Footer";
import { MundosExperiencia } from "@/components/sections/MundosExperiencia";
import { Nav } from "@/components/sections/Nav";
import { HUB_EXPERIENCIAS } from "@/lib/data/experiencias";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiencias · Inner Flow",
  description: HUB_EXPERIENCIAS.soporte,
};

export default function PaginaExperiencias() {
  return (
    <>
      <Nav />
      <main className="page-top">
        <MundosExperiencia />
      </main>
      <Footer />
    </>
  );
}
