"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MASK = {
  maskImage:
    "radial-gradient(ellipse 70% 65% at 50% 45%, black 55%, transparent 78%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 65% at 50% 45%, black 55%, transparent 78%)",
} as React.CSSProperties;

// ─── Mobile (acima do headline, sem mouse-parallax) ────────────────────────
export function HeroStatueMobile() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const img = imgRef.current;
      const glow = glowRef.current;
      if (!img || !glow) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (reduced) return;
          gsap.to(img, {
            y: "-=10",
            duration: 3.0,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
          gsap.to(glow, {
            opacity: 0.22,
            duration: 2.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        },
      });
      tl.from(
        img,
        { y: 40, opacity: 0, scale: 0.92, duration: 0.9, ease: "power3.out" },
        0
      ).from(
        glow,
        { opacity: 0, scale: 0.6, duration: 1.1, ease: "power3.out" },
        0
      );
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative flex justify-center">
      <div className="relative w-[280px]">
        {/* Atmosfera roxa atrás da cabeça */}
        <div
          ref={glowRef}
          aria-hidden
          className="absolute left-1/2 top-[-8%] h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-accent blur-[80px]"
          style={{ opacity: 0.16 }}
        />
        <div ref={imgRef} className="relative z-10">
          <Image
            src="/hero-statue.png"
            alt="Estátua grega com estética neon"
            priority
            width={637}
            height={983}
            className="w-[280px]"
            style={MASK}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Desktop (full-bleed atrás da tipografia, float + mouse-parallax) ───────
export default function HeroStatue() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const img = imgRef.current;
      const glow = glowRef.current;
      const rim = rimRef.current;
      const wrapper = wrapperRef.current;
      if (!img || !glow || !rim || !wrapper) return;

      // ── Entrada ──────────────────────────────────────────────────
      const tl = gsap.timeline({
        onComplete: () => {
          if (reduced) {
            gsap.set(glow, { opacity: 0.18 });
            gsap.set(rim, { opacity: 0.1 });
            return;
          }
          // Idle: float suave + respiração da atmosfera
          gsap.to(img, {
            y: "-=14",
            duration: 3.2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
          gsap.to(glow, {
            opacity: 0.26,
            duration: 2.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
          gsap.to(rim, {
            opacity: 0.15,
            duration: 3.4,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        },
      });
      tl.from(
        img,
        {
          y: 60,
          opacity: 0,
          scale: 0.92,
          duration: 1.1,
          ease: "power3.out",
        },
        0.2
      )
        .from(
          glow,
          { opacity: 0, scale: 0.6, duration: 1.4, ease: "power3.out" },
          0.2
        )
        .from(
          rim,
          { opacity: 0, scale: 0.7, duration: 1.4, ease: "power3.out" },
          0.35
        );

      if (reduced) return;

      // ── Scroll parallax de saída ──────────────────────────────────
      const section = wrapper.closest("section");
      if (section) {
        gsap.to(img, {
          yPercent: 18,
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to([glow, rim], {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Mouse parallax (desktop only) ─────────────────────────────
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(img, { transformPerspective: 900 });
        const quickRotY = gsap.quickTo(img, "rotateY", {
          duration: 0.6,
          ease: "power1.out",
        });
        const quickRotX = gsap.quickTo(img, "rotateX", {
          duration: 0.6,
          ease: "power1.out",
        });
        const quickGlowX = gsap.quickTo(glow, "x", {
          duration: 0.8,
          ease: "power1.out",
        });
        const quickGlowY = gsap.quickTo(glow, "y", {
          duration: 0.8,
          ease: "power1.out",
        });

        const onMove = (e: MouseEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          quickRotY(nx * 8);
          quickRotX(-ny * 5);
          quickGlowX(-nx * 12);
          quickGlowY(-ny * 12);
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      className="relative flex h-full items-center justify-center"
    >
      {/* Área centralizada para alinhar glow com a imagem */}
      <div className="relative flex w-full max-w-[660px] justify-center">
        {/* Atmosfera roxa — domina o fundo, como na referência */}
        <div
          ref={glowRef}
          aria-hidden
          className="absolute left-1/2 top-[-2%] h-[62%] w-[80%] -translate-x-1/2 rounded-full bg-accent blur-[120px]"
          style={{ opacity: 0.18 }}
        />
        {/* Rim verde — contraluz da marca */}
        <div
          ref={rimRef}
          aria-hidden
          className="absolute bottom-[8%] right-[2%] h-[40%] w-[45%] rounded-full bg-primary blur-[110px]"
          style={{ opacity: 0.1 }}
        />
        {/* Imagem */}
        <div ref={imgRef} className="relative z-10 w-full">
          <Image
            src="/hero-statue.png"
            alt="Estátua grega com estética neon"
            priority
            width={637}
            height={983}
            className="h-auto w-full"
            style={MASK}
          />
        </div>
      </div>
    </div>
  );
}
