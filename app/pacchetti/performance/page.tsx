"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Database,
  Headphones,
  Sparkles,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FAQCards } from "@/components/faq-cards"
import { useTranslations } from "next-intl"

export default function PerformancePage() {
  const t = useTranslations("pacchettiPerformance")
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 right-20 h-80 w-80 rounded-full bg-sky-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -left-20 h-60 w-60 rounded-full bg-orange/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-navy/5 blur-3xl" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange/10 rotate-12" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange/10 rounded-lg">
                <span className="text-sm font-bold text-orange">{t("hero.badge")}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
                {t.rich("hero.title", {
                  strong: (chunks) => <span className="text-orange">{chunks}</span>,
                })}
              </h1>
              <p className="text-2xl font-semibold text-gray-800">{t("hero.kicker")}</p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="relative p-0 bg-transparent border-none shadow-none">
                <Image
                  src="/Performance.png"
                  alt={t("hero.alt")}
                  width={600}
                  height={500}
                  className="rounded-lg bg-transparent"
                  style={{ background: "none", boxShadow: "none", border: "none", outline: "none" }}
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
        <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

        {/* Come Funziona */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">{t("how.title")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                {/* L'immagine è direttamente sullo sfondo senza bordi, ombre o contenitore */}
                <Image 
                  src="/IconaProfiloideale.png" 
                  alt={t("how.steps.1.title")}
                  width={64}
                  height={64}
                  className="mb-6 object-contain"
                  style={{ display: "block", background: "none", boxShadow: "none", border: "none", outline: "none" }}
                />
                <h3 className="text-xl font-bold text-navy mb-4">{t("how.steps.1.title")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.steps.1.desc")}</p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Image 
                    src="/IconaStrategia.png" 
                    alt={t("how.steps.2.title")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{t("how.steps.2.title")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.steps.2.desc")}</p>
              </div>
            </Card>

            <Card className="p-8 bg-white border-sky-blue/20 hover:shadow-xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-blue/5 rounded-full blur-xl" />
              <div className="relative">
                <div className="w-16 h-16 flex items-center justify-center mb-6">
                  <Image 
                    src="/IconaMonitoraggio.png" 
                    alt={t("how.steps.3.title")}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{t("how.steps.3.title")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("how.steps.3.desc")}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

        {/* È per te se */}
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-blue/5 via-transparent to-orange/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
              <Sparkles className="h-4 w-4 text-sky-blue" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{t("why.badge")}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">{t("why.title")}</h2>
            <p className="text-lg text-gray-600">{t("why.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="group relative bg-white border-2 border-sky-blue/20 rounded-3xl overflow-hidden hover:border-sky-blue/40 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-blue/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-blue/10 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-8 border-sky-blue/5 rounded-full"></div>

              <div className="absolute top-6 right-6 w-12 h-12 bg-sky-blue/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-sky-blue" />
              </div>

              <div className="relative p-10">
                <div className="mb-8">
                  <div className="inline-block px-3 py-1 bg-sky-blue/10 rounded-full mb-4">
                    <span className="text-xs font-bold text-sky-blue uppercase tracking-wider">✓ Vantaggi</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy leading-tight">Il pacchetto Performance è la scelta giusta per te se…</h3>
                </div>

                <ul className="space-y-5">
                  {t.raw("why.benefits").map((item: string, index: number) => (
                    <li key={item} className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-sky-blue/10 flex items-center justify-center group-hover/item:bg-sky-blue/20 transition-colors">
                          <CheckCircle2 className="h-5 w-5 text-sky-blue" />
                        </div>
                      </div>
                      <span className="text-gray-700 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-sky-blue/10">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-sky-blue rounded-full"></span>
                    {t("why.footnote")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="group relative bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-100 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-50 rotate-45 rounded-2xl"></div>

              <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <X className="h-6 w-6 text-gray-600" />
              </div>

              <div className="relative p-10">
                <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full mb-4">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{t("why.problemsBadge")}</span>
                </div>
                <h3 className="text-2xl font-bold text-navy leading-tight">{t("why.problemsTitle")}</h3>
                </div>

                <ul className="space-y-5">
                  {t.raw("why.problems").map((item: string) => (
                    <li key={item} className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover/item:bg-gray-200 transition-colors">
                          <X className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    {t("why.problemsFoot")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

  
        </div>
      </section>
        <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

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

        {/* Investimento */}
        <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-4xl font-bold text-navy">{t("investment.title")}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("investment.desc")}</p>
            </div>

            <Card className="relative overflow-hidden p-10 bg-white border border-sky-blue/20 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-blue/5 via-white to-orange/5" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  <span>Accendi il sistema</span>
                  <span>Spingi sulle vendite</span>
                </div>

                {/* Versione responsive: elementi distribuiti correttamente su mobile senza spazi vuoti */}
                <div className="relative mt-8 pt-12 pb-6">
                  {/* Barra */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-navy via-sky-blue to-orange" style={{zIndex: 0}} />

                  {/* Desktop version */}
                  <div className="relative hidden sm:flex justify-between items-end z-10" style={{minHeight: "140px"}}>
                    {t.raw("investment.timeline.desktop").map((item: any, index: number) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-2 text-center w-1/4 min-w-[90px]"
                        style={{position: "relative", zIndex: 2}}
                      >
                        {/* Cerchio deve toccare la linea */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-base font-bold text-navy shadow-lg ring-2 ring-sky-blue/40 shrink-0 -mt-7">
                          {item.amount}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-600 max-w-[140px] leading-snug">{item.caption}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mobile version - elementi distribuiti correttamente senza spazi vuoti */}
                  <div className="relative sm:hidden flex justify-between items-end z-10" style={{minHeight: "140px"}}>
                    {t.raw("investment.timeline.mobile").map((item: any, index: number) => {
                      // Calcolare dinamicamente la larghezza basata sul numero di elementi visibili
                      const visibleItemsCount = 3;
                      const widthClass = visibleItemsCount === 3 ? "w-1/3" : visibleItemsCount === 2 ? "w-1/2" : "w-full";

                      return (
                        <div
                          key={item.label}
                          className={`flex flex-col items-center gap-2 text-center ${widthClass} min-w-[90px]`}
                          style={{position: "relative", zIndex: 2}}
                        >
                          {/* Cerchio deve toccare la linea */}
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-base font-bold text-navy shadow-lg ring-2 ring-sky-blue/40 shrink-0 -mt-7">
                            {item.amount}
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                            {item.label}
                          </span>
                          <p className="text-xs text-gray-600 max-w-[140px] leading-snug">{item.caption}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <Card className="p-8 bg-white border-sky-blue/30 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">Paghi solo gli appuntamenti svolti</h3>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-blue flex-shrink-0 mt-0.5" />
                    Ogni 14 giorni saldi solo gli appuntamenti qualificati che hai effettivamente sostenuto.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-blue flex-shrink-0 mt-0.5" />
                    Nessun canone nascosto, nessun costo per slot vuoti o lead mancati.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-blue flex-shrink-0 mt-0.5" />
                    Aumenti o riduci il volume in base a quanto puoi gestire: paghi sempre e solo per il valore reale.
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-white border-orange/30 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">Una spesa che fa sorridere il CFO</h3>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                    Meno di 60€ a settimana: meno di una cena di team o di un abbonamento software entry-level.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                    Ogni meeting è un potenziale deal B2B: basta una chiusura media per moltiplicare l'investimento.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange flex-shrink-0 mt-0.5" />
                    Puoi rateizzare l'attivazione in 3, 6 o 12 mesi: nessun impatto di cassa significativo.
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-white border-navy/30 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-navy mb-4">Cosa ottieni in cambio</h3>
                <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    Project manager dedicato e tecnologia proprietaria senza costi extra.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    Flusso continuo di meeting con decision maker nel tuo ICP.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                    Statistiche, dashboard e report per misurare ogni singolo euro investito.
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-12">
              <div className="relative overflow-hidden rounded-3xl border border-sky-blue/30 bg-gradient-to-r from-sky-blue/10 via-white to-orange/10 px-8 py-10 text-center shadow-lg">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">{t("investment.calcBadge")}</span>
                <p className="mt-4 text-3xl font-bold text-navy">
                  {t("investment.calcTitle")}
                </p>
                <p className="mt-4 text-base text-gray-600 max-w-3xl mx-auto">
                  {t("investment.calcDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* FAQ */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">{t("faq.title")}</h2>
            <p className="text-xl text-gray-600">{t("faq.subtitle")}</p>
          </div>

          <FAQCards
            className="mt-12"
            items={t.raw("faq.items")}
          />
        </div>
      </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-navy via-navy to-sky-blue/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">{t("cta.title")}</h2>
            <p className="text-xl text-gray-200">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-lg px-8">
                  {t("cta.primary")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pacchetti">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 bg-transparent">
                  {t("cta.secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </section>
      </div>
    </div>
  )
}
