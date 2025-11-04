import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { LayoutWrapper } from "./layout-wrapper"

interface PageLayoutContainerProps {
  children: ReactNode
  className?: string
  innerClassName?: string
  /**
   * Se true, usa grid-container (larghezza massima 1920px con padding)
   * Se false (default), usa grid-content (larghezza massima 1280px - colonne 2-7)
   */
  fullWidth?: boolean
}

/**
 * PageLayoutContainer - Container principale per le pagine
 * Applica automaticamente il sistema a griglia 8 colonne
 * Contenuto posizionato tra colonne 2-7 per default
 */
export function PageLayoutContainer({
  children,
  className = "",
  innerClassName,
  fullWidth = false,
}: PageLayoutContainerProps) {
  return (
    <div className={cn(fullWidth ? "grid-container" : "grid-content", className)}>
      {innerClassName ? <div className={innerClassName}>{children}</div> : children}
    </div>
  )
}
