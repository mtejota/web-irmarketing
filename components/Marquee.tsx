"use client";

import { cases } from "@/lib/content";

export default function Marquee() {
  const nomes = cases.map((c) => c.cliente);
  const faixa = [...nomes, ...nomes]; // duplicado para loop contínuo

  return (
    <section
      aria-label="Clientes atendidos"
      className="overflow-hidden border-y border-line bg-surface/50 py-10"
    >
      <p className="label-mono mb-7 text-center text-white/40">
        ( clientes que confiam em nosso trabalho )
      </p>
      <div className="marquee flex w-max items-center gap-14 whitespace-nowrap">
        {faixa.map((nome, i) => (
          <span
            key={`${nome}-${i}`}
            className="font-display text-2xl font-semibold tracking-tight text-white/85 transition-colors hover:text-primary lg:text-3xl"
          >
            {nome}
            <span className="kw-accent mx-7 inline-block text-base" aria-hidden>
              ✦
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
