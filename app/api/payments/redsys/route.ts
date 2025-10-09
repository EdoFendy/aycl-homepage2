import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { loadRedsysConfig } from "@/lib/redsys/config"
import { buildPaymentPayload, getGatewayUrl } from "@/lib/redsys/gateway"

const amountSchema = z
  .union([z.string(), z.number()])
  .transform((value, ctx) => {
    if (typeof value === "number") {
      if (!Number.isFinite(value) || value <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "L'importo deve essere maggiore di zero" })
        return z.NEVER
      }
      const cents = Math.round(value * 100)
      if (cents <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Importo non valido" })
        return z.NEVER
      }
      return cents
    }

    const normalized = value.replace(/,/g, ".").replace(/\s+/g, "").trim()
    if (!/^\d+(?:\.\d{1,2})?$/u.test(normalized)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Formato importo non valido" })
      return z.NEVER
    }
    const euros = Number.parseFloat(normalized)
    if (!Number.isFinite(euros) || euros <= 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "L'importo deve essere maggiore di zero" })
      return z.NEVER
    }
    return Math.round(euros * 100)
  })
  .pipe(z.number().int().positive().max(9_999_999_99))

const requestSchema = z.object({
  amount: amountSchema,
  description: z.string().trim().min(1).max(125).optional(),
  customerName: z.string().trim().min(1).max(60).optional(),
  orderId: z.string().trim().regex(/^\d{4,12}$/u, "orderId deve contenere 4-12 cifre").optional(),
  urlOk: z.string().url().optional(),
  urlKo: z.string().url().optional(),
})

const CURRENCY = "978"
const TRANSACTION_TYPE = "0"

function generateOrderId() {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, "0")
  return `${timestamp}${random}`.slice(-12)
}

function buildDefaultUrl(request: NextRequest, path: string) {
  const origin = request.nextUrl.origin
  return new URL(path, origin).toString()
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null)
  const parsed = requestSchema.safeParse(payload)
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dati non validi"
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const env = loadRedsysConfig()
  if (!env.success) {
    return NextResponse.json({ error: "Configurazione Redsys non valida", details: env.error.format() }, { status: 500 })
  }

  const config = env.data
  const amountCents = parsed.data.amount
  const orderId = parsed.data.orderId ?? generateOrderId()

  const merchantParams = {
    DS_MERCHANT_AMOUNT: String(amountCents),
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_CURRENCY: CURRENCY,
    DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPE,
    DS_MERCHANT_URLOK: parsed.data.urlOk ?? config.successUrl ?? buildDefaultUrl(request, "/pagamenti/esito/successo"),
    DS_MERCHANT_URLKO: parsed.data.urlKo ?? config.failureUrl ?? buildDefaultUrl(request, "/pagamenti/esito/errore"),
    DS_MERCHANT_MERCHANTURL: config.notifyUrl ?? buildDefaultUrl(request, "/api/payments/redsys/notify"),
    DS_MERCHANT_PRODUCTDESCRIPTION: parsed.data.description,
    DS_MERCHANT_TITULAR: parsed.data.customerName,
  }

  const { Ds_MerchantParameters, Ds_Signature, Ds_SignatureVersion } = buildPaymentPayload(config, merchantParams)

  return NextResponse.json({
    gatewayUrl: getGatewayUrl(config.environment),
    fields: {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature,
    },
    orderId,
    amountCents,
    environment: config.environment,
  })
}

export async function GET(request: NextRequest) {
  const env = loadRedsysConfig()
  if (!env.success) {
    return NextResponse.json({ configured: false, error: env.error.format() }, { status: 500 })
  }

  const config = env.data
  return NextResponse.json({
    configured: true,
    environment: config.environment,
    defaultUrlOk: config.successUrl ?? buildDefaultUrl(request, "/pagamenti/esito/successo"),
    defaultUrlKo: config.failureUrl ?? buildDefaultUrl(request, "/pagamenti/esito/errore"),
    notifyUrl: config.notifyUrl ?? buildDefaultUrl(request, "/api/payments/redsys/notify"),
  })
}
