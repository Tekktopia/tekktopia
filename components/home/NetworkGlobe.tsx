"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── Rough land-mass mask ─────────────────────────────────────────────────────
function isLand(lat: number, lng: number): boolean {
  if (lat >= 25  && lat <= 72  && lng >= -125 && lng <= -60)  return true; // N. America
  if (lat >= 7   && lat <= 26  && lng >= -92  && lng <= -77)  return true; // C. America
  if (lat >= 60  && lat <= 83  && lng >= -55  && lng <= -18)  return true; // Greenland
  if (lat >= -55 && lat <= 13  && lng >= -81  && lng <= -34)  return true; // S. America
  if (lat >= 50  && lat <= 59  && lng >= -10  && lng <= 2)    return true; // UK/Ireland
  if (lat >= 36  && lat <= 60  && lng >= -9   && lng <= 25)   return true; // W. Europe
  if (lat >= 55  && lat <= 71  && lng >= 5    && lng <= 32)   return true; // Scandinavia
  if (lat >= 45  && lat <= 68  && lng >= 25   && lng <= 60)   return true; // E. Europe / W. Russia
  if (lat >= 50  && lat <= 72  && lng >= 60   && lng <= 140)  return true; // Russia
  if (lat >= 50  && lat <= 68  && lng >= 130  && lng <= 165)  return true; // Far East Russia
  if (lat >= -35 && lat <= 37  && lng >= -18  && lng <= 52)   return true; // Africa
  if (lat >= 12  && lat <= 30  && lng >= 36   && lng <= 60)   return true; // Arabian Peninsula
  if (lat >= 29  && lat <= 42  && lng >= 26   && lng <= 48)   return true; // Middle East
  if (lat >= 8   && lat <= 38  && lng >= 61   && lng <= 95)   return true; // South Asia
  if (lat >= 5   && lat <= 28  && lng >= 95   && lng <= 110)  return true; // SE Asia mainland
  if (lat >= -8  && lat <= 18  && lng >= 95   && lng <= 128)  return true; // SE Asia islands
  if (lat >= 18  && lat <= 55  && lng >= 100  && lng <= 135)  return true; // China/Korea
  if (lat >= 30  && lat <= 46  && lng >= 129  && lng <= 146)  return true; // Japan
  if (lat >= -40 && lat <= -10 && lng >= 113  && lng <= 154)  return true; // Australia
  if (lat >= -46 && lat <= -34 && lng >= 166  && lng <= 179)  return true; // New Zealand
  return false;
}

const LAND_DOTS: [number, number][] = [];
for (let lat = -80; lat <= 80; lat += 4) {
  for (let lng = -180; lng < 180; lng += 4) {
    if (isLand(lat, lng)) LAND_DOTS.push([lat, lng]);
  }
}

// ─── Network nodes ────────────────────────────────────────────────────────────
const NODES = [
  { label: "Tekktopia HQ",   sub: "Lagos, Nigeria",    lat:  6.52, lng:   3.38, home: true,  color: "#F97316" },
  { label: "FinTech Studio", sub: "London, UK",        lat: 51.51, lng:  -0.13, home: false, color: "#3B82F6" },
  { label: "Enterprise Hub", sub: "New York, USA",     lat: 40.71, lng: -74.01, home: false, color: "#06B6D4" },
  { label: "Regional Hub",   sub: "Dubai, UAE",        lat: 25.20, lng:  55.27, home: false, color: "#8B5CF6" },
  { label: "APAC Partner",   sub: "Singapore",         lat:  1.35, lng: 103.82, home: false, color: "#10B981" },
  { label: "Africa Network", sub: "Johannesburg, SA",  lat:-26.20, lng:  28.05, home: false, color: "#F59E0B" },
  { label: "Dev Studio",     sub: "Toronto, Canada",   lat: 43.65, lng: -79.38, home: false, color: "#EC4899" },
  { label: "Tech Hub",       sub: "Nairobi, Kenya",    lat: -1.29, lng:  36.82, home: false, color: "#60A5FA" },
  { label: "Cloud Partner",  sub: "Berlin, Germany",   lat: 52.52, lng:  13.41, home: false, color: "#A78BFA" },
  { label: "Pacific Client", sub: "Sydney, Australia", lat:-33.87, lng: 151.21, home: false, color: "#34D399" },
  { label: "Startup Client", sub: "São Paulo, Brazil", lat:-23.55, lng: -46.63, home: false, color: "#FB923C" },
  { label: "Gov Partner",    sub: "Accra, Ghana",      lat:  5.56, lng:  -0.20, home: false, color: "#FCD34D" },
];

