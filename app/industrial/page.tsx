"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Droplets,
  Flame,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Beaker,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";
import { useI18n } from "@/lib/i18n";

const sectorsData = [
  { icon: Factory, image: "/images/about/card-4.jpg" },
  { icon: Droplets, image: "/images/about/card-1.jpg" },
  { icon: Flame, image: "/images/about/card-2.jpg" },
  { icon: Wrench, image: "/images/about/card-3.jpg" },
];

export default function IndustrialPage() {
  const { t } = useI18n();

  const sectorsTexts = t("industrial.sectors.items") as { title: string; description: string; features: string[] }[];
  const sectors = sectorsData.map((s, i) => ({ ...s, title: sectorsTexts[i].title, description: sectorsTexts[i].description, features: sectorsTexts[i].features }));

  const advantages = t("industrial.advantages.items") as string[];

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0a1628] pt-28 pb-20">
        <Image
          src="/images/industrial-bg.jpg"
          alt="Промислова хімія СВК"
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
                <span className="text-xs font-medium text-white/70">{t("industrial.hero.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {t("industrial.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("industrial.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("industrial.hero.subtitle")}
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
                {t("industrial.hero.cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section id="sectors" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("industrial.sectors.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-2xl text-foreground-secondary">
                {t("industrial.sectors.subtitle")}
              </p>
            </FadeIn>
          </div>

          <div className="space-y-16">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.title}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="overflow-hidden rounded-3xl">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      width={640}
                      height={400}
                      className="h-[350px] w-full object-cover"
                    />
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand">
                    <sector.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">{sector.title}</h3>
                  <p className="mb-6 text-foreground-secondary leading-relaxed">{sector.description}</p>

                  <ul className="mb-8 space-y-3">
                    {sector.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-foreground-secondary">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all hover:gap-3"
                  >
                    {t("industrial.sectors.learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -right-20 top-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <FadeIn>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("industrial.advantages.title")} <span className="text-brand">{t("industrial.advantages.titleHighlight")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mb-8 text-lg text-foreground-secondary">
                  {t("industrial.advantages.subtitle")}
                </p>
              </FadeIn>

              <Stagger className="space-y-4">
                {advantages.map((adv) => (
                  <StaggerItem key={adv}>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 transition-all hover:border-brand/20 hover:shadow-md">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light">
                        <CheckCircle2 className="h-4 w-4 text-brand" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{adv}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <FadeIn direction="right">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl">
                    <Image src="/images/about/card-1.jpg" alt="Лабораторія" width={300} height={200} className="h-48 w-full object-cover" />
                  </div>
                  <div className="rounded-2xl border border-border bg-white p-5 text-center">
                    <Beaker className="mx-auto mb-2 h-8 w-8 text-brand" />
                    <p className="font-mono text-2xl font-bold text-brand">300+</p>
                    <p className="text-xs text-foreground-secondary">формул</p>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-border bg-white p-5 text-center">
                    <ShieldCheck className="mx-auto mb-2 h-8 w-8 text-brand" />
                    <p className="font-mono text-2xl font-bold text-brand">ISO</p>
                    <p className="text-xs text-foreground-secondary">9001 сертифікат</p>
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <Image src="/images/about/card-2.jpg" alt="Виробництво" width={300} height={200} className="h-48 w-full object-cover" />
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
              {t("industrial.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-8 max-w-xl text-white/80">
              {t("industrial.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Link
              href="/contact"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-8 text-sm font-semibold text-brand shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
            >
              {t("industrial.cta.button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
