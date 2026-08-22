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
  title: "InnerFlow · Meditation Club en Monterrey",
  description:
    "Sesiones de meditación guiada, presenciales en Casa Zenia y online desde donde estés. No necesitas experiencia previa.",
  openGraph: {
    title: "InnerFlow · Meditation Club en Monterrey",
    description:
      "Sesiones de meditación guiada, presenciales en Casa Zenia y online. No necesitas experiencia previa.",
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
