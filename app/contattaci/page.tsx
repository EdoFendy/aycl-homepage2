"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"

export default function ContattaciPage() {
  const t = useTranslations("contattaci")
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
              <span className="text-sm font-semibold text-orange">{t("hero.badge")}</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance">
              {t.rich("hero.title", {
                strong: (chunks) => <span className="text-orange">{chunks}</span>,
              })}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t("hero.subtitle")}
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
                    alt={t("email.alt")}
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-navy mb-3">{t("email.title")}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{t("email.desc")}</p>
                </div>

                <div className="flex items-center gap-3 text-sky-blue font-semibold group-hover:gap-5 transition-all">
                  <span>{t("email.cta")}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">{t("email.address")}</p>
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
                    alt={t("whatsapp.alt")}
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-navy mb-3">{t("whatsapp.title")}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{t("whatsapp.desc")}</p>
                </div>

                <div className="flex items-center gap-3 text-orange font-semibold group-hover:gap-5 transition-all">
                  <span>{t("whatsapp.cta")}</span>
                  <ArrowRight className="h-5 w-5" />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">{t("whatsapp.phone")}</p>
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
              <h2 className="text-4xl font-bold text-navy mb-6">{t("info.title")}</h2>
              <p className="text-xl text-gray-600">{t("info.subtitle")}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 bg-white border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Image
                    src="/iconaTelefono.png"
                    alt={t("info.phone.alt")}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{t("info.phone.title")}</h3>
                <p className="text-gray-600 mb-4">{t("info.phone.desc")}</p>
                <p className="text-navy font-semibold">{t("info.phone.value")}</p>
              </Card>

              <Card className="p-8 bg-white border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Image
                    src="/iconaMessaggio.png"
                    alt={t("info.email.alt")}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{t("info.email.title")}</h3>
                <p className="text-gray-600 mb-4">{t("info.email.desc")}</p>
                <p className="text-sky-blue font-semibold">{t("info.email.value")}</p>
              </Card>

              <Card className="p-8 bg-white border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Image
                    src="/iconaPosizione.png"
                    alt={t("info.office.alt")}
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{t("info.office.title")}</h3>
                <p className="text-gray-600 mb-4">{t("info.office.desc")}</p>
                <p className="text-orange font-semibold">{t("info.office.value")}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-navy">{t("faqPreview.title")}</h2>
            <p className="text-xl text-gray-600">{t("faqPreview.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/">
                <Button size="lg" variant="outline" className="border-navy text-navy hover:bg-navy/5 bg-transparent">
                  {t("faqPreview.ctaFaq")}
                </Button>
              </Link>
              <Link href="/contattaci">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                  {t("faqPreview.ctaCall")}
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
            <h2 className="text-4xl lg:text-5xl font-bold text-balance">{t("cta.title")}</h2>
            <p className="text-xl text-gray-200">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/pacchetti">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white text-lg px-8 w-full">
                  {t("cta.button")}
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
