"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Home as HomeIcon,
  MessageSquareText,
  BadgePercent,
  Rocket,
  Layers,
} from "lucide-react"

const BORDER_DARK = "border-[#0B1D3A]" // blu più scuro per i bordi

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

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
      <div className="container mx-auto px-6 sm:px-6">
        {/* NAVBAR ROW */}
        <div className="grid grid-cols-3 items-center py-3 sm:py-4">
          {/* SINISTRA: pulsante 9 quadratini */}
          <div className="flex items-center">
            <button
              ref={btnRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="dialog"
              className={cn(
                "group inline-flex items-center gap-2 rounded-xl border bg-white/80 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-blue/40",
                BORDER_DARK,
              )}
            >
              {/* icona 9 quadratini */}
              <span aria-hidden className="grid h-5 w-5 grid-cols-3 grid-rows-3 gap-[2px]">
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
                width={44}
                height={44}
                priority
              />
       
            </Link>
          </div>

          {/* DESTRA: CTA */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/contattaci"
              className={cn(
                "hidden md:inline text-sm font-medium transition-colors",
                isActive("/contattaci")
                  ? "text-navy"
                  : "text-gray-700 hover:text-navy",
              )}
            >
              Contattaci ora
            </Link>
            <Link href="/contattaci">
              <Button className="bg-navy text-white hover:bg-navy/90">
                Book a demo
              </Button>
            </Link>
          </div>
        </div>

        {/* MEGA MENU – ora su mobile scorre VERTICALE, non orizzontale */}
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Navigazione principale"
          className={cn(
            "pointer-events-none absolute left-2 right-2 top-[64px] mx-auto max-w-7xl transition-opacity duration-150 sm:top-[72px]",
            open ? "pointer-events-auto opacity-100" : "opacity-0",
          )}
        >
          <div
            className={cn(
              "rounded-3xl bg-white/95 p-[2px] shadow-[0_30px_80px_-20px_rgba(10,27,58,.35)] backdrop-blur",
              BORDER_DARK,
            )}
          >
            <div className="rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-white via-sky-blue/10 to-white p-4 sm:p-5">
              {/* WRAPPER: su mobile colonna verticale scrollabile, su md griglia compatta */}
              <div className={cn(
                // Mobile: colonna verticale scrollabile, su sm: griglia
                "flex flex-col gap-4 max-h-[70vh] overflow-y-auto pb-2 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-[1.3fr,1fr] sm:gap-6"
              )}>
                {/* COLONNA SINISTRA */}
                <div className={cn("sm:min-w-0 sm:snap-none")}>
                  <div
                    className={cn(
                      "rounded-2xl bg-white p-4 sm:p-5",
                      BORDER_DARK,
                    )}
                  >
                    <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
                      <Image
                        src="/iconaRegalo.png"
                        alt="Pacchetti"
                        width={28}
                        height={28}
                        className="inline-block align-top"
                      />
                      Pacchetti
                    </p>

                    {/* Cards: su mobile colonna verticale scrollabile; su md griglia 2x2 */}
                    <div className={cn(
                      "flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible"
                    )}>
                      {/* Subscription */}
                      <Link
                        href="/pacchetti/subscription"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl bg-white/85 p-4 transition hover:-translate-y-0.5 hover:shadow-lg sm:min-w-0",
                          BORDER_DARK,
                        )}
                      >
                        <div className="flex items-start justify-start h-20 w-20 rounded-lg">
                          <Image
                            src="/iconaSubscr.png"
                            alt="Subscription"
                            width={48}
                            height={48}
                            className="h-12 w-12 align-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy">Subscription</p>
                          <p className="text-sm text-gray-600">
                            Meeting qualificati in abbonamento, continuità e controllo.
                          </p>
                        </div>
                      </Link>

                      {/* Performance */}
                      <Link
                        href="/pacchetti/performance"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl bg-white/85 p-4 transition hover:-translate-y-0.5 hover:shadow-lg sm:min-w-0",
                          BORDER_DARK,
                        )}
                      >
                        <div className="flex items-start justify-start h-16 w-16 rounded-lg">
                          <Image
                            src="/iconaPerformance.png"
                            alt="Performance"
                            width={48}
                            height={48}
                            className="h-12 w-12 align-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy">Performance</p>
                          <p className="text-sm text-gray-600">
                            Modello pay-per-result: pipeline e chiusure al centro.
                          </p>
                        </div>
                      </Link>

                      {/* Set-Up Fee */}
                      <Link
                        href="/pacchetti/set-up-fee"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl bg-white/85 p-4 transition hover:-translate-y-0.5 hover:shadow-lg sm:col-span-2 sm:min-w-0",
                          BORDER_DARK,
                        )}
                      >
                        <div className="flex items-start justify-start h-16 w-16 rounded-lg">
                          <Image
                            src="/iconaSetUpFee.png"
                            alt="Set-Up Fee"
                            width={48}
                            height={48}
                            className="h-12 w-12 align-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-navy">Set-Up Fee</p>
                          <p className="text-sm text-gray-600">
                            Partnership a lungo termine con accesso permanente al sistema.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* COLONNA DESTRA (ANCHE QUI CARD COMPATTE) */}
                <div className={cn("sm:min-w-0 sm:snap-none")}>
                  <div
                    className={cn(
                      "rounded-2xl bg-white p-4 sm:p-5",
                      BORDER_DARK,
                    )}
                  >
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-600">
                      Naviga
                    </p>
                    <div className={cn(
                      "flex flex-col gap-3 sm:block sm:overflow-visible"
                    )}>
                      <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "mb-3 sm:mb-3 flex items-center justify-between rounded-xl bg-white/85 px-4 py-3 transition hover:shadow-md",
                          BORDER_DARK,
                          isActive("/") && "ring-1 ring-navy/30",
                        )}
                      >
                        <span className="flex items-start gap-3">
                          <Image
                            src="/iconaHome.png"
                            alt="Home"
                            width={32}
                            height={32}
                            className="h-8 w-8 align-top"
                          />
                          <span className="font-medium text-gray-800">Home</span>
                        </span>
                        <span className="text-xs text-gray-500">Apri</span>
                      </Link>

                      <Link
                        href="/contattaci"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "mb-1 flex items-center justify-between rounded-xl bg-white/85 px-4 py-3 transition hover:shadow-md",
                          BORDER_DARK,
                          isActive("/contattaci") && "ring-1 ring-navy/30",
                        )}
                      >
                        <span className="flex items-start gap-3">
                          <Image
                            src="/iconaContact.png"
                            alt="Contattaci"
                            width={32}
                            height={32}
                            className="h-8 w-8 align-top"
                          />
                          <span className="font-medium text-gray-800">Contattaci ora</span>
                        </span>
                        <span className="text-xs text-gray-500">Parla con noi</span>
                      </Link>

                      <div className={cn("hidden sm:block rounded-xl bg-gradient-to-tr from-sky-blue/10 via-white to-orange/10 p-4 text-sm text-gray-700", BORDER_DARK)}>
                        <span className="font-semibold text-navy">Suggerimento:</span>{" "}
                        scopri il pacchetto ideale per il tuo team.
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
