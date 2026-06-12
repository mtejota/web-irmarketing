import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { marca } from "@/lib/content";

const display = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
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
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
