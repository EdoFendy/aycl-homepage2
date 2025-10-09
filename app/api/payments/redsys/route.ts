import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { loadRedsysConfig } from "@/lib/redsys/config"
import { buildPaymentPayload, getGatewayUrl, type RedsysPaymentParams } from "@/lib/redsys/gateway"
import {
  formatRedsysAmount,
  generateRedsysOrderId,
  redsysAmountSchema,
  redsysOrderIdSchema,
  sanitizeRedsysText,
} from "@/lib/redsys/validation"

const requestSchema = z
  .object({
    amount: redsysAmountSchema,
    description: z.string().optional(),
    customerName: z.string().optional(),
    orderId: redsysOrderIdSchema.optional(),
    urlOk: z.string().url().optional(),
    urlKo: z.string().url().optional(),
  })
  .transform((data) => ({
    ...data,
    description: sanitizeRedsysText(data.description, 125),
    customerName: sanitizeRedsysText(data.customerName, 60),
  }))
  .superRefine((data, ctx) => {
    if (data.description && data.description.length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La descrizione deve contenere almeno 5 caratteri" })
    }

    if (data.customerName && data.customerName.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nome cliente troppo corto" })
    }
  })

const CURRENCY = "978"
const TRANSACTION_TYPE = "0"

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
  const orderId = parsed.data.orderId ?? generateRedsysOrderId()

  const formattedAmount = formatRedsysAmount(amountCents)

  const merchantParams = {
    DS_MERCHANT_AMOUNT: formattedAmount,
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_CURRENCY: CURRENCY,
    DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPE,
    DS_MERCHANT_URLOK: parsed.data.urlOk ?? config.successUrl ?? buildDefaultUrl(request, "/pagamenti/esito/successo"),
    DS_MERCHANT_URLKO: parsed.data.urlKo ?? config.failureUrl ?? buildDefaultUrl(request, "/pagamenti/esito/errore"),
    DS_MERCHANT_MERCHANTURL: config.notifyUrl ?? buildDefaultUrl(request, "/api/payments/redsys/notify"),
    DS_MERCHANT_PRODUCTDESCRIPTION: parsed.data.description,
    DS_MERCHANT_TITULAR: parsed.data.customerName,
  }

  const cleanedParams = Object.fromEntries(
    Object.entries(merchantParams).filter(([, value]) => value !== undefined && value !== null)
  ) as RedsysPaymentParams

  const { Ds_MerchantParameters, Ds_Signature, Ds_SignatureVersion } = buildPaymentPayload(config, cleanedParams)

  return NextResponse.json({
    gatewayUrl: getGatewayUrl(config.environment),
    fields: {
      Ds_SignatureVersion,
      Ds_MerchantParameters,
      Ds_Signature,
    },
    orderId,
    amountCents,
    formattedAmount,
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
