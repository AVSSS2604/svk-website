"use client";

import Image from "next/image";
import { Microscope, Zap, Beaker, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";

const differentiators = [
  {
    icon: Microscope,
    title: "Власна лабораторія",
    description:
      "Сертифікована лабораторія з сучасним обладнанням. Багатоступеневий контроль якості кожної формули.",
    stat: "ISO 9001",
  },
  {
    icon: Zap,
    title: "Швидкість розробки",
    description:
      "Від заявки до готового зразка — 14 днів. Швидке прототипування та тестування.",
    stat: "14 днів",
  },
  {
    icon: Beaker,
    title: "Індивідуальні формули",
    description:
      "Розробка унікальних формул під конкретні задачі бізнесу. Адаптація під специфіку галузі.",
    stat: "300+",
  },
  {
    icon: TrendingUp,
    title: "Масштаб виробництва",
    description:
      "Потужне виробництво забезпечує стабільні поставки будь-яких обсягів без зривів термінів.",
    stat: "5M / міс",
  },
];

export function WhySVK() {
  return (
    <section id="why-svk" className="relative overflow-hidden bg-surface py-24">
      {/* Decorations */}
      <MolecularDecorationLight className="absolute -left-20 top-20 opacity-30" />
      <MolecularDecorationLight className="absolute -right-20 bottom-20 opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Photo with overlapping card */}
          <FadeIn>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/images/about/card-2.jpg"
                  alt="Виробництво СВК"
                  width={640}
                  height={480}
                  className="h-[400px] w-full object-cover lg:h-[520px]"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-white p-5 shadow-xl sm:-right-8"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="mb-1 font-mono text-3xl font-bold text-brand">30+</p>
                <p className="text-sm font-medium text-foreground-secondary">
                  Років безперервної
                  <br />
                  роботи на ринку
                </p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right — Content */}
          <div>
            <FadeIn>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Чому обирають{" "}
                <span className="text-brand">СВК</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mb-10 text-lg text-foreground-secondary">
                30+ років стабільної роботи — це не випадковість.
                Кожен аспект виробництва побудований на досвіді та науковому підході.
              </p>
            </FadeIn>

            {/* Differentiators Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {differentiators.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-white p-5 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-sm font-bold text-brand">
                      {item.stat}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground-secondary">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
