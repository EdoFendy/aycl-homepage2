"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { Card } from "@/components/ui/card"
import SlideArrowButton from "@/components/animata/button/slide-arrow-button"
import { Calculator } from "lucide-react"

// =====================
//  DATI COEFFICIENTI
// =====================
type Band = { id: string; label: string; min: number; max: number }
type Coeff = { id: string; label: string; min: number; max: number }
type SectorOption = {
  id: string
  label: string
  level: "macro" | "granular"
  min: number
  max: number
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

const COEFF_SAAS = { min: 1.0826, max: 1.115078 }
const COEFF_SERVICES = { min: 1.093426, max: 1.223338 }
const COEFF_MANUFACTURING = { min: 1.277468, max: 1.429032 }
const COEFF_AUTOMOTIVE = { min: 1.288294, max: 1.439858 }
const COEFF_BANKING = { min: 1.602248, max: 2.208504 }
const COEFF_INSURANCE = { min: 1.6239, max: 2.230156 }
const COEFF_FINTECH = { min: 1.51564, max: 1.667204 }
const COEFF_ASSET_MANAGEMENT = { min: 1.6239, max: 2.230156 }
const COEFF_HEALTHCARE = { min: 1.504814, max: 1.67803 }
const COEFF_REAL_ESTATE = { min: 1.331598, max: 1.483162 }
const COEFF_RETAIL = { min: 1.212512, max: 1.364076 }
const COEFF_ECOMMERCE = { min: 1.13673, max: 1.266642 }
const COEFF_ENERGY = { min: 2.230156, max: 2.403372 }

const SECTOR_GROUPS: SectorGroup[] = [
  {
    id: "macro_saas",
    label: "SaaS / Tech B2B",
    options: [
      { id: "saas_macro", label: "SaaS / Tech B2B", level: "macro", ...COEFF_SAAS },
      { id: "saas_horizontal", label: "SaaS orizzontale (CRM/ERP)", level: "granular", ...COEFF_SAAS },
      { id: "saas_vertical", label: "SaaS verticale (PropTech/LegalTech/HRTech)", level: "granular", ...COEFF_SAAS },
      { id: "saas_cyber", label: "Cybersecurity", level: "granular", ...COEFF_SAAS },
      { id: "saas_data_ai", label: "Data & Analytics / AI", level: "granular", ...COEFF_SAAS },
      { id: "saas_cloud", label: "Cloud & DevOps", level: "granular", ...COEFF_SAAS },
      { id: "saas_it_services", label: "IT Services & System Integration", level: "granular", ...COEFF_SAAS },
      { id: "saas_elearning", label: "E-learning B2B", level: "granular", ...COEFF_SAAS }
    ]
  },
  {
    id: "macro_services",
    label: "Servizi Professionali (Marketing/HR/Consulenza)",
    options: [
      { id: "services_macro", label: "Servizi Professionali (Marketing/HR/Consulenza)", level: "macro", ...COEFF_SERVICES },
      { id: "services_agencies", label: "Agenzie Marketing & Adv", level: "granular", ...COEFF_SERVICES },
      { id: "services_recruiting", label: "Recruiting & HR Services", level: "granular", ...COEFF_SERVICES },
      { id: "services_consulting", label: "Consulenza gestionale / strategica", level: "granular", ...COEFF_SERVICES },
      { id: "services_digital", label: "Digital Agencies & Growth", level: "granular", ...COEFF_SERVICES },
      { id: "services_training", label: "Formazione & Coaching", level: "granular", ...COEFF_SERVICES }
    ]
  },
  {
    id: "macro_industry",
    label: "Manifatturiero / Industria",
    options: [
      { id: "industry_macro", label: "Manifatturiero / Industria", level: "macro", ...COEFF_MANUFACTURING },
      { id: "industry_machinery", label: "Macchinari industriali", level: "granular", ...COEFF_MANUFACTURING },
      { id: "industry_electronics", label: "Elettronica/EMS", level: "granular", ...COEFF_MANUFACTURING },
      { id: "industry_chemistry", label: "Chimica & Materiali", level: "granular", ...COEFF_MANUFACTURING },
      { id: "industry_food", label: "Food & Beverage Industry", level: "granular", ...COEFF_MANUFACTURING },
      { id: "industry_aerospace", label: "Aerospace & Defense (civile)", level: "granular", ...COEFF_MANUFACTURING }
    ]
  },
  {
    id: "macro_automotive",
    label: "Automotive",
    options: [
      { id: "automotive_macro", label: "Automotive", level: "macro", ...COEFF_AUTOMOTIVE },
      { id: "automotive_oem", label: "Automotive OEM", level: "granular", ...COEFF_AUTOMOTIVE },
      { id: "automotive_tier", label: "Automotive Tier1/Tier2", level: "granular", ...COEFF_AUTOMOTIVE },
      { id: "automotive_mobility", label: "Mobilità & Componentistica", level: "granular", ...COEFF_AUTOMOTIVE }
    ]
  },
  {
    id: "macro_banking",
    label: "Banking",
    options: [
      { id: "banking_macro", label: "Banking", level: "macro", ...COEFF_BANKING },
      { id: "banking_retail", label: "Banche Retail", level: "granular", ...COEFF_BANKING },
      { id: "banking_corporate", label: "Banche Corporate/IB", level: "granular", ...COEFF_BANKING },
      { id: "banking_bpo", label: "Servizi BPO bancari", level: "granular", ...COEFF_BANKING }
    ]
  },
  {
    id: "macro_insurance",
    label: "Insurance",
    options: [
      { id: "insurance_macro", label: "Insurance", level: "macro", ...COEFF_INSURANCE },
      { id: "insurance_traditional", label: "Assicurazioni Danni/Vita", level: "granular", ...COEFF_INSURANCE },
      { id: "insurance_insurtech", label: "Insurtech", level: "granular", ...COEFF_INSURANCE }
    ]
  },
  {
    id: "macro_fintech",
    label: "Fintech",
    options: [
      { id: "fintech_macro", label: "Fintech", level: "macro", ...COEFF_FINTECH },
      { id: "fintech_payments", label: "Pagamenti", level: "granular", ...COEFF_FINTECH },
      { id: "fintech_lending", label: "Lending/P2P", level: "granular", ...COEFF_FINTECH },
      { id: "fintech_open_banking", label: "Open Banking/RegTech", level: "granular", ...COEFF_FINTECH }
    ]
  },
  {
    id: "macro_asset_management",
    label: "Asset Management / SGR",
    options: [
      { id: "asset_macro", label: "Asset Management / SGR", level: "macro", ...COEFF_ASSET_MANAGEMENT },
      { id: "asset_management", label: "Asset Management", level: "granular", ...COEFF_ASSET_MANAGEMENT },
      { id: "asset_private_banking", label: "Private Banking/Wealth", level: "granular", ...COEFF_ASSET_MANAGEMENT }
    ]
  },
  {
    id: "macro_healthcare",
    label: "Healthcare / Pharma / MedTech",
    options: [
      { id: "healthcare_macro", label: "Healthcare / Pharma / MedTech", level: "macro", ...COEFF_HEALTHCARE },
      { id: "healthcare_pharma", label: "Pharma", level: "granular", ...COEFF_HEALTHCARE },
      { id: "healthcare_biotech", label: "Biotech", level: "granular", ...COEFF_HEALTHCARE },
      { id: "healthcare_medtech", label: "MedTech / Dispositivi", level: "granular", ...COEFF_HEALTHCARE },
      { id: "healthcare_hospitals", label: "Ospedali & Cliniche", level: "granular", ...COEFF_HEALTHCARE },
      { id: "healthcare_diagnostics", label: "Diagnostica & Lab", level: "granular", ...COEFF_HEALTHCARE }
    ]
  },
  {
    id: "macro_real_estate",
    label: "Real Estate / Costruzioni / Facility",
    options: [
      { id: "real_estate_macro", label: "Real Estate / Costruzioni / Facility", level: "macro", ...COEFF_REAL_ESTATE },
      { id: "real_estate_development", label: "Sviluppo immobiliare", level: "granular", ...COEFF_REAL_ESTATE },
      { id: "real_estate_contractor", label: "General Contractor", level: "granular", ...COEFF_REAL_ESTATE },
      { id: "real_estate_facility", label: "Facility Management", level: "granular", ...COEFF_REAL_ESTATE },
      { id: "real_estate_proptech", label: "PropTech", level: "granular", ...COEFF_REAL_ESTATE }
    ]
  },
  {
    id: "macro_retail",
    label: "Retail (negozi fisici)",
    options: [
      { id: "retail_macro", label: "Retail (negozi fisici)", level: "macro", ...COEFF_RETAIL },
      { id: "retail_gdo", label: "GDO", level: "granular", ...COEFF_RETAIL },
      { id: "retail_specialized", label: "Catene retail specializzate", level: "granular", ...COEFF_RETAIL },
      { id: "retail_franchising", label: "Retail franchising", level: "granular", ...COEFF_RETAIL }
    ]
  },
  {
    id: "macro_ecommerce",
    label: "E-commerce (pure player/marketplace)",
    options: [
      { id: "ecommerce_macro", label: "E-commerce (pure player/marketplace)", level: "macro", ...COEFF_ECOMMERCE },
      { id: "ecommerce_pure", label: "E-commerce pure player", level: "granular", ...COEFF_ECOMMERCE },
      { id: "ecommerce_marketplace", label: "Marketplace", level: "granular", ...COEFF_ECOMMERCE },
      { id: "ecommerce_dnvb", label: "DNVB / D2C digitale", level: "granular", ...COEFF_ECOMMERCE }
    ]
  },
  {
    id: "macro_energy",
    label: "Energy & Utilities",
    options: [
      { id: "energy_macro", label: "Energy & Utilities", level: "macro", ...COEFF_ENERGY },
      { id: "energy_utility", label: "Utility (energia/acqua/gas)", level: "granular", ...COEFF_ENERGY },
      { id: "energy_renewables", label: "Rinnovabili (PV/Wind/Storage)", level: "granular", ...COEFF_ENERGY }
    ]
  }
]

// Regola: ≥ €10M non permette Drive Test
const HIGH_REVENUE_IDS = new Set(["band_10m_20m", "band_20m_50m", "band_50m_plus"])
const MIN_QTY = 5
const MAX_QTY = 20

function round5(value: number): number {
  return Math.round(value / 5) * 5
}

export default function DriveTestCalculator() {
  const t = useTranslations("driveTest")
  const router = useRouter()

  const [band, setBand] = useState<string>(BASE_ITALIA[0].id)
  const [geo, setGeo] = useState<string>(COEFF_GEO[0].id)
  const [sectorGroup, setSectorGroup] = useState<string>("")
  const [sectorOption, setSectorOption] = useState<string>("")
  const [qty, setQty] = useState<number>(10)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedBand = useMemo(() => {
    return BASE_ITALIA.find(x => x.id === band) ?? BASE_ITALIA[0]
  }, [band])

  const selectedGeo = useMemo(() => {
    return COEFF_GEO.find(x => x.id === geo) ?? COEFF_GEO[0]
  }, [geo])

  const selectedSectorGroup = useMemo(
    () => SECTOR_GROUPS.find(x => x.id === sectorGroup),
    [sectorGroup]
  )

  const selectedSectorOption = useMemo(() => {
    if (!selectedSectorGroup) {
      return undefined
    }

    if (!sectorOption) {
      return selectedSectorGroup.options[0]
    }

    return (
      selectedSectorGroup.options.find(x => x.id === sectorOption) ??
      selectedSectorGroup.options[0]
    )
  }, [selectedSectorGroup, sectorOption])

  const unitPrice = useMemo(() => {
    const baseAvg = (selectedBand.min + selectedBand.max) / 2
    const geoAvg = (selectedGeo.min + selectedGeo.max) / 2
    const sectorMultiplier = selectedSectorOption?.max ?? 1
    return round5(baseAvg * geoAvg * sectorMultiplier)
  }, [selectedBand, selectedGeo, selectedSectorOption])

  const total = useMemo(() => unitPrice * qty, [unitPrice, qty])
  const isHighRevenue = HIGH_REVENUE_IDS.has(band)

  function handleCheckout() {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      const params = new URLSearchParams({
        band: selectedBand.id,
        geo: selectedGeo.id,
        qty: String(qty)
      })

      if (sectorGroup) {
        params.set("sectorGroup", sectorGroup)
      }

      if (sectorOption) {
        params.set("sectorOption", sectorOption)
      }

      router.push(`/pacchetti/drive-test?${params.toString()}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="calculator" className="py-18 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <PageLayoutContainer className="px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10 sm:mb-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/5">
              <Calculator className="h-6 w-6 text-navy" />
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-navy">{t("form.title")}</h2>
            <p className="text-gray-600 mt-2">{t("form.note")}</p>
          </div>

          <Card className="relative mx-auto max-w-5xl overflow-hidden border-none bg-transparent p-0 shadow-xl">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="relative overflow-hidden bg-gradient-to-br from-white via-orange/5 to-sky-blue/10 px-6 py-8 sm:px-10 sm:py-12 text-navy">
                <div className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-orange/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-orange/20 blur-2xl" />
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-navy/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy/80">
                      Drive Test Premium
                    </span>
                    <div>
                      <h3 className="text-3xl font-bold leading-tight sm:text-4xl">Configura il tuo Drive Test</h3>
                      <p className="mt-3 text-sm text-gray-600 sm:text-base">{t("form.note")}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-navy/10 bg-white/80 p-6 shadow-lg">
                      <div className="text-xs font-medium uppercase tracking-wider text-navy/70">{t("form.unit")}</div>
                      <div className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-navy">€ {unitPrice.toLocaleString()}</div>
                    </div>
                    <div className="rounded-3xl border border-navy/10 bg-white p-6 text-navy shadow-lg">
                      <div className="text-xs font-semibold uppercase tracking-wider text-navy/60">{t("form.total")}</div>
                      <div className="mt-3 text-4xl font-extrabold tracking-tight text-orange sm:text-5xl">€ {total.toLocaleString()}</div>
                      <div className="mt-2 text-xs font-medium text-navy/60">{t("form.qty")}: <span className="font-bold text-navy">{qty}</span></div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-3xl border border-navy/10 bg-white/85 p-5 shadow-sm">
                    <div className="flex items-center justify-between text-sm font-medium text-navy/80">
                      <span>{t("form.qty")}</span>
                      <span className="text-2xl font-extrabold text-orange">{qty}</span>
                    </div>
                    <input
                      type="range"
                      min={MIN_QTY}
                      max={MAX_QTY}
                      value={qty}
                      onChange={(event) => setQty(parseInt(event.target.value))}
                      aria-label={t("form.qty")}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-navy/15 accent-orange focus:outline-none"
                    />
                    <div className="flex items-center justify-between text-xs text-navy/60">
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
                      <p className="mt-2 text-sm text-gray-600">{t("form.note")}</p>
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

                            if (!nextGroup) {
                              setSectorOption("")
                              return
                            }

                            const group = SECTOR_GROUPS.find(x => x.id === nextGroup)
                            setSectorOption(group?.options[0]?.id ?? "")
                          }}
                        >
                          <option value="">Seleziona una macro area</option>
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
                          disabled={!selectedSectorGroup}
                        >
                          {!selectedSectorGroup ? (
                            <option value="">Seleziona una macro area</option>
                          ) : null}
                          {selectedSectorGroup?.options.map(option => (
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
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="flex w-full items-center justify-center rounded-2xl bg-orange px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        {t("form.ctaGoToDriveTest")}
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
  )
}
