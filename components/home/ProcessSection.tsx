"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: "01", title: "Discovery & Strategy",    body: "We start by understanding your business, goals, and technical landscape. A dedicated strategist maps out the full scope before a single line of code is written.", tags: ["Workshop", "Audit", "Roadmap"] },
  { num: "02", title: "Design & Architecture",   body: "Our designers and architects blueprint the solution — UX flows, system design, and tech stack decisions that prioritise scalability and performance.", tags: ["UX Design", "System Design", "Tech Stack"] },
  { num: "03", title: "Agile Development",       body: "We build in two-week sprints with continuous demos. You're always in the loop — no black boxes, no surprises. Just iterative, testable progress.", tags: ["Sprints", "CI/CD", "Code Review"] },
  { num: "04", title: "Testing & Security",      body: "Rigorous QA, automated testing, and penetration testing ensure your product is rock-solid and secure before it ever goes live.", tags: ["QA", "Pen Testing", "Performance"] },
  { num: "05", title: "Launch & Ongoing Support", body: "Seamless deployment, monitoring setup, and 24/7 managed support. Your success doesn't end at launch — it begins there.", tags: ["Deployment", "Monitoring", "24/7 Support"] },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const words = document.querySelectorAll<HTMLElement>(".proc-word");
    gsap.set(".proc-eyebrow-line", { scaleX: 0, transformOrigin: "left" });
    gsap.set(".proc-eyebrow",      { opacity: 0, y: 12 });
    gsap.set(words,                { y: "110%" });

    gsap.timeline({ scrollTrigger: { trigger: ".proc-header", start: "top 86%", toggleActions: "play reverse play reverse" }, defaults: { ease: "power3.out" } })
      .to(".proc-eyebrow-line", { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
      .to(".proc-eyebrow",      { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .to(words,                { y: 0, duration: 0.8, stagger: 0.08 }, "-=0.2");

    gsap.utils.toArray<HTMLElement>(".proc-step").forEach((step) => {
      const numEl   = step.querySelector<HTMLElement>(".proc-num");
      const lineEl  = step.querySelector<HTMLElement>(".proc-line");
      const titleEl = step.querySelector<HTMLElement>(".proc-title");
      const bodyEl  = step.querySelector<HTMLElement>(".proc-body");
      const tagsEl  = step.querySelector<HTMLElement>(".proc-tags");

      const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: "top 84%", toggleActions: "play reverse play reverse" } });
      if (numEl)   tl.fromTo(numEl,   { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" });
      if (lineEl)  tl.fromTo(lineEl,  { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.3");
      if (titleEl) tl.fromTo(titleEl, { opacity: 0, x: 20 },  { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, "-=0.4");
      if (bodyEl)  tl.fromTo(bodyEl,  { opacity: 0, y: 12 },  { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.3");
      if (tagsEl)  tl.fromTo(tagsEl,  { opacity: 0, y: 8 },   { opacity: 1, y: 0, duration: 0.45 }, "-=0.2");
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="process" className="py-20 md:py-28 px-6 md:px-12 bg-off-white border-y border-border" aria-label="How we work">
      <div className="max-w-7xl mx-auto">

        <div className="proc-header mb-16 max-w-2xl">
          <span className="proc-eyebrow text-xs font-mono font-semibold text-orange uppercase tracking-[0.22em] mb-6 flex items-center gap-3">
            <span className="proc-eyebrow-line w-6 h-[2px] bg-orange block rounded-full" />
            Our Process
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-navy tracking-tight leading-[1.0]">
            {["How we turn", "ideas into", "shipped products."].map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom pb-1">
                    <span className="proc-word inline-block">{word}&nbsp;</span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {STEPS.map((step, index) => (
            <div key={step.num} className="proc-step group grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-6 md:gap-10">
              <div className="flex flex-col items-center">
                <div className="proc-num w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-border flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-orange/40 group-hover:shadow-[0_4px_16px_rgba(249,115,22,0.12)] transition-all duration-300">
                  <span className="font-mono font-bold text-xs text-navy/40 group-hover:text-orange transition-colors">{step.num}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="proc-line flex-1 w-[2px] bg-gradient-to-b from-border to-transparent my-3 rounded-full" />
                )}
              </div>
              <div className={`pb-12 ${index < STEPS.length - 1 ? "border-b border-border/60" : ""}`}>
                <h3 className="proc-title font-display font-bold text-xl md:text-2xl text-navy mb-3 group-hover:text-blue transition-colors">{step.title}</h3>
                <p className="proc-body text-base font-light text-navy/65 leading-relaxed mb-4 max-w-2xl">{step.body}</p>
                <div className="proc-tags flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-navy/50 border border-border bg-white px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
