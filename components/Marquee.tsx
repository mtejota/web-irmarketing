"use client";

import { cases } from "@/lib/content";

export default function Marquee() {
  const nomes = cases.map((c) => c.cliente);
  const faixa = [...nomes, ...nomes]; // duplicado para loop contínuo

  return (
    <section
      aria-label="Clientes atendidos"
      className="overflow-hidden border-y border-line bg-surface/50 py-8"
    >
      <p className="mb-5 text-center text-xs uppercase tracking-widest text-white">
        Clientes que confiam em nosso trabalho
      </p>
      <div className="marquee flex w-max items-center gap-12 whitespace-nowrap">
        {faixa.map((nome, i) => (
          <span
            key={`${nome}-${i}`}
            className="font-display text-xl font-medium tracking-wide text-white/90 transition-colors hover:text-primary"
          >
            {nome}
            <span className="kw-accent mx-6 inline-block" aria-hidden>
              •
            </span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          animation: scroll 32s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
