"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { servicos } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".srv-card", root.current);

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.from(".srv-led", {
        scaleY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section id="servicos" ref={root} className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12">
      {/* LED roxo — contraste com o LED verde do hero */}
      <div className="srv-led led-v-accent absolute left-0 top-24 hidden h-[70%] lg:block" />

      <h2 className="display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
        Marketing com <span className="kw">estratégia</span>, não com achismo
      </h2>
      <p className="mt-6 max-w-xl text-muted">
        Do diagnóstico à execução: cada serviço existe para gerar venda,
        posicionamento ou conexão — nunca pra postar por postar.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s, i) => {
          const isAccent = i % 2 === 1;
          return (
            <article
              key={s.titulo}
              className={`srv-card group rounded-2xl border border-line bg-surface p-8 transition-all hover:-translate-y-1 ${
                isAccent
                  ? "hover:border-accent/50 hover:shadow-accent-soft"
                  : "hover:border-primary/50 hover:shadow-neon-soft"
              }`}
            >
              <h3
                className={`font-display text-base font-semibold ${
                  isAccent ? "group-hover:text-accent" : "group-hover:text-primary"
                }`}
              >
                {s.titulo}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.descricao}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
