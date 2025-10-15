"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  BookOpen,
  ListTree,
  Filter,
  Bookmark,
  BookmarkCheck,
  Link as LinkIcon,
  ChevronDown,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Zap,
  Compass,
  Puzzle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageLayoutContainer } from "@/components/page-layout-container"

/**
 * FAQ Masterbook Page
 * - Visual design aligned to Home:
 *   - Colors: text-navy, text-orange, text-sky-blue; gradient accents (navy → sky-blue → orange)
 *   - Geometric soft backgrounds, blurred circles, gradient top rule
 *   - Rounded-2xl/3xl cards with gradient borders like homepage metric/benefit cards
 * - Interactions:
 *   - Full‑text search, chapter filters, expand/collapse, deep links (#faq-id), bookmarks (localStorage)
 *   - Sticky chapter sidebar, scroll progress, back‑to‑top, CTA card
 */

// Helper — gradient frame wrapper like homepage "metric" cards
function GradientFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-[2px] bg-[linear-gradient(90deg,var(--navy),var(--sky-blue),var(--orange))]">
      <Card className="rounded-[1rem] border-0 shadow-none bg-white/95 backdrop-blur-sm">
        {children}
      </Card>
    </div>
  )
}

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

// Utility to slugify ids
const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

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
  const [activeChapter, setActiveChapter] = useState<string>("all")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [openAll, setOpenAll] = useState(false)
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [progress, setProgress] = useState(0)

  // Get chapters from translations
  const chapters = getChapters(t)

  // Load bookmarks from localStorage
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

  // Handle hash deep links
  useEffect(() => {
    if (typeof window === "undefined") return
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      setExpanded((prev) => ({ ...prev, [hash]: true }))
      // slight delay to ensure DOM painted
      setTimeout(() => {
        const el = document.getElementById(hash)
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 80)
    }
  }, [])

  // Scroll progress
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      const p = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100))
      setProgress(p)
    }
    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  // Keyboard shortcuts: \/ to focus search, Ctrl/Cmd+E expand all, Ctrl/Cmd+C collapse, ESC reset
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
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const allItems = useMemo(() => chapters.flatMap((c) => c.items.map((it) => ({ ...it, chapter: c.id }))), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allItems.filter((it) => {
      const inChapter = activeChapter === "all" || activeChapter === (it as any).chapter
      if (!inChapter) return false
      if (!q) return true
      const text = `${it.question}`.toLowerCase()
      // crude string for answer
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

  const toggleAll = (val: boolean) => {
    setOpenAll(val)
    const next: Record<string, boolean> = {}
    filtered.forEach((it) => (next[it.id] = val))
    setExpanded(next)
  }

  const toggleOne = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }))
  const isOpen = (id: string) => !!expanded[id] || openAll

  const copyLink = async (id: string) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`
      await navigator.clipboard.writeText(url)
      alert("Link copiato negli appunti ✅")
    } catch {
      // fallback
    }
  }

  const toggleBookmark = (id: string) => setBookmarks((b) => ({ ...b, [id]: !b[id] }))

  const chapterTabs = [
    { id: "all", title: t("tabs.all") },
    ...chapters.map((c) => ({ id: c.id, title: c.title })),
  ]

  return (
    <div className="min-h-screen bg-white relative">

      {/* Decorative accents */}
      <div className="absolute top-16 right-10 w-32 h-32 bg-orange/10 rounded-full blur-3xl" />
      <div className="absolute top-40 left-10 w-28 h-28 bg-sky-blue/10 rounded-full blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-navy via-sky-blue to-orange" />

      <PageLayoutContainer className="px-6 pt-28 pb-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
              <BookOpen className="w-4 h-4 text-navy" />
              <span className="text-sm font-medium text-gray-700">{t("header.badge")}</span>
            </div>
            <h1 className="text-4xl lg:text-4xl font-bold text-navy leading-tight text-balance">
              {t.rich("header.title", {
                strong: (chunks) => <span className="text-orange">{chunks}</span>,
              })}
            </h1>
            <p className="text-gray-600 max-w-2xl">{t("header.subtitle")}</p>
          </div>

          <div className="w-full lg:w-auto">
              <div className="p-4 flex items-center gap-3">
                <Search className="w-5 h-5 text-navy" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("search.placeholder")}
                  className="w-full lg:w-96 outline-none bg-transparent text-sm placeholder:text-gray-400"
                />
              </div>
          </div>
        </div>

        {/* Consultant Section */}
        <div className="mb-12">
          <GradientFrame>
            <div className="p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy">{t("consult.title")}</h3>
                      <p className="text-gray-600">{t("consult.subtitle")}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{t("consult.body")}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-orange hover:bg-orange/90 text-white px-6 py-3"
                      onClick={() => router.push('/contattaci')}
                    >
                      {t("consult.ctaPrimary")}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-navy text-navy hover:bg-navy/5 px-6 py-3"
                      onClick={() => router.push('/pacchetti')}
                    >
                      {t("consult.ctaSecondary")}
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange/20 to-sky-blue/20 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </GradientFrame>
        </div>

        {/* Tabs / Chapter filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {chapterTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveChapter(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeChapter === t.id
                  ? "bg-orange text-white border-orange"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-navy/5"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {t.id !== "all" && (() => {
                  const chapter = chapters.find((c) => c.id === t.id)
                  if (chapter?.customIcon) {
                    return <img src={chapter.customIcon} alt={chapter.title} className="w-4 h-4" />
                  }
                  const IconComponent = chapter?.icon
                  return IconComponent ? <IconComponent className="w-4 h-4" /> : <span>{chapter?.emoji}</span>
                })()}
                {t.title}
              </span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" onClick={() => toggleAll(true)}>
            <ListTree className="w-4 h-4 mr-2" /> {t("controls.expand")}
          </Button>
          <Button variant="outline" className="border-navy text-navy hover:bg-navy/5" onClick={() => toggleAll(false)}>
            <Filter className="w-4 h-4 mr-2" /> {t("controls.collapse")}
          </Button>
          <Button
            variant="outline"
            className="border-orange text-orange hover:bg-orange/5"
            onClick={() => {
              setActiveChapter("all")
              setQuery("")
              toggleAll(false)
              containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            {t("controls.reset")}
          </Button>
          <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-4 h-4" /> {filtered.length} {t("controls.results")}
          </div>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-4 sticky top-24 self-start h-fit">
            <Card className="p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">{t("sidebar.chapters")}</div>
              <nav className="space-y-1">
                {chapters.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveChapter(c.id)
                      document.getElementById(`chapter-${c.id}`)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition ${
                      activeChapter === c.id ? "bg-sky-blue/10 text-navy" : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {c.customIcon ? (
                      <img src={c.customIcon} alt={c.title} className="w-5 h-5" />
                    ) : c.icon ? (
                      <c.icon className="w-5 h-5" />
                    ) : (
                      <span className="text-lg">{c.emoji}</span>
                    )}
                    <span className="font-medium">{c.title}</span>
                  </button>
                ))}
              </nav>
            </Card>


            {Object.keys(bookmarks).some((k) => bookmarks[k]) && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookmarkCheck className="w-4 h-4 text-orange" />
                  <div className="text-sm font-semibold text-navy">{t("sidebar.saved")}</div>
                </div>
                <ul className="space-y-2 text-sm">
                  {allItems
                    .filter((it) => bookmarks[it.id])
                    .slice(0, 7)
                    .map((it) => (
                      <li key={it.id}>
                        <button
                          onClick={() => {
                            setExpanded((p) => ({ ...p, [it.id]: true }))
                            document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }}
                          className="text-navy hover:underline"
                        >
                          {it.question}
                        </button>
                      </li>
                    ))}
                </ul>
              </Card>
            )}
          </aside>

          {/* Content */}
          <section
            ref={containerRef}
            className="lg:col-span-9 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-100 p-1"
          >
            {/* progress bar */}
            <div
              className="sticky top-0 h-1 bg-gradient-to-r from-orange via-sky-blue to-navy z-10"
              style={{ width: `${progress}%` }}
            />

            <div className="p-4 lg:p-6 space-y-10">
              {chapters.map((chapter) => (
                <div key={chapter.id} id={`chapter-${chapter.id}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1">
                      {chapter.customIcon ? (
                        <img src={chapter.customIcon} alt={chapter.title} className="w-6 h-6" />
                      ) : chapter.icon ? (
                        <chapter.icon className="w-6 h-6" />
                      ) : (
                        <span className="text-lg">{chapter.emoji}</span>
                      )}
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {chapter.title}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-navy/30 via-sky-blue/30 to-orange/30" />
                  </div>

                  <div className="space-y-3">
                    {grouped[chapter.id]?.map((item) => (
                      <GradientFrame key={item.id}>
                        <article id={item.id} className="p-4 lg:p-5">
                          <header>
                            <button
                              onClick={() => toggleOne(item.id)}
                              className="w-full flex items-start justify-between gap-4 text-left"
                            >
                              <h3 className="text-base lg:text-lg font-semibold text-navy leading-snug">
                                {item.question}
                              </h3>
                              <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform ${
                                  isOpen(item.id) ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          </header>

                          <div className={`mt-3 overflow-hidden transition-all ${isOpen(item.id) ? "max-h-[1000px]" : "max-h-0"}`}>
                            <div className="prose prose-sm max-w-none text-gray-700">
                              {item.answer}
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                              <button
                                onClick={() => toggleBookmark(item.id)}
                                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                                aria-label="Salva nei preferiti"
                              >
                                {bookmarks[item.id] ? (
                                  <>
                                    <BookmarkCheck className="w-4 h-4 text-orange" />
                                    Salvato
                                  </>
                                ) : (
                                  <>
                                    <Bookmark className="w-4 h-4 text-gray-400" />
                                    Salva
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => copyLink(item.id)}
                                className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                                aria-label={t("aria.copyLink")}
                              >
                                <LinkIcon className="w-4 h-4" /> {t("copy.button")}
                              </button>
                            </div>
                          </div>
                        </article>
                      </GradientFrame>
                    ))}

                    {!grouped[chapter.id] && activeChapter !== "all" && (
                      <div className="text-sm text-gray-500 py-8">{t("noResultsChapter")}</div>
                    )}
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* Back to top - Positioned below the FAQ container */}
          <div className="lg:col-span-9 flex justify-end mt-4">
            <Button
              variant="outline"
              className="border-navy text-navy hover:bg-navy/5"
              onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="w-4 h-4 mr-2" /> {t("backToTop")}
            </Button>
          </div>
        </div>
      

      {/* JSON‑LD FAQ schema */}
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
