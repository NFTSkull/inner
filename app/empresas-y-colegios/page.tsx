import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { PaginaEmpresasContenido } from "@/components/sections/PaginaEmpresasContenido";
import { EMPRESAS_PAGE } from "@/lib/data/experiencias";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empresas y colegios · Inner Flow",
  description: EMPRESAS_PAGE.intro,
};

export default function PaginaEmpresasColegios() {
  return (
    <>
      <Nav />
      <main>
        <PaginaEmpresasContenido />
      </main>
      <Footer />
    </>
  );
}
