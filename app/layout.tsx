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
  title: "All You Can Leads - Lead Generation B2B | Generazione Appuntamenti Qualificati",
  description:
    "Azienda leader nella lead generation B2B e generazione appuntamenti qualificati. Forniamo leads B2B verificati, appointment setting e sales qualified leads per la tua crescita commerciale.",
  keywords: [
    "lead generation",
    "lead generation B2B",
    "generazione leads",
    "appuntamenti B2B",
    "appointment setting",
    "sales qualified leads",
    "azienda lead generation",
    "servizi lead generation",
    "lead generation qualificati",
    "generazione appuntamenti",
    "leads B2B Italia",
    "lead generator",
    "azienda leads",
    "generazione contatti B2B",
    "appuntamenti commerciali qualificati",
    "B2B lead generation services",
    "qualified appointment setting",
    "business leads Italy",
  ],
  authors: [{ name: "All You Can Leads" }],
  creator: "All You Can Leads",
  publisher: "All You Can Leads",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://allyoucanleads.com",
    title: "All You Can Leads - Lead Generation B2B e Appuntamenti Qualificati",
    description:
      "Generazione professionale di leads B2B e appuntamenti commerciali qualificati. Trasformiamo dati e tecnologia in meeting con decision maker.",
    siteName: "All You Can Leads",
  },
  twitter: {
    card: "summary_large_image",
    title: "All You Can Leads - Lead Generation B2B",
    description: "Generazione leads B2B e appuntamenti qualificati con decision maker.",
  },
  alternates: {
    canonical: "https://allyoucanleads.com",
    languages: {
      "it-IT": "https://allyoucanleads.com",
      "en-US": "https://allyoucanleads.com/en",
      "es-ES": "https://allyoucanleads.com/es",
    },
  },
  icons: {
    icon: [
      { url: "/Favicon-AYCL.png", sizes: "any" },
      { url: "/Favicon-AYCL.png", type: "image/png" },
    ],
    apple: [{ url: "/Favicon-AYCL.png" }],
    shortcut: ["/Favicon-AYCL.png"],
  },
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
