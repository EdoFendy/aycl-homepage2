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
  const hasAspectLabel = Boolean(aspectLabel && aspectLabel.trim().length > 0)

  return (
    <div className="mx-auto mt-12 w-full max-w-[1100px]">
      <div className="overflow-hidden rounded-3xl border border-[#0A2B6B]/10 bg-white/95 shadow-[0_20px_45px_rgba(10,43,107,0.08)]">
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="px-4 pt-6 sm:px-6 sm:pt-8">
              <div className="grid grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] gap-2 sm:gap-3">
                <div
                  className={cn(
                    "py-2.5 pl-3 pr-2 text-left",
                    hasAspectLabel ? "rounded-xl bg-[#F5F9FF] ring-1 ring-[#0A2B6B]/20" : ""
                  )}
                >
                  {hasAspectLabel ? (
                    <span className="block text-xs font-semibold tracking-wide text-[#0A2B6B] sm:text-sm">
                      {aspectLabel}
                    </span>
                  ) : null}
                </div>
                {headers.map((header, index) => {
                  const isHighlight = header.variant === "highlight"

                  return (
                    <div
                      key={`${header.label}-${index}`}
                      className={cn(
                        "rounded-xl py-2.5 text-center ring-1",
                        isHighlight
                          ? "ring-[#F4AD42] bg-[#FFF7EA]"
                          : "ring-[#0A2B6B]/20 bg-[#F5F9FF]"
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
            </div>

            <div className="px-4 pb-6 sm:px-6 sm:pb-8">
              <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-[#0A2B6B]/10">
                <div className="divide-y divide-slate-100 bg-white">
                  {rows.map((row) => {
                    const Icon = row.icon

                    return (
                      <div
                        key={row.key}
                        className="grid grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] bg-white"
                      >
                        <div className="border-r border-slate-100 bg-[#F5F9FF]/70 px-3 py-3 sm:px-5 sm:py-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            {Icon ? (
                              <div className="mt-0.5 text-[#0A2B6B] opacity-90">
                                <Icon className="h-5 w-5" />
                              </div>
                            ) : null}
                            <div>
                              {aspectLabel ? <span className="sr-only">{aspectLabel}</span> : null}
                              <h3 className="text-[11px] font-semibold leading-snug text-[#0A2B6B] sm:text-sm">
                                {row.aspect}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="border-r border-slate-100 px-3 py-3 sm:px-5 sm:py-4">
                          <p className="text-[11px] leading-snug text-slate-700 sm:text-sm">
                            {renderHighlightedText(row.traditional)}
                          </p>
                        </div>

                        <div className="border-r border-slate-100 bg-[#F7FBFF] px-3 py-3 sm:px-5 sm:py-4">
                          {row.wordOfMouth ? (
                            <p className="text-[11px] leading-snug text-slate-700 sm:text-sm">
                              {renderHighlightedText(row.wordOfMouth)}
                            </p>
                          ) : (
                            <p className="text-[11px] leading-snug text-slate-400 sm:text-sm">—</p>
                          )}
                          {row.wordOfMouthNote ? (
                            <p className="mt-2 text-[10px] leading-snug text-slate-400 sm:text-xs">
                              {renderHighlightedText(row.wordOfMouthNote)}
                            </p>
                          ) : null}
                        </div>

                        <div className="bg-[#FFF7EA] px-3 py-3 sm:px-5 sm:py-4">
                          <p className="text-[11px] font-semibold leading-snug text-[#0F2540] sm:text-sm">
                            {renderHighlightedText(row.aycl)}
                          </p>
                          {row.badge ? (
                            <span className="mt-2 inline-flex items-center rounded-full bg-[#F4AD42]/16 px-2 py-0.5 text-[10px] font-medium text-[#C77300] ring-1 ring-[#F4AD42]/30 sm:text-xs">
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
          </div>
        </div>
      </div>
    </div>
  )
}
