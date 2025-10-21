import { ReactNode } from "react"

import { PageLayoutContainer } from "@/components/page-layout-container"
import { cn } from "@/lib/utils"

export interface LegalHeroConfig {
  eyebrow: string
  title: string
  subtitle?: string
  description?: ReactNode
  lastUpdated?: string
  highlight?: string
  actions?: ReactNode
}

export interface LegalSectionConfig {
  id: string
  title: string
  summary?: string
  badge?: string
  icon?: ReactNode
  content: ReactNode
}

interface LegalPageLayoutProps {
  hero: LegalHeroConfig
  sections: LegalSectionConfig[]
  className?: string
}

export function LegalPageLayout({ hero, sections, className }: LegalPageLayoutProps) {
  return (
    <main className={cn("relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50", className)}>
      <Hero {...hero} />

      <section className="relative pb-24 lg:pb-32">
        <BackgroundBlobs position="bottom" />

        <PageLayoutContainer className="px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
            <div className="space-y-8">
              {sections.map((section) => (
                <LegalSection key={section.id} {...section} />
              ))}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-36 space-y-6">
                <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white/80 p-6 shadow-[0_20px_45px_rgba(1,47,107,0.08)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange">Indice rapido</p>
                  <nav className="mt-4 space-y-3 text-sm text-gray-600">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group flex items-start gap-3 rounded-xl border border-transparent bg-transparent px-3 py-2 transition hover:border-orange/40 hover:bg-orange/5"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange/80 transition group-hover:bg-orange" />
                        <span className="leading-tight text-left text-navy/80 group-hover:text-navy">
                          {section.title}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>

                {hero.highlight ? (
                  <div className="overflow-hidden rounded-3xl border border-sky-blue/20 bg-gradient-to-br from-sky-blue/10 via-white to-orange/10 p-6 shadow-[0_16px_40px_rgba(1,47,107,0.12)]">
                    <p className="text-sm font-semibold text-navy">{hero.highlight}</p>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </PageLayoutContainer>
      </section>
    </main>
  )
}

function Hero({ eyebrow, title, subtitle, description, lastUpdated, highlight, actions }: LegalHeroConfig) {
  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      <BackgroundBlobs position="top" />

      <PageLayoutContainer className="px-6">
        <div className="relative mx-auto flex max-w-4xl flex-col gap-10 text-center lg:max-w-5xl">
          <div className="mx-auto flex flex-col items-center gap-6">
            <span className="inline-flex items-center justify-center rounded-full border border-orange/30 bg-orange/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-orange">
              {eyebrow}
            </span>

            <div className="space-y-6">
              <h1 className="text-balance text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              {subtitle ? (
                <p className="text-lg font-medium uppercase tracking-[0.28em] text-navy/70">
                  {subtitle}
                </p>
              ) : null}

              {description ? (
                <div className="mx-auto max-w-3xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
                  {description}
                </div>
              ) : null}
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2">
              {lastUpdated ? (
                <div className="rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-gray-600 shadow-[0_16px_40px_rgba(1,47,107,0.08)] backdrop-blur">
                  <p className="font-semibold text-navy">{lastUpdated}</p>
                  {highlight ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-orange/80">
                      Aggiornamento valido
                    </p>
                  ) : null}
                </div>
              ) : null}

              {highlight ? (
                <div className="rounded-2xl border border-sky-blue/20 bg-gradient-to-br from-sky-blue/10 via-white to-orange/5 p-4 text-left text-sm text-gray-700 shadow-[0_16px_40px_rgba(1,47,107,0.1)]">
                  <p className="font-semibold text-navy">{highlight}</p>
                </div>
              ) : null}
            </div>

            {actions ? <div className="flex flex-wrap justify-center gap-3">{actions}</div> : null}
          </div>
        </div>
      </PageLayoutContainer>
    </section>
  )
}

function BackgroundBlobs({ position }: { position: "top" | "bottom" }) {
  if (position === "top") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-16 h-72 w-72 -translate-x-1/4 rounded-full bg-sky-blue/10 blur-3xl" />
        <div className="absolute -top-20 right-20 h-64 w-64 translate-x-1/3 rounded-full bg-orange/10 blur-[120px]" />
        <div className="absolute top-24 left-1/2 h-48 w-48 -translate-x-1/2 rotate-12 rounded-3xl border border-navy/10" />
      </div>
    )
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -bottom-20 left-12 h-60 w-60 -translate-x-1/3 rounded-full bg-orange/10 blur-3xl" />
      <div className="absolute bottom-10 right-16 h-72 w-24 rotate-12 bg-navy/5" />
      <div className="absolute bottom-32 right-1/3 h-40 w-40 rounded-full bg-sky-blue/10 blur-2xl" />
    </div>
  )
}

function LegalSection({ id, title, summary, badge, icon, content }: LegalSectionConfig) {
  return (
    <article
      id={id}
      className="group relative overflow-hidden rounded-3xl border border-navy/10 bg-white/90 p-8 shadow-[0_24px_64px_rgba(1,47,107,0.12)] transition hover:-translate-y-1 hover:border-orange/30 hover:shadow-[0_32px_96px_rgba(1,47,107,0.16)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white via-white to-orange/5 opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute -top-24 -right-20 h-48 w-48 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-sky-blue/10 blur-3xl" />

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {icon ? <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange/10 text-orange">{icon}</span> : null}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {badge ? (
                <span className="rounded-full bg-sky-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-blue">
                  {badge}
                </span>
              ) : null}
              <h2 className="text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
            </div>
            {summary ? <p className="text-sm uppercase tracking-[0.28em] text-gray-400">{summary}</p> : null}
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
          {content}
        </div>
      </div>
    </article>
  )
}

export type { LegalPageLayoutProps }
