"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Rocket,
  Crown,
  Sparkles,
  Star,
  Target,
  Users,
  CalendarCheck,
  BarChart3,
  Shield,
  Gauge,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { KeyboardEvent, MouseEvent } from "react"
import { useTranslations } from "next-intl"
import LeadPriceCalculator from "@/components/lead-price-calculator"
import { PageLayoutContainer } from "@/components/page-layout-container"

export default function PacchettiPage() {
  const router = useRouter()
  const t = useTranslations("pacchetti")

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
        {/* Hero Section */}
      <section id="pacchetti" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-10 w-48 h-48 bg-sky-blue/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-orange/10 rotate-12" />

        {/* Meno padding laterale su mobile */}
        <PageLayoutContainer className="px-4 sm:px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-orange/10 rounded-full">
              <span className="text-sm font-semibold text-orange">{t("hero.badge")}</span>
            </div>
            <h1 className="text-4xl lg:text-4xl font-bold text-navy leading-tight text-balance">{t("hero.title")}</h1>
            {/* max-w-full per dare più spazio al testo, override su mobile */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-3xl mx-auto">{t("hero.subtitle")}</p>
          </div>
        </PageLayoutContainer>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl"></div>

        <PageLayoutContainer className="px-1 sm:px-4 md:px-6">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-12 max-w-7xl mx-auto py-12 justify-center">
            {/* Set-Up Fee - PREMIUM HIGHLIGHT */}
            <Card
              className="relative flex cursor-pointer flex-col gap-6 md:gap-8 rounded-2xl md:rounded-3xl border-2 border-orange bg-gradient-to-br from-orange/5 via-white to-orange/10 p-3 sm:p-6 md:p-12 shadow-xl md:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-orange/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-12 overflow-hidden"
              onClick={() => navigateTo("/pacchetti/set-up-fee")}
              onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
              role="link"
              tabIndex={0}
          >
            {/* Enhanced decorative effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange/5 to-transparent rounded-full blur-2xl"></div>
            
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
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy">{t("setup.title")}</h3>
                <p className="text-lg text-gray-700 max-w-full md:max-w-2xl">{t("setup.desc")}</p>
              </div>
              <div className="hidden lg:block">
                <Sparkles className="w-16 h-16 text-orange" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-orange uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t("setup.strategy")}
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">{t("setup.features.customStrategy")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">{t("setup.features.dedicatedTeam")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">{t("setup.features.automation")}</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-orange uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {t("setup.partnership")}
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">{t("setup.features.revenueShare")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">{t("setup.features.priorityAccess")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                    <span className="font-medium">{t("setup.features.advisoryBoard")}</span>
                  </li>
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

          {/* Drive Test - NEW ENTRY */}
            <Card
              className="relative flex cursor-pointer flex-col gap-4 md:gap-6 rounded-2xl md:rounded-3xl border border-orange/40 bg-gradient-to-br from-orange/5 via-white to-sky-blue/5 p-3 sm:p-6 md:p-8 shadow-lg transition-all duration-500 hover:border-orange hover:shadow-xl hover:shadow-orange/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-4 overflow-hidden"
              onClick={() => navigateTo("/pacchetti/drive-test")}
              onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/drive-test")}
              role="link"
              tabIndex={0}
            >
            {/* Decorative effects for Drive Test */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-sky-blue/10 rounded-full blur-xl"></div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white shadow-md">
                  <Gauge className="w-3.5 h-3.5 mr-1" />
                  {t("driveTest.badge")}
                </span>
                <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-orange border border-orange/30">
                  {t("driveTest.highlight")}
                </span>
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-navy">{t("driveTest.title")}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t("driveTest.desc")}</p>
            </div>

            <div className="bg-white/80 rounded-xl p-4 border border-orange/20 relative z-10">
              <p className="text-xs font-semibold text-orange uppercase tracking-wider mb-2">{t("driveTest.pricing.label")}</p>
              <p className="text-sm text-gray-700">{t("driveTest.pricing.desc")}</p>
            </div>

            <ul className="space-y-3 text-sm text-gray-700 relative z-10">
              <li className="flex items-start gap-3">
                <CalendarCheck className="mt-0.5 h-4 w-4 text-orange flex-shrink-0" />
                <span>{t("driveTest.features.calendar")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="mt-0.5 h-4 w-4 text-orange flex-shrink-0" />
                <span>{t("driveTest.features.target")}</span>
              </li>
              <li className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 h-4 w-4 text-orange flex-shrink-0" />
                <span>{t("driveTest.features.credit")}</span>
              </li>
            </ul>

            <div className="mt-auto pt-3 relative z-10">
              <Button
                className="w-full bg-orange hover:bg-orange/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
                onClick={(event) => {
                  event.stopPropagation()
                  navigateTo("/pacchetti/drive-test")
                }}
              >
                {t("driveTest.cta")}
              </Button>
            </div>
          </Card>

          {/* Performance - MEDIUM HIGHLIGHT */}
            <Card
              className="relative flex cursor-pointer flex-col gap-4 md:gap-6 rounded-2xl md:rounded-3xl border border-sky-blue/60 bg-gradient-to-br from-sky-blue/5 to-white p-3 sm:p-6 md:p-9 shadow-lg transition-all duration-500 hover:border-sky-blue hover:shadow-xl hover:shadow-sky-blue/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue lg:col-span-4 overflow-hidden"
              onClick={() => navigateTo("/pacchetti/performance")}
              onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
              role="link"
              tabIndex={0}
          >
            {/* Decorative effects for Performance */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-blue/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl"></div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-sky-blue/20 px-3 py-1 text-xs font-semibold text-sky-blue border border-sky-blue/30">
                  {t("performance.badge")}
                </span>
                <span className="text-xs text-gray-500">{t("performance.setup")}</span>
              </div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-navy">{t("performance.title")}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{t("performance.desc")}</p>
            </div>

            <div className="bg-sky-blue/5 rounded-xl p-4 border border-sky-blue/20 relative z-10">
              <p className="text-xs font-semibold text-sky-blue uppercase tracking-wider mb-2">{t("performance.pricing.label")}</p>
              <p className="text-sm text-gray-700">{t("performance.pricing.desc")}</p>
            </div>

            <ul className="space-y-3 text-sm text-gray-700 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>{t("performance.features.onboarding")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>{t("performance.features.payPerResult")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>{t("performance.features.reporting")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                <span>{t("performance.features.testing")}</span>
              </li>
            </ul>

            <div className="mt-auto pt-4 relative z-10">
              <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white shadow-md hover:shadow-lg transition-all duration-300" onClick={handleContactClick}>
                {t("performance.cta")}
              </Button>
            </div>
          </Card>

          {/* Subscription - MINIMAL HIGHLIGHT */}
            <Card
              className="relative flex cursor-pointer flex-col gap-4 md:gap-5 rounded-2xl md:rounded-3xl border border-gray-300 bg-white p-4 sm:p-6 md:p-7 shadow-md transition-all duration-500 hover:shadow-lg hover:shadow-navy/10 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy lg:col-span-4 overflow-hidden"
              onClick={() => navigateTo("/pacchetti/subscription")}
              onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/subscription")}
              role="link"
              tabIndex={0}
          >
            {/* Decorative effects for Subscription */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-navy/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-navy/3 rounded-full blur-lg"></div>
            
            <div className="space-y-2 relative z-10">
              <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
                {t("subscription.badge")}
              </span>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-navy">{t("subscription.title")}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{t("subscription.desc")}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 relative z-10">
              <p className="text-xs text-gray-600">{t("subscription.pricing")}</p>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-700 relative z-10">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>{t("subscription.features.guaranteed")}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>{t("subscription.features.manager")}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>{t("subscription.features.meetings")}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                <span>{t("subscription.features.refund")}</span>
              </li>
            </ul>

            <div className="mt-auto pt-3 relative z-10">
              <Button className="w-full bg-navy hover:bg-navy/90 text-white text-sm py-2.5 transition-all duration-300" onClick={handleContactClick}>
                {t("subscription.cta")}
              </Button>
            </div>
          </Card>

          {/* Lead Price Calculator (temporarily disabled) */}
          {false && (
            <LeadPriceCalculator id="drive-test" variant="card" className="lg:col-span-12 cursor-default" />
          )}
          </div>
        </PageLayoutContainer>

        {/* Trust indicator */}
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500">{t("trustIndicator")}</p>
          </div>
        </PageLayoutContainer>

    </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-sky-blue/5 rounded-full blur-3xl" />
        
        <PageLayoutContainer className="px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-navy/10 px-4 py-2 rounded-full mb-6">
                <Target className="w-4 h-4 text-navy" />
                <span className="text-sm font-semibold text-navy">{t("guide.badge")}</span>
              </div>
              <h2 className="text-4xl lg:text-4xl font-bold text-navy mb-6 text-balance">
                {t("guide.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("guide.subtitle")}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Performance Card */}
              <Card className="relative p-8 bg-gradient-to-br from-sky-blue/5 to-white border-2 border-sky-blue/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-sky-blue overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-sky-blue/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-sky-blue/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-sky-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-navy">{t("guide.cards.performance.title")}</h4>
                      <p className="text-sm text-sky-blue font-semibold">{t("guide.cards.performance.tag")}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-bold text-navy mb-4">{t("guide.cards.performance.idealTitle")}</h5>
                    <ul className="space-y-3">
                      {t.raw("guide.cards.performance.ideal").map((text: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-sky-blue/5 rounded-lg p-4 border border-sky-blue/20">
                    <p className="text-sm font-semibold text-sky-blue mb-1">{t("guide.cards.performance.perfectForLabel")}</p>
                    <p className="text-sm text-gray-700">{t("guide.cards.performance.perfectFor")}</p>
                  </div>
                </div>
              </Card>

              {/* Subscription Card */}
              <Card className="relative p-8 bg-gradient-to-br from-orange/5 to-white border-2 border-orange/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center">
                      <CalendarCheck className="w-6 h-6 text-orange" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-navy">{t("guide.cards.subscription.title")}</h4>
                      <p className="text-sm text-orange font-semibold">{t("guide.cards.subscription.tag")}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-bold text-navy mb-4">{t("guide.cards.subscription.idealTitle")}</h5>
                    <ul className="space-y-3">
                      {t.raw("guide.cards.subscription.ideal").map((text: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-orange mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange/5 rounded-lg p-4 border border-orange/20">
                    <p className="text-sm font-semibold text-orange mb-1">{t("guide.cards.subscription.perfectForLabel")}</p>
                    <p className="text-sm text-gray-700">{t("guide.cards.subscription.perfectFor")}</p>
                  </div>
                </div>
              </Card>

              {/* Set-Up Fee Card */}
              <Card className="relative p-8 bg-gradient-to-br from-navy/5 to-white border-2 border-navy/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-navy overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-navy/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-navy/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-navy">{t("guide.cards.setup.title")}</h4>
                      <p className="text-sm text-navy font-semibold">{t("guide.cards.setup.tag")}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-base md:text-lg font-bold text-navy mb-4">{t("guide.cards.setup.idealTitle")}</h5>
                    <ul className="space-y-3">
                      {t.raw("guide.cards.setup.ideal").map((text: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-navy mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-navy/5 rounded-lg p-4 border border-navy/20">
                    <p className="text-sm font-semibold text-navy mb-1">{t("guide.cards.setup.perfectForLabel")}</p>
                    <p className="text-sm text-gray-700">{t("guide.cards.setup.perfectFor")}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional guidance */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-navy/5 via-sky-blue/5 to-orange/5 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-navy" />
                  <h3 className="text-xl font-bold text-navy">{t("guide.unsure.title")}</h3>
                </div>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">{t("guide.unsure.desc")}</p>
                <Button 
                  className="bg-navy hover:bg-navy/90 text-white px-8 py-3"
                  onClick={() => router.push('/contattaci')}
                >
                  {t("guide.unsure.cta")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      </div>
    </div>
  )
}
