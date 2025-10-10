"use client"

import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ShieldCheck, CreditCard, Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { redsysAmountSchema } from "@/lib/redsys/validation"

const paymentSchema = z.object({
  amount: z
    .string({ required_error: "Inserisci l'importo" })
    .superRefine((value, ctx) => {
      const parsed = redsysAmountSchema.safeParse(value)
      if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? "Importo non valido"
        ctx.addIssue({ code: z.ZodIssueCode.custom, message })
      }
    }),
  description: z
    .string({ required_error: "Inserisci la descrizione" })
    .min(5, "Almeno 5 caratteri")
    .max(125, "Massimo 125 caratteri"),
  customerName: z.string().max(60, "Massimo 60 caratteri").optional(),
  // EMV3DS fields
  email: z.string().email("Email non valida").optional(),
  phone: z.string().regex(/^\d{10,15}$/, "Numero di telefono non valido").optional(),
  address: z.string().max(50, "Massimo 50 caratteri").optional(),
  city: z.string().max(50, "Massimo 50 caratteri").optional(),
  postalCode: z.string().max(16, "Massimo 16 caratteri").optional(),
  country: z.string().max(3, "Massimo 3 caratteri").optional(),
  // SCA Exception
  scaException: z.enum(["MIT", "LWV", "TRA", "COR"]).optional(),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

type GatewayMetadata = {
  configured: boolean
  environment?: "test" | "live"
  defaultUrlOk?: string
  defaultUrlKo?: string
  notifyUrl?: string
}

type PaymentResponse = {
  gatewayUrl: string
  fields: {
    Ds_SignatureVersion: string
    Ds_MerchantParameters: string
    Ds_Signature: string
  }
  orderId: string
  amountCents: number
  environment: "test" | "live"
}

export default function PaymentPage() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: "",
      description: "",
      customerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "380", // Italia
      scaException: undefined,
    },
  })

  const [gatewayInfo, setGatewayInfo] = useState<GatewayMetadata>({ configured: false })
  const [loadingGateway, setLoadingGateway] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function loadGateway() {
      try {
        const response = await fetch("/api/payments/redsys", { method: "GET" })
        const data = await response.json()
        if (!isMounted) return
        if (!response.ok) {
          setGatewayInfo({ configured: false })
          setError("Configurazione Redsys non valida. Verifica le variabili d'ambiente.")
          return
        }
        setGatewayInfo(data)
      } catch (err) {
        console.error(err)
        if (isMounted) {
          setGatewayInfo({ configured: false })
          setError("Impossibile recuperare la configurazione del gateway.")
        }
      } finally {
        if (isMounted) {
          setLoadingGateway(false)
        }
      }
    }

    loadGateway()
    return () => {
      isMounted = false
    }
  }, [])

  const environmentLabel = useMemo(() => {
    if (loadingGateway) return "Verifica ambiente..."
    if (!gatewayInfo.configured) return "Gateway non configurato"
    return gatewayInfo.environment === "live" ? "Ambiente produzione" : "Ambiente test"
  }, [gatewayInfo, loadingGateway])

  const environmentBadgeClass = useMemo(() => {
    if (!gatewayInfo.configured) return "bg-gray-200 text-gray-700"
    return gatewayInfo.environment === "live"
      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
      : "bg-amber-50 text-amber-700 border border-amber-200"
  }, [gatewayInfo])

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null)
    setSubmitting(true)

    const payload = {
      amount: values.amount,
      description: values.description,
      customerName: values.customerName?.trim() || undefined,
      // EMV3DS data
      emv3ds: {
        cardholderName: values.customerName?.trim(),
        email: values.email?.trim(),
        mobilePhone: values.phone ? {
          cc: "39", // Italia
          subscriber: values.phone.replace(/^\+39/, "").replace(/^39/, "")
        } : undefined,
        shipAddrLine1: values.address?.trim(),
        shipAddrCity: values.city?.trim(),
        shipAddrPostCode: values.postalCode?.trim(),
        shipAddrCountry: values.country?.trim(),
        transType: "01", // Goods/Service Purchase
        transCategory: "01", // Retail
        browserAcceptHeader: "text/html,application/xhtml+xml",
        browserUserAgent: navigator.userAgent,
        browserLanguage: navigator.language,
        browserColorDepth: String(screen.colorDepth),
        browserScreenHeight: String(screen.height),
        browserScreenWidth: String(screen.width),
        browserTZ: String(-new Date().getTimezoneOffset()),
        browserJavaEnabled: false,
      },
      scaException: values.scaException,
    }

    try {
      const response = await fetch("/api/payments/redsys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? "Impossibile inizializzare il pagamento")
      }

      const data = (await response.json()) as PaymentResponse
      redirectToGateway(data)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "Errore inatteso")
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-sky-blue/10 to-white py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-sky-blue/20 to-transparent" />
      <div className="relative z-10 container mx-auto px-6 lg:px-10">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-2 text-sm font-semibold text-navy">
              <ShieldCheck className="h-4 w-4" />
              Pagamenti sicuri con Redsys
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight">
              Gestisci i pagamenti direttamente dal tuo spazio clienti
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Invia i dati richiesti e vieni reindirizzato alla pagina di pagamento di BBVA (Redsys) in modo sicuro e conforme
              agli standard PCI DSS.
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-[1.4fr,1fr] items-start">
            <Card className="p-8 shadow-xl border border-navy/10 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-navy">Avvia un pagamento</h2>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${environmentBadgeClass}`}>
                  {environmentLabel}
                </span>
              </div>

              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Importo</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="decimal"
                            placeholder="Es. 1990,00"
                            className="text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrizione pagamento</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={3}
                            maxLength={125}
                            placeholder="Indica il riferimento dell'ordine o del servizio"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intestatario (opzionale)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nome e cognome del pagatore" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="email@esempio.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefono (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="1234567890" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Indirizzo (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Via Roma 123" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Città (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Milano" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CAP (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="20100" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paese (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="380" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="scaException"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eccezione SCA (opzionale)</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full rounded-md border border-gray-300 px-3 py-2">
                            <option value="">Nessuna eccezione</option>
                            <option value="LWV">LWV - Basso valore (sotto 30€)</option>
                            <option value="TRA">TRA - Analisi del rischio</option>
                            <option value="MIT">MIT - Transazione iniziata dal commerciante</option>
                            <option value="COR">COR - Corporate</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    className="w-full bg-navy text-white hover:bg-navy/90"
                    disabled={submitting || !gatewayInfo.configured}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Reindirizzamento in corso...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Procedi al pagamento sicuro
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>

            <aside className="space-y-6">
              <Card className="p-6 bg-white/80 border border-navy/10">
                <div className="flex items-center gap-3 text-navy mb-4">
                  <Lock className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Come funziona</h3>
                </div>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li>
                    <span className="font-semibold text-navy">1.</span> Compila l'importo e la causale. I dati EMV3DS opzionali aiutano a ridurre l'attrito nei pagamenti.
                  </li>
                  <li>
                    <span className="font-semibold text-navy">2.</span> Invio sicuro dei dati firmati digitalmente verso l'ambiente BBVA tramite HMAC-SHA256.
                  </li>
                  <li>
                    <span className="font-semibold text-navy">3.</span> Il cliente completa il pagamento direttamente sul portale Redsys con autenticazione 3D Secure quando richiesta.
                  </li>
                  <li>
                    <span className="font-semibold text-navy">4.</span> Le eccezioni SCA possono ridurre la necessità di autenticazione per transazioni a basso rischio.
                  </li>
                </ul>
                {gatewayInfo.notifyUrl ? (
                  <p className="mt-4 text-xs text-gray-500">
                    Notifica server-to-server attiva su <span className="font-semibold text-navy">{gatewayInfo.notifyUrl}</span>
                  </p>
                ) : null}
              </Card>

              <Card className="p-6 bg-gradient-to-br from-navy/90 to-navy text-white">
                <h3 className="text-lg font-semibold mb-2">Suggerimenti sicurezza</h3>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>• Utilizza l'ambiente di test con le carte fornite da BBVA prima di passare in produzione.</li>
                  <li>• I dati EMV3DS aiutano l'analisi del rischio e possono ridurre l'attrito nei pagamenti.</li>
                  <li>• Le eccezioni SCA devono essere autorizzate da BBVA e rispettano la regolamentazione PSD2.</li>
                  <li>• Proteggi la chiave segreta Redsys e ruotala periodicamente come da policy BBVA.</li>
                </ul>
              </Card>
            </aside>
          </section>
        </div>
      </div>
    </div>
  )
}

function redirectToGateway(response: PaymentResponse) {
  const form = document.createElement("form")
  form.method = "POST"
  form.action = response.gatewayUrl
  form.style.display = "none"

  Object.entries(response.fields).forEach(([name, value]) => {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = name
    input.value = value
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
}
