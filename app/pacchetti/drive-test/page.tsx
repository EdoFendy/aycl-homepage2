"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { Card } from "@/components/ui/card"
import SlideArrowButton from "@/components/animata/button/slide-arrow-button"
import { Calculator, CheckCircle2 } from "lucide-react"

// =====================
//  DATI COEFFICIENTI
// =====================
type Band = { id: string; label: string; min: number; max: number }
type Coeff = { id: string; label: string; min: number; max: number }

const BASE_ITALIA: Band[] = [
  { id: "band_100k",       label: "< €100K",             min: 80,  max: 80  },
  { id: "band_100k_500k",  label: "€100K – €500K",       min: 90,  max: 95  },
  { id: "band_500k_1m",    label: "€500K – €1M",         min: 100, max: 120 },
  { id: "band_1m_5m",      label: "€1M – €5M",           min: 120, max: 140 },
  { id: "band_5m_10m",     label: "€5M – €10M",          min: 140, max: 160 },
  { id: "band_10m_20m",    label: "€10M – €20M",         min: 160, max: 180 },
  { id: "band_20m_50m",    label: "€20M – €50M",         min: 180, max: 220 },
  { id: "band_50m_plus",   label: "€50M+",               min: 220, max: 300 }
]
const COEFF_GEO: Coeff[] = [
  { id: "geo_italia",    label: "Italia",                            min: 1.0,  max: 1.0 },
  { id: "geo_sp_po",     label: "Spagna / Portogallo",               min: 1.1,  max: 1.1 },
  { id: "geo_fr_de_be",  label: "Francia / Germania / Benelux",      min: 1.2,  max: 1.3 },
  { id: "geo_uk_ie",     label: "UK / Irlanda",                      min: 1.25, max: 1.35 },
  { id: "geo_est",       label: "Est Europa",                         min: 1.2,  max: 1.4 },
  { id: "geo_nordics",   label: "Nordics (SE/NO/DK/FI)",             min: 1.2,  max: 1.3 },
  { id: "geo_us_ca",     label: "USA / Canada",                      min: 1.5,  max: 1.6 },
  { id: "geo_latam",     label: "LATAM",                              min: 1.1,  max: 1.2 },
  { id: "geo_me",        label: "Middle East",                        min: 1.3,  max: 1.6 },
  { id: "geo_africa",    label: "Africa",                             min: 1.2,  max: 1.3 },
  { id: "geo_asia",      label: "Asia (SG/HK/JP)",                    min: 1.4,  max: 1.6 },
  { id: "geo_oceania",   label: "Oceania (AU/NZ)",                    min: 1.4,  max: 1.5 }
]
const COEFF_SETT: Coeff[] = [
  { id: "sett_saas",     label: "SaaS / Tech B2B",                    min: 1.0,  max: 1.1 },
  { id: "sett_mkt",      label: "Marketing / HR / Servizi prof.",     min: 1.1,  max: 1.2 },
  { id: "sett_ind",      label: "Manifatturiero / Industria / Auto",  min: 1.2,  max: 1.3 },
  { id: "sett_fin",      label: "Finanza / Banking / Investment",     min: 1.4,  max: 1.6 },
  { id: "sett_health",   label: "Sanità / Medicale / Pharma",         min: 1.3,  max: 1.5 },
  { id: "sett_re",       label: "Real Estate / Construction",         min: 1.2,  max: 1.4 },
  { id: "sett_retail",   label: "Retail / E-commerce",                min: 1.1,  max: 1.3 },
  { id: "sett_energy",   label: "Energia / Oil & Gas / Utility",      min: 1.5,  max: 1.8 },
  { id: "sett_pa",       label: "Pubblica Amm. / Istituzioni",        min: 1.6,  max: 1.9 },
  { id: "sett_clevel",   label: "C-level targeting high-ticket",      min: 1.8,  max: 2.0 },
  { id: "sett_vc",       label: "Venture Capital / PE / M&A",         min: 1.7,  max: 2.0 }
]

// Regola: ≥ €10M non permette Drive Test
const HIGH_REVENUE_IDS = new Set(["band_10m_20m", "band_20m_50m", "band_50m_plus"])
const MIN_QTY = 5
const MAX_QTY = 20
const round5 = (v: number) => Math.round(v / 5) * 5

