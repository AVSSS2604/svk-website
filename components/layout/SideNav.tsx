"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

/* Section configs per page */
const pageSections: Record<string, { id: string; key: string }[]> = {
  "/": [
    { id: "hero", key: "sideNav.hero" },
    { id: "products", key: "sideNav.products" },
    { id: "why-svk", key: "sideNav.whySvk" },
    { id: "results", key: "sideNav.results" },
    { id: "partners", key: "sideNav.partners" },
    { id: "catalog", key: "sideNav.catalog" },
    { id: "process", key: "sideNav.process" },
    { id: "blog", key: "sideNav.blog" },
    { id: "contact", key: "sideNav.contact" },
  ],
};

export function SideNav() {
  const { t } = useI18n();
  const pathname = usePathname();

  /* Detect page sections from DOM on inner pages */
  const [dynamicSections, setDynamicSections] = useState<
    { id: string; label: string }[]
  >([]);

  const configSections = pageSections[pathname];

  const sections = useMemo(() => {
    if (configSections) {
      return configSections.map((s) => ({ id: s.id, label: t(s.key) }));
    }
    return dynamicSections;
  }, [configSections, dynamicSections, t]);

  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  /* On inner pages, scan DOM for <section id="..."> elements */
  useEffect(() => {
    if (configSections) return; // homepage uses static config
    const timer = setTimeout(() => {
      const found: { id: string; label: string }[] = [];
      document.querySelectorAll("section[id]").forEach((el) => {
        const id = el.getAttribute("id");
        if (id) {
          /* Try to find the first heading inside the section */
          const heading = el.querySelector("h2, h3, h1");
          const headingText = heading?.textContent?.trim();
          /* Use first 2 words from heading, or prettified id */
          const label = headingText
            ? headingText.split(/\s+/).slice(0, 3).join(" ")
            : id.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
          found.push({ id, label });
        }
      });
      setDynamicSections(found);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname, configSections]);

  /* Reset active section on page change */
  useEffect(() => {
    setActiveSection("");
    setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (!isVisible || sections.length === 0) return null;

  return (
    <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex">
      <div className="flex flex-col items-end gap-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group flex items-center gap-3"
              title={section.label}
            >
              {/* Label — appears on hover */}
              <span
                className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-brand opacity-100"
                    : "text-foreground-muted opacity-0 group-hover:opacity-100"
                }`}
              >
                {section.label}
              </span>

              {/* Dot / bar indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "h-6 w-1.5 bg-brand"
                    : "h-1.5 w-1.5 bg-foreground-muted/40 group-hover:bg-brand/60"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
