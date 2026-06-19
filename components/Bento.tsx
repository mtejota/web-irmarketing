"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ctas, linkWhatsApp, marca, stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// O 4º número (1 mi+ seguidores) vira o card grande do bento
const bigStat = stats[3];

export default function Bento() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".bento-card", {
        y: 44,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      // Contador do número grande
      const el = root.current?.querySelector<HTMLElement>(".bento-num");
      if (el) {
        const alvo = Number(el.dataset.valor ?? 0);
        const dec = Number(el.dataset.decimais ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: alvo,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toLocaleString("pt-BR", {
              minimumFractionDigits: dec,
              maximumFractionDigits: dec,
            });
          },
        });
      }
    },
    { scope: root }
  );

  return (
    <section
      id="sobre"
      ref={root}
      className="mx-auto max-w-[90rem] px-6 pb-32 lg:px-20"
    >
      <div className="grid gap-4 lg:grid-cols-12">
        {/* z*/}
        <article className="bento-card glass-card relative overflow-hidden p-8 lg:col-span-7 lg:row-span-2 lg:p-12">
          {/* Atmosfera interna */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(640px 320px at 85% 110%, rgba(186,27,250,0.16), transparent 65%), radial-gradient(420px 240px at 0% 0%, rgba(2,250,139,0.07), transparent 60%)",
            }}
          />
          <div className="relative flex h-full flex-col items-start">
            

            <h3 className="display mt-10 text-3xl sm:text-4xl lg:text-5xl">
              Baseados em{" "}
              <span className="kw-accent">João Pessoa</span>, criando para
              marcas que querem <span className="kw">dominar</span> sua região.
            </h3>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {marca.endereco}. Estratégia construída de perto, com captação
              audiovisual própria e acompanhamento por métricas reais.
            </p>

            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-background shadow-neon transition-transform hover:scale-105"
            >
              Começar um projeto
            </a>
          </div>
        </article>

        {/* Card número grande */}
        <article className="bento-card glass-card flex flex-col justify-between p-8 lg:col-span-5 lg:p-10">
          <p className="label-mono text-white/45">Comunidade construída</p>
          <p className="display mt-8 whitespace-nowrap text-6xl lg:text-7xl">
            <span
              className="bento-num kw tabular-nums"
              data-valor={bigStat.valor}
              data-decimais={bigStat.decimais ?? 0}
            >
              0
            </span>
            <span className="kw">{bigStat.sufixo}</span>
          </p>
          <p className="mt-4 max-w-[24ch] text-sm text-muted">
            {bigStat.rotulo}  audiência real, construída com conteúdo.
          </p>
        </article>

        {/* Card citação */}
        <article className="bento-card glass-card flex flex-col justify-between p-8 lg:col-span-5 lg:p-10">
          <span aria-hidden className="kw-accent font-display text-5xl leading-none">
            &ldquo;
          </span>
          <blockquote className="mt-4 text-lg leading-relaxed text-white/80">
            Bom marketing parece óbvio  porque a estratégia por trás fica
            invisível. Nosso trabalho é fazer sua marca parecer inevitável.
          </blockquote>
          <footer className="label-mono mt-8 text-white/40">
            — {marca.nome}
          </footer>
        </article>
      </div>
    </section>
  );
}
