"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/motion";
import { MolecularDecorationLight } from "@/components/ui/molecular";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();

  const interestOptions = t("contactPage.interestOptions") as { value: string; label: string }[];

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative bg-[#0a1628] pt-28 pb-16">
        <Image
          src="/images/contact-bg.jpg"
          alt="Контакти СВК"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(17,27,81,0) 37.88%, rgb(17,27,81) 77.82%)" }} />
        <div className="absolute inset-0 bg-[#111B51]/60" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="py-12 text-center">
            <motion.h1
              className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {t("contactPage.hero.title")}{" "}
              <span className="bg-gradient-to-r from-[#059CD5] to-[#38BDF8] bg-clip-text text-transparent">
                {t("contactPage.hero.titleHighlight")}
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("contactPage.hero.subtitle")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section id="form" className="relative overflow-hidden bg-surface py-24">
        <MolecularDecorationLight className="absolute -left-20 top-20 opacity-20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                {/* Manager Card */}
                <div className="overflow-hidden rounded-3xl border border-border bg-white">
                  <div className="relative h-48">
                    <Image
                      src="/images/cta/team-photo.png"
                      alt="Команда СВК"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand">
                        <Image
                          src="/images/footer/manager-photo.jpg"
                          alt="Менеджер"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{t("contactPage.managerTitle")}</p>
                        <p className="text-sm text-foreground-muted">{t("contactPage.managerDept")}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground-secondary">
                      {t("contactPage.managerDesc")}
                    </p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="rounded-2xl border border-brand/20 bg-brand-light p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-brand" />
                    <p className="font-semibold text-foreground">{t("contactPage.quickTitle")}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground-secondary">
                    {t("contactPage.quickDesc")}
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  <a
                    href="tel:+380XXXXXXXXX"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{t("contactPage.phone")}</p>
                      <p className="text-xs text-foreground-muted">{t("contactPage.phoneLabel")}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </a>

                  <a
                    href="mailto:info@svk.ua"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition-all hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{t("contactPage.email")}</p>
                      <p className="text-xs text-foreground-muted">{t("contactPage.emailLabel")}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                  </a>

                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("contactPage.address")}</p>
                      <p className="text-xs text-foreground-muted">{t("contactPage.addressLabel")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t("contactPage.schedule")}</p>
                      <p className="text-xs text-foreground-muted">{t("contactPage.scheduleLabel")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form className="rounded-3xl border border-border bg-white p-8 shadow-lg shadow-black/5">
                <h3 className="mb-2 text-xl font-bold text-foreground">
                  {t("contactPage.formTitle")}
                </h3>
                <p className="mb-8 text-sm text-foreground-muted">
                  {t("contactPage.formSubtitle")}
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contactPage.nameLabel")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t("contactPage.namePlaceholder") as string}
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contactPage.emailLabel")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="email@company.com"
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contactPage.phoneLabel")}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+380"
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                      {t("contactPage.companyLabel")}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder={t("contactPage.companyPlaceholder") as string}
                      className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="interest" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contactPage.interestLabel")}
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option value="">{t("contactPage.interestDefault")}</option>
                    {interestOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    {t("contactPage.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t("contactPage.messagePlaceholder") as string}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 sm:w-auto sm:px-10"
                >
                  <Send className="h-4 w-4" />
                  {t("contactPage.submit")}
                </button>

                <p className="mt-4 text-xs text-foreground-muted">
                  {t("contactPage.consent")}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section id="map" className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-border bg-surface">
              <div className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 h-12 w-12 text-brand" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">{t("contactPage.mapTitle")}</h3>
                  <p className="text-foreground-secondary">{t("contactPage.address")}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{t("contactPage.mapNote")}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
