"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { renderHighlightedText } from "@/lib/highlighted-text"

export type MinimalComparisonHeader = {
  label: string
  variant?: "default" | "highlight"
}

export type MinimalComparisonRow = {
  key: string
  icon?: LucideIcon
  aspect: string
  traditional: string
  wordOfMouth?: string
  wordOfMouthNote?: string
  aycl: string
  badge?: string
}

export type MinimalComparisonTableProps = {
  headers: [MinimalComparisonHeader, MinimalComparisonHeader, MinimalComparisonHeader]
  rows: MinimalComparisonRow[]
  aspectLabel?: string
}

export function MinimalComparisonTable({ headers, rows, aspectLabel }: MinimalComparisonTableProps) {
  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
        {headers.map((header, index) => {
          const isHighlight = header.variant === "highlight"

          return (
            <div
              key={`${header.label}-${index}`}
              className={cn(
                "rounded-xl py-2.5 text-center ring-1",
                isHighlight ? "ring-[#F4AD42] bg-[#FFF7EA]" : "ring-[#0A2B6B]/30"
              )}
            >
              <span
                className={cn(
                  "tracking-wide text-xs sm:text-sm",
                  isHighlight ? "font-extrabold text-[#C77300]" : "font-semibold text-[#0A2B6B]"
                )}
              >
                {header.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {rows.map((row) => {
            const Icon = row.icon

            return (
              <div key={row.key} className="grid grid-cols-3">
                <div className="px-3 sm:px-5 py-3 sm:py-4 border-r border-slate-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    {Icon ? (
                      <div className="text-[#0A2B6B] opacity-90">
                        <Icon className="h-5 w-5" />
                      </div>
                    ) : null}
                    <div>
                      {aspectLabel ? (
                        <span className="sr-only">{aspectLabel}</span>
                      ) : null}
                      <h3 className="text-[11px] sm:text-sm font-semibold text-[#0A2B6B] leading-snug">
                        {row.aspect}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="px-3 sm:px-5 py-3 sm:py-4 border-r border-slate-100">
                  <p className="text-[11px] sm:text-sm text-slate-700 leading-snug">
                    {renderHighlightedText(row.traditional)}
                  </p>
                  {row.wordOfMouth ? (
                    <p className="mt-1 text-[11px] sm:text-sm text-slate-500 leading-snug">
                      {renderHighlightedText(row.wordOfMouth)}
                    </p>
                  ) : null}
                  {row.wordOfMouthNote ? (
                    <p className="mt-1 text-[10px] sm:text-xs text-slate-400 leading-snug">
                      {renderHighlightedText(row.wordOfMouthNote)}
                    </p>
                  ) : null}
                </div>

                <div className="px-3 sm:px-5 py-3 sm:py-4 bg-[#FFF7EA]/60">
                  <p className="text-[11px] sm:text-sm font-semibold text-[#0F2540] leading-snug">
                    {renderHighlightedText(row.aycl)}
                  </p>
                  {row.badge ? (
                    <span className="mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium text-[#C77300] bg-[#F4AD42]/12 ring-1 ring-[#F4AD42]/30">
                      {row.badge}
                    </span>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
