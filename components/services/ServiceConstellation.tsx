"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SERVICES from "@/lib/services-data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// [bx, bz, halfW, halfD, baseHeight]
const BDATA: [number, number, number, number, number][] = [
  [-3.2,  0.0, 0.60, 0.60, 4.0],
  [-2.2, -2.0, 0.50, 0.50, 2.8],
  [ 0.0, -3.0, 0.55, 0.55, 3.6],
  [ 2.2, -2.0, 0.50, 0.50, 2.2],
  [ 3.2,  0.0, 0.60, 0.60, 5.2],
  [ 2.2,  2.0, 0.50, 0.50, 3.2],
  [ 0.0,  3.0, 0.55, 0.55, 2.5],
  [-2.2,  2.0, 0.50, 0.50, 2.0],
  [-0.9, -0.9, 0.45, 0.45, 4.8],
  [ 0.9,  0.9, 0.45, 0.45, 3.8],
];

const ISO = Math.PI / 6;

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function shade(hex: string, f: number) {
  const r = Math.min(255, Math.round(parseInt(hex.slice(1, 3), 16) * f));
  const g = Math.min(255, Math.round(parseInt(hex.slice(3, 5), 16) * f));
  const b = Math.min(255, Math.round(parseInt(hex.slice(5, 7), 16) * f));
  return `rgb(${r},${g},${b})`;
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export default function ServiceConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const router     = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, cx = 0, cy = 0, SC = 0;
    let rot = 0;
    let hovIdx = -1;
    let raf = 0;
    let gAlpha = 0;
    const heights = BDATA.map(b => b[4]);

    let isDragging = false;
    let dragStartX = 0, dragStartRot = 0;
    let mouseDownX = 0, mouseDownY = 0;

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      cx = W / 2;
      cy = H * 0.56;
      SC = Math.min(W, H) / 20;
    }

    function proj(wx: number, wy: number, wz: number) {
      const rx =  wx * Math.cos(rot) + wz * Math.sin(rot);
      const rz = -wx * Math.sin(rot) + wz * Math.cos(rot);
      return {
        sx: cx + (rx - rz) * Math.cos(ISO) * SC,
        sy: cy + (rx + rz) * Math.sin(ISO) * SC - wy * SC * 0.85,
        rz,
      };
    }

    function poly(pts: { sx: number; sy: number }[], fill: string, stroke?: string, lw = 0.5) {
      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].sx, pts[i].sy);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    // Which 2 vertical faces are visible based on camera angle
    function visibleFaces() {
      const deg = (((rot % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI);
      return {
        xFace: (deg <= 135 || deg >= 315) ? 1 : -1,   // +1 = +X face, -1 = -X face
        zFace: (deg >= 45 && deg <= 225)  ? 1 : -1,   // +1 = +Z face, -1 = -Z face
      };
    }

    function drawBuilding(i: number) {
      const [bx, bz, hw, hd] = BDATA[i];
      const h   = heights[i];
      const isH = hovIdx === i;
      const svc = SERVICES[i];
      const c   = svc.color;
      const { xFace, zFace } = visibleFaces();
      const ga  = gAlpha;

      const p = (ox: number, oy: number, oz: number) => proj(bx + ox, oy, bz + oz);

      const B = {
        nn: p(-hw, 0, -hd), pn: p( hw, 0, -hd),
        pp: p( hw, 0,  hd), np: p(-hw, 0,  hd),
      };
      const T = {
        nn: p(-hw, h, -hd), pn: p( hw, h, -hd),
        pp: p( hw, h,  hd), np: p(-hw, h,  hd),
      };

      // Side 1 — X axis
      if (xFace > 0) {
        poly([B.pn, B.pp, T.pp, T.pn], shade(c, 0.40), hexA(c, 0.22 * ga));
      } else {
        poly([B.np, B.nn, T.nn, T.np], shade(c, 0.30), hexA(c, 0.18 * ga));
      }

      // Side 2 — Z axis
      if (zFace > 0) {
        poly([B.np, B.pp, T.pp, T.np], shade(c, 0.48), hexA(c, 0.28 * ga));
      } else {
        poly([B.nn, B.pn, T.pn, T.nn], shade(c, 0.35), hexA(c, 0.22 * ga));
      }

      // Top face
      poly(
        [T.nn, T.pn, T.pp, T.np],
        isH ? c : shade(c, 0.75),
        hexA(c, 0.45 * ga),
        isH ? 1.2 : 0.5,
      );

      // Roof glow
      const tc = proj(bx, h, bz);
      const tg = ctx.createRadialGradient(tc.sx, tc.sy, 0, tc.sx, tc.sy, SC * hw * 4.5);
      tg.addColorStop(0, hexA(c, isH ? 0.55 : 0.18));
      tg.addColorStop(1, hexA(c, 0));
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.arc(tc.sx, tc.sy, SC * hw * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Hover: rising light beam
      if (isH) {
        const beamTop = proj(bx, h + 7, bz);
        const bg = ctx.createLinearGradient(tc.sx, tc.sy, beamTop.sx, beamTop.sy);
        bg.addColorStop(0, hexA(c, 0.80));
        bg.addColorStop(1, hexA(c, 0));
        ctx.beginPath();
        ctx.moveTo(tc.sx - 2.5, tc.sy);
        ctx.lineTo(tc.sx + 2.5, tc.sy);
        ctx.lineTo(beamTop.sx + 1, beamTop.sy);
        ctx.lineTo(beamTop.sx - 1, beamTop.sy);
        ctx.closePath();
        ctx.fillStyle = bg;
        ctx.fill();
      }

      // Service name tag above building
      const lp = proj(bx, h + 0.65, bz);
      ctx.textAlign = "center";
      ctx.fillStyle = hexA(c, (isH ? 0.95 : 0.52) * ga);
      ctx.font = isH ? "bold 10px monospace" : "8px monospace";
      ctx.fillText(svc.name.toUpperCase().slice(0, 17), lp.sx, lp.sy - 4);
      ctx.textAlign = "left";
    }

    function drawInfoCard(i: number) {
      const [bx, bz] = BDATA[i];
      const svc = SERVICES[i];
      const c   = svc.color;
      const top = proj(bx, heights[i] + 0.5, bz);

      const cW = 222, cH = 112;
      let px = top.sx + 22;
      let py = top.sy - cH / 2;
      if (px + cW > W - 16) px = top.sx - cW - 22;
      py = Math.max(16, Math.min(H - cH - 16, py));

      rrect(ctx, px, py, cW, cH, 10);
      ctx.fillStyle = "rgba(4,8,15,0.94)";
      ctx.fill();
      rrect(ctx, px, py, cW, cH, 10);
      ctx.strokeStyle = hexA(c, 0.45);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Colour accent bar
      ctx.fillStyle = c;
      ctx.fillRect(px + 10, py, cW - 20, 2);

      ctx.textAlign = "left";
      ctx.fillStyle = c;
      ctx.font = "bold 13px -apple-system,sans-serif";
      ctx.fillText(svc.name, px + 14, py + 24);

      ctx.fillStyle = "rgba(255,255,255,0.58)";
      ctx.font = "11px -apple-system,sans-serif";
      const words = svc.tagline.split(" ");
      let line = "", lineY = py + 44;
      for (const w of words) {
        const test = line + w + " ";
        if (ctx.measureText(test).width > cW - 28 && line) {
          ctx.fillText(line.trim(), px + 14, lineY);
          line = w + " ";
          lineY += 15;
        } else { line = test; }
      }
      if (line.trim()) ctx.fillText(line.trim(), px + 14, lineY);

      ctx.fillStyle = hexA(c, 0.72);
      ctx.font = "9px monospace";
      ctx.fillText("→  CLICK TO EXPLORE", px + 14, py + cH - 13);
    }

    function draw() {
      raf = requestAnimationFrame(draw);
      gAlpha = Math.min(1, gAlpha + 0.013);

      // Lerp building heights
      BDATA.forEach((_b, i) => {
        const target = hovIdx === i ? BDATA[i][4] * 1.65 : BDATA[i][4];
        heights[i] += (target - heights[i]) * 0.07;
      });

      if (!isDragging) rot += 0.003;

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#04080F";
      ctx.fillRect(0, 0, W, H);

      const bgG = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.65);
      bgG.addColorStop(0, "rgba(30,58,138,0.08)");
      bgG.addColorStop(1, "transparent");
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, W, H);

      // Ground grid
      ctx.strokeStyle = `rgba(255,255,255,${0.045 * gAlpha})`;
      ctx.lineWidth = 0.5;
      for (let g = -5; g <= 5; g++) {
        const a = proj(-5, 0, g); const b2 = proj(5, 0, g);
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b2.sx, b2.sy); ctx.stroke();
        const c2 = proj(g, 0, -5); const d2 = proj(g, 0, 5);
        ctx.beginPath(); ctx.moveTo(c2.sx, c2.sy); ctx.lineTo(d2.sx, d2.sy); ctx.stroke();
      }

      // Painter's sort: smallest rz first (farthest back)
      const order = BDATA.map((_, i) => i).sort((a, b2) => {
        const rzA = proj(BDATA[a][0], 0, BDATA[a][1]).rz;
        const rzB = proj(BDATA[b2][0], 0, BDATA[b2][1]).rz;
        return rzA - rzB;
      });

      order.forEach(i => drawBuilding(i));

      if (hovIdx >= 0) drawInfoCard(hovIdx);

      // HUD
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(249,115,22,0.82)";
      ctx.font = "bold 11px monospace";
      ctx.fillText("TEKKTOPIA TECH CITY", 24, 34);
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.font = "9px monospace";
      ctx.fillText("DRAG TO ROTATE  ·  HOVER & CLICK ANY BUILDING", 24, 50);

      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.font = "9px monospace";
      ctx.fillText(`${SERVICES.length} SERVICES  ·  ALWAYS ON`, W - 24, 34);
      ctx.fillText("24 / 7  SUPPORT", W - 24, 50);
    }

    function hitTest(mx: number, my: number): number {
      for (let i = BDATA.length - 1; i >= 0; i--) {
        const [bx, bz] = BDATA[i];
        const tp = proj(bx, heights[i], bz);
        if (Math.hypot(mx - tp.sx, my - tp.sy) < 30) return i;
      }
      return -1;
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (isDragging) {
        rot = dragStartRot + (e.clientX - dragStartX) * 0.005;
        return;
      }
      hovIdx = hitTest(e.clientX - rect.left, e.clientY - rect.top);
      canvas.style.cursor = hovIdx >= 0 ? "pointer" : "grab";
    };

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartRot = rot;
      mouseDownX = e.clientX;
      mouseDownY = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onUp = (e: MouseEvent) => {
      isDragging = false;
      canvas.style.cursor = hovIdx >= 0 ? "pointer" : "grab";
      const moved = Math.hypot(e.clientX - mouseDownX, e.clientY - mouseDownY);
      if (moved < 5 && hovIdx >= 0) {
        router.push(`/services/${SERVICES[hovIdx].slug}`);
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    gsap.fromTo(sectionRef.current, { opacity: 0 }, {
      opacity: 1, duration: 1.2, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
    });

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [router]);

  return (
    <section
      ref={sectionRef}
      aria-label="Interactive tech city"
      className="relative"
      style={{ height: "100svh", background: "#04080F", overflow: "hidden", opacity: 0 }}
    >
      {/* Subtle grid overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ cursor: "grab" }} />

      {/* Section title */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
          <span style={{ fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.38)" }}>
            The Full Stack
          </span>
          <span style={{ height: 1, width: 24, background: "#F97316", display: "block", borderRadius: 99 }} />
        </div>
        <h2
          className="font-display font-black uppercase"
          style={{ fontSize: "clamp(22px,3vw,42px)", letterSpacing: "-0.03em", lineHeight: 1 }}
        >
          <span style={{ color: "#ffffff" }}>Every Service. </span>
          <span style={{ color: "#F97316" }}>One Team.</span>
        </h2>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10">
        <span style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          Drag to rotate · Hover &amp; click any building
        </span>
        <div style={{ width: 1, height: 24, background: "linear-gradient(to bottom,rgba(249,115,22,0.45),transparent)" }} />
      </div>
    </section>
  );
}
