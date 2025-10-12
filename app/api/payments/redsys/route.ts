import { NextResponse } from "next/server"

import {
  createPaymentForm,
  generateOrderNumber,
  type RedsysCustomerData,
  createEmv3dsPayload,
} from "@/lib/payments/redsys"

const PRODUCT_AMOUNT_EURO = 3000
const PRODUCT_DESCRIPTION = "Abbonamento annuale AYCL - 3.000€"

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variabile d'ambiente mancante: ${name}`)
  }
  return value
}

function parseAdditionalParameters(
  raw: string | undefined,
): Record<string, string | number> | undefined {
  if (!raw) {
    return undefined
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const entries = Object.entries(parsed).filter(([, value]) => {
      return typeof value === "string" || typeof value === "number"
    }) as Array<[string, string | number]>

    if (entries.length === 0) {
      return undefined
    }

    return Object.fromEntries(entries)
  } catch (error) {
    console.error("Impossibile analizzare REDSYS_ADDITIONAL_PARAMETERS", error)
    return undefined
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json()

    const customer: RedsysCustomerData = {
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
      company: body.company ? String(body.company).trim() : undefined,
      vatNumber: body.vatNumber ? String(body.vatNumber).trim() : undefined,
      phone: body.phone ? String(body.phone).trim() : undefined,
      notes: body.notes ? String(body.notes).trim() : undefined,
      addressLine1: body.addressLine1 ? String(body.addressLine1).trim() : undefined,
      city: body.city ? String(body.city).trim() : undefined,
      postalCode: body.postalCode ? String(body.postalCode).trim() : undefined,
    }

    if (!customer.name || !customer.email) {
      return NextResponse.json(
        { message: "Nome ed email sono obbligatori" },
        { status: 400 },
      )
    }

    if (!customer.addressLine1 || !customer.city || !customer.postalCode) {
      return NextResponse.json(
        { message: "Indirizzo, città e CAP sono obbligatori" },
        { status: 400 },
      )
    }

    const secretKey = getEnv("REDSYS_SECRET_KEY")
    const merchantCode = getEnv("REDSYS_MERCHANT_CODE")
    const terminal = getEnv("REDSYS_TERMINAL")
    const merchantName = getEnv("REDSYS_MERCHANT_NAME")
    const notificationUrl = getEnv("REDSYS_NOTIFICATION_URL")
    const successUrl = getEnv("REDSYS_SUCCESS_URL")
    const failureUrl = getEnv("REDSYS_FAILURE_URL")

    const emv3dsData = createEmv3dsPayload(customer)

    const config = {
      secretKey,
      merchantCode,
      terminal,
      merchantName,
      notificationUrl,
      successUrl,
      failureUrl,
      merchantTitular: process.env.REDSYS_MERCHANT_TITULAR,
      environmentUrl: process.env.REDSYS_PRODUCTION_URL,
      currency: process.env.REDSYS_CURRENCY,
      productDescription: PRODUCT_DESCRIPTION,
      consumerLanguage: process.env.REDSYS_LANGUAGE,
      module: process.env.REDSYS_MODULE,
      payMethods: process.env.REDSYS_PAYMETHODS,
      merchantBrandName: process.env.REDSYS_MERCHANT_BRAND_NAME,
      emv3dsData,
      additionalParameters: parseAdditionalParameters(process.env.REDSYS_ADDITIONAL_PARAMETERS),
    } as const

    const order = generateOrderNumber()

    const form = createPaymentForm(
      {
        amountInEuro: PRODUCT_AMOUNT_EURO,
        order,
        customer,
      },
      config,
    )

    return NextResponse.json({
      url: form.url,
      order: form.order,
      fields: form.fields,
    })
  } catch (error) {
    console.error("Errore durante la creazione del pagamento Redsys", error)
    return NextResponse.json(
      { message: "Impossibile avviare il pagamento in questo momento" },
      { status: 500 },
    )
  }
}
