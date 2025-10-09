"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ContattaciPage() {
  const handleEmailClick = () => {
    window.location.href = "mailto:info@allyoucanleads.com"
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/393401234567", "_blank")
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-28 right-20 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -left-16 h-60 w-60 rounded-full bg-sky-blue/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-12 h-64 w-16 -rotate-45 bg-navy/5" />
      <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-sky-blue/10 -rotate-45" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-navy/10 rotate-12" />

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-6 py-2 bg-orange/10 rounded-full">
              <span className="text-sm font-semibold text-orange">Parliamone</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
              Pronto a riempire il tuo calendario di <span className="text-orange">opportunità reali</span>?
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Scegli il modo più comodo per metterti in contatto con noi. Il nostro team è pronto ad ascoltare le tue
              esigenze e trovare la soluzione perfetta per la tua azienda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Email Card */}
            <Card
              className="group relative p-12 bg-gradient-to-br from-sky-blue/5 to-white border-2 border-sky-blue/30 hover:border-sky-blue hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={handleEmailClick}
            >
              {/* Geometric decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-sky-blue/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-sky-blue/20 rotate-12 group-hover:rotate-45 transition-transform duration-500" />

              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-sky-blue/10 rounded-2xl flex items-center justify-center group-hover:bg-sky-blue/20 transition-colors">
                  <Image
                    src="/iconaMessaggio.png"
                    alt="Email"
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-navy mb-3">Scrivici via Email</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Preferisci comunicare via email? Inviaci un messaggio dettagliato e ti risponderemo entro 24 ore con
                    tutte le informazioni di cui hai bisogno.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sky-blue font-semibold group-hover:gap-5 transition-all">
                  <span>Invia Email</span>
                  <ArrowRight className="h-5 w-5" />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">info@allyoucanleads.com</p>
                </div>
              </div>
            </Card>

            {/* WhatsApp Card */}
            <Card
              className="group relative p-12 bg-gradient-to-br from-orange/5 to-white border-2 border-orange/30 hover:border-orange hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={handleWhatsAppClick}
            >
              {/* Geometric decoration */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange/10 rotate-45 group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 bg-orange/10 rounded-2xl flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <Image
                    src="/iconaWhatsapp.png"
                    alt="WhatsApp"
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-navy mb-3">Contattaci su WhatsApp</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Hai bisogno di una risposta veloce? Scrivici su WhatsApp e parliamo direttamente. Il nostro team è
                    disponibile dal lunedì al venerdì, dalle 8:30 alle 20:30.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-orange font-semibold group-hover:gap-5 transition-all">
                  <span>Apri WhatsApp</span>
                  <ArrowRight className="h-5 w-5" />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">+39 340 123 4567</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-sky-blue/5 rounded-full blur-2xl" />

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy mb-6">Altre informazioni utili</h2>
              <p className="text-xl text-gray-600">Tutto quello che ti serve per metterti in contatto con noi</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 bg-white border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/iconaTelefono.png"
                    alt="Telefono"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Telefono</h3>
                <p className="text-gray-600 mb-4">Chiamaci per una consulenza immediata</p>
                <p className="text-navy font-semibold">+39 340 123 4567</p>
              </Card>

              <Card className="p-8 bg-white border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/iconaMessaggio.png"
                    alt="Email"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Email</h3>
                <p className="text-gray-600 mb-4">Scrivici per informazioni dettagliate</p>
                <p className="text-sky-blue font-semibold">info@allyoucanleads.com</p>
              </Card>

              <Card className="p-8 bg-white border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image
                    src="/iconaPosizione.png"
                    alt="Sede"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Sede</h3>
                <p className="text-gray-600 mb-4">Vieni a trovarci di persona</p>
                <p className="text-orange font-semibold">Milano, Italia</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-navy">Hai ancora dubbi?</h2>
            <p className="text-xl text-gray-600">
              Consulta la nostra sezione FAQ o prenota una call gratuita per parlare direttamente con un nostro esperto
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy/5 bg-transparent">
                  Vai alle FAQ
                </Button>
              </Link>
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                  Prenota una Call Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-navy via-navy to-sky-blue/20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">
              Inizia oggi a generare appuntamenti qualificati
            </h2>
            <p className="text-xl text-gray-200">
              Smetti di sprecare budget in ADV e inizia a parlare con chi decide davvero
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/pacchetti">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-lg px-8 w-full">
                  Scopri i Pacchetti
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
