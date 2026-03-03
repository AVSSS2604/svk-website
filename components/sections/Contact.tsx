"use client";

import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/motion";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeIn>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Розпочніть співпрацю
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto max-w-2xl text-foreground-secondary">
              Опишіть задачу — і отримайте комерційну пропозицію
              з розрахунком вартості та термінів протягом 24 годин.
            </p>
          </FadeIn>
        </div>

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
                      <p className="font-semibold text-foreground">
                        Менеджер з продажу
                      </p>
                      <p className="text-sm text-foreground-muted">
                        Комерційний відділ
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground-secondary">
                    Готовий відповісти на питання щодо продукції, розрахувати
                    вартість та обговорити умови співпраці.
                  </p>
                </div>
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
                    <p className="text-sm font-semibold text-foreground">
                      +380 (XX) XXX-XX-XX
                    </p>
                    <p className="text-xs text-foreground-muted">Телефон</p>
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
                    <p className="text-sm font-semibold text-foreground">
                      info@svk.ua
                    </p>
                    <p className="text-xs text-foreground-muted">Email</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground-muted transition-transform group-hover:translate-x-1 group-hover:text-brand" />
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Україна, м. Київ
                    </p>
                    <p className="text-xs text-foreground-muted">Офіс та виробництво</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Пн — Пт: 9:00 — 18:00
                    </p>
                    <p className="text-xs text-foreground-muted">Графік роботи</p>
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
                Залишити заявку
              </h3>
              <p className="mb-8 text-sm text-foreground-muted">
                Заповніть форму і отримайте відповідь протягом 24 годин
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Ім&apos;я
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ваше ім'я"
                    className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email
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
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Телефон
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
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Компанія
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Назва компанії"
                    className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Повідомлення
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Опишіть вашу задачу: тип продукту, приблизні обсяги, вимоги..."
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-foreground-muted focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 sm:w-auto sm:px-10"
              >
                <Send className="h-4 w-4" />
                Надіслати заявку
              </button>

              <p className="mt-4 text-xs text-foreground-muted">
                Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
