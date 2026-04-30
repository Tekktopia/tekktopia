"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  {
    name: "Microsoft",
    abbr: "MS",
    accent: "#00A4EF",
    desc: "Cloud & Infrastructure",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    logoBg: "rgba(255,255,255,0.92)",   // light bg so coloured logo shows
    logoFilter: "none",
  },
  {
    name: "Linerose Financials",
    abbr: "LF",
    accent: "#10B981",
    desc: "Financial Services",
    logo: "https://linerose-financials.ca/logo-w.png",
    logoBg: "transparent",   // white logo — sits directly on dark bg
    logoFilter: "none",
  },
  {
    name: "Szndpay",
    abbr: "SZ",
    accent: "#8B5CF6",
    desc: "Payment Solutions",
    logo: "https://szndpay.com/logo.svg",
    logoBg: "rgba(255,255,255,0.9)",
    logoFilter: "none",
  },
  {
    name: "Almond & Gavel",
    abbr: "AG",
    accent: "#F59E0B",
    desc: "Legal & Advisory",
    logo: null,
    logoBg: null,
    logoFilter: "none",
  },
  {
    name: "Cribxpert",
    abbr: "CX",
    accent: "#EF4444",
    desc: "Real Estate Tech",
    logo: "https://www.cribxpert.com/CribXpert.svg",
    logoBg: "rgba(255,255,255,0.9)",
    logoFilter: "none",
  },
  {
    name: "Jide Onasile & Co",
    abbr: "JO",
    accent: "#3B82F6",
    desc: "Estate Surveyors",
    logo: "https://jideonasileandco.com/wp-content/uploads/2023/04/JOC-3D-V5.gif",
    logoBg: "rgba(255,255,255,0.88)",
    logoFilter: "none",
  },
  {
    name: "Liquid Intelligent Technologies",
    abbr: "LI",
    accent: "#06B6D4",
    desc: "Connectivity & Cloud",
    // white logo variant — renders directly on dark bg
    logo: "https://liquid.tech/wp-content/uploads/2022/12/logo_LIQUID_white.png",
    logoBg: "transparent",
    logoFilter: "none",
  },
];

/* Duplicate for seamless marquee */
const TRACK = [...PARTNERS, ...PARTNERS];

