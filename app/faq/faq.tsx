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

// Types
type FAQItem = {
  id: string
  question: string
  answer: React.ReactNode
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
const parseAnswer = (text: string) => {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let listType: 'ul' | 'ol' | null = null

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      const ListComponent = listType === 'ul' ? 'ul' : 'ol'
      const listClassName = listType === 'ul' ? 'list-disc pl-5 space-y-2' : 'list-decimal pl-5 space-y-2'
      elements.push(
        <ListComponent key={elements.length} className={listClassName}>
          {currentList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ListComponent>
      )
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
        <p key={index} className="mb-2 text-gray-700">
          {trimmedLine}
        </p>
      )
    }
  })

  flushList()
  return <div className="space-y-2">{elements}</div>
}

// DATA — built from translations
const getChapters = (t: any): Chapter[] => [
  {
    id: "generali",
    title: t("chapters.generali"),
    emoji: "📚",
    icon: HelpCircle,
    customIcon: "/iconaMessaggio.png",
    items: t.raw("generali.items").map((item: any, index: number) => ({
      id: `generali-${index}`,
      question: item.question,
      answer: parseAnswer(item.answer)
    }))
  },
  {
    id: "performance",
    title: t("chapters.performance"),
    emoji: "⚡",
    icon: Zap,
    customIcon: "/iconaPerformance.png",
    items: t.raw("performance.items").map((item: any, index: number) => ({
      id: `performance-${index}`,
      question: item.question,
      answer: parseAnswer(item.answer)
    }))
  },
  {
    id: "setup-fee",
    title: t("chapters.setup-fee"),
    emoji: "🧭",
    icon: Compass,
    customIcon: "/iconaSetupfee.png",
    items: t.raw("setupFee.items").map((item: any, index: number) => ({
      id: `setup-fee-${index}`,
      question: item.question,
      answer: parseAnswer(item.answer)
    }))
  },
  {
    id: "subscription",
    title: t("chapters.subscription"),
    emoji: "🧩",
    icon: Puzzle,
    customIcon: "/iconaSubscr.png",
    items: t.raw("subscription.items").map((item: any, index: number) => ({
      id: `subscription-${index}`,
      question: item.question,
      answer: parseAnswer(item.answer)
    }))
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
    const q = query.trim().toLowerCase()
    return allItems.filter((it) => {
      const inChapter = !activeChapter || activeChapter === (it as any).chapter
      if (!inChapter) return false
      if (!q) return true
      const text = `${it.question}`.toLowerCase()
      const answerStr = (typeof it.answer === "string" ? it.answer : (it.answer as any)?.props?.children)
      const str = `${text} ${JSON.stringify(answerStr)}`.toLowerCase()
      return str.includes(q)
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
      <PageLayoutContainer className="px-6 py-16 space-y-16">
        <section className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold text-navy tracking-tight">
              {t("header.title")}
            </h1>
            <p className="text-base text-gray-600">
              {t("header.subtitle")}
            </p>
          </div>

          <div className="w-full max-w-2xl mx-auto">
            <label className="sr-only" htmlFor="faq-search">
              {t("search.placeholder")}
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20">
              <Search className="w-5 h-5 text-orange" />
              <input
                id="faq-search"
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="w-full border-0 bg-transparent text-base text-navy placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {popularTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
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

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveChapter(null)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                  !activeChapter
                    ? "border-orange bg-orange text-white"
                    : "border-gray-200 text-navy hover:border-orange/60"
                }`}
              >
                {t("tabs.all")}
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4 text-orange" />
              <span>
                {filtered.length} {t("controls.results")}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {chapters.map((chapter) => {
              const Icon = chapter.icon
              const isActive = activeChapter === chapter.id
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapter(chapter.id)
                    setQuery("")
                    setExpanded({})
                  }}
                  className={`group flex h-full flex-col items-start gap-3 rounded-2xl border bg-white p-6 text-left transition hover:border-orange/50 hover:shadow-sm ${
                    isActive ? "border-orange shadow-sm" : "border-gray-200"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 text-orange">
                    {chapter.customIcon ? (
                      <img src={chapter.customIcon} alt={chapter.title} className="h-5 w-5" />
                    ) : Icon ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <span className="text-lg">{chapter.emoji}</span>
                    )}
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-navy">{chapter.title}</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
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
        </section>

        <section className="space-y-8">
          {(query || activeChapter) && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-navy">
                    {activeChapter
                      ? chapters.find((c) => c.id === activeChapter)?.title
                      : t("results.heading")}
                  </h2>
                  <p className="text-sm text-gray-600 max-w-2xl">
                    {activeChapter
                      ? categoryDescriptions?.[activeChapter] ?? ""
                      : t("results.description")}
                  </p>
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    {filtered.length} {t("controls.results")}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
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
                <div className="space-y-4">
                  {Object.entries(grouped).map(([chapterId, items]) => (
                    <div key={chapterId} className="space-y-3">
                      {!activeChapter && (
                        <div className="text-sm font-medium text-navy">
                          {chapters.find((c) => c.id === chapterId)?.title}
                        </div>
                      )}
                      <div className="space-y-3">
                        {items.map((item) => (
                          <article key={item.id} id={item.id} className="rounded-2xl border border-gray-200 bg-white p-5">
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
                              isOpen(item.id) ? "mt-4 max-h-[2000px]" : "max-h-0"
                            }`}>
                              <div className="prose prose-sm max-w-none text-gray-700">
                                {item.answer}
                              </div>
                              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                                <button
                                  onClick={() => toggleBookmark(item.id)}
                                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-gray-600 hover:border-orange/60"
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
                                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-gray-600 hover:border-orange/60"
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

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-navy">{t("consult.title")}</h3>
              <p className="text-gray-600">{t("consult.subtitle")}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t("consult.body")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="bg-orange text-white hover:bg-orange/90"
                onClick={() => router.push('/contattaci')}
              >
                {t("consult.ctaPrimary")}
              </Button>
              <Button
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
              acceptedAnswer: { '@type': 'Answer', text: (() => {
                const toText = (n: any): string => {
                  if (n == null) return ''
                  if (typeof n === 'string' || typeof n === 'number') return String(n)
                  if (Array.isArray(n)) return n.map(toText).join(' ')
                  if (typeof n === 'object' && 'props' in n) return toText((n as any).props?.children)
                  return ''
                }
                return toText((it as any).answer)
              })() }
            }))
          }) }}
        />
      </PageLayoutContainer>
    </div>
  )
}
