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

export default function SetUpFeePage() {
  const t = useTranslations("pacchettiSetUpFee")
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-10 h-32 w-32 rotate-12 rounded-lg bg-sky-blue/10" />
        <div className="absolute top-40 left-10 h-24 w-24 rounded-full bg-orange/10" />
        <div className="absolute bottom-12 right-1/4 h-48 w-16 -rotate-45 bg-navy/5" />

        <div className="container mx-auto px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-block rounded-full bg-orange px-4 py-2">
                <span className="text-sm font-medium text-white">{t("hero.badge")}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-navy">
                {t.rich("hero.title", { strong: (c) => <span className="text-orange">{c}</span> })}
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">{t("hero.kicker")}</p>
              <p className="text-lg leading-relaxed text-gray-600">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contattaci">
                  <Button size="lg" className="bg-orange hover:bg-orange/90 px-8 text-lg text-white">
                  {t("hero.ctaPrimary")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#pricing" className="text-navy underline underline-offset-4">{t("hero.ctaSecondary")}</Link>
              </div>
            </div>

            <div className="relative hidden items-center justify-center md:flex">
              <Image
                src="/setupfee.png"
                alt={t("hero.alt")}
                width={520}
                height={480}
                className=""
              />
            </div>
            </div>

        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-navy">
              {t.rich("how.title", { strong: (c) => <span className="text-orange">{c}</span> })}
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden border border-transparent bg-gradient-to-br from-white via-navy/8 to-white p-[2px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative rounded-[calc(1.5rem-2px)] bg-white/90 p-8 backdrop-blur">
                <div className="absolute -top-8 -right-6 h-24 w-24 rounded-full bg-navy/15 blur-2xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange/5">
                    <Compass className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">{t("how.cards.planTitle")}</h3>
                  <p className="text-gray-600 leading-relaxed">{t("how.cards.planDesc")}</p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-transparent bg-gradient-to-br from-white via-sky-blue/8 to-white p-[2px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative rounded-[calc(1.5rem-2px)] bg-white/90 p-8 backdrop-blur">
                <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-sky-blue/15 blur-2xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange/5">
                    <Settings className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">{t("how.cards.activateTitle")}</h3>
                  <p className="text-gray-600 leading-relaxed">{t("how.cards.activateDesc")}</p>
                </div>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-transparent bg-white p-[2px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative rounded-[calc(1.5rem-2px)] bg-white/90 p-8 backdrop-blur">
                <div className="absolute -top-8 -left-6 h-24 w-24 rounded-full bg-orange/15 blur-2xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange/5">
                    <TrendingUp className="h-8 w-8 text-navy" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">{t("how.cards.scaleTitle")}</h3>
                  <p className="text-gray-600 leading-relaxed">{t("how.cards.scaleDesc")}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* PER CHI È / COSA NON DOVRAI PIÙ FARE */}
      <section className="relative overflow-hidden py-32 bg-gradient-to-b from-white via-gray-50/40 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-8 h-48 w-48 -rotate-12 rounded-3xl bg-sky-blue/10 blur-2xl" />
          <div className="absolute right-12 bottom-12 h-56 w-56 rounded-full bg-orange/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-navy/5 via-transparent to-orange/5 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
            <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 shadow-sm">
                <Sparkles className="h-4 w-4 text-navy" />
                {t("partnership.badge")}
              </div>
              <h2 className="text-4xl font-bold text-navy md:text-5xl">{t("partnership.title")}</h2>
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
        </div>
      </section>


      {/* INFRASTRUTTURA AYCL */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="pointer-events-none absolute top-10 right-16 h-64 w-64 rounded-full bg-sky-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-6 left-12 h-48 w-48 rounded-full bg-orange/10 blur-2xl" />

        <div className="container relative z-10 mx-auto px-6">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-3 font-semibold text-sky-blue">
                <div className="h-1 w-12 bg-gradient-to-r from-navy to-sky-blue" />
                <span>{t("infrastructure.kicker")}</span>
              </div>
              <h2 className="text-4xl font-bold text-navy">{t("infrastructure.title")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t("infrastructure.desc")}</p>
            </div>

          <div className="mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
            {[
              {
                title: t("infrastructure.cards.senduraTitle"),
                description: t("infrastructure.cards.senduraDesc"),
              },
              {
                title: t("infrastructure.cards.dbTitle"),
                description: t("infrastructure.cards.dbDesc"),
              },
              {
                title: t("infrastructure.cards.supportTitle"),
                description: t("infrastructure.cards.supportDesc"),
              },
            ].map(({ title, description }) => (
              <Card
                key={title}
                className="relative overflow-hidden border border-sky-blue/30 bg-white p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-blue/15 to-transparent blur-2xl" />
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold text-navy">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 w-full bg-gradient-to-r from-navy via-sky-blue to-orange" aria-hidden="true" />

      {/* MODELLO ECONOMICO + PRICING */}
      <section id="pricing" className="relative overflow-hidden py-24 bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy/5 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-36 w-36 rounded-full bg-orange/15 blur-2xl" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr,1fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-navy">
                {t("economics.badge")}
              </span>
              <h2 className="text-4xl font-bold text-navy md:text-5xl">
                {t("economics.title")}
              </h2>
              <p className="text-lg text-gray-600">{t("economics.desc")}</p>
            </div>

            <Card className="relative overflow-hidden border border-sky-blue/30 bg-gradient-to-br from-white via-sky-blue/5 to-white p-8 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/10 via-transparent to-orange/10" aria-hidden="true" />
              <div className="relative z-10 space-y-4 text-sm text-gray-600">
                <h3 className="text-xl font-bold text-navy">{t("economics.howTitle")}</h3>
                <ul className="space-y-3">
                  {t.raw("economics.bullets").map((b: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-sky-blue" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* PRICING CARDS */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden border border-orange/20 bg-white p-8 shadow-sm">
              <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-orange/10 blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange/10">
                    <Rocket className="h-5 w-5 text-orange" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-orange">
                    {t("economics.pricing.activation.badge")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy">{t("economics.pricing.activation.title")}</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange" />
                    <span>{t.rich("economics.pricing.activation.line", {
                      euro: (c) => <>&euro;{c}</>,
                    })}</span>
                  </li>
                  {(
                    Array.isArray(
                      t.raw("economics.pricing.activation.points") as unknown,
                    )
                      ? (t.raw("economics.pricing.activation.points") as string[])
                      : []
                  ).map((p: string, i: number) => (
                    <li key={i} className="ml-6 list-disc text-sm text-gray-600">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-orange/20 bg-white p-8 shadow-sm">
              <div className="absolute -bottom-12 -right-8 h-24 w-24 rounded-full bg-orange/10 blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange/10">
                    <TrendingUp className="h-5 w-5 text-orange" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-orange">
                    {t("economics.pricing.operational.badge")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy">{t("economics.pricing.operational.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t.rich("economics.pricing.operational.desc", {
                    strong: (c) => <strong>{c}</strong>,
                  })}
                </p>
              </div>
            </Card>

            <Card className="relative overflow-hidden border border-orange/20 bg-white p-8 shadow-sm">
              <div className="absolute -top-12 right-10 h-24 w-24 rounded-full bg-orange/10 blur-2xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange/10">
                    <Shield className="h-5 w-5 text-orange" />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-orange">
                    {t("economics.pricing.guarantees.badge")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy">{t("economics.pricing.guarantees.title")}</h3>
                <p className="text-sm text-gray-600">{t("economics.pricing.guarantees.desc")}</p>
              </div>
            </Card>
          </div>

          {/* NOTE INFO */}
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="flex flex-col gap-3 text-sm text-gray-700 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">ℹ</span>
                <span>{t.rich("economics.pricing.notes.0", { strong: (c) => <strong>{c}</strong> })}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">★</span>
                <span>{t.rich("economics.pricing.notes.1", { strong: (c) => <strong>{c}</strong> })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* PERCHÉ FUNZIONA / OPERATIVO */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange via-sky-blue to-navy" />
        <div className="pointer-events-none absolute left-10 top-12 h-40 w-40 rounded-full bg-orange/10 blur-2xl" />
        <div className="pointer-events-none absolute right-16 bottom-12 h-48 w-48 rounded-full bg-sky-blue/15 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6">
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
        </div>
      </section>


      {/* FAQ */}
      <section className="relative overflow-hidden py-24 bg-white">
        <div className="pointer-events-none absolute top-6 right-16 h-40 w-40 rounded-full bg-orange/15 blur-2xl" />
        <div className="pointer-events-none absolute bottom-8 left-12 h-52 w-52 rounded-full bg-sky-blue/10 blur-3xl" />

        <div className="container mx-auto px-6">
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
        </div>
      </section>
    </div>
  )
}

