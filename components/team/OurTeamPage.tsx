"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ExternalLink, AtSign, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CTABanner } from "@/components/home";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Tekktopia Founder",
    role: "Chief Executive Officer",
    dept: "Leadership",
    accent: "#F97316",
    photo: "https://i.pravatar.cc/400?img=11",
    bio: "Visionary technologist with a passion for building systems that scale. Leads the company's strategic direction and client relationships.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Engineering",
    role: "CTO / Lead Engineer",
    dept: "Engineering",
    accent: "#3B82F6",
    photo: "https://i.pravatar.cc/400?img=52",
    bio: "Full-stack architect with deep expertise in cloud infrastructure, microservices, and modern frontend frameworks.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Cybersecurity",
    role: "Chief Security Officer",
    dept: "Security",
    accent: "#EF4444",
    photo: "https://i.pravatar.cc/400?img=33",
    bio: "Certified ethical hacker and security strategist. Leads all penetration testing, compliance, and 24/7 monitoring operations.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Design",
    role: "Lead UX/UI Designer",
    dept: "Design",
    accent: "#8B5CF6",
    photo: "https://i.pravatar.cc/400?img=47",
    bio: "Product designer who bridges the gap between complex systems and intuitive user experiences across web and mobile.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Cloud",
    role: "Cloud Architect",
    dept: "Infrastructure",
    accent: "#06B6D4",
    photo: "https://i.pravatar.cc/400?img=68",
    bio: "AWS and Azure certified architect specialising in cloud migrations, DevOps pipelines, and cost-optimised infrastructure.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Head of Client Success",
    role: "Client Success Manager",
    dept: "Operations",
    accent: "#10B981",
    photo: "https://i.pravatar.cc/400?img=25",
    bio: "Ensures every client engagement exceeds expectations — from onboarding to ongoing support and strategic account growth.",
    linkedin: "#",
    twitter: "#",
  },
];

