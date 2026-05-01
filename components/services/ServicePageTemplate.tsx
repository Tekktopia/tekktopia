"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import SERVICES from "@/lib/services-data";
import { CTABanner } from "@/components/home";

gsap.registerPlugin(ScrollTrigger);

export default function ServicePageTemplate({ slug }: { slug: string }) {
  const svc = SERVICES.find(s => s.slug === slug)!;
  const Icon = svc.icon;
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(".sp-eyebrow",  { autoAlpha: 0, y: 14 });
    gsap.set(".sp-word",     { yPercent: 110 });
    gsap.set(".sp-tagline",  { autoAlpha: 0, y: 18, filter: "blur(4px)" });
    gsap.set(".sp-tag",      { autoAlpha: 0, x: -10 });
    gsap.set(".sp-cta",      { autoAlpha: 0, y: 14 });
    gsap.set(".sp-icon-wrap",{ autoAlpha: 0, scale: 0.7, rotation: -15 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".sp-eyebrow",   { autoAlpha: 1, y: 0, duration: 0.55 }, 0.1)
      .to(".sp-word",      { yPercent: 0, duration: 1, stagger: 0.065 }, "-=0.3")
      .to(".sp-icon-wrap", { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.6)" }, 0.2)
      .to(".sp-tagline",   { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.5")
      .to(".sp-tag",       { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.06 }, "-=0.4")
      .to(".sp-cta",       { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, { scope: pageRef });

  return (
    <div ref={pageRef} style={{ background: "#04080F" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden"
        style={{ paddingTop: 120, paddingBottom: 80 }}>

        {/* Grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />

        {/* Aurora */}
        <div aria-hidden className="absolute pointer-events-none"
          style={{ width: 800, height: 800, borderRadius: "50%", top: "-25%", left: "-10%", background: `radial-gradient(circle,${svc.color}1a 0%,transparent 65%)`, filter: "blur(100px)" }} />
        <div aria-hidden className="absolute pointer-events-none"
          style={{ width: 500, height: 500, borderRadius: "50%", bottom: "0", right: "-5%", background: `radial-gradient(circle,${svc.color}0d 0%,transparent 65%)`, filter: "blur(80px)" }} />

        {/* Colour top rule */}
        <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right,transparent,${svc.color}55,transparent)` }} />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

          {/* Back link */}
          <Link href="/services"
            className="sp-eyebrow inline-flex items-center gap-2 mb-10 group"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "monospace", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
            <div>
              {/* Eyebrow */}
              <div className="sp-eyebrow flex items-center gap-3 mb-6">
                <span style={{ height: 1, width: 24, background: svc.color, display: "block", borderRadius: 99 }} />
                <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                  {svc.num} — Our Services
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-black uppercase mb-5"
                style={{ fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
                {svc.name.split(" ").map((word, i, arr) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.14em]">
                    <span className="sp-word inline-block"
                      style={{ color: i >= Math.ceil(arr.length / 2) ? svc.color : "#ffffff" }}>
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              {/* Tagline */}
              <p className="sp-tagline mb-6"
                style={{ fontSize: "clamp(16px,1.8vw,22px)", color: "rgba(255,255,255,0.7)", fontWeight: 300, lineHeight: 1.6, fontStyle: "italic" }}>
                {svc.tagline}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {svc.tags.map(tag => (
                  <span key={tag} className="sp-tag"
                    style={{
                      fontFamily: "monospace", fontSize: 10, padding: "4px 12px",
                      borderRadius: 99, border: `1px solid ${svc.color}30`,
                      color: "rgba(255,255,255,0.6)", background: `${svc.color}0d`,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="sp-cta flex flex-wrap gap-3">
                <Link href="/contact"
                  className="group inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg,${svc.color},${svc.color}cc)`, boxShadow: `0 0 0 1px ${svc.color}44,0 4px 24px ${svc.color}33`, transition: "box-shadow 0.3s,transform 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 55px ${svc.color}55,0 0 0 1px ${svc.color}66`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 0 1px ${svc.color}44,0 4px 24px ${svc.color}33`; e.currentTarget.style.transform = "none"; }}
                >
                  Get a free quote <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </Link>
                <Link href="/services"
                  className="group inline-flex items-center gap-2.5 font-medium text-sm px-7 py-3.5 rounded-xl"
                  style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", transition: "border-color 0.3s,color 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >
                  All services
                </Link>
              </div>
            </div>

            {/* Large icon */}
            <div className="sp-icon-wrap hidden lg:flex items-center justify-center"
              style={{
                width: 140, height: 140, borderRadius: 32, flexShrink: 0,
                background: `radial-gradient(135deg at 30% 30%, ${svc.color}25, ${svc.color}08)`,
                border: `1px solid ${svc.color}30`,
                boxShadow: `0 0 60px ${svc.color}20`,
              }}>
              <Icon style={{ width: 60, height: 60, color: svc.color }} strokeWidth={1.3} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <Section label="Overview" color={svc.color}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <p style={{ fontSize: "clamp(16px,1.6vw,20px)", color: "rgba(255,255,255,0.7)", fontWeight: 300, lineHeight: 1.85 }}>
            {svc.overview}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Service #",    value: svc.num },
              { label: "Tech Tags",    value: `${svc.tags.length}+` },
              { label: "Process Steps",value: `${svc.process.length}` },
              { label: "Support",      value: "24/7" },
            ].map(({ label, value }) => (
              <div key={label} className="p-5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: 10, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>{label}</p>
                <p className="font-display font-black" style={{ fontSize: 28, color: svc.color, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Features ── */}
      <Section label="What's Included" color={svc.color} alt>
        <SectionTitle white="What We" orange="Deliver" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {svc.features.map(({ title, body }, i) => (
            <FeatureCard key={title} title={title} body={body} color={svc.color} index={i} />
          ))}
        </div>
      </Section>

      {/* ── Process ── */}
      <Section label="How We Work" color={svc.color}>
        <SectionTitle white="Our" orange="Process" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {svc.process.map(({ step, title, body }, i) => (
            <div key={step} className="relative p-7 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Connector line */}
              {i < svc.process.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-5 h-px z-10"
                  style={{ background: `linear-gradient(to right,${svc.color}44,transparent)` }} />
              )}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(to right,${svc.color},transparent)` }} />
              <span style={{ fontFamily: "monospace", fontSize: 11, color: svc.color, letterSpacing: "0.18em", display: "block", marginBottom: 16 }}>{step}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, fontWeight: 300 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Tech Stack ── */}
      <Section label="Tech Stack" color={svc.color} alt>
        <SectionTitle white="Tools &" orange="Technologies" />
        <div className="flex flex-wrap gap-3 mt-10">
          {svc.stack.map(tech => (
            <div key={tech} className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: svc.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)", fontFamily: "monospace" }}>{tech}</span>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function Section({ label, color, alt, children }: {
  label: string; color: string; alt?: boolean; children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.set(ref.current, { autoAlpha: 0, y: 30 });
    gsap.to(ref.current, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none none" },
    });
  }, { scope: ref });
  return (
    <section ref={ref} style={{ background: alt ? "#060C15" : "#04080F", paddingTop: 80, paddingBottom: 80, position: "relative" }}>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)" }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <p style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: color, opacity: 0.8, marginBottom: 32 }}>
          — {label}
        </p>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ white, orange }: { white: string; orange: string }) {
  return (
    <h2 className="font-display font-black uppercase"
      style={{ fontSize: "clamp(28px,3.5vw,48px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
      <span style={{ color: "#fff" }}>{white} </span>
      <span style={{ color: "#F97316" }}>{orange}</span>
    </h2>
  );
}

function FeatureCard({ title, body, color, index }: { title: string; body: string; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.set(ref.current, { autoAlpha: 0, y: 36, filter: "blur(6px)" });
    gsap.to(ref.current, {
      autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out",
      delay: (index % 3) * 0.1,
      scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="group relative p-7 rounded-2xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s,box-shadow 0.3s,transform 0.3s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + "44"; e.currentTarget.style.boxShadow = `0 0 30px ${color}18`; e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: `linear-gradient(to right,${color}66,transparent)` }} />
      <CheckCircle2 style={{ width: 22, height: 22, color, marginBottom: 16 }} />
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, fontWeight: 300 }}>{body}</p>
    </div>
  );
}
