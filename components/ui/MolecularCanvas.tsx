"use client";

import { useRef, useEffect, useCallback } from "react";

/* ── types ───────────────────────────────────────── */
interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  type: "core" | "large" | "medium" | "small" | "tiny";
  phase: number;
  electronAngle: number;
  orbitTilt: number;
  color: { r: number; g: number; b: number }; // slight color variation
}

interface Bond {
  a: number;
  b: number;
  kind: "single" | "double" | "triple" | "dashed";
}

interface MolecularCanvasProps {
  className?: string;
  nodeCount?: number;
  color?: string;
  maxDistance?: number;
}

/* ── helpers ─────────────────────────────────────── */
function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function varyColor(base: { r: number; g: number; b: number }, spread = 30) {
  return {
    r: Math.min(255, Math.max(0, base.r + (Math.random() - 0.5) * spread)),
    g: Math.min(255, Math.max(0, base.g + (Math.random() - 0.5) * spread)),
    b: Math.min(255, Math.max(0, base.b + (Math.random() - 0.5) * spread * 0.5)),
  };
}

/* ── component ───────────────────────────────────── */
export function MolecularCanvas({
  className = "",
  nodeCount = 55,
  color = "#059CD5",
  maxDistance = 220,
}: MolecularCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const atomsRef = useRef<Atom[]>([]);
  const rafRef = useRef<number>(0);
  const baseRgb = hexToRgb(color);

  const initAtoms = useCallback(
    (w: number, h: number) => {
      const atoms: Atom[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const rnd = Math.random();
        const type: Atom["type"] =
          rnd < 0.08 ? "core" :
          rnd < 0.22 ? "large" :
          rnd < 0.50 ? "medium" :
          rnd < 0.78 ? "small" : "tiny";

        const baseR =
          type === "core"   ? 7 + Math.random() * 4 :
          type === "large"  ? 4.5 + Math.random() * 3 :
          type === "medium" ? 3 + Math.random() * 2 :
          type === "small"  ? 1.8 + Math.random() * 1.2 :
                              0.8 + Math.random() * 0.8;

        atoms.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: baseR,
          type,
          phase: Math.random() * Math.PI * 2,
          electronAngle: Math.random() * Math.PI * 2,
          orbitTilt: Math.random() * Math.PI,
          color: varyColor(baseRgb, type === "core" ? 15 : 35),
        });
      }
      return atoms;
    },
    [nodeCount, baseRgb.r, baseRgb.g, baseRgb.b],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (atomsRef.current.length === 0) {
        atomsRef.current = initAtoms(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const draw = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      time += 0.003;

      const atoms = atomsRef.current;

      /* ── update positions ───────────────────────── */
      for (const a of atoms) {
        a.x += a.vx + Math.sin(time * 1.1 + a.phase) * 0.1;
        a.y += a.vy + Math.cos(time * 0.85 + a.phase) * 0.1;
        a.electronAngle += 0.012 + a.phase * 0.001;

        if (a.x < -30) a.x = w + 30;
        if (a.x > w + 30) a.x = -30;
        if (a.y < -30) a.y = h + 30;
        if (a.y > h + 30) a.y = -30;
      }

      /* ── find bonds ─────────────────────────────── */
      const bonds: Bond[] = [];
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[i].x - atoms[j].x;
          const dy = atoms[i].y - atoms[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const ratio = dist / maxDistance;
            const bothBig = atoms[i].type !== "small" && atoms[i].type !== "tiny"
                         && atoms[j].type !== "small" && atoms[j].type !== "tiny";
            const kind: Bond["kind"] =
              ratio < 0.25 && bothBig ? "triple" :
              ratio < 0.45 && bothBig ? "double" :
              ratio > 0.8 ? "dashed" : "single";
            bonds.push({ a: i, b: j, kind });
          }
        }
      }

      /* ── draw bonds ─────────────────────────────── */
      for (const bond of bonds) {
        const a1 = atoms[bond.a];
        const a2 = atoms[bond.b];
        const dx = a2.x - a1.x;
        const dy = a2.y - a1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = (1 - dist / maxDistance) * 0.35;
        const cr = baseRgb.r;
        const cg = baseRgb.g;
        const cb = baseRgb.b;

        if (bond.kind === "triple") {
          const nx = (-dy / dist) * 3.5;
          const ny = (dx / dist) * 3.5;
          for (const m of [-1, 0, 1]) {
            ctx.beginPath();
            ctx.moveTo(a1.x + nx * m, a1.y + ny * m);
            ctx.lineTo(a2.x + nx * m, a2.y + ny * m);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * (m === 0 ? 1 : 0.5)})`;
            ctx.lineWidth = m === 0 ? 1.5 : 0.8;
            ctx.stroke();
          }
        } else if (bond.kind === "double") {
          const nx = (-dy / dist) * 2.5;
          const ny = (dx / dist) * 2.5;
          ctx.beginPath();
          ctx.moveTo(a1.x + nx, a1.y + ny);
          ctx.lineTo(a2.x + nx, a2.y + ny);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(a1.x - nx, a1.y - ny);
          ctx.lineTo(a2.x - nx, a2.y - ny);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.55})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (bond.kind === "dashed") {
          ctx.setLineDash([4, 6]);
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha * 0.4})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          // Gradient bond
          const grad = ctx.createLinearGradient(a1.x, a1.y, a2.x, a2.y);
          const c1 = a1.color;
          const c2 = a2.color;
          grad.addColorStop(0, `rgba(${c1.r},${c1.g},${c1.b},${alpha})`);
          grad.addColorStop(1, `rgba(${c2.r},${c2.g},${c2.b},${alpha})`);
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      /* ── draw atoms ─────────────────────────────── */
      for (const a of atoms) {
        const pulse = 1 + Math.sin(time * 2 + a.phase) * 0.12;
        const r = a.r * pulse;
        const c = a.color;

        if (a.type === "core") {
          // ── Big glow halo ──
          const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r * 7);
          glow.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.14)`);
          glow.addColorStop(0.4, `rgba(${c.r},${c.g},${c.b},0.04)`);
          glow.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 7, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // ── 3 electron orbits ──
          for (let o = 0; o < 3; o++) {
            const tilt = a.orbitTilt + o * (Math.PI / 3);
            const rx = r * (3.5 + o * 0.8);
            const ry = r * (1.5 + o * 0.4);
            ctx.beginPath();
            ctx.ellipse(a.x, a.y, rx, ry, tilt + a.electronAngle * (0.3 + o * 0.1), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${0.18 - o * 0.04})`;
            ctx.lineWidth = 1 - o * 0.2;
            ctx.stroke();

            // Electron dot
            const angle = a.electronAngle * (2.5 + o * 0.7);
            const cosA = Math.cos(tilt + a.electronAngle * (0.3 + o * 0.1));
            const sinA = Math.sin(tilt + a.electronAngle * (0.3 + o * 0.1));
            const eLocalX = Math.cos(angle) * rx;
            const eLocalY = Math.sin(angle) * ry;
            const ex = a.x + eLocalX * cosA - eLocalY * sinA;
            const ey = a.y + eLocalX * sinA + eLocalY * cosA;

            // Electron glow
            const eGlow = ctx.createRadialGradient(ex, ey, 0, ex, ey, 4);
            eGlow.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.7)`);
            eGlow.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
            ctx.beginPath();
            ctx.arc(ex, ey, 4, 0, Math.PI * 2);
            ctx.fillStyle = eGlow;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(ex, ey, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,0.8)`;
            ctx.fill();
          }

          // ── Shell rings ──
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.25)`;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 1.4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.18)`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // ── Nucleus: glossy sphere ──
          const nucGrad = ctx.createRadialGradient(
            a.x - r * 0.35, a.y - r * 0.35, r * 0.1,
            a.x, a.y, r
          );
          nucGrad.addColorStop(0, `rgba(255,255,255,0.45)`);
          nucGrad.addColorStop(0.3, `rgba(${c.r},${c.g},${c.b},0.6)`);
          nucGrad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0.2)`);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.fillStyle = nucGrad;
          ctx.fill();

          // Highlight speck
          ctx.beginPath();
          ctx.arc(a.x - r * 0.3, a.y - r * 0.3, r * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,0.35)`;
          ctx.fill();

        } else if (a.type === "large") {
          // Glow
          const glow = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r * 5);
          glow.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.1)`);
          glow.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // 2 orbits
          for (let o = 0; o < 2; o++) {
            const rx = r * (3 + o);
            const ry = r * (1.5 + o * 0.3);
            ctx.beginPath();
            ctx.ellipse(a.x, a.y, rx, ry, a.orbitTilt + a.electronAngle * (0.4 + o * 0.15), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${0.14 - o * 0.04})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Electron
            const angle = a.electronAngle * (3 + o);
            const tilt = a.orbitTilt + a.electronAngle * (0.4 + o * 0.15);
            const cosT = Math.cos(tilt);
            const sinT = Math.sin(tilt);
            const lx = Math.cos(angle) * rx;
            const ly = Math.sin(angle) * ry;
            const ex = a.x + lx * cosT - ly * sinT;
            const ey = a.y + lx * sinT + ly * cosT;

            ctx.beginPath();
            ctx.arc(ex, ey, 1.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,0.6)`;
            ctx.fill();
          }

          // Shell
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 1.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.2)`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Glossy nucleus
          const ng = ctx.createRadialGradient(a.x - r * 0.25, a.y - r * 0.25, 0, a.x, a.y, r);
          ng.addColorStop(0, `rgba(255,255,255,0.35)`);
          ng.addColorStop(0.4, `rgba(${c.r},${c.g},${c.b},0.5)`);
          ng.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0.15)`);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.fillStyle = ng;
          ctx.fill();

        } else if (a.type === "medium") {
          // Outer ring
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.12)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // One orbit
          ctx.beginPath();
          ctx.ellipse(a.x, a.y, r * 2.5, r * 1.2, a.orbitTilt + a.electronAngle * 0.3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.1)`;
          ctx.lineWidth = 0.6;
          ctx.stroke();

          // Inner ring
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.18)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Glossy fill
          const mg = ctx.createRadialGradient(a.x - r * 0.2, a.y - r * 0.2, 0, a.x, a.y, r);
          mg.addColorStop(0, `rgba(255,255,255,0.25)`);
          mg.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},0.4)`);
          mg.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0.12)`);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.fillStyle = mg;
          ctx.fill();

        } else if (a.type === "small") {
          ctx.beginPath();
          ctx.arc(a.x, a.y, r * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.08)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          const sg = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r);
          sg.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.4)`);
          sg.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0.1)`);
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();

        } else {
          // Tiny — just a bright dot
          ctx.beginPath();
          ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.3)`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initAtoms, color, maxDistance, baseRgb.r, baseRgb.g, baseRgb.b]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
