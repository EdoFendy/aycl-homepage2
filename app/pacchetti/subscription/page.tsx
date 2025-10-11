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

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange/10 rounded-lg">
                <span className="text-sm font-bold text-orange">{t("hero.badge")}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-navy leading-tight text-balance">
                {t.rich("hero.title", {
                  strong: (chunks) => <span className="text-orange">{chunks}</span>,
                })}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">{t("hero.kicker")}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{t("hero.subtitle")}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/contattaci">
                  <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                    {t("hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pagamento">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-orange text-orange hover:bg-orange/10"
                  >
                    {t("hero.payNow")}
                    <CreditCard className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <Image
                src="/calendario2.png"
                alt={t("hero.alt")}
                width={600}
                height={500}
                className="rounded-lg"
                priority
              />
            </div>
            </div>

        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
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
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange/5 via-transparent to-navy/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-orange" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{t("why.badge")}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">{t("why.title")}</h2>
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
      </div>
    </section>

{/* All You Can Leads System */}
<section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
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
        </div>
      </section>
      <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-sky-blue/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-orange/10 px-4 py-2 rounded-full mb-6"><Shield className="w-4 h-4 text-orange" /><span className="text-sm font-semibold text-orange">{t("guarantee.badge")}</span></div>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6 text-balance">
                {t.rich("guarantee.title", {
                  strong: (chunks) => <span className="text-orange">{chunks}</span>,
                })}
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{t("guarantee.subtitle")}</p>
            </div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Timeline and process steps */}
              <div className="lg:col-span-8">
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
                          <div className="w-16 h-16 bg-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <LineChart className="h-8 w-8 text-orange" />
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
                          <div className="w-16 h-16 bg-sky-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="h-8 w-8 text-sky-blue" />
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
                          <div className="w-16 h-16 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Shield className="h-8 w-8 text-navy" />
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

              {/* Sidebar with important notes */}
              <div className="lg:col-span-4">
                <div className="sticky top-8">
                  <Card className="p-8 bg-gradient-to-br from-sky-blue/5 via-white to-orange/5 border-2 border-sky-blue/20 relative overflow-hidden">
                    <div className="absolute top-4 right-4 w-8 h-8 bg-sky-blue/10 rounded-full flex items-center justify-center">
                      <span className="text-sky-blue font-bold text-sm">ℹ</span>
                    </div>
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
                        <div className="flex items-center gap-2 text-sm text-gray-600"><Shield className="w-4 h-4 text-orange" /><span className="font-medium">{t("guarantee.notes.title")}</span></div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-sky-blue/10">
        <div className="container mx-auto px-6">
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
                onClick={() => router.push('/pacchetti')}
              >
                {t("cta.secondary")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-navy">FAQ</h2>
          </div>

          <FAQCards
            className="mt-12"
            items={[
              {
                question: "Quali sono gli step operativi del Pacchetto Subscription?",
                answer:
                  "1. Call iniziale per verificare collaborazione e raccogliere informazioni.\n2. Definizione dell'ICP basato su parametri oggettivi.\n3. Studio di fattibilità per calcolare la quota appuntamento e stabilire il range mensile.\n4. Seconda call per condividere l'analisi e personalizzare l'offerta.\n5. Costruzione del piano operativo con il project manager dedicato.\n6. Attivazione delle campagne, fase di testing e messa a regime del sistema.",
              },
              {
                question: "Come viene stabilita la quota per appuntamento?",
                answer:
                  "La quota si basa su grandezza e complessità del cluster target, difficoltà e frequenza di contatto e localizzazione geografica del mercato. Se vengono definiti più ICP, ciascuno avrà una quotazione distinta.",
              },
              {
                question: "Quanti appuntamenti mensili sono previsti e come viene stabilito il range?",
                answer:
                  "Il range dipende dalla capacità della tua azienda di gestire le trattative. Tu indichi quanti appuntamenti vuoi avere ogni mese, noi verifichiamo che sia realistico rispetto al target e concordiamo la quota minima garantita.",
              },
              {
                question: "Posso recedere dal contratto in qualsiasi momento?",
                answer:
                  "Sì, puoi recedere con un preavviso di 28 giorni. Durante questo periodo portiamo a termine le attività in corso e restano dovuti gli appuntamenti già organizzati e confermati.",
              },
              {
                question: "Come si definisce il profilo del cliente ideale (ICP)?",
                answer:
                  "L'ICP viene definito su tre parametri: settore, fascia di fatturato e area geografica. Li determiniamo insieme per costruire il perimetro dei tuoi interlocutori ideali.",
              },
              {
                question: "Come posso monitorare i risultati e le attività?",
                answer:
                  "Hai una dashboard personale su Sendura aggiornata in tempo reale e report completi ogni due settimane, oltre a confronti regolari con il project manager dedicato.",
              },
              {
                question: "Mi mettete in contatto con decisori reali?",
                answer:
                  "Sì. Ti portiamo davanti a figure con potere decisionale, variando il livello dell'interlocutore in base alle tue necessità e alla struttura dell'azienda target.",
              },
              {
                question: "Potete lavorare con PMI e grandi aziende?",
                answer:
                  "Il sistema è flessibile e lavora sia con PMI sia con multinazionali. Cambiano il livello di scrematura e i referenti, ma la logica resta la stessa: parlare con chi decide.",
              },
              {
                question: "Da dove provengono i vostri dati e come li aggiornate?",
                answer:
                  "I dati arrivano da approvvigionamento diretto, integrazione da provider certificati e arricchimento proprietario con AI. Manteniamo ogni contatto aggiornato e segmentato.",
              },
              {
                question: "Cosa succede se un appuntamento non rispetta l'ICP?",
                answer:
                  "Se un appuntamento non rispetta i criteri concordati, non viene considerato valido. Hai 72 ore per segnalarlo e, se non è in linea, viene escluso senza costi.",
              },
              {
                question: "Utilizzate l'intelligenza artificiale nei vostri sistemi?",
                answer:
                  "Sì, l'AI è integrata nella segmentazione dei contatti, personalizzazione dei messaggi e gestione dei follow-up. L'obiettivo è aumentare efficienza e precisione mantenendo il controllo umano.",
              },
              {
                question: "Avrò un referente dedicato durante la collaborazione?",
                answer:
                  "Ogni cliente ha un project manager dedicato che segue tutte le fasi e resta sempre disponibile come punto di contatto diretto.",
              },
              {
                question: "Quanto tempo serve per vedere i primi risultati?",
                answer:
                  "I primi 30–90 giorni sono un periodo di testing fondamentale per raccogliere dati e ottimizzare. In questa fase possono già arrivare appuntamenti, ma l'obiettivo è mettere il sistema a regime.",
              },
              {
                question: "Quando devo saldare gli appuntamenti?",
                answer:
                  "Il saldo avviene una volta al mese, in base al range di appuntamenti qualificati previsto. Ricevi un resoconto degli incontri svolti e rendicontiamo solo quelli confermati.",
              },
            ]}
          />
        </div>
      </section>
      </div>
    </div>
  )
}
