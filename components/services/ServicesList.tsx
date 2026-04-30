"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Code2, Server, ShieldCheck, Cloud,
  BarChart3, Cpu, Smartphone, Palette, LayoutGrid, Lightbulb,
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
};

const SERVICES: Service[] = [
  {
    num: "01", icon: Code2,
    name: "Software Development",
    desc: "End-to-end engineering for web apps, APIs, and enterprise platforms — from zero-to-one MVPs to complex distributed systems.",
    tags: ["React", "Next.js", "Node.js", "Python", "TypeScript"],
    href: "/services/software-development",
  },
  {
    num: "02", icon: Cloud,
    name: "Cloud Computing",
    desc: "Architecture, migration, and managed operations on AWS, Azure & GCP. Built for resilience, security, and cost efficiency.",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes"],
    href: "/services/cloud-computing",
  },
  {
    num: "03", icon: ShieldCheck,
    name: "Cybersecurity",
    desc: "Penetration testing, continuous threat monitoring, and security architecture. SOC2 and ISO 27001 compliance support.",
    tags: ["Pen Testing", "SIEM", "Zero Trust", "SOC2"],
    href: "/services/cybersecurity",
  },
  {
    num: "04", icon: Cpu,
    name: "AI & Emerging Tech",
    desc: "LLM-powered products, ML pipelines, and IoT integrations that solve real business problems — not just demo well.",
    tags: ["OpenAI", "LangChain", "MLOps", "Computer Vision"],
    href: "/services/emerging-tech",
  },
  {
    num: "05", icon: BarChart3,
    name: "Data Analytics",
    desc: "Modern data engineering and BI dashboards that give your team clarity to act. From raw ingestion to polished insight.",
    tags: ["Power BI", "Python", "SQL", "dbt", "Snowflake"],
    href: "/services/data-analytics",
  },
  {
    num: "06", icon: Server,
    name: "IT Support & Helpdesk",
    desc: "24/7 managed IT support with guaranteed sub-1hr first response. Remote monitoring plus on-site capability.",
    tags: ["24/7 SLA", "Remote Support", "RMM", "ITSM"],
    href: "/services/it-support",
  },
  {
    num: "07", icon: Smartphone,
    name: "Mobile & Web Dev",
    desc: "Cross-platform mobile apps and high-performance web experiences built for speed, quality, and longevity.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "PWA"],
    href: "/services/mobile-web-development",
  },
  {
    num: "08", icon: Palette,
    name: "Product Design",
    desc: "UX research, interface design, and design systems grounded in real user behaviour — not guesswork.",
    tags: ["Figma", "UX Research", "Design Systems", "Accessibility"],
    href: "/services/product-design",
  },
  {
    num: "09", icon: LayoutGrid,
    name: "M365 Provisioning",
    desc: "Full Microsoft 365 licensing, migration, and administration — Teams, SharePoint, Intune, and Entra ID.",
    tags: ["Microsoft 365", "Teams", "SharePoint", "Intune"],
    href: "/services/m365",
  },
  {
    num: "10", icon: Lightbulb,
    name: "IT Consultancy",
    desc: "CTO-as-a-Service, tech audits, and digital transformation roadmaps that hold up now and in three years.",
    tags: ["CTO-as-a-Service", "Tech Audit", "Digital Transformation"],
    href: "/services/consultancy",
  },
];

export default function ServicesList() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".sl-card").forEach((card, i) => {
      gsap.set(card, { autoAlpha: 0, y: 36, filter: "blur(6px)" });
      gsap.to(card, {
        autoAlpha: 1, y: 0, filter: "blur(0px)",
        duration: 0.6, ease: "power3.out",
        delay: (i % 3) * 0.07,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      aria-label="All services"
      className="relative"
      style={{ background: "#04080F", paddingBottom: 96 }}
    >
      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Subtle glows */}
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 600, height: 600, borderRadius: "50%", top: "20%", right: "-8%", background: "radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 65%)", filter: "blur(90px)" }} />
      <div aria-hidden className="pointer-events-none absolute"
        style={{ width: 500, height: 500, borderRadius: "50%", bottom: "10%", left: "-5%", background: "radial-gradient(circle,rgba(249,115,22,0.05) 0%,transparent 65%)", filter: "blur(80px)" }} />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link
                key={svc.num}
                href={svc.href}
                className="sl-card group relative flex flex-col p-7 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.16)";
                  el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Hover top shimmer */}
                <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(to right,transparent,rgba(255,255,255,0.22),transparent)" }} />

                {/* Number — ghost top right */}
                <div className="flex items-start justify-between mb-8">
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                    className="group-hover:!bg-white/[0.08] group-hover:!border-white/[0.18]"
                  >
                    <Icon style={{ width: 19, height: 19, color: "rgba(255,255,255,0.7)" }} strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(255,255,255,0.14)", letterSpacing: "0.08em" }}>
                    {svc.num}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display font-bold mb-3"
                  style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                  {svc.name}
                </h3>

                {/* Desc */}
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.78, fontWeight: 300, flex: 1, marginBottom: 24 }}>
                  {svc.desc}
                </p>

                {/* Tags + arrow */}
                <div className="flex items-end justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.slice(0, 3).map(tag => (
                      <span key={tag} style={{
                        fontFamily: "monospace", fontSize: 9, padding: "3px 8px",
                        borderRadius: 99,
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.3)",
                        textTransform: "uppercase", letterSpacing: "0.1em",
                        background: "rgba(255,255,255,0.03)",
                        whiteSpace: "nowrap",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow button */}
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s, border-color 0.3s",
                  }}
                    className="group-hover:!bg-white/[0.1] group-hover:!border-white/[0.22]"
                  >
                    <ArrowUpRight
                      style={{ width: 14, height: 14, color: "rgba(255,255,255,0.4)" }}
                      className="transition-all duration-300 group-hover:rotate-45 group-hover:!text-white"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
