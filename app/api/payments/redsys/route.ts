import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { loadRedsysConfig } from "@/lib/redsys/config"
import { 
  buildPaymentPayload, 
  getGatewayUrl, 
  createEMV3DSData, 
  createTRAData, 
  createLWVData,
  createMITData,
  type EMV3DSData 
} from "@/lib/redsys/gateway"

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
  // EMV3DS fields
  emv3ds: z.object({
    cardholderName: z.string().trim().max(45).optional(),
    email: z.string().email().max(254).optional(),
    mobilePhone: z.object({
      cc: z.string().trim().max(3),
      subscriber: z.string().trim().max(15),
    }).optional(),
    shipAddrLine1: z.string().trim().max(50).optional(),
    shipAddrLine2: z.string().trim().max(50).optional(),
    shipAddrLine3: z.string().trim().max(50).optional(),
    shipAddrCity: z.string().trim().max(50).optional(),
    shipAddrState: z.string().trim().max(3).optional(),
    shipAddrPostCode: z.string().trim().max(16).optional(),
    shipAddrCountry: z.string().trim().max(3).optional(),
    transType: z.enum(["01", "03", "10", "11", "28"]).optional(),
    transCategory: z.enum(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"]).optional(),
    browserAcceptHeader: z.string().trim().max(2048).optional(),
    browserUserAgent: z.string().trim().max(2048).optional(),
    browserLanguage: z.string().trim().max(8).optional(),
    browserColorDepth: z.string().trim().max(4).optional(),
    browserScreenHeight: z.string().trim().max(6).optional(),
    browserScreenWidth: z.string().trim().max(6).optional(),
    browserTZ: z.string().trim().max(5).optional(),
    browserJavaEnabled: z.boolean().optional(),
  }).optional(),
  // SCA Exception
  scaException: z.enum(["MIT", "LWV", "TRA", "COR"]).optional(),
  // COF data for recurring payments
  cofData: z.object({
    type: z.enum(["I", "R", "U", "C", "M"]),
    ini: z.enum(["S", "N", "Y"]),
    fin: z.enum(["S", "N", "Y"]),
    tds2: z.enum(["S", "N", "Y"]),
    txnId: z.string().trim().max(40).optional(),
  }).optional(),
})

const CURRENCY = "978"
const TRANSACTION_TYPE = "0"
const CONSUMER_LANGUAGE = "7"

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

  const merchantParams: Record<string, string> = {
    DS_MERCHANT_AMOUNT: String(amountCents),
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_CURRENCY: CURRENCY,
    DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPE,
    DS_MERCHANT_CONSUMERLANGUAGE: config.consumerLanguage,
    DS_MERCHANT_URLOK: parsed.data.urlOk ?? config.successUrl ?? buildDefaultUrl(request, "/pagamenti/esito/successo"),
    DS_MERCHANT_URLKO: parsed.data.urlKo ?? config.failureUrl ?? buildDefaultUrl(request, "/pagamenti/esito/errore"),
    DS_MERCHANT_MERCHANTURL: config.notifyUrl ?? buildDefaultUrl(request, "/api/payments/redsys/notify"),
    ...(parsed.data.description && { DS_MERCHANT_PRODUCTDESCRIPTION: parsed.data.description }),
    ...(parsed.data.customerName && { DS_MERCHANT_TITULAR: parsed.data.customerName }),
  }

  // Add EMV3DS data if enabled and provided
  if (config.enableEMV3DS && parsed.data.emv3ds) {
    const emv3dsData: EMV3DSData = {
      ...parsed.data.emv3ds,
      // Add 3DS Requestor info from config
      threeDSRequestor: {
        threeDSRequestorID: config.threeDSRequestorID,
        threeDSRequestorName: config.threeDSRequestorName,
        threeDSRequestorURL: config.threeDSRequestorURL,
      },
    }
    merchantParams.DS_MERCHANT_EMV3DS = createEMV3DSData(emv3dsData)
  }

  // Add SCA Exception if enabled and provided
  if (config.enableSCAExceptions && parsed.data.scaException) {
    switch (parsed.data.scaException) {
      case "TRA":
        Object.assign(merchantParams, createTRAData())
        break
      case "LWV":
        Object.assign(merchantParams, createLWVData())
        break
      case "MIT":
        if (parsed.data.cofData) {
          Object.assign(merchantParams, createMITData({
            cofType: parsed.data.cofData.type,
            cofIni: parsed.data.cofData.ini,
            cofFin: parsed.data.cofData.fin,
            cofTds2: parsed.data.cofData.tds2,
            originalTxnId: parsed.data.cofData.txnId,
          }))
        }
        break
      case "COR":
        Object.assign(merchantParams, { DS_MERCHANT_EXCEP_SCA: "COR" })
        break
    }
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
    emv3dsEnabled: config.enableEMV3DS,
    scaExceptionsEnabled: config.enableSCAExceptions,
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
    emv3dsEnabled: config.enableEMV3DS,
    scaExceptionsEnabled: config.enableSCAExceptions,
    consumerLanguage: config.consumerLanguage,
    payMethods: config.payMethods,
  })
}
