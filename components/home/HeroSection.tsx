"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Shield, TrendingUp, Zap, Code2, FolderOpen, Users, CalendarDays, Headphones } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const TICKER = [
  "Software Development","Cloud Infrastructure","Cybersecurity","Data Analytics",
  "AI & Emerging Tech","Product Design","IT Consulting","Mobile & Web Dev","IT Support",
];
const STATS = [
  { end:50,  suf:"+",    label:"Projects Delivered", icon:FolderOpen  },
  { end:98,  suf:"%",    label:"Client Retention",   icon:Users       },
  { end:8,   suf:"+",    label:"Years in Market",    icon:CalendarDays },
  { end:24,  suf:"/7",   label:"Expert Support",     icon:Headphones  },
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
const PACKET_PROTOS = [
  { name:"HTTPS", color:"#3B82F6", bg:"rgba(59,130,246,0.14)"  },
  { name:"HTTPS", color:"#3B82F6", bg:"rgba(59,130,246,0.14)"  },
  { name:"TCP",   color:"#06B6D4", bg:"rgba(6,182,212,0.14)"   },
  { name:"TCP",   color:"#06B6D4", bg:"rgba(6,182,212,0.14)"   },
  { name:"UDP",   color:"#8B5CF6", bg:"rgba(139,92,246,0.14)"  },
  { name:"DNS",   color:"#10B981", bg:"rgba(16,185,129,0.14)"  },
  { name:"SSH",   color:"#F59E0B", bg:"rgba(245,158,11,0.14)"  },
  { name:"BLOCK", color:"#EF4444", bg:"rgba(239,68,68,0.14)"   },
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

// ─── Live packet sniffer card ──────────────────────────────────────────────────
function PacketSnifferCard() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const rowsRef  = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<number>(0);

  useEffect(() => {
    gsap.to(cardRef.current, { y:14,  duration:4.6, ease:"sine.inOut", yoyo:true, repeat:-1 });
    gsap.to(cardRef.current, { x:-7,  duration:3.9, ease:"sine.inOut", yoyo:true, repeat:-1, delay:1.3 });
    gsap.to(cardRef.current, { rotation:-0.8, duration:7, ease:"sine.inOut", yoyo:true, repeat:-1, delay:0.6 });
  }, []);

  useEffect(() => {
    let dead = false;
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const randOctet = (max = 255, min = 1) => Math.floor(Math.random() * (max - min + 1) + min);
    const randIP  = () => `${randOctet(220,10)}.${randOctet()}.${randOctet()}.${randOctet()}`;
    const randPort = () => String(Math.floor(Math.random() * 58000 + 1024));
    const randSize = () => {
      const n = Math.floor(Math.random() * 8800 + 64);
      return n >= 1024 ? `${(n / 1024).toFixed(1)}K` : `${n}B`;
    };

    const loop = async () => {
      await wait(1200);
      while (!dead) {
        if (!rowsRef.current) break;
        const proto = PACKET_PROTOS[Math.floor(Math.random() * PACKET_PROTOS.length)];
        totalRef.current += 1;
        if (countRef.current) countRef.current.textContent = String(totalRef.current);

        const row = document.createElement("div");
        row.style.cssText = "display:flex;align-items:center;gap:5px;padding:4.5px 0;border-bottom:1px solid rgba(255,255,255,0.035);opacity:0;transition:opacity 0.18s ease;flex-shrink:0";

        const badge = document.createElement("span");
        badge.style.cssText = `font-family:monospace;font-size:8.5px;font-weight:700;padding:2px 5px;border-radius:4px;color:${proto.color};background:${proto.bg};border:1px solid ${proto.color}22;flex-shrink:0;width:36px;text-align:center;letter-spacing:0.04em`;
        badge.textContent = proto.name;

        const src = document.createElement("span");
        src.style.cssText = "font-family:monospace;font-size:8.5px;color:rgba(255,255,255,0.42);flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;min-width:0";
        src.textContent = `${randIP()}:${randPort()}`;

        const arrow = document.createElement("span");
        arrow.style.cssText = "font-family:monospace;font-size:9px;color:rgba(255,255,255,0.18);flex-shrink:0";
        arrow.textContent = "›";

        const dst = document.createElement("span");
        dst.style.cssText = "font-family:monospace;font-size:8px;color:rgba(255,255,255,0.28);flex-shrink:0;max-width:60px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis";
        dst.textContent = randIP();

        const size = document.createElement("span");
        size.style.cssText = `font-family:monospace;font-size:8px;color:${proto.color};opacity:0.7;flex-shrink:0;min-width:28px;text-align:right`;
        size.textContent = randSize();

        row.appendChild(badge);
        row.appendChild(src);
        row.appendChild(arrow);
        row.appendChild(dst);
        row.appendChild(size);
        rowsRef.current.appendChild(row);

        requestAnimationFrame(() => { (row as HTMLDivElement).style.opacity = "1"; });

        while (rowsRef.current.children.length > 11) {
          rowsRef.current.removeChild(rowsRef.current.firstChild!);
        }

        await wait(320 + Math.random() * 380);
      }
    };
    loop();
    return () => { dead = true; };
  }, []);

  return (
    <div ref={cardRef} className="hidden xl:block absolute right-6 2xl:right-12 z-20"
      style={{ top:"50%", transform:"translateY(-50%)", width:268, willChange:"transform" }}>
      <div style={{
        background: "rgba(8,14,28,0.82)",
        backdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        boxShadow: "0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.07)",
        overflow: "hidden",
      }}>
        {/* Title bar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.2em", color:"rgba(255,255,255,0.28)" }}>Packet Feed</span>
            <span style={{ fontFamily:"monospace", fontSize:9, padding:"2px 7px", borderRadius:100, background:"rgba(59,130,246,0.1)", color:"#3B82F6", border:"1px solid rgba(59,130,246,0.2)" }}>
              eth0
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ position:"relative", display:"flex", width:7, height:7 }}>
              <span className="animate-ping" style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#3B82F6", opacity:0.6 }} />
              <span style={{ position:"relative", width:7, height:7, borderRadius:"50%", background:"#3B82F6", display:"block" }} />
            </span>
            <span style={{ fontFamily:"monospace", fontSize:9, color:"#3B82F6" }}>live</span>
          </div>
        </div>

        {/* Column headers */}
        <div style={{ display:"flex", gap:5, padding:"5px 16px 4px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
          {["PROTO","SRC","","DST","SIZE"].map((h, i) => (
            <span key={i} style={{
              fontFamily:"monospace", fontSize:7.5, textTransform:"uppercase",
              letterSpacing:"0.12em", color:"rgba(255,255,255,0.16)",
              flex: i === 1 ? 1 : i === 3 ? "0 0 60px" : "none",
              width: i === 0 ? 36 : i === 2 ? 9 : i === 4 ? 28 : undefined,
              textAlign: i === 4 ? "right" : "left",
              flexShrink: 0,
            }}>{h}</span>
          ))}
        </div>

        {/* Live rows */}
        <div ref={rowsRef} style={{ padding:"4px 16px 6px", minHeight:170, maxHeight:170, overflow:"hidden", display:"flex", flexDirection:"column" }} />

        {/* Footer */}
        <div style={{ padding:"8px 16px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"monospace", fontSize:8.5, color:"rgba(255,255,255,0.18)" }}>
            captured: <span ref={countRef} style={{ color:"rgba(255,255,255,0.38)" }}>0</span>
          </span>
          <span style={{ fontFamily:"monospace", fontSize:8.5, color:"#10B981" }}>● capturing</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const b4 = useRef<HTMLDivElement>(null);
  const mouseRef    = useRef({ x:0, y:0 });
  const badgeRefs   = useRef<(HTMLDivElement|null)[]>([]);
  const wordGlitchMap = useRef<Map<HTMLElement, gsap.core.Timeline>>(new Map());

  const handleWordEnter = (e: React.MouseEvent<HTMLSpanElement>, color = "#60A5FA") => {
    const el = e.currentTarget;
    gsap.killTweensOf(el);
    wordGlitchMap.current.get(el)?.kill();

    el.style.fontStyle = "italic";
    gsap.to(el, { color, duration: 0.35, ease: "power2.out" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0 + Math.random() * 1.8 });
    tl.to(el, { x: -5, skewX: -6, filter: "brightness(1.7) contrast(1.3)", textShadow: "5px 0 rgba(255,40,40,0.9), -5px 0 rgba(0,220,255,0.9)", opacity: 0.75, duration: 0.04, ease: "none" })
      .to(el, { x: 6,  skewX: 4,  filter: "brightness(0.6) contrast(1.8)", textShadow: "-4px 0 rgba(255,40,40,0.95), 4px 0 rgba(0,220,255,0.95)", opacity: 1, duration: 0.04, ease: "none" })
      .to(el, { x: -3, skewX: -2, filter: "brightness(1.3)", textShadow: "2px 0 rgba(255,40,40,0.55), -2px 0 rgba(0,220,255,0.55)", opacity: 0.88, duration: 0.05, ease: "none" })
      .to(el, { x: 0,  skewX: 0,  filter: "brightness(1) contrast(1)", textShadow: "0px 0px 0px rgba(0,0,0,0)", opacity: 1, duration: 0.2, ease: "power2.out" });

    wordGlitchMap.current.set(el, tl);
  };

  const handleWordLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    wordGlitchMap.current.get(el)?.kill();
    wordGlitchMap.current.delete(el);
    gsap.killTweensOf(el);

    el.style.fontStyle = "normal";
    gsap.to(el, {
      color: "#ffffff",
      x: 0, skewX: 0, opacity: 1,
      filter: "brightness(1) contrast(1)",
      textShadow: "0px 0px 0px rgba(0,0,0,0)",
      duration: 0.6, ease: "power2.out",
    });
  };

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

  // ── Badge random float (starts after entrance animation) ────────────────────
  useEffect(() => {
    const configs = [
      { y: 14, x:  7, rot:  1.2, dy: 3.8, dx: 5.1, dr: 6.4, delay: 0.0 },
      { y: 11, x: -9, rot: -0.9, dy: 4.6, dx: 3.7, dr: 7.2, delay: 0.4 },
      { y: 16, x:  6, rot:  1.5, dy: 3.2, dx: 6.3, dr: 5.8, delay: 0.2 },
      { y: 10, x: -7, rot: -1.1, dy: 5.4, dx: 4.2, dr: 8.1, delay: 0.6 },
    ];
    configs.forEach(({ y, x, rot, dy, dx, dr, delay }, i) => {
      const el = badgeRefs.current[i];
      if (!el) return;
      const d = 2.6 + delay;
      gsap.to(el, { y: `+=${y}`,  duration: dy, ease:"sine.inOut", yoyo:true, repeat:-1, delay: d });
      gsap.to(el, { x: `+=${x}`,  duration: dx, ease:"sine.inOut", yoyo:true, repeat:-1, delay: d + 0.5 });
      gsap.to(el, { rotation: rot, duration: dr, ease:"sine.inOut", yoyo:true, repeat:-1, delay: d + 1.0 });
    });
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
      <PacketSnifferCard />

      {/* Floating badges */}
      {BADGES.map(({ icon:Icon, text, sub, side, top }, i) => (
        <div key={i}
          ref={el => { badgeRefs.current[i] = el; }}
          className={`h-badge hidden lg:flex items-center gap-3 absolute z-20 px-4 py-3 cursor-default ${side==="left"?"left-[18%]":"right-[18%]"}`}
          style={{ top,
            background:"rgba(255,255,255,0.038)",
            backdropFilter:"blur(20px) saturate(160%)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:16,
            boxShadow:"0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.03) inset",
            willChange:"transform",
          }}
          onMouseEnter={(e) => gsap.to(e.currentTarget, { scale:1.06, y:-3, duration:0.4, ease:"power2.out" })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { scale:1,    y:0,  duration:0.8, ease:"elastic.out(1,0.35)" })}>
          <div style={{ width:34, height:34, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(249,115,22,0.14)", border:"1px solid rgba(249,115,22,0.28)", flexShrink:0 }}>
            <Icon style={{ width:16, height:16, color:"#F97316" }} strokeWidth={1.5} />
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
          {[
            { text: "Build",   hoverColor: "#60A5FA" },
            { text: "Without", hoverColor: "#F97316" },
            { text: "Limits.", hoverColor: "#60A5FA" },
          ].map(({ text, hoverColor }, i) => (
            <span key={i} className="h-ww inline-block overflow-hidden align-bottom mr-[0.18em]" style={{ lineHeight:1.06 }}>
              <span className="h-word inline-block text-white cursor-default"
                onMouseEnter={(e) => handleWordEnter(e, hoverColor)}
                onMouseLeave={handleWordLeave}>
                {text}
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
              style={{ color:"#fff", background:"#F97316", boxShadow:"0 0 0 1px rgba(249,115,22,0.4), 0 4px 28px rgba(249,115,22,0.32)", transition:"box-shadow 0.4s ease, transform 0.4s ease" }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 80px rgba(249,115,22,0.65), 0 0 0 1px rgba(249,115,22,0.6)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 0 1px rgba(249,115,22,0.4), 0 4px 28px rgba(249,115,22,0.32)"; e.currentTarget.style.transform="none"; }}>
              Explore Services
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:rotate-45" />
            </Link>
          </Mag>
        </div>

        {/* Stats bar */}
        <div className="h-stat w-full max-w-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            backdropFilter: "blur(20px)",
            overflow: "hidden",
          }}>
          {/* Orange top accent line */}
          <div style={{ height: 2, background: "linear-gradient(to right, transparent, #F97316, transparent)" }} />
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {STATS.map(({ end, suf, label, icon: Icon }, i) => (
              <div key={label}
                className="group flex flex-col items-center gap-3 px-6 py-7 cursor-default relative"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(249,115,22,0.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                {/* Icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)",
                }}>
                  <Icon style={{ width: 16, height: 16, color: "#F97316" }} strokeWidth={1.5} />
                </div>
                {/* Number */}
                <span className="h-num font-display font-bold"
                  style={{ fontSize: "clamp(28px,3vw,40px)", color: "#ffffff", lineHeight: 1, transition: "color 0.3s ease" }}
                  data-end={end} data-suf={suf}>
                  0{suf}
                </span>
                {/* Label */}
                <span style={{
                  fontFamily: "monospace", fontSize: 9, textTransform: "uppercase",
                  letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.4,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
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
                style={{ width:6, height:6, background:"#F97316", display:"block" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}