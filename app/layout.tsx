import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import WhatsAppPopup from "./whatsapp"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "All You Can Leads - Appuntamenti B2B Qualificati",
  description:
    "Sistema internazionale di generazione appuntamenti B2B qualificati. Trasformiamo tecnologia e dati in meeting costanti con decision maker.",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="quicksand-root antialiased">
        <NextIntlClientProvider key={locale} messages={messages} locale={locale}>
          <SiteHeader />
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">
              <Suspense fallback={null}>{children}</Suspense>
            </main>

            {/* Popup WhatsApp (client component) */}
            <WhatsAppPopup />

            <SiteFooter />
          </div>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
