"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, XCircle, RefreshCw, Phone, Mail, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function CheckoutFailPage() {
  const t = useTranslations("checkout")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden sm:pt-32 sm:pb-20">
        {/* Geometric decorations */}
        <div className="absolute top-16 right-4 w-20 h-20 bg-red-500/10 rotate-12 rounded-lg sm:top-20 sm:right-10 sm:w-32 sm:h-32" />
        <div className="absolute top-32 left-4 w-16 h-16 bg-orange/10 rounded-full sm:top-40 sm:left-10 sm:w-24 sm:h-24" />
        <div className="absolute bottom-6 right-1/4 w-12 h-32 bg-navy/5 -rotate-45 sm:bottom-10 sm:w-16 sm:h-48" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center sm:w-24 sm:h-24">
                <XCircle className="h-10 w-10 text-red-600 sm:h-12 sm:w-12" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
                Pagamento Non Completato
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Si è verificato un problema durante il pagamento. Non ti preoccupare, non è stato addebitato alcun importo.
              </p>
            </div>

            {/* Error Details */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-red-50 to-orange/10 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-navy">
                  Cosa è successo?
                </h2>
              </div>
              <div className="text-left space-y-3">
                <p className="text-gray-700">
                  Il pagamento potrebbe non essere andato a buon fine per diversi motivi:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Problemi di connessione temporanei</li>
                  <li>Dati della carta non corretti</li>
                  <li>Limiti di spesa della carta</li>
                  <li>Problemi tecnici del sistema di pagamento</li>
                </ul>
              </div>
            </Card>

            {/* Solutions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto">
                    <RefreshCw className="h-6 w-6 text-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy">Riprova il Pagamento</h3>
                  <p className="text-sm text-gray-600">
                    Torna alla pagina di pagamento e riprova con gli stessi dati o con una carta diversa.
                  </p>
                  <Link href="/pacchetti">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-white">
                      Riprova Ora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="h-6 w-6 text-sky-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy">Contatta il Supporto</h3>
                  <p className="text-sm text-gray-600">
                    Il nostro team ti aiuterà a completare il pagamento e risolvere eventuali problemi.
                  </p>
                  <Link href="/contattaci">
                    <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy/5">
                      Contatta Supporto
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-navy mb-4">
                Hai bisogno di aiuto?
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
              <p className="text-sm text-gray-600 mt-4">
                Siamo disponibili dal lunedì al venerdì, dalle 9:00 alle 18:00
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/pacchetti">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-base px-6 sm:text-lg sm:px-8">
                  Riprova il Pagamento
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
        </div>
      </section>
    </div>
  )
}
