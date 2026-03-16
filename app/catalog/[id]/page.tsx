"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Package,
  FlaskConical,
  Sparkles,
  BookOpen,
  Box,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n";
import { productsData, getRelatedProducts } from "@/lib/data/products";

interface ProductText {
  name: string;
  description: string;
  application: string;
  features?: string[];
  specs?: { label: string; value: string }[];
  usage?: string;
  packaging?: string[];
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { t } = useI18n();

  const productId = parseInt(id, 10);
  const productData = productsData.find((p) => p.id === productId);

  const productsTexts = t("catalogPage.products") as ProductText[];
  const detail = t("catalogPage.productDetail") as Record<string, string>;

  if (!productData || !productsTexts[productId - 1]) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-background pt-28">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-foreground">404</h1>
          <p className="mb-8 text-foreground-secondary">Product not found</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            {detail.backToCatalog}
          </Link>
        </div>
      </section>
    );
  }

  const productText = productsTexts[productId - 1];
  const relatedProductsData = getRelatedProducts(productData);
  const relatedTexts = relatedProductsData.map((rp) => ({
    ...rp,
    ...productsTexts[rp.id - 1],
  }));

  const categoryLabels: Record<string, string> = {
    industrial: (t("catalogPage.categories") as string[])[1],
    household: (t("catalogPage.categories") as string[])[2],
    cosmetics: (t("catalogPage.categories") as string[])[3],
    "private-label": (t("catalogPage.categories") as string[])[4],
  };

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative overflow-hidden bg-[#0a1628] pt-28 pb-16">
        <div className="absolute inset-0 bg-[#111B51]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 py-8 lg:grid-cols-2 lg:py-16">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  onClick={() => router.push("/catalog")}
                  className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {detail.backToCatalog}
                </button>
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                  <span className="text-xs font-medium text-white/70">
                    {categoryLabels[productData.categoryId]} · {productText.application}
                  </span>
                </span>
              </motion.div>

              <motion.h1
                className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {productText.name}
              </motion.h1>

              <motion.p
                className="mb-8 max-w-lg text-lg leading-relaxed text-white/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {productText.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
                >
                  {detail.orderProduct}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                  <Package className="h-4 w-4 text-brand" />
                  <span className="text-sm font-medium text-white/80">{productData.volume}</span>
                </div>
              </motion.div>
            </div>

            {/* Product Image */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
                {/* Glow behind product */}
                <div className="absolute inset-0 rounded-full bg-brand/10 blur-3xl" />
                <Image
                  src={productData.image}
                  alt={productText.name}
                  fill
                  className="relative z-10 object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs */}
      {productText.specs && productText.specs.length > 0 && (
        <section id="specs" className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <FadeIn>
                <div className="mb-4 flex items-center justify-center gap-3">
                  <FlaskConical className="h-6 w-6 text-brand" />
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {detail.specsTitle}
                  </h2>
                </div>
              </FadeIn>
            </div>

            <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {productText.specs.map((spec, i) => (
                <StaggerItem key={i}>
                  <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-white p-6 text-center transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground-muted">
                      {spec.label}
                    </p>
                    <p className="text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                      {spec.value}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Features */}
      {productText.features && productText.features.length > 0 && (
        <section id="features" className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <div className="mb-4 flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-brand" />
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {detail.featuresTitle}
                    </h2>
                  </div>
                </FadeIn>

                <Stagger className="mt-8 space-y-4">
                  {productText.features.map((feature, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-4 transition-all hover:border-brand/20 hover:shadow-md">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light">
                          <CheckCircle2 className="h-4 w-4 text-brand" />
                        </div>
                        <span className="text-sm font-medium leading-relaxed text-foreground">
                          {feature}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <FadeIn direction="right">
                <div className="relative flex items-center justify-center">
                  <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px]">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 to-brand/10" />
                    <Image
                      src={productData.image}
                      alt={productText.name}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Usage & Packaging */}
      {(productText.usage || (productText.packaging && productText.packaging.length > 0)) && (
        <section id="usage" className="bg-background py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Usage */}
              {productText.usage && (
                <FadeIn>
                  <div className="rounded-2xl border border-border bg-white p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                        <BookOpen className="h-6 w-6 text-brand" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {detail.usageTitle}
                      </h3>
                    </div>
                    <p className="leading-relaxed text-foreground-secondary">
                      {productText.usage}
                    </p>
                  </div>
                </FadeIn>
              )}

              {/* Packaging */}
              {productText.packaging && productText.packaging.length > 0 && (
                <FadeIn delay={0.15}>
                  <div className="rounded-2xl border border-border bg-white p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light">
                        <Box className="h-6 w-6 text-brand" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {detail.packagingTitle}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {productText.packaging.map((pkg, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-foreground-secondary"
                        >
                          <div className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                          {pkg}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedTexts.length > 0 && (
        <section id="related" className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <FadeIn>
                <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {detail.relatedTitle}
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-foreground-secondary">{detail.relatedSubtitle}</p>
              </FadeIn>
            </div>

            <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTexts.map((rp) => (
                <StaggerItem key={rp.id}>
                  <Link
                    href={`/catalog/${rp.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                  >
                    <div className="relative h-48 overflow-hidden bg-surface">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold text-brand">
                          {rp.application}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                        {rp.name}
                      </h3>
                      <p className="mb-4 flex-1 text-xs leading-relaxed text-foreground-secondary">
                        {rp.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-surface px-2.5 py-1 font-mono text-xs font-medium text-foreground-muted">
                          {rp.volume}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-all group-hover:gap-1.5">
                          {t("catalogPage.details") as string}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      <section id="cta" className="bg-brand py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {detail.ctaTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-8 max-w-xl text-white/80">
              {detail.ctaSubtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Link
              href="/contact"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-8 text-sm font-semibold text-brand shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
            >
              {detail.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
