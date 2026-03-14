"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Droplets,
  Sun,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";
import { useI18n } from "@/lib/i18n";

const linesData = [
  { icon: Droplets, image: "/images/products/shampoo-left.png" },
  { icon: Heart, image: "/images/products/soap-right.png" },
  { icon: Sun, image: "/images/products/bottle-left.png" },
  { icon: Sparkles, image: "/images/products/cleaner-right.png" },
];

export default function CosmeticsPage() {
  const { t } = useI18n();

  const linesTexts = t("cosmetics.lines.items") as { title: string; description: string }[];
  const cosmeticLines = linesData.map((l, i) => ({ ...l, title: linesTexts[i].title, description: linesTexts[i].description }));

  const certifications = t("cosmetics.certifications.items") as string[];

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0a1628] pt-28 pb-20">
        <Image
          src="/images/contact-bg.jpg"
          alt="Косметика СВК"
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
                <span className="text-xs font-medium text-white/70">{t("cosmetics.hero.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {t("cosmetics.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("cosmetics.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("cosmetics.hero.subtitle")}
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
                {t("cosmetics.hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section id="product-lines" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("cosmetics.lines.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-2xl text-foreground-secondary">
                {t("cosmetics.lines.subtitle")}
              </p>
            </FadeIn>
          </div>

          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {cosmeticLines.map((line) => (
              <StaggerItem key={line.title}>
                <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5">
                  <div className="relative h-56 overflow-hidden bg-surface">
                    <Image
                      src={line.image}
                      alt={line.title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <line.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{line.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-foreground-secondary">{line.description}</p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2"
                    >
                      {t("cosmetics.lines.learnMore")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -right-20 bottom-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <FadeIn>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("cosmetics.certifications.title")} <span className="text-brand">{t("cosmetics.certifications.titleHighlight")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mb-8 text-lg text-foreground-secondary">
                  {t("cosmetics.certifications.subtitle")}
                </p>
              </FadeIn>

              <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <StaggerItem key={cert}>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-brand/20">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                      <span className="text-sm font-medium text-foreground">{cert}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <FadeIn direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center rounded-2xl border border-border bg-white p-8">
                    <Leaf className="h-16 w-16 text-brand" />
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-6 text-center">
                    <p className="font-mono text-3xl font-bold text-brand">GMP</p>
                    <p className="mt-1 text-xs text-foreground-secondary">ISO 22716</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="rounded-2xl border border-border bg-white p-6 text-center">
                    <p className="font-mono text-3xl font-bold text-brand">100%</p>
                    <p className="mt-1 text-xs text-foreground-secondary">Дерматологічно тестовано</p>
                  </div>
                  <div className="flex items-center justify-center rounded-2xl border border-border bg-white p-8">
                    <Shield className="h-16 w-16 text-brand" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-brand py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t("cosmetics.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-8 max-w-xl text-white/80">
              {t("cosmetics.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-8 text-sm font-semibold text-brand shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
              >
                {t("cosmetics.cta.button")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/private-label"
                className="inline-flex h-13 items-center rounded-full border border-white/30 px-8 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
              >
                Private Label
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
