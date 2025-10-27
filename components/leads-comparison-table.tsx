"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight, Target, Users, BarChart2, Zap, MessageSquare, TrendingUp, Settings, Clock, Database } from "lucide-react"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { renderHighlightedText } from "@/lib/highlighted-text"
import {
  MinimalComparisonTable,
  type MinimalComparisonRow,
} from "@/components/minimal-comparison-table"

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

  const comparisonRows: MinimalComparisonRow[] = comparisonData.map((row) => ({
    key: row.key,
    icon: row.icon,
    aspect: t(`rows.${row.key}.aspect`),
    traditional: t(`rows.${row.key}.paidTraffic`),
    wordOfMouth: t.has(`rows.${row.key}.wordOfMouth`)
      ? t(`rows.${row.key}.wordOfMouth`)
      : undefined,
    wordOfMouthNote: t.has(`rows.${row.key}.wordOfMouthNote`)
      ? t(`rows.${row.key}.wordOfMouthNote`)
      : undefined,
    aycl: t(`rows.${row.key}.aycl`),
    badge: t.has(`rows.${row.key}.badge`) ? t(`rows.${row.key}.badge`) : undefined,
  }))

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

          <MinimalComparisonTable
            aspectLabel={t("headers.aspect")}
            headers={[
              { label: t("headers.paidTraffic") },
              { label: t("headers.wordOfMouth") },
              { label: t("headers.aycl"), variant: "highlight" },
            ]}
            rows={comparisonRows}
          />

          <div className="mx-auto mt-6 max-w-4xl">
            <div className="rounded-2xl border border-orange/20 bg-[#FFF7EA]/60 px-4 py-5 text-center sm:px-6">
              <p className="mb-3 text-[11px] sm:text-sm font-medium text-[#0A2B6B]">
                {renderHighlightedText(t("cta.text"))}
              </p>
              <Link href="/pacchetti">
                <button className="inline-flex items-center rounded-full bg-[#F4AD42] px-5 py-2.5 text-[11px] font-semibold text-[#0F2540] shadow-sm transition-all hover:scale-[1.02] hover:bg-[#E89C36] focus:outline-none focus:ring-2 focus:ring-[#F4AD42] focus:ring-offset-2">
                  {t("cta.button")}
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </button>
              </Link>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  )
}

