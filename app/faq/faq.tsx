"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Link as LinkIcon,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Zap,
  Compass,
  Puzzle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageLayoutContainer } from "@/components/page-layout-container"
import { cn } from "@/lib/utils"

// Types
type FAQItem = {
  id: string
  question: string
  answer: React.ReactNode
  plainAnswer: string
  searchIndex: string
}

type Chapter = {
  id: string
  title: string
  emoji?: string
  icon?: React.ComponentType<{ className?: string }>
  customIcon?: string
  items: FAQItem[]
}

// Helper function to parse answer text into JSX
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()

const parseAnswer = (text: string) => {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null
  const plainParts: string[] = []
  let blockKey = 0

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListComponent = listType === 'ul' ? 'ul' : 'ol'
      const listClassName = listType === 'ul' ? 'list-disc pl-5 space-y-2' : 'list-decimal pl-5 space-y-2'
      elements.push(
        <ListComponent key={`list-${blockKey++}`} className={listClassName}>
          {currentList.map((item, index) => (
            <li key={`item-${index}`}>{item}</li>
          ))}
        </ListComponent>
      )
      plainParts.push(currentList.join(' '))
      currentList = []
      listType = null
    }
  }

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    if (!trimmedLine) return

    if (trimmedLine.startsWith('•')) {
      if (listType !== 'ul') {
        flushList()
        listType = 'ul'
      }
      currentList.push(trimmedLine.substring(1).trim())
    } else if (trimmedLine.match(/^\d+\./)) {
      if (listType !== 'ol') {
        flushList()
        listType = 'ol'
      }
      currentList.push(trimmedLine.substring(trimmedLine.indexOf('.') + 1).trim())
    } else {
      flushList()
      elements.push(
        <p key={`paragraph-${blockKey++}`} className="mb-2 text-gray-700">
          {trimmedLine}
        </p>
      )
      plainParts.push(trimmedLine)
    }
  })

  flushList()
  return {
    node: <div className="space-y-2">{elements}</div>,
    plain: plainParts.join(' '),
  }
}

// DATA — built from translations
const getChapters = (t: any): Chapter[] => [
  {
    id: "generali",
    title: t("chapters.generali"),
    emoji: "📚",
    icon: HelpCircle,
    customIcon: "/iconaMessaggio.png",
    items: t.raw("generali.items").map((item: any, index: number) => {
      const parsed = parseAnswer(item.answer)
      const searchSource = `${item.question} ${parsed.plain}`
      return {
        id: `generali-${index}`,
        question: item.question,
        answer: parsed.node,
        plainAnswer: parsed.plain,
        searchIndex: normalize(searchSource),
      }
    })
  },
  {
    id: "performance",
    title: t("chapters.performance"),
    emoji: "⚡",
    icon: Zap,
    customIcon: "/iconaPerformance.png",
    items: t.raw("performance.items").map((item: any, index: number) => {
      const parsed = parseAnswer(item.answer)
      const searchSource = `${item.question} ${parsed.plain}`
      return {
        id: `performance-${index}`,
        question: item.question,
        answer: parsed.node,
        plainAnswer: parsed.plain,
        searchIndex: normalize(searchSource),
      }
    })
  },
  {
    id: "setup-fee",
    title: t("chapters.setup-fee"),
    emoji: "🧭",
    icon: Compass,
    customIcon: "/iconaSetupfee.png",
    items: t.raw("setupFee.items").map((item: any, index: number) => {
      const parsed = parseAnswer(item.answer)
      const searchSource = `${item.question} ${parsed.plain}`
      return {
        id: `setup-fee-${index}`,
        question: item.question,
        answer: parsed.node,
        plainAnswer: parsed.plain,
        searchIndex: normalize(searchSource),
      }
    })
  },
  {
    id: "subscription",
    title: t("chapters.subscription"),
    emoji: "🧩",
    icon: Puzzle,
    customIcon: "/iconaSubscr.png",
    items: t.raw("subscription.items").map((item: any, index: number) => {
      const parsed = parseAnswer(item.answer)
      const searchSource = `${item.question} ${parsed.plain}`
      return {
        id: `subscription-${index}`,
        question: item.question,
        answer: parsed.node,
        plainAnswer: parsed.plain,
        searchIndex: normalize(searchSource),
      }
    })
  }
]