/* ── Individual card ── */
function PartnerCard({
  name, abbr, accent, desc, logo, logoBg, logoFilter,
}: (typeof PARTNERS)[0]) {
  const [imgFailed, setImgFailed] = useState(false);
  const showLogo = logo && !imgFailed;

  return (
    <div
      className="group flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl mx-2.5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
        transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
        minWidth: 230,
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = accent + "44";
        el.style.background = `${accent}0A`;
        el.style.boxShadow = `0 0 28px ${accent}18`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.background = "rgba(255,255,255,0.03)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Logo / monogram badge */}
      <div style={{
        width: 46, height: 46, borderRadius: 11, flexShrink: 0,
        background: showLogo
          ? (logoBg ?? `radial-gradient(135deg at 30% 30%, ${accent}30, ${accent}0A)`)
          : `radial-gradient(135deg at 30% 30%, ${accent}30, ${accent}0A)`,
        border: showLogo ? "1px solid rgba(255,255,255,0.12)" : `1px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: showLogo ? "none" : `0 0 14px ${accent}20`,
        overflow: "hidden",
        padding: showLogo ? 6 : 0,
      }}>
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={`${name} logo`}
            onError={() => setImgFailed(true)}
            style={{
              width: "100%", height: "100%",
              objectFit: "contain",
              filter: logoFilter,
              display: "block",
            }}
          />
        ) : (
          <span style={{
            fontFamily: "monospace", fontWeight: 800,
            fontSize: 12, letterSpacing: "0.06em", color: accent,
          }}>
            {abbr}
          </span>
        )}
      </div>

      {/* Name + descriptor */}
      <div style={{ minWidth: 0 }}>
        <p style={{
          fontSize: 13.5, fontWeight: 600, color: "#fff",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          lineHeight: 1.3,
        }}>
          {name}
        </p>
        <p style={{
          fontSize: 11, color: "rgba(255,255,255,0.38)",
          letterSpacing: "0.06em", textTransform: "uppercase",
          marginTop: 2, fontFamily: "monospace",
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function PartnersStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref  = useRef<HTMLDivElement>(null);
  const track2Ref  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* ── Entrance ── */
    gsap.set(".ps-eyebrow",  { autoAlpha: 0, y: 16, filter: "blur(5px)" });
    gsap.set(".ps-headline", { autoAlpha: 0, y: 24, filter: "blur(6px)" });
    gsap.set(".ps-sub",      { autoAlpha: 0, y: 16, filter: "blur(4px)" });
    gsap.set(".ps-divider",  { scaleX: 0, transformOrigin: "center" });

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 88%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { ease: "power3.out" },
    })
      .to(".ps-eyebrow",  { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 })
      .to(".ps-headline", { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.3")
      .to(".ps-sub",      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55 }, "-=0.35")
      .to(".ps-divider",  { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.4");

    /* ── Infinite marquee ── */
    const W1 = track1Ref.current?.scrollWidth ?? 0;
    const W2 = track2Ref.current?.scrollWidth ?? 0;

    gsap.to(track1Ref.current, {
      x: `-=${W1 / 2}`,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (W1 / 2)),
      },
    });

    gsap.to(track2Ref.current, {
      x: `+=${W2 / 2}`,
      duration: 36,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (W2 / 2)),
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="Our partners"
      className="relative overflow-hidden"
      style={{ background: "#04080F", paddingTop: 80, paddingBottom: 88 }}
    >
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 700, height: 700, borderRadius: "50%", top: "-30%", right: "-5%", background: "radial-gradient(circle,rgba(6,182,212,0.1) 0%,transparent 65%)", filter: "blur(80px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width: 500, height: 500, borderRadius: "50%", bottom: "-20%", left: "-5%", background: "radial-gradient(circle,rgba(139,92,246,0.1) 0%,transparent 65%)", filter: "blur(80px)" }} />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-12 text-center">
        <div className="ps-eyebrow flex items-center justify-center gap-3 mb-5">
          <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}>
            Trusted by
          </span>
          <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
        </div>

        <h2 className="ps-headline font-display font-black uppercase"
          style={{ fontSize: "clamp(28px,3.8vw,48px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
          <span style={{ color: "#ffffff" }}>Our{" "}</span>
          <span style={{ color: "#F97316" }}>Partners</span>
        </h2>

        <p className="ps-sub mt-4 mx-auto max-w-lg"
          style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, fontWeight: 300 }}>
          We work alongside industry leaders and innovators — delivering results for brands that demand excellence.
        </p>

        <div className="ps-divider mx-auto mt-8"
          style={{ height: 1, width: 160, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)" }} />
      </div>

      {/* Row 1 — left to right */}
      <div className="relative w-full overflow-hidden mb-4"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}>
        <div ref={track1Ref} className="flex items-stretch py-1" style={{ width: "max-content" }}>
          {TRACK.map((p, i) => <PartnerCard key={i} {...p} />)}
        </div>
      </div>

      {/* Row 2 — right to left, offset */}
      <div className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}>
        <div ref={track2Ref} className="flex items-stretch py-1" style={{ width: "max-content", transform: "translateX(-15%)" }}>
          {TRACK.map((p, i) => <PartnerCard key={i} {...p} />)}
        </div>
      </div>

      {/* Active partnerships badge */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mt-10 flex justify-center">
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 18px", borderRadius: 99,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#10B981",
            boxShadow: "0 0 8px #10B981",
            display: "inline-block",
            animation: "ps-pulse 2s infinite",
          }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "monospace", letterSpacing: "0.08em" }}>
            {PARTNERS.length} active partnerships
          </span>
        </div>
      </div>

      <style>{`
        @keyframes ps-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
