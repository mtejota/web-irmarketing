"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cases } from "@/lib/content";
import type { Case } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const METRIC_LABELS: Record<string, string> = {
  views: "Visualizações",
  curtidas: "Curtidas",
  alcance: "Alcance",
  comentarios: "Comentários",
};

// ── Conteúdo da tela do iPhone ────────────────────────────────────────────────
function IGScreen({ c }: { c: Case }) {
  const ig = c.instagram;

  return (
    <div className="flex h-full flex-col bg-[#0a0a0a]">
      {/* status bar */}
      <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-white/70">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          {/* signal bars */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <rect x="0" y="6" width="3" height="6" rx="0.8" opacity=".35"/>
            <rect x="4.5" y="4" width="3" height="8" rx="0.8" opacity=".6"/>
            <rect x="9" y="1.5" width="3" height="10.5" rx="0.8" opacity=".85"/>
            <rect x="13.5" y="0" width="2.5" height="12" rx="0.8"/>
          </svg>
          {/* battery */}
          <div className="flex items-center gap-[2px]">
            <div className="h-[8px] w-[20px] rounded-[2px] border border-white/50 p-[1.5px]">
              <div className="h-full w-4/5 rounded-[1px] bg-white/80" />
            </div>
            <div className="h-[4px] w-[2px] rounded-r-sm bg-white/50" />
          </div>
        </div>
      </div>

      {/* Instagram top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 py-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".6">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        <span className="text-[13px] font-bold text-white">
          {ig ? ig.usuario : c.cliente}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".6">
          <circle cx="5" cy="12" r="1.2" fill="white"/><circle cx="12" cy="12" r="1.2" fill="white"/><circle cx="19" cy="12" r="1.2" fill="white"/>
        </svg>
      </div>

      {ig ? (
        <>
          {/* profile header */}
          <div className="shrink-0 px-4 pt-4 pb-3">
            <div className="flex items-center gap-3">
              {/* avatar com ring gradiente */}
              <div className="relative h-[54px] w-[54px] shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#BA1BFA] via-[#02FA8B] to-[#BA1BFA]" />
                <div className="absolute inset-[2.5px] overflow-hidden rounded-full bg-[#0a0a0a]">
                  {ig.imagemUrl ? (
                    <img
                      src={ig.imagemUrl}
                      alt={c.cliente}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-bold text-primary">
                      {c.cliente[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-white">{ig.usuario}</p>
                <p className="mt-0.5 truncate text-[10px] text-white/40">{c.cliente}</p>
                <p className="text-[10px] text-white/30">{c.setor}</p>
              </div>

              {/* seguir button */}
              <button className="shrink-0 rounded-lg bg-[#0095f6] px-3 py-1 text-[11px] font-semibold text-white">
                Seguir
              </button>
            </div>
          </div>

          {/* imagem do post */}
          <div className="shrink-0 w-full bg-surface/60" style={{ aspectRatio: "1/1" }}>
            {ig.imagemUrl ? (
              <img
                src={ig.imagemUrl}
                alt={c.cliente}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                <span className="text-5xl font-black text-white/[0.04]">
                  {c.cliente[0]}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/10">
                  imagem em breve
                </span>
              </div>
            )}
          </div>

          {/* métricas 2×2 */}
          <div className="grid shrink-0 grid-cols-2 gap-[6px] p-3">
            {(Object.entries(ig.metricas) as [string, string][]).map(([key, val]) => (
              <div
                key={key}
                className="rounded-xl bg-white/[0.05] px-2 py-2.5 text-center"
              >
                <p className="kw text-[15px] font-bold tabular-nums leading-none">
                  {val}
                </p>
                <p className="mt-[4px] text-[8px] uppercase tracking-[0.1em] text-white/35">
                  {METRIC_LABELS[key] ?? key}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <span className="text-5xl font-black text-white/[0.04]">{c.cliente[0]}</span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            Perfil em breve
          </p>
        </div>
      )}
    </div>
  );
}

// ── Frame iPhone ───────────────────────────────────────────────────────────────
function IPhoneMock({ c }: { c: Case }) {
  return (
    <div className="relative mx-auto w-[242px]">
      {/* glow atrás do aparelho */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[56px] bg-accent/10 blur-[48px]"
      />

      {/* corpo do iPhone */}
      <div className="relative rounded-[44px] bg-[#1c1c1e] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),0_32px_80px_rgba(0,0,0,0.7)]">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-[11px] z-20 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />

        {/* botão lateral direito */}
        <div className="absolute -right-[3px] top-[116px] h-[62px] w-[3px] rounded-r-sm bg-[#2c2c2e]" />

        {/* botões de volume esquerdo */}
        <div className="absolute -left-[3px] top-[74px] h-[18px] w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -left-[3px] top-[102px] h-[38px] w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -left-[3px] top-[150px] h-[38px] w-[3px] rounded-l-sm bg-[#2c2c2e]" />

        {/* área de tela */}
        <div
          className="overflow-hidden rounded-[38px] border-[8px] border-[#1c1c1e]"
          style={{ minHeight: 520 }}
        >
          <IGScreen c={c} />
        </div>

        {/* home indicator */}
        <div className="flex justify-center py-2">
          <div className="h-[5px] w-[100px] rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────
export default function Cases() {
  const root = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCase = cases[activeIdx];

  const selectCase = (idx: number) => {
    if (idx === activeIdx) return;
    gsap.killTweensOf(phoneRef.current);
    gsap.to(phoneRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.16,
      ease: "power2.in",
      onComplete: () => {
        setActiveIdx(idx);
        gsap.fromTo(
          phoneRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
        );
      },
    });
  };

  useGSAP(
    () => {
      gsap.from(".cases-hd", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
      gsap.from(".case-row", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 76%", once: true },
      });
      gsap.from(".phone-wrap", {
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="cases"
      ref={root}
      className="mx-auto max-w-7xl px-6 py-28 lg:px-12"
    >
      {/* cabeçalho */}
      <h2 className="cases-hd display text-3xl sm:text-4xl lg:text-5xl">
        Cases que viraram <span className="kw">crescimento</span>
      </h2>
      <p className="cases-hd mt-6 max-w-xl text-muted">
        De hamburgueria a acessórios: estratégia aplicada em segmentos reais
        de João Pessoa e região.
      </p>

      {/* corpo: lista + iPhone */}
      <div className="mt-16 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">

        {/* ── lista de clientes (flex-1) ── */}
        <div className="order-2 flex-1 space-y-2 lg:order-1">
          {cases.map((c, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={c.slug}
                onClick={() => selectCase(i)}
                className={`case-row w-full rounded-2xl border px-6 py-4 text-left transition-all duration-300 ${
                  active
                    ? "border-primary/40 bg-primary/5 shadow-neon-soft"
                    : "border-line bg-surface/40 hover:border-white/10 hover:bg-surface/70"
                }`}
              >
                {/* linha de título */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className={`font-display text-sm font-semibold transition-colors lg:text-base ${
                        active ? "text-white" : "text-white/55"
                      }`}
                    >
                      {c.cliente}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] uppercase tracking-widest transition-colors ${
                        active ? "text-primary" : "text-muted/50"
                      }`}
                    >
                      {c.setor}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs transition-all duration-300 ${
                      active ? "text-primary" : "text-white/20"
                    }`}
                    style={{ transform: active ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    ▸
                  </span>
                </div>

                {/* detalhes expandidos */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: active ? "360px" : "0px" }}
                >
                  <div className="mt-4 space-y-3 border-t border-line pt-4 text-left">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted">
                        Desafio
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">
                        {c.desafio}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted">
                        Solução
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/75">
                        {c.solucao}
                      </p>
                    </div>
                    {c.resultado && (
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-muted">
                          Resultado
                        </p>
                        <p className="kw mt-1 font-display text-lg font-bold">
                          {c.resultado}
                        </p>
                      </div>
                    )}
                    {c.depoimento && (
                      <blockquote className="border-l-2 border-accent pl-4 text-sm italic text-white/50">
                        "{c.depoimento.texto}"
                        <footer className="mt-1 not-italic text-white/40">
                          — {c.depoimento.autor}
                        </footer>
                      </blockquote>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── iPhone mockup (sticky no desktop) ── */}
        <div className="phone-wrap order-1 shrink-0 lg:order-2 lg:sticky lg:top-24 lg:h-fit">
          <div ref={phoneRef}>
            <IPhoneMock c={activeCase} />
          </div>
        </div>
      </div>
    </section>
  );
}
