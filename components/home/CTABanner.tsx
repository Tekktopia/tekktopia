"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const words = document.querySelectorAll<HTMLElement>(".cta-word");
    gsap.set(words,        { y: "110%", rotation: 1 });
    gsap.set(".cta-sub",   { opacity: 0, y: 20 });
    gsap.set(".cta-btns",  { opacity: 0, y: 20 });
    gsap.set(".cta-badge", { opacity: 0, scale: 0.85 });

    gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play reverse play reverse" }, defaults: { ease: "power3.out" } })
      .to(".cta-badge", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" })
      .to(words,        { y: 0, rotation: 0, duration: 1.0, stagger: 0.06 }, "-=0.4")
      .to(".cta-sub",   { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
      .to(".cta-btns",  { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 px-6 md:px-12 bg-navy overflow-hidden" aria-label="Get started with Tekktopia">
      {/* Dot texture */}
      <div className="bg-dot-navy absolute inset-0 pointer-events-none" />
      {/* Soft glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange/6 rounded-full blur-[80px] pointer-events-none" />
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="cta-badge inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-orange/10 border border-orange/25 text-orange text-xs font-mono font-semibold uppercase tracking-[0.2em]">
          <Calendar className="w-3.5 h-3.5" />
          Free consultation — no commitment
        </div>

        <h2 className="font-display font-bold text-[clamp(34px,6vw,76px)] text-white leading-[0.95] tracking-tight mb-8">
          {["Ready to transform", "your business with", "the right tech?"].map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                  <span className="cta-word inline-block">{word}&nbsp;</span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="cta-sub text-base md:text-xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          Whether you need IT support, a custom platform, or a full digital overhaul — book a free 30-minute strategy session and let's talk.
        </p>

        <div className="cta-btns flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group cursor-pointer relative inline-flex h-14 md:h-16 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-orange px-10 font-display font-bold text-white transition-all duration-300 hover:bg-orange-light hover:shadow-[0_16px_40px_-8px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 active:scale-95"
          >
            <span className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-700 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <span className="relative h-full w-10 bg-white/20" />
            </span>
            <span className="relative z-10 flex items-center gap-2 text-base md:text-lg">
              Book a Free Consultation
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/services"
            className="group cursor-pointer inline-flex h-14 md:h-16 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/8 px-10 text-white/70 hover:text-white font-semibold text-base transition-all duration-300 active:scale-95"
          >
            View Our Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mt-10 text-xs font-mono text-white/25 uppercase tracking-[0.18em]">
          Trusted by 50+ clients · 98% satisfaction · No lock-in contracts
        </p>
      </div>
    </section>
  );
}
