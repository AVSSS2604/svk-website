"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SprayCan,
  Sparkles,
  ShieldCheck,
  Leaf,
  ArrowRight,
  Star,
  CheckCircle2,
  FlaskConical,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";
import { useI18n } from "@/lib/i18n";

const categoriesIcons = [SprayCan, Sparkles, Leaf, ShieldCheck];
const categoriesColors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-red-500"];

export default function HouseholdPage() {
  const { t } = useI18n();

  const categoriesTexts = t("household.categories.items") as { title: string; description: string; products: string[] }[];
  const categories = categoriesIcons.map((icon, i) => ({
    icon,
    color: categoriesColors[i],
    title: categoriesTexts[i].title,
    description: categoriesTexts[i].description,
    products: categoriesTexts[i].products,
  }));

  const brandsTexts = t("household.brands.items") as { name: string; description: string }[];

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0a1628] pt-28 pb-20">
        <Image
          src="/images/feature-bg.jpg"
          alt="Побутова хімія СВК"
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
                <span className="text-xs font-medium text-white/70">{t("household.hero.badge")}</span>
              </div>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {t("household.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("household.hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("household.hero.subtitle")}
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
                {t("household.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/catalog"
                className="inline-flex h-13 items-center rounded-full border border-white/20 px-8 text-sm font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                {t("household.hero.ctaSecondary")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("household.categories.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mx-auto max-w-2xl text-foreground-secondary">
                {t("household.categories.subtitle")}
              </p>
            </FadeIn>
          </div>

          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((cat) => (
              <StaggerItem key={cat.title}>
                <div className="group h-full rounded-3xl border border-border bg-white p-8 transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <cat.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                    </div>
                  </div>

                  <p className="mb-6 text-foreground-secondary leading-relaxed">{cat.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {cat.products.map((product) => (
                      <div key={product} className="flex items-center gap-2 rounded-lg bg-surface p-2.5 text-xs font-medium text-foreground-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand" />
                        {product}
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -left-20 top-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <FadeIn>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("household.brands.title")} <span className="text-brand">{t("household.brands.titleHighlight")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mb-8 text-lg text-foreground-secondary">
                  {t("household.brands.subtitle")}
                </p>
              </FadeIn>

              <Stagger className="space-y-4">
                {brandsTexts.map((brand) => (
                  <StaggerItem key={brand.name}>
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                        <Star className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{brand.name}</p>
                        <p className="text-sm text-foreground-muted">{brand.description}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-foreground-muted" />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <FadeIn direction="right">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/images/products/svk-main.png"
                  alt="Продукція СВК"
                  width={640}
                  height={480}
                  className="h-[500px] w-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Cosmetics Promo */}
      <section id="cosmetics-promo" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/products/shampoo-left.png"
                  alt={String(t("household.cosmeticsPromo.title"))}
                  width={640}
                  height={480}
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand backdrop-blur-sm">
                    <FlaskConical className="h-4 w-4" />
                    {t("household.cosmeticsPromo.badge")}
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Content */}
            <div>
              <FadeIn>
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {t("household.cosmeticsPromo.title")}{" "}
                  <span className="text-brand">{t("household.cosmeticsPromo.titleHighlight")}</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mb-8 text-lg leading-relaxed text-foreground-secondary">
                  {t("household.cosmeticsPromo.description")}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="mb-8 space-y-3">
                  {(t("household.cosmeticsPromo.features") as string[]).map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <Link
                  href="/cosmetics"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30"
                >
                  {t("household.cosmeticsPromo.button")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Private Label Promo */}
      <section id="private-label-promo" className="relative overflow-hidden bg-[#0a1628] py-24">
        <Image
          src="/images/private-label-bg.jpg"
          alt="Private Label"
          fill
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(17,27,81,0) 30%, rgb(17,27,81) 70%)" }} />
        <div className="absolute inset-0 bg-[#111B51]/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <Package className="h-4 w-4 text-brand" />
                  <span className="text-xs font-medium text-white/70">{t("household.privateLabelPromo.badge")}</span>
                </span>
              </motion.div>

              <motion.h2
                className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {t("household.privateLabelPromo.title")}{" "}
                <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                  {t("household.privateLabelPromo.titleHighlight")}
                </span>
              </motion.h2>

              <motion.p
                className="mb-8 max-w-lg text-lg leading-relaxed text-white/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {t("household.privateLabelPromo.description")}
              </motion.p>

              <motion.div
                className="mb-10 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {(t("household.privateLabelPromo.features") as string[]).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{f}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/private-label"
                  className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
                >
                  {t("household.privateLabelPromo.button")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right side — decorative image */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/images/pl/pl-main.jpg"
                  alt="Private Label СВК"
                  width={640}
                  height={480}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-brand py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t("household.cta.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-8 max-w-xl text-white/80">
              {t("household.cta.subtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/private-label"
                className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-8 text-sm font-semibold text-brand shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
              >
                {t("household.cta.button")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
