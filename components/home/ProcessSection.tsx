"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, Code2, ShieldCheck, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  num: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  title: string;
  body: string;
  tags: string[];
};

const STEPS: Step[] = [
  {
    num: "01", icon: Search, color: "#3B82F6", glow: "rgba(59,130,246,0.18)",
    title: "Discovery & Strategy",
    body: "We map your business goals, technical landscape, and full scope before a single line of code is written. A dedicated strategist owns this phase end to end.",
    tags: ["Workshop", "Audit", "Roadmap"],
  },
  {
    num: "02", icon: PenTool, color: "#8B5CF6", glow: "rgba(139,92,246,0.18)",
    title: "Design & Architecture",
    body: "UX flows, system design, and tech stack decisions built for scalability and performance. Pixel-perfect Figma handoffs and design tokens ready for dev.",
    tags: ["UX Design", "System Design", "Tech Stack"],
  },
  {
    num: "03", icon: Code2, color: "#10B981", glow: "rgba(16,185,129,0.18)",
    title: "Agile Development",
    body: "Two-week sprints with continuous demos. You're always in the loop — no black boxes, no surprises. Iterative, testable, visible progress every step of the way.",
    tags: ["Sprints", "CI/CD", "Code Review"],
  },
  {
    num: "04", icon: ShieldCheck, color: "#EF4444", glow: "rgba(239,68,68,0.18)",
    title: "Testing & Security",
    body: "Rigorous QA, automated test suites, and penetration testing ensure your product is rock-solid and secure before it ever touches production.",
    tags: ["QA", "Pen Testing", "Performance"],
  },
  {
    num: "05", icon: Rocket, color: "#F97316", glow: "rgba(249,115,22,0.18)",
    title: "Launch & Ongoing Support",
    body: "Seamless deployment, monitoring setup, and 24/7 managed support. Your success doesn't end at launch — it begins there. We stay on.",
    tags: ["Deployment", "Monitoring", "24/7 Support"],
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".proc-eyebrow", { autoAlpha: 0, y: 20, filter: "blur(6px)" });
    gsap.set(".proc-word",    { yPercent: 110 });
    gsap.set(".proc-row",     { autoAlpha: 0, y: 36, filter: "blur(6px)" });

    // Header — fires once when section enters
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { ease: "power3.out" },
    })
      .to(".proc-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 })
      .to(".proc-word",    { yPercent: 0, duration: 0.9, stagger: 0.07 }, "-=0.4");

    // Each row gets its own ScrollTrigger so they animate in one by one
    gsap.utils.toArray<HTMLElement>(".proc-row").forEach((row) => {
      gsap.to(row, {
        autoAlpha: 1, y: 0, filter: "blur(0px)",
        duration: 0.65, ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 88%",
          end: "top 30%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="How we work"
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 96, paddingBottom: 96 }}
    >
      {/* Fine grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Aurora blobs */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: "50%", top: "-20%", right: "-8%",  background: "radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 68%)", filter: "blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-15%", left: "-6%", background: "radial-gradient(circle,rgba(249,115,22,0.09) 0%,transparent 68%)", filter: "blur(100px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <div className="proc-eyebrow flex items-center gap-3 mb-6">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.58)" }}>
                How We Work
              </span>
            </div>
            <h2 className="font-display font-black uppercase"
              style={{ fontSize: "clamp(36px,5.5vw,68px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
              {[
                { line: "How we turn",       accent: false },
                { line: "ideas into",        accent: false },
                { line: "shipped products.", accent: true  },
              ].map(({ line, accent }, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                      <span className="proc-word inline-block" style={{ color: accent ? "#F97316" : "#fff" }}>
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>
          <span className="proc-eyebrow flex-shrink-0 pb-1"
            style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)" }}>
            5 Steps
          </span>
        </div>

        {/* ── Step rows ── */}
        <div className="flex flex-col">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <div
                key={step.num}
                className="proc-row group relative"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  ...(isLast ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}),
                }}
              >
                {/* Hover: left color border */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                  style={{ background: `linear-gradient(to bottom, transparent, ${step.color}, transparent)` }}
                />

                {/* Hover: tinted bg wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `${step.color}07` }}
                />

                {/* ── Desktop row ── */}
                <div className="relative hidden md:grid items-center gap-6 py-8 pl-6 pr-2"
                  style={{ gridTemplateColumns: "88px 1px 1fr auto" }}>

                  {/* Giant faded step number */}
                  <span
                    className="font-mono font-black leading-none tracking-tighter select-none transition-[opacity,color] duration-300 opacity-[0.18] group-hover:opacity-50"
                    style={{ fontSize: "clamp(44px,4.5vw,68px)", color: step.color }}>
                    {step.num}
                  </span>

                  {/* Thin vertical divider */}
                  <div style={{
                    width: 1, height: 52, alignSelf: "center",
                    background: `linear-gradient(to bottom, transparent, ${step.color}60, transparent)`,
                  }} />

                  {/* Content: icon + title + body */}
                  <div className="flex flex-col gap-2.5 pl-6">
                    <div className="flex items-center gap-4">
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: step.glow, border: `1px solid ${step.color}30`,
                        boxShadow: `0 0 14px ${step.glow}`,
                      }}>
                        <Icon style={{ width: 15, height: 15, color: step.color }} strokeWidth={1.7} />
                      </div>
                      <h3 className="font-display font-bold"
                        style={{ fontSize: "clamp(17px,1.9vw,22px)", color: "#fff", lineHeight: 1.1 }}>
                        {step.title}
                      </h3>
                    </div>
                    <p style={{
                      fontSize: "clamp(13px,1.2vw,14.5px)",
                      color: "rgba(255,255,255,0.62)",
                      lineHeight: 1.78,
                      paddingLeft: 52,
                      maxWidth: 600,
                    }}>
                      {step.body}
                    </p>
                  </div>

                  {/* Tags — vertical stack, right-aligned */}
                  <div className="flex flex-col items-end gap-2 pl-6">
                    {step.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: "monospace", fontSize: 9, padding: "4px 11px",
                        borderRadius: 100, whiteSpace: "nowrap",
                        border: `1px solid ${step.color}30`,
                        color: "rgba(255,255,255,0.58)",
                        background: `${step.color}0d`,
                        textTransform: "uppercase", letterSpacing: "0.13em",
                        transition: "border-color 0.3s",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Mobile row ── */}
                <div className="relative md:hidden flex gap-4 py-7 px-4">
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: step.glow, border: `1px solid ${step.color}30`,
                  }}>
                    <Icon style={{ width: 16, height: 16, color: step.color }} strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <span style={{ fontFamily: "monospace", fontSize: 9, color: step.color, letterSpacing: "0.15em", display: "block", marginBottom: 5 }}>
                      {step.num}
                    </span>
                    <h3 className="font-display font-bold mb-2" style={{ fontSize: 17, color: "#fff", lineHeight: 1.2 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, marginBottom: 12 }}>
                      {step.body}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: "monospace", fontSize: 8.5, padding: "3px 8px",
                          borderRadius: 100, border: `1px solid ${step.color}28`,
                          color: "rgba(255,255,255,0.58)", background: `${step.color}0d`,
                          textTransform: "uppercase", letterSpacing: "0.1em",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
