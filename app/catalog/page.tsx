"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  Factory,
  SprayCan,
  Heart,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n";

const categoryIcons = [Filter, Factory, SprayCan, Heart, Tag];
const categoryIds = ["all", "industrial", "household", "cosmetics", "private-label"];

import { productsData } from "@/lib/data/products";

export default function CatalogPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesLabels = t("catalogPage.categories") as string[];
  const categories = categoryIds.map((id, i) => ({ id, label: categoriesLabels[i], icon: categoryIcons[i] }));

  const productsTexts = t("catalogPage.products") as { name: string; description: string; application: string }[];
  const products = productsData.map((p, i) => ({ ...p, name: productsTexts[i].name, description: productsTexts[i].description, application: productsTexts[i].application }));

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative bg-[#0a1628] pt-28 pb-16">
        <div className="absolute inset-0 bg-[#111B51]/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="py-12 text-center">
            <motion.h1
              className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("catalogPage.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("catalogPage.hero.titleHighlight")}
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("catalogPage.hero.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section id="products-grid" className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                placeholder={t("catalogPage.search") as string}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl border border-border bg-surface pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-brand text-white shadow-md shadow-brand/20"
                      : "border border-border bg-white text-foreground-secondary hover:border-brand/20 hover:text-brand"
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={`/catalog/${product.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden bg-surface">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold text-brand">
                          {product.application}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-brand">
                        {product.name}
                      </h3>
                      <p className="mb-4 flex-1 text-xs leading-relaxed text-foreground-secondary">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-surface px-2.5 py-1 font-mono text-xs font-medium text-foreground-muted">
                          {product.volume}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-all group-hover:gap-1.5">
                          {t("catalogPage.details")}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-foreground-muted">{t("catalogPage.empty")}</p>
              <p className="mt-2 text-sm text-foreground-muted">{t("catalogPage.emptyHint")}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("catalogPage.ctaTitle")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mb-8 max-w-xl text-foreground-secondary">
              {t("catalogPage.ctaSubtitle")}
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <Link
              href="/contact"
              className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/40"
            >
              {t("catalogPage.ctaButton")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
