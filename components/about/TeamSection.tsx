"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ExternalLink, AtSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Tekktopia Founder",
    role: "Chief Executive Officer",
    dept: "Leadership",
    accent: "#F97316",
    abbr: "TF",
    bio: "Visionary technologist with a passion for building systems that scale. Leads the company's strategic direction and client relationships.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Engineering",
    role: "CTO / Lead Engineer",
    dept: "Engineering",
    accent: "#3B82F6",
    abbr: "HE",
    bio: "Full-stack architect with deep expertise in cloud infrastructure, microservices, and modern frontend frameworks.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Cybersecurity",
    role: "Chief Security Officer",
    dept: "Security",
    accent: "#EF4444",
    abbr: "HC",
    bio: "Certified ethical hacker and security strategist. Leads all penetration testing, compliance, and 24/7 monitoring operations.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Design",
    role: "Lead UX/UI Designer",
    dept: "Design",
    accent: "#8B5CF6",
    abbr: "HD",
    bio: "Product designer who bridges the gap between complex systems and intuitive user experiences across web and mobile.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Cloud",
    role: "Cloud Architect",
    dept: "Infrastructure",
    accent: "#06B6D4",
    abbr: "HCl",
    bio: "AWS and Azure certified architect specialising in cloud migrations, DevOps pipelines, and cost-optimised infrastructure.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Client Success",
    role: "Client Success Manager",
    dept: "Operations",
    accent: "#10B981",
    abbr: "CS",
    bio: "Ensures every client engagement exceeds expectations — from onboarding to ongoing support and strategic account growth.",
    linkedin: "#",
    twitter: "#",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(".tm-eyebrow", { autoAlpha: 0, y: 16, filter: "blur(5px)" });
    gsap.set(".tm-word",    { yPercent: 110 });
    gsap.set(".tm-sub",     { autoAlpha: 0, y: 16, filter: "blur(4px)" });

    gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 88%", end: "bottom 15%", toggleActions: "play reverse play reverse" },
      defaults: { ease: "power3.out" },
    })
      .to(".tm-eyebrow", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 })
      .to(".tm-word",    { yPercent: 0, duration: 0.85, stagger: 0.07 }, "-=0.35")
      .to(".tm-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, "-=0.4");

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, { autoAlpha: 0, y: 50, scale: 0.95, filter: "blur(8px)" });

      gsap.to(card, {
        autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.65, ease: "power3.out",
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: card, start: "top 88%", end: "bottom 10%", toggleActions: "play reverse play reverse" },
      });

      const color = card.dataset.color!;
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
        card.style.borderColor = color + "44";
        card.style.boxShadow = `0 0 32px ${color}18`;
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
      aria-label="Our team"
      className="relative overflow-hidden"
      style={{ background: "#060C15", paddingTop: 96, paddingBottom: 96 }}
    >
      {/* Top rule */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: "50%", top: "-20%", right: "-8%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", bottom: "-15%", left: "-10%", background: "radial-gradient(circle,rgba(37,99,235,0.1) 0%,transparent 65%)", filter: "blur(90px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="tm-eyebrow flex items-center justify-center gap-3 mb-6">
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
              The People
            </span>
            <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          </div>
          <h2 className="font-display font-black uppercase"
            style={{ fontSize: "clamp(32px,4.5vw,58px)", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
            {["Meet", "the", "Team"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.18em]">
                <span className="tm-word inline-block" style={{ color: i === 2 ? "#F97316" : "#ffffff" }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="tm-sub mt-5 mx-auto max-w-lg"
            style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontWeight: 300 }}>
            A focused, battle-tested team of engineers, designers, and strategists — each one hand-picked for their craft and their character.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map(({ name, role, dept, accent, abbr, bio, linkedin, twitter }, i) => (
            <div
              key={name}
              ref={el => { cardRefs.current[i] = el; }}
              data-color={accent}
              className="relative flex flex-col p-7 rounded-2xl overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.35s, box-shadow 0.35s",
              }}
            >
              {/* Bottom accent line */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${accent}55, transparent)` }} />

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-5">
                <div style={{
                  width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                  background: `radial-gradient(135deg at 30% 30%, ${accent}30, ${accent}08)`,
                  border: `1px solid ${accent}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 20px ${accent}20`,
                  fontSize: 16, fontWeight: 800, color: accent, fontFamily: "monospace",
                }}>
                  {abbr}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 3 }}>{name}</p>
                  <p style={{ fontSize: 11, color: accent, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.12em" }}>{role}</p>
                </div>
              </div>

              {/* Dept badge */}
              <div className="mb-4">
                <span style={{
                  padding: "2px 10px", borderRadius: 99,
                  background: `${accent}12`, border: `1px solid ${accent}28`,
                  fontSize: 10, fontFamily: "monospace", textTransform: "uppercase",
                  letterSpacing: "0.14em", color: accent,
                }}>
                  {dept}
                </span>
              </div>

              {/* Bio */}
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.58)", lineHeight: 1.75, fontWeight: 300, flexGrow: 1, marginBottom: 20 }}>
                {bio}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                <a href={linkedin} aria-label="LinkedIn"
                  className="flex items-center justify-center rounded-lg transition-colors"
                  style={{ width: 32, height: 32, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent + "44"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <ExternalLink style={{ width: 13, height: 13 }} />
                </a>
                <a href={twitter} aria-label="Twitter / X"
                  className="flex items-center justify-center rounded-lg transition-colors"
                  style={{ width: 32, height: 32, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent + "44"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <AtSign style={{ width: 13, height: 13 }} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
