"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Zap, Lock, Layers, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: "01", icon: Zap,    color: "#3B82F6", glow: "rgba(59,130,246,0.18)",
    title: "Speed Without Compromise",
    body:  "Agile process, real results — days not months. We move fast without cutting corners on quality, security, or scalability.",
  },
  {
    num: "02", icon: Lock,   color: "#EF4444", glow: "rgba(239,68,68,0.18)",
    title: "Security-First by Default",
    body:  "Every solution is hardened from day one. Cybersecurity isn't an afterthought — it's baked into every line of code and every deployment.",
  },
  {
    num: "03", icon: Layers, color: "#F97316", glow: "rgba(249,115,22,0.18)",
    title: "Full-Stack Ownership",
    body:  "One team, end to end. Strategy, design, development, deployment, and 24/7 support — we own every layer so nothing falls through the cracks.",
  },
  {
    num: "04", icon: Clock,  color: "#10B981", glow: "rgba(16,185,129,0.18)",
    title: "Always-On Support",
    body:  "Your business doesn't sleep, and neither do we. 24/7 monitoring, helpdesk, and escalation keeps you operational no matter what.",
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.set(".why-eyebrow", { autoAlpha: 0, y: 20, filter: "blur(6px)" });
    gsap.set(".why-word",    { yPercent: 110 });
    gsap.set(".why-body",    { autoAlpha: 0, y: 24, filter: "blur(5px)" });
    gsap.set(".why-cta",     { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".why-card",    { autoAlpha: 0, y: 48, scale: 0.96, filter: "blur(8px)" });

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { ease: "power3.out" },
    })
      .to(".why-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 })
      .to(".why-word",    { yPercent: 0, duration: 0.9, stagger: 0.07 }, "-=0.35")
      .to(".why-body",    { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.75, stagger: 0.12 }, "-=0.5")
      .to(".why-cta",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.3");

    gsap.to(".why-card", {
      autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
      duration: 0.65, stagger: 0.1, ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      },
    });

    document.querySelectorAll<HTMLElement>(".why-card").forEach(card => {
      const color = card.dataset.color!;
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.35, ease: "power2.out" });
        card.style.borderColor = color + "55";
        card.style.boxShadow = `0 0 0 1px ${color}18, 0 24px 60px ${color}18, inset 0 1px 0 rgba(255,255,255,0.04)`;
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.55)" });
        card.style.borderColor = "rgba(255,255,255,0.07)";
        card.style.boxShadow = "none";
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Why choose Tekktopia"
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 96, paddingBottom: 96 }}
    >
      {/* Fine grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora blobs */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width:800, height:800, borderRadius:"50%", top:"-20%", left:"-10%", background:"radial-gradient(circle,rgba(37,99,235,0.14) 0%,transparent 68%)", filter:"blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width:600, height:600, borderRadius:"50%", bottom:"-15%", right:"-8%", background:"radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 68%)", filter:"blur(100px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width:400, height:400, borderRadius:"50%", top:"50%", right:"30%", background:"radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 68%)", filter:"blur(80px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left ── */}
          <div className="why-left flex flex-col">

            {/* Eyebrow */}
            <div className="why-eyebrow flex items-center gap-3 mb-6">
              <span style={{ height:1, width:24, background:"#F97316", display:"block", borderRadius:99 }} />
              <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.28em", color:"rgba(255,255,255,0.58)" }}>
                Why Tekktopia
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-black uppercase mb-8"
              style={{ fontSize:"clamp(34px,4.8vw,60px)", lineHeight:0.92, letterSpacing:"-0.03em" }}>
              {[
                { text: "The tech", accent: false },
                { text: "partner that", accent: false },
                { text: "gets it done.", accent: true },
              ].map(({ text, accent }, li) => (
                <span key={li} className="block">
                  {text.split(" ").map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                      <span className="why-word inline-block"
                        style={{ color: accent ? "#F97316" : "#ffffff" }}>
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            {/* Body */}
            <p className="why-body mb-4 max-w-md"
              style={{ fontSize:"clamp(14px,1.5vw,16px)", color:"rgba(255,255,255,0.72)", fontWeight:300, lineHeight:1.75 }}>
              We&apos;re not a faceless agency with rotating consultants. We&apos;re a focused, hands-on team of engineers, designers, and strategists who treat your problems like our own.
            </p>
            <p className="why-body mb-12 max-w-md"
              style={{ fontSize:"clamp(13px,1.4vw,15px)", color:"rgba(255,255,255,0.55)", fontWeight:300, lineHeight:1.8 }}>
              Our clients stay because we deliver — on time, within budget, and beyond expectations. Every time.
            </p>

            {/* CTAs */}
            <div className="why-cta flex flex-wrap gap-3">
              <Link href="/about"
                className="group inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
                  boxShadow: "0 0 0 1px rgba(59,130,246,0.28), 0 4px 24px rgba(37,99,235,0.28)",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 60px rgba(37,99,235,0.55),0 0 0 1px rgba(59,130,246,0.5)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 0 1px rgba(59,130,246,0.28),0 4px 24px rgba(37,99,235,0.28)"; e.currentTarget.style.transform="none"; }}
              >
                Meet the team
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
              <Link href="/projects"
                className="group inline-flex items-center gap-2.5 font-medium text-sm px-7 py-3.5 rounded-xl"
                style={{
                  color:"rgba(255,255,255,0.65)",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  transition:"border-color 0.3s, color 0.3s, background 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.22)"; e.currentTarget.style.color="#fff"; e.currentTarget.style.background="rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.65)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}
              >
                See our work
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>

          {/* ── Right — 2×2 pillar cards ── */}
          <div className="why-right grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map(({ num, icon: Icon, color, glow, title, body }) => (
              <div key={num}
                className="why-card relative flex flex-col gap-5 p-7 rounded-2xl cursor-default overflow-hidden"
                data-color={color}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  transition: "border-color 0.35s, box-shadow 0.35s",
                }}
              >
                {/* Large background number */}
                <span aria-hidden style={{
                  position: "absolute", top: 12, right: 16,
                  fontFamily: "monospace", fontSize: 64, fontWeight: 900,
                  color: color, opacity: 0.06, lineHeight: 1, userSelect: "none",
                  letterSpacing: "-0.04em",
                }}>
                  {num}
                </span>

                {/* Icon */}
                <div style={{
                  width: 46, height: 46, borderRadius: 13, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: glow, border: `1px solid ${color}30`,
                  boxShadow: `0 0 18px ${glow}`,
                }}>
                  <Icon style={{ width: 20, height: 20, color }} strokeWidth={1.6} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-bold mb-2.5"
                    style={{ fontSize: 16, color: "#fff", lineHeight: 1.25 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                    {body}
                  </p>
                </div>

                {/* Bottom color line */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(to right, transparent, ${color}55, transparent)`,
                }} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
