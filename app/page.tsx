"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { getCalApi } from "@calcom/embed-react"
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Gauge,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FAQAccordion } from "@/components/faq-accordion"
import DriveTestCalculator from "@/components/drive-test-calculator"
import LeadsComparisonTable from "@/components/leads-comparison-table"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { renderHighlightedText } from "@/lib/highlighted-text"

interface StatsCardConfig {
  key: "cpc" | "budget" | "leads"
  icon: typeof TrendingUp
  accent: string
}

const statsCardConfig: StatsCardConfig[] = [
  { key: "cpc", icon: TrendingUp, accent: "from-orange/30 via-orange/10 to-transparent" },
  { key: "budget", icon: Target, accent: "from-sky-blue/30 via-sky-blue/10 to-transparent" },
  { key: "leads", icon: Users, accent: "from-navy/20 via-navy/5 to-transparent" },
]

const benefitCardIcons = [Sparkles, Target, Users]

interface ProcessStepConfig {
  key: "icp" | "strategy" | "quality"
  image: string
  badgeColor: string
}

type FAQItem = {
  question: string
  answer: ReactNode
}

const processStepConfig: ProcessStepConfig[] = [
  { key: "icp", image: "newmedia/ICP_Card.png", badgeColor: "bg-orange/10 text-orange" },
  { key: "strategy", image: "newmedia/Percorso.png", badgeColor: "bg-sky-blue/10 text-sky-blue" },
  { key: "quality", image: "newmedia/Regime.png", badgeColor: "bg-navy/10 text-navy" },
]

function parseNumericValue(value: string) {
  const trimmed = value.trim()
  const prefix = trimmed.startsWith("+") || trimmed.startsWith("-") ? trimmed.charAt(0) : ""
  const withoutPrefix = prefix ? trimmed.slice(1) : trimmed
  const suffixMatch = withoutPrefix.match(/([^0-9.,-]+)$/)
  const suffix = suffixMatch ? suffixMatch[1] : ""
  const numericPart = suffix ? withoutPrefix.slice(0, withoutPrefix.length - suffix.length) : withoutPrefix
  const normalized = numericPart.replace(/,/g, ".")
  const decimals = normalized.includes(".") ? Math.min(normalized.length - normalized.indexOf(".") - 1, 2) : 0
  const target = parseFloat(normalized)

  return { prefix, suffix, target: Number.isNaN(target) ? 0 : target, decimals }
}

