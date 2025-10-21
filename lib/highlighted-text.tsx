import { Fragment, type ReactNode } from "react"

export function renderHighlightedText(text: string): ReactNode {
  if (!text.includes("**")) {
    return text
  }

  const parts = text.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    const isHighlighted = part.startsWith("**") && part.endsWith("**")

    if (!isHighlighted) {
      return <Fragment key={index}>{part}</Fragment>
    }

    const content = part.slice(2, -2)

    return (
      <strong key={index} className="font-semibold text-orange">
        {content}
      </strong>
    )
  })
}
