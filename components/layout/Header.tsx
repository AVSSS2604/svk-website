"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, FlaskConical, Globe, ChevronDown } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

const languages = [
  { code: "uk" as Locale, label: "UA", full: "Українська" },
  { code: "ru" as Locale, label: "RU", full: "Русский" },
  { code: "en" as Locale, label: "EN", full: "English" },
];

const navLinks = [
  { href: "/about", key: "nav.about" },
  { href: "/industrial", key: "nav.industrial" },
  { href: "/household", key: "nav.household" },
  { href: "/catalog", key: "nav.catalog" },
  { href: "/blog", key: "nav.blog" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showSolid = isScrolled || !isHome || isMobileMenuOpen;
  const activeLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? "bg-white/90 shadow-sm backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              showSolid ? "bg-brand text-white" : "bg-white/10 text-white backdrop-blur-sm"
            }`}
          >
            <FlaskConical className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-lg font-bold leading-tight tracking-tight transition-colors ${
                showSolid ? "text-foreground" : "text-white"
              }`}
            >
              СВК
            </span>
            <span
              className={`text-[10px] leading-tight transition-colors ${
                showSolid ? "text-foreground-muted" : "text-white/60"
              }`}
            >
              {t("nav.since")}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand"
                    : showSolid
                      ? "text-foreground-secondary hover:bg-surface hover:text-foreground"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        {/* Language Switcher + CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                showSolid
                  ? "text-foreground-secondary hover:bg-surface hover:text-foreground"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              {activeLang.label}
              <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-1.5 min-w-[140px] overflow-hidden rounded-xl border border-border bg-white py-1 shadow-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm transition-colors hover:bg-surface ${
                      locale === lang.code
                        ? "font-semibold text-brand"
                        : "text-foreground-secondary"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{lang.label}</span>
                    <span>{lang.full}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className={`inline-flex h-10 items-center rounded-full px-6 text-sm font-semibold transition-all ${
              showSolid
                ? "bg-brand text-white hover:bg-brand-dark shadow-md shadow-brand/20"
                : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20"
            }`}
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden ${
            showSolid
              ? "text-foreground-secondary hover:bg-surface"
              : "text-white hover:bg-white/10"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu — Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed left-0 right-0 top-16 z-40 flex flex-col bg-white lg:hidden" style={{ height: "calc(100vh - 4rem)" }}>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pt-6 pb-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-brand-light text-brand"
                      : "text-foreground-secondary hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 border-t border-border pt-5 mt-4 px-1">
              <Globe className="h-4 w-4 text-foreground-muted" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    locale === lang.code
                      ? "bg-brand text-white"
                      : "text-foreground-secondary hover:bg-surface"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <Link
                href="/contact"
                className="flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark shadow-lg shadow-brand/20"
              >
                {t("nav.cta")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
