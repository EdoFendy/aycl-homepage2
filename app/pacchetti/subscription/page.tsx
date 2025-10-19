"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Target,
  Users,
  BarChart3,
  CalendarCheck,
  LineChart,
  Sparkles,
  X,
  Database,
  Headphones,
  Zap,
  Calendar,
  TrendingUp,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FAQCards } from "@/components/faq-cards"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { PageLayoutContainer } from "@/components/page-layout-container"
import SlideArrowButton from "@/components/animata/button/slide-arrow-button"

export default function SubscriptionPage() {
  const router = useRouter()
  const t = useTranslations("pacchettiSubscription")
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"aycl-discovery"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 right-16 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute top-36 -left-16 h-60 w-60 rounded-full bg-sky-blue/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-12 h-64 w-16 -rotate-45 bg-navy/5" />
      <div className="relative z-10">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-sky-blue/10 -rotate-12" />

        <PageLayoutContainer className="px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange/10 rounded-lg">
                <span className="text-sm font-bold text-orange">{t("hero.badge")}</span>
              </div>
              <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight text-navy">
                {t.rich("hero.title", {
                  strong: (chunks) => <span className="text-orange">{chunks}</span>,
                })}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">{t("hero.kicker")}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t("hero.subtitle")}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SlideArrowButton
                  primaryColor="#ff9d3d"
                  text={t("hero.cta")}
                />
                <Link href="#pricing" className="text-navy underline underline-offset-4 text-sm sm:text-base flex items-center">{t("hero.ctaSecondary")}</Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <Image
                src="/newmedia/Subscription_Hero.png"
                alt={t("hero.alt")}
                width={600}
                height={500}
                className="rounded-lg"
                priority
              />
            </div>
            </div>
          </PageLayoutContainer>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <PageLayoutContainer className="px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">{t("how.title")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image 
                    src="/Subscription_icona_IlTuoTarget.png" 
                    alt={t("how.cards.targetTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy">{t("how.cards.targetTitle")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.cards.targetDesc")}</p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image 
                    src="/Subscription_icona_Strategia.png" 
                    alt={t("how.cards.strategyTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy">{t("how.cards.strategyTitle")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.cards.strategyDesc")}</p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-orange/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-orange/5 rounded-full blur-xl" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Image 
                    src="/Subscription_icona_Collaborazione.png" 
                    alt={t("how.cards.collabTitle")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy">{t("how.cards.collabTitle")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.cards.collabDesc")}</p>
              </div>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>

      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange/5 via-transparent to-navy/5 rounded-full blur-3xl"></div>
      
      <PageLayoutContainer className="px-6 relative z-10">
        {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-orange" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{t("why.badge")}</span>
            </div>
            <h2 className="text-4xl lg:text-4xl font-bold text-navy mb-6">{t("why.title")}</h2>
            <p className="text-lg text-gray-600">{t("why.subtitle")}</p>
          </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* POSITIVE CARD - Why it's right for you */}
          <Card className="group relative bg-white border-2 border-orange/20 rounded-3xl overflow-hidden hover:border-orange/40 transition-all duration-500 hover:shadow-2xl hover:shadow-orange/10">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border-8 border-orange/5 rounded-full"></div>
            
            {/* Icon badge */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-orange" />
            </div>

            <div className="relative p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-orange/10 rounded-full mb-4">
                  <span className="text-xs font-bold text-orange uppercase tracking-wider">{t("why.benefitsBadge")}</span>
                </div>
                <h3 className="text-2xl font-bold text-navy leading-tight">
                  {t("why.benefitsTitle")}
                </h3>
              </div>

              {/* Benefits list */}
              <ul className="space-y-5">
                {t.raw("why.benefits").map((text: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center group-hover/item:bg-orange/20 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-orange" />
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed font-medium">{text}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="mt-10 pt-6 border-t border-orange/10">
                <p className="text-sm text-gray-500 flex items-center gap-2"><span className="w-2 h-2 bg-orange rounded-full"></span>{t("why.footnote")}</p>
              </div>
            </div>
          </Card>

          {/* NEGATIVE CARD - What you won't have to deal with */}
          <Card className="group relative bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-50 rotate-45 rounded-2xl"></div>
            
            {/* Icon badge */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <X className="h-6 w-6 text-gray-600" />
            </div>

            <div className="relative p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full mb-4"><span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{t("why.problemsBadge")}</span></div>
                <h3 className="text-2xl font-bold text-navy leading-tight">{t("why.problemsTitle")}</h3>
              </div>

              {/* Problems list */}
              <ul className="space-y-5">
                {t.raw("why.problems").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 group/item">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-gray-200 transition-colors">
                        <X className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom accent */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 flex items-center gap-2"><span className="w-2 h-2 bg-gray-400 rounded-full"></span>{t("why.problemsFoot")}</p>
              </div>
            </div>
          </Card>
        </div>
        </PageLayoutContainer>
      </section>

    {/* All You Can Leads System */}
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <PageLayoutContainer className="px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">{t("system.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("system.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-white border-sky-blue/30 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <Image 
                  src="/Subscription_icona_Sendura.png" 
                  alt={t("system.cards.senduraTitle")}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{t("system.cards.senduraTitle")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("system.cards.senduraDesc")}</p>
            </Card>

            <Card className="p-8 bg-white border-orange/30 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <Image 
                  src="/Subscription_icona_Database.png" 
                  alt={t("system.cards.dbTitle")}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{t("system.cards.dbTitle")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("system.cards.dbDesc")}</p>
            </Card>

            <Card className="p-8 bg-white border-navy/30 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 flex items-center justify-center mb-6">
                <Image 
                  src="/Subscription_icona_Support.png" 
                  alt={t("system.cards.supportTitle")}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{t("system.cards.supportTitle")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("system.cards.supportDesc")}</p>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>
      <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-sky-blue/5 rounded-full blur-3xl" />
        
        <PageLayoutContainer className="px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-full mb-6">
                <Image
                  src="/Setupfee_icona_Garanzia.png"
                  alt="Garanzia Icon"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold text-orange">{t("guarantee.badge")}</span>
              </div>
              <h2 className="text-4xl lg:text-4xl font-bold text-navy mb-6 text-balance">
                {t.rich("guarantee.title", {
                  strong: (chunks) => <span className="text-orange">{chunks}</span>,
                })}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{t("guarantee.subtitle")}</p>
            </div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Timeline and process steps */}
              <div className="space-y-8">
                <div className="relative">
                  {/* Enhanced timeline for desktop */}
                  <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange via-sky-blue to-navy rounded-full" />
                  
                  {/* Process steps */}
                  <div className="space-y-12">
                    {/* Step 1: Fase di attivazione */}
                    <div className="relative flex items-start gap-8">
                      <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-orange rounded-full border-4 border-white shadow-lg relative z-10 flex-shrink-0">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <Card className="flex-1 p-8 bg-white border-orange/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/Setupfee_icona_Activation.png"
                              alt="Fase di attivazione"
                              width={32}
                              height={32}
                              className="object-contain w-8 h-8"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl font-bold text-navy">{t("guarantee.steps.1.title")}</h3>
                              <span className="px-3 py-1 bg-orange/10 text-orange text-sm font-semibold rounded-full">{t("guarantee.steps.1.label")}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{t("guarantee.steps.1.desc")}</p>
                            <ul className="space-y-3 text-gray-700">
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-orange mt-0.5 flex-shrink-0" />
                                <span>{t("guarantee.steps.1.desc")}</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-orange mt-0.5 flex-shrink-0" />
                                <span>La prima rata viene versata all'inizio della collaborazione</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Step 2: Fase operativa */}
                    <div className="relative flex items-start gap-8">
                      <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-sky-blue rounded-full border-4 border-white shadow-lg relative z-10 flex-shrink-0">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <Card className="flex-1 p-8 bg-white border-sky-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/Setupfee_icona_FaseOperativa.png"
                              alt="Fase Operativa"
                              width={32}
                              height={32}
                              className="object-contain w-8 h-8"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl font-bold text-navy">{t("guarantee.steps.2.title")}</h3>
                              <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue text-sm font-semibold rounded-full">{t("guarantee.steps.2.label")}</span>
                            </div>
                            <p className="text-gray-600 mb-4">{t("guarantee.steps.2.desc")}</p>
                            <ul className="space-y-3 text-gray-700">
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-sky-blue mt-0.5 flex-shrink-0" />
                                <span>La seconda rata è prevista 28 giorni dopo il primo appuntamento qualificato svolto</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-sky-blue mt-0.5 flex-shrink-0" />
                                <span>Il pagamento prosegue con cadenza regolare ogni 28 giorni</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-sky-blue mt-0.5 flex-shrink-0" />
                                <span>Risparmi il 25% rispetto alla quotazione standard per appuntamento</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Step 3: Garanzie incluse */}
                    <div className="relative flex items-start gap-8">
                      <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-navy rounded-full border-4 border-white shadow-lg relative z-10 flex-shrink-0">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <Card className="flex-1 p-8 bg-white border-navy/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/Setupfee_icona_Garanzia.png"
                              alt="Garanzia inclusa"
                              width={32}
                              height={32}
                              className="object-contain w-8 h-8"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-2xl font-bold text-navy">{t("guarantee.steps.3.title")}</h3>
                              <span className="px-3 py-1 bg-navy/10 text-navy text-sm font-semibold rounded-full">{t("guarantee.steps.3.label")}</span>
                            </div>
                            <ul className="space-y-3 text-gray-700">
                              <li className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" /><span>{t("guarantee.steps.3.desc")}</span></li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image section */}
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-sky-blue/20 rounded-full blur-xl"></div>
                  <Image
                    src="/newmedia/Subscription_Mensile.png"
                    alt="Subscription Mensile - Garanzia Totale"
                    width={500}
                    height={500}
                    className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
                    priority
                    unoptimized
                  />
                </div>
                
                {/* Sidebar with important notes */}
                <div className="sticky top-8">
                  <Card className="p-8 bg-gradient-to-br from-sky-blue/5 via-white to-orange/5 border-2 border-sky-blue/20 relative overflow-hidden">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-navy mb-2">{t("guarantee.notes.title")}</h3>
                        <p className="text-gray-600 text-sm">{t("guarantee.notes.subtitle")}</p>
                      </div>
                      
                      <div className="space-y-4">
                        {t.raw("guarantee.notes.items").map(
                          (
                            item: { title: string; desc: string },
                            index: number,
                          ) => (
                            <div
                              key={index}
                              className={`flex items-start gap-3 p-4 bg-white/50 rounded-lg border ${
                                index % 2 === 0
                                  ? "border-sky-blue/10"
                                  : "border-orange/10"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  index % 2 === 0
                                    ? "bg-sky-blue/10"
                                    : "bg-orange/10"
                                }`}
                              >
                                <span
                                  className={`font-bold text-sm ${
                                    index % 2 === 0
                                      ? "text-sky-blue"
                                      : "text-orange"
                                  }`}
                                >
                                  {index + 1}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-navy mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-700">{item.desc}</p>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Image
                            src="/Setupfee_icona_Info.png"
                            alt="Info"
                            width={18}
                            height={18}
                            className="object-contain w-5 h-5"
                          />
                          <span className="font-medium">{t("guarantee.notes.title")}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
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
                    className="w-full sm:w-[240px] h-[56px] px-8 py-4 rounded-lg border border-navy text-navy hover:bg-navy hover:text-white font-semibold text-base shadow-sm transition duration-200 flex items-center justify-center gap-3"
                  >
                    <img src="/iconaTelefono.png" alt="Telefono" className="w-5 h-5" />
                    Call Gratuita
                  </button>
                  
                  <button 
                    className="w-full sm:w-[240px] h-[56px] px-8 py-4 rounded-lg border border-navy text-navy hover:bg-navy hover:text-white font-semibold text-base shadow-sm transition duration-200 flex items-center justify-center gap-3"
                    onClick={() => router.push('/pacchetti')}
                  >
                    <img src="/iconaRegalo.png" alt="Regalo" className="w-5 h-5" />
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
                    alt="Call Gratuita - Subscription"
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

      <section className="py-24 bg-gray-50">
        <PageLayoutContainer className="px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-navy">FAQ</h2>
          </div>

          <FAQCards
            className="mt-12"
            items={t.raw("faq.items")}
          />
        </PageLayoutContainer>
      </section>
      </div>
    </div>
  )
}
