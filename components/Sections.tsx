"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ctas, linkWhatsApp, marca, processo } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Processo comercial em 4 passos ---------- */
export function Processo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".proc-step", {
        y: 36,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="processo"
      ref={root}
      className="mx-auto max-w-[90rem] px-6 py-32 lg:px-20"
    >
      <p className="label-mono text-white/40">( como funciona )</p>
      <h2 className="display-section mt-8 max-w-3xl">
        Do primeiro contato ao <span className="kw">crescimento</span>
      </h2>

      <ol className="mt-20 border-t border-line">
        {processo.map((p, i) => (
          <li
            key={p.titulo}
            className="proc-step grid items-baseline gap-3 border-b border-line py-10 lg:grid-cols-12 lg:gap-6"
          >
            <span
              className={`label-mono lg:col-span-2 ${
                i % 2 === 0 ? "text-primary/80" : "text-accent/80"
              }`}
            >
              ({String(i + 1).padStart(2, "0")})
            </span>
            <h3 className="display text-2xl lg:col-span-4 lg:text-3xl">
              {p.titulo}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-muted lg:col-span-6">
              {p.descricao}
            </p>
          </li>
        ))}
      </ol>

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
      className="studio-glow relative overflow-hidden border-t border-line py-36 text-center lg:py-44"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="cta-el badge-pill mx-auto w-fit">
          <span className="label-mono text-white/70">
            Diagnóstico gratuito
          </span>
        </div>

        <h2 className="display-section cta-el mt-10">
          Pronto pra <span className="kw">vender mais</span>
          <br />
          com marketing?
        </h2>

        <p className="cta-el mx-auto mt-8 max-w-xl leading-relaxed text-white/80">
          Analisamos Instagram, tráfego, posicionamento e canais de venda — e
          mostramos os próximos passos. Quem investiu, já faturou{" "}
          <span className="kw">+R$&nbsp;5&nbsp;milhões</span> com a gente.
        </p>

        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-el mt-10 inline-block rounded-full bg-primary px-10 py-5 font-display text-base font-bold uppercase tracking-wide text-background shadow-neon transition-transform hover:scale-105"
        >
          {ctas.principal}
        </a>

        <p className="cta-el label-mono mt-12 text-white/45">
          Sem custo · sem compromisso · resposta rápida no WhatsApp
        </p>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-14">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-20">
        <div className="flex flex-col items-start justify-between gap-6 text-sm text-muted sm:flex-row sm:items-center">
          <p className="max-w-xs leading-relaxed">{marca.endereco}</p>
          <div className="flex items-center gap-8">
            <a
              href={marca.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono transition-colors hover:text-primary"
            >
              instagram
            </a>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono transition-colors hover:text-primary"
            >
              whatsapp
            </a>
          </div>
          <p className="label-mono text-white/30">
            © {new Date().getFullYear()} — joão pessoa, pb
          </p>
        </div>

        {/* Wordmark fantasma — assinatura de fechamento */}
        <a
          href="#"
          aria-label="Voltar ao topo"
          className="ghost-text mt-12 block whitespace-nowrap text-center font-display font-bold leading-none"
          style={{ fontSize: "clamp(3.2rem, 11.5vw, 10.5rem)" }}
        >
          iRMarketing
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
