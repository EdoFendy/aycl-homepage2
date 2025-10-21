"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Target,
  Users,
  BarChart2,
  ShieldCheck,
  Zap,
  PieChart,
  MessageSquare,
  TrendingUp,
  Settings,
  Clock,
  Database
} from "lucide-react"

import { LayoutWrapper } from "@/components/layout-wrapper"

// Dati strutturati per la tabella
const comparisonData = [
  {
    key: "contact",
    icon: MessageSquare,
    traditionalIcon: Target,
    ayClIcon: MessageSquare,
  },
  {
    key: "objective",
    icon: Target,
  },
  {
    key: "targeting",
    icon: Users,
    traditionalIcon: Users,
    ayClIcon: ShieldCheck,
  },
  {
    key: "quality",
    icon: Zap,
    traditionalIcon: Zap,
    ayClIcon: ShieldCheck,
  },
  {
    key: "timing",
    icon: Clock,
    traditionalIcon: Clock,
    ayClIcon: Clock,
  },
  {
    key: "scalability",
    icon: TrendingUp,
    traditionalIcon: TrendingUp,
    ayClIcon: TrendingUp,
  },
  {
    key: "personalization",
    icon: Settings,
    traditionalIcon: Settings,
    ayClIcon: Settings,
  },
  {
    key: "measurability",
    icon: BarChart2,
    traditionalIcon: BarChart2,
    ayClIcon: PieChart,
  },
  {
    key: "humanRole",
    icon: Users,
    traditionalIcon: Users,
    ayClIcon: Users,
  },
  {
    key: "result",
    icon: Database,
    traditionalIcon: Database,
    ayClIcon: TrendingUp,
  },
  {
    key: "vision",
    icon: Zap,
    traditionalIcon: Zap,
    ayClIcon: PieChart,
  },
]

export default function LeadsComparisonTable() {
  const t = useTranslations("comparison")

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Sfondo con gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-sky-blue/10 to-orange/5" />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, #FF9433 0.5px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
        <LayoutWrapper>
          {/* Header Section */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-orange/40 bg-orange/10 px-5 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">
                {t("badge")}
              </span>
            </div>
            <h2 className="mt-6 text-4xl font-bold leading-tight text-navy sm:text-[2.5rem]">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{t("subtitle")}</p>
          </div>

          {/* Comparison Table - 4 colonne */}
          <div className="mx-auto mt-12 max-w-7xl overflow-hidden">
            <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-xl">
              {/* Table Header */}
              <div className="grid grid-cols-1 gap-1 sm:gap-0 md:grid-cols-4">
                {/* Colonna Aspetto */}
                <div className="border-b-2 border-gray-200 bg-gray-50 px-3 py-4 sm:px-4 md:px-6 md:py-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 sm:text-sm md:text-sm">
                    {t("headers.aspect")}
                  </h3>
                </div>

                {/* Colonna Traffico a Pagamento */}
                <div className="border-b-2 border-r border-gray-200 bg-sky-blue/10 px-3 py-4 text-center sm:px-4 md:px-6 md:py-5">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-sky-blue sm:text-sm">
                      {t("headers.paidTraffic")}
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-sky-blue sm:h-2 sm:w-2" />
                  </div>
                </div>

                {/* Colonna Passaparola */}
                <div className="border-b-2 border-r border-gray-200 bg-gray-50 px-3 py-4 text-center sm:px-4 md:border-r md:px-6 md:py-5">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-gray-700 sm:text-sm">{t("headers.wordOfMouth")}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400 sm:h-2 sm:w-2" />
                  </div>
                </div>

                {/* Colonna All You Can Leads */}
                <div className="border-b-2 border-gray-200 bg-orange/10 px-3 py-4 text-center sm:px-4 md:px-6 md:py-5">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-orange sm:text-sm">{t("headers.aycl")}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-orange sm:h-2 sm:w-2" />
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-100">
                {comparisonData.map((row, index) => {
                  const Icon = row.icon
                  const TraditionalIcon = row.traditionalIcon || row.icon
                  const AyClIcon = row.ayClIcon || row.icon

                  return (
                    <div
                      key={row.key}
                      className={`grid grid-cols-1 gap-1 transition-all duration-200 sm:gap-0 md:grid-cols-4 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      } hover:bg-sky-blue/5`}
                    >
                      {/* Colonna Aspetto */}
                      <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-3 sm:gap-3 sm:px-4 md:border-b-0 md:border-r md:px-6 md:py-5">
                        <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center text-sky-blue sm:h-5 sm:w-5">
                          <Icon className="h-full w-full" />
                        </div>
                        <h3 className="text-xs font-medium leading-tight text-gray-900 sm:text-sm md:text-sm">
                          {t(`rows.${row.key}.aspect`)}
                        </h3>
                      </div>

                      {/* Colonna Traffico a Pagamento */}
                      <div className="border-b border-gray-100 px-3 py-3 text-center sm:px-4 md:border-b-0 md:border-r md:px-6 md:py-5">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center justify-center gap-1.5">
                            <XCircle className="h-4 w-4 flex-shrink-0 stroke-2 text-red-500 sm:h-5 sm:w-5" />
                          </div>
                          <span className="text-xs font-medium text-gray-600 sm:text-sm">
                            {t(`rows.${row.key}.paidTraffic`)}
                          </span>
                        </div>
                      </div>

                      {/* Colonna Passaparola */}
                      <div className="border-b border-gray-100 px-3 py-3 text-center sm:px-4 md:border-b-0 md:border-r md:px-6 md:py-5">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs font-medium text-gray-700 sm:text-sm">
                            {t(`rows.${row.key}.wordOfMouth`)}
                          </span>
                          {t.has(`rows.${row.key}.wordOfMouthNote`) && (
                            <p className="mt-1 text-xs italic text-gray-400">{t(`rows.${row.key}.wordOfMouthNote`)}</p>
                          )}
                        </div>
                      </div>

                      {/* Colonna All You Can Leads */}
                      <div className="border-b border-gray-100 px-3 py-3 text-center sm:px-4 md:border-b-0 md:px-6 md:py-5">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center justify-center gap-1.5">
                            <CheckCircle className="h-4 w-4 flex-shrink-0 stroke-2 text-green-500 sm:h-5 sm:w-5" />
                          </div>
                          <span className="text-xs font-medium text-gray-900 sm:text-sm">
                            {t(`rows.${row.key}.aycl`)}
                          </span>
                          {t.has(`rows.${row.key}.badge`) && (
                            <span className="mt-1 inline-flex h-5 items-center whitespace-nowrap rounded-full border border-orange/20 bg-orange/10 px-2 text-[9px] font-medium text-orange sm:h-6 sm:px-2.5 sm:text-xs md:text-xs">
                              {t(`rows.${row.key}.badge`)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer CTA */}
              <div className="rounded-b-2xl border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 via-orange-50/30 to-gray-50 px-4 py-5 text-center sm:px-6 sm:py-6">
                <p className="mb-3 text-xs font-medium text-gray-700 sm:mb-4 sm:text-sm">{t("cta.text")}</p>
                <Link href="/pacchetti">
                  <button className="inline-flex items-center rounded-full bg-orange px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-orange/25 transition-all hover:scale-105 hover:bg-orange/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 active:scale-95 sm:px-6 sm:py-3 sm:text-sm">
                    {t("cta.button")}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  )
}

