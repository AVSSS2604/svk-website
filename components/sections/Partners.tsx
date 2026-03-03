"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/motion";

const partners = [
  { name: "Prostor", logo: "/images/partners/prostor-logo.svg" },
  { name: "Сільпо", logo: "/images/partners/silpo-logo.svg" },
  { name: "АТБ", logo: "/images/partners/atb-logo.svg" },
  { name: "EVA", logo: "/images/partners/eva-logo.svg" },
];

export function Partners() {
  // Quadruple for seamless scroll
  const allPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section id="partners" className="overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="mb-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Довіра провідних компаній
          </h2>
        </FadeIn>
        <FadeIn className="mb-16 text-center" delay={0.15}>
          <p className="mx-auto max-w-2xl text-foreground-secondary">
            Продукція СВК представлена на полицях найбільших торговельних мереж
            України та використовується промисловими підприємствами по всій країні.
          </p>
        </FadeIn>
      </div>

      {/* Logo Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-scroll-logos items-center gap-16 hover:[animation-play-state:paused]">
          {allPartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex h-20 w-[180px] flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-white px-6 grayscale transition-all duration-300 hover:border-brand/20 hover:grayscale-0 hover:shadow-lg hover:shadow-brand/5"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={40}
                className="h-auto max-h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trust message */}
      <FadeIn className="mt-12 text-center" delay={0.3}>
        <p className="text-sm text-foreground-muted">
          Та понад <span className="font-semibold text-foreground">200+</span> інших компаній,
          які довіряють СВК свої проєкти
        </p>
      </FadeIn>
    </section>
  );
}
