"use client"

import { useState } from "react"
import { ArrowRight, CreditCard, ShieldCheck, Sparkles, UserCheck } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface PaymentResponse {
  url: string
  fields: Record<string, string>
}

const PRODUCT_PRICE = "3.000€" as const

export default function PagamentoClientPage(): JSX.Element {
  const t = useTranslations("pagamento")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsLoading(true)
    setError(null)

    try {
      const payload = Object.fromEntries(formData.entries())
      const response = await fetch("/api/payments/redsys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}))
        throw new Error(errorPayload.message ?? "Errore sconosciuto")
      }

      const data = (await response.json()) as PaymentResponse
      redirectToGateway(data)
    } catch (err) {
      console.error("Errore durante l'invio del pagamento", err)
      setError((err as Error).message)
      setIsLoading(false)
    }
  }

  function redirectToGateway(data: PaymentResponse) {
    const form = document.createElement("form")
    form.method = "POST"
    form.action = data.url
    form.acceptCharset = "UTF-8"

    Object.entries(data.fields).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-gray-50 to-white py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-orange/20 to-transparent blur-3xl" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-5 py-2 text-sm font-semibold text-orange">
            <Sparkles className="h-4 w-4" />
            {t("hero.badge")}
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-navy md:text-5xl">
            {t.rich("hero.title", {
              strong: (chunks) => <span className="text-orange">{chunks}</span>,
            })}
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">{t("hero.subtitle")}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Card className="p-8 shadow-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-2xl font-semibold text-navy">{t("form.title")}</h2>
                <p className="mt-2 text-sm text-gray-600">{t("form.subtitle")}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("form.name.label")}</Label>
                  <Input id="name" name="name" required placeholder={t("form.name.placeholder") ?? undefined} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("form.email.label")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("form.email.placeholder") ?? undefined}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">{t("form.address.label")}</Label>
                  <Input
                    id="addressLine1"
                    name="addressLine1"
                    required
                    placeholder={t("form.address.placeholder") ?? undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">{t("form.city.label")}</Label>
                  <Input id="city" name="city" required placeholder={t("form.city.placeholder") ?? undefined} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">{t("form.postalCode.label")}</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    required
                    placeholder={t("form.postalCode.placeholder") ?? undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("form.phone.label")}</Label>
                  <Input id="phone" name="phone" placeholder={t("form.phone.placeholder") ?? undefined} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">{t("form.company.label")}</Label>
                  <Input id="company" name="company" placeholder={t("form.company.placeholder") ?? undefined} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">{t("form.vat.label")}</Label>
                  <Input id="vatNumber" name="vatNumber" placeholder={t("form.vat.placeholder") ?? undefined} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t("form.notes.label")}</Label>
                <Textarea id="notes" name="notes" rows={3} placeholder={t("form.notes.placeholder") ?? undefined} />
              </div>

              <div className={cn("rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4", "flex flex-col gap-2")}
              >
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <ShieldCheck className="h-5 w-5 text-orange" />
                  <span>{t("form.security")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <UserCheck className="h-5 w-5 text-orange" />
                  <span>{t("form.assistance")}</span>
                </div>
              </div>

              {error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

              <Button type="submit" className="w-full bg-orange text-white hover:bg-orange/90" disabled={isLoading}>
                {isLoading ? t("form.submit.loading") : t("form.submit.label", { price: PRODUCT_PRICE })}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <Card className="flex flex-col justify-between p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange">
                  {t("summary.badge")}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-navy">{t("summary.title")}</h2>
                <p className="mt-2 text-sm text-gray-600">{t("summary.subtitle")}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-orange/10 via-white to-sky-blue/10 p-6 text-left">
                <p className="text-sm font-semibold text-gray-600">{t("summary.plan")}</p>
                <p className="mt-2 text-4xl font-bold text-navy">
                  {PRODUCT_PRICE}
                  <span className="ml-1 text-base font-medium text-gray-500">{t("summary.yearly")}</span>
                </p>
                <p className="mt-4 text-sm text-gray-700">{t("summary.description")}</p>
              </div>

              <ul className="space-y-3 text-sm text-gray-700">
                {t.raw("summary.features").map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white/70 p-4 text-sm text-gray-600">
              <p className="font-semibold text-navy">{t("summary.help.title")}</p>
              <p className="mt-1">{t("summary.help.description")}</p>
              <p className="mt-2 text-xs text-gray-500">{t("summary.help.notice")}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
