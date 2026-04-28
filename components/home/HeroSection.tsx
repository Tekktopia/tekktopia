"use client";

import { useRef, useEffect, CSSProperties } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Shield, TrendingUp, Zap, Code2, CheckCircle2 } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const TICKER = [
  "Software Development","Cloud Infrastructure","Cybersecurity","Data Analytics",
  "AI & Emerging Tech","Product Design","IT Consulting","Mobile & Web Dev","IT Support",
];
const STATS = [
  { end:50,  suf:"+",    label:"Projects"  },
  { end:98,  suf:"%",    label:"Retention" },
  { end:8,   suf:" yrs", label:"In Market" },
  { end:24,  suf:"/7",   label:"Support"   },
];
const TERMINAL_LINES = [
  { t:"cmd",     text:"$ git push origin production"  },
  { t:"output",  text:"  Compressing objects: 100%"   },
  { t:"success", text:"✓  Build passed — 0 errors"    },
  { t:"cmd",     text:"$ kubectl rollout status"      },
  { t:"output",  text:"  Waiting for rollout..."      },
  { t:"success", text:"✓  Deployed to production"     },
  { t:"cmd",     text:"$ uptime --sla"                },
  { t:"success", text:"✓  99.9% — all systems go"     },
];
const METRICS = [
  { label:"API Latency",  pct:92, color:"#3B82F6", glow:"rgba(59,130,246,0.5)"  },
  { label:"Uptime",       pct:99, color:"#06B6D4", glow:"rgba(6,182,212,0.5)"   },
  { label:"Security",     pct:98, color:"#8B5CF6", glow:"rgba(139,92,246,0.5)"  },
  { label:"Performance",  pct:94, color:"#10B981", glow:"rgba(16,185,129,0.5)"  },
];
const BADGES = [
  { icon:Shield,     text:"ISO Compliant",  sub:"Security First",  side:"left",  top:"30%" },
  { icon:Zap,        text:"42ms avg",       sub:"API Response",    side:"left",  top:"56%" },
  { icon:TrendingUp, text:"99.9% Uptime",   sub:"SLA Guaranteed",  side:"right", top:"28%" },
  { icon:Code2,      text:"50+ Projects",   sub:"Delivered",       side:"right", top:"54%" },
];

// ─── Smooth magnetic wrapper ──────────────────────────────────────────────────
function Mag({ children }: { children: React.ReactNode }) {
  const r = useRef<HTMLDivElement>(null);
  const m = (e: React.MouseEvent) => {
    const b = r.current!.getBoundingClientRect();
    gsap.to(r.current, {
      x: (e.clientX - b.left - b.width  / 2) * 0.35,
      y: (e.clientY - b.top  - b.height / 2) * 0.35,
      duration: 0.6, ease: "power2.out",
    });
  };
  const l = () => gsap.to(r.current, { x:0, y:0, duration:1.2, ease: "elastic.out(1, 0.35)" });
  return <div ref={r} onMouseMove={m} onMouseLeave={l}>{children}</div>;
}

