"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { useI18n } from "@/lib/i18n";

const productsData = [
  { image: "/images/products/svk-main.png", categoryColor: "bg-emerald-500" },
  { image: "/images/products/bottle-left.png", categoryColor: "bg-blue-500" },
  { image: "/images/products/shampoo-left.png", categoryColor: "bg-purple-500" },
  { image: "/images/products/cleaner-right.png", categoryColor: "bg-emerald-500" },
  { image: "/images/products/soap-right.png", categoryColor: "bg-purple-500" },
  { image: "/images/product-1.png", categoryColor: "bg-emerald-500" },
  { image: "/images/product-2.png", categoryColor: "bg-emerald-500" },
  { image: "/images/product-3.png", categoryColor: "bg-blue-500" },
];

function ProductCard({
  title,
  category,
  image,
  categoryColor,
}: {
  title: string;
  category: string;
  image: string;
  categoryColor: string;
}) {
  return (
    <div className="group w-[280px] flex-shrink-0 select-none">
      {/* Image */}
      <div className="relative mb-4 flex h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-surface to-surface-alt transition-all duration-500 group-hover:shadow-xl group-hover:shadow-brand/10">
        <Image
          src={image}
          alt={title}
          width={200}
          height={280}
          className="pointer-events-none object-contain transition-transform duration-500 group-hover:scale-110"
          draggable={false}
        />
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-brand/20" />
      </div>

      {/* Info */}
      <div className="flex items-start gap-2">
        <div className={`mt-1.5 h-2 w-2 rounded-full ${categoryColor}`} />
        <div>
          <p className="text-xs font-medium text-foreground-muted">{category}</p>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export function CatalogPreview() {
  const { t } = useI18n();
  const itemTexts = t("home.catalogPreview.items") as { name: string; category: string }[];
  const products = productsData.map((p, i) => ({ ...p, title: itemTexts[i].name, category: itemTexts[i].category }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag state in refs to avoid re-renders during drag
  const drag = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    hasMoved: false,
    animFrame: 0,
  });

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    // Smooth scroll for button clicks only
    el.scrollTo({
      left: el.scrollLeft + (direction === "left" ? -400 : 400),
      behavior: "smooth",
    });
  };

  // --- Mouse drag handlers (no re-renders) ---

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current.isDown = true;
    drag.current.startX = e.pageX;
    drag.current.scrollLeft = el.scrollLeft;
    drag.current.lastX = e.pageX;
    drag.current.lastTime = Date.now();
    drag.current.velocity = 0;
    drag.current.hasMoved = false;
    cancelAnimationFrame(drag.current.animFrame);
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drag.current.isDown) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;

    const x = e.pageX;
    const dx = x - drag.current.startX;
    el.scrollLeft = drag.current.scrollLeft - dx;

    // Track velocity for momentum
    const now = Date.now();
    const dt = now - drag.current.lastTime;
    if (dt > 0) {
      drag.current.velocity = (x - drag.current.lastX) / dt;
    }
    drag.current.lastX = x;
    drag.current.lastTime = now;

    if (Math.abs(dx) > 5) {
      drag.current.hasMoved = true;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (!drag.current.isDown) return;
    drag.current.isDown = false;
    const el = scrollRef.current;
    if (!el) return;
    el.style.cursor = "";

    // Momentum scroll
    let velocity = drag.current.velocity * 150; // pixels
    if (Math.abs(velocity) > 10) {
      const decelerate = () => {
        velocity *= 0.92;
        if (Math.abs(velocity) < 0.5) return;
        el.scrollLeft -= velocity;
        drag.current.animFrame = requestAnimationFrame(decelerate);
      };
      drag.current.animFrame = requestAnimationFrame(decelerate);
    }

    // Prevent click if dragged
    if (drag.current.hasMoved) {
      const preventClick = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      el.addEventListener("click", preventClick, { capture: true, once: true });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (drag.current.isDown) {
      onMouseUp();
    }
  }, [onMouseUp]);

  return (
    <section id="catalog" className="overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <FadeIn>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("home.catalogPreview.title")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-lg text-foreground-secondary">
                {t("home.catalogPreview.subtitle")}
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollBy("left")}
                disabled={!canScrollLeft}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all hover:bg-surface-alt disabled:opacity-30 disabled:hover:bg-surface"
                aria-label={t("home.catalogPreview.scrollLeft") as string}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy("right")}
                disabled={!canScrollRight}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all hover:bg-surface-alt disabled:opacity-30 disabled:hover:bg-surface"
                aria-label={t("home.catalogPreview.scrollRight") as string}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20"
              >
                {t("home.catalogPreview.fullCatalog")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scrollable Track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={scrollRef}
          className="flex cursor-grab gap-6 overflow-x-auto px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-y" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
