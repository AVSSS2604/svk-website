"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Tag,
  Beaker,
  Palette,
  Package,
  Truck,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";
import { useCountUp } from "@/lib/hooks";
import { useI18n } from "@/lib/i18n";

const stepsIcons = [Beaker, Palette, Package, Truck];
const stepsNumbers = ["01", "02", "03", "04"];

const statsData = [
  { target: 50 },
  { target: 5 },
  { target: 300 },
  { target: 14 },
];

function StatCounter({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const { value, ref } = useCountUp(target, 2200);
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-2 font-mono text-4xl font-bold text-white lg:text-5xl">
        <span ref={ref}>{value}</span>
        <span className="text-brand">{suffix}</span>
      </div>
      <p className="text-sm text-white/60">{label}</p>
    </motion.div>
  );
}

export default function PrivateLabelPage() {
  const { t } = useI18n();

  const statsTexts = t("privateLabel.stats") as { suffix: string; label: string }[];
  const stats = statsData.map((s, i) => ({ ...s, suffix: statsTexts[i].suffix, label: statsTexts[i].label }));

  const stepsTexts = t("privateLabel.process.steps") as { title: string; description: string }[];
  const steps = stepsIcons.map((icon, i) => ({ icon, number: stepsNumbers[i], title: stepsTexts[i].title, description: stepsTexts[i].description }));

  const benefits = t("privateLabel.benefits.items") as string[];

  const whatWeMakeTexts = t("privateLabel.whatWeMake.items") as { title: string; description: string }[];

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0a1628] pt-28 pb-20">
        <Image
          src="/images/private-label-bg.jpg"
          alt="Private Label СВК"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(17,27,81,0) 37.88%, rgb(17,27,81) 77.82%)" }} />
        <div className="absolute inset-0 bg-[#111B51]/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl py-16">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-xs font-medium text-white/70">{t("privateLabel.hero.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {t("privateLabel.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("privateLabel.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("privateLabel.hero.subtitle")}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
              >
                {t("privateLabel.hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="bg-[#0a1628] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCounter key={stat.label} target={stat.target} suffix={stat.suffix} label={stat.label} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section id="process" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("privateLabel.process.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-2xl text-foreground-secondary">
                {t("privateLabel.process.subtitle")}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="group relative rounded-3xl border border-border bg-white p-8 transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="absolute right-6 top-6 font-mono text-5xl font-bold text-surface-alt">
                  {step.number}
                </span>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Categories */}
      <section id="benefits" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -left-20 top-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Benefits */}
            <div>
              <FadeIn>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("privateLabel.benefits.title")} <span className="text-brand">{t("privateLabel.benefits.titleHighlight")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mb-8 text-foreground-secondary">
                  {t("privateLabel.benefits.subtitle")}
                </p>
              </FadeIn>

              <Stagger className="grid grid-cols-1 gap-3">
                {benefits.map((benefit) => (
                  <StaggerItem key={benefit}>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-3.5 transition-all hover:border-brand/20">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                      <span className="text-sm font-medium text-foreground">{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Categories */}
            <div>
              <FadeIn>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("privateLabel.whatWeMake.title")}
                </h2>
              </FadeIn>

              <Stagger className="space-y-4" staggerDelay={0.15}>
                {whatWeMakeTexts.map((cat) => (
                  <StaggerItem key={cat.title}>
                    <div className="group rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5">
                      <div className="mb-2 flex items-center gap-3">
                        <Tag className="h-5 w-5 text-brand" />
                        <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
                      </div>
                      <p className="ml-8 text-sm leading-relaxed text-foreground-secondary">{cat.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <FadeIn delay={0.3}>
                <div className="mt-6 flex items-center gap-4 rounded-2xl border border-brand/20 bg-brand-light p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t("privateLabel.whatWeMake.timeline")}</p>
                    <p className="text-sm text-foreground-secondary">{t("privateLabel.whatWeMake.timelineNote")}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden bg-[#0a1628] py-24">
        <Image
          src="/images/pl-bg.jpg"
          alt="Private Label"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#111B51]/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("privateLabel.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
              {t("privateLabel.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Link
              href="/contact"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
            >
              {t("privateLabel.cta.button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
