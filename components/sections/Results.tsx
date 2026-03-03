"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { useCountUp } from "@/lib/hooks";
import { MolecularDecoration } from "@/components/ui/molecular";
import {
  FlaskConical,
  ShieldCheck,
  Truck,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

/* ─── Animated Progress Bar ─────────────────────────────────── */

function ProgressBar({
  label,
  value,
  max,
  suffix = "",
  delay = 0,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">{label}</span>
        <span className="font-semibold text-white">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-[#38BDF8]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(value / max) * 100}%` } : undefined}
          transition={{ duration: 1.5, delay, ease: [0.25, 0.4, 0, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── Animated Ring ────────────────────────────────────────── */

function AnimatedRing({
  value,
  max,
  label,
  size = 120,
}: {
  value: number;
  max: number;
  label: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const circumference = 2 * Math.PI * 46;
  const percent = value / max;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="rotate-[-90deg]">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset: circumference * (1 - percent) }
                : undefined
            }
            transition={{ duration: 1.8, delay: 0.3, ease: [0.25, 0.4, 0, 1] }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059CD5" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-center text-xs text-white/50">{label}</span>
    </div>
  );
}

/* ─── Main Stats Data ────────────────────────────────────────── */

const mainStats = [
  { target: 30, suffix: "+", label: "Років на ринку" },
  { target: 2000, suffix: "+", label: "Успішних проєктів" },
  { target: 10000, suffix: "", label: "Тон продукції / місяць" },
  { target: 300, suffix: "+", label: "Формул у портфелі" },
];

/* ─── Stat Counter ────────────────────────────────────────────── */

function StatCounter({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { value, ref } = useCountUp(target, 2200);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="mb-2 font-mono text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        <span ref={ref}>{value}</span>
        <span className="text-brand">{suffix}</span>
      </div>
      <p className="text-sm text-white/60">{label}</p>
    </motion.div>
  );
}

/* ─── Dashboard Card ─────────────────────────────────────────── */

function DashboardCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Results Section (Dark full-width) ──────────────────────── */

export function Results() {
  return (
    <section id="results" className="relative overflow-hidden bg-[#0a1628] py-24">
      {/* Background Image */}
      <Image
        src="/images/stats/stats-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-20"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/60 to-[#0a1628]/80" />

      {/* Molecular Decoration */}
      <MolecularDecoration className="absolute right-10 top-10 opacity-10" />
      <MolecularDecoration className="absolute -left-10 bottom-10 opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Цифри, які говорять самі за себе
          </h2>
        </FadeIn>
        <FadeIn className="mb-16 text-center" delay={0.15}>
          <p className="mx-auto max-w-2xl text-white/60">
            Три десятиліття стабільного зростання, тисячі реалізованих проєктів
            та мільйони задоволених споживачів.
          </p>
        </FadeIn>

        {/* Stats Row */}
        <div className="mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {mainStats.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} delay={0.2 + i * 0.1} />
          ))}
        </div>

        {/* ── Manufacturing Dashboard ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 — Quality Control */}
          <DashboardCard delay={0.3}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Контроль якості
              </h3>
              <ShieldCheck className="h-4 w-4 text-brand" />
            </div>
            <AnimatedRing value={99} max={100} label="Відповідність стандартам" />
            <p className="mt-4 text-center text-xs text-white/40">
              ISO 9001:2015 · ISO 14001 · ДСТУ
            </p>
          </DashboardCard>

          {/* Card 2 — Production Pipeline */}
          <DashboardCard delay={0.4}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Виробничий цикл
              </h3>
              <Clock className="h-4 w-4 text-brand" />
            </div>
            <div className="space-y-4">
              <ProgressBar label="Розробка формули" value={14} max={30} suffix=" днів" delay={0.5} />
              <ProgressBar label="Виробництво партії" value={5} max={30} suffix=" днів" delay={0.6} />
              <ProgressBar label="Тестування якості" value={2} max={30} suffix=" дні" delay={0.7} />
              <ProgressBar label="Готовність до відвантаження" value={3} max={30} suffix=" дні" delay={0.8} />
            </div>
          </DashboardCard>

          {/* Card 3 — Delivery Reliability */}
          <DashboardCard delay={0.5}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Надійність поставок
              </h3>
              <Truck className="h-4 w-4 text-brand" />
            </div>
            <div className="mb-4 flex items-center justify-center">
              <div className="font-mono text-5xl font-bold text-white">
                98<span className="text-brand">%</span>
              </div>
            </div>
            <p className="mb-5 text-center text-sm text-white/50">
              Вчасна доставка по Україні
            </p>
            <div className="flex items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              +3% за останній рік
            </div>
          </DashboardCard>

          {/* Card 4 — Lab Capabilities (wide) */}
          <DashboardCard delay={0.6} className="sm:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Лабораторія R&D
              </h3>
              <FlaskConical className="h-4 w-4 text-brand" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                {[
                  "Розробка індивідуальних формул",
                  "Тестування сировини та готової продукції",
                  "Аналіз стабільності формул",
                  "Мікробіологічний контроль",
                  "Сертифікація та документація",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <ProgressBar label="Формул на замовлення" value={85} max={100} suffix="%" delay={0.7} />
                <ProgressBar label="Повторні замовлення" value={92} max={100} suffix="%" delay={0.8} />
                <ProgressBar label="Успішних запусків" value={97} max={100} suffix="%" delay={0.9} />
              </div>
            </div>
          </DashboardCard>

          {/* Card 5 — MOQ */}
          <DashboardCard delay={0.7}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                Мінімальне замовлення
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Private Label", moq: "від 1 000 од.", sub: "Під ваш бренд" },
                { label: "Контрактне виробництво", moq: "від 500 кг", sub: "За вашою формулою" },
                { label: "Розробка формули", moq: "від 1 формули", sub: "R&D під задачу" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white/80">{item.label}</p>
                    <p className="text-xs text-white/40">{item.sub}</p>
                  </div>
                  <span className="text-sm font-semibold text-brand">{item.moq}</span>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Bottom gradient to white */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      {/* Top gradient from previous section */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface to-transparent" />
    </section>
  );
}
