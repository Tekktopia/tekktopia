"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Code2, Server, ShieldCheck,
  Cloud, BarChart3, Cpu, Smartphone, Palette,
  LayoutGrid, Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  num: string;
  icon: LucideIcon;
  name: string;
  desc: string;
  tags: string[];
  href: string;
  color: string;
  glow: string;
};

const SERVICES: Service[] = [
  {
    num: "01", icon: Code2,      name: "Software Development",
    desc: "Custom web apps, APIs, and enterprise platforms engineered for scale. From zero-to-one MVPs to complex systems.",
    tags: ["React", "Next.js", "Node.js", "Python", "TypeScript"],
    href: "/services/software-development", color: "#3B82F6", glow: "rgba(59,130,246,0.18)",
  },
  {
    num: "02", icon: Cloud,      name: "Cloud Computing",
    desc: "Cloud migration, infrastructure design, and managed services on AWS, Azure & GCP. Kubernetes, Terraform, serverless.",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
    href: "/services/cloud-computing",      color: "#06B6D4", glow: "rgba(6,182,212,0.18)",
  },
  {
    num: "03", icon: ShieldCheck, name: "Cybersecurity",
    desc: "Penetration testing, threat monitoring, and enterprise security architecture. SOC2, ISO 27001 compliance.",
    tags: ["Pen Testing", "SIEM", "Zero Trust", "SOC2", "ISO 27001"],
    href: "/services/cybersecurity",        color: "#EF4444", glow: "rgba(239,68,68,0.18)",
  },
  {
    num: "04", icon: Cpu,         name: "AI & Emerging Tech",
    desc: "AI/ML integration, LLM-powered products, and IoT solutions that make emerging technology practical for your business.",
    tags: ["OpenAI", "LangChain", "IoT", "MLOps", "Blockchain"],
    href: "/services/emerging-tech",        color: "#8B5CF6", glow: "rgba(139,92,246,0.18)",
  },
  {
    num: "05", icon: BarChart3,   name: "Data Analytics",
    desc: "Turn raw data into business intelligence. BI dashboards, ML pipelines, and modern data engineering at scale.",
    tags: ["Power BI", "Python", "SQL", "dbt", "Machine Learning"],
    href: "/services/data-analytics",       color: "#F97316", glow: "rgba(249,115,22,0.18)",
  },
  {
    num: "06", icon: Server,      name: "IT Support & Helpdesk",
    desc: "24/7 managed IT support with guaranteed sub-1hr first-response SLA. Remote monitoring and on-site capability.",
    tags: ["24/7 SLA", "Remote Support", "On-site", "Infrastructure"],
    href: "/services/it-support",           color: "#10B981", glow: "rgba(16,185,129,0.18)",
  },
  {
    num: "07", icon: Smartphone,  name: "Mobile & Web Dev",
    desc: "Cross-platform mobile apps and blazing-fast web experiences built for performance on every screen.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "PWA"],
    href: "/services/mobile-web-development", color: "#EC4899", glow: "rgba(236,72,153,0.18)",
  },
  {
    num: "08", icon: Palette,     name: "Product Design",
    desc: "UX research, UI design, and design systems that users love. Pixel-perfect Figma handoffs and design tokens.",
    tags: ["Figma", "UX Research", "Design System", "Prototyping"],
    href: "/services/product-design",       color: "#FB923C", glow: "rgba(251,146,60,0.18)",
  },
  {
    num: "09", icon: LayoutGrid,  name: "M365 Provisioning",
    desc: "Full Microsoft 365 licensing, migration, and management. Teams, SharePoint, Exchange, Intune, and Entra ID.",
    tags: ["Microsoft 365", "Teams", "SharePoint", "Intune"],
    href: "/services/m365",                 color: "#0EA5E9", glow: "rgba(14,165,233,0.18)",
  },
  {
    num: "10", icon: Lightbulb,   name: "IT Consultancy",
    desc: "Strategic tech advisory and digital transformation roadmaps. CTO-as-a-Service, tech audits, vendor selection.",
    tags: ["Strategy", "CTO-as-a-Service", "Digital Transformation"],
    href: "/services/consultancy",          color: "#FBBF24", glow: "rgba(251,191,36,0.18)",
  },
];

const VISIBLE = 6;

