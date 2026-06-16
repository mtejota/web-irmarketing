"use client";

import { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ctas, linkWhatsApp, marca, stats } from "@/lib/content";
import HeroStatue, { HeroStatueMobile } from "./HeroStatue";

gsap.registerPlugin(TextPlugin);

const WORDS = ["resultados.", "crescimento.", "vendas.", "impacto."];

// Os 3 primeiros números viram stat cards na base do hero
const heroStats = stats.slice(0, 3);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      let idx = 0;

      const typeWord = () => {
        idx = (idx + 1) % WORDS.length;
        const word = WORDS[idx];
        gsap.to(".hero-type", {
          text: { value: word, delimiter: "" },
          duration: word.length * 0.07,
          ease: "none",
          onComplete: () => gsap.delayedCall(2.5, erase),
        });
      };

      const erase = () => {
        const len =
          document.querySelector(".hero-type")?.textContent?.length ?? 0;
        gsap.to(".hero-type", {
          text: { value: "", delimiter: "" },
          duration: len * 0.04,
          ease: "none",
          onComplete: typeWord,
        });
      };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-fade", { y: 16, opacity: 0, duration: 0.6 })
        .from(
          ".hero-line",
          { yPercent: 110, duration: 0.9, stagger: 0.12 },
          "-=0.25"
        )
        .to(
          ".hero-type",
          {
            text: { value: WORDS[0], delimiter: "" },
            duration: WORDS[0].length * 0.08,
            ease: "none",
            onComplete: () => gsap.delayedCall(2.5, erase),
          },
          "-=0.05"
        )
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          { y: 28, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.35"
        )
        .addLabel("count", "-=0.5")
        .from(
          ".hero-led",
          { scaleX: 0, duration: 1.1, ease: "power2.inOut" },
          "-=0.7"
        )
        .from(".hero-side", { opacity: 0, duration: 0.8 }, "-=0.9");

      // Contadores dos stat cards
      gsap.utils.toArray<HTMLElement>(".hero-stat-num").forEach((el) => {
        const alvo = Number(el.dataset.valor ?? 0);
        const dec = Number(el.dataset.decimais ?? 0);
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: alvo,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = obj.v.toLocaleString("pt-BR", {
                minimumFractionDigits: dec,
                maximumFractionDigits: dec,
              });
            },
          },
          "count"
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="studio-glow relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Estátua — desktop: full-bleed, atrás da tipografia */}
      <div className="absolute inset-y-0 right-[-4%] z-0 hidden w-[48%] lg:block">
        <HeroStatue />
        {/* Scrim para legibilidade do headline sobre a imagem */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #080808 0%, transparent 45%)",
          }}
        />
      </div>

      {/* Coluna social — borda esquerda */}
      <div className="hero-side absolute bottom-44 left-7 z-20 hidden flex-col items-center gap-5 lg:flex">
        <a
          href={marca.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/40 transition-colors hover:text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="text-white/40 transition-colors hover:text-primary"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5v-.4c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
          </svg>
        </a>
        <span aria-hidden className="h-14 w-px bg-white/15" />
        <span
          className="label-mono text-white/35"
          style={{ writingMode: "vertical-rl" }}
        >
          social
        </span>
      </div>

      {/* Metadados verticais — borda direita */}
      <div className="hero-side absolute right-7 top-[38%] z-20 hidden -translate-y-1/2 lg:block">
        <p
          className="label-mono text-white/30"
          style={{ writingMode: "vertical-rl" }}
        >
          branding · tráfego · audiovisual · design
        </p>
      </div>

      {/* Hint de scroll — borda direita, abaixo dos metadados */}
      <div className="hero-side absolute bottom-44 right-7 z-20 hidden flex-col items-center gap-3 lg:flex">
        <span
          className="label-mono text-white/35"
          style={{ writingMode: "vertical-rl" }}
        >
          scroll
        </span>
        <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-white/10">
          <span
            className="absolute inset-0 bg-primary"
            style={{ animation: "scrollHint 2.2s ease-in-out infinite" }}
          />
        </span>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-center px-6 pb-8 pt-32 lg:pl-14 lg:pr-20">
        {/* Estátua — mobile (acima do headline) */}
        <div className="mb-8 lg:hidden">
          <HeroStatueMobile />
        </div>

        {/* <div className="hero-fade badge-pill w-fit">
          {/* <span className="label-mono text-white">
            Agência criativa de marketing
          </span> 
        </div> */}

        <h2 className="display-hero mt-5">
          <span className="block overflow-hidden">
            <span className="hero-line block ">Transformamos</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line flex items-baseline whitespace-nowrap">
              ideias em
              {/* Anotação mono — micro-detalhe editorial */}
              <span className="label-mono ml-8 hidden -translate-y-[0.5em] text-white/35 lg:inline-block">
                (da ideia
                <br />
                ao resultado)
              </span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line flex h-[1.06em] items-center whitespace-nowrap">
              <span className="kw">
                <span className="hero-type" />
              </span>
              <span
                aria-hidden
                className="inline-block shrink-0"
                style={{
                  width: "3px",
                  height: "0.78em",
                  marginLeft: "0.06em",
                  background: "var(--green)",
                  boxShadow: "0 0 10px var(--green)",
                  animation: "blinkCursor 0.7s step-end infinite",
                }}
              />
            </span>
          </span>
        </h2>

        <div className="mt-9 max-w-xl">
          <p className="hero-sub text-lg leading-relaxed text-white">
            Estratégia, conteúdo criativo, tráfego pago e produção audiovisual
            para empresas que querem crescer de verdade.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-background shadow-neon transition-transform hover:scale-105"
            >
              {ctas.principal}
            </a>
            <a
              href="#cases"
              className="hero-cta rounded-full border border-line px-8 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-primary hover:text-primary"
            >
              Ver cases
            </a>
          </div>
        </div>
      </div>

      {/* Stat cards na base — prova social imediata */}
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pb-12 lg:pl-14 lg:pr-20">
        <div className="grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
          {heroStats.map((s) => (
            <div key={s.rotulo} className="hero-stat glass-card p-6">
              <p className="display whitespace-nowrap text-3xl lg:text-4xl">
                {s.prefixo && (
                  <span className="kw-accent text-xl lg:text-2xl">
                    {s.prefixo}
                  </span>
                )}
                <span
                  className="hero-stat-num kw tabular-nums"
                  data-valor={s.valor}
                  data-decimais={s.decimais ?? 0}
                >
                  0
                </span>
                <span className="kw">{s.sufixo}</span>
              </p>
              <p className="label-mono mt-3 text-white">{s.rotulo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fita de LED horizontal na base do hero */}
      <div className="hero-led led-h absolute bottom-0 left-0 w-full" />
    </section>
  );
}
