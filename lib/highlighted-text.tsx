import { Fragment, type ReactNode } from "react"

export function renderHighlightedText(text: string): ReactNode {
  if (!text.includes("**") && !text.includes("##")) {
    return text
  }

  // Split by both ** and ## patterns
  const parts = text.split(/(\*\*[^*]+\*\*|##[^#]+##)/g)

  return parts.map((part, index) => {
    const isOrange = part.startsWith("**") && part.endsWith("**")
    const isSkyBlue = part.startsWith("##") && part.endsWith("##")

    if (!isOrange && !isSkyBlue) {
      return <Fragment key={index}>{part}</Fragment>
    }

    const content = part.slice(2, -2)

    return (
      <strong 
        key={index} 
        className={`font-semibold ${isOrange ? "text-orange" : "text-sky-blue"}`}
      >
        {content}
      </strong>
    )
  })
}
