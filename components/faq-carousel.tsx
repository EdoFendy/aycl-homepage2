"use client"

import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"

type CarouselItem = {
  // per immagini: usa src/alt; per FAQ puoi ignorarli e renderizzare altro contenuto
  src?: string
  alt?: string
  // campi legacy FAQ (opzionali)
  question?: string
  answer?: string
}

type Props = {
  items: CarouselItem[]
  className?: string
  cardClassName?: string
  // pixel al secondo: più alto = più veloce
  pxPerSecond?: number
}

export function FAQCarousel({
  items,
  className,
  cardClassName,
  pxPerSecond = 80,
}: Props) {
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [duration, setDuration] = useState<number>(20)

  // duplichiamo per seamless loop
  const duplicatedItems = useMemo(() => [...items, ...items], [items])

  // calcolo durata animazione in base alla larghezza della metà contenuto
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    // metà della traccia (perché l’animazione va da 0 a -50%)
    const halfWidth = el.scrollWidth / 2
    const seconds = Math.max(6, halfWidth / pxPerSecond) // durata minima 6s
    setDuration(seconds)
  }, [items, pxPerSecond])

  return (
    <div
      className={cn(
        "relative overflow-hidden select-none",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
    >
      <div className="relative">
        <div
          ref={trackRef}
          className={cn(
            "flex gap-6 will-change-transform",
            "faq-marquee",
            isPaused && "faq-marquee--paused"
          )}
          aria-label="Contenuto in scorrimento continuo da destra verso sinistra"
          // passiamo la durata come CSS var
          style={{ ["--marquee-duration" as any]: `${duration}s` }}
        >
          {duplicatedItems.map((item, idx) => (
            <article
              key={(item.question || item.src || "item") + "-" + idx}
              className={cn(
                "min-w-[280px] max-w-[320px] sm:min-w-[340px] sm:max-w-[380px]",
                "shrink-0",
                cardClassName
              )}
            >
              {/* Se hai immagini */}
              {item.src ? (
                <figure className="rounded-xl overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className="block w-full h-48 object-cover"
                    draggable={false}
                  />
                  {item.alt ? (
                    <figcaption className="px-3 py-2 text-sm text-gray-600">
                      {item.alt}
                    </figcaption>
                  ) : null}
                </figure>
              ) : (
                // fallback: layout FAQ come nel tuo esempio
                <div className="rounded-xl border p-4 bg-white">
                  <header className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      FAQ
                    </span>
                    <h3 className="font-medium">{item.question}</h3>
                  </header>
                  <div className="h-px bg-gray-200 mb-2" />
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* stile a bordo componente */}
      <style jsx>{`
        /* animazione principale; il contenitore è duplicato, quindi -50% = una lunghezza intera */
        .faq-marquee {
          animation-name: marquee-x;
          animation-duration: var(--marquee-duration, 20s);
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .faq-marquee--paused {
          animation-play-state: paused;
        }
        @keyframes marquee-x {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        /* rispetto per utenti con ridotta mobilità */
        @media (prefers-reduced-motion: reduce) {
          .faq-marquee {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
