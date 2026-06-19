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
      gsap.utils
        .toArray<HTMLElement>(".srv-card", root.current)
        .forEach((card) => {
          gsap.fromTo(
            card,
            { y: 56, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
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
    <section
      id="servicos"
      ref={root}
      className="relative border-t border-line"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-32 lg:px-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Coluna editorial — sticky no desktop */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <p className="label-mono text-white/40">( serviços )</p>
              <h2 className="display-section mt-8">
                Marketing de
                <br />
                <span className="kw">ponta a ponta</span>
              </h2>
              <p className="mt-8 max-w-sm leading-relaxed text-muted">
                Do diagnóstico à execução: cada serviço existe para gerar
                venda, posicionamento ou conexão  nunca pra postar por
                postar.
              </p>

              <div className="relative mt-12 hidden h-32 lg:block">
                <div className="srv-led led-v-accent absolute left-0 top-0 h-full" />
              </div>
            </div>
          </div>

          {/* Cards numerados */}
          <div className="mt-14 space-y-4 lg:col-span-7 lg:mt-0">
            {servicos.map((s, i) => {
              const isAccent = i % 2 === 1;
              return (
                <article
                  key={s.titulo}
                  className={`srv-card group glass-card p-8 transition-all duration-300 lg:p-10 ${
                    isAccent
                      ? "hover:border-accent/50 hover:shadow-accent-soft"
                      : "hover:border-primary/50 hover:shadow-neon-soft"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3
                      className={`display text-2xl transition-colors lg:text-3xl ${
                        isAccent
                          ? "group-hover:text-accent"
                          : "group-hover:text-primary"
                      }`}
                    >
                      {s.titulo}
                    </h3>
                    <span
                      className={`label-mono shrink-0 pt-2 ${
                        isAccent ? "text-accent/70" : "text-primary/70"
                      }`}
                    >
                      ({String(i + 1).padStart(2, "0")})
                    </span>
                  </div>

                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70">
                    {s.descricao}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-background/60 px-3.5 py-1.5 text-xs text-white/60 transition-colors group-hover:border-white/20 group-hover:text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
