"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Zap, Clock, Lock, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { icon: Zap,    title: "Speed Without Compromise",  body: "We move fast — never at the expense of quality. Agile process means real results in days, not months.", color: "text-blue", bg: "bg-blue/10",    border: "border-blue/20" },
  { icon: Lock,   title: "Security-First by Default", body: "Every solution is hardened from day one. Cybersecurity isn't an afterthought — it's baked into our DNA.", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/15" },
  { icon: Layers, title: "Full-Stack Ownership",      body: "One team, end to end. Strategy, design, development, deployment, and ongoing support — we own every layer.", color: "text-orange",  bg: "bg-orange/10",  border: "border-orange/20" },
  { icon: Clock,  title: "Always-On Support",         body: "Your business doesn't sleep, and neither do we. 24/7 monitoring and helpdesk keeps you operational.", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/15" },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const words = document.querySelectorAll<HTMLElement>(".why-word");
    gsap.set(".why-eyebrow-line", { scaleX: 0, transformOrigin: "left" });
    gsap.set(".why-eyebrow",      { opacity: 0, y: 12 });
    gsap.set(words,               { y: "110%" });
    gsap.set(".why-body",         { opacity: 0, y: 20 });
    gsap.set(".why-cta",          { opacity: 0, y: 16 });
    gsap.set(".why-card",         { opacity: 0, y: 36, scale: 0.96 });

    gsap.timeline({ scrollTrigger: { trigger: ".why-left", start: "top 82%", toggleActions: "play reverse play reverse" }, defaults: { ease: "power3.out" } })
      .to(".why-eyebrow-line", { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
      .to(".why-eyebrow",      { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to(words,               { y: 0, duration: 0.85, stagger: 0.07 }, "-=0.2")
      .to(".why-body",         { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
      .to(".why-cta",          { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.3");

    gsap.timeline({ scrollTrigger: { trigger: ".why-right", start: "top 82%", toggleActions: "play reverse play reverse" } })
      .to(".why-card", { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "power3.out" });

    document.querySelectorAll<HTMLElement>(".why-card").forEach((card) => {
      card.addEventListener("mouseenter", () => gsap.to(card, { y: -5, duration: 0.3, ease: "power2.out" }));
      card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" }));
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 md:px-12 bg-navy" aria-label="Why choose Tekktopia">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left */}
          <div className="why-left flex flex-col">
            <span className="why-eyebrow text-xs font-mono font-semibold text-orange uppercase tracking-[0.22em] mb-8 flex items-center gap-3">
              <span className="why-eyebrow-line w-6 h-[2px] bg-orange block rounded-full" />
              Why Tekktopia
            </span>

            <h2 className="font-display font-bold text-[clamp(32px,4.5vw,58px)] text-white leading-[1.0] tracking-tight mb-8">
              {["The tech partner", "that actually", "gets it done."].map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                      <span className="why-word inline-block">{word}&nbsp;</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <div className="w-12 h-[2px] bg-gradient-to-r from-orange to-blue mb-8 rounded-full" />

            <p className="why-body text-base md:text-lg text-white/55 font-light leading-relaxed mb-4 max-w-lg">
              We're not a faceless agency with rotating consultants. We're a focused, hands-on team of engineers, designers, and strategists who treat your problems like our own.
            </p>
            <p className="why-body text-base text-white/50 font-light leading-relaxed mb-10 max-w-lg">
              Our clients stay because we deliver — on time, within budget, and beyond expectations.
            </p>

            <div className="why-cta flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="group inline-flex items-center gap-2 text-white font-semibold text-sm border-b-2 border-orange/50 hover:border-orange pb-1 transition-colors">
                Meet the team <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/projects" className="group inline-flex items-center gap-2 text-white/50 font-medium text-sm border-b-2 border-transparent hover:border-white/30 pb-1 transition-colors hover:text-white">
                See our work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right — 2×2 cards */}
          <div className="why-right grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map(({ icon: Icon, title, body, color, bg, border }) => (
              <div key={title} className={`why-card relative p-6 rounded-2xl border ${border} bg-white/5 cursor-default flex flex-col gap-4 transition-all duration-300 hover:bg-white/8 hover:border-orange/30`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} border ${border}`}>
                  <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-base mb-2">{title}</h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
