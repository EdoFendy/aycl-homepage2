"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { PageLayoutContainer } from "@/components/page-layout-container"

export default function ContattaciPage() {
  const t = useTranslations("contattaci")
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"aycl-discovery"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  const handleEmailClick = () => {
    window.location.href = "mailto:info@allyoucanleads.com"
  }

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/393401234567", "_blank")
  }

  return (
    <div className="min-h-screen bg-white text-navy">
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden bg-gradient-to-b from-white via-white to-[#f5f9ff]">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-orange/20 blur-3xl" aria-hidden="true" />
          <div className="absolute top-1/3 left-[-120px] h-72 w-72 rounded-full bg-sky-blue/15 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 right-1/3 h-40 w-96 bg-gradient-to-r from-orange/10 via-transparent to-transparent blur-[120px]" />
        </div>

        <PageLayoutContainer>
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center rounded-full border border-orange/20 bg-orange/10 px-4 py-1">
              <span className="type-eyebrow text-orange">{t("hero.badge")}</span>
            </div>

            <h1 className="type-h1 text-navy">
              {t.rich("hero.title", {
                strong: (chunks) => <span className="text-orange">{chunks}</span>,
              })}
            </h1>

            <p className="type-body text-gray-600 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Contact Methods */}
      <section className="relative py-24 bg-white">
        <div className="absolute inset-0 -z-10 opacity-70">
          <div className="absolute top-10 left-5 h-20 w-20 rounded-full bg-orange/10" aria-hidden="true" />
          <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-sky-blue/15" aria-hidden="true" />
        </div>

        <PageLayoutContainer>
          <div className="mb-12 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-sky-blue/30 bg-sky-blue/10 px-5 py-2 type-eyebrow text-sky-blue">
              Metodi di contatto
            </span>
            <h2 className="mt-6 type-h2 text-navy">
              Scegli come preferisci contattarci
            </h2>
            <p className="mt-4 type-body text-gray-600 max-w-2xl mx-auto">
              Siamo disponibili via email e WhatsApp per rispondere a tutte le tue domande
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Email Card */}
            <article
              className="group relative overflow-hidden rounded-3xl border border-sky-blue/20 bg-white/95 p-8 shadow-[0_28px_60px_-36px_rgba(10,43,107,0.45)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={handleEmailClick}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailClick()}
            >
              <div className="flex items-start gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-blue/10 transition-colors group-hover:bg-sky-blue/20">
                  <Image
                    src="/iconaMessaggio.png"
                    alt={t("email.alt")}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">{t("email.title")}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{t("email.desc")}</p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-blue group-hover:gap-3 transition-all">
                    <span>{t("email.cta")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>

                  <div className="pt-3 border-t border-gray-200/60">
                    <p className="text-xs text-gray-500">{t("email.address")}</p>
                  </div>
                </div>
              </div>
            </article>

            {/* WhatsApp Card */}
            <article
              className="group relative overflow-hidden rounded-3xl border border-orange/20 bg-white/95 p-8 shadow-[0_28px_60px_-36px_rgba(199,115,0,0.35)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={handleWhatsAppClick}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleWhatsAppClick()}
            >
              <div className="flex items-start gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-orange/10 transition-colors group-hover:bg-orange/20">
                  <Image
                    src="/iconaWhatsapp.png"
                    alt={t("whatsapp.alt")}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-navy sm:text-2xl">{t("whatsapp.title")}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{t("whatsapp.desc")}</p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-orange group-hover:gap-3 transition-all">
                    <span>{t("whatsapp.cta")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>

                  <div className="pt-3 border-t border-gray-200/60">
                    <p className="text-xs text-gray-500">{t("whatsapp.phone")}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </PageLayoutContainer>
      </section>

      {/* Visual Section - rimossa per coerenza */}

      {/* Calendar Section */}
      <section className="relative py-24 bg-[#f9fbff]">
        <div className="absolute inset-0 -z-10 bg-dotted-pattern" aria-hidden="true" />
        <div className="absolute left-1/2 top-16 -z-10 h-32 w-32 -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />

        <PageLayoutContainer>
          <div className="mb-12 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-orange/40 bg-orange/10 px-5 py-2 type-eyebrow text-orange">
              Prenota una call
            </span>
            <h2 className="mt-6 type-h2 text-navy">
              {t("calendar.cardTitle")}
            </h2>
            <p className="mt-4 type-body text-gray-600 max-w-2xl mx-auto">
              {t("calendar.cardDesc")}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-orange/20 bg-white/95 p-6 shadow-[0_32px_80px_-48px_rgba(199,115,0,0.4)] sm:p-8">
            <div className="w-full h-[600px] rounded-xl overflow-hidden border border-gray-200/60">
              <Cal
                namespace="aycl-discovery"
                calLink="giovannilucchesini/aycl-discovery"
                style={{width:"100%",height:"100%",overflow:"scroll"}}
                config={{"layout":"month_view"}}
              />
            </div>
          </div>
        </PageLayoutContainer>
      </section>

  

      {/* FAQ Preview */}
      <section className="relative py-24 bg-white">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-[#f6f9ff]" aria-hidden="true" />
        <div className="absolute -right-32 top-10 -z-10 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />

        <PageLayoutContainer>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2 type-eyebrow text-gray-600">
              Hai altre domande?
            </span>

            <h2 className="type-h2 text-navy">{t("faqPreview.title")}</h2>
            <p className="type-body text-gray-600 max-w-2xl mx-auto">{t("faqPreview.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/faq">
                <Button
                  size="lg"
                  variant="outline"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-8 py-4 text-base font-semibold text-navy transition duration-200 ease-out hover:bg-navy/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy sm:text-lg"
                >
                  {t("faqPreview.ctaFaq")}
                </Button>
              </Link>
              <Link href="/pacchetti">
                <Button
                  size="lg"
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,148,51,0.25)] transition duration-200 ease-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange sm:text-lg"
                >
                  Scopri i pacchetti
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </PageLayoutContainer>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-sky-blue/20 py-24 text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-orange/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-blue/10 blur-3xl" />
        </div>

        <PageLayoutContainer>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="type-h2 text-white">{t("cta.title")}</h2>
            <p className="type-body text-gray-200 max-w-2xl mx-auto">{t("cta.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/pacchetti">
                <Button
                  size="lg"
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,148,51,0.35)] transition duration-200 ease-out hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange sm:text-lg"
                >
                  {t("cta.button")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </PageLayoutContainer>
      </section>
    </div>
  )
}
