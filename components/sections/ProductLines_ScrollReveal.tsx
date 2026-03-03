"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const products = [
  {
    title: "Промислова хімія",
    description:
      "Мийні та дезінфікуючі засоби для харчової промисловості, HoReCa, виробничих підприємств. Сертифіковані формули з доведеною ефективністю.",
    image: "/images/about/card-1.jpg",
    badge: "B2B",
    accent: "from-blue-900/80 via-blue-900/60 to-transparent",
  },
  {
    title: "Побутова хімія",
    description:
      "Засоби для прання, прибирання, миття посуду. Безпечні формули для щоденного використання з високою ефективністю.",
    image: "/images/about/card-4.jpg",
    badge: "B2C",
    accent: "from-emerald-900/80 via-emerald-900/60 to-transparent",
  },
  {
    title: "Косметика",
    description:
      "Засоби по догляду за тілом та волоссям з урахуванням останніх наукових досліджень та актуальних трендів.",
    image: "/images/about/card-3.jpg",
    badge: "Beauty",
    accent: "from-purple-900/80 via-purple-900/60 to-transparent",
  },
  {
    title: "Private Label",
    description:
      "Повний цикл від розробки формули до готового продукту під вашим брендом. Мінімальне замовлення — від 1000 одиниць.",
    image: "/images/pl/pl-main.jpg",
    badge: "White Label",
    accent: "from-amber-900/80 via-amber-900/60 to-transparent",
  },
];

export function ProductLines() {
  return (
    <section id="products" className="bg-background">
      {products.map((product, i) => (
        <div
          key={product.title}
          className="sticky top-0"
          style={{ zIndex: i + 1 }}
        >
          <motion.div
            className="relative h-[85vh] min-h-[600px] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Image */}
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
            {/* Gradient overlay — left side */}
            <div className={`absolute inset-0 bg-gradient-to-r ${product.accent}`} />
            {/* Extra dark at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content — left aligned */}
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
                <motion.div
                  className="max-w-xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {/* Step indicator */}
                  <div className="mb-6 flex items-center gap-4">
                    <span className="font-mono text-5xl font-bold text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {product.badge}
                    </span>
                  </div>

                  <h3 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    {product.title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-white/70 sm:text-lg">
                    {product.description}
                  </p>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-all hover:gap-3"
                  >
                    Детальніше
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>

                {/* Progress dots */}
                <div className="mt-10 flex gap-2">
                  {products.map((_, j) => (
                    <div
                      key={j}
                      className={`h-1.5 rounded-full transition-all ${
                        j === i ? "w-8 bg-brand" : "w-1.5 bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