export default function DriveTestPage() {
  const t = useTranslations("driveTest")
  const router = useRouter()

  // =====================
  //  HERO (invariato)
  // =====================
  // Nota: si appoggia alle chiavi driveTest.hero già create

  // =====================
  //  STATO CALCOLATORE MINIMAL
  // =====================
  const [band, setBand] = useState<string>(BASE_ITALIA[0].id)
  const [geo, setGeo] = useState<string>(COEFF_GEO[0].id)
  const [sector, setSector] = useState<string>(COEFF_SETT[0].id)
  const [qty, setQty] = useState<number>(10)

  // Prezzo unitario = media(min,max) di ogni coefficiente; arrotondato a 5
  const unitPrice = useMemo(() => {
    const b = BASE_ITALIA.find(x => x.id === band) ?? BASE_ITALIA[0]
    const g = COEFF_GEO.find(x => x.id === geo) ?? COEFF_GEO[0]
    const s = COEFF_SETT.find(x => x.id === sector) ?? COEFF_SETT[0]
    const baseAvg = (b.min + b.max) / 2
    const geoAvg  = (g.min + g.max) / 2
    const setAvg  = (s.min + s.max) / 2
    return round5(baseAvg * geoAvg * setAvg)
  }, [band, geo, sector])

  const total = useMemo(() => unitPrice * qty, [unitPrice, qty])
  const isHighRevenue = HIGH_REVENUE_IDS.has(band)

  async function handleCheckout() {
    const order = {
      package: "Drive Test",
      currency: "EUR",
      unitPrice,
      quantity: qty,
      total,
      selections: {
        revenueBand: BASE_ITALIA.find(x => x.id === band)?.label,
        geography:   COEFF_GEO.find(x => x.id === geo)?.label,
        sector:      COEFF_SETT.find(x => x.id === sector)?.label
      },
      metadata: { generatedAt: new Date().toISOString() }
    }

    const res = await fetch("/api/checkout/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order })
    })
    const data = await res.json().catch(() => ({}))
    if (data?.success && data?.token) {
      router.push(`/checkout?order=${data.token}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-16">
        <div className="absolute top-16 right-4 h-20 w-20 rotate-12 rounded-lg bg-sky-blue/10 sm:top-20 sm:right-10 sm:h-32 sm:w-32" />
        <div className="absolute top-32 left-4 h-16 w-16 rounded-full bg-orange/10 sm:top-40 sm:left-10 sm:h-24 sm:w-24" />
        <div className="absolute bottom-6 right-1/4 h-32 w-12 -rotate-45 bg-navy/5 sm:bottom-12 sm:h-48 sm:w-16" />

        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full bg-orange px-4 py-1.5">
                <span className="text-xs sm:text-sm font-medium text-white">{t("hero.badge")}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-navy">
                {t.rich("hero.headline", { strong: (c) => <span className="text-orange">{c}</span> })}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                {t("hero.subheadline")}
              </p>

              <p className="text-gray-600 text-sm sm:text-base">
                {t("hero.microcopy")}
              </p>

              <div className="flex items-start gap-3">
                <Link href="#calculator" className="text-navy underline underline-offset-4 text-sm sm:text-base">
                  {t("form.qty")}
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <Image
                src="/illustrations/drive-test.png"
                alt="Drive Test"
                width={520}
                height={420}
                className="w-full max-w-md lg:max-w-lg"
              />
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* =====================
          CALCOLATORE MINIMAL
          ===================== */}
      <section id="calculator" className="py-18 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10 sm:mb-14">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/5">
                <Calculator className="h-6 w-6 text-navy" />
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-navy">Drive Test</h2>
              <p className="text-gray-600 mt-2">{t("hero.microcopy")}</p>
            </div>

            <Card className="p-6 sm:p-8 bg-white border-navy/10 shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto">
              {/* 3 SELECT MINIMAL */}
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="space-y-1">
                  <div className="text-sm font-medium text-navy">{t("form.geo")}</div>
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    value={geo}
                    onChange={(e) => setGeo(e.target.value)}
                  >
                    {COEFF_GEO.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </label>

                <label className="space-y-1">
                  <div className="text-sm font-medium text-navy">{t("form.sector")}</div>
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                  >
                    {COEFF_SETT.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </label>

                <label className="space-y-1">
                  <div className="text-sm font-medium text-navy">{t("form.revenue")}</div>
                  <select
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    value={band}
                    onChange={(e) => setBand(e.target.value)}
                  >
                    {BASE_ITALIA.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                  </select>
                </label>
              </div>

              {/* LOGICA: ≥10M → SOLO CONSULENTE */}
              {isHighRevenue ? (
                <div className="mt-8 flex flex-col items-center gap-3">
                  <p className="text-gray-700 text-center">
                    Le aziende con fatturato superiore a €10M vengono seguite con una configurazione dedicata.
                  </p>
                  {/* Collega questo CTA alla tua route o a Cal.com */}
                  <SlideArrowButton primaryColor="#ff9d3d" text={t("form.ctaConsult")} />
                </div>
              ) : (
                <>
                  {/* Output + Slider qty */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-navy/10 bg-gray-50 p-4">
                      <div className="text-xs text-gray-600">{t("form.unit")}</div>
                      <div className="text-2xl font-bold text-navy mt-1">€ {unitPrice.toLocaleString()}</div>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-gray-50 p-4">
                      <div className="text-xs text-gray-600">{t("form.qty")}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <input
                          type="range"
                          min={MIN_QTY}
                          max={MAX_QTY}
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                          className="w-full accent-orange"
                        />
                        <div className="w-10 text-right font-bold text-navy">{qty}</div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
                      <div className="text-xs text-gray-600">{t("form.total")}</div>
                      <div className="text-2xl font-bold text-orange mt-1">€ {total.toLocaleString()}</div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-600">{t("form.note")}</p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="inline-flex items-center justify-center rounded-xl bg-orange px-5 py-3 text-white font-semibold shadow-md transition hover:shadow-lg"
                    >
                      {t("form.ctaCheckout")}
                    </button>
                  </div>
                </>
              )}
            </Card>
          </div>
        </PageLayoutContainer>
      </section>

      {/* OFFER / COPY (invariato) */}
      <section className="py-20 bg-white">
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy">
              {t.rich("offer.headline", { strong: (c) => <span className="text-orange">{c}</span> })}
            </h2>
            <p className="mt-3 text-gray-600">{t("offer.subheadline")}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="p-6 bg-white border-navy/10 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange mt-0.5" />
                  <p className="text-gray-700">{t(`offer.microcopy.${i}`)}</p>
                </div>
              </Card>
            ))}
          </div>
        </PageLayoutContainer>
      </section>

      {/* SAVINGS (invariato) */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-navy">{t("savings.subheadline")}</h3>
              <div className="mt-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <p key={i} className="text-gray-700">{t(`savings.microcopy.${i}`)}</p>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-white border-navy/10">
              <div className="text-sm font-semibold text-navy">{t("savings.noteTitle")}</div>
              <p className="mt-2 text-gray-700">{t("savings.noteBody")}</p>
            </Card>
          </div>
        </PageLayoutContainer>
      </section>

      {/* HOW (invariato) */}
      <section className="py-20 bg-white">
        <PageLayoutContainer className="px-4 sm:px-6">
          <h3 className="text-2xl font-bold text-navy text-center">{t("how.subheadline")}</h3>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <Card key={i} className="p-6 bg-white border-navy/10 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-navy/5" />
                <div className="relative">
                  <div className="text-orange font-bold text-lg">{i + 1}.</div>
                  <p className="mt-2 text-gray-700">{t(`how.steps.${i}`)}</p>
                </div>
              </Card>
            ))}
          </ol>
        </PageLayoutContainer>
      </section>

      {/* FAQ (invariato) */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <PageLayoutContainer className="px-4 sm:px-6">
          <h3 className="text-2xl font-bold text-navy text-center">{t("faq.title")}</h3>
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <details key={i} className="group rounded-2xl border border-navy/10 bg-white p-5 open:shadow-md transition">
                <summary className="cursor-pointer list-none font-semibold text-navy">
                  {t(`faq.items.${i}.q`)}
                </summary>
                <p className="mt-2 text-gray-700">{t(`faq.items.${i}.a`)}</p>
              </details>
            ))}
          </div>
        </PageLayoutContainer>
      </section>
    </div>
  )
}
