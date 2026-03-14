"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical,
  Award,
  Users,
  Factory,
  Target,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";
import { MolecularCanvas } from "@/components/ui/MolecularCanvas";
import { useCountUp } from "@/lib/hooks";
import { useI18n } from "@/lib/i18n";

const timelineYears = ["1993", "2000", "2010", "2018", "2024"];

const valuesIcons = [Target, Shield, Users, TrendingUp, FlaskConical, Award];

const statsData = [
  { target: 30 },
  { target: 2000 },
  { target: 150 },
  { target: 300 },
];

function StatBlock({ target, suffix, label, delay }: { target: number; suffix: string; label: string; delay: number }) {
  const { value, ref } = useCountUp(target, 2200);
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="mb-2 font-mono text-4xl font-bold text-brand lg:text-5xl">
        <span ref={ref}>{value}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-sm text-foreground-secondary">{label}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const { t } = useI18n();

  const statsTexts = t("about.stats") as { suffix: string; label: string }[];
  const stats = statsData.map((s, i) => ({ ...s, suffix: statsTexts[i].suffix, label: statsTexts[i].label }));

  const timelineTexts = t("about.timeline.items") as { title: string; description: string }[];
  const timeline = timelineYears.map((year, i) => ({ year, title: timelineTexts[i].title, description: timelineTexts[i].description }));

  const valuesTexts = t("about.values.items") as { title: string; description: string }[];
  const values = valuesIcons.map((icon, i) => ({ icon, title: valuesTexts[i].title, description: valuesTexts[i].description }));

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-[#0a1628] pt-28 pb-20">
        <Image
          src="/images/hero/hero-bg-2.jpg"
          alt="Виробництво СВК"
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
                <span className="text-xs font-medium text-white/70">{t("about.hero.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {t("about.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("about.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              className="max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("about.hero.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <StatBlock key={stat.label} {...stat} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section id="history" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -right-20 top-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <FadeIn direction="left">
              <div className="relative">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/images/about/card-1.jpg"
                    alt="Лабораторія СВК"
                    width={640}
                    height={480}
                    className="h-[400px] w-full object-cover lg:h-[520px]"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-white p-5 shadow-xl sm:-right-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                      <Factory className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-xl font-bold text-brand">5M+</p>
                      <p className="text-xs text-foreground-secondary">{t("about.content.floatStat")}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("about.content.title")} <span className="text-brand">{t("about.content.titleHighlight")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mb-6 text-lg leading-relaxed text-foreground-secondary">
                  {t("about.content.p1")}
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="mb-8 text-lg leading-relaxed text-foreground-secondary">
                  {t("about.content.p2")}
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <Link
                  href="/contact"
                  className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
                >
                  {t("about.content.cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative overflow-hidden bg-background py-24">
        {/* Animated molecular background */}
        <MolecularCanvas className="opacity-80" nodeCount={60} maxDistance={240} color="#059CD5" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("about.timeline.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-2xl text-foreground-secondary">
                {t("about.timeline.subtitle")}
              </p>
            </FadeIn>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 hidden h-full w-px bg-border md:left-1/2 md:-translate-x-px md:block" />

            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    className="relative flex flex-col gap-6 md:flex-row md:items-start"
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Left side */}
                    <div className="flex-1 md:pr-12">
                      {isLeft && (
                        <div className="rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 md:text-right">
                          <span className="mb-2 inline-block font-mono text-sm font-bold text-brand">{item.year}</span>
                          <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-6 top-6 hidden h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand shadow-md md:left-1/2 md:-translate-x-1/2 md:flex" />

                    {/* Right side */}
                    <div className="flex-1 md:pl-12">
                      {!isLeft && (
                        <div className="rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5">
                          <span className="mb-2 inline-block font-mono text-sm font-bold text-brand">{item.year}</span>
                          <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -left-20 bottom-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("about.values.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-2xl text-foreground-secondary">
                {t("about.values.subtitle")}
              </p>
            </FadeIn>
          </div>

          <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-border bg-white p-6 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="relative overflow-hidden bg-[#0a1628] py-24">
        <Image
          src="/images/about/card-3.jpg"
          alt="Виробництво"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[#111B51]/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("about.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
              {t("about.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
              >
                {t("about.cta.primary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex h-13 items-center rounded-full border border-white/20 px-8 text-sm font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                {t("about.cta.secondary")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
