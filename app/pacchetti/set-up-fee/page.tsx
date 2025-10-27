"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  Compass,
  Settings,
  TrendingUp,
  Shield,
  Link as LinkIcon,
  Sparkles,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FAQAccordion } from "@/components/faq-accordion"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { PageLayoutContainer } from "@/components/page-layout-container"
import SlideArrowButton from "@/components/animata/button/slide-arrow-button"

export default function SetUpFeePage() {
  const t = useTranslations("pacchettiSetUpFee")
  const tFaq = useTranslations("faq")
  const investmentTag = t("researchPhase.investmentTag")
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"aycl-discovery"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative pt-24 pb-12 overflow-hidden sm:pt-32 sm:pb-20">
        <div className="absolute top-16 right-4 h-20 w-20 rotate-12 rounded-lg bg-sky-blue/10 sm:top-20 sm:right-10 sm:h-32 sm:w-32" />
        <div className="absolute top-32 left-4 h-16 w-16 rounded-full bg-orange/10 sm:top-40 sm:left-10 sm:h-24 sm:w-24" />
        <div className="absolute bottom-6 right-1/4 h-32 w-12 -rotate-45 bg-navy/5 sm:bottom-12 sm:h-48 sm:w-16" />

        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-1">
              <div className="inline-block rounded-full bg-orange px-4 py-2">
                <span className="text-sm font-medium text-white">{t("hero.badge")}</span>
              </div>

              <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight text-navy">
                {t.rich("hero.title", { strong: (c) => <span className="text-orange">{c}</span> })}
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">{t("hero.kicker")}</p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <SlideArrowButton
                  primaryColor="#ff9d3d"
                  text={t("hero.ctaPrimary")}
                />
                <Link href="#pricing" className="text-navy underline underline-offset-4 text-sm sm:text-base">{t("hero.ctaSecondary")}</Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center order-2 lg:order-1">
              <Image
                src="/ManoStella.png"
                alt={t("hero.alt")}
                width={520}
                height={480}
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
              />
            </div>
            </div>
          </PageLayoutContainer>
      </section>

      {/* COME FUNZIONA */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <PageLayoutContainer className="px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">
              {t.rich("how.title", { strong: (c) => <span className="text-orange">{c}</span> })}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Image 
                    src="/iconaProgettazione.png" 
                    alt={t("how.cards.planTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{t("how.cards.planTitle")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.cards.planDesc")}</p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Image 
                    src="/iconaMachine.png" 
                    alt={t("how.cards.activateTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{t("how.cards.activateTitle")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.cards.activateDesc")}</p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-navy/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-navy/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Image 
                    src="/Subscription_icona_Database.png" 
                    alt={t("how.cards.scaleTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{t("how.cards.scaleTitle")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.cards.scaleDesc")}</p>
              </div>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>


      {/* PER CHI È / COSA NON DOVRAI PIÙ FARE */}
      <section className="relative overflow-hidden py-32 bg-gradient-to-b from-white via-gray-50/40 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-8 h-48 w-48 -rotate-12 rounded-3xl bg-sky-blue/10 blur-2xl" />
          <div className="absolute right-12 bottom-12 h-56 w-56 rounded-full bg-orange/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-navy/5 via-transparent to-orange/5 blur-3xl" />
        </div>

        <PageLayoutContainer className="relative z-10 px-6">
            <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-navy" />
                {t("partnership.badge")}
              </div>
              <h2 className="text-4xl font-bold text-navy md:text-4xl">{t("partnership.title")}</h2>
              <p className="text-lg text-gray-600">{t("partnership.subtitle")}</p>
            </div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-4">
            <Card className="group relative overflow-hidden rounded-3xl border-2 border-navy/20 bg-white transition-all duration-500 hover:border-navy/40 hover:shadow-2xl hover:shadow-navy/10 lg:col-span-2">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-navy/10 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full border-8 border-navy/5" />
              <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange text-white transition-transform duration-300 group-hover:scale-110">
                <Shield className="h-6 w-6" />
              </div>

              <div className="relative p-10">
                <div className="mb-8 space-y-3">
                  <div className="inline-block rounded-full bg-orange/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {t("partnership.isForYouBadge")}
                  </div>
                  <h3 className="text-2xl font-bold leading-tight text-navy">{t("partnership.isForYouTitle")}</h3>
                </div>

                <ul className="space-y-4 text-gray-700">
                  {t.raw("partnership.isForYou").map((item: string) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="text-sky-blue font-bold mt-1">•</span>
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-navy/10 pt-6 text-sm text-gray-500">{t("partnership.isForYouFoot")}</div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden rounded-3xl border-2 border-gray-200 bg-white transition-all duration-500 hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-200/50 lg:col-span-2">
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-gray-100 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute -top-8 -right-8 h-32 w-32 rotate-45 rounded-2xl bg-gray-50" />
              <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 transition-transform duration-300 group-hover:scale-110">
                <X className="h-6 w-6 text-gray-600" />
              </div>

              <div className="relative p-10">
                <div className="mb-8 space-y-3">
                  <div className="inline-block rounded-full bg-gray-900/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {t("partnership.freeFromBadge")}
                  </div>
                  <h3 className="text-2xl font-bold leading-tight text-navy">{t("partnership.freeFromTitle")}</h3>
                </div>

                <ul className="space-y-5 text-gray-700">
                  {t.raw("partnership.freeFrom").map((item: string) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="text-gray-600 font-bold mt-1">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">{t("partnership.numbersDesc")}</div>
              </div>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>


      {/* INFRASTRUTTURA AYCL */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="pointer-events-none absolute top-10 right-16 h-64 w-64 rounded-full bg-sky-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-6 left-12 h-48 w-48 rounded-full bg-orange/10 blur-2xl" />

        <PageLayoutContainer className="relative z-10 px-6">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-3 font-semibold text-sky-blue">
                <div className="h-1 w-12 bg-gradient-to-r from-navy to-sky-blue" />
                <span>{t("infrastructure.kicker")}</span>
              </div>
              <h2 className="text-4xl font-bold text-navy">{t("infrastructure.title")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t("infrastructure.desc")}</p>
            </div>

          <div className="mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden border border-sky-blue/30 bg-white p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-blue/15 to-transparent blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <Image 
                    src="/Subscription_icona_Sendura.png" 
                    alt={t("infrastructure.cards.senduraTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy">{t("infrastructure.cards.senduraTitle")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t("infrastructure.cards.senduraDesc")}</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-sky-blue/30 bg-white p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-blue/15 to-transparent blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <Image 
                    src="/Subscription_icona_Database.png" 
                    alt={t("infrastructure.cards.dbTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy">{t("infrastructure.cards.dbTitle")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t("infrastructure.cards.dbDesc")}</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-sky-blue/30 bg-white p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-blue/15 to-transparent blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <Image 
                    src="/Subscription_icona_Support.png" 
                    alt={t("infrastructure.cards.supportTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-navy">{t("infrastructure.cards.supportTitle")}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t("infrastructure.cards.supportDesc")}</p>
              </div>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>

      <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

      {/* MODELLO ECONOMICO + PRICING */}
      {/* ECONOMICS - Riformulata con focus su ricerca e valore */}
      <section id="pricing" className="relative overflow-hidden py-16 sm:py-24 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy/5 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-36 w-36 rounded-full bg-orange/15 blur-2xl" />

        <PageLayoutContainer className="relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <span className="inline-flex items-center justify-center rounded-full border border-orange/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange sm:px-4 sm:text-sm">
              {t("economics.badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy">{t("economics.title")}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">{t("economics.desc")}</p>
          </div>


          {/* MODELLO ECONOMICO - LAYOUT COMPATTO CON IMMAGINE */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* BOX SINISTRA - COMPATTO */}
            <div className="bg-gradient-to-br from-orange/5 via-white to-sky-blue/5 rounded-3xl border border-orange/20 p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 mb-4">
                  <Rocket className="h-5 w-5 text-orange" />
                  <span className="text-sm font-semibold text-orange">{t("researchPhase.badge")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4">
                  {t("researchPhase.title")}
                </h3>
                <p className="text-base text-gray-600">
                  {t("researchPhase.subtitle")}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-navy">{t("researchPhase.buildTogether")}</h4>
                  <ul className="space-y-2">
                    {t.raw("researchPhase.buildItems").map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange font-bold mt-0.5">•</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-navy">{t("researchPhase.valueYouGet")}</h4>
                  <ul className="space-y-2">
                    {t.raw("researchPhase.valueItems").map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange font-bold mt-0.5">•</span>
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-4 border border-orange/10">
                <div className="text-center">
                  <h4 className="text-base font-semibold text-navy mb-2">{t("researchPhase.investmentTitle")}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {t("researchPhase.investmentDesc")}
                  </p>
                  {investmentTag.trim().length > 0 && (
                    <div className="inline-flex items-center gap-2 bg-orange/10 rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-orange">{investmentTag}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* IMMAGINE DESTRA - FLUTTUANTE E PIÙ GRANDE */}
            <div className="flex items-center justify-center lg:justify-end">
              <Image
                src="/Drivetest_Razzo.png"
                alt="Drive Test Razzo"
                width={600}
                height={600}
                className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl object-contain"
              />
            </div>
          </div>
        </PageLayoutContainer>
      </section>
      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <PageLayoutContainer className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content section */}
              <div className="text-center lg:text-left">
                <div className="mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">{t("cta.title")}</h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto lg:mx-0">{t("cta.subtitle")}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    data-cal-namespace="aycl-discovery"
                    data-cal-link="giovannilucchesini/aycl-discovery"
                    data-cal-config='{"layout":"month_view"}'
                    className="w-full sm:w-[240px] h-[56px] px-8 py-4 rounded-lg bg-orange text-white hover:bg-orange/90 font-semibold text-base shadow-sm transition duration-200 flex items-center justify-center gap-3"
                  >
                    <img src="/iconaTelefono.png" alt="Telefono" className="w-5 h-5" />
                    Call Gratuita
                  </button>
                  
                  <button 
                    className="w-full sm:w-[240px] h-[56px] px-8 py-4 rounded-lg bg-orange/20 text-orange border-0 font-semibold text-base hover:bg-orange/30 transition duration-200 flex items-center justify-center gap-3"
                    onClick={() => window.location.href = '/pacchetti'}
                  >
                    <img src="/iconaPrice.png" alt="Regalo" className="w-5 h-5" />
                    {t("cta.secondary")}
                  </button>
                </div>
              </div>

              {/* Image section */}
              <div className="text-center lg:text-right">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-orange/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky-blue/20 rounded-full blur-xl"></div>
                  <Image
                    src="/newmedia/FreeCall.png"
                    alt="Call Gratuita - Setup Fee"
                    width={400}
                    height={400}
                    className="relative z-10 w-full max-w-sm mx-auto lg:mx-0 drop-shadow-xl"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* FAQ - standardized */}
      <section className="relative overflow-hidden py-24 bg-white">
        <div className="pointer-events-none absolute top-6 right-16 h-40 w-40 rounded-full bg-orange/15 blur-2xl" />
        <div className="pointer-events-none absolute bottom-8 left-12 h-52 w-52 rounded-full bg-sky-blue/10 blur-3xl" />

        <PageLayoutContainer className="px-6">
          <div className="mx-auto mb-12 max-w-4xl space-y-4 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              {t("faq.badge")}
            </span>
            <h2 className="text-4xl font-bold text-navy">{t("faq.title")}</h2>
            <p className="text-base text-gray-600">
              {t("faq.subtitle")}
            </p>
          </div>

          <FAQAccordion
            className="mt-12"
            items={tFaq.raw("setupFee.items")}
          />

          <div className="mt-12 flex justify-center">
            <Link href="/faq" className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-white font-semibold hover:bg-navy/90 transition">
              {tFaq("cta.goToFaq")}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </PageLayoutContainer>
      </section>
    </div>
  )
}
