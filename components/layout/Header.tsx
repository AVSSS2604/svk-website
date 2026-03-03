"use client";

import { useState, useEffect } from "react";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
  { href: "#products", label: "Продукція" },
  { href: "#why-svk", label: "Переваги" },
  { href: "#results", label: "Результати" },
  { href: "#partners", label: "Партнери" },
  { href: "#catalog", label: "Каталог" },
  { href: "#process", label: "Процес" },
  { href: "#blog", label: "Блог" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 shadow-sm backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isScrolled ? "bg-brand text-white" : "bg-white/10 text-white backdrop-blur-sm"
            }`}
          >
            <FlaskConical className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold leading-tight tracking-tight transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              СВК
            </span>
            <span
              className={`text-[10px] leading-tight transition-colors ${
                isScrolled ? "text-foreground-muted" : "text-white/60"
              }`}
            >
              з 1993 року
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground-secondary hover:bg-surface hover:text-foreground"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className={`inline-flex h-10 items-center rounded-full px-6 text-sm font-semibold transition-all ${
              isScrolled
                ? "bg-brand text-white hover:bg-brand-dark shadow-md shadow-brand/20"
                : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20"
            }`}
          >
            Зв&apos;язатись
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden ${
            isScrolled
              ? "text-foreground-secondary hover:bg-surface"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-white px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Зв&apos;язатись
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
