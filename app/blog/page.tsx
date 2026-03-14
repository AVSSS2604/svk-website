"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n";

const postsData = [
  { id: 1, image: "/images/blog/post-1.jpg", categoryColor: "bg-blue-500", featured: true },
  { id: 2, image: "/images/blog/post-2.jpg", categoryColor: "bg-emerald-500", featured: true },
  { id: 3, image: "/images/blog/post-3.jpg", categoryColor: "bg-purple-500", featured: false },
  { id: 4, image: "/images/blog/post-4.jpg", categoryColor: "bg-orange-500", featured: false },
  { id: 5, image: "/images/about/card-1.jpg", categoryColor: "bg-emerald-500", featured: false },
  { id: 6, image: "/images/about/card-2.jpg", categoryColor: "bg-blue-500", featured: false },
];

export default function BlogPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const blogCategories = t("blogPage.categories") as string[];
  const postsTexts = t("blogPage.posts") as { title: string; excerpt: string; category: string; date: string; readTime: string }[];
  const allPosts = postsData.map((p, i) => ({ ...p, ...postsTexts[i] }));

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = activeCategory === 0 || post.category === blogCategories[activeCategory];
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured || p !== featuredPost);

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
              {t("blogPage.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("blogPage.hero.titleHighlight")}
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("blogPage.hero.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="filters" className="border-b border-border bg-background py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(i)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === i
                      ? "bg-brand text-white shadow-md shadow-brand/20"
                      : "border border-border bg-white text-foreground-secondary hover:border-brand/20 hover:text-brand"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                placeholder={t("blogPage.search") as string}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section id="posts" className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Featured Post */}
              {featuredPost && (
                <motion.article
                  className="group mb-12 grid cursor-pointer grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5 lg:grid-cols-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative h-64 overflow-hidden lg:h-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${featuredPost.categoryColor}`}>
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <div className="mb-4 flex items-center gap-4 text-xs text-foreground-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="mb-4 text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-brand sm:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mb-6 text-foreground-secondary leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-all group-hover:gap-3">
                      {t("blogPage.readArticle")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </motion.article>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, i) => (
                  <motion.article
                    key={post.id}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${post.categoryColor}`}>
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-4 text-xs text-foreground-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                        {post.title}
                      </h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground-secondary">
                        {post.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2">
                        {t("blogPage.readMore")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-lg text-foreground-muted">{t("blogPage.empty")}</p>
                  <p className="mt-2 text-sm text-foreground-muted">{t("blogPage.emptyHint")}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
