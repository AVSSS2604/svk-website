"use client";

import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/motion";

const posts = [
  {
    title: "Тренди промислової хімії 2026: що змінюється",
    excerpt:
      "Огляд ключових тенденцій у галузі промислової хімії: екологічність, біорозкладність та нові стандарти безпеки.",
    category: "Індустрія",
    date: "28 лютого 2026",
    image: "/images/blog/post-1.jpg",
    categoryColor: "bg-blue-500",
  },
  {
    title: "Private Label: як запустити власну лінійку за 30 днів",
    excerpt:
      "Покроковий гайд по створенню власного бренду побутової хімії або косметики — від ідеї до полиці магазину.",
    category: "Бізнес",
    date: "15 лютого 2026",
    image: "/images/blog/post-2.jpg",
    categoryColor: "bg-emerald-500",
  },
  {
    title: "Контроль якості: як працює лабораторія СВК",
    excerpt:
      "Які тести проходить кожна формула перед запуском у серійне виробництво.",
    category: "Виробництво",
    date: "3 лютого 2026",
    image: "/images/blog/post-3.jpg",
    categoryColor: "bg-purple-500",
  },
];

export function Blog() {
  return (
    <section id="blog" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <FadeIn>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Новини та аналітика
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-lg text-foreground-secondary">
                Експертні матеріали про хімічну промисловість,
                тренди ринку та виробничі інсайти.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-brand/20 px-5 py-2.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
            >
              Усі статті
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
                  Читати далі
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
