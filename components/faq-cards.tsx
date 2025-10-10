import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type FAQCard = {
  question: string
  answer: ReactNode
}

type FAQCardsProps = {
  items: FAQCard[]
  className?: string
}

export function FAQCards({ items, className }: FAQCardsProps) {
  return (
    <div className={cn("grid gap-6 md:gap-8 md:grid-cols-2", className)}>
      {items.map((item, index) => (
        <article key={`${item.question}-${index}`} className="group relative isolate">
          <div className="absolute inset-0 -z-10 rounded-[1.75rem] bg-[linear-gradient(135deg,var(--navy),var(--sky-blue),var(--orange))] opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
          <div className="relative h-full rounded-[1.5rem] border border-white/40 bg-white/95 p-6 shadow-[0_24px_48px_-32px_rgba(1,47,107,0.65)] backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-navy">
                FAQ
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-sky-blue/70 via-orange/60 to-transparent" aria-hidden />
            </div>
            <h3 className="mt-4 text-xl font-semibold leading-snug text-navy">{item.question}</h3>
            <div className="mt-4 text-base leading-relaxed text-slate-600 [&_p]:mt-4 [&_p:first-child]:mt-0 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5">
              {typeof item.answer === "string" ? (
                <p className="whitespace-pre-line">{item.answer}</p>
              ) : (
                item.answer
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
