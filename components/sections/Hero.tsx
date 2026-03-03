"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useCountUp } from "@/lib/hooks";
import { MolecularDecoration } from "@/components/ui/molecular";

const stats = [
  { target: 30, suffix: "+", label: "років досвіду" },
  { target: 2000, suffix: "+", label: "успішних проєктів" },
  { target: 10000, suffix: "", label: "тон продукції / міс" },
  { target: 300, suffix: "+", label: "формул у портфелі" },
];

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
      className="border-l border-white/20 pl-6 first:border-l-0 first:pl-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0, 1] }}
    >
      <div className="mb-1 font-mono text-3xl font-bold text-white lg:text-4xl">
        <span ref={ref}>{value}</span>
        <span className="text-brand">{suffix}</span>
      </div>
      <p className="text-sm text-white/60">{label}</p>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
      {/* Background Image */}
      <Image
        src="/images/hero/hero-bg-1.jpg"
        alt="SVK виробництво"
        fill
        className="object-cover"
        priority
        quality={85}
      />

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(270deg, rgba(17,27,81,0) 37.88%, rgb(17,27,81) 77.82%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(58,191,240,0) 54.13%, rgba(58,191,240,0.15) 83.27%)",
        }}
      />
      <div className="absolute inset-0 bg-[#111B51]/40" />

      {/* Molecular Decoration */}
      <MolecularDecoration className="absolute right-20 top-1/4 opacity-20" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8">
        <div className="max-w-2xl py-32">
          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-xs font-medium text-white/70">
                Науково-виробнича фірма з 1993 року
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Хімічні рішення
            <br />
            <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
              для вашого бізнесу
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-10 max-w-lg text-lg leading-relaxed text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Індивідуальні формули, стабільна якість, масштабне виробництво.
            Від ідеї до готового продукту — 300+ перевірених рішень.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-16 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
            >
              Замовити консультацію
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#catalog"
              className="inline-flex h-13 items-center rounded-full border border-white/20 px-8 text-sm font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              Каталог продукції
            </a>
          </motion.div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} {...stat} delay={0.7 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding to compensate for clip-path angle */}
      <div className="absolute inset-x-0 bottom-0 h-24" />
    </section>
  );
}
