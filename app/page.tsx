"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Sparkles, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { KeyboardEvent, MouseEvent } from "react"
import { FAQCards } from "@/components/faq-cards"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import LeadPriceCalculator from "@/components/lead-price-calculator"
import { LayoutWrapper, FullWidthLayoutWrapper, CenteredLayoutWrapper } from "@/components/layout-wrapper"

export default function HomePage() {
  const router = useRouter()
  const t = useTranslations("home")
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"aycl-discovery"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden sm:pt-32 sm:pb-20">
        {/* Geometric decorations */}
        <div className="absolute top-16 right-4 w-20 h-20 bg-sky-blue/10 rotate-12 rounded-lg sm:top-20 sm:right-10 sm:w-32 sm:h-32" />
        <div className="absolute top-32 left-4 w-16 h-16 bg-orange/10 rounded-full sm:top-40 sm:left-10 sm:w-24 sm:h-24" />
        <div className="absolute bottom-6 right-1/4 w-12 h-32 bg-navy/5 -rotate-45 sm:bottom-10 sm:w-16 sm:h-48" />

        <div className="container mx-auto px-4 sm:px-6">
          <LayoutWrapper>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-block px-3 py-1.5 bg-gray-50 rounded-full sm:px-4 sm:py-2">
                  <span className="text-xs font-medium text-gray-700 sm:text-sm">
                    {t("hero.badge")}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight text-navy">
                {t("hero.title")} <span className="text-orange">{t("hero.titleHighlight")}</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  {t("hero.subtitle")}
                </p>

                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                  {t("hero.description")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link href="/contattaci">
                    <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-base px-6 sm:text-lg sm:px-8">
                      {t("hero.cta.primary")}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                  <Link href="/pacchetti">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-navy text-navy hover:bg-navy/5 text-base px-6 bg-transparent sm:text-lg sm:px-8"
                    >
                      {t("hero.cta.secondary")}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative hidden md:flex items-center justify-center">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-blue/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange/20 rounded-full blur-3xl" />
                <Image
                  src="/logo.png"
                  alt={t("alt.logo")}
                  width={500}
                  height={500}
                  className="relative z-10"
                  priority
                />
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Story Section - Problem */}
      <section className="pt-16 pb-0 relative sm:py-24">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-sky-blue to-orange" />

        <div className="container mx-auto px-4 sm:px-6">
          <LayoutWrapper>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-3 -right-3 w-32 h-32 border-2 border-sky-blue/30 rounded-lg rotate-6 sm:-top-6 sm:-right-6 sm:w-48 sm:h-48 sm:border-4" />
                <Image
                  src="/tavolo.png"
                  alt={t("alt.businessChallenge")}
                  width={600}
                  height={500}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy text-balance">
                  {t("story.title")}
                </h2>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  <p>
                    {t("story.text1")}
                  </p>
                  <p>
                    {t("story.text2")}
                  </p>
                </div>

                <div className="pt-4">
                  <div className="inline-flex items-center gap-2 text-orange font-semibold">
                    <div className="w-12 h-1 bg-orange" />
                    <span>{t("story.badge")}</span>
                  </div>
                </div>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-0 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <LayoutWrapper>
            <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
              <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:px-4">
                {t("stats.badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy leading-snug text-balance">
                {t("stats.title")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {t("stats.subtitle")}
              </p>
            </div>

            <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 md:grid-cols-3 items-stretch">
              <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <Card className="metric-card-inner h-full p-4 sm:p-8 text-center flex flex-col border-0 shadow-none">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400">{t("stats.metrics.cpc.label")}</p>
                  <div className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-semibold text-navy">{t("stats.metrics.cpc.value")}</div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t("stats.metrics.cpc.desc")}
                  </p>
                  <p className="mt-auto pt-4 sm:pt-6 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">{t("stats.metrics.cpc.source")}</p>
                </Card>
              </div>

              <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <Card className="metric-card-inner h-full p-4 sm:p-8 text-center flex flex-col border-0 shadow-none">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400">{t("stats.metrics.budget.label")}</p>
                  <div className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-semibold text-navy">{t("stats.metrics.budget.value")}</div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t("stats.metrics.budget.desc")}
                  </p>
                  <p className="mt-auto pt-4 sm:pt-6 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">{t("stats.metrics.budget.source")}</p>
                </Card>
              </div>

              <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <Card className="metric-card-inner h-full p-4 sm:p-8 text-center flex flex-col border-0 shadow-none">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400">{t("stats.metrics.leads.label")}</p>
                  <div className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-semibold text-navy">{t("stats.metrics.leads.value")}</div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t("stats.metrics.leads.desc")}
                  </p>
                  <p className="mt-auto pt-4 sm:pt-6 text-xs font-medium uppercase tracking-[0.3em] text-gray-400">{t("stats.metrics.leads.source")}</p>
                </Card>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Solution Section */}
      <section className="pt-16 pb-0 relative sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <LayoutWrapper>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block px-4 py-1.5 bg-sky-blue/10 rounded-full mb-4 sm:px-6 sm:py-2 sm:mb-6">
                <span className="text-xs font-semibold text-sky-blue sm:text-sm">{t("solution.badge")}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-navy mb-4 sm:mb-6 text-balance">
                {t("solution.title")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t("solution.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-0 sm:mb-20">
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">{t("solution.tech.title")}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("solution.tech.text1")}
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {t("solution.tech.text2")}
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5 sm:mt-1 sm:h-6 sm:w-6" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-navy">{t("solution.tech.features.database.title")}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t("solution.tech.features.database.desc")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5 sm:mt-1 sm:h-6 sm:w-6" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-navy">{t("solution.tech.features.ai.title")}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t("solution.tech.features.ai.desc")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5 sm:mt-1 sm:h-6 sm:w-6" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-navy">{t("solution.tech.features.outreach.title")}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t("solution.tech.features.outreach.desc")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5 sm:mt-1 sm:h-6 sm:w-6" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-navy">{t("solution.tech.features.control.title")}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{t("solution.tech.features.control.desc")}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-8 -right-8 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />
                <Image
                  src="/scaccomatto.png"
                  alt={t("alt.technologyPlatform")}
                  width={550}
                  height={450}
                  className="rounded-lg"
                />
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="servizi" className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-navy/10 rotate-12" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-sky-blue/10 rounded-full" />

        <div className="container mx-auto px-6">
          <LayoutWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-4xl font-bold text-navy mb-6 text-balance">
                {t("benefits.title")}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/icona1.png"
                      alt={t("alt.icona1")}
                      width={64}
                      height={64}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{t("benefits.cards.meetings.title")}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t("benefits.cards.meetings.desc")}
                  </p>
                  <div className="mt-auto flex justify-center items-center"></div>
                </div>
              </div>

              <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/icona2.png"
                      alt={t("alt.icona2")}
                      width={64}
                      height={64}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{t("benefits.cards.team.title")}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t("benefits.cards.team.desc")}
                  </p>
                  <div className="mt-auto flex justify-center items-center"></div>
                </div>
              </div>

              <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-8 flex flex-col">
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/icona3.png"
                      alt={t("alt.icona3")}
                      width={64}
                      height={64}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">{t("benefits.cards.control.title")}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t("benefits.cards.control.desc")}
                  </p>
                  <div className="mt-auto flex justify-center items-center"></div>
                </div>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Process Section */}
      <section id="come-funziona" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <LayoutWrapper>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {t("process.badge")}
              </span>
              <h2 className="text-4xl font-semibold text-navy leading-snug text-balance">
                {t("process.title")}
              </h2>
              <p className="text-sm text-gray-600">
                {t("process.subtitle")}
              </p>
            </div>

            <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:justify-between">
              {[
                {
                  step: "01",
                  label: t("process.steps.icp.label"),
                  title: t("process.steps.icp.title"),
                  copy: t("process.steps.icp.desc"),
                  image: {
                    src: "/ICT.png",
                    alt: t("alt.definizioneIcp"),
                  },
                },
                {
                  step: "02",
                  label: t("process.steps.strategy.label"),
                  title: t("process.steps.strategy.title"),
                  copy: t("process.steps.strategy.desc"),
                  image: {
                    src: "/lucchettoorizzontale.png",
                    alt: t("alt.pianoStrategico"),
                  },
                },
                {
                  step: "03",
                  label: t("process.steps.quality.label"),
                  title: t("process.steps.quality.title"),
                  copy: t("process.steps.quality.desc"),
                  image: {
                    src: "/lentegraf.png",
                    alt: t("alt.controlloQualita"),
                  },
                },
              ].map((item) => (
                <Card
                  key={item.step}
                  className="group flex flex-1 flex-col gap-5 rounded-2xl border border-gray-200 bg-white/80 px-6 py-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                    <span>{item.label}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500">
                      {item.step}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{item.copy}</p>
                  </div>
                  <div className="overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={360}
                      height={200}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Packages Section */}
      <section id="pacchetti" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-blue/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-2 sm:px-6 relative z-10">
          <LayoutWrapper>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
              <span className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {t("packages.badge")}
              </span>
              <h2 className="text-4xl lg:text-4xl font-semibold text-navy leading-snug text-balance">
                {t("packages.title")}
              </h2>
              <p className="text-base text-gray-600">
                {t("packages.subtitle")}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto">
              {/* Set-Up Fee - PREMIUM HIGHLIGHT */}
              <Card
                className="relative flex cursor-pointer flex-col gap-8 rounded-3xl border-2 border-orange bg-gradient-to-br from-orange/5 via-white to-orange/10 p-3 xs:p-4 sm:p-8 md:p-12 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-orange/30 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange lg:col-span-12 overflow-hidden"
                onClick={() => navigateTo("/pacchetti/set-up-fee")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
                role="link"
                tabIndex={0}
              >
                {/* Enhanced decorative effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange/5 to-transparent rounded-full blur-2xl"></div>
                
                <div className="flex flex-col lg:flex-row items-start justify-between relative z-10">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-orange px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                        <Star className="w-4 h-4 mr-2 fill-white" />
                        {t("packages.setup.badge")}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange border border-orange/30">
                        {t("packages.setup.revShare")}
                      </span>
                    </div>
                    <h3 className="text-2xl xs:text-3xl md:text-4xl font-bold text-navy">{t("packages.setup.title")}</h3>
                    <p className="text-base md:text-lg text-gray-700 max-w-full">
                      {t("packages.setup.desc")}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <Sparkles className="w-16 h-16 text-orange" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-orange uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {t("packages.setup.strategy")}
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                        <span className="font-medium">{t("packages.setup.features.customStrategy")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                        <span className="font-medium">{t("packages.setup.features.dedicatedTeam")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                        <span className="font-medium">{t("packages.setup.features.automation")}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-orange uppercase tracking-wider flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {t("packages.setup.partnership")}
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                        <span className="font-medium">{t("packages.setup.features.revenueShare")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                        <span className="font-medium">{t("packages.setup.features.priorityAccess")}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange flex-shrink-0" />
                        <span className="font-medium">{t("packages.setup.features.advisoryBoard")}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 sm:flex-row mt-4 relative z-10">
                  <Button
                    className="w-full sm:w-auto bg-orange hover:bg-orange/90 text-white shadow-xl hover:shadow-2xl hover:shadow-orange/30 px-8 py-4 text-lg"
                    onClick={handleContactClick}
                  >
                    {t("packages.setup.cta")}
                  </Button>
                  <span className="text-sm text-gray-600 font-medium">
                    {t("packages.setup.ideal")}
                  </span>
                </div>
              </Card>

              {/* Performance - MEDIUM HIGHLIGHT */}
              <Card
                className="relative flex cursor-pointer flex-col gap-6 rounded-3xl border border-sky-blue/60 bg-gradient-to-br from-sky-blue/5 to-white p-3 xs:p-4 sm:p-7 md:p-9 shadow-lg transition-all duration-500 hover:border-sky-blue hover:shadow-xl hover:shadow-sky-blue/20 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue lg:col-span-8 overflow-hidden"
                onClick={() => navigateTo("/pacchetti/performance")}
                onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
                role="link"
                tabIndex={0}
              >
                {/* Decorative effects for Performance */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-blue/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl"></div>
                
                <div className="space-y-3 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-sky-blue/20 px-3 py-1 text-xs font-semibold text-sky-blue border border-sky-blue/30">
                      {t("packages.performance.badge")}
                    </span>
                    <span className="text-xs text-gray-500">{t("packages.performance.setup")}</span>
                  </div>
                  <h3 className="text-2xl xs:text-2xl md:text-3xl font-bold text-navy">{t("packages.performance.title")}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t("packages.performance.desc")}
                  </p>
                </div>

                <div className="bg-sky-blue/5 rounded-xl p-3 md:p-4 border border-sky-blue/20 relative z-10">
                  <p className="text-xs font-semibold text-sky-blue uppercase tracking-wider mb-2">{t("packages.performance.pricing.label")}</p>
                  <p className="text-sm text-gray-700">{t("packages.performance.pricing.desc")}</p>
                </div>

                <ul className="space-y-3 text-sm text-gray-700 relative z-10">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                    <span>{t("packages.performance.features.onboarding")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                    <span>{t("packages.performance.features.payPerResult")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                    <span>{t("packages.performance.features.reporting")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-blue flex-shrink-0" />
                    <span>{t("packages.performance.features.testing")}</span>
                  </li>
                </ul>

                <div className="mt-auto pt-4 relative z-10">
                  <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white shadow-md hover:shadow-lg transition-all duration-300" onClick={handleContactClick}>
                    {t("packages.performance.cta")}
                  </Button>
                </div>
              </Card>

              {/* Subscription - MINIMAL HIGHLIGHT */}
              <Card
                className="relative flex cursor-pointer flex-col gap-5 rounded-2xl border border-gray-300 bg-white p-3 xs:p-4 sm:p-6 md:p-7 shadow-md transition-all duration-500 hover:shadow-lg hover:shadow-navy/10 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy lg:col-span-4 overflow-hidden"
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
                    {t("packages.subscription.badge")}
                  </span>
                  <h3 className="text-xl xs:text-2xl font-bold text-navy">{t("packages.subscription.title")}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {t("packages.subscription.desc")}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-2 md:p-3 border border-gray-200 relative z-10">
                  <p className="text-xs text-gray-600">{t("packages.subscription.pricing")}</p>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-700 relative z-10">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                    <span>{t("packages.subscription.features.guaranteed")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                    <span>{t("packages.subscription.features.manager")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                    <span>{t("packages.subscription.features.meetings")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-navy flex-shrink-0" />
                    <span>{t("packages.subscription.features.refund")}</span>
                  </li>
                </ul>

                <div className="mt-auto pt-3 relative z-10">
                  <Button className="w-full bg-navy hover:bg-navy/90 text-white text-sm py-2.5 transition-all duration-300" onClick={handleContactClick}>
                    {t("packages.subscription.cta")}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Trust indicator */}
            <div className="mt-16 text-center">
              <p className="text-sm text-gray-500">{t("packages.trust")}</p>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Price Calculator Section */}
      <LeadPriceCalculator />

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative">
        <div className="container mx-auto px-6">
          <LayoutWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-4xl font-bold text-navy mb-6">{t("faq.title")}</h2>
              <p className="text-xl text-gray-600">{t("faq.subtitle")}</p>
            </div>

            <FAQCards
              className="mt-12"
              items={[
                {
                  question: t("faq.items.0.question"),
                  answer: t("faq.items.0.answer")
                },
                {
                  question: t("faq.items.1.question"),
                  answer: t("faq.items.1.answer")
                },
                {
                  question: t("faq.items.2.question"),
                  answer: t("faq.items.2.answer")
                },
                {
                  question: t("faq.items.3.question"),
                  answer: t("faq.items.3.answer")
                },
                {
                  question: t("faq.items.4.question"),
                  answer: t("faq.items.4.answer")
                },
                {
                  question: t("faq.items.5.question"),
                  answer: t("faq.items.5.answer")
                }
              ]}
            />
          </LayoutWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-navy via-navy to-sky-blue/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <LayoutWrapper>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl lg:text-4xl font-bold text-balance">
                {t("cta.title")}
              </h2>
              <p className="text-xl text-gray-200">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  data-cal-namespace="aycl-discovery"
                  data-cal-link="giovannilucchesini/aycl-discovery"
                  data-cal-config='{"layout":"month_view"}'
                  className="bg-orange hover:bg-orange/90 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 flex items-center gap-2 text-lg justify-center w-full sm:w-auto"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link href="/pacchetti">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent">
                    {t("cta.secondary")}
                  </Button>
                </Link>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

    </div>
  )
}