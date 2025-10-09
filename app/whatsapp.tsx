"use client"

import { useEffect, useState } from "react"

// ✅ Inserisci il tuo numero in formato internazionale senza +
const WHATSAPP_NUMBER = "393331234567"
const DEFAULT_MESSAGE = "Ciao! Parla con noi ora 🙂"

export default function WhatsAppPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("whatsappPopupClosed") === "1") return
    const t = setTimeout(() => setOpen(true), 7000)
    return () => clearTimeout(t)
  }, [])

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem("whatsappPopupClosed", "1")
  }

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <>
      {/* ✅ FAB isolato: niente wrapper full-screen intorno */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-4 right-4 z-[100000] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
      >
        {/* icona */}
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6 fill-current">
          <path d="M19.11 17.42c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.2-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.83-2.04-.22-.55-.45-.48-.61-.49l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.28 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.94 4.69 4.12.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32zM16.02 3.2c-7.12 0-12.9 5.78-12.9 12.9 0 2.27.59 4.41 1.62 6.26L3 29l6.83-1.79a12.79 12.79 0 0 0 6.19 1.58c7.12 0 12.9-5.78 12.9-12.9s-5.78-12.9-12.9-12.9z"/>
        </svg>
      </a>

      {/* Popup: click disabilitati quando è chiuso */}
      <div
        role="dialog"
        aria-label="Popup WhatsApp"
        aria-hidden={!open}
        className={`fixed bottom-20 right-4 z-[100000] w-[90vw] max-w-sm transition-all ${
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Chiudi"
          >
            ×
          </button>

          <div className="flex gap-3">
            <div className="mt-0.5 h-10 w-10 shrink-0 rounded-full bg-[#25D366] p-2 text-white">
              <svg viewBox="0 0 32 32" aria-hidden="true" className="h-full w-full fill-current">
                <path d="M19.11 17.42c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.2-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.83-2.04-.22-.55-.45-.48-.61-.49l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.28 0 1.34.98 2.63 1.12 2.81.14.18 1.93 2.94 4.69 4.12.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.29.23-.63.23-1.17.16-1.29-.07-.11-.25-.18-.52-.32zM16.02 3.2c-7.12 0-12.9 5.78-12.9 12.9 0 2.27.59 4.41 1.62 6.26L3 29l6.83-1.79a12.79 12.79 0 0 0 6.19 1.58c7.12 0 12.9-5.78 12.9-12.9s-5.78-12.9-12.9-12.9z"/>
              </svg>
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">Parla con noi ora</p>
              <p className="mt-1 text-sm text-gray-600">Siamo disponibili su WhatsApp. Clicca per iniziare la chat.</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50"
              >
                Apri WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
