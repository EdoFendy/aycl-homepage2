"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  Home as HomeIcon,
  MessageSquareText,
  BadgePercent,
  Rocket,
  Layers,
  CreditCard,
  HelpCircle,
  Gauge,
  ArrowRight,
} from "lucide-react"

const BORDER_DARK = "border-[#0B1D3A]" // blu più scuro per i bordi

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslations("siteHeader")

  const navItems = [
    {
      href: "/",
      label: t("rightCol.home"),
      caption: t("rightCol.open"),
      icon: "/iconaHome.png",
      alt: t("alt.home"),
    },
    {
      href: "/pacchetti",
      label: t("rightCol.packages"),
      caption: t("rightCol.packagesCta"),
      icon: "/iconaPrice.png",
      alt: t("alt.packages"),
    },
    {
      href: "/outreach",
      label: t("rightCol.outreach"),
      caption: t("rightCol.outreachCta"),
      icon: "/IconaStrategia.png",
      alt: t("alt.outreach"),
    },
    {
      href: "/contattaci",
      label: t("rightCol.contact"),
      caption: t("rightCol.contactCta"),
      icon: "/iconaContact.png",
      alt: t("alt.contact"),
    },
    {
      href: "/faq",
      label: t("rightCol.faq"),
      caption: t("rightCol.faqCta"),
      icon: "/iconaFaq.png",
      alt: t("nav.faq"),
    },
  ]

  const packageItems = [
    {
      href: "/pacchetti/set-up-fee",
      icon: "/iconaSetupfee.png",
      alt: t("alt.setup"),
      title: t("mega.card.setup.title"),
      desc: t("mega.card.setup.desc"),
    },
    {
      href: "/pacchetti/subscription",
      icon: "/iconaSubscr.png",
      alt: t("alt.subscription"),
      title: t("mega.card.subscription.title"),
      desc: t("mega.card.subscription.desc"),
    },
    {
      href: "/pacchetti/performance",
      icon: "/iconaPerformance.png",
      alt: t("alt.performance"),
      title: t("mega.card.performance.title"),
      desc: t("mega.card.performance.desc"),
    },
    {
      href: "/pacchetti/drive-test",
      icon: "/DriveTest_icon.png",
      alt: t("alt.driveTest"),
      title: t("mega.card.driveTest.title"),
      desc: t("mega.card.driveTest.desc"),
    },
  ]

  if (pathname?.startsWith("/admin")) {
    return null
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  // Chiudi al click fuori / Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) {
        setOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onEsc)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onEsc)
    }
  }, [open])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#0B1D3A1A] bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        {/* NAVBAR ROW */}
        <div className="grid grid-cols-3 items-center py-2 sm:py-4">
          {/* SINISTRA: pulsante 9 quadratini */}
          <div className="flex items-center">
            <button
              ref={btnRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-lg border bg-white/80 px-2 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-blue/40 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm",
              
              )}
            >
              {/* icona menu */}
              <Image 
                src="/newmedia/menu_icon.png" 
                alt="Menu" 
                width={20} 
                height={20} 
                className="h-4 w-4 sm:h-5 sm:w-5 transition group-hover:opacity-80"
              />
            </button>
          </div>

          {/* CENTRO: logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt="All You Can Leads"
                width={36}
                height={36}
                className="sm:w-11 sm:h-11"
                priority
              />
       
            </Link>
          </div>

          {/* DESTRA: CTA */}
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <LanguageSwitcher />

            <Link
              href="/contattaci"
              className={cn(
                "hidden sm:inline arrow-slide-hover rounded-full bg-orange px-5 py-2.5 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(255,148,51,0.25)] transition-transform duration-200 ease-out hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange sm:text-sm"
              )}
            >
              {t("nav.contactNow")}
            </Link>

          </div>
        </div>

        {/* MEGA MENU – ora su mobile scorre VERTICALE, non orizzontale */}
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Navigazione principale"
          className={cn(
            "pointer-events-none absolute left-1 right-1 top-[56px] mx-auto max-w-7xl transition-opacity duration-150 sm:left-2 sm:right-2 sm:top-[72px]",
            open ? "pointer-events-auto opacity-100" : "opacity-0",
          )}
        >
          <div
            className={cn(
              "rounded-3xl bg-white/95 p-[2px] shadow-[0_24px_64px_-20px_rgba(10,27,58,.22)] backdrop-blur",
              BORDER_DARK,
            )}
          >
            <div className="rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-white via-sky-blue/10 to-white p-3 sm:p-4">
              <div className="flex flex-wrap items-stretch justify-between gap-2 sm:gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex min-w-[120px] flex-1 items-center gap-3 rounded-xl border border-transparent bg-white/70 px-3 py-1.5 transition hover:-translate-y-0.5 hover:border-navy/15 hover:bg-[#f6f9ff] sm:flex-[1_1_18%] sm:px-3.5 sm:py-2",
                      isActive(item.href) && "border-navy/20 bg-[#f6f9ff]",
                    )}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 sm:h-10 sm:w-10">
                      <Image src={item.icon} alt={item.alt} width={32} height={32} className="h-5 w-5 object-contain" />
                    </div>
                    <div className="flex min-w-0 flex-col items-center justify-center text-center">
                      <div className="flex w-full flex-col items-center justify-center text-center sm:min-h-[54px] sm:overflow-hidden">
                        <p className="text-sm font-semibold text-navy sm:text-[15px] transition-transform duration-200 ease-out sm:leading-tight sm:group-hover:-translate-y-[3px] sm:group-focus-visible:-translate-y-[3px] text-clamp-1">
                          {item.label}
                        </p>
                        <p className="hidden max-h-0 overflow-hidden text-[10px] uppercase tracking-[0.18em] text-gray-500 opacity-0 transition-all duration-200 ease-out sm:block sm:leading-[1.15] sm:group-hover:mt-0.5 sm:group-hover:max-h-9 sm:group-hover:opacity-70 sm:group-focus-visible:mt-0.5 sm:group-focus-visible:max-h-9 sm:group-focus-visible:opacity-70 text-clamp-2">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] sm:gap-4">
                <div className="sm:min-w-0">
                  <div className="rounded-2xl border border-navy/10 bg-white p-3 sm:p-4">
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-600 sm:mb-4">
                      <Image
                        src="/iconaPrice.png"
                        alt={t("alt.packages")}
                        width={28}
                        height={28}
                        className="inline-block align-top object-contain flex-shrink-0"
                      />
                      {t("mega.title.packages")}
                    </p>

                    <div className="space-y-2 sm:space-y-3">
                      {packageItems.map((pack) => (
                        <Link
                          key={pack.href}
                          href={pack.href}
                          onClick={() => setOpen(false)}
                          aria-label={pack.title}
                          className="group flex items-center gap-2.5 rounded-lg border border-navy/10 bg-white/75 px-3 py-2 sm:py-2.5 transition hover:-translate-y-0.5 hover:border-navy/20 hover:bg-[#f6f9ff]"
                        >
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-navy/5 sm:h-10 sm:w-10">
                            <Image src={pack.icon} alt={pack.alt} width={48} height={48} className="h-6 w-6 object-contain sm:h-[26px] sm:w-[26px]" />
                          </div>
                          <div className="flex min-w-0 flex-col items-center justify-center text-center sm:items-start sm:text-left">
                            <p className="text-sm font-semibold text-navy transition-all duration-200 ease-out sm:text-[15px] sm:leading-tight sm:group-hover:-translate-y-2 text-clamp-1">
                              {pack.title}
                            </p>
                            <p className="max-h-0 overflow-hidden text-xs text-gray-600 opacity-0 transition-all duration-200 ease-out sm:text-[13px] sm:leading-snug sm:group-hover:mt-0.5 sm:group-hover:max-h-[2.4rem] sm:group-hover:opacity-70 text-clamp-2">
                              {pack.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:min-w-0">
                  <div className="flex h-full items-center justify-center">
                    <Image 
                      src="/newmedia/Nav_Image.png" 
                      alt="All You Can Leads" 
                      width={330} 
                      height={330} 
                      className="max-w-[330px] h-auto object-contain"
                    />
                  </div>
                </div>

              </div>

              {/* bordo inferiore accentuato */}
              <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-navy via-sky-blue to-orange" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
