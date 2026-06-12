"use client";

import { useRef, useState, useCallback } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { cases } from "@/lib/content";
import type { Case } from "@/lib/content";
import PhoneMock from "./PhoneMock";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const N = cases.length;
const PER_CASE_VH = 0.8;
const PLACEHOLDER_LABELS = ["Visualizações", "Alcance", "Curtidas", "Comentários"];

// ─── Tela do Instagram dentro do iPhone ──────────────────────────────────────
function IGScreen({ c }: { c: Case }) {
  const metrics = c.metricas ?? [];
  const hasMetrics = metrics.length > 0;

  return (
    <div className="flex h-full flex-col bg-[#0a0a0a]">
      {/* status bar */}
      <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-white/70">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
            <rect x="0" y="6" width="3" height="6" rx="0.8" opacity=".35" />
            <rect x="4.5" y="4" width="3" height="8" rx="0.8" opacity=".6" />
            <rect x="9" y="1.5" width="3" height="10.5" rx="0.8" opacity=".85" />
            <rect x="13.5" y="0" width="2.5" height="12" rx="0.8" />
          </svg>
          <div className="flex items-center gap-[2px]">
            <div className="h-[8px] w-[20px] rounded-[2px] border border-white/50 p-[1.5px]">
              <div className="h-full w-4/5 rounded-[1px] bg-white/80" />
            </div>
            <div className="h-[4px] w-[2px] rounded-r-sm bg-white/50" />
          </div>
        </div>
      </div>

      {/* top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".6">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span className="text-[13px] font-bold text-white">{c.instagram ?? c.cliente}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".6">
          <circle cx="5" cy="12" r="1.2" fill="white" />
          <circle cx="12" cy="12" r="1.2" fill="white" />
          <circle cx="19" cy="12" r="1.2" fill="white" />
        </svg>
      </div>

      {/* profile header */}
      <div className="shrink-0 px-4 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <div className="relative h-[54px] w-[54px] shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#BA1BFA] via-[#02FA8B] to-[#BA1BFA]" />
            <div className="absolute inset-[2.5px] flex items-center justify-center overflow-hidden rounded-full bg-[#0a0a0a]">
              <span className="text-lg font-bold text-primary">{c.cliente[0]}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-white">{c.instagram ?? c.cliente}</p>
            <p className="mt-0.5 truncate text-[10px] text-white/40">{c.cliente}</p>
            <p className="text-[10px] text-white/30">{c.setor}</p>
          </div>
          <button className="shrink-0 rounded-lg bg-[#0095f6] px-3 py-1 text-[11px] font-semibold text-white">
            Seguir
          </button>
        </div>
      </div>

      {/* post placeholder */}
      <div className="w-full shrink-0" style={{ aspectRatio: "1/1" }}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#111] to-[#0a0a0a]">
          <span className="text-5xl font-black text-white/[0.04]">{c.cliente[0]}</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/10">
            imagem em breve
          </span>
        </div>
      </div>

      {/* métricas 2×2 */}
      <div className="grid shrink-0 grid-cols-2 gap-[6px] p-3">
        {hasMetrics
          ? metrics.map((m, i) => (
              <div key={i} className="rounded-xl bg-white/[0.05] px-2 py-2.5 text-center">
                <p className="kw text-[15px] font-bold leading-none">
                  <span
                    className="metric-val tabular-nums"
                    data-valor={m.valor}
                    data-sufixo={m.sufixo ?? ""}
                    data-decimais={m.decimais ?? 0}
                  >
                    0{m.sufixo ?? ""}
                  </span>
                </p>
                <p className="mt-[4px] text-[8px] uppercase tracking-[0.1em] text-white/35">
                  {m.rotulo}
                </p>
              </div>
            ))
          : PLACEHOLDER_LABELS.map((label) => (
              <div key={label} className="rounded-xl bg-white/[0.05] px-2 py-2.5 text-center">
                <p className="kw text-[15px] font-bold leading-none tabular-nums">—</p>
                <p className="mt-[4px] text-[8px] uppercase tracking-[0.1em] text-white/35">
                  {label}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Cases() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneScreenRef = useRef<HTMLDivElement>(null);
  const phoneGlowRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Anima contadores dentro do iPhone após fade-in
  const runCounters = useCallback(() => {
    const els = phoneScreenRef.current?.querySelectorAll<HTMLElement>(".metric-val");
    if (!els?.length) return;
    els.forEach((el) => {
      const target = parseFloat(el.dataset.valor ?? "0");
      const sufixo = el.dataset.sufixo ?? "";
      const dec = parseInt(el.dataset.decimais ?? "0", 10);
      if (!isFinite(target) || target === 0) return;
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent =
            obj.v.toLocaleString("pt-BR", {
              minimumFractionDigits: dec,
              maximumFractionDigits: dec,
            }) + sufixo;
        },
      });
    });
  }, []);

  // Troca conteúdo do iPhone com fade+slide
  const switchPhone = useCallback(
    (newIdx: number) => {
      const screen = phoneScreenRef.current;
      const glow = phoneGlowRef.current;
      if (!screen) return;

      gsap.killTweensOf(screen);
      gsap.to(screen, {
        autoAlpha: 0,
        y: -16,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          flushSync(() => setActiveIdx(newIdx));
          gsap.fromTo(
            screen,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.35,
              ease: "power3.out",
              onComplete: runCounters,
            }
          );
        },
      });

      // Pulso de glow verde na borda do iPhone
      if (glow) {
        gsap.killTweensOf(glow);
        gsap.fromTo(
          glow,
          { opacity: 0.6 },
          { opacity: 0.08, duration: 0.4, ease: "power2.out" }
        );
      }
    },
    [runCounters]
  );

  // Expande/colapsa detalhes na lista via GSAP
  const switchDetail = useCallback((newIdx: number) => {
    detailRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === newIdx) {
        gsap.to(el, { height: "auto", autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.to(el, { height: 0, autoAlpha: 0, duration: 0.2, ease: "power2.in" });
      }
    });
  }, []);

  // Clique na lista → scroll até a posição do case no pin
  const scrollToCase = useCallback(
    (idx: number) => {
      const st = stRef.current;
      if (!st) {
        // Mobile: troca direta sem scroll
        if (idx === activeIdxRef.current) return;
        activeIdxRef.current = idx;
        switchPhone(idx);
        switchDetail(idx);
        return;
      }
      const totalPin = N * window.innerHeight * PER_CASE_VH;
      const targetScroll = st.start + (idx / (N - 1)) * totalPin;
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 0.8, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: "power2.inOut" });
      }
    },
    [switchPhone, switchDetail]
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Estado inicial dos detalhes (primeiro expandido, resto fechado)
      detailRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, i === 0 ? { height: "auto", autoAlpha: 1 } : { height: 0, autoAlpha: 0 });
      });

      const mm = gsap.matchMedia();

      // ── DESKTOP ──────────────────────────────────────────────────────────────
      mm.add("(min-width: 1024px)", () => {
        // Entrada do iPhone
        gsap.fromTo(
          ".phone-wrap",
          { opacity: 0, scale: 0.95, y: 24 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );

        if (reduced) return;

        // Pin scrollytelling
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
          const totalPin = N * window.innerHeight * PER_CASE_VH;

          const st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${totalPin}`,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / (N - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power2.inOut",
              delay: 0.05,
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Barra de progresso — puro GSAP, sem state React
              const bar = progressBarRef.current;
              if (bar) gsap.set(bar, { scaleY: self.progress });

              // Troca de case
              const newIdx = Math.min(N - 1, Math.round(self.progress * (N - 1)));
              if (newIdx !== activeIdxRef.current) {
                activeIdxRef.current = newIdx;
                switchPhone(newIdx);
                switchDetail(newIdx);
              }
            },
          });

          stRef.current = st;
        });

        return () => {
          stRef.current?.kill();
          stRef.current = null;
        };
      });

      // ── MOBILE ───────────────────────────────────────────────────────────────
      mm.add("(max-width: 1023px)", () => {
        // Garante todos os detalhes expandidos no mobile
        detailRefs.current.forEach((el) => {
          if (el) gsap.set(el, { height: "auto", autoAlpha: 1 });
        });

        // Reveal por card
        section.querySelectorAll<HTMLElement>(".case-card").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Contadores nas métricas mobile
        if (!reduced) {
          section.querySelectorAll<HTMLElement>(".mobile-metric-val").forEach((el) => {
            const target = parseFloat(el.dataset.valor ?? "0");
            const sufixo = el.dataset.sufixo ?? "";
            const dec = parseInt(el.dataset.decimais ?? "0", 10);
            if (!isFinite(target) || target === 0) return;
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate: () => {
                el.textContent =
                  obj.v.toLocaleString("pt-BR", {
                    minimumFractionDigits: dec,
                    maximumFractionDigits: dec,
                  }) + sufixo;
              },
            });
          });
        }
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  const activeCase = cases[activeIdx];

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="mx-auto max-w-[90rem] px-6 py-32 lg:px-20"
    >
      {/* cabeçalho */}
      <p className="label-mono text-white/40">( cases )</p>
      <h2 className="display-section mt-8 max-w-3xl">
        Cases que viraram <span className="kw">crescimento</span>
      </h2>
      <p className="mt-7 max-w-xl leading-relaxed text-muted">
        De hamburgueria a acessórios: estratégia aplicada em segmentos reais de
        João Pessoa e região.
      </p>

      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className="mt-16 hidden lg:flex lg:items-start lg:gap-10">

        {/* Progress bar + lista */}
        <div className="flex flex-1 items-stretch gap-5">
          {/* Barra de progresso vertical */}
          <div className="relative w-[2px] self-stretch">
            <div className="absolute inset-0 rounded-full bg-white/[0.07]" />
            <div
              ref={progressBarRef}
              className="led-v absolute left-0 top-0 h-full w-full"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Lista de cases */}
          <ol className="flex-1 space-y-2">
            {cases.map((c, i) => {
              const active = activeIdx === i;
              return (
                <li key={c.slug}>
                  <button
                    aria-current={active ? "true" : undefined}
                    onClick={() => scrollToCase(i)}
                    className={`w-full rounded-2xl border px-6 py-4 text-left ${
                      active
                        ? "border-primary/40 bg-primary/5"
                        : "border-line bg-surface/40 hover:border-white/10 hover:bg-surface/70"
                    }`}
                  >
                    {/* cabeçalho do item */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p
                          className={`font-display text-sm font-semibold lg:text-base ${
                            active ? "text-white" : "text-white/50"
                          }`}
                        >
                          {c.cliente}
                        </p>
                        <p
                          className={`mt-0.5 text-[10px] uppercase tracking-widest ${
                            active ? "text-primary" : "text-muted/50"
                          }`}
                        >
                          {c.setor}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 text-xs transition-transform duration-300 ${
                          active ? "text-primary" : "text-white/20"
                        }`}
                        style={{ display: "inline-block", transform: active ? "rotate(90deg)" : "rotate(0deg)" }}
                        aria-hidden
                      >
                        ▸
                      </span>
                    </div>

                    {/* Detalhes — altura animada pelo GSAP */}
                    <div
                      ref={(el) => { detailRefs.current[i] = el; }}
                      className="case-detail overflow-hidden"
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
                          <p className="kw font-display text-lg font-bold">
                            {c.resultado}
                          </p>
                        )}
                        {c.depoimento && (
                          <blockquote className="border-l-2 border-accent pl-4 text-sm italic text-white/50">
                            &ldquo;{c.depoimento.texto}&rdquo;
                            <footer className="mt-1 not-italic text-white/40">
                              — {c.depoimento.autor}
                            </footer>
                          </blockquote>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Frame real de telefone */}
        <div className="phone-wrap shrink-0">
          <div className="relative mx-auto w-[340px]">
            {/* Glow que pulsa na troca de case — aplicado no wrapper, não na tela */}
            <div
              ref={phoneGlowRef}
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(2,250,139,0.22) 0%, transparent 68%)",
                filter: "blur(32px)",
                opacity: 0.08,
              }}
            />
            {/* PhoneMock: frame PNG por baixo, conteúdo animado por cima */}
            <PhoneMock>
              <div ref={phoneScreenRef}>
                <IGScreen c={activeCase} />
              </div>
            </PhoneMock>
          </div>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="mt-10 space-y-6 lg:hidden">
        {cases.map((c) => {
          const metrics = c.metricas ?? [];
          return (
            <div
              key={c.slug}
              className="case-card rounded-2xl border border-line bg-surface/40 px-6 py-5"
            >
              <p className="font-display font-semibold text-white">{c.cliente}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-primary">
                {c.setor}
              </p>
              {c.instagram && (
                <p className="mt-1 text-[11px] text-white/30">{c.instagram}</p>
              )}
              <div className="mt-4 space-y-3 border-t border-line pt-4">
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
              </div>
              {metrics.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-[6px]">
                  {metrics.map((m, mi) => (
                    <div
                      key={mi}
                      className="rounded-xl bg-white/[0.05] px-2 py-2.5 text-center"
                    >
                      <p className="kw text-[15px] font-bold leading-none">
                        <span
                          className="mobile-metric-val tabular-nums"
                          data-valor={m.valor}
                          data-sufixo={m.sufixo ?? ""}
                          data-decimais={m.decimais ?? 0}
                        >
                          0{m.sufixo ?? ""}
                        </span>
                      </p>
                      <p className="mt-[4px] text-[8px] uppercase tracking-[0.1em] text-white/35">
                        {m.rotulo}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