function ServiceCard({ svc, index }: { svc: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = svc.icon;

  return (
    <div
      ref={cardRef}
      className="svc-card group relative flex flex-col p-7 rounded-2xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = svc.color + "55";
        el.style.boxShadow = `0 0 0 1px ${svc.color}22, 0 20px 60px ${svc.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`;
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em",
        color: svc.color, opacity: 0.7, marginBottom: 20, display: "block",
      }}>
        {svc.num}
      </span>

      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: 14, display: "flex",
        alignItems: "center", justifyContent: "center", marginBottom: 20,
        background: svc.glow,
        border: `1px solid ${svc.color}33`,
        boxShadow: `0 0 20px ${svc.glow}`,
        flexShrink: 0,
      }}>
        <Icon style={{ width: 22, height: 22, color: svc.color }} strokeWidth={1.5} />
      </div>

      {/* Name */}
      <h3 className="font-display font-bold mb-3"
        style={{ fontSize: "clamp(17px,1.5vw,20px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
        {svc.name}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
        {svc.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {svc.tags.slice(0, 4).map(tag => (
          <span key={tag} style={{
            fontFamily: "monospace", fontSize: 9, padding: "3px 8px",
            borderRadius: 100, border: `1px solid ${svc.color}28`,
            color: "rgba(255,255,255,0.38)", background: `${svc.color}0d`,
            textTransform: "uppercase", letterSpacing: "0.1em",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        href={svc.href}
        className="group/link inline-flex items-center gap-1.5 font-semibold text-sm w-fit"
        style={{
          color: svc.color, borderBottom: `1px solid ${svc.color}44`,
          paddingBottom: 1, transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = svc.color; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = svc.color + "44"; }}
      >
        Learn more
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:rotate-45" />
      </Link>
    </div>
  );
}

export default function ServicesGrid() {
  const sectionRef  = useRef<HTMLElement>(null);
  const moreRef     = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    if (!moreRef.current) return;
    if (!expanded) {
      gsap.set(moreRef.current, { display: "grid" });
      gsap.fromTo(moreRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );
      setExpanded(true);
    } else {
      gsap.to(moreRef.current, {
        opacity: 0, y: 16, duration: 0.35, ease: "power2.in",
        onComplete: () => { gsap.set(moreRef.current!, { display: "none" }); },
      });
      setExpanded(false);
    }
  };

  useGSAP(() => {
    gsap.set(".svc-eyebrow", { autoAlpha: 0, y: 14 });
    gsap.set(".svc-title",   { autoAlpha: 0, y: 22 });
    gsap.set(".svc-card",    { autoAlpha: 0, y: 28 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 82%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to(".svc-eyebrow", { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .to(".svc-title",   { autoAlpha: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.3")
      .to(".svc-card",    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }, "-=0.3");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Tekktopia services"
      style={{ background: "#04080F", paddingTop: 96, paddingBottom: 96, overflow: "hidden" }}
    >
      {/* Fine grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Aurora blobs */}
      <div aria-hidden className="absolute pointer-events-none" style={{ width:700, height:700, borderRadius:"50%", top:"-15%", right:"-8%", background:"radial-gradient(circle,rgba(37,99,235,0.13) 0%,transparent 68%)", filter:"blur(90px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width:600, height:600, borderRadius:"50%", bottom:"-10%", left:"-5%", background:"radial-gradient(circle,rgba(249,115,22,0.1) 0%,transparent 68%)", filter:"blur(100px)" }} />
      <div aria-hidden className="absolute pointer-events-none" style={{ width:400, height:400, borderRadius:"50%", top:"40%", left:"35%", background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 68%)", filter:"blur(80px)" }} />

      {/* Top accent line */}
      <div aria-hidden style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(to right,transparent,rgba(249,115,22,0.5) 30%,rgba(37,99,235,0.5) 70%,transparent)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="svc-eyebrow flex items-center gap-3 mb-5">
            <span style={{ height:1, width:24, background:"#F97316", display:"block", borderRadius:99 }} />
            <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.28em", color:"rgba(255,255,255,0.3)" }}>
              What We Do
            </span>
          </div>
          <div className="svc-title flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display font-black uppercase"
              style={{ fontSize:"clamp(36px,5.5vw,68px)", color:"#fff", letterSpacing:"-0.03em", lineHeight:0.92 }}>
              End-to-End<br />Tech Services
            </h2>
            <div className="flex items-center gap-4 flex-shrink-0 pb-1">
              <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.2em", color:"rgba(255,255,255,0.25)" }}>
                10 Services
              </span>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 font-semibold text-sm"
                style={{ color:"#F97316", borderBottom:"1px solid rgba(249,115,22,0.35)", paddingBottom:1, transition:"border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#F97316")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.35)")}
              >
                View all
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>

        {/* First 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {SERVICES.slice(0, VISIBLE).map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} />
          ))}
        </div>

        {/* Remaining 4 — hidden by default */}
        <div
          ref={moreRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
          style={{ display: "none" }}
        >
          {SERVICES.slice(VISIBLE).map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} />
          ))}
        </div>

        {/* View More / Less button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={toggle}
            className="group inline-flex items-center gap-3 font-semibold text-sm px-8 py-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              transition: "background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = "rgba(249,115,22,0.08)";
              el.style.borderColor = "rgba(249,115,22,0.35)";
              el.style.color = "#F97316";
              el.style.boxShadow = "0 0 40px rgba(249,115,22,0.12)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "rgba(255,255,255,0.75)";
              el.style.boxShadow = "none";
            }}
          >
            {expanded ? "Show Less" : `View ${SERVICES.length - VISIBLE} More Services`}
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? "rotate(135deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
