"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Calendar, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { PageLayoutContainer } from "@/components/page-layout-container"

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden sm:pt-32 sm:pb-20">
        {/* Geometric decorations */}
        <div className="absolute top-16 right-4 w-20 h-20 bg-green-500/10 rotate-12 rounded-lg sm:top-20 sm:right-10 sm:w-32 sm:h-32" />
        <div className="absolute top-32 left-4 w-16 h-16 bg-orange/10 rounded-full sm:top-40 sm:left-10 sm:w-24 sm:h-24" />
        <div className="absolute bottom-6 right-1/4 w-12 h-32 bg-navy/5 -rotate-45 sm:bottom-10 sm:w-16 sm:h-48" />

        <PageLayoutContainer className="px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center sm:w-24 sm:h-24">
                <CheckCircle2 className="h-10 w-10 text-green-600 sm:h-12 sm:w-12" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
                Pagamento Completato!
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Grazie per aver scelto All You Can Leads. Il tuo team si metterà in contatto con te entro 24 ore.
              </p>
            </div>

            {/* Next Steps */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-green-50 to-sky-blue/10 border-green-200">
              <h2 className="text-xl sm:text-2xl font-bold text-navy mb-4">
                Cosa succede ora?
              </h2>
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="font-semibold text-navy">1. Conferma Email</h3>
                  <p className="text-sm text-gray-600">Riceverai una email di conferma con tutti i dettagli</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-sky-blue" />
                  </div>
                  <h3 className="font-semibold text-navy">2. Chiamata Iniziale</h3>
                  <p className="text-sm text-gray-600">Il nostro team ti contatterà per definire gli obiettivi</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="h-6 w-6 text-orange" />
                  </div>
                  <h3 className="font-semibold text-navy">3. Primo Meeting</h3>
                  <p className="text-sm text-gray-600">Pianificheremo insieme la tua strategia di outreach</p>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-navy mb-4">
                Hai domande?
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">info@allyoucanleads.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">+39 340 123 4567</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-base px-6 sm:text-lg sm:px-8">
                  Contatta il Team
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-navy text-navy hover:bg-navy/5 text-base px-6 bg-transparent sm:text-lg sm:px-8"
                >
                  Torna alla Home
                </Button>
              </Link>
            </div>
          </div>
        </PageLayoutContainer>
      </section>
    </div>
  )
}
