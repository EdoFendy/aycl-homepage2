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
} from "lucide-react"

const BORDER_DARK = "border-[#0B1D3A]" // blu più scuro per i bordi

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslations("siteHeader")

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
      <div className="container mx-auto px-3 sm:px-6">
        {/* NAVBAR ROW */}
        <div className="grid grid-cols-3 items-center py-2 sm:py-4">
          {/* SINISTRA: pulsante 9 quadratini */}
          <div className="flex items-center">
            <button
              ref={btnRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="dialog"
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-lg border bg-white/80 px-2 py-1.5 text-xs font-semibold text-gray-800 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-blue/40 sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm",
              
              )}
            >
              {/* icona 9 quadratini */}
              <span aria-hidden className="grid h-4 w-4 grid-cols-3 grid-rows-3 gap-[1px] sm:h-5 sm:w-5 sm:gap-[2px]">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className="block rounded-[2px] bg-navy/80 transition group-hover:bg-navy "
                  />
                ))}
              </span>
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
                "hidden sm:inline text-xs font-semibold transition-colors px-2 py-1.5 rounded-md bg-navy text-white hover:bg-navy/90 sm:text-sm sm:px-4 sm:py-2 sm:rounded-lg"
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
              "rounded-3xl bg-white/95 p-[2px] shadow-[0_30px_80px_-20px_rgba(10,27,58,.35)] backdrop-blur",
              BORDER_DARK,
            )}
          >
            <div className="rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-white via-sky-blue/10 to-white p-3 sm:p-5">
              {/* WRAPPER: su mobile colonna verticale scrollabile, su md griglia compatta */}
              <div className={cn(
                // Mobile: colonna verticale scrollabile, su sm: griglia
                "flex flex-col gap-3 max-h-[65vh] overflow-y-auto pb-2 sm:gap-4 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-[1.3fr,1fr] sm:gap-6"
              )}>
                {/* COLONNA SINISTRA */}
                <div className={cn("sm:min-w-0 sm:snap-none")}>
                  <div
                    className={cn(
                      "rounded-2xl bg-white p-3 sm:p-5",
                      BORDER_DARK,
                    )}
                  >
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-600 sm:mb-4">
                      <Image
                        src="/iconaRegalo.png"
                        alt={t("alt.packages")}
                        width={28}
                        height={28}
                        className="inline-block align-top object-contain flex-shrink-0"
                      />
                      {t("mega.title.packages")}
                    </p>

                    {/* Cards: su mobile colonna verticale scrollabile; su md griglia 2x2 */}
                    <div className={cn(
                      "flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible"
                    )}>


                    {/* Set-Up Fee */}
                    <Link
                        href="/pacchetti/set-up-fee"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-start gap-2 rounded-lg bg-white/85 p-3 transition hover:-translate-y-0.5 hover:shadow-lg sm:col-span-2 sm:min-w-0 sm:gap-3 sm:rounded-xl sm:p-4",
                          BORDER_DARK,
                        )}
                      >
                        <div className="flex items-start justify-start h-12 w-12 rounded-lg flex-shrink-0 sm:h-16 sm:w-16">
                          <Image
                            src="/iconaSetupfee.png"
                            alt={t("alt.setup")}
                            width={48}
                            height={48}
                            className="h-8 w-8 align-top object-contain sm:h-12 sm:w-12"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-navy sm:text-base">{t("mega.card.setup.title")}</p>
                          <p className="text-xs text-gray-600 sm:text-sm">{t("mega.card.setup.desc")}</p>
                        </div>
                      </Link>

                      
                                    {/* Subscription */}
                                    <Link
                        href="/pacchetti/subscription"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-start gap-2 rounded-lg bg-white/85 p-3 transition hover:-translate-y-0.5 hover:shadow-lg sm:min-w-0 sm:gap-3 sm:rounded-xl sm:p-4",
                          BORDER_DARK,
                        )}
                      >
                        <div className="flex items-start justify-start h-12 w-12 rounded-lg flex-shrink-0 sm:h-20 sm:w-20">
                          <Image
                            src="/iconaSubscr.png"
                            alt={t("alt.subscription")}
                            width={48}
                            height={48}
                            className="h-8 w-8 align-top object-contain sm:h-12 sm:w-12"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-navy sm:text-base">{t("mega.card.subscription.title")}</p>
                          <p className="text-xs text-gray-600 sm:text-sm">{t("mega.card.subscription.desc")}</p>
                        </div>
                      </Link>

                      {/* Performance */}
                      <Link
                        href="/pacchetti/performance"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-start gap-2 rounded-lg bg-white/85 p-3 transition hover:-translate-y-0.5 hover:shadow-lg sm:min-w-0 sm:gap-3 sm:rounded-xl sm:p-4",
                          BORDER_DARK,
                        )}
                      >
                        <div className="flex items-start justify-start h-12 w-12 rounded-lg flex-shrink-0 sm:h-16 sm:w-16">
                          <Image
                            src="/iconaPerformance.png"
                            alt={t("alt.performance")}
                            width={48}
                            height={48}
                            className="h-8 w-8 align-top object-contain sm:h-12 sm:w-12"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-navy sm:text-base">{t("mega.card.performance.title")}</p>
                          <p className="text-xs text-gray-600 sm:text-sm">{t("mega.card.performance.desc")}</p>
                        </div>
                      </Link>

        

                    </div>
                  </div>
                </div>

                {/* COLONNA DESTRA (ANCHE QUI CARD COMPATTE) */}
                <div className={cn("sm:min-w-0 sm:snap-none")}>
                  <div
                    className={cn(
                      "rounded-2xl bg-white p-3 sm:p-5",
                      BORDER_DARK,
                    )}
                  >
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gray-600 sm:mb-4">
                      {t("rightCol.title.navigate")}
                    </p>
                    <div className={cn(
                      "flex flex-col gap-2 sm:block sm:gap-3 sm:overflow-visible"
                    )}>
                      <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "mb-2 flex items-center justify-between rounded-lg bg-white/85 px-3 py-2 transition hover:shadow-md sm:mb-3 sm:rounded-xl sm:px-4 sm:py-3",
                          BORDER_DARK,
                          isActive("/") && "ring-1 ring-navy/30",
                        )}
                      >
                        <span className="flex items-start gap-2 sm:gap-3">
                          <Image
                            src="/iconaHome.png"
                            alt={t("alt.home")}
                            width={32}
                            height={32}
                            className="h-6 w-6 align-top object-contain flex-shrink-0 sm:h-8 sm:w-8"
                          />
                          <span className="text-sm font-medium text-gray-800 sm:text-base">{t("rightCol.home")}</span>
                        </span>
                        <span className="text-xs text-gray-500">{t("rightCol.open")}</span>
                      </Link>
                      <Link
                        href="/pacchetti"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "mb-1 flex items-center justify-between rounded-lg bg-white/85 px-3 py-2 transition hover:shadow-md sm:rounded-xl sm:px-4 sm:py-3",
                          BORDER_DARK,
                          isActive("/pacchetti") && "ring-1 ring-navy/30",
                        )}
                      >
                        <span className="flex items-start gap-2 sm:gap-3">
                          <Image
                            src="/iconaRegalo.png"
                            alt={t("alt.packages")}
                            width={32}
                            height={32}
                            className="h-6 w-6 align-top object-contain flex-shrink-0 sm:h-8 sm:w-8"
                          />
                          <span className="text-sm font-medium text-gray-800 sm:text-base">{t("rightCol.packages")}</span>
                        </span>
                        <span className="text-xs text-gray-500">{t("rightCol.packagesCta")}</span>
                      </Link>
  
                      
                      <Link
                        href="/contattaci"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "mb-1 flex items-center justify-between rounded-lg bg-white/85 px-3 py-2 transition hover:shadow-md sm:rounded-xl sm:px-4 sm:py-3",
                          BORDER_DARK,
                          isActive("/contattaci") && "ring-1 ring-navy/30",
                        )}
                      >
                        <span className="flex items-start gap-2 sm:gap-3">
                          <Image
                            src="/iconaContact.png"
                            alt={t("alt.contact")}
                            width={32}
                            height={32}
                            className="h-6 w-6 align-top object-contain flex-shrink-0 sm:h-8 sm:w-8"
                          />
                          <span className="text-sm font-medium text-gray-800 sm:text-base">{t("rightCol.contact")}</span>
                        </span>
                        <span className="text-xs text-gray-500">{t("rightCol.contactCta")}</span>
                      </Link>



                      <Link
                        href="/faq"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "mb-1 flex items-center justify-between rounded-lg bg-white/85 px-3 py-2 transition hover:shadow-md sm:rounded-xl sm:px-4 sm:py-3",
                          BORDER_DARK,
                          isActive("/faq") && "ring-1 ring-navy/30",
                        )}
                      >
                        <span className="flex items-start gap-2 sm:gap-3">
                        <Image
                            src="/iconaFaq.png"
                            alt={t("alt.contact")}
                            width={32}
                            height={32}
                            className="h-6 w-6 align-top object-contain flex-shrink-0 sm:h-8 sm:w-8"
                          />
                          <span className="text-sm font-medium text-gray-800 sm:text-base">{t("rightCol.faq")}</span>
                        </span>
                        <span className="text-xs text-gray-500">{t("rightCol.faqCta")}</span>
                      </Link>

                      <div className={cn("hidden sm:block rounded-lg bg-gradient-to-tr from-sky-blue/10 via-white to-orange/10 p-3 text-xs text-gray-700 sm:rounded-xl sm:p-4 sm:text-sm", BORDER_DARK)}>
                        <span className="font-semibold text-navy">{t("tip.label")}</span>{" "}
                        {t("tip.text")}
                      </div>
                    </div>
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
