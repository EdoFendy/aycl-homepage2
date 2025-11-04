import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LayoutWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * LayoutWrapper - Componente principale per il layout con sistema a griglia 8 colonne
 * Contenuto posizionato tra colonne 2-7 (6 colonne centrali su 8 totali)
 * Riferimento: desktop 1920px
 */
export function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={cn("grid-content", className)}>
      {children}
    </div>
  )
}

/**
 * FullWidthLayoutWrapper - Per sezioni che necessitano di tutta la larghezza
 * Usa comunque padding laterali per evitare che il contenuto tocchi i bordi
 */
export function FullWidthLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={cn("grid-container", className)}>
      {children}
    </div>
  )
}

/**
 * HeroLayoutWrapper - Specifico per le hero sections
 * Applica padding verticale e orizzontale consistenti
 */
export function HeroLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={cn("hero-content", className)}>
      {children}
    </div>
  )
}

/**
 * SectionLayoutWrapper - Per sezioni standard del sito
 * Mantiene la larghezza content-max con padding laterali
 */
export function SectionLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={cn("section-container", className)}>
      {children}
    </div>
  )
}

// Deprecato: manteniamo per retrocompatibilità
export function CenteredLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={cn("grid-content", className)}>
      {children}
    </div>
  )
}
