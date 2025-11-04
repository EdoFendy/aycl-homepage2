"use client"

import { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: "fade-in" | "fade-in-up" | "fade-in-down" | "fade-in-left" | "fade-in-right" | "scale-in"
  delay?: 0 | 100 | 200 | 300 | 400 | 500
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Componente per animazioni reveal on scroll
 * Wrapper minimal che applica animazioni quando l'elemento entra in viewport
 */
export function ScrollReveal({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
    rootMargin: "0px 0px -50px 0px",
  })

  return (
    <div
      ref={ref as any}
      className={cn(
        "transition-opacity",
        !isVisible && "opacity-0",
        isVisible && `animate-${animation}`,
        delay > 0 && isVisible && `animate-delay-${delay}`,
        className
      )}
    >
      {children}
    </div>
  )
}