export default function OurTeamPage() {
  const pageRef  = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // ── Hero entrance ──
    gsap.set(".otp-eyebrow", { autoAlpha: 0, y: 16 });
    gsap.set(".otp-word",    { yPercent: 110 });
    gsap.set(".otp-sub",     { autoAlpha: 0, y: 20, filter: "blur(4px)" });
    gsap.set(".otp-pill",    { autoAlpha: 0, y: 10 });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".otp-eyebrow", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1)
      .to(".otp-word",    { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.35")
      .to(".otp-sub",     { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 }, "-=0.5")
      .to(".otp-pill",    { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.3");

    // ── Cards scroll-in ──
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, { autoAlpha: 0, y: 48, scale: 0.96, filter: "blur(8px)" });
      gsap.to(card, {
        autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.65, ease: "power3.out",
        delay: (i % 3) * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Hover lift
      const color = card.dataset.color!;
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -6, duration: 0.3, ease: "power2.out" });
        card.style.borderColor = color + "44";
        card.style.boxShadow   = `0 0 40px ${color}18`;
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.55)" });
        card.style.borderColor = "rgba(255,255,255,0.07)";
        card.style.boxShadow   = "none";
      });
    });
  }, { scope: pageRef });

  return (
    <>
      <main ref={pageRef} style={{ background: "#04080F" }}>

        {/* ── Background decoration ── */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{
            position: "absolute", width: 900, height: 700, borderRadius: "50%",
            top: "-5%", left: "50%", transform: "translateX(-50%)",
            background: "radial-gradient(ellipse,rgba(139,92,246,0.10) 0%,transparent 65%)",
            filter: "blur(90px)",
          }} />
          <div style={{
            position: "absolute", width: 600, height: 600, borderRadius: "50%",
            bottom: "10%", right: "-5%",
            background: "radial-gradient(circle,rgba(37,99,235,0.09) 0%,transparent 65%)",
            filter: "blur(80px)",
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }} />
        </div>

        {/* ── Hero ── */}
        <section
          className="relative text-center"
          style={{ paddingTop: 140, paddingBottom: 80 }}
        >
          <div aria-hidden className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)" }} />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

            {/* Eyebrow */}
            <div className="otp-eyebrow flex items-center justify-center gap-3 mb-7">
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)" }}>
                The People
              </span>
              <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black uppercase mx-auto"
              style={{ fontSize: "clamp(40px,6vw,82px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              {[
                { word: "Meet",  orange: false },
                { word: "the",   orange: false },
                { word: "Team.", orange: true  },
              ].map(({ word, orange }, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.15em]">
                  <span className="otp-word inline-block" style={{ color: orange ? "#F97316" : "#ffffff" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p className="otp-sub mt-6 mx-auto max-w-2xl"
              style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(255,255,255,0.55)", fontWeight: 300, lineHeight: 1.85 }}>
              A focused, battle-tested team of engineers, designers, and strategists — each one hand-picked for their craft and their character.
            </p>

            {/* Stat pills */}
            <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
              {[
                { label: "6 Core Members",     color: "#F97316" },
                { label: "3 Continents",        color: "#3B82F6" },
                { label: "50+ Years Combined",  color: "#10B981" },
                { label: "Pan-African Mission", color: "#8B5CF6" },
              ].map(({ label, color }) => (
                <div key={label} className="otp-pill" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "7px 16px", borderRadius: 99,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", letterSpacing: "0.06em" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team grid ── */}
        <section style={{ paddingBottom: 100 }}>
          <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

            <div aria-hidden className="h-px mb-14"
              style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)" }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map(({ name, role, dept, accent, photo, bio, linkedin, twitter }, i) => (
                <div
                  key={name}
                  ref={el => { cardRefs.current[i] = el; }}
                  data-color={accent}
                  className="relative flex flex-col rounded-2xl overflow-hidden cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "border-color 0.35s, box-shadow 0.35s",
                  }}
                >
                  {/* ── Photo ── */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo}
                      alt={name}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    {/* Scrim */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2"
                      style={{ background: "linear-gradient(to top,rgba(4,8,15,0.92),transparent)" }} />
                    {/* Dept badge */}
                    <div className="absolute bottom-4 left-4">
                      <span style={{
                        padding: "3px 11px", borderRadius: 99,
                        background: `${accent}18`, border: `1px solid ${accent}40`,
                        backdropFilter: "blur(8px)",
                        fontSize: 9, fontFamily: "monospace", textTransform: "uppercase",
                        letterSpacing: "0.16em", color: accent,
                      }}>
                        {dept}
                      </span>
                    </div>
                    {/* Top accent */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(to right,${accent},transparent)`,
                    }} />
                  </div>

                  {/* ── Info ── */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="mb-3">
                      <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
                        {name}
                      </p>
                      <p style={{ fontSize: 10, color: accent, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                        {role}
                      </p>
                    </div>
                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.78, fontWeight: 300, flexGrow: 1, marginBottom: 18 }}>
                      {bio}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-2">
                      {[
                        { href: linkedin, label: "LinkedIn",    Icon: ExternalLink },
                        { href: twitter,  label: "Twitter / X", Icon: AtSign       },
                      ].map(({ href, label, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          className="flex items-center justify-center rounded-lg transition-all duration-200"
                          style={{
                            width: 34, height: 34,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.38)",
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = accent;
                            e.currentTarget.style.borderColor = accent + "44";
                            e.currentTarget.style.background = accent + "14";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = "rgba(255,255,255,0.38)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          }}
                        >
                          <Icon style={{ width: 13, height: 13 }} />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(to right,transparent,${accent}55,transparent)`,
                  }} />
                </div>
              ))}
            </div>

            {/* ── Join CTA ── */}
            <div className="mt-16 text-center">
              <div aria-hidden className="h-px mb-12"
                style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.06),transparent)" }} />
              <p style={{
                fontFamily: "monospace", fontSize: 10, textTransform: "uppercase",
                letterSpacing: "0.28em", color: "rgba(255,255,255,0.35)", marginBottom: 16,
              }}>
                — Want to join us?
              </p>
              <p style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
                We&apos;re not hiring right now, but we&apos;d love to hear from talented people.
              </p>
              <Link
                href="/careers"
                className="group inline-flex items-center gap-2 font-semibold text-sm"
                style={{
                  padding: "12px 28px", borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  transition: "border-color 0.25s, color 0.25s, background 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.45)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(249,115,22,0.07)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                View careers page
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </div>

          </div>
        </section>

      </main>
      <CTABanner />
    </>
  );
}
