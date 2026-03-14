"use client";

import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n";

const postsData = [
  { image: "/images/blog/post-1.jpg", categoryColor: "bg-blue-500" },
  { image: "/images/blog/post-2.jpg", categoryColor: "bg-emerald-500" },
  { image: "/images/blog/post-3.jpg", categoryColor: "bg-purple-500" },
];

export function Blog() {
  const { t } = useI18n();
  const postTexts = t("home.blog.posts") as { title: string; excerpt: string; category: string; date: string }[];
  const posts = postsData.map((p, i) => ({ ...p, ...postTexts[i] }));

  return (
    <section id="blog" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <FadeIn>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("home.blog.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-lg text-foreground-secondary">
                {t("home.blog.subtitle")}
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-brand/20 px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
            >
              {t("home.blog.allArticles")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </FadeIn>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-white transition-all hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <div className="absolute left-4 top-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Date */}
                <div className="mb-3 flex items-center gap-1.5 text-xs text-foreground-muted">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>

                <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-foreground-secondary">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-all group-hover:gap-2">
                  {t("home.blog.readMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
