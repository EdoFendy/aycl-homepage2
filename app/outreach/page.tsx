"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Sparkles, Star, Zap, Layers, Workflow, Shield, Database, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

type Quote = {
  text: string
  source: string
  author: string
  linkLabel: string
}

type ComparisonRow = {
  aspect: string
  traditional: string
  aycl: string
}

export default function OutreachPage() {
  const t = useTranslations("outreach")
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"aycl-discovery"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  const heroParagraphs = t.raw("hero.paragraphs") as string[]
  const principleParagraphs = t.raw("principle.paragraphs") as string[]
  const aiQuotes = t.raw("ai.quotes") as Quote[]
  const architectureParagraphs = t.raw("architecture.paragraphs") as string[]
  const comparisonRows = t.raw("comparison.rows") as ComparisonRow[]
  const applicationParagraphs = t.raw("application.paragraphs") as string[]
  const senduraBullets = t.raw("sendura.bullets") as string[]
  const learningParagraphs = t.raw("learning.paragraphs") as string[]
  const learningBullets = t.raw("learning.bullets") as string[]
  const personalizationBullets = t.raw("personalization.bullets") as string[]
  const humanAiAiList = t.raw("humanAi.aiList") as string[]
  const humanAiHumanList = t.raw("humanAi.humanList") as string[]
  const ecosystemParagraphs = t.raw("ecosystem.paragraphs") as string[]
  const ecosystemLevels = t.raw("ecosystem.levels") as string[]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden sm:pt-32 sm:pb-20">
        {/* Geometric decorations */}
        <div className="absolute top-16 right-4 w-20 h-20 bg-sky-blue/10 rotate-12 rounded-lg sm:top-20 sm:right-10 sm:w-32 sm:h-32" />
        <div className="absolute top-32 left-4 w-16 h-16 bg-orange/10 rounded-full sm:top-40 sm:left-10 sm:w-24 sm:h-24" />
        <div className="absolute bottom-6 right-1/4 w-12 h-32 bg-navy/5 -rotate-45 sm:bottom-10 sm:w-16 sm:h-48" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-block px-3 py-1.5 bg-gray-50 rounded-full sm:px-4 sm:py-2">
                <span className="text-xs font-medium text-gray-700 sm:text-sm">
                  {t("hero.eyebrow")}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy leading-tight text-balance">
                {t("hero.title")}
              </h1>

              <div className="space-y-3 text-sm text-gray-600 sm:text-base sm:leading-relaxed">
                {heroParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

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
                src="/modern-technology-dashboard-with-ai-and-data-analy.jpg"
                alt="Dashboard Sendura"
                width={500}
                height={400}
                className="relative z-10 rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-white via-sky-blue/10 to-orange/5">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          <div className="relative max-w-4xl w-full">
            {/* Gradient glow background */}
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-sky-blue/20 via-orange/10 to-navy/10 opacity-80 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
            {/* Main Card */}
            <div className="relative rounded-[2rem] border border-navy/15 bg-white/95 shadow-[0_16px_48px_-12px_rgba(1,47,107,0.18)] px-8 py-14 sm:px-16 sm:py-20 flex flex-col gap-10">
              
              {/* Top: Principle Title */}
              <div className="flex flex-col items-center gap-4">
                <span className="inline-block px-6 py-2 bg-orange/10 rounded-full text-base sm:text-lg font-bold text-orange uppercase tracking-widest shadow-sm">
                  {t("principle.title")}
                </span>
                <p className="text-center text-2xl sm:text-3xl font-semibold text-navy max-w-2xl">
                  {t("principle.title")}
                </p>
              </div>
              
              {/* Principle Main Paragraphs */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-stretch">
                {principleParagraphs.slice(0, 2).map((paragraph, idx) => (
                  <div
                    key={idx}
                    className="bg-sky-blue/5 rounded-xl p-6 flex-1 shadow-[0_4px_16px_-8px_rgba(1,47,107,0.04)] text-base sm:text-lg text-gray-700 font-medium border-l-4 border-orange/40"
                  >
                    {paragraph}
                  </div>
                ))}
              </div>

              {/* Bottom: Deeper section if more text */}
              {principleParagraphs.length > 2 && (
                <div className="mt-6 bg-gradient-to-br from-orange/5 to-sky-blue/5 border border-sky-blue/10 rounded-xl px-6 py-8 shadow-[0_2px_8px_-4px_rgba(255,165,0,0.05)] text-center">
                  <p className="text-lg sm:text-xl font-semibold text-navy mb-4">
                    Approfondimento
                  </p>
                  <div className="space-y-3 text-base text-gray-700 max-w-2xl mx-auto">
                    {principleParagraphs.slice(2).map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">
                {t("architecture.title")}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                {architectureParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-3 -right-3 w-32 h-32 border-2 border-orange/20 rounded-lg sm:-top-6 sm:-right-6 sm:w-48 sm:h-48 sm:border-4" />
              <Image
                src="/business-professional-reviewing-performance-metric.jpg"
                alt="Analisi performance outreach"
                width={500}
                height={400}
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 bg-sky-blue/10 rounded-full sm:px-6 sm:py-2">
              <span className="text-xs font-semibold text-sky-blue sm:text-sm">
                {t("ai.title")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6 text-balance">
              {t("ai.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("architecture.paragraphs.0")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {aiQuotes.map((quote, index) => (
              <div key={`${quote.source}-${quote.author}`} className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(1,47,107,0.4)]">
                <div className="h-full min-h-[300px] rounded-[1rem] bg-white/95 backdrop-blur-sm p-6 sm:p-8 flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-orange" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-4 text-center">Statistiche</h3>
                  <p className="text-gray-600 leading-relaxed text-center mb-4">"{quote.text}"</p>
                  <div className="mt-auto space-y-1 text-xs text-gray-500 text-center">
                    <p className="font-semibold text-navy">{quote.author}</p>
                    <p>{quote.source}</p>
                    <p className="text-orange">{quote.linkLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 bg-orange/10 rounded-full sm:px-6 sm:py-2">
              <span className="text-xs font-semibold text-orange sm:text-sm">
                {t("comparison.title")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6 text-balance">
              {t("comparison.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("comparison.subtitle")}
            </p>
          </div>

          {/* Tabella di confronto migliorata */}
          <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-[0_20px_60px_-35px_rgba(1,47,107,0.4)]">
            {/* Header della tabella */}
            <div className="grid grid-cols-1 sm:grid-cols-3 bg-gradient-to-r from-gray-50 to-gray-100/50">
              <div className="px-6 py-6 border-b border-navy/10 sm:border-b-0 sm:border-r border-navy/10">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-navy/60 mb-2">
                    {t("comparison.aspectLabel")}
                  </div>
                  <div className="text-sm font-medium text-navy">Cosa confrontiamo</div>
                </div>
              </div>
              <div className="px-6 py-6 border-b border-navy/10 sm:border-b-0 sm:border-r border-navy/10">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 mb-2">
                    {t("comparison.columns.traditional")}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Metodo tradizionale</div>
                </div>
              </div>
              <div className="px-6 py-6">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-orange/70 mb-2">
                    {t("comparison.columns.aycl")}
                  </div>
                  <div className="text-sm font-medium text-navy">All You Can Leads</div>
                </div>
              </div>
            </div>

            {/* Righe della tabella */}
            <div className="divide-y divide-navy/10">
              {comparisonRows.map((row, index) => (
                <div
                  key={row.aspect}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-8 hover:bg-gray-50/50 transition-colors"
                >
                  {/* Aspetto */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-navy/10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-xs font-bold text-navy">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-navy mb-2">{row.aspect}</h4>
                    </div>
                  </div>

                  {/* Metodo tradizionale */}
                  <div className="relative">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 h-full">
                      <div className="flex items-center mb-3">
                        <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Tradizionale
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{row.traditional}</p>
                    </div>
                  </div>

                  {/* All You Can Leads */}
                  <div className="relative">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange/5 to-orange/10 border border-orange/20 h-full">
                      <div className="flex items-center mb-3">
                        <div className="w-3 h-3 bg-orange rounded-full mr-3"></div>
                        <span className="text-xs font-semibold text-orange uppercase tracking-wide">
                          AYCL
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{row.aycl}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer della tabella */}
            <div className="bg-gradient-to-r from-navy/5 to-orange/5 px-6 py-6 border-t border-navy/10">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  <strong className="text-navy">Risultato:</strong> Un approccio sistemico che trasforma l'outreach da attività sporadica a processo scalabile e misurabile.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span>Metodo tradizionale</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange">
                    <div className="w-3 h-3 bg-orange rounded-full"></div>
                    <span>All You Can Leads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 bg-sky-blue/10 rounded-full sm:px-6 sm:py-2">
              <span className="text-xs font-semibold text-sky-blue sm:text-sm">
                {t("sendura.title")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6 text-balance">
              {t("sendura.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t("sendura.intro")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy">{t("sendura.title")}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t("sendura.intro")}
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
                {senduraBullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5 sm:mt-1 sm:h-6 sm:w-6" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-navy">Feature {index + 1}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{bullet}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg">
                  <Image
                    src="/analytics-dashboard-with-real-time-metrics.jpg"
                    alt="Dashboard outreach"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 300px, 80vw"
                  />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg">
                  <Image
                    src="/strategic-planning-with-data-analysis.jpg"
                    alt="Pianificazione strategica"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 300px, 80vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning and Personalization */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Learning Card */}
            <article className="group relative isolate">
              <div className="absolute inset-0 -z-10 rounded-[1.75rem] bg-[linear-gradient(135deg,var(--navy),var(--sky-blue),var(--orange))] opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
              <div className="relative h-full rounded-[1.5rem] border border-white/40 bg-white/95 p-6 shadow-[0_12px_24px_-16px_rgba(1,47,107,0.65)] backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-sky-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-blue">
                    Learning
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-sky-blue/70 via-orange/60 to-transparent" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-navy">{t("learning.title")}</h3>
                <div className="mt-4 text-base leading-relaxed text-slate-600">
                  {learningParagraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    {learningBullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                  <p className="mt-4 font-semibold text-navy">{t("learning.closing")}</p>
                </div>
              </div>
            </article>

            {/* Personalization Card */}
            <article className="group relative isolate">
              <div className="absolute inset-0 -z-10 rounded-[1.75rem] bg-[linear-gradient(135deg,var(--navy),var(--sky-blue),var(--orange))] opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
              <div className="relative h-full rounded-[1.5rem] border border-white/40 bg-white/95 p-6 shadow-[0_12px_24px_-16px_rgba(1,47,107,0.65)] backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                    Personalization
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-orange/70 via-sky-blue/60 to-transparent" aria-hidden />
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-navy">{t("personalization.title")}</h3>
                <div className="mt-4 text-base leading-relaxed text-slate-600">
                  <p className="mb-4">{t("personalization.intro")}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    {personalizationBullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                  <p className="mt-4 font-semibold text-navy">{t("personalization.closing")}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Human + AI Section */}
      <section className="py-16 sm:py-24 bg-navy text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance">
              {t("humanAi.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {t("humanAi.intro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--orange),var(--sky-blue),var(--navy))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(255,165,0,0.4)]">
              <div className="h-full min-h-[300px] rounded-[1rem] bg-white/10 backdrop-blur-sm p-6 sm:p-8 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-orange" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-4 text-center">{t("humanAi.aiLabel")}</h3>
                <ul className="space-y-3 text-white/85">
                  {humanAiAiList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="h-full rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--sky-blue),var(--orange),var(--navy))] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(135,206,235,0.4)]">
              <div className="h-full min-h-[300px] rounded-[1rem] bg-white/10 backdrop-blur-sm p-6 sm:p-8 flex flex-col">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-sky-blue/20 rounded-full flex items-center justify-center">
                    <Headphones className="h-8 w-8 text-sky-blue" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-4 text-center">{t("humanAi.humanLabel")}</h3>
                <ul className="space-y-3 text-white/85">
                  {humanAiHumanList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-sky-blue flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm font-semibold text-orange">{t("humanAi.closing")}</p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">
                {t("ecosystem.title")}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                {ecosystemParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <ul className="space-y-3">
                {ecosystemLevels.map((level, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{level}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm sm:text-base font-semibold text-navy">{t("ecosystem.closing")}</p>
            </div>

            <div className="relative">
              <div className="absolute -top-3 -right-3 w-32 h-32 border-2 border-navy/20 rounded-lg sm:-top-6 sm:-right-6 sm:w-48 sm:h-48 sm:border-4" />
              <Image
                src="/strategic-planning-with-data-analysis.jpg"
                alt="Outreach evolution"
                width={500}
                height={400}
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6 text-balance">
              Pronto a trasformare il tuo outreach?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {t("microcopy")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-base px-6 sm:text-lg sm:px-8">
                  Prenota una call
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="/pacchetti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-navy text-navy hover:bg-navy/5 text-base px-6 bg-transparent sm:text-lg sm:px-8"
                >
                  Scopri i pacchetti
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
