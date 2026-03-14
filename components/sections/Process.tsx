"use client";

import {
  FileText,
  Search,
  Beaker,
  TestTubeDiagonal,
  Factory,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n";

const stepIcons = [FileText, Search, Beaker, TestTubeDiagonal, Factory, Truck];

export function Process() {
  const { t } = useI18n();
  const stepTexts = t("home.process.steps") as { title: string; description: string }[];
  const steps = stepIcons.map((icon, i) => ({
    icon,
    title: stepTexts[i].title,
    description: stepTexts[i].description,
  }));

  return (
    <section id="process" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t("home.process.title")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto max-w-2xl text-foreground-secondary">
              {t("home.process.subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[52px] hidden h-[2px] bg-gradient-to-r from-transparent via-brand/20 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="group relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step Number Circle */}
                <div className="relative z-10 mb-4 flex h-[104px] w-[104px] items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand/20 transition-colors group-hover:border-brand/40" />
                  {/* Inner circle */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-brand/10 transition-all group-hover:bg-brand group-hover:shadow-brand/30">
                    <step.icon className="h-6 w-6 text-brand transition-colors group-hover:text-white" />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-1 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand font-mono text-xs font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline note */}
        <FadeIn className="mt-16 text-center" delay={0.5}>
          <div className="inline-flex items-center gap-3 rounded-full border border-brand/20 bg-brand-light px-6 py-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-brand" />
            <span className="text-sm font-semibold text-brand-dark">
              {t("home.process.note")}
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
