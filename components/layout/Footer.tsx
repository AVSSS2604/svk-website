"use client";

import Link from "next/link";
import { FlaskConical, Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    {
      title: t("footer.products"),
      links: [
        { label: t("footer.industrialLink"), href: "/industrial" },
        { label: t("footer.householdLink"), href: "/household" },
        { label: t("footer.cosmeticsLink"), href: "/cosmetics" },
        { label: t("footer.privateLabelLink"), href: "/private-label" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.aboutLink"), href: "/about" },
        { label: t("footer.catalogLink"), href: "/catalog" },
        { label: t("footer.blogLink"), href: "/blog" },
        { label: t("footer.contactLink"), href: "/contact" },
      ],
    },
    {
      title: t("footer.info"),
      links: [
        { label: t("footer.certificates"), href: "/about" },
        { label: t("footer.production"), href: "/about" },
        { label: t("footer.laboratory"), href: "/about" },
        { label: t("footer.career"), href: "/contact" },
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                <FlaskConical className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight tracking-tight">
                  СВК
                </span>
                <span className="text-[10px] leading-tight text-white/50">
                  {t("footer.subtitle")}
                </span>
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              {t("footer.description")}
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
                {t("footer.location")}
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
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
