"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { manifesto } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type Tone = "base" | "green" | "purple";

/** *palavra* → verde · _palavra_ → roxo */
function parseManifesto(src: string): { text: string; tone: Tone }[] {
  return src.split(/\s+/).map((raw) => {
    const m = raw.match(/^(\*|_)(.+)\1(.*)$/);
    if (m) {
      return {
        text: m[2] + m[3],
        tone: m[1] === "*" ? ("green" as Tone) : ("purple" as Tone),
      };
    }
    return { text: raw, tone: "base" as Tone };
  });
}

const words = parseManifesto(manifesto);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reveal palavra a palavra, amarrado ao scroll
      gsap.fromTo(
        ".mani-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            end: "center 42%",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      id="manifesto"
      ref={root}
      className="relative mx-auto max-w-[90rem] px-6 py-32 lg:px-20 lg:py-44"
    >
      <p className="label-mono text-white/40">( o que acreditamos )</p>

      <p className="display-statement mt-10 max-w-5xl">
        {words.map((w, i) => (
          <span key={i}>
            <span
              className={`mani-word inline-block ${
                w.tone === "green" ? "kw" : w.tone === "purple" ? "kw-accent" : ""
              }`}
            >
              {w.text}
            </span>{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
