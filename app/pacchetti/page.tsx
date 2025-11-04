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
          className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f9ff] pt-28 pb-16 sm:pt-36 sm:pb-20"
        >
          <div className="absolute inset-0 -z-10 opacity-70" aria-hidden>
            <div className="absolute top-20 right-10 w-48 h-48 bg-sky-blue/10 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange/10 rotate-12" />
            <div className="absolute inset-0 bg-soft-grid" />
          </div>

          <PageLayoutContainer className="px-5 sm:px-10">
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


          {/* CARDS PACCHETTI */}
          <PageLayoutContainer className="mt-12 px-4 sm:px-6 md:px-8">
            <div className="mx-auto grid max-w-7xl gap-8 py-10 md:gap-10 lg:grid-cols-12 lg:py-12">
              {/* Set-Up Fee */}
              <Card
                className="relative flex cursor-pointer flex-col gap-6 sm:gap-7 md:gap-8 rounded-3xl border-2 border-orange bg-gradient-to-br from-orange/5 via-white to-orange/10 p-5 sm:p-7 md:p-12 shadow-xl md:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-orange/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-12 overflow-hidden"
                onClick={() => navigateTo("/pacchetti/set-up-fee")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
                role="link"
                tabIndex={0}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange/5 to-transparent rounded-full blur-2xl" />

                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-orange px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                        <Star className="w-4 h-4 mr-2 fill-white" />
                        {t("setup.badge")}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange border border-orange/30">
                        {t("setup.revShare")}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy text-clamp-2">{t("setup.title")}</h3>
                    <p className="text-lg text-gray-700 max-w-full md:max-w-2xl text-clamp-3">{t("setup.desc")}</p>
                  </div>
                  <div className="hidden lg:block">
                    <Sparkles className="w-16 h-16 text-orange" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                  <div className="space-y-4">
                  <h4 className="flex items-center gap-2 type-eyebrow text-orange">
                      <TrendingUp className="w-4 h-4" />
                      {t("setup.strategy")}
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {setupResearchItems.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex items-start gap-3">
                          <span className="text-orange font-bold mt-0.5">•</span>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                  <h4 className="flex items-center gap-2 type-eyebrow text-orange">
                      <Zap className="w-4 h-4" />
                      {t("setup.partnership")}
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {setupValueItems.map((item, idx) => (
                        <li key={`${item}-${idx}`} className="flex items-start gap-3">
                          <span className="text-orange font-bold mt-0.5">•</span>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center mt-4 relative z-10">
                  <Button
                    className="w-full sm:w-auto bg-orange hover:bg-orange/90 text-white shadow-xl hover:shadow-2xl hover:shadow-orange/30 px-8 py-4 text-lg"
                    onClick={handleContactClick}
                  >
                    {t("setup.cta")}
                  </Button>
                  <span className="text-sm text-gray-600 font-medium">
                    {t("setup.ideal")}
                  </span>
                </div>
              </Card>

              {/* Drive Test */}
              <Card
                className="relative flex cursor-pointer flex-col gap-5 sm:gap-6 md:gap-7 rounded-3xl border border-orange/40 bg-gradient-to-br from-orange/5 via-white to-sky-blue/5 p-5 sm:p-6 md:p-8 shadow-lg transition-all duration-500 hover:border-orange hover:shadow-xl hover:shadow-orange/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-4 overflow-hidden"
                onClick={() => navigateTo("/pacchetti/drive-test")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/drive-test")}
                role="link"
                tabIndex={0}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-sky-blue/10 rounded-full blur-xl" />

                <div className="relative z-10 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white shadow-md">
                      <Gauge className="w-3.5 h-3.5 mr-1" />
                      {t("driveTest.badge")}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-orange/30 bg-orange/10 px-3 py-1 type-eyebrow text-orange">
                      {t("driveTest.highlight")}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-navy text-clamp-2">{t("driveTest.title")}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-clamp-2">{t("driveTest.desc")}</p>
                </div>

                <div className="relative z-10 rounded-xl border border-orange/20 bg-white/80 p-4 sm:p-5">
                  <p className="mb-2 type-eyebrow text-orange">{t("driveTest.pricing.label")}</p>
                  <p className="text-sm text-gray-700">{t("driveTest.pricing.desc")}</p>
                </div>

                <ul className="relative z-10 space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3 rounded-lg bg-white/70 p-2.5">
                    <CalendarCheck className="mt-0.5 h-4 w-4 text-orange flex-shrink-0" />
                    <span>{t("driveTest.features.calendar")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-white/70 p-2.5">
                    <Users className="mt-0.5 h-4 w-4 text-orange flex-shrink-0" />
                    <span>{t("driveTest.features.target")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-white/70 p-2.5">
                    <BarChart3 className="mt-0.5 h-4 w-4 text-orange flex-shrink-0" />
                    <span>{t("driveTest.features.credit")}</span>
                  </li>
                </ul>

                <div className="relative z-10 mt-auto pt-4">
                  <Button
                    className="w-full bg-orange text-white shadow-md transition-all duration-300 hover:bg-orange/90 hover:shadow-lg"
                    onClick={(event) => {
                      event.stopPropagation()
                      navigateTo("/pacchetti/drive-test")
                    }}
                  >
                    {t("driveTest.cta")}
                  </Button>
                </div>
              </Card>

              {/* Performance */}
              <Card
                className="relative flex cursor-pointer flex-col gap-4 md:gap-6 rounded-2xl md:rounded-3xl border border-sky-blue/60 bg-gradient-to-br from-sky-blue/5 to-white p-3 sm:p-6 md:p-9 shadow-lg transition-all duration-500 hover:border-sky-blue hover:shadow-xl hover:shadow-sky-blue/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue lg:col-span-4 overflow-hidden"
                onClick={() => navigateTo("/pacchetti/performance")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
                role="link"
                tabIndex={0}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-blue/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />

                <div className="relative z-10 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-sky-blue/30 bg-sky-blue/20 px-3.5 py-1 text-xs font-semibold text-sky-blue">
                      {t("performance.badge")}
                    </span>
                    <span className="text-xs text-gray-500">{t("performance.setup")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy text-clamp-2 md:text-2xl lg:text-3xl">{t("performance.title")}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 text-clamp-2">{t("performance.desc")}</p>
                </div>

                <div className="relative z-10 rounded-xl border border-sky-blue/20 bg-sky-blue/5 p-4 sm:p-5">
                  <p className="mb-2 type-eyebrow text-sky-blue">{t("performance.pricing.label")}</p>
                  <p className="text-sm text-gray-700">{t("performance.pricing.desc")}</p>
                </div>

                <ul className="relative z-10 space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3 rounded-lg bg-white/60 p-2.5">
                    <span className="text-sky-blue font-bold mt-0.5">•</span>
                    <span>{t("performance.features.onboarding")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-white/60 p-2.5">
                    <span className="text-sky-blue font-bold mt-0.5">•</span>
                    <span>{t("performance.features.payPerResult")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-white/60 p-2.5">
                    <span className="text-sky-blue font-bold mt-0.5">•</span>
                    <span>{t("performance.features.reporting")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-white/60 p-2.5">
                    <span className="text-sky-blue font-bold mt-0.5">•</span>
                    <span>{t("performance.features.testing")}</span>
                  </li>
                </ul>

                <div className="relative z-10 mt-auto pt-4">
                  <Button className="w-full bg-sky-blue text-white shadow-md transition-all duration-300 hover:bg-sky-blue/90 hover:shadow-lg" onClick={handleContactClick}>
                    {t("performance.cta")}
                  </Button>
                </div>
              </Card>

              {/* Subscription */}
              <Card
                className="relative flex cursor-pointer flex-col gap-5 sm:gap-6 md:gap-7 rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 md:p-8 shadow-md transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-navy/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy lg:col-span-4 overflow-hidden"
                onClick={() => navigateTo("/pacchetti/subscription")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/subscription")}
                role="link"
                tabIndex={0}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-navy/5 rounded-full blur-xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-navy/3 rounded-full blur-lg" />

                <div className="relative z-10 space-y-3">
                  <span className="inline-flex items-center rounded-full bg-navy/10 px-3.5 py-1 text-xs font-semibold text-navy">
                    {t("subscription.badge")}
                  </span>
                  <h3 className="text-lg font-bold text-navy text-clamp-2 md:text-xl lg:text-2xl">{t("subscription.title")}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 text-clamp-2">{t("subscription.desc")}</p>
                </div>

                <div className="relative z-10 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">{t("subscription.pricing")}</p>
                </div>

                <ul className="relative z-10 space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3 rounded-lg bg-gray-50 p-2.5">
                    <span className="text-navy font-bold mt-0.5">•</span>
                    <span>{t("subscription.features.guaranteed")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-gray-50 p-2.5">
                    <span className="text-navy font-bold mt-0.5">•</span>
                    <span>{t("subscription.features.manager")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-gray-50 p-2.5">
                    <span className="text-navy font-bold mt-0.5">•</span>
                    <span>{t("subscription.features.meetings")}</span>
                  </li>
                  <li className="flex items-start gap-3 rounded-lg bg-gray-50 p-2.5">
                    <span className="text-navy font-bold mt-0.5">•</span>
                    <span>{t("subscription.features.refund")}</span>
                  </li>
                </ul>

                <div className="relative z-10 mt-auto pt-4">
                  <Button className="w-full bg-navy py-3 text-sm text-white transition-all duration-300 hover:bg-navy/90 hover:shadow-lg" onClick={handleContactClick}>
                    {t("subscription.cta")}
                  </Button>
                </div>
              </Card>

              {false && (
                <LeadPriceCalculator id="drive-test" variant="card" className="lg:col-span-12 cursor-default" />
              )}
            </div>
          </PageLayoutContainer>

          {/* trust indicator (già presente) */}
          <PageLayoutContainer className="px-4 sm:px-6">
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">{t("trustIndicator")}</p>
            </div>
          </PageLayoutContainer>
        </section>

        {/* GUIDA / COMPARISON (solo contenuti da t) */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-28 h-28 bg-sky-blue/5 rounded-full blur-3xl" />

          <PageLayoutContainer className="px-6 relative z-10">
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
