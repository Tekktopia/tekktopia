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

/** Deterministic hash — keeps window patterns stable across frames */
function hash(a: number, b: number, c: number): number {
  let h = (((a * 2654435761) ^ (b * 2246822519) ^ (c * 3266489917)) & 0xffffffff) >>> 0;
  h ^= h >>> 16;
  h  = (Math.imul(h, 0x45d9f3b)) >>> 0;
  h ^= h >>> 16;
  return h;
}

function hexA(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

function shade(hex: string, f: number) {
  const r = Math.min(255, Math.round(parseInt(hex.slice(1, 3), 16) * f));
  const g = Math.min(255, Math.round(parseInt(hex.slice(3, 5), 16) * f));
  const b = Math.min(255, Math.round(parseInt(hex.slice(5, 7), 16) * f));
  return `rgb(${r},${g},${b})`;
}

function rrect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
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

type Pt = { sx: number; sy: number };

export default function ServiceConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const router     = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let W = 0, H = 0, cxC = 0, cyC = 0, SC = 0;
    let rot = 0;
    let hovIdx = -1;
    let raf    = 0;
    let gAlpha = 0;
    const heights = BDATA.map(b => b[4]);

    let isDragging  = false;
    let dragStartX  = 0, dragStartRot = 0;
    let mouseDownX  = 0, mouseDownY   = 0;

    /* ── resize ─────────────────────────────────────────────────────────── */
    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      cxC = W / 2;
      cyC = H * 0.56;
      SC  = Math.min(W, H) / 20;
    }

    /* ── projection ─────────────────────────────────────────────────────── */
    function proj(wx: number, wy: number, wz: number): Pt & { rz: number } {
      const rx =  wx * Math.cos(rot) + wz * Math.sin(rot);
      const rz = -wx * Math.sin(rot) + wz * Math.cos(rot);
      return {
        sx: cxC + (rx - rz) * Math.cos(ISO) * SC,
        sy: cyC + (rx + rz) * Math.sin(ISO) * SC - wy * SC * 0.85,
        rz,
      };
    }

    /* ── simple polygon helper ───────────────────────────────────────────── */
    function poly(pts: Pt[], fill: string, stroke?: string, lw = 0.5) {
      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].sx, pts[i].sy);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    /** Build the path without filling – used for gradient faces */
    function tracePoly(pts: Pt[]) {
      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].sx, pts[i].sy);
      ctx.closePath();
    }

    /* ── which two vertical faces are visible ────────────────────────────── */
    function visibleFaces() {
      const deg = (((rot % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI);
      return {
        xFace: (deg <= 135 || deg >= 315) ? 1 : -1,
        zFace: (deg >= 45  && deg <= 225)  ? 1 : -1,
      };
    }

    /* ── window grid via canvas transform ────────────────────────────────── */
    /**
     * Draws a grid of windows on a parallelogram face.
     * BL / BR / TL are three screen-space corners; the transform maps
     * [0,1]² local space onto the parallelogram, so fillRect calls
     * naturally become window-shaped parallelograms on the face.
     */
    function drawWindows(
      BL: Pt, BR: Pt, TL: Pt,
      rows: number, cols: number,
      bIdx: number, fIdx: number,
      svcColor: string,
      winAlpha: number,
    ) {
      const ux = BR.sx - BL.sx, uy = BR.sy - BL.sy; // u-axis (horizontal along face)
      const vx = TL.sx - BL.sx, vy = TL.sy - BL.sy; // v-axis (vertical along face)

      // Warm window colour: blend service hue with warm office-light white
      const cr = parseInt(svcColor.slice(1, 3), 16);
      const cg = parseInt(svcColor.slice(3, 5), 16);
      const cb = parseInt(svcColor.slice(5, 7), 16);
      const wr = Math.min(255, Math.round(cr * 0.28 + 255 * 0.72));
      const wg = Math.min(255, Math.round(cg * 0.28 + 238 * 0.72));
      const wb = Math.min(255, Math.round(cb * 0.28 + 195 * 0.72));

      ctx.save();
      ctx.transform(ux, uy, vx, vy, BL.sx, BL.sy);

      const cellW = 1 / cols;
      const cellH = 1 / rows;
      const padX  = 0.10; // horizontal gap as fraction of cell
      const padY  = 0.07; // vertical gap

      // ── Floor-separator bands (dark concrete strips between floors) ──
      ctx.fillStyle = "rgba(0,0,0,0.50)";
      for (let r = 0; r <= rows; r++) {
        ctx.fillRect(0, r * cellH - cellH * padY * 0.6, 1, cellH * padY * 1.2);
      }

      // ── Window panes ──
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const h   = hash(bIdx * 137 + fIdx * 31, r * 23 + 5, c * 11 + 3);
          const lit = (h % 8) !== 0;                          // ~87.5 % lit
          const bri = ((h >> 8) % 45) / 200;                 // subtle per-pane brightness

          ctx.fillStyle = lit
            ? `rgba(${wr},${wg},${wb},${Math.min(0.95, winAlpha + bri)})`
            : "rgba(2,6,16,0.93)";

          ctx.fillRect(
            c * cellW + padX * cellW,
            r * cellH + padY * cellH,
            cellW * (1 - 2 * padX),
            cellH * (1 - 2 * padY),
          );
        }
      }

      ctx.restore();
    }

    /* ── rooftop HVAC / mechanical boxes ─────────────────────────────────── */
    function drawHVAC(
      bx: number, bz: number, hw: number, hd: number,
      h: number, c: string, ga: number,
      xFace: number, zFace: number,
    ) {
      const boxes = [
        { ox:  hw * 0.26, oz: -hd * 0.22, bw: hw * 0.22, bd: hd * 0.15, bh: 0.18 },
        { ox: -hw * 0.38, oz:  hd * 0.28, bw: hw * 0.17, bd: hd * 0.12, bh: 0.13 },
      ];

      boxes.forEach(({ ox, oz, bw, bd, bh }) => {
        const pp = (dx: number, dy: number, dz: number) =>
          proj(bx + ox + dx, h + dy, bz + oz + dz);

        const Hb = {
          nn: pp(-bw, 0, -bd), pn: pp(bw, 0, -bd),
          pp: pp(bw, 0,  bd), np: pp(-bw, 0, bd),
        };
        const Ht = {
          nn: pp(-bw, bh, -bd), pn: pp(bw, bh, -bd),
          pp: pp(bw, bh,  bd), np: pp(-bw, bh, bd),
        };

        // Top
        poly([Ht.nn, Ht.pn, Ht.pp, Ht.np], shade(c, 0.70), hexA(c, 0.28 * ga), 0.3);
        // X-axis side
        if (xFace > 0) {
          poly([Hb.pn, Hb.pp, Ht.pp, Ht.pn], shade(c, 0.36), hexA(c, 0.16 * ga), 0.3);
        } else {
          poly([Hb.np, Hb.nn, Ht.nn, Ht.np], shade(c, 0.26), hexA(c, 0.12 * ga), 0.3);
        }
        // Z-axis side
        if (zFace > 0) {
          poly([Hb.np, Hb.pp, Ht.pp, Ht.np], shade(c, 0.44), hexA(c, 0.20 * ga), 0.3);
        } else {
          poly([Hb.nn, Hb.pn, Ht.pn, Ht.nn], shade(c, 0.30), hexA(c, 0.14 * ga), 0.3);
        }
      });
    }

    /* ── antenna / spire on tall buildings ──────────────────────────────── */
    function drawAntenna(bx: number, bz: number, h: number, c: string, ga: number) {
      const base  = proj(bx, h, bz);
      const tip   = proj(bx, h + 1.7, bz);
      const midPt = proj(bx, h + 0.70, bz);
      const hi    = proj(bx, h + 1.05, bz);

      // Mast
      ctx.strokeStyle = hexA(c, 0.78 * ga);
      ctx.lineWidth   = 1.3;
      ctx.beginPath(); ctx.moveTo(base.sx, base.sy); ctx.lineTo(tip.sx, tip.sy); ctx.stroke();

      // Lower cross-arm
      ctx.lineWidth   = 0.7;
      ctx.strokeStyle = hexA(c, 0.52 * ga);
      const armA = proj(bx + 0.11, h + 0.70, bz);
      const armB = proj(bx - 0.11, h + 0.70, bz);
      ctx.beginPath(); ctx.moveTo(armA.sx, armA.sy); ctx.lineTo(armB.sx, armB.sy); ctx.stroke();

      // Upper cross-arm
      const armC = proj(bx + 0.07, h + 1.05, bz);
      const armD = proj(bx - 0.07, h + 1.05, bz);
      ctx.beginPath(); ctx.moveTo(armC.sx, armC.sy); ctx.lineTo(armD.sx, armD.sy); ctx.stroke();

      // Aviation light — blinks using real-time sine
      const pulse = 0.4 + 0.6 * Math.abs(Math.sin(Date.now() / 780));
      // Soft glow
      const lg = ctx.createRadialGradient(tip.sx, tip.sy, 0, tip.sx, tip.sy, 8);
      lg.addColorStop(0, `rgba(255,65,65,${pulse * 0.38 * ga})`);
      lg.addColorStop(1, "rgba(255,65,65,0)");
      ctx.fillStyle = lg;
      ctx.beginPath(); ctx.arc(tip.sx, tip.sy, 8, 0, Math.PI * 2); ctx.fill();
      // Hard dot
      ctx.fillStyle = `rgba(255,75,75,${pulse * 0.92 * ga})`;
      ctx.beginPath(); ctx.arc(tip.sx, tip.sy, 2.3, 0, Math.PI * 2); ctx.fill();

      // suppress unused-var linter warnings
      void midPt; void hi;
    }

    /* ── draw one building ───────────────────────────────────────────────── */
    function drawBuilding(i: number) {
      const [bx, bz, hw, hd] = BDATA[i];
      const h      = heights[i];
      const baseH  = BDATA[i][4];   // stable base height for window count
      const isH    = hovIdx === i;
      const svc    = SERVICES[i];
      const c      = svc.color;
      const { xFace, zFace } = visibleFaces();
      const ga     = gAlpha;

      const p = (ox: number, oy: number, oz: number) => proj(bx + ox, oy, bz + oz);

      const B = {
        nn: p(-hw, 0, -hd), pn: p( hw, 0, -hd),
        pp: p( hw, 0,  hd), np: p(-hw, 0,  hd),
      };
      const T = {
        nn: p(-hw, h, -hd), pn: p( hw, h, -hd),
        pp: p( hw, h,  hd), np: p(-hw, h,  hd),
      };

      /* ── 1. Ground shadow ── */
      const gc   = proj(bx, 0, bz);
      const srad = SC * (hw + hd) * 3.2;
      const sgr  = ctx.createRadialGradient(gc.sx, gc.sy, 0, gc.sx, gc.sy, srad);
      sgr.addColorStop(0, "rgba(0,0,0,0.45)");
      sgr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sgr;
      ctx.beginPath(); ctx.arc(gc.sx, gc.sy, srad, 0, Math.PI * 2); ctx.fill();

      /* ── 2. Window-row configuration ── */
      // Use base height (not animated) so window count stays stable
      const winRows  = Math.max(3, Math.round(baseH / 0.52));
      const winColsX = Math.max(2, Math.round(hd * 2 / 0.36));
      const winColsZ = Math.max(2, Math.round(hw * 2 / 0.36));

      /* ── 3. Vertical faces (gradient + window grid) ── */

      // ── X-axis face ──
      if (xFace > 0) {
        // Face verts: B.pn → B.pp → T.pp → T.pn (winding)
        const grad = ctx.createLinearGradient(
          (T.pn.sx + T.pp.sx) / 2, (T.pn.sy + T.pp.sy) / 2,
          (B.pn.sx + B.pp.sx) / 2, (B.pn.sy + B.pp.sy) / 2,
        );
        grad.addColorStop(0, shade(c, 0.52));
        grad.addColorStop(1, shade(c, 0.24));
        tracePoly([B.pn, B.pp, T.pp, T.pn]);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = hexA(c, 0.22 * ga); ctx.lineWidth = 0.5; ctx.stroke();
        // Windows: BL=B.pn, BR=B.pp, TL=T.pn
        drawWindows(B.pn, B.pp, T.pn, winRows, winColsX, i, 0, c, isH ? 0.80 : 0.60);
      } else {
        const grad = ctx.createLinearGradient(
          (T.np.sx + T.nn.sx) / 2, (T.np.sy + T.nn.sy) / 2,
          (B.np.sx + B.nn.sx) / 2, (B.np.sy + B.nn.sy) / 2,
        );
        grad.addColorStop(0, shade(c, 0.40));
        grad.addColorStop(1, shade(c, 0.18));
        tracePoly([B.np, B.nn, T.nn, T.np]);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = hexA(c, 0.16 * ga); ctx.lineWidth = 0.5; ctx.stroke();
        drawWindows(B.np, B.nn, T.np, winRows, winColsX, i, 1, c, isH ? 0.63 : 0.46);
      }

      // ── Z-axis face ──
      if (zFace > 0) {
        const grad = ctx.createLinearGradient(
          (T.np.sx + T.pp.sx) / 2, (T.np.sy + T.pp.sy) / 2,
          (B.np.sx + B.pp.sx) / 2, (B.np.sy + B.pp.sy) / 2,
        );
        grad.addColorStop(0, shade(c, 0.62));
        grad.addColorStop(1, shade(c, 0.30));
        tracePoly([B.np, B.pp, T.pp, T.np]);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = hexA(c, 0.28 * ga); ctx.lineWidth = 0.5; ctx.stroke();
        drawWindows(B.np, B.pp, T.np, winRows, winColsZ, i, 2, c, isH ? 0.88 : 0.68);
      } else {
        const grad = ctx.createLinearGradient(
          (T.nn.sx + T.pn.sx) / 2, (T.nn.sy + T.pn.sy) / 2,
          (B.nn.sx + B.pn.sx) / 2, (B.nn.sy + B.pn.sy) / 2,
        );
        grad.addColorStop(0, shade(c, 0.46));
        grad.addColorStop(1, shade(c, 0.22));
        tracePoly([B.nn, B.pn, T.pn, T.nn]);
        ctx.fillStyle = grad; ctx.fill();
        ctx.strokeStyle = hexA(c, 0.20 * ga); ctx.lineWidth = 0.5; ctx.stroke();
        drawWindows(B.nn, B.pn, T.nn, winRows, winColsZ, i, 3, c, isH ? 0.70 : 0.52);
      }

      /* ── 4. Edge highlights along top corners ── */
      ctx.strokeStyle = hexA(c, 0.38 * ga);
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.moveTo(T.nn.sx, T.nn.sy); ctx.lineTo(T.pn.sx, T.pn.sy);
      ctx.moveTo(T.pn.sx, T.pn.sy); ctx.lineTo(T.pp.sx, T.pp.sy);
      ctx.moveTo(T.pp.sx, T.pp.sy); ctx.lineTo(T.np.sx, T.np.sy);
      ctx.moveTo(T.np.sx, T.np.sy); ctx.lineTo(T.nn.sx, T.nn.sy);
      ctx.stroke();

      /* ── 5. Top (roof) face ── */
      poly(
        [T.nn, T.pn, T.pp, T.np],
        isH ? c : shade(c, 0.80),
        hexA(c, isH ? 0.55 : 0.40 * ga),
        isH ? 1.2 : 0.5,
      );

      // Rooftop centre marking when hovered
      if (isH) {
        ctx.strokeStyle = hexA(c, 0.42);
        ctx.lineWidth   = 0.8;
        ctx.setLineDash([2, 3]);
        const lA = proj(bx - hw * 0.45, h, bz),  lB = proj(bx + hw * 0.45, h, bz);
        const lC = proj(bx, h, bz - hd * 0.45),  lD = proj(bx, h, bz + hd * 0.45);
        ctx.beginPath(); ctx.moveTo(lA.sx, lA.sy); ctx.lineTo(lB.sx, lB.sy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(lC.sx, lC.sy); ctx.lineTo(lD.sx, lD.sy); ctx.stroke();
        ctx.setLineDash([]);
        const tc2 = proj(bx, h, bz);
        ctx.fillStyle = hexA(c, 0.65);
        ctx.beginPath(); ctx.arc(tc2.sx, tc2.sy, 2.5, 0, Math.PI * 2); ctx.fill();
      }

      /* ── 6. Rooftop HVAC equipment ── */
      drawHVAC(bx, bz, hw, hd, h, c, ga, xFace, zFace);

      /* ── 7. Antenna on buildings taller than 3.8 world units ── */
      if (baseH >= 3.8) {
        drawAntenna(bx, bz, h, c, ga);
      }

      /* ── 8. Roof glow halo ── */
      const tc = proj(bx, h, bz);
      const tg = ctx.createRadialGradient(tc.sx, tc.sy, 0, tc.sx, tc.sy, SC * hw * 5.5);
      tg.addColorStop(0, hexA(c, isH ? 0.65 : 0.22));
      tg.addColorStop(1, hexA(c, 0));
      ctx.fillStyle = tg;
      ctx.beginPath(); ctx.arc(tc.sx, tc.sy, SC * hw * 5.5, 0, Math.PI * 2); ctx.fill();

      /* ── 9. Hover: rising light beam ── */
      if (isH) {
        const beamTop = proj(bx, h + 9, bz);
        const bg = ctx.createLinearGradient(tc.sx, tc.sy, beamTop.sx, beamTop.sy);
        bg.addColorStop(0, hexA(c, 0.88));
        bg.addColorStop(1, hexA(c, 0));
        ctx.beginPath();
        ctx.moveTo(tc.sx - 2.8, tc.sy);
        ctx.lineTo(tc.sx + 2.8, tc.sy);
        ctx.lineTo(beamTop.sx + 1.2, beamTop.sy);
        ctx.lineTo(beamTop.sx - 1.2, beamTop.sy);
        ctx.closePath();
        ctx.fillStyle = bg;
        ctx.fill();
      }

      /* ── 10. Building name label ── */
      // Push label above antenna if one is present
      const labelH = baseH >= 3.8 ? h + 2.0 : h + 0.75;
      const lp = proj(bx, labelH, bz);
      ctx.textAlign  = "center";
      ctx.fillStyle  = hexA(c, (isH ? 0.95 : 0.52) * ga);
      ctx.font       = isH ? "bold 10px monospace" : "8px monospace";
      ctx.fillText(svc.name.toUpperCase().slice(0, 18), lp.sx, lp.sy - 4);
      ctx.textAlign  = "left";
    }

    /* ── hover info card ─────────────────────────────────────────────────── */
    function drawInfoCard(i: number) {
      const [bx, bz] = BDATA[i];
      const svc = SERVICES[i];
      const c   = svc.color;
      const top = proj(bx, heights[i] + 0.5, bz);

      const cW = 228, cH = 116;
      let px = top.sx + 24;
      let py = top.sy - cH / 2;
      if (px + cW > W - 16) px = top.sx - cW - 24;
      py = Math.max(16, Math.min(H - cH - 16, py));

      rrect(ctx, px, py, cW, cH, 10);
      ctx.fillStyle = "rgba(4,8,15,0.95)";
      ctx.fill();
      rrect(ctx, px, py, cW, cH, 10);
      ctx.strokeStyle = hexA(c, 0.48);
      ctx.lineWidth   = 1;
      ctx.stroke();

      // Colour accent bar
      ctx.fillStyle = c;
      ctx.fillRect(px + 10, py, cW - 20, 2);

      ctx.textAlign  = "left";
      ctx.fillStyle  = c;
      ctx.font       = "bold 13px -apple-system,sans-serif";
      ctx.fillText(svc.name, px + 14, py + 26);

      ctx.fillStyle = "rgba(255,255,255,0.58)";
      ctx.font      = "11px -apple-system,sans-serif";
      const words   = svc.tagline.split(" ");
      let line = "", lineY = py + 46;
      for (const w of words) {
        const test = line + w + " ";
        if (ctx.measureText(test).width > cW - 28 && line) {
          ctx.fillText(line.trim(), px + 14, lineY);
          line  = w + " ";
          lineY += 15;
        } else {
          line = test;
        }
      }
      if (line.trim()) ctx.fillText(line.trim(), px + 14, lineY);

      ctx.fillStyle = hexA(c, 0.75);
      ctx.font      = "9px monospace";
      ctx.fillText("→  CLICK TO EXPLORE", px + 14, py + cH - 12);
    }

    /* ── main render loop ────────────────────────────────────────────────── */
    function draw() {
      raf    = requestAnimationFrame(draw);
      gAlpha = Math.min(1, gAlpha + 0.013);

      // Animate building heights on hover
      BDATA.forEach((_b, i) => {
        const target = hovIdx === i ? BDATA[i][4] * 1.62 : BDATA[i][4];
        heights[i]  += (target - heights[i]) * 0.07;
      });

      if (!isDragging) rot += 0.003;

      ctx.clearRect(0, 0, W, H);

      // Background fill
      ctx.fillStyle = "#04080F";
      ctx.fillRect(0, 0, W, H);

      // Subtle ambient blue radial
      const bgG = ctx.createRadialGradient(cxC, cyC, 0, cxC, cyC, Math.max(W, H) * 0.65);
      bgG.addColorStop(0, "rgba(30,58,138,0.09)");
      bgG.addColorStop(1, "transparent");
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, W, H);

      // Ground grid
      ctx.strokeStyle = `rgba(255,255,255,${0.042 * gAlpha})`;
      ctx.lineWidth   = 0.5;
      for (let g = -5; g <= 5; g++) {
        const a = proj(-5, 0, g), b2 = proj(5, 0, g);
        ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b2.sx, b2.sy); ctx.stroke();
        const c2 = proj(g, 0, -5), d2 = proj(g, 0, 5);
        ctx.beginPath(); ctx.moveTo(c2.sx, c2.sy); ctx.lineTo(d2.sx, d2.sy); ctx.stroke();
      }

      // Painter's sort: farthest (smallest rz) first
      const order = BDATA.map((_, i) => i).sort((a, b2) => {
        const rzA = proj(BDATA[a][0], 0, BDATA[a][1]).rz;
        const rzB = proj(BDATA[b2][0], 0, BDATA[b2][1]).rz;
        return rzA - rzB;
      });
      order.forEach(i => drawBuilding(i));

      if (hovIdx >= 0) drawInfoCard(hovIdx);

      // HUD overlay
      ctx.textAlign  = "left";
      ctx.fillStyle  = "rgba(249,115,22,0.82)";
      ctx.font       = "bold 11px monospace";
      ctx.fillText("TEKKTOPIA TECH CITY", 24, 34);
      ctx.fillStyle  = "rgba(255,255,255,0.22)";
      ctx.font       = "9px monospace";
      ctx.fillText("DRAG TO ROTATE  ·  HOVER & CLICK ANY BUILDING", 24, 50);
      ctx.textAlign  = "right";
      ctx.fillStyle  = "rgba(255,255,255,0.22)";
      ctx.font       = "9px monospace";
      ctx.fillText(`${SERVICES.length} SERVICES  ·  ALWAYS ON`, W - 24, 34);
      ctx.fillText("24 / 7  SUPPORT", W - 24, 50);
    }

    /* ── hit test ───────────────────────────────────────────────────────── */
    function hitTest(mx: number, my: number): number {
      for (let i = BDATA.length - 1; i >= 0; i--) {
        const tp = proj(BDATA[i][0], heights[i], BDATA[i][1]);
        if (Math.hypot(mx - tp.sx, my - tp.sy) < 32) return i;
      }
      return -1;
    }

    /* ── event listeners ────────────────────────────────────────────────── */
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
      isDragging   = true;
      dragStartX   = e.clientX;
      dragStartRot = rot;
      mouseDownX   = e.clientX;
      mouseDownY   = e.clientY;
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
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ cursor: "grab" }}
      />

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
