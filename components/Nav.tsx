"use client";

import Image from "next/image";
import { ctas, linkWhatsApp, marca } from "@/lib/content";

const links = [
  { href: "#servicos", label: "Serviços", index: "01" },
  { href: "#cases", label: "Cases", index: "02" },
  { href: "#processo", label: "Como funciona", index: "03" },
  { href: "#contato", label: "Contato", index: "04" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-line/70 bg-background/55 py-2 pl-5 pr-2 backdrop-blur-xl">
        <a href="#" aria-label={marca.nome}>
          <Image
            src="/logo-irneon.PNG"
            alt={marca.nome}
            width={140}
            height={40}
            className="h-12 w-auto object-contain"
            priority
          />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex items-baseline gap-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                <span className="label-mono text-primary/60 transition-colors group-hover:text-primary">
                  {l.index}
                </span>
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
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background shadow-neon-soft transition-all hover:scale-105"
        >
          Agendar diagnóstico
        </a>
      </nav>
    </header>
  );
}
