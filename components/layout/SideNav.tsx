"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Головна" },
  { id: "products", label: "Продукція" },
  { id: "why-svk", label: "Переваги" },
  { id: "results", label: "Результати" },
  { id: "partners", label: "Партнери" },
  { id: "catalog", label: "Каталог" },
  { id: "process", label: "Процес" },
  { id: "blog", label: "Блог" },
  { id: "contact", label: "Контакти" },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

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
