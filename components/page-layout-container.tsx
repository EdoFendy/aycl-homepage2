import { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { LayoutWrapper } from "./layout-wrapper"

interface PageLayoutContainerProps {
  children: ReactNode
  className?: string
  innerClassName?: string
}

export function PageLayoutContainer({
  children,
  className = "",
  innerClassName,
}: PageLayoutContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6", className)}>
      <LayoutWrapper>
        {innerClassName ? <div className={innerClassName}>{children}</div> : children}
      </LayoutWrapper>
    </div>
  )
}
