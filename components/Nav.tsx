"use client";

import Image from "next/image";
import { ctas, linkWhatsApp, marca } from "@/lib/content";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#cases", label: "Cases" },
  { href: "#processo", label: "Como funciona" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="#" aria-label={marca.nome}>
          <Image
            src="/logo-irneon.PNG"
            alt={marca.nome}
            width={140}
            height={40}
            className="h-20 w-auto object-contain"
            priority
          />
        </a>

        <ul className="hidden items-center gap-10 text-sm text-white md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-primary">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${ctas.principal} — ${marca.nome}`}
          className="rounded-full border border-primary/60 px-5 py-2 text-sm font-semibold text-primary shadow-neon-soft transition-all hover:bg-primary hover:text-background"
        >
          {ctas.principal}
        </a>
      </nav>
    </header>
  );
}
