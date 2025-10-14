"use client"

import { Button } from "@/components/ui/button"
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
    { src: "/iconaRegalo.png", alt: "Icona scopri i pacchetti" },
  ]

  const aiStatsIcon: IconAsset = {
    src: "/iconaPerformance.png",
    alt: "Icona insight sulle performance",
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-sky-blue/10 to-orange/5" />
        <div className="absolute -top-32 right-[-8%] h-72 w-72 rounded-full bg-orange/20 blur-[120px]" />
        <div className="absolute bottom-[-16%] left-[-10%] h-80 w-80 rounded-full bg-sky-blue/20 blur-[140px]" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] xl:gap-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-blue/30 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-sky-blue shadow-sm backdrop-blur">
                <span>{t("hero.eyebrow")}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {heroLead}
              </p>
               <div className="space-y-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                 {heroContext.map((paragraph, index) => (
                   <p key={index}>{paragraph}</p>
                 ))}
               </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/contattaci">
                     <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-base px-6 sm:text-lg sm:px-8">
                       {t("hero.cta.primary")}
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
                {heroOutcomePrimary && (
                  <div className="rounded-3xl border-l-4 border-orange/70 bg-gradient-to-r from-orange/10 via-white to-sky-blue/10 px-6 py-5 shadow-[0_24px_48px_-36px_rgba(255,165,0,0.45)]">
                    <p className="text-sm font-semibold text-navy sm:text-base">{heroOutcomePrimary}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[3rem] p-6">
                <Image
                  src="/comefunziona_hero.png"
                  alt="Dashboard Sendura"
                  width={540}
                  height={400}
                  className="h-full w-full object-cover"
                  priority
                />
                {heroOutcomeSecondary && (
                  <div className="mt-6 rounded-2xl border border-orange/30 bg-gradient-to-br from-orange/10 via-white to-sky-blue/10 p-5 text-sm leading-relaxed text-gray-700 shadow-inner">
                    {heroOutcomeSecondary}
                  </div>
                )}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-sky-blue/30 bg-sky-blue/10 px-4 py-3 text-sm font-semibold text-navy text-center">
                    <span>{t("ai.title")}</span>
                  </div>
                  <div className="rounded-2xl border border-orange/30 bg-orange/10 px-4 py-3 text-sm font-semibold text-navy text-center">
                    <span>{t("principle.title")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principle Section */}
      <section className="relative py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-navy/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-sky-blue/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6">
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
                  src="/comefunziona2.png"
                  alt="Analisi performance outreach"
                  width={540}
                  height={420}
                  className="h-full w-full object-cover rounded-[2.75rem]"
                />
              </div>
            </div>
            </div>
          </div>
      
      </section>

      {/* Application Section */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.2,transparent_60%)]" />
        <div className="absolute -bottom-32 right-24 h-72 w-72 rounded-full bg-sky-blue/20 blur-[140px]" />
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      {/* AI Stats Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-sky-blue/15 to-white" />
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-sky-blue/10 to-orange/10" />
        <div className="absolute inset-y-0 right-[8%] -z-10 hidden w-[32%] rounded-full bg-orange/30 blur-[160px] lg:block" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              {t("comparison.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("comparison.title")}</h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">{t("comparison.subtitle")}</p>
          </div>
           <div className="mt-14 mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-navy/15 bg-white shadow-[0_48px_120px_-64px_rgba(1,47,107,0.55)]">
            <div className="grid grid-cols-1 divide-y divide-navy/10 sm:grid-cols-[1fr_1fr_1fr] sm:divide-y-0 sm:border-b sm:border-navy/10">
              <div className="px-6 py-6 sm:border-r sm:border-navy/10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy/60">
                  {t("comparison.aspectLabel")}
                </p>
              </div>
              <div className="px-6 py-6 sm:border-r sm:border-navy/10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                  {t("comparison.columns.traditional")}
                </p>
              </div>
              <div className="px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange/70">
                  {t("comparison.columns.aycl")}
                </p>
              </div>
            </div>
            <div className="divide-y divide-navy/10">
              {comparisonRows.map((row, index) => (
                <div
                  key={row.aspect}
                  className="grid gap-6 px-6 py-10 sm:grid-cols-[1fr_1fr_1.1fr] sm:items-start"
                >
                  <div className="flex items-start gap-4">
               
                    <div>
                      <h3 className="text-base font-semibold text-navy">{row.aspect}</h3>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                      {t("comparison.columns.traditional")}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{row.traditional}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/40 via-orange/20 to-sky-blue/20 opacity-70 blur-2xl" aria-hidden />
                    <div className="relative rounded-2xl border border-orange/40 bg-white/95 p-5 shadow-[0_36px_70px_-48px_rgba(255,165,0,0.55)]">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                        <div className="h-2.5 w-2.5 rounded-full bg-orange" />
                        {t("comparison.columns.aycl")}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-800">{row.aycl}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-navy/10 bg-gradient-to-r from-navy/5 via-white to-orange/10 px-6 py-6 text-center">
              <p className="text-sm text-gray-600">{t("comparison.subtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sendura Section */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-blue/15 to-orange/10" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-orange/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange">
              {t("sendura.title")}
            </span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{t("sendura.title")}</h2>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">{t("sendura.intro")}</p>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] xl:gap-16">
            <div className="relative">
              <div className="absolute -top-10 -left-8 h-64 w-64 rounded-full bg-orange/20 blur-[120px]" />
              <div className="absolute -bottom-12 right-0 h-60 w-60 rounded-full bg-sky-blue/20 blur-[120px]" />
              <div className="relative overflow-hidden rounded-[2.75rem] border border-white/60 bg-white/95 shadow-[0_48px_120px_-60px_rgba(1,47,107,0.55)] backdrop-blur">
                <div className="grid grid-cols-2 gap-3 p-3 sm:p-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                    <Image
                      src="/analytics-dashboard-with-real-time-metrics.jpg"
                      alt="Dashboard outreach"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 280px, 80vw"
                    />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                    <Image
                      src="/strategic-planning-with-data-analysis.jpg"
                      alt="Pianificazione strategica"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 280px, 80vw"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {senduraBullets.map((bullet, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-3xl border border-navy/10 bg-white/95 p-5 shadow-[0_24px_60px_-42px_rgba(1,47,107,0.35)]"
                  >
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange/15">
                      <Image
                        src={senduraBulletIcon.src}
                        alt={senduraBulletIcon.alt}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <div>
                   
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">{bullet}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border-l-4 border-orange/70 bg-gradient-to-r from-orange/10 via-white to-sky-blue/10 px-6 py-5 shadow-[0_32px_70px_-50px_rgba(255,165,0,0.45)]">
                <p className="text-sm font-semibold text-navy sm:text-base">{t("sendura.closing")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Personalization */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-blue/10 to-white" />
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      {/* Human + AI */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-[#0a1d3c] to-slate-900 py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--sky-blue)/0.2,transparent_65%)]" />
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      {/* Ecosystem */}
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-sky-blue/10 to-orange/10" />
        <div className="container mx-auto px-4 sm:px-6">
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
              <div className="absolute -top-8 -right-8 h-48 w-48 rounded-full bg-orange/20 blur-3xl" />
              <div className="absolute -bottom-12 -left-10 h-56 w-56 rounded-full bg-sky-blue/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.75rem] border border-navy/10 shadow-[0_48px_96px_-60px_rgba(1,47,107,0.45)]">
                <Image
                  src="/strategic-planning-with-data-analysis.jpg"
                  alt="Outreach evolution"
                  width={540}
                  height={420}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy/95 to-black py-24 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--orange)/0.25,transparent_65%)]" />
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>
    </div>
  )
}
