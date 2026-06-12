"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ctas, linkWhatsApp, marca, processo, stats } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Números agregados (aparece só quando preenchido) ---------- */
export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const alvo = Number(el.dataset.valor ?? 0);
        const dec = Number(el.dataset.decimais ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: alvo,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = obj.v.toLocaleString("pt-BR", {
              minimumFractionDigits: dec,
              maximumFractionDigits: dec,
            });
          },
        });
      });
    },
    { scope: root }
  );

  if (stats.length === 0) return null;

  return (
    <section ref={root} className="border-y border-line bg-surface/40 py-24">
      <p className="mb-10 text-center text-xs uppercase tracking-widest text-white">
        Nossos Resultados
      </p>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 px-6 lg:grid-cols-4 lg:divide-x lg:divide-line lg:gap-y-0 lg:px-12">
        {stats.map((s) => (
          <div key={s.rotulo} className="flex flex-col items-center px-4 text-center lg:px-10">
            <p className="display whitespace-nowrap text-4xl leading-none lg:text-5xl">
              {s.prefixo && <span className="kw-accent text-2xl lg:text-3xl">{s.prefixo}</span>}
              <span
                className="stat-num kw tabular-nums"
                data-valor={s.valor}
                data-decimais={s.decimais ?? 0}
              >
                0
              </span>
              <span className="kw">{s.sufixo}</span>
            </p>
            <p className="mt-4 max-w-[14ch] text-xs uppercase tracking-widest text-white/90">
              {s.rotulo}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Processo comercial em 4 passos ---------- */
export function Processo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".proc-led", {
        scaleY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "bottom 70%",
          scrub: true,
        },
      });
      gsap.from(".proc-step", {
        x: -32,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="processo"
      ref={root}
      className="mx-auto max-w-7xl px-6 py-28 lg:px-12"
    >
      <h2 className="display text-3xl sm:text-4xl lg:text-5xl">
        Do primeiro contato ao <span className="kw">crescimento</span>
      </h2>

      <div className="relative mt-16 lg:ml-6">
        <div className="proc-led led-v-accent absolute -left-6 top-2 hidden h-[calc(100%-1rem)] lg:block" />

        <ol className="space-y-12">
          {processo.map((p, i) => (
            <li key={p.titulo} className="proc-step flex gap-6">
              <span className={`display shrink-0 text-3xl ${i % 2 === 0 ? "kw" : "kw-accent"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">
                  {p.titulo}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {p.descricao}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-16 max-w-2xl border-l-2 border-accent pl-6 text-lg italic text-white/80">
        “Em uma conversa estratégica, entendemos o momento da sua empresa,
        identificamos oportunidades e indicamos o melhor caminho para
        transformar marketing em crescimento real.”
      </p>
    </section>
  );
}

/* ---------- CTA final ---------- */
export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-el", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="contato"
      ref={root}
      className="studio-glow relative overflow-hidden border-t border-line py-32 text-center"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="display cta-el text-3xl sm:text-5xl">
          Pronto pra <span className="kw">vender mais</span> com marketing?
        </h2>
        <p className="cta-el mx-auto mt-6 max-w-xl text-white">
          Diagnóstico gratuito da sua presença digital: analisamos Instagram,
          tráfego, posicionamento e canais de venda — e mostramos os próximos
          passos.
        </p>
        <p className="cta-el mt-8 text-sm text-white">
          Quem investiu, já faturou{" "}
          <span className="kw">+R$&nbsp;5&nbsp;milhões</span> com a gente.
        </p>
        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-el mt-6 inline-block rounded-full bg-primary px-10 py-5 font-display text-base font-semibold text-background shadow-neon transition-transform hover:scale-105"
        >
          {ctas.principal}
        </a>
        <p className="cta-el mt-11 text-xs uppercase tracking-widest text-white">
          Sem custo · sem compromisso · resposta rápida no WhatsApp
        </p>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
        <p>
         
          <span className="kw font-display font-semibold">iR</span>
          MarketingStudio — {marca.endereco}
        </p>
        <a
          href={marca.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-accent"
        >
          @irmarketingstudio
        </a>
      </div>
    </footer>
  );
}

/* ---------- Botão flutuante de WhatsApp ---------- */
export function WhatsAppFab() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background shadow-neon transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5v-.4c0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
