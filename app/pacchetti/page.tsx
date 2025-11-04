"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Sparkles,
  Star,
  Target,
  Users,
  CalendarCheck,
  BarChart3,
  Gauge,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { KeyboardEvent, MouseEvent } from "react"
import { useTranslations } from "next-intl"
import LeadPriceCalculator from "@/components/lead-price-calculator"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { cn } from "@/lib/utils"

export default function PacchettiPage() {
  const router = useRouter()
  const t = useTranslations("pacchetti")
  const rawSetupResearch = t.raw("setup.researchItems") as unknown
  const rawSetupValue = t.raw("setup.valueItems") as unknown
  const setupResearchItems =
    Array.isArray(rawSetupResearch) && rawSetupResearch.length > 0
      ? (rawSetupResearch as string[])
      : [
          t("setup.features.customStrategy"),
          t("setup.features.dedicatedTeam"),
          t("setup.features.automation"),
        ]
  const setupValueItems =
    Array.isArray(rawSetupValue) && rawSetupValue.length > 0
      ? (rawSetupValue as string[])
      : [
          t("setup.features.revenueShare"),
          t("setup.features.priorityAccess"),
          t("setup.features.advisoryBoard"),
        ]

  const idealBlocks = [
    {
      key: "setup",
      image: "/ManoStella.png",
      imageAlt: t("guide.cards.setup.title"),
      title: t("guide.cards.setup.title"),
      tag: t("guide.cards.setup.tag"),
      idealTitle: t("guide.cards.setup.idealTitle"),
      idealPoints: (t.raw("guide.cards.setup.ideal") as string[]) ?? [],
      perfectLabel: t("guide.cards.setup.perfectForLabel"),
      perfectText: t("guide.cards.setup.perfectFor"),
      accent: {
        tag: "border-navy/30 bg-navy/10 text-navy",
        bullet: "text-navy",
        calloutBorder: "border-navy/20",
        calloutBg: "bg-navy/5",
        blob: "bg-navy/15",
      },
    },
    {
      key: "performance",
      image: "/newmedia/Performance_Hero.png",
      imageAlt: t("guide.cards.performance.title"),
      title: t("guide.cards.performance.title"),
      tag: t("guide.cards.performance.tag"),
      idealTitle: t("guide.cards.performance.idealTitle"),
      idealPoints: (t.raw("guide.cards.performance.ideal") as string[]) ?? [],
      perfectLabel: t("guide.cards.performance.perfectForLabel"),
      perfectText: t("guide.cards.performance.perfectFor"),
      accent: {
        tag: "border-sky-blue/30 bg-sky-blue/10 text-sky-blue",
        bullet: "text-sky-blue",
        calloutBorder: "border-sky-blue/20",
        calloutBg: "bg-sky-blue/5",
        blob: "bg-sky-blue/20",
      },
    },
    {
      key: "subscription",
      image: "/newmedia/Subscription_Hero.png",
      imageAlt: t("guide.cards.subscription.title"),
      title: t("guide.cards.subscription.title"),
      tag: t("guide.cards.subscription.tag"),
      idealTitle: t("guide.cards.subscription.idealTitle"),
      idealPoints: (t.raw("guide.cards.subscription.ideal") as string[]) ?? [],
      perfectLabel: t("guide.cards.subscription.perfectForLabel"),
      perfectText: t("guide.cards.subscription.perfectFor"),
      accent: {
        tag: "border-orange/30 bg-orange/10 text-orange",
        bullet: "text-orange",
        calloutBorder: "border-orange/20",
        calloutBg: "bg-orange/5",
        blob: "bg-orange/20",
      },
    },
  ]

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      navigateTo(path)
    }
  }

  const handleContactClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    navigateTo("/contattaci")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-24 right-24 h-72 w-72 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -left-20 h-56 w-56 rounded-full bg-sky-blue/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-64 w-16 -rotate-45 bg-navy/5" />
      <div className="relative z-10">
        {/* HERO */}
        <section
          id="pacchetti"
          className="hero-section relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f9ff]"
        >
          <div className="absolute inset-0 -z-10 opacity-70" aria-hidden>
            <div className="absolute top-20 right-10 w-48 h-48 bg-sky-blue/10 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange/10 rotate-12" />
            <div className="absolute inset-0 bg-soft-grid" />
          </div>

          <PageLayoutContainer>
            <div className="mx-auto max-w-5xl text-center space-y-6">
              <div className="inline-flex items-center justify-center rounded-full border border-orange/30 bg-orange/10 px-6 py-2">
                <span className="type-eyebrow text-orange">
                  {t("hero.badge")}
                </span>
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-[3.75rem]">
                {t("hero.title")}
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                {t("hero.subtitle")}
              </p>
            </div>
          </PageLayoutContainer>


          {/* CARDS PACCHETTI - Allineate alla struttura Home */}
          <PageLayoutContainer className="mt-12">
            <div className="mx-auto max-w-7xl space-y-10 py-10 lg:py-12">
              {/* SEZIONE 1: Setup Fee - Premium Hero Card (ridimensionata) */}
              <Card
                className="package-card-setup relative cursor-pointer overflow-hidden rounded-[1.5rem] border-orange bg-white p-6 sm:p-8 md:p-10"
                onClick={() => navigateTo("/pacchetti/set-up-fee")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
                role="link"
                tabIndex={0}
              >
                {/* Decorative elements */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange/8 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-orange/5 blur-2xl" aria-hidden="true" />

                <div className="package-card-spacing relative z-10">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="package-badge-primary bg-orange text-white">
                      <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                      {t("setup.badge")}
                    </span>
                    <span className="package-badge-secondary border-orange/40 bg-orange/10 text-orange">
                      {t("setup.revShare")}
                    </span>
                    <div className="ml-auto hidden lg:block">
                      <Sparkles className="h-12 w-12 text-orange opacity-15" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10 xl:gap-12">
                    {/* Left: Value Proposition & CTA */}
                    <div className="package-card-header">
                      <h3 className="package-card-title">{t("setup.title")}</h3>
                      <p className="package-card-description">{t("setup.desc")}</p>

                      <div className="mt-5 space-y-4">
                        <Button
                          className="package-cta bg-orange text-white hover:bg-orange/95"
                          onClick={handleContactClick}
                        >
                          {t("setup.cta")}
                        </Button>
                        <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
                          <p className="text-sm font-medium leading-relaxed text-gray-700">
                            {t("setup.ideal")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Features Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="package-section-header text-orange">
                          <TrendingUp className="h-4 w-4" aria-hidden="true" />
                          {t("setup.strategy")}
                        </h4>
                        <ul className="package-features-list">
                          {setupResearchItems.map((item, idx) => (
                            <li key={`research-${idx}`} className="package-feature-item bg-orange/5">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                              <span className="package-feature-text">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h4 className="package-section-header text-orange">
                          <Zap className="h-4 w-4" aria-hidden="true" />
                          {t("setup.partnership")}
                        </h4>
                        <ul className="package-features-list">
                          {setupValueItems.map((item, idx) => (
                            <li key={`value-${idx}`} className="package-feature-item bg-orange/5">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                              <span className="package-feature-text">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* SEZIONE 2: Performance + Subscription (affiancati) */}
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] xl:gap-8">
                {/* Performance Card */}
                <Card
                  className="package-card-performance relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-sky-blue/40 bg-white p-6 sm:p-7 md:p-8"
                  onClick={() => navigateTo("/pacchetti/performance")}
                  onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
                  role="link"
                  tabIndex={0}
                >
                  <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-sky-blue/8 blur-2xl" aria-hidden="true" />

                  <div className="package-card-spacing relative z-10">
                    {/* Badges */}
                    <div className="package-card-header">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="package-badge-primary bg-sky-blue text-white">
                          <Zap className="h-4 w-4" aria-hidden="true" />
                          {t("performance.badge")}
                        </span>
                        <span className="text-xs text-gray-500">{t("performance.setup")}</span>
                      </div>

                      <h3 className="package-card-title">{t("performance.title")}</h3>
                      <p className="package-card-description">{t("performance.desc")}</p>
                    </div>

                    {/* Pricing */}
                    <div className="package-info-box border-sky-blue/30 bg-sky-blue/5">
                      <span className="package-info-label text-sky-blue">
                        {t("performance.pricing.label")}
                      </span>
                      <p className="package-info-text text-gray-700">
                        {t("performance.pricing.desc")}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="package-features-list">
                      <li className="package-feature-item bg-sky-blue/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-blue" aria-hidden="true" />
                        <span className="package-feature-text">{t("performance.features.onboarding")}</span>
                      </li>
                      <li className="package-feature-item bg-sky-blue/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-blue" aria-hidden="true" />
                        <span className="package-feature-text">{t("performance.features.payPerResult")}</span>
                      </li>
                      <li className="package-feature-item bg-sky-blue/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-blue" aria-hidden="true" />
                        <span className="package-feature-text">{t("performance.features.reporting")}</span>
                      </li>
                      <li className="package-feature-item bg-sky-blue/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-blue" aria-hidden="true" />
                        <span className="package-feature-text">{t("performance.features.testing")}</span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button
                        className="package-cta bg-sky-blue text-white hover:bg-sky-blue/95"
                        onClick={handleContactClick}
                      >
                        {t("performance.cta")}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Subscription Card */}
                <Card
                  className="package-card-subscription relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-navy/30 bg-white p-6 sm:p-7 md:p-8"
                  onClick={() => navigateTo("/pacchetti/subscription")}
                  onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/subscription")}
                  role="link"
                  tabIndex={0}
                >
                  <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-navy/5 blur-xl" aria-hidden="true" />

                  <div className="package-card-spacing relative z-10">
                    {/* Badge */}
                    <div className="package-card-header">
                      <span className="package-badge-primary bg-navy text-white">
                        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                        {t("subscription.badge")}
                      </span>

                      <h3 className="package-card-title">{t("subscription.title")}</h3>
                      <p className="package-card-description">{t("subscription.desc")}</p>
                    </div>

                    {/* Pricing */}
                    <div className="package-info-box border-navy/20 bg-navy/5">
                      <p className="package-info-text text-gray-700">
                        {t("subscription.pricing")}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="package-features-list">
                      <li className="package-feature-item bg-navy/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" aria-hidden="true" />
                        <span className="package-feature-text">{t("subscription.features.guaranteed")}</span>
                      </li>
                      <li className="package-feature-item bg-navy/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" aria-hidden="true" />
                        <span className="package-feature-text">{t("subscription.features.manager")}</span>
                      </li>
                      <li className="package-feature-item bg-navy/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" aria-hidden="true" />
                        <span className="package-feature-text">{t("subscription.features.meetings")}</span>
                      </li>
                      <li className="package-feature-item bg-navy/5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" aria-hidden="true" />
                        <span className="package-feature-text">{t("subscription.features.refund")}</span>
                      </li>
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Button
                        className="package-cta bg-navy text-white hover:bg-navy/95"
                        onClick={handleContactClick}
                      >
                        {t("subscription.cta")}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* SEPARATORE VISIVO */}
              <div className="relative py-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t-2 border-dashed border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-6 text-sm font-medium text-gray-500">
                    Test il nostro servizio
                  </span>
                </div>
              </div>

              {/* SEZIONE 3: Drive Test (full width) */}
              <Card
                className="package-card-drive-test relative cursor-pointer overflow-hidden rounded-[1.5rem] border border-orange/40 bg-white p-6 sm:p-8 md:p-10"
                onClick={() => navigateTo("/pacchetti/drive-test")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/drive-test")}
                role="link"
                tabIndex={0}
              >
                <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-orange/8 blur-2xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-sky-blue/6 blur-xl" aria-hidden="true" />

                <div className="package-card-spacing relative z-10">
                  <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-10 xl:gap-12">
                    {/* Left: Header, Badges, Description */}
                    <div className="package-card-header">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="package-badge-primary bg-orange text-white">
                          <Gauge className="h-4 w-4" aria-hidden="true" />
                          {t("driveTest.badge")}
                        </span>
                        <span className="package-badge-secondary border-orange/30 bg-orange/10 text-orange">
                          {t("driveTest.highlight")}
                        </span>
                      </div>

                      <h3 className="package-card-title">{t("driveTest.title")}</h3>
                      <p className="package-card-description">{t("driveTest.desc")}</p>

                      {/* Pricing */}
                      <div className="package-info-box border-orange/30 bg-orange/5">
                        <span className="package-info-label text-orange">
                          {t("driveTest.pricing.label")}
                        </span>
                        <p className="package-info-text text-gray-700">
                          {t("driveTest.pricing.desc")}
                        </p>
                      </div>
                    </div>

                    {/* Right: Features + CTA */}
                    <div className="flex flex-col gap-6">
                      {/* Features */}
                      <ul className="package-features-list">
                        <li className="package-feature-item bg-orange/5">
                          <CalendarCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                          <span className="package-feature-text">{t("driveTest.features.calendar")}</span>
                        </li>
                        <li className="package-feature-item bg-orange/5">
                          <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                          <span className="package-feature-text">{t("driveTest.features.target")}</span>
                        </li>
                        <li className="package-feature-item bg-orange/5">
                          <BarChart3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" aria-hidden="true" />
                          <span className="package-feature-text">{t("driveTest.features.credit")}</span>
                        </li>
                      </ul>

                      {/* CTA */}
                      <div className="mt-auto">
                        <Button
                          className="package-cta bg-orange text-white hover:bg-orange/95"
                          onClick={(event) => {
                            event.stopPropagation()
                            navigateTo("/pacchetti/drive-test")
                          }}
                        >
                          {t("driveTest.cta")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </PageLayoutContainer>

          {/* trust indicator (già presente) */}
          <PageLayoutContainer>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">{t("trustIndicator")}</p>
            </div>
          </PageLayoutContainer>
        </section>

        {/* GUIDA / COMPARISON (solo contenuti da t) */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="absolute top-20 right-10 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-28 h-28 bg-sky-blue/5 rounded-full blur-3xl" />

          <PageLayoutContainer className="relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-navy/10 px-4 py-2 rounded-full mb-6">
                  <Target className="w-4 h-4 text-navy" />
                  <span className="text-sm font-semibold text-navy">{t("guide.badge")}</span>
                </div>
                <h2 className="text-4xl font-bold text-navy mb-4 text-balance">
                  {t("guide.title")}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("guide.subtitle")}</p>
              </div>

              <div className="space-y-16 lg:space-y-24">
                {idealBlocks.map((block, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <div
                      key={block.key}
                      className={cn(
                        "flex flex-col items-center gap-8 lg:gap-14",
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      )}
                    >
                      <div className="relative w-full max-w-[440px] flex-shrink-0">
                        <div className={cn("pointer-events-none absolute -top-12 -left-10 h-28 w-28 rounded-full blur-3xl", block.accent.blob)} />
                        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-xl ring-1 ring-black/5">
                          <Image
                            src={block.image}
                            alt={block.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="w-full max-w-2xl space-y-6">
                        <div className="space-y-3">
                          <span className={cn("inline-flex items-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]", block.accent.tag)}>
                            {block.tag}
                          </span>
                          <h3 className="text-2xl font-bold text-navy sm:text-3xl">{block.title}</h3>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                            {block.idealTitle}
                          </h4>
                          <ul className="space-y-3 text-base leading-relaxed text-gray-700">
                            {block.idealPoints.map((point, idx) => (
                              <li key={`${block.key}-${idx}`} className="flex items-start gap-3">
                                <span className={cn("mt-1 text-base font-bold", block.accent.bullet)}>•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className={cn("rounded-2xl border p-5 text-sm leading-relaxed sm:text-base", block.accent.calloutBg, block.accent.calloutBorder)}>
                          <p className={cn("mb-2 text-xs font-semibold uppercase tracking-[0.2em]", block.accent.bullet)}>
                            {block.perfectLabel}
                          </p>
                          <p className="text-gray-700">{block.perfectText}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </PageLayoutContainer>
        </section>
      </div>
    </div>
  )
}
