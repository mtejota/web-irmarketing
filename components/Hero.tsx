"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { ctas, linkWhatsApp } from "@/lib/content";

gsap.registerPlugin(TextPlugin);

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const WORDS = ["resultados", "crescimento", "vendas", "sucesso", "impacto"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow3D(wide && !reduced);
  }, []);

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
        const len = document.querySelector(".hero-type")?.textContent?.length ?? 0;
        gsap.to(".hero-type", {
          text: { value: "", delimiter: "" },
          duration: len * 0.04,
          ease: "none",
          onComplete: typeWord,
        });
      };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-line", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 })
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
        .from(".hero-sub",  { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-cta",  { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-led",  { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, "-=0.6");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="studio-glow relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D (desktop) */}
      {show3D && (
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Hero3D />
        </div>
      )}

      {/* Fallback mobile */}
      <div
        aria-hidden
        className="absolute right-[-20%] top-[10%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px] lg:hidden"
      />

      <div className="relative z-10 w-full px-6 py-28 lg:pl-16 lg:pr-0">
        <div className="max-w-lg lg:max-w-[42%]">
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl">
            {/* Linha 1 */}
            <span className="block overflow-hidden">
              <span className="hero-line block">Transformamos</span>
            </span>
            {/* Linha 2 — whitespace-nowrap garante que nunca quebra */}
            <span className="block overflow-hidden">
              <span className="hero-line flex items-center whitespace-nowrap">
                ideias em&nbsp;
                <span className="kw">
                  <span className="hero-type" />
                  <span
                    aria-hidden
                    className="inline-block shrink-0 align-middle"
                    style={{
                      width: "2px",
                      height: "0.82em",
                      marginLeft: "3px",
                      background: "var(--green)",
                      boxShadow: "0 0 8px var(--green)",
                      animation: "blinkCursor 0.7s step-end infinite",
                    }}
                  />
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-8 text-lg text-white">
            Estratégia, conteúdo criativo, tráfego pago e produção audiovisual
            para empresas que querem crescer de verdade.
          </p>
          <p className="hero-sub mt-3 text-sm text-white">
            <span className="kw">+1 bilhão</span> de visualizações geradas para clientes.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta rounded-full bg-primary/80 px-8 py-4 font-display font-bold uppercase tracking-wide text-background shadow-neon transition-transform hover:scale-105"
            >
              {ctas.principal}
            </a>
            <a
              href="#cases"
              className="hero-cta rounded-full border border-line px-8 py-4 font-display font-bold uppercase tracking-wide text-white transition-colors hover:border-primary hover:text-primary"
            >
              Ver cases
            </a>
          </div>
        </div>
      </div>

      {/* Fita de LED horizontal na base do hero */}
      <div className="hero-led led-h absolute bottom-0 left-0 w-full" />
    </section>
  );
}
