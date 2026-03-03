"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  type Variant,
} from "motion/react";

/* ─── Scroll Fade-In ─────────────────────────────────────────────── */

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(4px)", ...directionOffset[direction] }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 }
          : undefined
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger Container ──────────────────────────────────────────── */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger Item ───────────────────────────────────────────────── */

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: StaggerItemProps) {
  const hidden: Variant =
    direction === "up"
      ? { opacity: 0, y: 30, filter: "blur(4px)" }
      : direction === "left"
        ? { opacity: 0, x: -30, filter: "blur(4px)" }
        : { opacity: 0, x: 30, filter: "blur(4px)" };

  const visible: Variant = {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0, 1] },
  };

  return (
    <motion.div className={className} variants={{ hidden, visible }}>
      {children}
    </motion.div>
  );
}
