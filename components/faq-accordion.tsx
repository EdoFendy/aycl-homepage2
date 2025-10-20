"use client"

import { useState, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: string
  answer: ReactNode
}

type FAQAccordionProps = {
  items?: FAQItem[] | Record<string, FAQItem>
  className?: string
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const normalized = Array.isArray(items) ? items : Object.values(items ?? {})
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {normalized.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={`${item.question}-${index}`} className="group">
            <div
              className={cn(
                "rounded-2xl border transition-colors",
                isOpen ? "bg-[#f6f9ff] border-sky-blue" : "bg-white border-navy/15 hover:border-navy/30"
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-blue"
              >
                <span className="text-[17px] font-semibold text-navy group-hover:text-orange transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-navy/70 transition-transform duration-300",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                  aria-hidden="true"
                />
              </button>

              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-hidden={!isOpen}
                className={cn(
                  "px-6 overflow-hidden transition-[max-height] duration-300 ease-out",
                  isOpen ? "max-h-[600px] pb-6" : "max-h-0"
                )}
              >
                <div className="pt-2 text-[15px] leading-7 text-gray-700/85">
                  {typeof item.answer === "string" ? (
                    <p className="whitespace-pre-line">{item.answer}</p>
                  ) : (
                    item.answer
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

