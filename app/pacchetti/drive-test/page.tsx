"use client"

import { useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { Card } from "@/components/ui/card"
import SlideArrowButton from "@/components/animata/button/slide-arrow-button"
import { Calculator, CheckCircle2 } from "lucide-react"
import type { DriveTestOrder } from "@/lib/drive-test"

// =====================
//  DATI COEFFICIENTI
// =====================
type Band = { id: string; label: string; min: number; max: number }
type Coeff = { id: string; label: string; min: number; max: number }
type SectorOption = {
  id: string
  label: string
  coefficient: number
  level: "macro" | "granular"
}
type SectorGroup = {
  id: string
  label: string
  options: SectorOption[]
}

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
  { id: "geo_default",   label: "Predefinito",                        min: 1.0,  max: 1.0 },
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
  const HIGHEST = 1.58

  const SECTOR_GROUPS: SectorGroup[] = [
    {
      id: "macro_saas",
      label: "SaaS / Tech B2B",
      options: [
        { id: "saas_macro", label: "SaaS / Tech B2B", coefficient: HIGHEST, level: "macro" },
        { id: "saas_horizontal", label: "SaaS orizzontale (CRM/ERP)", coefficient: HIGHEST, level: "granular" },
        { id: "saas_vertical", label: "SaaS verticale (PropTech/LegalTech/HRTech)", coefficient: HIGHEST, level: "granular" },
        { id: "saas_cyber", label: "Cybersecurity", coefficient: HIGHEST, level: "granular" },
        { id: "saas_data_ai", label: "Data & Analytics / AI", coefficient: HIGHEST, level: "granular" },
        { id: "saas_cloud", label: "Cloud & DevOps", coefficient: HIGHEST, level: "granular" },
        { id: "saas_it_services", label: "IT Services & System Integration", coefficient: HIGHEST, level: "granular" },
        { id: "saas_elearning", label: "E-learning B2B", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_services",
      label: "Servizi Professionali (Marketing/HR/Consulenza)",
      options: [
        {
          id: "services_macro",
          label: "Servizi Professionali (Marketing/HR/Consulenza)",
          coefficient: HIGHEST,
          level: "macro"
        },
        { id: "services_agencies", label: "Agenzie Marketing & Adv", coefficient: HIGHEST, level: "granular" },
        { id: "services_recruiting", label: "Recruiting & HR Services", coefficient: HIGHEST, level: "granular" },
        {
          id: "services_consulting",
          label: "Consulenza gestionale / strategica",
          coefficient: HIGHEST,
          level: "granular"
        },
        { id: "services_legal", label: "Servizi legali B2B", coefficient: HIGHEST, level: "granular" },
        { id: "services_accounting", label: "Contabilità & Tax", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_industry",
      label: "Manifatturiero / Industria",
      options: [
        { id: "industry_macro", label: "Manifatturiero / Industria", coefficient: HIGHEST, level: "macro" },
        { id: "industry_machinery", label: "Macchinari industriali", coefficient: HIGHEST, level: "granular" },
        { id: "industry_electronics", label: "Elettronica/EMS", coefficient: HIGHEST, level: "granular" },
        { id: "industry_chemistry", label: "Chimica & Materiali", coefficient: HIGHEST, level: "granular" },
        { id: "industry_food", label: "Food & Beverage Industry", coefficient: HIGHEST, level: "granular" },
        { id: "industry_aerospace", label: "Aerospace & Defense (civile)", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_automotive",
      label: "Automotive",
      options: [
        { id: "automotive_macro", label: "Automotive", coefficient: HIGHEST, level: "macro" },
        { id: "automotive_oem", label: "Automotive OEM", coefficient: HIGHEST, level: "granular" },
        { id: "automotive_tier", label: "Automotive Tier1/Tier2", coefficient: HIGHEST, level: "granular" },
        { id: "automotive_mobility", label: "Mobilità & Componentistica", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_banking",
      label: "Banking",
      options: [
        { id: "banking_macro", label: "Banking", coefficient: HIGHEST, level: "macro" },
        { id: "banking_retail", label: "Banche Retail", coefficient: HIGHEST, level: "granular" },
        { id: "banking_corporate", label: "Banche Corporate/IB", coefficient: HIGHEST, level: "granular" },
        { id: "banking_bpo", label: "Servizi BPO bancari", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_insurance",
      label: "Insurance",
      options: [
        { id: "insurance_macro", label: "Insurance", coefficient: HIGHEST, level: "macro" },
        { id: "insurance_traditional", label: "Assicurazioni Danni/Vita", coefficient: HIGHEST, level: "granular" },
        { id: "insurance_insurtech", label: "Insurtech", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_fintech",
      label: "Fintech",
      options: [
        { id: "fintech_macro", label: "Fintech", coefficient: HIGHEST, level: "macro" },
        { id: "fintech_payments", label: "Pagamenti", coefficient: HIGHEST, level: "granular" },
        { id: "fintech_lending", label: "Lending/P2P", coefficient: HIGHEST, level: "granular" },
        { id: "fintech_open_banking", label: "Open Banking/RegTech", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_asset_management",
      label: "Asset Management / SGR",
      options: [
        { id: "asset_macro", label: "Asset Management / SGR", coefficient: HIGHEST, level: "macro" },
        { id: "asset_management", label: "Asset Management", coefficient: HIGHEST, level: "granular" },
        { id: "asset_private_banking", label: "Private Banking/Wealth", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_healthcare",
      label: "Healthcare / Pharma / MedTech",
      options: [
        { id: "healthcare_macro", label: "Healthcare / Pharma / MedTech", coefficient: HIGHEST, level: "macro" },
        { id: "healthcare_pharma", label: "Pharma", coefficient: HIGHEST, level: "granular" },
        { id: "healthcare_biotech", label: "Biotech", coefficient: HIGHEST, level: "granular" },
        { id: "healthcare_medtech", label: "MedTech / Dispositivi", coefficient: HIGHEST, level: "granular" },
        { id: "healthcare_hospitals", label: "Ospedali & Cliniche", coefficient: HIGHEST, level: "granular" },
        { id: "healthcare_diagnostics", label: "Diagnostica & Lab", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_real_estate",
      label: "Real Estate / Costruzioni / Facility",
      options: [
        {
          id: "real_estate_macro",
          label: "Real Estate / Costruzioni / Facility",
          coefficient: HIGHEST,
          level: "macro"
        },
        { id: "real_estate_development", label: "Sviluppo immobiliare", coefficient: HIGHEST, level: "granular" },
        { id: "real_estate_contractor", label: "General Contractor", coefficient: HIGHEST, level: "granular" },
        { id: "real_estate_facility", label: "Facility Management", coefficient: HIGHEST, level: "granular" },
        { id: "real_estate_proptech", label: "PropTech", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_retail",
      label: "Retail (negozi fisici)",
      options: [
        { id: "retail_macro", label: "Retail (negozi fisici)", coefficient: HIGHEST, level: "macro" },
        { id: "retail_gdo", label: "GDO", coefficient: HIGHEST, level: "granular" },
        { id: "retail_specialized", label: "Catene retail specializzate", coefficient: HIGHEST, level: "granular" },
        { id: "retail_franchising", label: "Retail franchising", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_ecommerce",
      label: "E-commerce (pure player/marketplace)",
      options: [
        { id: "ecommerce_macro", label: "E-commerce (pure player/marketplace)", coefficient: HIGHEST, level: "macro" },
        { id: "ecommerce_pure", label: "E-commerce pure player", coefficient: HIGHEST, level: "granular" },
        { id: "ecommerce_marketplace", label: "Marketplace", coefficient: HIGHEST, level: "granular" },
        { id: "ecommerce_dnvb", label: "DNVB / D2C digitale", coefficient: HIGHEST, level: "granular" }
      ]
    },
    {
      id: "macro_energy",
      label: "Energy & Utilities",
      options: [
        { id: "energy_macro", label: "Energy & Utilities", coefficient: HIGHEST, level: "macro" },
        { id: "energy_utility", label: "Utility (energia/acqua/gas)", coefficient: HIGHEST, level: "granular" },
        { id: "energy_renewables", label: "Rinnovabili (PV/Wind/Storage)", coefficient: HIGHEST, level: "granular" }
      ]
    }
]

const DEFAULT_SECTOR_GROUP = SECTOR_GROUPS[0]
const DEFAULT_SECTOR_OPTION = DEFAULT_SECTOR_GROUP.options[0]

// Regola: ≥ €10M non permette Drive Test
const HIGH_REVENUE_IDS = new Set(["band_10m_20m", "band_20m_50m", "band_50m_plus"])
const MIN_QTY = 5
const MAX_QTY = 20
const round5 = (v: number) => Math.round(v / 5) * 5
const lerp = (min: number, max: number, t: number) => min + (max - min) * t

const DEFAULT_RISK_PROFILE = 50
const CURRENCY = "EUR"

export default function DriveTestPage() {
  const t = useTranslations("driveTest")
  const locale = useLocale()
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
  const [sectorGroup, setSectorGroup] = useState<string>(DEFAULT_SECTOR_GROUP.id)
  const [sectorOption, setSectorOption] = useState<string>(DEFAULT_SECTOR_OPTION.id)
  const [qty, setQty] = useState<number>(10)

  // Prezzo unitario = media(min,max) di ogni coefficiente; arrotondato a 5
  const unitPrice = useMemo(() => {
    const b = BASE_ITALIA.find(x => x.id === band) ?? BASE_ITALIA[0]
    const g = COEFF_GEO.find(x => x.id === geo) ?? COEFF_GEO[0]
    const sg = SECTOR_GROUPS.find(x => x.id === sectorGroup) ?? DEFAULT_SECTOR_GROUP
    const so = sg.options.find(x => x.id === sectorOption) ?? sg.options[0]
    const baseAvg = (b.min + b.max) / 2
    const geoAvg  = (g.min + g.max) / 2
    return round5(baseAvg * geoAvg * so.coefficient)
  }, [band, geo, sectorGroup, sectorOption])

  const selectedSectorGroup = useMemo(
    () => SECTOR_GROUPS.find(x => x.id === sectorGroup) ?? DEFAULT_SECTOR_GROUP,
    [sectorGroup]
  )
  const selectedSectorOption = useMemo(
    () => selectedSectorGroup.options.find(x => x.id === sectorOption) ?? selectedSectorGroup.options[0],
    [selectedSectorGroup, sectorOption]
  )

  const total = useMemo(() => unitPrice * qty, [unitPrice, qty])
  const isHighRevenue = HIGH_REVENUE_IDS.has(band)

  async function handleCheckout() {
    const order: DriveTestOrder = {
      package: "Drive Test",
      currency: CURRENCY,
      unitPrice,
      quantity: qty,
      total,
      priceRange: {
        min: unitPrice,
        max: unitPrice,
      },
      selections: {
        revenueBand: BASE_ITALIA.find(x => x.id === band)?.label ?? BASE_ITALIA[0].label,
        geography:   COEFF_GEO.find(x => x.id === geo)?.label ?? COEFF_GEO[0].label,
        macroSector: selectedSectorGroup.label,
        sector:      selectedSectorOption.label
      },
      metadata: {
        locale,
        generatedAt: new Date().toISOString(),
        productName: t("hero.badge"),
      },
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
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-navy">{t("form.title")}</h2>
              <p className="text-gray-600 mt-2">{t("hero.microcopy")}</p>
            </div>

            <Card className="relative mx-auto max-w-5xl overflow-hidden border-none bg-transparent p-0 shadow-xl">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
                <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-sky-blue px-6 py-8 sm:px-10 sm:py-12 text-white">
                  <div className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-orange/20 blur-2xl" />
                  <div className="relative flex h-full flex-col justify-between gap-10">
                    <div className="space-y-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                        Drive Test Premium
                      </span>
                        <div>
                          <h3 className="text-3xl font-bold leading-tight sm:text-4xl">{t("form.title")}</h3>
                          <p className="mt-3 text-sm text-white/80 sm:text-base">{t("hero.microcopy")}</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg">
                        <div className="text-xs font-medium uppercase tracking-wider text-white/70">{t("form.unit")}</div>
                        <div className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">€ {unitPrice.toLocaleString()}</div>
                        <div className="mt-2 text-xs text-white/70">+ IVA</div>
                      </div>
                      <div className="rounded-3xl border border-white/20 bg-white p-6 text-navy shadow-lg">
                        <div className="text-xs font-semibold uppercase tracking-wider text-navy/60">{t("form.total")}</div>
                        <div className="mt-3 text-4xl font-extrabold tracking-tight text-orange sm:text-5xl">€ {total.toLocaleString()}</div>
                        <div className="mt-2 text-xs font-medium text-navy/60">{t("form.qty")}: <span className="font-bold text-navy">{qty}</span></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium text-white/80">
                        <span>{t("form.qty")}</span>
                        <span className="text-2xl font-extrabold text-orange">{qty}</span>
                      </div>
                      <input
                        type="range"
                        min={MIN_QTY}
                        max={MAX_QTY}
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-orange"
                      />
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>{MIN_QTY}</span>
                        <span>{MAX_QTY}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative bg-white px-6 py-8 sm:px-10 sm:py-12">
                  <div className="flex h-full flex-col justify-between gap-8">
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">Drive Test Calculator</p>
                        <h4 className="mt-2 text-2xl font-bold text-navy">Personalizza le tue variabili</h4>
                        <p className="mt-2 text-sm text-gray-600">{t("hero.subheadline")}</p>
                      </div>

                      <div className="space-y-4">
                        <label className="block space-y-2">
                          <span className="text-sm font-semibold text-navy">{t("form.geo")}</span>
                          <select
                            className="w-full rounded-xl border border-navy/10 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition focus:border-orange focus:outline-none focus:ring-4 focus:ring-orange/30"
                            value={geo}
                            onChange={(e) => setGeo(e.target.value)}
                          >
                            {COEFF_GEO.map(g => (
                              <option key={g.id} value={g.id}>
                                {g.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block space-y-2">
                          <span className="text-sm font-semibold text-navy">Macro settore</span>
                          <select
                            className="w-full rounded-xl border border-navy/10 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition focus:border-orange focus:outline-none focus:ring-4 focus:ring-orange/30"
                            value={sectorGroup}
                            onChange={(e) => {
                              const nextGroup = e.target.value
                              setSectorGroup(nextGroup)
                              const group = SECTOR_GROUPS.find(x => x.id === nextGroup)
                              if (group) {
                                setSectorOption(group.options[0].id)
                              } else {
                                setSectorOption(DEFAULT_SECTOR_OPTION.id)
                              }
                            }}
                          >
                            {SECTOR_GROUPS.map(group => (
                              <option key={group.id} value={group.id}>
                                {group.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block space-y-2">
                          <span className="text-sm font-semibold text-navy">{t("form.sector")}</span>
                          <select
                            className="w-full rounded-xl border border-navy/10 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition focus:border-orange focus:outline-none focus:ring-4 focus:ring-orange/30"
                            value={sectorOption}
                            onChange={(e) => setSectorOption(e.target.value)}
                          >
                            {selectedSectorGroup.options.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.level === "macro" ? `${option.label} (Macro)` : option.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block space-y-2">
                          <span className="text-sm font-semibold text-navy">{t("form.revenue")}</span>
                          <select
                            className="w-full rounded-xl border border-navy/10 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition focus:border-orange focus:outline-none focus:ring-4 focus:ring-orange/30"
                            value={band}
                            onChange={(e) => setBand(e.target.value)}
                          >
                            {BASE_ITALIA.map(b => (
                              <option key={b.id} value={b.id}>
                                {b.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>

                    {isHighRevenue ? (
                      <div className="rounded-2xl border border-orange/20 bg-orange/5 p-6 text-center">
                        <p className="text-sm text-gray-700">
                          Le aziende con fatturato superiore a €10M vengono seguite con una configurazione dedicata.
                        </p>
                        <div className="mt-4 flex justify-center">
                          <SlideArrowButton primaryColor="#ff9d3d" text={t("form.ctaConsult")} />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <button
                          type="button"
                          onClick={handleCheckout}
                          className="flex w-full items-center justify-center rounded-2xl bg-orange px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                        >
                          {t("form.ctaCheckout")}
                        </button>
                        <p className="text-xs text-gray-500">{t("form.note")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
