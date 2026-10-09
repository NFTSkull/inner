import type { Metadata } from "next";
import { Jost, Shantell_Sans } from "next/font/google";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Preloader } from "@/components/motion/Preloader";
import { Grano } from "@/components/ui/Grano";
import "./globals.css";

const shantell = Shantell_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shantell",
  axes: ["BNCE", "INFM"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://innerflow.mx"),
  title: "InnerFlow · Bienestar en Monterrey",
  description:
    "Sesiones privadas, eventos, bienestar para empresas y el Meditation Club. Casa Zenia, Monterrey, o donde tú estés.",
  openGraph: {
    title: "InnerFlow · Bienestar en Monterrey",
    description:
      "Sesiones privadas, eventos, bienestar para empresas y el Meditation Club en Casa Zenia.",
    siteName: "InnerFlow",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${shantell.variable} ${jost.variable}`}>
      <body>
        <LenisProvider>{children}</LenisProvider>
        <Preloader />
        <Grano />
      </body>
    </html>
  );
}