type Pulse = { nodeIdx: number; t: number; speed: number };

// ─── 3D helpers ───────────────────────────────────────────────────────────────
function latLngTo3D(lat: number, lng: number, r: number) {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y:  r * Math.cos(phi),
    z:  r * Math.sin(phi) * Math.sin(theta),
  };
}

function rotatePoint(x: number, y: number, z: number, rx: number, ry: number) {
  const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
  const y1 =  y;
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  return {
    x: x1,
    y: y1 * Math.cos(rx) - z1 * Math.sin(rx),
    z: y1 * Math.sin(rx) + z1 * Math.cos(rx),
  };
}

function project(lat: number, lng: number, r: number, rx: number, ry: number) {
  const p = latLngTo3D(lat, lng, r);
  return rotatePoint(p.x, p.y, p.z, rx, ry);
}

function hexA(hex: string, a: number) {
  return hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");
}

// ─────────────────────────────────────────────────────────────────────────────
export default function NetworkGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const countElRef = useRef<HTMLSpanElement>(null);
  const logoRef    = useRef<HTMLImageElement | null>(null);

  const rotation  = useRef({ x: 0.115, y: -1.512 });
  const drag      = useRef({ active: false, lastX: 0, lastY: 0 });
  const autoSpin  = useRef(true);
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulses    = useRef<Pulse[]>([]);
  const hovered   = useRef<number | null>(null);
  const frame     = useRef(0);
  const packets   = useRef(0);

  useEffect(() => {
    // Preload logo
    const img = new Image();
    img.src = "/logoIcon.png";
    img.onload = () => { logoRef.current = img; };

    pulses.current = NODES
      .map((_, i) => i === 0 ? null : { nodeIdx: i, t: i / NODES.length, speed: 0.0025 + Math.random() * 0.002 })
      .filter(Boolean) as Pulse[];

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.parentElement!.clientWidth;
      canvas.height = canvas.parentElement!.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frame.current++;
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H / 2;
      const r  = Math.min(W, H) * 0.34;

      ctx.clearRect(0, 0, W, H);

      if (autoSpin.current && !drag.current.active) rotation.current.y += 0.0011;
      const rx = rotation.current.x, ry = rotation.current.y;

      // ── Sphere ──────────────────────────────────────────────────────────────
      const sph = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.28, r * 0.05, cx, cy, r);
      sph.addColorStop(0,    "rgba(18,42,90,0.98)");
      sph.addColorStop(0.35, "rgba(10,24,58,0.97)");
      sph.addColorStop(0.75, "rgba(5,12,32,0.98)");
      sph.addColorStop(1,    "rgba(1,4,14,1.0)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sph; ctx.fill();

      // ── Ocean depth overlay (makes edges darker)
      const depth = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r);
      depth.addColorStop(0, "rgba(0,0,0,0)");
      depth.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = depth; ctx.fill();

      // ── Atmosphere glow
      const atmo = ctx.createRadialGradient(cx, cy, r * 0.87, cx, cy, r * 1.26);
      atmo.addColorStop(0,    "rgba(37,99,235,0.32)");
      atmo.addColorStop(0.45, "rgba(14,165,233,0.12)");
      atmo.addColorStop(0.8,  "rgba(37,99,235,0.04)");
      atmo.addColorStop(1,    "rgba(37,99,235,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.26, 0, Math.PI * 2);
      ctx.fillStyle = atmo; ctx.fill();

      // ── Specular highlight (top-left shine)
      const spec = ctx.createRadialGradient(cx - r * 0.38, cy - r * 0.4, 0, cx - r * 0.2, cy - r * 0.22, r * 0.7);
      spec.addColorStop(0,   "rgba(120,180,255,0.12)");
      spec.addColorStop(0.4, "rgba(80,140,255,0.05)");
      spec.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = spec; ctx.fill();

      // ── Lat/lng grid ─────────────────────────────────────────────────────────
      ctx.save();
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath(); let mv = true;
        for (let lg = -180; lg <= 180; lg += 2) {
          const rp = project(lat, lg, r, rx, ry);
          if (rp.z < 0) { mv = true; continue; }
          mv ? ctx.moveTo(cx + rp.x, cy - rp.y) : ctx.lineTo(cx + rp.x, cy - rp.y);
          mv = false;
        }
        ctx.strokeStyle = lat === 0 ? "rgba(59,130,246,0.22)" : "rgba(59,130,246,0.08)";
        ctx.lineWidth = lat === 0 ? 0.9 : 0.45; ctx.stroke();
      }
      for (let lg = -180; lg < 180; lg += 30) {
        ctx.beginPath(); let mv = true;
        for (let lat = -90; lat <= 90; lat += 2) {
          const rp = project(lat, lg, r, rx, ry);
          if (rp.z < 0) { mv = true; continue; }
          mv ? ctx.moveTo(cx + rp.x, cy - rp.y) : ctx.lineTo(cx + rp.x, cy - rp.y);
          mv = false;
        }
        ctx.strokeStyle = lg === 0 ? "rgba(59,130,246,0.22)" : "rgba(59,130,246,0.08)";
        ctx.lineWidth = lg === 0 ? 0.9 : 0.45; ctx.stroke();
      }
      ctx.restore();

      // ── Land mass dots ───────────────────────────────────────────────────────
      for (const [lat, lng] of LAND_DOTS) {
        const rp = project(lat, lng, r, rx, ry);
        if (rp.z < 5) continue;
        const fade = rp.z / r;
        ctx.beginPath();
        ctx.arc(cx + rp.x, cy - rp.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${0.28 * fade})`;
        ctx.fill();
      }

      // ── Node screen positions ────────────────────────────────────────────────
      const pos = NODES.map(n => {
        const rp = project(n.lat, n.lng, r, rx, ry);
        return { x: cx + rp.x, y: cy - rp.y, z: rp.z, vis: rp.z > -r * 0.04 };
      });
      const home = pos[0];

      // Arc control point helper
      const arcCP = (i: number) => {
        const to = pos[i];
        const dx = to.x - home.x, dy = to.y - home.y;
        const dist = Math.hypot(dx, dy);
        const lift = -dist * 0.42;
        return {
          cpx: (home.x + to.x) / 2 + (-dy / dist) * dist * 0.13,
          cpy: (home.y + to.y) / 2 + ( dx / dist) * dist * 0.13 + lift,
        };
      };

      // ── Connection arcs ──────────────────────────────────────────────────────
      NODES.forEach((node, i) => {
        if (i === 0 || !pos[i].vis || !home.vis) return;
        const { cpx, cpy } = arcCP(i);
        const isHov = hovered.current === i;
        ctx.beginPath();
        ctx.moveTo(home.x, home.y);
        ctx.quadraticCurveTo(cpx, cpy, pos[i].x, pos[i].y);
        ctx.strokeStyle = hexA(node.color, isHov ? 0.6 : 0.22);
        ctx.lineWidth = isHov ? 1.8 : 0.7;
        ctx.stroke();
      });

      // ── Pulse dots ──────────────────────────────────────────────────────────
      pulses.current.forEach(pulse => {
        const node = NODES[pulse.nodeIdx];
        if (!pos[pulse.nodeIdx].vis || !home.vis) return;
        pulse.t += pulse.speed;
        if (pulse.t > 1) {
          pulse.t -= 1;
          packets.current++;
          if (countElRef.current) countElRef.current.textContent = String(packets.current);
        }
        const t = pulse.t;
        const to = pos[pulse.nodeIdx];
        const { cpx, cpy } = arcCP(pulse.nodeIdx);
        const bx = (u: number) => (1-u)*(1-u)*home.x + 2*(1-u)*u*cpx + u*u*to.x;
        const by = (u: number) => (1-u)*(1-u)*home.y + 2*(1-u)*u*cpy + u*u*to.y;
        const px = bx(t), py = by(t);

        // Trail
        for (let j = 1; j <= 5; j++) {
          const tt = Math.max(0, t - j * 0.013);
          ctx.beginPath();
          ctx.arc(bx(tt), by(tt), 1.5 - j * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = hexA(node.color, 0.44 - j * 0.07);
          ctx.fill();
        }
        // Glow
        const g = ctx.createRadialGradient(px, py, 0, px, py, 12);
        g.addColorStop(0, hexA(node.color, 0.8)); g.addColorStop(1, hexA(node.color, 0));
        ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        // Core
        ctx.beginPath(); ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();
      });

      // ── Nodes ────────────────────────────────────────────────────────────────
      NODES.forEach((node, i) => {
        const p = pos[i];
        if (!p.vis) return;
        const isHome = node.home;
        const isHov  = hovered.current === i;
        const size   = (isHome ? 14 : 5) * (isHov ? 1.4 : 1);

        // Glow halo
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3.5);
        glow.addColorStop(0, hexA(node.color, isHov ? 0.6 : isHome ? 0.45 : 0.38));
        glow.addColorStop(1, hexA(node.color, 0));
        ctx.beginPath(); ctx.arc(p.x, p.y, size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();

        // Ping rings for home
        if (isHome) {
          [1.9, 3.1, 4.5].forEach((f, ri) => {
            const rr = size + f * (5 + Math.sin(frame.current * 0.038 + ri * 1.6) * 3);
            ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
            ctx.strokeStyle = hexA(node.color, [0.5, 0.28, 0.13][ri]);
            ctx.lineWidth = 1; ctx.stroke();
          });
        }

        // Node body
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = isHome ? "#fff" : node.color;
        ctx.fill();

        // Logo inside home node
        if (isHome) {
          if (logoRef.current && logoRef.current.complete) {
            ctx.save();
            ctx.beginPath(); ctx.arc(p.x, p.y, size - 1.5, 0, Math.PI * 2); ctx.clip();
            const s = (size - 1.5) * 2;
            ctx.drawImage(logoRef.current, p.x - (size - 1.5), p.y - (size - 1.5), s, s);
            ctx.restore();
          } else {
            // Fallback "T" while logo loads
            ctx.font = `bold ${Math.round(size * 1.1)}px sans-serif`;
            ctx.fillStyle = node.color;
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText("T", p.x, p.y + 0.5);
          }
          // Orange ring border
          ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.strokeStyle = node.color; ctx.lineWidth = 2.5; ctx.stroke();
        } else {
          // Inner white core for non-home
          ctx.beginPath(); ctx.arc(p.x, p.y, size * 0.42, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
        }

        // Labels
        ctx.textBaseline = "alphabetic";
        if (isHome || isHov) {
          ctx.textAlign = "center";
          if (isHome) {
            ctx.font = "bold 11px monospace";
            ctx.fillStyle = node.color;
            ctx.fillText("TEKKTOPIA", p.x, p.y - size - 12);
            ctx.font = "9px monospace";
            ctx.fillStyle = "rgba(255,255,255,0.32)";
            ctx.fillText("HQ · Lagos, Nigeria", p.x, p.y - size - 24);
          } else {
            ctx.font = "bold 10px monospace";
            ctx.fillStyle = "rgba(255,255,255,0.92)";
            ctx.fillText(node.label, p.x, p.y - size - 8);
            ctx.font = "8.5px monospace";
            ctx.fillStyle = hexA(node.color, 0.82);
            ctx.fillText(node.sub, p.x, p.y - size - 20);
          }
        }
      });

      // ── Globe rim + outer ring
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59,130,246,0.25)"; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, r + 16, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(37,99,235,0.07)"; ctx.lineWidth = 8; ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // ── Interaction ──────────────────────────────────────────────────────────
    const resumeSpin = () => {
      if (spinTimer.current) clearTimeout(spinTimer.current);
      spinTimer.current = setTimeout(() => { autoSpin.current = true; }, 2800);
    };
    const hitTest = (mx: number, my: number) => {
      const rad = Math.min(canvas.width, canvas.height) * 0.34;
      const cxc = canvas.width / 2, cyc = canvas.height / 2;
      let found: number | null = null;
      NODES.forEach((n, i) => {
        const rp = project(n.lat, n.lng, rad, rotation.current.x, rotation.current.y);
        if (rp.z < 0) return;
        if (Math.hypot(mx - (cxc + rp.x), my - (cyc - rp.y)) < 24) found = i;
      });
      return found;
    };

    const onMouseDown = (e: MouseEvent) => {
      drag.current = { active: true, lastX: e.clientX, lastY: e.clientY };
      autoSpin.current = false;
      canvas.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (drag.current.active) {
        rotation.current.y += (e.clientX - drag.current.lastX) * 0.006;
        rotation.current.x += (e.clientY - drag.current.lastY) * 0.006;
        rotation.current.x = Math.max(-1.35, Math.min(1.35, rotation.current.x));
        drag.current.lastX = e.clientX; drag.current.lastY = e.clientY;
      } else {
        const rect = canvas.getBoundingClientRect();
        const f = hitTest(e.clientX - rect.left, e.clientY - rect.top);
        hovered.current = f;
        canvas.style.cursor = f !== null ? "pointer" : "grab";
      }
    };
    const onMouseUp = () => {
      drag.current.active = false;
      canvas.style.cursor = hovered.current !== null ? "pointer" : "grab";
      resumeSpin();
    };
    const onTouchStart = (e: TouchEvent) => {
      drag.current = { active: true, lastX: e.touches[0].clientX, lastY: e.touches[0].clientY };
      autoSpin.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!drag.current.active) return;
      rotation.current.y += (e.touches[0].clientX - drag.current.lastX) * 0.006;
      rotation.current.x += (e.touches[0].clientY - drag.current.lastY) * 0.006;
      rotation.current.x = Math.max(-1.35, Math.min(1.35, rotation.current.x));
      drag.current.lastX = e.touches[0].clientX; drag.current.lastY = e.touches[0].clientY;
    };
    const onTouchEnd = () => { drag.current.active = false; resumeSpin(); };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    canvas.style.cursor = "grab";

    // ── Section entrance — fires once, never reverses (fixes scroll-back bug)
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );

    // ── Hide nav while globe fills the screen
    const navTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end:   "bottom top",
      onEnter:     () => gsap.to("header", { yPercent: -100, duration: 0.45, ease: "power2.in",  overwrite: true }),
      onLeave:     () => gsap.to("header", { yPercent: 0,    duration: 0.55, ease: "power2.out", overwrite: true }),
      onEnterBack: () => gsap.to("header", { yPercent: -100, duration: 0.45, ease: "power2.in",  overwrite: true }),
      onLeaveBack: () => gsap.to("header", { yPercent: 0,    duration: 0.55, ease: "power2.out", overwrite: true }),
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (spinTimer.current) clearTimeout(spinTimer.current);
      navTrigger.kill();
      gsap.set("header", { yPercent: 0 });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Global Network"
      className="relative flex items-center justify-center"
      style={{ height: "100svh", background: "#04080F", overflow: "hidden", opacity: 0, zIndex: 60 }}
    >
      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Title */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span style={{ height:1, width:20, background:"#F97316", display:"block", borderRadius:99 }} />
          <p style={{ fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.28em", color:"rgba(255,255,255,0.5)" }}>
            Global Network
          </p>
          <span style={{ height:1, width:20, background:"#F97316", display:"block", borderRadius:99 }} />
        </div>
        <h2 className="font-display font-black uppercase"
          style={{ fontSize:"clamp(26px,3.8vw,52px)", letterSpacing:"-0.02em", lineHeight:1 }}>
          <span style={{ color:"#ffffff" }}>Connected{" "}</span>
          <span style={{ color:"#F97316" }}>Worldwide</span>
        </h2>
      </div>

      {/* Active connections — top left */}
      <div className="absolute top-10 left-8 xl:left-14 pointer-events-none z-10">
        <p style={{ fontFamily:"monospace", fontSize:8.5, textTransform:"uppercase", letterSpacing:"0.22em", color:"rgba(255,255,255,0.9)", marginBottom:5 }}>
          Active Connections
        </p>
        <span style={{ fontFamily:"monospace", fontSize:28, fontWeight:700, color:"#10B981", lineHeight:1 }}>
          {NODES.length - 1}
        </span>
      </div>

      {/* Packets counter — top right */}
      <div className="absolute top-10 right-8 xl:right-14 pointer-events-none z-10 text-right">
        <p style={{ fontFamily:"monospace", fontSize:8.5, textTransform:"uppercase", letterSpacing:"0.22em", color:"rgba(255,255,255,0.9)", marginBottom:5 }}>
          Packets Transmitted
        </p>
        <span ref={countElRef} style={{ fontFamily:"monospace", fontSize:28, fontWeight:700, color:"#3B82F6", lineHeight:1 }}>0</span>
      </div>

      {/* Legend — bottom left */}
      <div className="absolute bottom-12 left-8 xl:left-14 z-10 flex flex-col gap-2.5 pointer-events-none">
        {[
          { color:"#F97316", label:"Tekktopia HQ"   },
          { color:"#3B82F6", label:"Partners"       },
          { color:"#10B981", label:"Clients"        },
          { color:"#8B5CF6", label:"Regional Hubs"  },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span style={{ width:7, height:7, borderRadius:"50%", background:color, display:"block", boxShadow:`0 0 6px ${color}88`, flexShrink:0 }} />
            <span style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.14em", color:"rgba(255,255,255,0.9)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Hint — bottom center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <p style={{ fontFamily:"monospace", fontSize:9, textTransform:"uppercase", letterSpacing:"0.22em", color:"rgba(255,255,255,0.9)", whiteSpace:"nowrap" }}>
          Drag to rotate · Hover nodes to explore
        </p>
      </div>
    </section>
  );
}
