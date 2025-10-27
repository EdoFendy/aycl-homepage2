"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Check, Clock, Settings, TrendingUp, Users, Database, Target, Cpu, Zap } from "lucide-react"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { renderHighlightedText } from "@/lib/highlighted-text"
import { cn } from "@/lib/utils"

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
  badge?: string
}

type ComparisonDisplayRow = ComparisonRow & {
  icon?: typeof Settings
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
  const comparisonRowsRaw = t.raw("comparison.rows") as ComparisonRow[]
  const comparisonAspectLabel = t("comparison.aspectLabel").trim()
  const comparisonColumns = t.raw("comparison.columns") as {
    traditional: string
    aycl: string
  }
  const comparisonIconMap: Record<string, typeof Settings> = {
    Canali: Settings,
    "Channels used": Settings,
    Canales: Settings,
    Obiettivo: Target,
    "Primary goal": Target,
    Objetivo: Target,
    Dati: Database,
    "Data management": Database,
    Datos: Database,
    Personalizzazione: Users,
    Personalisation: Users,
    "Personalización": Users,
    Tecnologia: Cpu,
    "Use of technology": Cpu,
    Tecnología: Cpu,
    Miglioramento: TrendingUp,
    "Learning and improvement": TrendingUp,
    Mejora: TrendingUp,
    Tempestività: Clock,
    Timeliness: Clock,
    Rapidez: Clock,
    "Fattore umano": Users,
    "Role of people": Users,
    "Rol humano": Users,
    Risultato: Zap,
    "Typical outcome": Zap,
    "Resultado típico": Zap,
    Visione: Target,
    "Overall vision": Target,
    "Visión global": Target,
  }
  const comparisonBadgeMap: Record<string, string> = {
    Risultato: "Dato verificato",
    "Typical outcome": "Verified data",
    "Resultado típico": "Dato verificado",
    Tecnologia: "AI Integrata",
    "Use of technology": "AI Powered",
    Tecnología: "IA Integrada",
  }
  const comparisonTableRows: ComparisonDisplayRow[] = comparisonRowsRaw.map((row) => ({
    ...row,
    icon: comparisonIconMap[row.aspect],
    badge: row.badge ?? comparisonBadgeMap[row.aspect],
  }))
  const applicationParagraphs = t.raw("application.paragraphs") as string[]
  const senduraBullets = t.raw("sendura.bullets") as string[]
  const learningParagraphs = t.raw("learning.paragraphs") as string[]
  const learningBullets = t.raw("learning.bullets") as string[]
  const personalizationBullets = t.raw("personalization.bullets") as string[]
  const humanAiAiList = t.raw("humanAi.aiList") as string[]
  const humanAiHumanList = t.raw("humanAi.humanList") as string[]
  const ecosystemParagraphs = t.raw("ecosystem.paragraphs") as string[]
  const ecosystemLevels = t.raw("ecosystem.levels") as string[]

  const getBadge = (section: string) => {
    try {
      const value = t.raw(`${section}.badge`)
      return typeof value === "string" ? value : undefined
    } catch (error) {
      return undefined
    }
  }

  const principleBadge = getBadge("principle")
  const architectureBadge = getBadge("architecture")
  const applicationBadge = getBadge("application")
  const aiBadge = getBadge("ai")
  const comparisonBadge = getBadge("comparison")
  const senduraBadge = getBadge("sendura")
  const humanAiBadge = getBadge("humanAi")
  const ecosystemBadge = getBadge("ecosystem")

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

                <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                  <p>{renderHighlightedText(heroLead)}</p>
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
                    <p className="text-base sm:text-lg font-medium text-navy">
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
                    src="newmedia/ComeFunziona_Hero.png"
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
              {principleBadge && (
                <span className="inline-flex items-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                  {principleBadge}
                </span>
              )}
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
                {architectureBadge && (
                  <span className="inline-flex items-center rounded-full bg-sky-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue">
                    {architectureBadge}
                  </span>
                )}
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
            {applicationBadge && (
              <span className="inline-flex items-center rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                {applicationBadge}
              </span>
            )}
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
            {aiBadge && (
              <span className="inline-flex items-center justify-center rounded-full bg-sky-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue">
                {aiBadge}
              </span>
            )}
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
                <div className="flex w-full items-center justify-center">
                  <span aria-hidden="true" className="text-5xl font-serif text-navy leading-none">
                    “
                  </span>
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
            {comparisonBadge && (
              <div className="inline-flex items-center justify-center rounded-full bg-orange/10 border border-orange/20 px-5 py-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                  {comparisonBadge}
                </span>
              </div>
            )}
            <h2 className="mt-5 text-3xl font-bold text-navy sm:text-4xl md:text-5xl">
              {t("comparison.title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {t("comparison.subtitle")}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mx-auto mt-10 w-full max-w-[1050px]">
            <div className="overflow-hidden rounded-[28px] border border-[#0A2B6B]/10 bg-white/95 shadow-[0_18px_38px_rgba(10,43,107,0.08)]">
              <div className="overflow-x-auto">
                <div className="min-w-[640px]">
                  <div className="px-4 pt-5 sm:px-5 sm:pt-6">
                    <div className="grid grid-cols-[minmax(0,1.12fr)_repeat(2,minmax(0,1fr))] gap-2 sm:gap-2.5">
                      <div
                        className={cn(
                          "py-2 pl-3 pr-2 text-left",
                          comparisonAspectLabel.length > 0 ? "rounded-xl bg-[#F5F9FF] ring-1 ring-[#0A2B6B]/20" : ""
                        )}
                      >
                        {comparisonAspectLabel.length > 0 ? (
                          <span className="block text-xs font-semibold tracking-wide text-[#0A2B6B] sm:text-sm">
                            {comparisonAspectLabel}
                          </span>
                        ) : null}
                      </div>
                      <div className="rounded-xl bg-[#F5F9FF] py-2 text-center ring-1 ring-[#0A2B6B]/20">
                        <span className="text-xs font-semibold tracking-wide text-[#0A2B6B] sm:text-[13px]">
                          {comparisonColumns.traditional}
                        </span>
                      </div>
                      <div className="rounded-xl bg-[#FFF7EA] py-2 text-center ring-1 ring-[#F4AD42]">
                        <span className="text-xs font-extrabold tracking-wide text-[#C77300] sm:text-[13px]">
                          {comparisonColumns.aycl}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-5 sm:px-5 sm:pb-6">
                    <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-[#0A2B6B]/8">
                      <div className="divide-y divide-slate-100 bg-white">
                        {comparisonTableRows.map((row) => {
                          const Icon = row.icon

                          return (
                            <div
                              key={row.aspect}
                              className="grid grid-cols-[minmax(0,1.12fr)_repeat(2,minmax(0,1fr))] bg-white"
                            >
                              <div className="border-r border-slate-100 bg-[#F5F9FF]/70 px-3 py-2.5 sm:px-4 sm:py-3.5">
                                <div className="flex items-start gap-2 sm:gap-2.5">
                                  {Icon ? (
                                    <div className="mt-0.5 text-[#0A2B6B] opacity-90">
                                      <Icon className="h-[18px] w-[18px]" />
                                    </div>
                                  ) : null}
                                  <div>
                                    {comparisonAspectLabel.length > 0 ? (
                                      <span className="sr-only">{comparisonAspectLabel}</span>
                                    ) : null}
                                    <h3 className="text-[11px] font-semibold leading-snug text-[#0A2B6B] sm:text-[13px]">
                                      {row.aspect}
                                    </h3>
                                  </div>
                                </div>
                              </div>

                              <div className="border-r border-slate-100 px-3 py-2.5 sm:px-4 sm:py-3.5">
                                <p className="text-[11px] leading-snug text-slate-700 sm:text-[13px]">
                                  {renderHighlightedText(row.traditional)}
                                </p>
                              </div>

                              <div className="bg-[#FFF7EA] px-3 py-2.5 sm:px-4 sm:py-3.5">
                                <p className="text-[11px] font-semibold leading-snug text-[#0F2540] sm:text-[13px]">
                                  {renderHighlightedText(row.aycl)}
                                </p>
                                {row.badge ? (
                                  <span className="mt-1.5 inline-flex items-center rounded-full bg-[#F4AD42]/16 px-2 py-0.5 text-[10px] font-medium text-[#C77300] ring-1 ring-[#F4AD42]/30 sm:text-[11px]">
                                    {row.badge}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
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
            {senduraBadge && (
              <span className="inline-flex items-center justify-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                {senduraBadge}
              </span>
            )}
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("sendura.title")}</h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              {renderHighlightedText(t("sendura.intro"))}
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] xl:gap-16">
            {/* Image - Larger on mobile */}
            <div className="order-2 lg:order-1">
              <Image
                src="newmedia/Sendura_Comefunziona.png"
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
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-blue/5 via-white to-orange/10" />
        <div className="absolute -top-24 right-8 -z-10 h-48 w-48 rounded-full bg-orange/20 blur-[140px]" />
        <div className="absolute -bottom-28 left-12 -z-10 h-56 w-56 rounded-full bg-sky-blue/20 blur-[160px]" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Learning */}
            <article className="group relative overflow-hidden rounded-[2.5rem] border border-sky-blue/20 bg-white/90 p-8 shadow-[0_36px_90px_-60px_rgba(10,43,107,0.45)]">
              <div className="pointer-events-none absolute -top-16 right-4 h-40 w-40 rounded-full bg-sky-blue/15 blur-3xl transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-2" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-blue/30 bg-sky-blue/10">
                  <Image
                    src={learningLeadIcon.src}
                    alt={learningLeadIcon.alt}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue">Learning</span>
                  <h3 className="mt-1 text-2xl font-semibold text-navy">{t("learning.title")}</h3>
                </div>
              </div>
              <div className="relative mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
                {learningParagraphs.map((paragraph, index) => (
                  <p key={index}>{renderHighlightedText(paragraph)}</p>
                ))}
              </div>
              <ul className="relative mt-6 space-y-3">
                {learningBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-blue" />
                    <span>{renderHighlightedText(bullet)}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 rounded-2xl border border-sky-blue/20 bg-sky-blue/10 px-4 py-3">
                <p className="text-sm font-semibold text-navy">
                  {renderHighlightedText(t("learning.closing"))}
                </p>
              </div>
            </article>

            {/* Personalization */}
            <article className="group relative overflow-hidden rounded-[2.5rem] border border-orange/25 bg-white/90 p-8 shadow-[0_36px_90px_-60px_rgba(199,115,0,0.35)]">
              <div className="pointer-events-none absolute -top-20 left-6 h-44 w-44 rounded-full bg-orange/20 blur-3xl transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-3" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange/30 bg-orange/10">
                  <Image
                    src={personalizationLeadIcon.src}
                    alt={personalizationLeadIcon.alt}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                    Personalization
                  </span>
                  <h3 className="mt-1 text-2xl font-semibold text-navy">{t("personalization.title")}</h3>
                </div>
              </div>
              <div className="relative mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
                <p>{renderHighlightedText(t("personalization.intro"))}</p>
              </div>
              <ul className="relative mt-6 space-y-3">
                {personalizationBullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-orange" />
                    <span>{renderHighlightedText(bullet)}</span>
                  </li>
                ))}
              </ul>
              <div className="relative mt-6 rounded-2xl border border-orange/25 bg-orange/10 px-4 py-3">
                <p className="text-sm font-semibold text-navy">
                  {renderHighlightedText(t("personalization.closing"))}
                </p>
              </div>
            </article>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="inline-flex max-w-3xl items-center rounded-full border border-navy/15 bg-white/80 px-6 py-4 text-center shadow-[0_24px_60px_-45px_rgba(15,37,64,0.45)]">
              <p className="text-sm font-semibold text-navy sm:text-base">
                {renderHighlightedText(t("closingStatement"))}
              </p>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Human + AI */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.2,transparent_60%)]" />
        <div className="absolute -bottom-32 left-24 h-72 w-72 rounded-full bg-sky-blue/20 blur-[140px]" />
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            {humanAiBadge && (
              <span className="inline-flex items-center rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                {humanAiBadge}
              </span>
            )}
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
              {ecosystemBadge && (
                <span className="inline-flex items-center justify-center rounded-full bg-navy/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-navy">
                  {ecosystemBadge}
                </span>
              )}
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
                src="newmedia/Ecosistema_Evoluzione.png"
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
            <p className="text-base text-white/80 sm:text-lg">
              {renderHighlightedText(t("microcopy"))}
            </p>
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