// ─── Live typewriter terminal ──────────────────────────────────────────────────
function TerminalCard() {
  const cardRef   = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Buttery organic float — three mismatched sine waves
  useEffect(() => {
    gsap.to(cardRef.current, { y:-12, duration:3.8, ease:"sine.inOut", yoyo:true, repeat:-1 });
    gsap.to(cardRef.current, { x:6,   duration:5.2, ease:"sine.inOut", yoyo:true, repeat:-1, delay:0.9 });
    gsap.to(cardRef.current, { rotation:0.7, duration:6.5, ease:"sine.inOut", yoyo:true, repeat:-1, delay:1.6 });
  }, []);

  // Live typing loop
  useEffect(() => {
    let dead = false;
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const colorOf = (t: string) =>
      t === "cmd" ? "#60A5FA" : t === "success" ? "#4ADE80" : "rgba(255,255,255,0.35)";

    const loop = async () => {
      await wait(2600);
      while (!dead) {
        if (!outputRef.current) break;
        outputRef.current.innerHTML = "";
        for (const line of TERMINAL_LINES) {
          if (dead) return;
          const el = document.createElement("div");
          el.style.cssText = `font-family:monospace;font-size:11px;line-height:1.7;min-height:19px;color:${colorOf(line.t)}`;
          outputRef.current.appendChild(el);
          const speed = line.t === "cmd" ? 52 : 20;
          for (let i = 0; i < line.text.length; i++) {
            if (dead) return;
            el.textContent = line.text.slice(0, i + 1);
            outputRef.current.scrollTop = 9999;
            await wait(speed + Math.random() * (line.t === "cmd" ? 32 : 12));
          }
          await wait(line.t === "cmd" ? 340 + Math.random() * 200 : 160 + Math.random() * 100);
        }
        await wait(2800);
      }
    };
    loop();
    return () => { dead = true; };
  }, []);

  return (
    <div ref={cardRef} className="hidden xl:block absolute left-6 2xl:left-12 z-20"
      style={{ top:"50%", transform:"translateY(-50%)", width:270, willChange:"transform" }}>
      <div style={{
        background: "rgba(8,14,28,0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        boxShadow: "0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(37,99,235,0.08)",
        overflow: "hidden",
      }}>
        {/* Mac title bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display:"flex", gap:6 }}>
            {["#FF5F56","#FFBD2E","#27C93F"].map((c,i) => (
              <span key={i} style={{ width:11, height:11, borderRadius:"50%", background:c, display:"block" }} />
            ))}
          </div>
          <span style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.25em", color:"rgba(255,255,255,0.18)" }}>terminal</span>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ position:"relative", display:"flex", width:7, height:7 }}>
              <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#4ADE80", animation:"ping 1.5s ease-in-out infinite", opacity:0.6 }} className="animate-ping" />
              <span style={{ position:"relative", width:7, height:7, borderRadius:"50%", background:"#4ADE80", display:"block" }} />
            </span>
            <span style={{ fontFamily:"monospace", fontSize:9, color:"#4ADE80" }}>live</span>
          </div>
        </div>
        {/* Scrolling output */}
        <div ref={outputRef} style={{ padding:"14px 16px", minHeight:148, maxHeight:148, overflow:"hidden", display:"flex", flexDirection:"column", gap:2 }} />
        {/* Blinking cursor */}
        <div style={{ padding:"0 16px 14px", display:"flex", alignItems:"center", gap:4, color:"#60A5FA", fontFamily:"monospace", fontSize:11 }}>
          <span>$</span>
          <span className="animate-pulse" style={{ width:7, height:14, background:"#60A5FA", borderRadius:2, marginLeft:2, display:"block" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Animated metrics card ─────────────────────────────────────────────────────
function MetricsCard() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLDivElement|null)[]>([]);
  const shimRefs = useRef<(HTMLDivElement|null)[]>([]);
  const numRefs  = useRef<(HTMLSpanElement|null)[]>([]);

  useEffect(() => {
    // Opposite phase float to terminal
    gsap.to(cardRef.current, { y:14,  duration:4.6, ease:"sine.inOut", yoyo:true, repeat:-1 });
    gsap.to(cardRef.current, { x:-7,  duration:3.9, ease:"sine.inOut", yoyo:true, repeat:-1, delay:1.3 });
    gsap.to(cardRef.current, { rotation:-0.8, duration:7, ease:"sine.inOut", yoyo:true, repeat:-1, delay:0.6 });

    METRICS.forEach((m, i) => {
      const fill = fillRefs.current[i];
      const shim = shimRefs.current[i];
      const num  = numRefs.current[i];
      if (!fill || !shim || !num) return;
      const d = 2.6 + i * 0.2;

      // Smooth fill with power3 ease
      gsap.fromTo(fill, { width:"0%", opacity:0.8 },
        { width:`${m.pct}%`, opacity:1, duration:1.6, delay:d, ease:"power3.out" });

      // Repeating shimmer sweep
      gsap.set(shim, { x:"-110%" });
      gsap.to(shim, {
        x: "120%", duration:1.0, delay:d + 0.8, ease:"power2.inOut",
        repeat:-1, repeatDelay:2.8,
        onRepeat() { gsap.set(shim, { x:"-110%" }); },
      });

      // Number count-up in sync
      const obj = { v:0 };
      gsap.to(obj, { v:m.pct, duration:1.6, delay:d, ease:"power3.out",
        onUpdate() { num.textContent = `${Math.round(obj.v)}%`; } });
    });
  }, []);

  return (
    <div ref={cardRef} className="hidden xl:block absolute right-6 2xl:right-12 z-20"
      style={{ top:"50%", transform:"translateY(-50%)", width:250, willChange:"transform" }}>
      <div style={{
        background: "rgba(8,14,28,0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        boxShadow: "0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(6,182,212,0.07)",
        overflow: "hidden",
      }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.2em", color:"rgba(255,255,255,0.28)" }}>System Health</span>
          <span style={{ fontFamily:"monospace", fontSize:9, padding:"3px 9px", borderRadius:100, background:"rgba(74,222,128,0.1)", color:"#4ADE80", border:"1px solid rgba(74,222,128,0.18)" }}>
            All Good
          </span>
        </div>
        <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:18 }}>
          {METRICS.map(({ label, pct, color, glow }, i) => (
            <div key={label}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.42)" }}>{label}</span>
                <span ref={el => { numRefs.current[i]=el; }}
                  style={{ fontFamily:"monospace", fontSize:11, fontWeight:700, color }}>0%</span>
              </div>
              {/* Track */}
              <div style={{ height:5, borderRadius:100, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
                {/* Fill with glow */}
                <div ref={el => { fillRefs.current[i]=el; }}
                  style={{ height:"100%", borderRadius:100, background:color, width:0, boxShadow:`0 0 10px ${glow}`, position:"relative", overflow:"hidden" }}>
                  {/* Shimmer */}
                  <div ref={el => { shimRefs.current[i]=el; }}
                    style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.55) 50%,transparent 100%)", borderRadius:100, transform:"translateX(-110%)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"10px 16px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:6 }}>
          <CheckCircle2 style={{ width:12, height:12, color:"#4ADE80", flexShrink:0 }} strokeWidth={2} />
          <span style={{ fontFamily:"monospace", fontSize:9, color:"rgba(255,255,255,0.26)" }}>Updated just now</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const b4 = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x:0, y:0 });

  // ── Particle canvas ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 36 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r:  Math.random() * 1.4 + 0.4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x:mx, y:my } = mouseRef.current;
      pts.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) { p.vx += dx / d * 0.035; p.vy += dy / d * 0.035; }
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 0.7) { p.vx = p.vx / sp * 0.7; p.vy = p.vy / sp * 0.7; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59,130,246,0.55)";
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / 140) * 0.18})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // ── Blob mouse follow ───────────────────────────────────────────────────────
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      gsap.to(b1.current, { x: nx * 55,  y: ny * 45,  duration: 4,   ease:"power1.out" });
      gsap.to(b2.current, { x:-nx * 45,  y: ny * 55,  duration: 5,   ease:"power1.out" });
      gsap.to(b3.current, { x: nx * 35,  y:-ny * 40,  duration: 4.5, ease:"power1.out" });
      gsap.to(b4.current, { x:-nx * 25,  y:-ny * 30,  duration: 6,   ease:"power1.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // ── Idle blob drift ─────────────────────────────────────────────────────────
  useEffect(() => {
    gsap.to(b1.current, { y:"+=40", x:"+=22", duration:8,   ease:"sine.inOut", yoyo:true, repeat:-1 });
    gsap.to(b2.current, { y:"-=35", x:"-=25", duration:11,  ease:"sine.inOut", yoyo:true, repeat:-1, delay:1.2 });
    gsap.to(b3.current, { y:"+=28", x:"+=15", duration:9.5, ease:"sine.inOut", yoyo:true, repeat:-1, delay:2.1 });
    gsap.to(b4.current, { y:"-=20", x:"-=18", duration:13,  ease:"sine.inOut", yoyo:true, repeat:-1, delay:0.5 });
  }, []);

  // ── Entrance ────────────────────────────────────────────────────────────────
  useGSAP(() => {
    // Rolling stat counters
    sectionRef.current?.querySelectorAll<HTMLElement>(".h-num").forEach(el => {
      const end = Number(el.dataset.end ?? 0), suf = el.dataset.suf ?? "";
      const obj = { v: 0 };
      gsap.to(obj, { v: end, duration: 2.6, delay: 1.9, ease: "power2.out",
        onUpdate() { el.textContent = `${Math.round(obj.v)}${suf}`; } });
    });

    // Circuit path draw-in
    sectionRef.current?.querySelectorAll<SVGPathElement>(".c-path").forEach(path => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, { strokeDashoffset: 0, duration: 2.2, delay: 0.3, ease: "power2.inOut" });
    });

    // ── Smooth blur-in reveals (Claude.ai style) ──────────────────────────
    gsap.set(".h-eye",    { opacity:0, y:-10, filter:"blur(6px)" });
    gsap.set(".h-word",   { yPercent:105, rotation:1.5, filter:"blur(4px)" });
    gsap.set(".h-ww",     { overflow:"hidden" });
    gsap.set(".h-sub",    { opacity:0, y:16, filter:"blur(4px)" });
    gsap.set(".h-btns",   { opacity:0, y:14, filter:"blur(3px)" });
    gsap.set(".h-rule",   { scaleX:0, transformOrigin:"center" });
    gsap.set(".h-stat",   { opacity:0, y:14, filter:"blur(3px)" });
    gsap.set(".h-badge",  { opacity:0, scale:0.88, y:8, filter:"blur(4px)" });
    gsap.set(".h-marq",   { opacity:0 });

    // ── Main timeline — longer, smoother durations ──────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl
      .to(".h-eye",   { opacity:1, y:0, filter:"blur(0px)", duration:0.9 }, 0.3)
      .to(".h-word",  {
        yPercent:0, rotation:0, filter:"blur(0px)",
        duration:1.3, stagger:0.1, ease:"power4.out",
      }, 0.65)
      .to(".h-sub",   { opacity:1, y:0, filter:"blur(0px)", duration:1.0 }, 1.1)
      .to(".h-btns",  { opacity:1, y:0, filter:"blur(0px)", duration:0.8 }, 1.3)
      .to(".h-rule",  { scaleX:1, duration:1.1, ease:"power2.inOut" },      1.45)
      .to(".h-stat",  { opacity:1, y:0, filter:"blur(0px)", stagger:0.08, duration:0.7 }, 1.55)
      .to(".h-badge", { opacity:1, scale:1, y:0, filter:"blur(0px)", stagger:0.12, duration:0.8 }, 1.65)
      .to(".h-marq",  { opacity:1, duration:0.8 },                          1.9);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex flex-col overflow-hidden"
      style={{ background:"#04080F" }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* ── Four aurora blobs ──────────────────────────────────────────────── */}
      <div ref={b1} aria-hidden className="absolute pointer-events-none"
        style={{ width:800, height:800, borderRadius:"50%", top:"-20%", left:"-15%",
          background:"radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 68%)",
          filter:"blur(64px)", willChange:"transform" }} />
      <div ref={b2} aria-hidden className="absolute pointer-events-none"
        style={{ width:700, height:700, borderRadius:"50%", top:"-12%", right:"-14%",
          background:"radial-gradient(circle,rgba(6,182,212,0.2) 0%,transparent 68%)",
          filter:"blur(72px)", willChange:"transform" }} />
      <div ref={b3} aria-hidden className="absolute pointer-events-none"
        style={{ width:600, height:600, borderRadius:"50%", bottom:"0%", left:"25%",
          background:"radial-gradient(circle,rgba(79,70,229,0.18) 0%,transparent 68%)",
          filter:"blur(80px)", willChange:"transform" }} />
      <div ref={b4} aria-hidden className="absolute pointer-events-none"
        style={{ width:500, height:500, borderRadius:"50%", bottom:"15%", right:"10%",
          background:"radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 68%)",
          filter:"blur(90px)", willChange:"transform" }} />

      {/* Fine grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />

      {/* Bottom fade */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-10"
        style={{ background:"linear-gradient(to top,#04080F 25%,transparent)" }} />

      {/* ── Corner circuits ────────────────────────────────────────────────── */}
      <svg className="absolute top-0 left-0 z-10 pointer-events-none" width="250" height="200" fill="none">
        <path className="c-path" d="M0 115 L58 115 L58 62 L115 62 L115 24 L180 24" stroke="rgba(37,99,235,0.5)" strokeWidth="1"/>
        <path className="c-path" d="M0 150 L36 150 L36 95 L82 95" stroke="rgba(6,182,212,0.3)" strokeWidth="0.75"/>
        <circle cx="58" cy="115" r="3" fill="#2563EB" opacity="0.7"/>
        <circle cx="115" cy="62" r="2" fill="#06B6D4" opacity="0.6"/>
        <circle cx="180" cy="24" r="3.5" fill="#2563EB" opacity="0.5"/>
      </svg>
      <svg className="absolute top-0 right-0 z-10 pointer-events-none" width="250" height="200" fill="none" style={{ transform:"scaleX(-1)" }}>
        <path className="c-path" d="M0 115 L58 115 L58 62 L115 62 L115 24 L180 24" stroke="rgba(37,99,235,0.45)" strokeWidth="1"/>
        <path className="c-path" d="M0 150 L36 150 L36 95 L82 95" stroke="rgba(139,92,246,0.3)" strokeWidth="0.75"/>
        <circle cx="58" cy="115" r="3" fill="#2563EB" opacity="0.65"/>
        <circle cx="115" cy="62" r="2" fill="#8B5CF6" opacity="0.55"/>
      </svg>
      <svg className="absolute bottom-14 left-0 z-10 pointer-events-none" width="190" height="120" fill="none" style={{ transform:"scaleY(-1)" }}>
        <path className="c-path" d="M0 72 L46 72 L46 36 L98 36 L98 12 L148 12" stroke="rgba(6,182,212,0.36)" strokeWidth="1"/>
        <circle cx="46" cy="72" r="2" fill="#06B6D4" opacity="0.55"/>
        <circle cx="98" cy="36" r="1.5" fill="#06B6D4" opacity="0.4"/>
      </svg>
      <svg className="absolute bottom-14 right-0 z-10 pointer-events-none" width="190" height="120" fill="none" style={{ transform:"scale(-1,-1)" }}>
        <path className="c-path" d="M0 72 L46 72 L46 36 L98 36 L98 12 L148 12" stroke="rgba(139,92,246,0.36)" strokeWidth="1"/>
        <circle cx="46" cy="72" r="2" fill="#8B5CF6" opacity="0.5"/>
      </svg>

      {/* Side cards */}
      <TerminalCard />
      <MetricsCard />

      {/* Floating badges */}
      {BADGES.map(({ icon:Icon, text, sub, side, top }, i) => (
        <div key={i}
          className={`h-badge hidden lg:flex items-center gap-3 absolute z-20 px-4 py-3 cursor-default ${side==="left"?"left-[18%]":"right-[18%]"}`}
          style={{ top,
            background:"rgba(255,255,255,0.038)",
            backdropFilter:"blur(20px) saturate(160%)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:16,
            boxShadow:"0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.03) inset",
          }}
          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale:1.06, y:-3, duration:0.4, ease:"power2.out" })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale:1,    y:0,  duration:0.8, ease:"elastic.out(1,0.35)" })}>
          <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(37,99,235,0.16)", border:"1px solid rgba(37,99,235,0.26)", flexShrink:0 }}>
            <Icon style={{ width:16, height:16, color:"#60A5FA" }} strokeWidth={1.5} />
          </div>
          <div>
            <p style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.88)", lineHeight:1, marginBottom:4 }}>{text}</p>
            <p style={{ fontSize:10, color:"rgba(255,255,255,0.34)", lineHeight:1 }}>{sub}</p>
          </div>
        </div>
      ))}

      {/* ── CENTER CONTENT ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-[720px] mx-auto w-full px-6 pt-28 pb-16">

        {/* Eyebrow pill */}
        <div className="h-eye inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-12"
          style={{ background:"rgba(37,99,235,0.1)", border:"1px solid rgba(37,99,235,0.28)", backdropFilter:"blur(12px)" }}>
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background:"#60A5FA" }} />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ background:"#60A5FA" }} />
          </span>
          <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.26em", color:"#93C5FD" }}>
            Enterprise Technology Services
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black uppercase mb-9 select-none"
          style={{ fontSize:"clamp(48px,9.8vw,136px)", lineHeight:0.9, letterSpacing:"-0.03em" }}>
          {["Build","Without","Limits."].map((word, i) => (
            <span key={i} className="h-ww inline-block overflow-hidden align-bottom mr-[0.18em]" style={{ lineHeight:1.06 }}>
              <span className="h-word inline-block text-white cursor-default"
                onMouseEnter={e => gsap.to(e.currentTarget, { color:"#60A5FA", duration:0.4, ease:"power2.out" })}
                onMouseLeave={e => gsap.to(e.currentTarget, { color:"#ffffff", duration:0.7, ease:"power2.out" })}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Sub-copy */}
        <p className="h-sub max-w-[440px] leading-relaxed mb-14"
          style={{ fontSize:"clamp(15px,1.7vw,17px)", color:"rgba(255,255,255,0.42)", fontWeight:300, lineHeight:1.75 }}>
          End-to-end technology services for businesses that refuse to stand still.
          Software. Cloud. Security. We build what powers your growth.
        </p>

        {/* CTA buttons */}
        <div className="h-btns flex flex-wrap items-center justify-center gap-4 mb-16">
          <Mag>
            <Link href="/contact"
              className="group inline-flex items-center gap-2.5 font-semibold text-sm px-9 py-4 rounded-2xl text-white cursor-pointer"
              style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)", boxShadow:"0 0 0 1px rgba(59,130,246,0.28), 0 4px 28px rgba(37,99,235,0.32)", transition:"box-shadow 0.4s ease, transform 0.4s ease" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 80px rgba(37,99,235,0.65),0 0 0 1px rgba(59,130,246,0.5)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 0 1px rgba(59,130,246,0.28),0 4px 28px rgba(37,99,235,0.32)"; e.currentTarget.style.transform="none"; }}>
              Start a Project
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </Mag>
          <Mag>
            <Link href="/services"
              className="group inline-flex items-center gap-2 font-medium text-sm px-9 py-4 rounded-2xl cursor-pointer"
              style={{ color:"rgba(255,255,255,0.55)", border:"1px solid rgba(255,255,255,0.09)", background:"rgba(255,255,255,0.03)", backdropFilter:"blur(12px)", transition:"all 0.4s ease" }}
              onMouseEnter={e => { e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"; e.currentTarget.style.background="rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}>
              Explore Services
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:rotate-45" />
            </Link>
          </Mag>
        </div>

        {/* Divider */}
        <div className="h-rule w-full max-w-md h-px mb-12"
          style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.09),transparent)" }} />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 w-full max-w-lg">
          {STATS.map(({ end, suf, label }) => (
            <div key={label} className="h-stat flex flex-col items-center gap-2 cursor-default group"
              onMouseEnter={e => gsap.to(e.currentTarget, { y:-5, duration:0.4, ease:"power2.out" })}
              onMouseLeave={e => gsap.to(e.currentTarget, { y:0,  duration:0.8, ease:"elastic.out(1,0.35)" })}>
              <span className="h-num font-display font-bold text-white"
                style={{ fontSize:"clamp(26px,3.5vw,38px)", transition:"color 0.4s ease" }}
                data-end={end} data-suf={suf}
                onMouseEnter={e => (e.currentTarget.style.color = "#60A5FA")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}>
                0{suf}
              </span>
              <span style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.22em", color:"rgba(255,255,255,0.28)", textAlign:"center" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee ────────────────────────────────────────────────────────── */}
      <div className="h-marq relative z-20 overflow-hidden flex-shrink-0"
        style={{ borderTop:"1px solid rgba(255,255,255,0.06)", background:"rgba(4,8,15,0.65)", backdropFilter:"blur(12px)" }}>
        <div className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background:"linear-gradient(to right,#04080F,transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background:"linear-gradient(to left,#04080F,transparent)" }} />
        <div className="flex whitespace-nowrap w-max py-4" style={{ animation:"marquee 38s linear infinite" }}>
          {[...TICKER,...TICKER].map((item, i) => (
            <span key={i}
              className="inline-flex items-center gap-3 px-8"
              style={{ fontFamily:"monospace", fontSize:11, textTransform:"uppercase", letterSpacing:"0.2em", color:"rgba(255,255,255,0.5)" }}>
              <span className="rounded-full flex-shrink-0"
                style={{ width:6, height:6, background:i%3===0?"#3B82F6":"rgba(255,255,255,0.16)", display:"block" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}