import { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode
  className?: string
}

export function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6 ${className}`}>
      {/* Colonna vuota sinistra */}
      <div className="hidden md:col-span-1 md:block" />

      {/* Contenuto principale - 7 colonne centrali */}
      <div className="col-span-1 md:col-span-10 lg:col-span-9 xl:col-span-10">
        {children}
      </div>

      {/* Colonna vuota destra */}
      <div className="hidden md:col-span-1 md:block" />
    </div>
  )
}

// Variante per sezioni che devono occupare tutta la larghezza
export function FullWidthLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6 ${className}`}>
      {/* Contenuto a tutta larghezza */}
      <div className="col-span-1 md:col-span-12">
        {children}
      </div>
    </div>
  )
}

// Variante per sezioni con contenuto centrato ma con elementi decorativi laterali
export function CenteredLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6 ${className}`}>
      {/* Colonna sinistra per elementi decorativi */}
      <div className="hidden md:col-span-1 md:block" />

      {/* Contenuto principale - 7 colonne centrali */}
      <div className="col-span-1 md:col-span-10 lg:col-span-9 xl:col-span-10">
        {children}
      </div>

      {/* Colonna destra per elementi decorativi */}
      <div className="hidden md:col-span-1 md:block" />
    </div>
  )
}
