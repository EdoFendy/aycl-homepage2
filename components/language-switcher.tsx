"use client"

import { useLocale } from "next-intl"

export function LanguageSwitcher() {
  const locale = useLocale()

  const languages = [
    { code: "it", label: "IT" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ]

  return (
    <div className="flex items-center gap-1 text-sm">
      {languages.map((lang, index) => (
        <div key={lang.code} className="flex items-center">
          <a
            href={`/api/locale/${lang.code}`}
            className={`px-2 py-1 rounded transition-colors ${
              locale === lang.code
                ? "bg-navy text-white"
                : "text-gray-600 hover:text-navy hover:bg-gray-100"
            }`}
          >
            {lang.label}
          </a>
          {index < languages.length - 1 && (
            <span className="text-gray-300 mx-1">|</span>
          )}
        </div>
      ))}
    </div>
  )
}
