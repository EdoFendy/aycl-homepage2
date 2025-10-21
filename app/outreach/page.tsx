"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { CheckCircle2, XCircle, Check, X } from "lucide-react"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { LayoutWrapper } from "@/components/layout-wrapper"

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
  const heroOutcome = heroParagraphs.slice(4)
  const heroOutcomePrimary = heroOutcome[0] ?? ""
  const heroOutcomeSecondary = heroOutcome[1] ?? ""
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
                  {heroLead}
                </p>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {heroContext.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/contattaci"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,148,51,0.25)] transition duration-200 ease-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange sm:w-auto sm:text-lg"
                  >
                    {t("hero.cta.primary")}
                  </Link>
                  <Link
                    href="/pacchetti"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-4 text-base font-semibold text-navy transition duration-200 ease-out hover:bg-navy/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy sm:w-auto sm:text-lg"
                  >
                    {t("hero.cta.secondary")}
                  </Link>
                </div>

                {heroOutcomePrimary && (
                  <div className="rounded-xl border border-orange/30 bg-orange/5 px-5 py-4">
                    <p className="text-sm font-medium text-navy">{heroOutcomePrimary}</p>
                  </div>
                )}
              </div>

              <div className="relative hidden md:flex items-center justify-center">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-sky-blue/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange/20 rounded-full blur-3xl" />
                <div className="relative w-full max-w-6xl lg:max-w-xl xl:max-w-2xl">
                  {/* Floating Message - Top Right */}
                  <div className="absolute -top-3 -right-1 sm:-top-6 sm:-right-4 z-10 max-w-[140px] sm:max-w-[240px]">
                    <div className="relative rounded-2xl bg-white/85 backdrop-blur-sm border border-sky-blue/30 px-2 py-2 sm:px-4 sm:py-3 shadow-lg shadow-sky-blue/20">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-blue/10 via-transparent to-sky-blue/10 animate-pulse"></div>
                      <p className="relative text-[10px] sm:text-xs font-medium text-gray-700 leading-tight sm:leading-relaxed">
                        Oggi lo usiamo per generare appuntamenti qualificati per noi e per i nostri clienti.
                      </p>
                    </div>
                  </div>

                  {/* Main Image */}
                  <Image
                    src="newmedia/comefunziona_hero.png"
                    alt="Dashboard Sendura"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />

                  {/* Floating Message - Center Left */}
                  <div className="absolute top-1/2 -left-1 sm:-left-4 transform -translate-y-1/2 z-10 max-w-[120px] sm:max-w-[220px]">
                    <div className="relative rounded-2xl bg-white/85 backdrop-blur-sm border border-sky-blue/30 px-2 py-2 sm:px-4 sm:py-3 shadow-lg shadow-sky-blue/20">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-blue/10 via-transparent to-sky-blue/10 animate-pulse"></div>
                      <p className="relative text-[10px] sm:text-xs font-medium text-gray-700 leading-tight sm:leading-relaxed">
                        Multicanale e AI: la combinazione che cambia le regole
                      </p>
                    </div>
                  </div>

                  {/* Floating Message - Bottom Right */}
                  <div className="absolute -bottom-3 -right-1 sm:-bottom-6 sm:-right-4 z-10 max-w-[110px] sm:max-w-[200px]">
                    <div className="relative rounded-2xl bg-white/85 backdrop-blur-sm border border-sky-blue/30 px-2 py-2 sm:px-4 sm:py-3 shadow-lg shadow-sky-blue/20">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-blue/10 via-transparent to-sky-blue/10 animate-pulse"></div>
                      <p className="relative text-[10px] sm:text-xs font-medium text-gray-700 leading-tight sm:leading-relaxed">
                        Dal traffico al contatto reale
                      </p>
                    </div>
                  </div>
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
              <p className="text-base leading-relaxed text-slate-600 sm:text-lg">{principleIntro}</p>
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
                    <p className="mt-4 text-sm leading-relaxed text-gray-700">{paragraph}</p>
                  </div>
                )
              })}
            </div>
          </div>
          {principleClosing.length > 0 && (
            <div className="mt-12 rounded-3xl border border-orange/20 bg-gradient-to-r from-orange/5 via-white to-sky-blue/10 px-8 py-10 shadow-[0_32px_60px_-40px_rgba(255,165,0,0.35)]">
              <p className="text-base font-semibold text-navy sm:text-lg">{principleClosing.join(" ")}</p>
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
                      <p className="text-sm leading-relaxed text-gray-700">{paragraph}</p>
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
                  className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_36px_70px_-40px_rgba(255,255,255,0.5)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Image
                      src={iconAsset.src}
                      alt={iconAsset.alt}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/85">{paragraph}</p>
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
            <p className="mt-4 text-base text-gray-600 sm:text-lg">{architectureLead}</p>
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
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-sky-blue/10 to-orange/10" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              {t("comparison.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("comparison.title")}</h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">{t("comparison.subtitle")}</p>
          </div>
          
          {/* Minimal Comparison Table */}
          <div className="mt-12 mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50">
                <div className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">{t("comparison.aspectLabel")}</p>
                </div>
                <div className="px-6 py-4 text-center">
                  <p className="text-sm font-semibold text-gray-600">{t("comparison.columns.traditional")}</p>
                </div>
                <div className="px-6 py-4 text-center">
                  <p className="text-sm font-semibold text-orange">{t("comparison.columns.aycl")}</p>
                </div>
              </div>
              
              {/* Rows */}
              <div className="divide-y divide-gray-100">
                {comparisonRows.map((row, index) => (
                  <div key={row.aspect} className="grid grid-cols-3">
                    <div className="px-6 py-4">
                      <h3 className="text-sm font-medium text-gray-900">{row.aspect}</h3>
                    </div>
                    <div className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-600">{row.traditional}</span>
                      </div>
                    </div>
                    <div className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-900">{row.aycl}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
            <p className="mt-4 text-base text-gray-600 sm:text-lg">{t("sendura.intro")}</p>
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
                    <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
                  </div>
                ))}
              </div>
              
              {/* Minimal closing statement */}
              <div className="rounded-xl border border-orange/30 bg-orange/5 px-5 py-4">
                <p className="text-sm font-medium text-navy">{t("sendura.closing")}</p>
              </div>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Learning & Personalization */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-blue/10 to-white" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] xl:gap-16">
            <div className="relative overflow-hidden rounded-[2.75rem] border border-navy/10 bg-white/95 p-8 shadow-[0_44px_90px_-60px_rgba(1,47,107,0.5)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-blue/15">
                  <Image
                    src={learningLeadIcon.src}
                    alt={learningLeadIcon.alt}
                    width={30}
                    height={30}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue">
                    Learning
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-navy">{t("learning.title")}</h3>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {learningParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {learningBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <Image
                      src={listBulletIcon.src}
                      alt={listBulletIcon.alt}
                      width={18}
                      height={18}
                      className="mt-1 h-4 w-4 object-contain"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-semibold text-navy">{t("learning.closing")}</p>
            </div>
            <div className="space-y-6">
              <article className="relative overflow-hidden rounded-[2.75rem] border border-navy/10 bg-white/95 p-8 shadow-[0_44px_90px_-60px_rgba(1,47,107,0.5)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/15">
                    <Image
                      src={personalizationLeadIcon.src}
                      alt={personalizationLeadIcon.alt}
                      width={30}
                      height={30}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                      Personalization
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold text-navy">{t("personalization.title")}</h3>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-gray-700">{t("personalization.intro")}</p>
                <ul className="mt-6 space-y-3">
                  {personalizationBullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <Image
                        src={listBulletIcon.src}
                        alt={listBulletIcon.alt}
                        width={18}
                        height={18}
                        className="mt-1 h-4 w-4 object-contain"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-semibold text-navy">{t("personalization.closing")}</p>
              </article>
              <article className="relative overflow-hidden rounded-[2.75rem] border border-navy/10 bg-white/95 p-8 shadow-[0_44px_90px_-60px_rgba(1,47,107,0.5)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10">
                    <Image
                      src={methodLeadIcon.src}
                      alt={methodLeadIcon.alt}
                      width={30}
                      height={30}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-navy/70">
                      {t("hero.eyebrow")}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-700">{t("microcopy")}</p>
              </article>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Human + AI */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0a1d3c] to-slate-900 py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--sky-blue)/0.2,transparent_65%)]" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("humanAi.title")}</h2>
            <p className="mt-4 text-base text-white/80 sm:text-lg">{t("humanAi.intro")}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/5 p-8 shadow-[0_48px_100px_-60px_rgba(255,255,255,0.45)] backdrop-blur">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/20">
                <Image
                  src={humanAiIcons[0].src}
                  alt={humanAiIcons[0].alt}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{t("humanAi.aiLabel")}</h3>
              <ul className="mt-6 space-y-3 text-white/85">
                {humanAiAiList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <Image
                      src={listBulletIcon.src}
                      alt={listBulletIcon.alt}
                      width={18}
                      height={18}
                      className="mt-1 h-4 w-4 object-contain"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/5 p-8 shadow-[0_48px_100px_-60px_rgba(255,255,255,0.45)] backdrop-blur">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-blue/20">
                <Image
                  src={humanAiIcons[1].src}
                  alt={humanAiIcons[1].alt}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{t("humanAi.humanLabel")}</h3>
              <ul className="mt-6 space-y-3 text-white/85">
                {humanAiHumanList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <Image
                      src={listBulletIcon.src}
                      alt={listBulletIcon.alt}
                      width={18}
                      height={18}
                      className="mt-1 h-4 w-4 object-contain"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center text-sm font-semibold text-orange">
            {t("humanAi.closing")}
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
                  {paragraph}
                </p>
              ))}
              <ul className="space-y-3">
                {ecosystemLevels.map((level, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700 sm:text-base">
                    <Image
                      src={listBulletIcon.src}
                      alt={listBulletIcon.alt}
                      width={20}
                      height={20}
                      className="mt-1 h-5 w-5 object-contain"
                    />
                    <span>{level}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-navy sm:text-base">{t("ecosystem.closing")}</p>
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
