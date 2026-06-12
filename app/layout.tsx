import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { marca } from "@/lib/content";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: `${marca.nome} — Agência de Marketing Digital em João Pessoa`,
  description:
    "Estratégia, criatividade e performance para empresas que querem crescer de verdade. Tráfego pago, social media, audiovisual e design em João Pessoa — PB.",
  icons: {
    icon: "/favicon.ico",
  },
    openGraph: {
    title: `${marca.nome} — Transformamos ideias em resultados`,
    description:
      "Agência de marketing digital em João Pessoa: tráfego pago, social media estratégico, audiovisual e criativos que vendem.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        {/* Grain global — textura de filme sobre todo o site */}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
