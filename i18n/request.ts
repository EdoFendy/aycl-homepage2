import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value
  const locale = cookieLocale ?? "it"

  const header = (await import("../traduzioni/site-header.json")).default as Record<string, any>
  const footer = (await import("../traduzioni/site-footer.json")).default as Record<string, any>
  const home = (await import("../traduzioni/home.json")).default as Record<string, any>
  const contattaci = (await import("../traduzioni/contattaci.json")).default as Record<string, any>
  const pacchetti = (await import("../traduzioni/pacchetti.json")).default as Record<string, any>
  const pacchettiPerformance = (await import("../traduzioni/pacchetti-performance.json")).default as Record<string, any>
  const pacchettiSetUpFee = (await import("../traduzioni/pacchetti-set-up-fee.json")).default as Record<string, any>
  const pacchettiSubscription = (await import("../traduzioni/pacchetti-subscription.json")).default as Record<string, any>
  const faq = (await import("../traduzioni/faq.json")).default as Record<string, any>
  const pagamento = (await import("../traduzioni/pagamento.json")).default as Record<string, any>
  const whatsapp = (await import("../traduzioni/whatsapp.json")).default as Record<string, any>
  const outreach = (await import("../traduzioni/outreach.json")).default as Record<string, any>
  const calcolatore = (await import("../traduzioni/calcolatore.json")).default as Record<string, any>
  const checkout = (await import("../traduzioni/checkout.json")).default as Record<string, any>

  return {
    locale,
    messages: {
      siteHeader: header[locale] ?? header.it,
      siteFooter: footer[locale] ?? footer.it,
      home: home[locale] ?? home.it,
      contattaci: contattaci[locale] ?? contattaci.it,
      pacchetti: pacchetti[locale] ?? pacchetti.it,
      pacchettiPerformance: pacchettiPerformance[locale] ?? pacchettiPerformance.it,
      pacchettiSetUpFee: pacchettiSetUpFee[locale] ?? pacchettiSetUpFee.it,
      pacchettiSubscription: pacchettiSubscription[locale] ?? pacchettiSubscription.it,
      faq: faq[locale] ?? faq.it,
      pagamento: pagamento[locale] ?? pagamento.it,
      whatsapp: whatsapp[locale] ?? whatsapp.it,
      outreach: outreach[locale] ?? outreach.it,
      calcolatore: calcolatore[locale] ?? calcolatore.it,
      checkout: checkout[locale] ?? checkout.it,
    },
  }
})