export default function FAQMasterbookPage() {
  const t = useTranslations("faq")
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({})
  const searchRef = useRef<HTMLInputElement | null>(null)

  const chapters = useMemo(() => getChapters(t), [t])
  const categoryDescriptions = useMemo(
    () => (t.raw("categoryDescriptions") as Record<string, string>) ?? {},
    [t]
  )
  const popularTags = useMemo(
    () => (t.raw("search.tags") as { id: string; label: string }[]) ?? [],
    [t]
  )

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aycl-faq-bookmarks")
      if (saved) setBookmarks(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("aycl-faq-bookmarks", JSON.stringify(bookmarks))
    } catch {}
  }, [bookmarks])

  const allItems = useMemo(
    () =>
      chapters.flatMap((c) =>
        c.items.map((it) => ({ ...it, chapter: c.id }))
      ),
    [chapters]
  )

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query)
    return allItems.filter((it) => {
      const inChapter = !activeChapter || activeChapter === (it as any).chapter
      if (!inChapter) return false
      if (!normalizedQuery) return true
      return it.searchIndex.includes(normalizedQuery)
    })
  }, [allItems, query, activeChapter])

  const grouped = useMemo(() => {
    const map: Record<string, FAQItem[]> = {}
    for (const it of filtered) {
      const ch = (it as any).chapter as string
      map[ch] ??= []
      map[ch].push(it)
    }
    return map
  }, [filtered])

  const toggleAll = useCallback((val: boolean) => {
    const next: Record<string, boolean> = {}
    filtered.forEach((it) => (next[it.id] = val))
    setExpanded(next)
  }, [filtered])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement as HTMLElement | null)?.isContentEditable
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if ((e.key === 'e' || e.key === 'E') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleAll(true)
      }
      if ((e.key === 'c' || e.key === 'C') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleAll(false)
      }
      if (e.key === 'Escape') {
        setQuery('')
        toggleAll(false)
        setActiveChapter(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleAll])

  const toggleOne = (id: string) =>
    setExpanded((p) => ({ ...p, [id]: !p[id] }))

  const isOpen = (id: string) => !!expanded[id]

  const copyLink = async (id: string) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`
      await navigator.clipboard.writeText(url)
      alert(t("copy.copied"))
    } catch {}
  }

  const toggleBookmark = (id: string) =>
    setBookmarks((b) => ({ ...b, [id]: !b[id] }))

  const resetFilters = () => {
    setActiveChapter(null)
    setQuery("")
    setExpanded({})
  }

  return (
    <div className="min-h-screen bg-white">
      <PageLayoutContainer className="space-y-18 px-4 pb-14 pt-24 sm:space-y-22 sm:px-6 sm:pb-16 sm:pt-28 md:pb-18 md:space-y-24 lg:space-y-24 lg:px-8 lg:pb-20 lg:pt-32">
        <section className="mx-auto max-w-4xl space-y-8 text-center sm:space-y-10 motion-safe:animate-fade-in-up-soft">
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <h1 className="text-3xl font-semibold text-navy tracking-tight sm:text-4xl">
              {t("header.title")}
            </h1>
            <p className="text-base text-gray-600 sm:text-lg">
              {t("header.subtitle")}
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <label className="sr-only" htmlFor="faq-search">
              {t("search.placeholder")}
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 sm:px-5 sm:py-4">
              <Search className="w-5 h-5 text-orange" />
              <input
                id="faq-search"
                ref={searchRef}
                value={query}
                onChange={(e) => {
                  const value = e.target.value
                  setQuery(value)
                  if (value.trim()) {
                    setActiveChapter(null)
                    setExpanded({})
                  }
                }}
                placeholder={t("search.placeholder")}
                className="w-full border-0 bg-transparent text-base text-navy placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {popularTags.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10 sm:gap-3">
              {popularTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => {
                    setActiveChapter(tag.id)
                    setQuery("")
                    setExpanded({})
                  }}
                  className={`px-4 py-1.5 text-sm rounded-full border transition ${
                    activeChapter === tag.id
                      ? "border-orange bg-orange text-white"
                      : "border-gray-200 bg-white text-navy hover:border-orange/60"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-8 sm:space-y-9 md:space-y-8">
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-2 md:mt-0 md:flex-nowrap md:gap-5 md:pb-3 motion-safe:animate-fade-in-soft">
            <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
              {!activeChapter && !query ? null : (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-full border border-orange/50 bg-orange/10 px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-orange transition hover:bg-orange/15 sm:px-4 sm:text-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t("tabs.all")}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 sm:gap-3 sm:pt-1">
              <Sparkles className="w-4 h-4 text-orange" />
              <span>
                {filtered.length} {t("controls.results")}
              </span>
            </div>
          </div>

          {!query && !activeChapter && (
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-6 motion-safe:animate-fade-in-up-soft">
              {chapters.map((chapter) => {
                const IconComponent = chapter.icon
                return (
                  <button
                    key={chapter.id}
                    onClick={() => {
                      setActiveChapter(chapter.id)
                      setQuery("")
                      setExpanded({})
                    }}
                    className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-orange/50 hover:shadow-sm sm:p-6 xl:p-7 motion-safe:focus-visible:translate-y-[-2px]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange/10 text-orange sm:h-12 sm:w-12 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-105">
                      {chapter.customIcon ? (
                        <img src={chapter.customIcon} alt={chapter.title} className="h-5 w-5" />
                      ) : IconComponent ? (
                        <IconComponent className="h-5 w-5" />
                      ) : (
                        <span className="text-lg">{chapter.emoji}</span>
                      )}
                    </span>
                    <div className="space-y-1.5 sm:space-y-2">
                      <h2 className="text-lg font-semibold text-navy">{chapter.title}</h2>
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                        {categoryDescriptions?.[chapter.id] ?? ""}
                      </p>
                    </div>
                    <span className="mt-auto text-sm font-medium text-orange">
                      {chapter.items.length} {t("controls.results")}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        <section className="space-y-8 md:space-y-10">
          {(query || activeChapter) && (
            <div className="flex flex-col gap-5 md:gap-6 motion-safe:animate-fade-in-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 motion-safe:animate-fade-in-soft">
                <div className="space-y-2.5 sm:space-y-3">
                  <h2 className="text-2xl font-semibold text-navy md:text-3xl">
                    {activeChapter
                      ? chapters.find((c) => c.id === activeChapter)?.title
                      : t("results.heading")}
                  </h2>
                  <p className="max-w-2xl text-sm text-gray-600 sm:text-base">
                    {activeChapter
                      ? categoryDescriptions?.[activeChapter] ?? ""
                      : t("results.description")}
                  </p>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    {filtered.length} {t("controls.results")}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" onClick={() => toggleAll(true)}>
                    {t("controls.expand")}
                  </Button>
                  <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" onClick={() => toggleAll(false)}>
                    {t("controls.collapse")}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange text-orange hover:bg-orange/5"
                    onClick={resetFilters}
                  >
                    {t("controls.reset")}
                  </Button>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
                  {t("noResultsChapter")}
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-5 motion-safe:animate-fade-in-soft">
                  {Object.entries(grouped).map(([chapterId, items]) => (
                    <div key={chapterId} className="space-y-2.5 sm:space-y-3">
                      {!activeChapter && (
                        <div className="text-sm font-medium text-navy">
                          {chapters.find((c) => c.id === chapterId)?.title}
                        </div>
                      )}
                      <div className="space-y-2.5 sm:space-y-3">
                        {items.map((item) => (
                          <article key={item.id} id={item.id} className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
                            <header>
                              <button
                                onClick={() => toggleOne(item.id)}
                                className="flex w-full items-start justify-between gap-4 text-left"
                              >
                                <h3 className="text-base font-semibold text-navy leading-snug">
                                  {item.question}
                                </h3>
                                <ChevronDown
                                  className={`h-5 w-5 text-gray-400 transition-transform ${
                                    isOpen(item.id) ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            </header>

                            <div className={`overflow-hidden text-sm text-gray-700 transition-all ${
                              isOpen(item.id) ? "mt-3 max-h-[2000px] sm:mt-4" : "max-h-0"
                            }`}>
                              <div className="prose prose-sm max-w-none text-gray-700">
                                {item.answer}
                              </div>
                              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:gap-2.5">
                                <button
                                  onClick={() => toggleBookmark(item.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-gray-600 hover:border-orange/60 sm:px-3.5"
                                  aria-label={t("aria.save")}
                                >
                                  {bookmarks[item.id] ? (
                                    <>
                                      <BookmarkCheck className="h-4 w-4 text-orange" />
                                      {t("savedSingle")}
                                    </>
                                  ) : (
                                    <>
                                      <Bookmark className="h-4 w-4 text-gray-400" />
                                      {t("save")}
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => copyLink(item.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-gray-600 hover:border-orange/60 sm:px-3.5"
                                  aria-label={t("aria.copyLink")}
                                >
                                  <LinkIcon className="h-4 w-4" /> {t("copy.button")}
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mt-12 rounded-xl border border-gray-100 bg-white px-4 py-5 sm:mt-16 sm:px-5 sm:py-6 md:mt-20 md:px-6 md:py-7 lg:px-7 lg:py-8 motion-safe:animate-fade-in-soft">
          <div className="flex flex-col gap-3.5 sm:gap-4 md:flex-row md:items-center md:justify-between md:gap-7">
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-lg font-semibold text-navy sm:text-xl md:text-[1.4rem]">{t("consult.title")}</h3>
              <p className="text-sm text-gray-600 sm:text-base">{t("consult.subtitle")}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t("consult.body")}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
              <Button
                size="sm"
                className="bg-orange text-white hover:bg-orange/90"
                onClick={() => router.push('/contattaci')}
              >
                {t("consult.ctaPrimary")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-navy text-navy hover:bg-navy/5"
                onClick={() => router.push('/pacchetti')}
              >
                {t("consult.ctaSecondary")}
              </Button>
            </div>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: chapters.flatMap(ch => ch.items).map(it => ({
              '@type': 'Question',
              name: it.question,
              acceptedAnswer: { '@type': 'Answer', text: it.plainAnswer }
            }))
          }) }}
        />
      </PageLayoutContainer>
    </div>
  )
}
