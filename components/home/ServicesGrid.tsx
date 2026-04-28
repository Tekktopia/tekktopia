"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Code2, Server, LayoutGrid, ShieldCheck,
  Cloud, BarChart3, Smartphone, Palette, Cpu, Lightbulb,
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
  iconColor: string;
  iconBg: string;
};

const SERVICES: Service[] = [
  {
    num: "01", icon: Code2, name: "Software Development",
    desc: "Custom-built web apps, APIs, and enterprise software engineered for scale, performance, and maintainability. From zero-to-one MVPs to complex enterprise platforms.",
    tags: ["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL"],
    href: "/services/software-development", iconColor: "text-blue", iconBg: "bg-blue/8 border-blue/15",
  },
  {
    num: "02", icon: Server, name: "IT Support & Helpdesk",
    desc: "24/7 managed IT support, helpdesk, and infrastructure management with guaranteed sub-1hr first-response SLA. Remote monitoring and on-site capability.",
    tags: ["24/7 SLA", "Remote Support", "On-site", "Helpdesk", "Infrastructure"],
    href: "/services/it-support", iconColor: "text-green-600", iconBg: "bg-green-50 border-green-100",
  },
  {
    num: "03", icon: LayoutGrid, name: "M365 License Provisioning",
    desc: "Full Microsoft 365 licensing, deployment, migration, and ongoing management. Teams, SharePoint, Exchange, Intune device management, and Entra ID identity.",
    tags: ["Microsoft 365", "Teams", "SharePoint", "Exchange", "Intune", "Entra ID"],
    href: "/services/m365", iconColor: "text-blue", iconBg: "bg-sky-50 border-sky-100",
  },
  {
    num: "04", icon: ShieldCheck, name: "Cybersecurity",
    desc: "Penetration testing, threat monitoring, vulnerability assessments, and enterprise security architecture. We help you achieve and maintain SOC2, ISO 27001, and Cyber Essentials.",
    tags: ["Pen Testing", "SIEM", "Zero Trust", "SOC2", "ISO 27001", "Compliance"],
    href: "/services/cybersecurity", iconColor: "text-red-500", iconBg: "bg-red-50 border-red-100",
  },
  {
    num: "05", icon: Cloud, name: "Cloud Computing",
    desc: "Cloud migration, infrastructure design, and managed services on AWS, Azure & GCP. Infrastructure-as-Code, Kubernetes, serverless, and cloud cost optimisation.",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Serverless"],
    href: "/services/cloud-computing", iconColor: "text-blue", iconBg: "bg-blue/8 border-blue/15",
  },
  {
    num: "06", icon: BarChart3, name: "Data Analytics",
    desc: "Turn raw data into actionable insights with BI dashboards, ML pipelines, and modern data engineering. Power BI, Python, SQL, and real-time analytics.",
    tags: ["Power BI", "Python", "SQL", "dbt", "Spark", "Machine Learning"],
    href: "/services/data-analytics", iconColor: "text-orange", iconBg: "bg-orange/8 border-orange/12",
  },
  {
    num: "07", icon: Smartphone, name: "Mobile & Web Development",
    desc: "Cross-platform mobile apps and blazing-fast web experiences. React Native, Flutter, Swift, and Kotlin — built for performance and beautiful on every screen.",
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "PWA", "Next.js"],
    href: "/services/mobile-web-development", iconColor: "text-purple-600", iconBg: "bg-purple-50 border-purple-100",
  },
  {
    num: "08", icon: Palette, name: "Product Design",
    desc: "UX research, UI design, prototyping, and design systems that users love. From initial wireframes to pixel-perfect Figma handoffs and developer-ready design tokens.",
    tags: ["Figma", "UX Research", "Design System", "Prototyping", "Accessibility"],
    href: "/services/product-design", iconColor: "text-orange", iconBg: "bg-orange/8 border-orange/12",
  },
  {
    num: "09", icon: Cpu, name: "AI & Emerging Tech",
    desc: "AI/ML integration, LLM-powered products, IoT solutions, blockchain, and AR/VR for forward-thinking businesses. We make emerging technology practical.",
    tags: ["OpenAI", "LangChain", "IoT", "Blockchain", "AR/VR", "MLOps"],
    href: "/services/emerging-tech", iconColor: "text-blue", iconBg: "bg-blue/6 border-blue/12",
  },
  {
    num: "10", icon: Lightbulb, name: "IT Consultancy",
    desc: "Strategic tech advisory and digital transformation roadmaps tailored to your goals. CTO-as-a-Service, vendor selection, tech due diligence, and board-level reporting.",
    tags: ["Strategy", "CTO-as-a-Service", "Digital Transformation", "Tech Audit"],
    href: "/services/consultancy", iconColor: "text-orange", iconBg: "bg-orange/8 border-orange/12",
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = useCallback(
    (i: number) => {
      const el = bodyRefs.current[i];
      if (!el) return;

      if (openIdx === i) {
        gsap.to(el, {
          height: 0, opacity: 0, duration: 0.33, ease: "power2.in",
          onComplete: () => gsap.set(el, { display: "none" }),
        });
        setOpenIdx(null);
      } else {
        if (openIdx !== null) {
          const prev = bodyRefs.current[openIdx];
          if (prev)
            gsap.to(prev, {
              height: 0, opacity: 0, duration: 0.28, ease: "power2.in",
              onComplete: () => gsap.set(prev, { display: "none" }),
            });
        }
        gsap.set(el, { display: "block", height: 0, opacity: 0 });
        gsap.to(el, { height: "auto", opacity: 1, duration: 0.42, ease: "power3.out" });
        setOpenIdx(i);
      }
    },
    [openIdx]
  );

  useGSAP(() => {
    gsap.set(".svc-word",       { yPercent: 112 });
    gsap.set(".svc-eyebrow",    { autoAlpha: 0, y: 14 });
    gsap.set(".svc-count-link", { autoAlpha: 0 });
    gsap.set(".svc-row",        { autoAlpha: 0, y: 18 });

    gsap.timeline({
      scrollTrigger: { trigger: ".svc-header", start: "top 87%", toggleActions: "play none none reverse" },
    })
      .to(".svc-eyebrow",    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .to(".svc-word",       { yPercent: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }, "-=0.28")
      .to(".svc-count-link", { autoAlpha: 1, duration: 0.4 }, "-=0.3");

    gsap.to(".svc-row", {
      autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power3.out",
      scrollTrigger: { trigger: ".svc-list", start: "top 87%", toggleActions: "play none none reverse" },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-28 px-5 sm:px-8 md:px-12 bg-white"
      aria-label="Tekktopia services"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="svc-header flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="svc-eyebrow flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-orange rounded-full" />
              <span className="font-mono text-[10px] text-navy/40 uppercase tracking-[0.28em]">What We Do</span>
            </div>
            <h2 className="font-display font-black tracking-tight text-4xl md:text-5xl lg:text-[3.5rem] text-navy leading-[0.9]">
              {["End-to-End", "Tech Services"].map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((word, wi) => (
                    <span key={wi} className="inline-block overflow-hidden align-bottom pb-1 mr-[0.2em]">
                      <span className="svc-word inline-block">{word}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>
          <div className="svc-count-link flex items-center gap-4">
            <span className="font-mono text-[10px] text-navy/30 uppercase tracking-[0.22em]">10 Services</span>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange border-b-2 border-navy/20 hover:border-orange pb-0.5 transition-all duration-300"
            >
              View all
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        {/* Accordion rows */}
        <div className="svc-list">
          {SERVICES.map((svc, i) => {
            const isOpen = openIdx === i;
            const Icon = svc.icon;
            return (
              <div
                key={svc.num}
                className="svc-row border-t border-border last:border-b cursor-pointer group/row"
                onClick={() => toggle(i)}
                data-cursor-label="OPEN"
              >
                {/* Row header */}
                <div className="flex items-center gap-4 md:gap-5 py-5 md:py-6">
                  {/* Number */}
                  <span
                    className={`font-mono text-[11px] w-7 flex-shrink-0 transition-colors duration-300 ${isOpen ? "text-orange" : "text-navy/25 group-hover/row:text-orange"}`}
                  >
                    {svc.num}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 transition-all duration-300 ${svc.iconBg} ${isOpen ? "scale-110" : "group-hover/row:scale-105"}`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${svc.iconColor}`} strokeWidth={1.75} />
                  </div>

                  {/* Name */}
                  <span
                    className={`flex-1 font-display font-bold text-lg md:text-xl lg:text-2xl tracking-tight transition-colors duration-300 ${isOpen ? "text-orange" : "text-navy group-hover/row:text-orange"}`}
                  >
                    {svc.name}
                  </span>

                  {/* Preview tags — desktop only */}
                  <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
                    {svc.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-navy/35 border border-border px-2 py-0.5 rounded-full uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-orange border-orange text-white rotate-[135deg]"
                        : "border-border text-navy/30 group-hover/row:border-orange/40 group-hover/row:text-orange group-hover/row:bg-orange/5"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Accordion body */}
                <div
                  ref={(el) => { bodyRefs.current[i] = el; }}
                  className="overflow-hidden"
                  style={{ display: "none" }}
                >
                  <div className="pl-[4.5rem] md:pl-[5.25rem] pr-4 md:pr-16 pb-8 pt-1">
                    <p className="text-sm md:text-base text-navy/65 font-light leading-relaxed mb-5 max-w-2xl">
                      {svc.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] text-navy/50 border border-border bg-off-white px-2.5 py-1 rounded-full uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={svc.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-semibold text-sm text-orange hover:text-navy border-b border-orange/40 hover:border-navy/30 pb-px transition-all duration-200"
                    >
                      Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
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
