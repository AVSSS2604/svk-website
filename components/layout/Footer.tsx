import { FlaskConical, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Продукція",
    links: [
      { label: "Промислова хімія", href: "#" },
      { label: "Побутова хімія", href: "#" },
      { label: "Косметика", href: "#" },
      { label: "Private Label", href: "#" },
    ],
  },
  {
    title: "Компанія",
    links: [
      { label: "Про нас", href: "#" },
      { label: "Виробництво", href: "#" },
      { label: "Лабораторія", href: "#" },
      { label: "Сертифікати", href: "#" },
    ],
  },
  {
    title: "Інформація",
    links: [
      { label: "Блог", href: "#blog" },
      { label: "Каталог", href: "#catalog" },
      { label: "Кар'єра", href: "#" },
      { label: "Контакти", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight tracking-tight">
                  СВК
                </span>
                <span className="text-[10px] leading-tight text-white/50">
                  Науково-виробнича фірма
                </span>
              </div>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              Розробка та виробництво хімічної продукції з 1993 року.
              Індивідуальні формули, стабільна якість, масштабне виробництво.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+380XXXXXXXXX"
                className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-brand"
              >
                <Phone className="h-4 w-4" />
                +380 (XX) XXX-XX-XX
              </a>
              <a
                href="mailto:info@svk.ua"
                className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-brand"
              >
                <Mail className="h-4 w-4" />
                info@svk.ua
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Україна, м. Київ
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-white/80">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} СВК. Усі права захищені.
          </p>
          <p className="text-xs text-white/30">
            Розроблено{" "}
            <a
              href="https://vortexsite.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors hover:text-brand"
            >
              VORTEX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