function AnimatedCounter({
  value,
  inView,
  prefersReducedMotion,
  duration = 800,
}: {
  value: string
  inView: boolean
  prefersReducedMotion: boolean
  duration?: number
}) {
  const { decimals, prefix, suffix, target } = useMemo(() => parseNumericValue(value), [value])
  const [displayValue, setDisplayValue] = useState(() =>
    prefersReducedMotion ? value : `${prefix}${(0).toFixed(decimals)}${suffix}`,
  )
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value)
      hasAnimated.current = true
      return
    }

    setDisplayValue(`${prefix}${(0).toFixed(decimals)}${suffix}`)
    hasAnimated.current = false
  }, [prefersReducedMotion, value, prefix, suffix, decimals])

  useEffect(() => {
    if (!inView || prefersReducedMotion || hasAnimated.current) {
      if (inView) {
        setDisplayValue(value)
      }
      return
    }

    hasAnimated.current = true
    let animationFrame = 0
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const current = target * progress
      setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`)

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrame = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [decimals, duration, inView, prefersReducedMotion, prefix, suffix, target, value])

  return <span>{displayValue}</span>
}

function useInViewAnimation<T extends HTMLElement>(
  prefersReducedMotion: boolean,
  options?: IntersectionObserverInit,
) {
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion)
  const [node, setNode] = useState<T | null>(null)

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({ threshold: 0.2, ...options }),
    [options],
  )

  const ref = useCallback((element: T | null) => {
    setNode(element)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true)
      return
    }

    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      })
    }, observerOptions)

    observer.observe(node)

    return () => observer.disconnect()
  }, [node, observerOptions, prefersReducedMotion])

  return { ref, hasEntered }
}
function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5 text-orange"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.25 14.653 8.7l5.847.851-4.22 4.112.996 5.814L12 16.916 6.724 19.477l.996-5.814-4.22-4.112 5.847-.851L12 3.25z"
      />
    </svg>
  )
}
export default function HomePage() {
  const router = useRouter()
  const t = useTranslations("home")
  const prefersReducedMotion = usePrefersReducedMotion()
  const tFaq = useTranslations("faq")
  const faqItems = useMemo<FAQItem[]>(() => {
    const raw = t.raw("faq.items") as FAQItem[] | Record<string, FAQItem> | undefined
    if (!raw) return []
    return Array.isArray(raw) ? raw : Object.values(raw)
  }, [t])

  const [statsLoading, setStatsLoading] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setStatsLoading(false), 600)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: "aycl-discovery" })
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    })()
  }, [])

  const { ref: statsRef, hasEntered: statsInView } = useInViewAnimation<HTMLDivElement>(prefersReducedMotion)
  const { ref: solutionRef, hasEntered: solutionInView } = useInViewAnimation<HTMLDivElement>(prefersReducedMotion, {
    threshold: 0.15,
  })
  const { ref: benefitsRef, hasEntered: benefitsInView } = useInViewAnimation<HTMLDivElement>(prefersReducedMotion)
  const { ref: processRef, hasEntered: processInView } = useInViewAnimation<HTMLDivElement>(prefersReducedMotion, {
    threshold: 0.1,
  })

  const [heroParallax, setHeroParallax] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setHeroParallax(0)
      return
    }

    const handleScroll = () => {
      const offset = window.scrollY * 0.2
      setHeroParallax(offset)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [prefersReducedMotion])

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  const handleCardKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, path: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        navigateTo(path)
      }
    },
    [navigateTo],
  )

  const handleContactClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      navigateTo("/contattaci")
    },
    [navigateTo],
  )

  const heroSubtitle = t("hero.subtitle")
  const heroDescription = t("hero.description")

  return (
    <div className="min-h-screen bg-white text-navy">
      <a
        href="#homepage-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Salta al contenuto principale
      </a>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f9ff]">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-orange/20 blur-3xl" aria-hidden="true" />
          <div className="absolute top-1/3 left-[-120px] h-72 w-72 rounded-full bg-sky-blue/15 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 right-1/3 h-40 w-96 bg-gradient-to-r from-orange/10 via-transparent to-transparent blur-[120px]" />
          <div className="absolute inset-0 bg-soft-grid" aria-hidden="true" />
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-5 pb-40 pt-32 sm:px-10 md:gap-16 md:pt-36 lg:gap-20 lg:pb-44">
          <LayoutWrapper>
            <div className="grid items-center gap-12 lg:grid-cols-[0.38fr_0.62fr] lg:gap-16 xl:gap-20">
              <div className="order-2 space-y-6 md:space-y-7 lg:order-1">
                <span className="inline-flex items-center rounded-full border border-orange/20 bg-orange/10 px-4 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-orange">
                  {t("hero.badge")}
                </span>

                <h1 className="max-w-[620px] text-3xl font-bold leading-tight text-navy sm:text-5xl sm:leading-[1.1] lg:text-[3.75rem]">
                  {t("hero.title")} <span className="text-orange">{t("hero.titleHighlight")}</span>
                </h1>

                <p className="max-w-[540px] text-lg leading-relaxed text-gray-600 sm:text-xl" aria-label={heroSubtitle}>
                  {renderHighlightedText(heroSubtitle)}
                </p>

                <p className="max-w-[540px] text-base leading-relaxed text-gray-600/85 sm:text-lg" aria-label={heroDescription}>
                  {renderHighlightedText(heroDescription)}
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/contattaci"
                    className="arrow-slide-hover group inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,148,51,0.35)] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange sm:w-auto sm:text-lg"
                  >
                    <span>{t("hero.cta.primary")}</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 ease-out" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/pacchetti"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-4 text-base font-semibold text-navy transition duration-200 ease-out hover:bg-navy/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy sm:w-auto sm:text-lg"
                  >
                    {t("hero.cta.secondary")}
                  </Link>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200/70 backdrop-blur">
                  <StarIcon />
                  <span>{t("trust.text")}</span>
                </div>
              </div>

              <div
                className="order-1 relative mx-auto hidden lg:flex w-full max-w-[240px] sm:max-w-[520px] md:max-w-[720px] lg:max-w-[1100px] items-center justify-center lg:-mr-4 lg:order-2"
                style={{ transform: prefersReducedMotion ? undefined : `translateY(${-heroParallax * 0.25}px)` }}
              >
                <div className="absolute -top-12 left-6 h-40 w-40 rounded-full bg-sky-blue/30 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-orange/25 blur-3xl" aria-hidden="true" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),transparent_60%)]" aria-hidden="true" />
                <div className="relative w-full">
                  <div className={prefersReducedMotion ? "" : "floating-illustration"}>
                    <Image
                      src="/newmedia/AYCL_3d.png"
                      alt={t("hero.title")}
                      width={1100}
                      height={1100}
                      priority
                      className="h-auto w-full max-w-none object-contain drop-shadow-[0_32px_80px_rgba(15,40,85,0.25)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </section>
      <main id="homepage-main" className="space-y-0">
        <section className="relative bg-white py-28">
          <div className="absolute inset-0 -z-10 opacity-70">
            <div className="absolute top-10 left-5 h-20 w-20 rounded-full bg-orange/10" aria-hidden="true" />
            <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-sky-blue/15" aria-hidden="true" />
          </div>
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="order-2 space-y-6 lg:order-1">
                  <div className="inline-flex items-center gap-3 text-orange">
                    <span className="h-px w-12 bg-orange" aria-hidden="true" />
                    <span className="text-sm font-semibold uppercase tracking-[0.18em]">{t("story.badge")}</span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight text-navy sm:text-4xl">
                    {t("story.title")}
                  </h2>
                  <div className="space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                    <p>{renderHighlightedText(t("story.text1"))}</p>
                    <p>{renderHighlightedText(t("story.text2"))}</p>
                  </div>
                </div>
                <div className="order-1 flex justify-center lg:order-2">
                  <div className="relative max-w-xl overflow-hidden rounded-3xl shadow-[0_24px_48px_rgba(9,30,66,0.12)]">
                    <Image
                      src="/newmedia/Tavolo.png"
                      alt={t("alt.businessChallenge")}
                      width={640}
                      height={520}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </LayoutWrapper>
          </div>
        </section>

        <section ref={statsRef} className="relative overflow-hidden bg-[#f9fbff] py-28">
          <div className="absolute inset-0 -z-10 bg-dotted-pattern" aria-hidden="true" />
          <div className="absolute left-1/2 top-16 -z-10 h-32 w-32 -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div
                className={`mx-auto max-w-3xl text-center transition duration-700 ${
                  statsInView && !prefersReducedMotion ? "motion-safe:animate-[aycl-fade-up_0.7s_ease-out_forwards]" : ""
                }`}
              >
                <span className="inline-flex items-center justify-center rounded-full border border-gray-200/60 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
                  {t("stats.badge")}
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-snug text-navy sm:text-[2.5rem]">
                  {t("stats.title")}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  {t("stats.subtitle")}
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                {statsLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="h-full animate-pulse rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm"
                    >
                      <div className="h-12 w-12 rounded-full bg-sky-blue/10" />
                      <div className="mt-6 h-10 w-32 rounded-full bg-gray-200" />
                      <div className="mt-4 h-16 rounded-lg bg-gray-100" />
                    </div>
                  ))
                ) : (
                  statsCardConfig.map(({ key, icon: Icon, accent }, index) => {
                    const metric = t(`stats.metrics.${key}.label`)
                    const value = t(`stats.metrics.${key}.value`)
                    const description = t(`stats.metrics.${key}.desc`)
                    const source = t(`stats.metrics.${key}.source`)
                    const isHighlighted = index === 0

                    return (
                      <article
                        key={key}
                        className={`relative flex h-full flex-col gap-5 rounded-3xl border border-white/70 bg-white p-8 text-center transition-all duration-500 ease-out ${
                          statsInView || prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        } hover:-translate-y-2 hover:aycl-shadow-lg focus-within:-translate-y-2 focus-within:aycl-shadow-lg focus-within:border-orange/40 ${
                          isHighlighted ? "ring-2 ring-orange/40" : ""
                        }`}
                        style={!prefersReducedMotion ? { transitionDelay: `${index * 0.1}s` } : undefined}
                      >
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${accent} opacity-60`}
                          aria-hidden="true"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{metric}</p>
                          <p className="text-4xl font-bold text-navy">
                            <AnimatedCounter value={value} inView={statsInView} prefersReducedMotion={prefersReducedMotion} />
                          </p>
                          <p className="text-sm leading-relaxed text-gray-600">{description}</p>
                          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-400">{source}</p>
                        </div>
                      </article>
                    )
                  })
                )}
              </div>
            </LayoutWrapper>
          </div>
        </section>
        <section ref={solutionRef} className="relative overflow-hidden bg-white py-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-[#f6f9ff]" aria-hidden="true" />
          <div className="absolute -right-32 top-10 -z-10 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div className="mb-16 text-center">
                <span className="inline-flex items-center justify-center rounded-full border border-sky-blue/30 bg-sky-blue/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-blue">
                  {t("solution.badge")}
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-tight text-navy sm:text-[2.5rem]">
                  {t("solution.title")}
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
                  {t("solution.subtitle")}
                </p>
              </div>

              <div className="flex flex-col-reverse items-center gap-16 lg:flex-row lg:items-center lg:gap-20">
                <div
                  className={`w-full max-w-xl space-y-6 transition-all duration-700 ${
                    solutionInView && !prefersReducedMotion
                      ? "motion-safe:animate-[aycl-fade-up_0.7s_ease-out_forwards]"
                      : ""
                  }`}
                >
                  <h3 className="text-3xl font-bold leading-snug text-navy sm:text-[2.125rem]">
                    {t("solution.tech.title")}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {renderHighlightedText(t("solution.tech.text1"))}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {renderHighlightedText(t("solution.tech.text2"))}
                  </p>

                  <div className="space-y-3">
                    {([
                      "database",
                      "ai",
                      "outreach",
                      "control",
                    ] as const).map((featureKey) => (
                      <div
                        key={featureKey}
                        className="flex items-start gap-3 rounded-2xl bg-[#f6f9ff] px-6 py-4 text-base font-medium text-gray-700"
                      >
                        <span className="text-orange font-bold mt-1">•</span>
                        <div>
                          <p className="font-semibold text-navy">{t(`solution.tech.features.${featureKey}.title`)}</p>
                          <p className="text-sm font-normal text-gray-600">
                            {t(`solution.tech.features.${featureKey}.desc`)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="relative w-full max-w-xl"
                  style={{ transform: solutionInView && !prefersReducedMotion ? "scale(1)" : "scale(0.97)" }}
                >
                  <div className="absolute -inset-6 rounded-3xl bg-orange/10 blur-3xl" aria-hidden="true" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_24px_48px_rgba(9,30,66,0.12)]">
                    <Image
                      src="/newmedia/NostreRegole.png"
                      alt={t("solution.title")}
                      width={560}
                      height={460}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </LayoutWrapper>
          </div>
        </section>

        <section ref={benefitsRef} className="relative bg-gradient-to-b from-[#f6f9ff] via-white to-white py-28">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="bg-dotted-pattern h-full w-full opacity-60" />
          </div>
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="text-4xl font-bold leading-tight text-navy sm:text-[2.5rem]">
                  {t("benefits.title")}
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {([
                  "meetings",
                  "team",
                  "control",
                ] as const).map((benefitKey, index) => {
                  const Icon = benefitCardIcons[index]
                  return (
                    <article
                      key={benefitKey}
                      className={`group flex h-full flex-col rounded-3xl border border-white/60 bg-white p-9 transition-all duration-500 ease-out ${
                        benefitsInView || prefersReducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      } hover:-translate-y-2 hover:aycl-shadow-lg focus-within:-translate-y-2 focus-within:aycl-shadow-lg ${
                        index === 0
                          ? "border-t-[3px] border-t-orange"
                          : index === 1
                          ? "border-t-[3px] border-t-sky-blue"
                          : "border-t-[3px] border-t-navy/70"
                      }`}
                      style={!prefersReducedMotion ? { transitionDelay: `${index * 0.12}s` } : undefined}
                      tabIndex={0}
                    >
                      <div className="relative mb-6 flex items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef4ff] text-orange shadow-inner">
                          <Icon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold leading-snug text-navy">
                        {t(`benefits.cards.${benefitKey}.title`)}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
                        {t(`benefits.cards.${benefitKey}.desc`)}
                      </p>
                    </article>
                  )
                })}
              </div>
            </LayoutWrapper>
          </div>
        </section>

        <section ref={processRef} className="relative bg-white py-28">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-[#f6f9ff]" aria-hidden="true" />
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-600">
                  {t("process.badge")}
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-snug text-navy sm:text-[2.5rem]">
                  {t("process.title")}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">{t("process.subtitle")}</p>
              </div>

              <div className="relative mt-16 space-y-24">
                <div
                  className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 border-l-2 border-dashed border-orange/40 md:block"
                  aria-hidden="true"
                />
                {processStepConfig.map(({ key, image, badgeColor }, index) => {
                  const isEven = index % 2 === 1
                  const stepNumber = `0${index + 1}`

                  return (
                    <article
                      key={key}
                      className={`relative grid gap-12 md:grid-cols-2 md:items-center ${
                        processInView && !prefersReducedMotion
                          ? "motion-safe:animate-[aycl-fade-up_0.7s_ease-out_forwards]"
                          : ""
                      }`}
                    >
                      <div className={`order-2 md:order-1 ${isEven ? "md:order-2" : ""}`}>
                        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_16px_40px_rgba(9,30,66,0.1)]">
                          <Image
                            src={`/${image}`}
                            alt={t(`process.steps.${key}.title`)}
                            width={560}
                            height={420}
                            className="h-auto w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className={`order-1 space-y-4 md:order-2 ${isEven ? "md:order-1 md:text-right" : ""}`}>
                        <div className="relative">
                          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${
                            key === "icp" ? "bg-orange" : key === "strategy" ? "bg-sky-blue" : "bg-navy"
                          }`}>
                            {index + 1}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${badgeColor}`}
                        >
                          {t(`process.steps.${key}.label`)}
                        </span>
                        <h3 className="text-3xl font-bold leading-snug text-navy sm:text-[2.25rem]">
                          {t(`process.steps.${key}.title`)}
                        </h3>
                        <p className="max-w-xl text-lg leading-relaxed text-gray-600 md:ml-auto md:max-w-none">
                          {renderHighlightedText(t(`process.steps.${key}.desc`))}
                        </p>
                        <Link
                          href="/pacchetti"
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-orange underline-offset-4 transition hover:underline"
                        >
                          Scopri di più
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </div>
                      <div className="pointer-events-none absolute inset-y-1/2 -z-10 flex -translate-y-1/2 text-[6rem] font-bold tracking-tight text-orange/10 sm:text-[7rem] md:text-[8rem]">
                        <span className={`${isEven ? "ml-auto" : ""}`}>{stepNumber}</span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </LayoutWrapper>
          </div>
        </section>
        <section className="relative bg-gradient-to-b from-white to-[#f5f9ff] py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center justify-center rounded-full border border-orange/40 bg-orange/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                  {t("packages.badge")}
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-tight text-navy sm:text-[2.5rem]">
                  {t("packages.title")}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">{t("packages.subtitle")}</p>
              </div>

              <div className="mt-16 space-y-16">
                {/* Setupfee - occupa tutta la larghezza */}
                <Card
                  className="relative flex h-full flex-col gap-10 rounded-3xl border border-orange/30 bg-white p-12 shadow-[0_20px_60px_-40px_rgba(255,148,51,0.6)] transition-all duration-500 hover:-translate-y-2 hover:border-orange hover:shadow-[0_30px_80px_-30px_rgba(255,148,51,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                  onClick={() => navigateTo("/pacchetti/set-up-fee")}
                  onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/set-up-fee")}
                  role="link"
                  tabIndex={0}
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-orange">
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange px-3 py-1 text-white shadow-sm">
                      <Target className="h-4 w-4" aria-hidden="true" />
                      {t("packages.setup.badge")}
                    </span>
                    <span className="rounded-full border border-orange/40 bg-orange/5 px-3 py-1 text-orange">
                      {t("packages.setup.revShare")}
                    </span>
                  </div>
                  <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8">
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">{t("packages.setup.title")}</h3>
                        <p className="text-base leading-relaxed text-gray-600 sm:text-lg lg:text-xl">
                          {t("packages.setup.desc")}
                        </p>
                      </div>
                      <Button
                        className="w-full rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-md transition duration-200 hover:scale-[1.02] hover:bg-orange/90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-orange"
                        onClick={handleContactClick}
                      >
                        {t("packages.setup.cta")}
                      </Button>
                    </div>
                    <div className="space-y-8 text-sm text-gray-700">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange">
                          {t("packages.setup.strategy")}
                        </p>
                        <ul className="mt-4 space-y-4">
                          {(["customStrategy", "dedicatedTeam", "automation"] as const).map((featureKey) => (
                            <li key={featureKey} className="flex items-start gap-3">
                              <span className="text-orange font-bold mt-0.5">•</span>
                              <span className="font-medium">{t(["packages", "setup", "features", featureKey].join("."))}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange">
                          {t("packages.setup.partnership")}
                        </p>
                        <ul className="mt-4 space-y-4">
                          {(["revenueShare", "priorityAccess", "advisoryBoard"] as const).map((featureKey) => (
                            <li key={featureKey} className="flex items-start gap-3">
                              <span className="text-orange font-bold mt-0.5">•</span>
                              <span className="font-medium">{t(["packages", "setup", "features", featureKey].join("."))}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Performance e Subscription - affiancati */}
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <Card
                    className="relative flex h-full flex-col gap-6 rounded-3xl border border-sky-blue/30 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(35,98,229,0.45)] transition-all duration-500 hover:-translate-y-2 hover:border-sky-blue hover:shadow-[0_30px_80px_-30px_rgba(35,98,229,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue"
                    onClick={() => navigateTo("/pacchetti/performance")}
                    onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/performance")}
                    role="link"
                    tabIndex={0}
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sky-blue">
                      <span className="inline-flex items-center gap-2 rounded-full bg-sky-blue px-3 py-1 text-white">
                        <Zap className="h-4 w-4" aria-hidden="true" />
                        {t("packages.performance.badge")}
                      </span>
                      <span className="rounded-full border border-sky-blue/40 bg-sky-blue/5 px-3 py-1 text-sky-blue">
                        {t("packages.performance.setup")}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-navy">{t("packages.performance.title")}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">{t("packages.performance.desc")}</p>
                    </div>
                    <div className="rounded-2xl border border-sky-blue/20 bg-white/80 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-blue">
                        {t("packages.performance.pricing.label")}
                      </p>
                      <p className="mt-2 text-sm text-gray-700">{t("packages.performance.pricing.desc")}</p>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {(["onboarding", "payPerResult", "reporting", "testing"] as const).map((featureKey) => (
                        <li key={featureKey} className="flex items-start gap-3">
                          <span className="text-sky-blue font-bold mt-0.5">•</span>
                          <span>{t(["packages", "performance", "features", featureKey].join("."))}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full rounded-full bg-sky-blue px-8 py-4 text-base font-semibold text-white shadow-md transition duration-200 hover:scale-[1.02] hover:bg-sky-blue/90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-sky-blue"
                      onClick={(event) => {
                        event.stopPropagation()
                        navigateTo("/pacchetti/performance")
                      }}
                    >
                      {t("packages.performance.cta")}
                    </Button>
                  </Card>
                  <Card
                    className="relative flex h-full flex-col gap-6 rounded-3xl border border-navy/20 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(11,29,74,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-navy hover:shadow-[0_30px_80px_-30px_rgba(11,29,74,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                    onClick={() => navigateTo("/pacchetti/subscription")}
                    onKeyDown={(event) => handleCardKeyDown(event, "/pacchetti/subscription")}
                    role="link"
                    tabIndex={0}
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-navy">
                      <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-white">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        {t("packages.subscription.badge")}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-navy">{t("packages.subscription.title")}</h3>
                      <p className="text-sm leading-relaxed text-gray-600">{t("packages.subscription.desc")}</p>
                    </div>
                    <div className="rounded-2xl border border-navy/20 bg-white/80 p-5 text-sm text-gray-700">
                      {t("packages.subscription.pricing")}
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {(["guaranteed", "manager", "meetings", "refund"] as const).map((featureKey) => (
                        <li key={featureKey} className="flex items-start gap-3">
                          <span className="text-navy font-bold mt-0.5">•</span>
                          <span>{t(["packages", "subscription", "features", featureKey].join("."))}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full rounded-full bg-navy px-8 py-4 text-base font-semibold text-white shadow-md transition duration-200 hover:scale-[1.02] hover:bg-navy/90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-navy"
                      onClick={(event) => {
                        event.stopPropagation()
                        navigateTo("/pacchetti/subscription")
                      }}
                    >
                      {t("packages.subscription.cta")}
                    </Button>
                  </Card>
                </div>
              </div>

              <div className="mt-12 text-center text-sm text-gray-600">
                {t("packages.trust")}
              </div>
            </LayoutWrapper>
          </div>
        </section>

        <DriveTestCalculator />

        <LeadsComparisonTable />

        <section className="relative bg-[#f6f9ff] py-28">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-10">
            <LayoutWrapper>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-4xl font-bold leading-tight text-navy sm:text-[2.5rem]">
                  {t("faq.title")}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">{t("faq.subtitle")}</p>
              </div>
              <div className="mt-12">
                <FAQAccordion items={faqItems} />
                <div className="mt-12 flex justify-center">
                  <Link href="/faq" className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-white font-semibold hover:bg-navy/90 transition">
                    {tFaq("cta.goToFaq")}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </LayoutWrapper>
          </div>
        </section>
      </main>
    </div>
  )
}
