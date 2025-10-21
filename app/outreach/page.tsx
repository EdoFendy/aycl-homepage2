"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { CheckCircle2, XCircle, Check, X, CheckCircle, Clock, Settings, ArrowRight, TrendingUp, Users, Database, Target, Cpu, Zap } from "lucide-react"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { renderHighlightedText } from "@/lib/highlighted-text"

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

type IconAsset = {
  src: string
  alt: string
}

export default function OutreachPage() {
  const t = useTranslations("outreach")

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "aycl-discovery" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
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

  const heroLead = heroParagraphs.slice(0, 2).join(" ")
  const heroContext = heroParagraphs.slice(2, 4)
  const heroOutcomePrimary = heroParagraphs[4] ?? ""
  const heroContextIcons: IconAsset[] = [
    { src: "/iconaHome.png", alt: "Icona esigenza interna" },
    { src: "/iconaPerformance.png", alt: "Icona performance in calo" },
  ]

  const principleIntro = principleParagraphs[0] ?? ""
  const principleHighlights = principleParagraphs.slice(1, 4)
  const principleClosing = principleParagraphs.slice(4)
  const principleIcons: IconAsset[] = [
    { src: "/iconaContact.png", alt: "Icona contatto" },
    { src: "/iconaProgettazione.png", alt: "Icona strategia" },
    { src: "/iconaPosizione.png", alt: "Icona posizionamento" },
  ]

  const architectureLead = architectureParagraphs[0] ?? ""
  const architectureIcons: IconAsset[] = [
    { src: "/iconaMachine.png", alt: "Icona infrastruttura tecnologica" },
    { src: "/iconaMessaggio.png", alt: "Icona comunicazione multicanale" },
    { src: "/iconaWhatsapp.png", alt: "Icona messaggistica diretta" },
    { src: "/iconaTelefono.png", alt: "Icona conversazioni reali" },
  ]

  const applicationIcons: IconAsset[] = [
    { src: "/iconaSubscr.png", alt: "Icona sistema scalabile" },
    { src: "/iconaSetupfee.png", alt: "Icona ecosistema proprietario" },
  ]

  const heroHighlightIcons: IconAsset[] = [
    { src: "/iconaMachine.png", alt: "Icona tecnologia ed AI" },
    { src: "/iconaMessaggio.png", alt: "Icona messaggistica integrata" },
  ]

  const senduraBulletIcon: IconAsset = {
    src: "/icona1.png",
    alt: "Icona funzionalità Sendura",
  }

  const learningLeadIcon: IconAsset = {
    src: "/iconaProgettazione.png",
    alt: "Icona apprendimento continuo",
  }

  const personalizationLeadIcon: IconAsset = {
    src: "/iconaPosizione.png",
    alt: "Icona personalizzazione strategica",
  }

  const methodLeadIcon: IconAsset = {
    src: "/iconaContact.png",
    alt: "Icona metodo AYCL",
  }

  const humanAiIcons: IconAsset[] = [
    { src: "/iconaMachine.png", alt: "Icona AI" },
    { src: "/iconaTelefono.png", alt: "Icona team umano" },
  ]

  const listBulletIcon: IconAsset = {
    src: "/icona2.png",
    alt: "Icona elenco",
  }

  const heroCtaIcons: [IconAsset, IconAsset] = [
    { src: "/iconaTelefono.png", alt: "Icona prenota una call" },
    { src: "/iconaPrice.png", alt: "Icona scopri i pacchetti" },
  ]

  const aiStatsIcon: IconAsset = {
    src: "/iconaPerformance.png",
    alt: "Icona insight sulle performance",
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
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
                <div className="inline-block px-4 py-2 rounded-full bg-orange/10 border border-orange/20">
                  <span className="text-xs font-semibold text-orange uppercase tracking-wider sm:text-sm">
                    {t("hero.eyebrow")}
                  </span>
                </div>

                <h1 className="max-w-[620px] text-3xl font-bold leading-tight text-navy sm:text-5xl sm:leading-[1.1] lg:text-[3.75rem]">
                  {t.rich("hero.title", {
                    highlight: (chunks) => <span className="text-orange">{chunks}</span>,
                  })}
                </h1>

                <p className="max-w-[540px] text-lg sm:text-xl text-gray-600 leading-relaxed">
                  {renderHighlightedText(heroLead)}
                </p>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {heroContext.map((paragraph, index) => (
                    <p key={index}>{renderHighlightedText(paragraph)}</p>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/contattaci"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,148,51,0.25)] transition duration-200 ease-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange sm:w-auto sm:text-lg whitespace-nowrap"
                  >
                    {t("hero.cta.primary")}
                  </Link>
                  <Link
                    href="/pacchetti"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-4 text-base font-semibold text-navy transition duration-200 ease-out hover:bg-navy/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy sm:w-auto sm:text-lg whitespace-nowrap"
                  >
                    {t("hero.cta.secondary")}
                  </Link>
                </div>

                {heroOutcomePrimary && (
                  <div className="rounded-xl border border-orange/30 bg-orange/5 px-5 py-4">
                    <p className="text-sm font-medium text-navy">
                      {renderHighlightedText(heroOutcomePrimary)}
                    </p>
                  </div>
                )}
              </div>

              <div className="relative hidden md:flex items-center justify-center">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-blue/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange/20 rounded-full blur-3xl" />
                <div className="relative w-full max-w-6xl lg:max-w-xl xl:max-w-2xl">
                  {/* Main Image */}
                  <Image
                    src="newmedia/comefunziona_hero.png"
                    alt="Dashboard Sendura"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>

      {/* Principle Section */}
      <section className="relative py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-navy/5 via-transparent to-transparent" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] xl:gap-16">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                {t("principle.title")}
              </span>
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">{t("principle.title")}</h2>
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                {renderHighlightedText(principleIntro)}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {principleHighlights.map((paragraph, index) => {
                const iconAsset = principleIcons[index % principleIcons.length]
                return (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-navy/10 bg-white/95 p-5 shadow-[0_28px_60px_-36px_rgba(1,47,107,0.65)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10">
                        <Image
                          src={iconAsset.src}
                          alt={iconAsset.alt}
                          width={30}
                          height={30}
                          className="h-7 w-7 object-contain"
                        />
                      </div>
                  
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">
                      {renderHighlightedText(paragraph)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          {principleClosing.length > 0 && (
            <div className="mt-12 rounded-3xl border border-orange/20 bg-gradient-to-r from-orange/5 via-white to-sky-blue/10 px-8 py-10 shadow-[0_32px_60px_-40px_rgba(255,165,0,0.35)]">
              <p className="text-base font-semibold text-navy sm:text-lg">
                {renderHighlightedText(principleClosing.join(" "))}
              </p>
            </div>
          )}
        </PageLayoutContainer>
      </section>

      {/* Architecture Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-sky-blue/20 via-transparent to-transparent" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] xl:gap-16">
            <div className="space-y-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full bg-sky-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue">
                  {t("architecture.title")}
                </span>
                <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("architecture.title")}</h2>
              </div>
              <div className="space-y-4">
                {architectureParagraphs.map((paragraph, index) => {
                  const iconAsset = architectureIcons[index % architectureIcons.length]
                  return (
                    <div
                      key={index}
                      className="flex gap-4 rounded-3xl border border-white/70 bg-white/95 p-6 shadow-[0_32px_60px_-42px_rgba(1,47,107,0.45)]"
                    >
                      <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10">
                        <Image
                          src={iconAsset.src}
                          alt={iconAsset.alt}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {renderHighlightedText(paragraph)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <div>
                <Image
                  src="newmedia/ComeFunziona_EsperienzaStruttura.png"
                  alt="Analisi performance outreach"
                  width={540}
                  height={420}
                  className="h-full w-full object-cover rounded-[2.75rem]"
                />
              </div>
            </div>
            </div>
          </PageLayoutContainer>
      </section>

      {/* Application Section */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.2,transparent_60%)]" />
        <div className="absolute -bottom-32 right-24 h-72 w-72 rounded-full bg-sky-blue/20 blur-[140px]" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {t("application.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("application.title")}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {applicationParagraphs.map((paragraph, index) => {
              const iconAsset = applicationIcons[index % applicationIcons.length]
              return (
                <article
                  key={index}
                  className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/15 p-6 shadow-[0_36px_70px_-40px_rgba(255,255,255,0.25)] backdrop-blur-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                    <Image
                      src={iconAsset.src}
                      alt={iconAsset.alt}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-white">
                    {renderHighlightedText(paragraph)}
                  </p>
                </article>
              )
            })}
          </div>
        </PageLayoutContainer>
      </section>

      {/* AI Stats Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky-blue/15 to-white" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-sky-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue">
              {t("ai.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("ai.title")}</h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {renderHighlightedText(architectureLead)}
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiQuotes.map((quote, index) => (
              <article
                key={`${quote.source}-${quote.author}`}
                className="group relative overflow-hidden rounded-3xl border border-navy/10 bg-white/95 p-8 shadow-[0_36px_80px_-52px_rgba(1,47,107,0.6)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.2,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/15">
                  <Image
                    src={aiStatsIcon.src}
                    alt={aiStatsIcon.alt}
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>
          
                <p className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{quote.text}&rdquo;</p>
                <div className="mt-6 space-y-1 text-xs text-gray-500">
                  <p className="font-semibold text-navy">{quote.author}</p>
                  <p>{quote.source}</p>
                  <p className="text-orange">{quote.linkLabel}</p>
                </div>
              </article>
            ))}
          </div>
        </PageLayoutContainer>
      </section>

      {/* Comparison Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        {/* Sfondo con gradient e texture */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-sky-blue/10 to-orange/10" />
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255, 148, 51, 0.5) 0.5px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />

        <PageLayoutContainer className="px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-orange/10 border border-orange/20 px-5 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                {t("comparison.title")}
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
              {t("comparison.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {t("comparison.subtitle")}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mt-12 mx-auto max-w-5xl">
            <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-xl">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-1 sm:gap-0">
                <div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 bg-gray-50 border-b-2 border-gray-200">
                  <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 uppercase tracking-wider leading-tight">
                    ASPETTO
                  </h3>
                </div>
                <div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 bg-gray-50 border-b-2 border-r border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 text-center leading-tight">
                      {t("comparison.columns.traditional")}
                    </span>
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 bg-orange-50 border-b-2 border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-orange text-center leading-tight">
                      {t("comparison.columns.aycl")}
                    </span>
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-orange" />
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {comparisonRows.map((row, index) => {
                  // Mappa delle icone per ogni aspetto
                  const iconMap: Record<string, React.ReactElement> = {
                    "Canali": <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Obiettivo": <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Dati": <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Personalizzazione": <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Tecnologia": <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Miglioramento": <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Tempestività": <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Fattore umano": <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Risultato": <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />,
                    "Visione": <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                  }
                  
                  // Badge speciali per alcune righe
                  const badgeMap: Record<string, string> = {
                    "Risultato": "Dato verificato",
                    "Tecnologia": "AI Integrata"
                  }

                  return (
                    <div
                      key={row.aspect}
                      className={`grid grid-cols-3 gap-1 sm:gap-0 transition-all duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      } hover:bg-sky-blue/5`}
                    >
                      {/* Colonna Aspetto */}
                      <div className="px-1.5 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-5 border-b border-gray-100 border-r flex items-center">
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 w-full">
                          <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 items-center justify-center text-sky-blue">
                            {iconMap[row.aspect]}
                          </div>
                          <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900 leading-tight break-words">
                            {row.aspect}
                          </h3>
                        </div>
                      </div>

                      {/* Colonna Tradizionale */}
                      <div className="px-1.5 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-5 border-b border-gray-100 border-r border-gray-200 flex items-center">
                        <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3 w-full">
                          <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 items-center justify-center mt-0.5">
                            <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-red-500 stroke-2" />
                          </div>
                          <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium leading-tight break-words">
                            {renderHighlightedText(row.traditional)}
                          </span>
                        </div>
                      </div>

                      {/* Colonna AYCL */}
                      <div className="px-1.5 sm:px-3 md:px-6 py-2.5 sm:py-3 md:py-5 border-b border-gray-100 flex items-center">
                        <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
                          <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                            <div className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 items-center justify-center mt-0.5">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-500 stroke-2" />
                            </div>
                            <span className="text-[10px] sm:text-xs md:text-sm text-gray-900 font-medium leading-tight break-words">
                              {renderHighlightedText(row.aycl)}
                            </span>
                          </div>
                          {badgeMap[row.aspect] && (
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                              <div className="w-3.5 sm:w-4 md:w-5 flex-shrink-0"></div>
                              <span className="inline-flex items-center rounded-full bg-orange/10 border border-orange/20 px-1.5 sm:px-2 md:px-2.5 py-0.5 text-[9px] sm:text-[10px] md:text-xs font-medium text-orange h-4 sm:h-5 md:h-6 whitespace-nowrap">
                                {badgeMap[row.aspect]}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer CTA */}
              <div className="px-4 sm:px-6 py-5 sm:py-6 bg-gradient-to-r from-gray-50 via-orange-50/30 to-gray-50 border-t-2 border-gray-200 text-center rounded-b-2xl">
                <p className="text-xs sm:text-sm text-gray-700 font-medium mb-3 sm:mb-4">
                  Pronto a passare alla soluzione migliore?
                </p>
                <Link href="/pacchetti">
                  <button className="inline-flex items-center rounded-full bg-orange px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:bg-orange/90 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 active:scale-95">
                    Scopri i nostri pacchetti
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Sendura Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-blue/15 to-orange/10" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              {t("sendura.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("sendura.title")}</h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {renderHighlightedText(t("sendura.intro"))}
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] xl:gap-16">
            {/* Image - Larger on mobile */}
            <div className="order-2 lg:order-1">
              <Image
                src="newmedia/Sendura_ComeFunziona.png"
                alt="Schema data to leads"
                width={600}
                height={600}
                className="w-full h-auto max-w-md mx-auto lg:max-w-none"
                priority
              />
            </div>
            
            {/* Content - Minimal and brand-aligned */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {senduraBullets.map((bullet, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange/20 flex-shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-orange" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {renderHighlightedText(bullet)}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Minimal closing statement */}
              <div className="rounded-xl border border-orange/30 bg-orange/5 px-5 py-4">
                <p className="text-sm font-medium text-navy">
                  {renderHighlightedText(t("sendura.closing"))}
                </p>
              </div>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Learning & Personalization */}
      <section className="relative py-24 bg-white">
        <PageLayoutContainer className="px-4 sm:px-6">
          {/* Contenuti affiancati */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Learning */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-sky-blue uppercase tracking-wide">
                Learning
              </h2>
              <div className="w-full h-px bg-gradient-to-r from-sky-blue/30 via-sky-blue/10 to-transparent"></div>
              
              <h3 className="text-2xl font-semibold text-navy">{t("learning.title")}</h3>
              
              <div className="space-y-4">
                {learningParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-gray-700">
                    {renderHighlightedText(paragraph)}
                  </p>
                ))}
              </div>

              <ul className="space-y-3 pt-4">
                {learningBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-sky-blue font-bold mt-1">•</span>
                    <span>{renderHighlightedText(bullet)}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-4 text-base font-medium text-navy italic border-t border-sky-blue/20">
                {renderHighlightedText(t("learning.closing"))}
              </p>
            </div>

            {/* Personalization */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-orange uppercase tracking-wide">
                Personalization
              </h2>
              <div className="w-full h-px bg-gradient-to-r from-orange/30 via-orange/10 to-transparent"></div>
              
              <h3 className="text-2xl font-semibold text-navy">{t("personalization.title")}</h3>
              
              <p className="text-base leading-relaxed text-gray-700">
                {renderHighlightedText(t("personalization.intro"))}
              </p>

              <ul className="space-y-3 pt-4">
                {personalizationBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-orange font-bold mt-1">•</span>
                    <span>{renderHighlightedText(bullet)}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-4 text-base font-medium text-navy italic border-t border-orange/20">
                {renderHighlightedText(t("personalization.closing"))}
              </p>
            </div>
          </div>

          {/* Footer statement */}
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-navy/30 to-transparent mb-8"></div>
            <p className="text-lg font-semibold text-navy leading-relaxed">
              {renderHighlightedText(t("microcopy"))}
            </p>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Human + AI */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.2,transparent_60%)]" />
        <div className="absolute -bottom-32 left-24 h-72 w-72 rounded-full bg-sky-blue/20 blur-[140px]" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {t("humanAi.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("humanAi.title")}</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">
              {renderHighlightedText(t("humanAi.intro"))}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <article className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/15 p-6 shadow-[0_36px_70px_-40px_rgba(255,255,255,0.25)] backdrop-blur-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                <Image
                  src={humanAiIcons[0].src}
                  alt={humanAiIcons[0].alt}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{t("humanAi.aiLabel")}</h3>
              <ul className="mt-5 space-y-3 text-white">
                {humanAiAiList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white"></span>
                    <span>{renderHighlightedText(item)}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/15 p-6 shadow-[0_36px_70px_-40px_rgba(255,255,255,0.25)] backdrop-blur-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                <Image
                  src={humanAiIcons[1].src}
                  alt={humanAiIcons[1].alt}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{t("humanAi.humanLabel")}</h3>
              <ul className="mt-5 space-y-3 text-white">
                {humanAiHumanList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white"></span>
                    <span>{renderHighlightedText(item)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="mt-10 text-center text-sm font-semibold text-orange">
            {renderHighlightedText(t("humanAi.closing"))}
          </div>
        </PageLayoutContainer>
      </section>

      {/* Ecosystem */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-blue/10 to-orange/10" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_1.05fr] xl:gap-16">
            <div className="space-y-6">
              <span className="inline-flex items-center justify-center rounded-full bg-navy/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-navy">
                {t("ecosystem.title")}
              </span>
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">{t("ecosystem.title")}</h2>
              {ecosystemParagraphs.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-gray-700 sm:text-base">
                  {renderHighlightedText(paragraph)}
                </p>
              ))}
              <ul className="space-y-3">
                {ecosystemLevels.map((level, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700 sm:text-base">
                    <span className="text-sky-blue font-bold mt-1">•</span>
                    <span>{renderHighlightedText(level)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-navy sm:text-base">
                {renderHighlightedText(t("ecosystem.closing"))}
              </p>
            </div>
            <div className="relative">
              <Image
                src="newmedia/ecosistema_evoluzione.png"
                alt="Outreach evolution"
                width={540}
                height={420}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-black py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.25,transparent_65%)]" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Pronto a trasformare il tuo outreach?</h2>
            <p className="text-base text-white/80 sm:text-lg">{t("microcopy")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-base px-6 sm:text-lg sm:px-8">
                  <span className="flex items-center gap-2">
                    <Image
                      src={heroCtaIcons[0].src}
                      alt={heroCtaIcons[0].alt}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    <span>Prenota una call</span>
                  </span>
                </Button>
              </Link>
              <Link href="/pacchetti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-base px-6 bg-transparent sm:text-lg sm:px-8"
                >
                  <span className="flex items-center gap-2">
                    <Image
                      src={heroCtaIcons[1].src}
                      alt={heroCtaIcons[1].alt}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    <span>Scopri i pacchetti</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </PageLayoutContainer>
      </section>
    </div>
  )
}
