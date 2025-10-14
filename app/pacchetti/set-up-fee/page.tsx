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
import { FAQCards } from "@/components/faq-cards"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { PageLayoutContainer } from "@/components/page-layout-container"

export default function SetUpFeePage() {
  const t = useTranslations("pacchettiSetUpFee")
  
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

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight text-navy">
                {t.rich("hero.title", { strong: (c) => <span className="text-orange">{c}</span> })}
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">{t("hero.kicker")}</p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <button 
                  data-cal-namespace="aycl-discovery"
                  data-cal-link="giovannilucchesini/aycl-discovery"
                  data-cal-config='{"layout":"month_view"}'
                  className="bg-orange hover:bg-orange/90 text-white font-medium px-6 py-2.5 rounded-md transition-colors duration-200 flex items-center gap-2 text-base sm:text-lg w-full sm:w-auto"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <Link href="#pricing" className="text-navy underline underline-offset-4 text-sm sm:text-base">{t("hero.ctaSecondary")}</Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center order-2 lg:order-1">
              <Image
                src="/setupfee2.png"
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
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/10 transition-colors group-hover:bg-navy/20">
                        <CheckCircle2 className="h-5 w-5 text-navy" />
                      </div>
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
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gray-200">
                        <X className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                 <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">{t("partnership.numbersDesc")}</div>
              </div>
            </Card>
          </div>

            <div className="mt-16">
              <div className="relative overflow-hidden rounded-3xl border border-sky-blue/20 bg-gradient-to-r from-sky-blue/10 via-white to-orange/10 px-10 py-12 text-center shadow-lg">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">{t("partnership.numbersBadge")}</span>
                <p className="mt-4 text-3xl font-bold text-navy">{t("partnership.numbersTitle")}</p>
                <p className="mt-4 text-base text-gray-600 sm:mx-auto sm:max-w-3xl">{t("partnership.numbersDesc")}</p>
              </div>
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

          {/* FASE DI RICERCA E VALORE - NUOVA SEZIONE PRINCIPALE */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-orange/5 via-white to-sky-blue/5 rounded-3xl border border-orange/20 p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 mb-4">
                  <Rocket className="h-5 w-5 text-orange" />
                  <span className="text-sm font-semibold text-orange">Fase di Ricerca e Valore</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy mb-4">
                  Investiamo insieme nella tua crescita
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                  La Set-Up Fee non è un costo, ma un investimento condiviso per costruire la tua infrastruttura di crescita permanente.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-navy">Cosa costruiamo insieme</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Analisi approfondita del tuo mercato e ICP</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Database personalizzato con i tuoi prospect ideali</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Strategie di outreach su misura per il tuo settore</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Team dedicato e formazione del tuo staff</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-navy">Il valore che ottieni</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Accesso permanente alla nostra tecnologia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Processi ottimizzati per la tua azienda</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Conoscenza approfondita del tuo mercato</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">Partnership strategica a lungo termine</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/50 rounded-2xl p-6 border border-orange/10">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-navy mb-2">Investimento Set-Up Fee</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Da 20.000€ a 200.000€ in base alla complessità del tuo mercato e agli obiettivi di crescita
                  </p>
                  <div className="inline-flex items-center gap-2 bg-orange/10 rounded-full px-4 py-2">
                    <span className="text-sm font-semibold text-orange">Un investimento, accesso permanente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FASE OPERATIVA E GARANZIE */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="relative overflow-hidden border border-sky-blue/20 bg-white p-6 sm:p-8 shadow-lg">
              <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-sky-blue/10 blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-blue/10">
                    <TrendingUp className="h-5 w-5 text-sky-blue" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-sky-blue">
                    Fase Operativa
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy">Revenue Share</h3>
                <p className="text-sm text-gray-600">
                  Percentuale concordata (circa 20%) sui deal chiusi generati da AYCL. 
                  Siamo allineati ai tuoi risultati: guadagniamo solo se guadagni tu.
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-green-200 bg-white p-6 sm:p-8 shadow-lg">
              <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-green-100 blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Shield className="h-5 w-5 text-green-600" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-green-600">
                    Garanzie
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy">Rimborso 100%</h3>
                <p className="text-sm text-gray-600">
                  Se nel primo anno non generiamo almeno il doppio della Set-Up Fee, 
                  rimborso completo. Il nostro successo è legato al tuo.
                </p>
              </div>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>


      {/* PERCHÉ FUNZIONA / OPERATIVO */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange via-sky-blue to-navy" />
        <div className="pointer-events-none absolute left-10 top-12 h-40 w-40 rounded-full bg-orange/10 blur-2xl" />
        <div className="pointer-events-none absolute right-16 bottom-12 h-48 w-48 rounded-full bg-sky-blue/15 blur-3xl" />

        <PageLayoutContainer className="relative z-10 px-6">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <Card className="relative overflow-hidden border border-sky-blue/30 bg-white/95 p-10 shadow-lg backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/10 via-transparent to-orange/10" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold text-navy">{t("whyWorks.title")}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{t("whyWorks.desc")}</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {t.raw("whyWorks.bullets").map((b: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-sky-blue" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-navy/20 bg-white/95 p-10 shadow-lg backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-orange/10" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-bold text-navy">{t("whyWorks.opTitle")}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{t("whyWorks.opDesc")}</p>
                <ul className="space-y-3 text-sm text-gray-700">
                  {t.raw("whyWorks.opBullets").map((b: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-navy" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>


      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-sky-blue/10">
        <PageLayoutContainer className="px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center p-8 bg-white/80 rounded-2xl shadow-lg border border-sky-blue/10">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-orange/10 text-orange text-lg w-12 h-12 font-bold shadow">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy leading-tight">{t("cta.title")}</h2>
            </div>
            <div className="w-full mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                data-cal-namespace="aycl-discovery"
                data-cal-link="giovannilucchesini/aycl-discovery"
                data-cal-config='{"layout":"month_view"}'
                className="w-full sm:w-auto px-10 py-4 rounded-lg bg-orange hover:bg-orange/90 text-white font-semibold text-lg shadow-md transition duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10m-13 7V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                {t("cta.primary")}
              </button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-navy text-navy hover:bg-navy/5 px-10 py-4 rounded-lg shadow-sm font-semibold text-lg w-full sm:w-auto" 
                onClick={() => window.location.href = '/pacchetti'}
              >
                {t("cta.secondary")}
              </Button>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-24 bg-white">
        <div className="pointer-events-none absolute top-6 right-16 h-40 w-40 rounded-full bg-orange/15 blur-2xl" />
        <div className="pointer-events-none absolute bottom-8 left-12 h-52 w-52 rounded-full bg-sky-blue/10 blur-3xl" />

        <PageLayoutContainer className="px-6">
          <div className="mx-auto mb-12 max-w-4xl space-y-4 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Domande frequenti
            </span>
            <h2 className="text-4xl font-bold text-navy">FAQ sul pacchetto Set-Up Fee + Revenue Share</h2>
            <p className="text-base text-gray-600">
              Tutto quello che serve per capire come funziona la partnership più ambiziosa di AYCL.
            </p>
          </div>

          <FAQCards
            className="mt-12"
            items={[
              {
                question: "1) Quali sono gli step operativi del Pacchetto Set-Up Fee + Revenue Share?",
                answer:
                  "Il processo di attivazione mantiene alcuni elementi comuni a tutti i clienti, ma è costruito fin dall’inizio in ottica di partnership strategica.\n• Primo step: call iniziale per verificare la possibilità di collaborazione, raccogliere informazioni e valutare la compatibilità con il modello a revenue share.\n• Secondo step: definizione dell’ICP (profilo cliente ideale) con parametri oggettivi (settore, area geografica, dimensione aziendale).\n• Terzo step: studio di fattibilità operativo ed economico: valutiamo il potenziale di mercato, stimiamo il ritorno atteso e definiamo insieme i KPI.\n• Quarto step: seconda call di confronto per condividere l’analisi, definire i termini dell’accordo e stabilire i criteri di revenue share.\n• Quinto step: costruzione del piano strategico e operativo con il project manager dedicato, con roadmap orientata alla massimizzazione del fatturato.\n• Sesto step: attivazione delle campagne, fase di testing e progressiva messa a regime.",
              },
              {
                question: "2) Quali parametri applicate per calcolare fee iniziale e revenue share?",
                answer:
                  "La Set-Up Fee è un versamento una tantum che garantisce l’accesso permanente al sistema. L’importo viene stabilito in base a: cluster di riferimento (settore e dimensione del mercato), volumi e complessità della strategia (numero di contatti e canali), ticket medio delle trattative. Alla fee iniziale si affianca la revenue share, percentuale concordata sul fatturato delle trattative concluse grazie alle attività AYCL.",
              },
              {
                question: "3) La mia azienda è adatta a questa formula di partnership?",
                answer:
                  "È pensata per imprese già strutturate, con esperienze e investimenti concreti nella crescita. Tipicamente aziende che hanno già budget per traffico a pagamento, conoscono il valore di lungo periodo della clientela e hanno un portafoglio prodotti/servizi solido, capace di sostenere volumi di trattative più elevati.",
              },
              {
                question: "4) Che vantaggi offre l’accesso permanente al sistema rispetto ai servizi a tempo?",
                answer:
                  "Con i servizi tradizionali, finito il contratto finiscono anche i risultati. Con l’accesso permanente, invece: tecnologia, database e know-how restano sempre al servizio della tua azienda; la collaborazione è una partnership a lungo termine; la revenue share assicura allineamento totale sugli obiettivi.",
              },
              {
                question: "5) Come si definisce l’ICP (profilo cliente ideale)?",
                answer:
                  "L’ICP viene definito su tre parametri oggettivi: settore, fascia di fatturato e area geografica. Li indichi tu: su questa base effettuiamo uno studio di fattibilità per capire come intercettarli al meglio e con quali mezzi.",
              },
              {
                question: "6) Come posso monitorare risultati e attività?",
                answer:
                  "Attraverso due strumenti: 1) dashboard personale su Sendura con dati in tempo reale; 2) report completi ogni due settimane e confronti regolari con il project manager dedicato.",
              },
              {
                question: "7) Mi portate direttamente dai decisori?",
                answer:
                  "Puntiamo a figure con reale peso decisionale. Nelle PMI spesso il decisore è il CEO/titolare; nelle aziende strutturate il potere è distribuito, quindi ti mettiamo davanti a direttori di reparto o manager locali che gestiscono budget e scelte operative.",
              },
              {
                question: "8) Potete raggiungere solo grandi aziende o anche PMI?",
                answer:
                  "Lavoriamo sia con PMI sia con aziende medio-grandi e multinazionali. Cambiano livello di scrematura e figure target, ma la logica rimane la stessa: parlare con chi può davvero decidere.",
              },
              {
                question: "9) Da dove provengono i vostri dati e come li aggiornate?",
                answer:
                  "Tre fasi: 1) approvvigionamento diretto con sistemi interni di ricerca, raccolta e verifica; 2) integrazione da provider certificati per ampliare la copertura; 3) arricchimento proprietario (scoring + AI) per segmentare meglio e mantenere il database aggiornato.",
              },
              {
                question: "10) Utilizzate l’intelligenza artificiale?",
                answer:
                  "Sì, nella segmentazione dei contatti, nella personalizzazione dei messaggi e nella gestione delle priorità di follow-up. L’AI aumenta efficienza e precisione; il team mantiene il controllo finale.",
              },
              {
                question: "11) Avrò un referente dedicato?",
                answer:
                  "Sì. Ogni cliente ha un project manager dedicato che segue tutte le fasi della collaborazione ed è il tuo punto di contatto diretto.",
              },
              {
                question: "12) Quanto tempo serve per vedere i primi risultati?",
                answer:
                  "I primi 30–90 giorni sono un periodo di testing per raggiungere massa dati statisticamente rilevante e impostare ottimizzazioni. In questa fase possono già arrivare appuntamenti, ma l’obiettivo è portare il sistema a regime per un flusso costante e prevedibile.",
              },
            ]}
          />

          {/* CTA Finale */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <p className="text-center text-lg text-gray-700">
              Pronto a trasformare AYCL in un alleato strategico di lungo periodo?
            </p>
            <Link href="/contattaci">
              <Button size="lg" className="bg-orange hover:bg-orange/90 px-8 text-lg text-white">
                Avvia la partnership
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </PageLayoutContainer>
      </section>
    </div>
  )
}
