import { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode
  className?: string
}

export function LayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`grid grid-cols-9 gap-4 ${className}`}>
      {/* Colonna vuota sinistra */}
      <div className="col-span-1" />
      
      {/* Contenuto principale - 7 colonne centrali */}
      <div className="col-span-7">
        {children}
      </div>
      
      {/* Colonna vuota destra */}
      <div className="col-span-1" />
    </div>
  )
}

// Variante per sezioni che devono occupare tutta la larghezza
export function FullWidthLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`grid grid-cols-9 gap-4 ${className}`}>
      {/* Contenuto a tutta larghezza */}
      <div className="col-span-9">
        {children}
      </div>
    </div>
  )
}

// Variante per sezioni con contenuto centrato ma con elementi decorativi laterali
export function CenteredLayoutWrapper({ children, className = "" }: LayoutWrapperProps) {
  return (
    <div className={`grid grid-cols-9 gap-4 ${className}`}>
      {/* Colonna sinistra per elementi decorativi */}
      <div className="col-span-1" />
      
      {/* Contenuto principale - 7 colonne centrali */}
      <div className="col-span-7">
        {children}
      </div>
      
      {/* Colonna destra per elementi decorativi */}
      <div className="col-span-1" />
    </div>
  )
}
