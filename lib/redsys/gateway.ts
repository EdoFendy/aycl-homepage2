import { createCipheriv, createHmac } from "crypto"

import type { RedsysConfig } from "./config"

type OptionalString<T extends string> = Partial<Record<T, string | undefined>>

type OptionalPaymentFields = OptionalString<
  | "DS_MERCHANT_MERCHANTURL"
  | "DS_MERCHANT_PRODUCTDESCRIPTION"
  | "DS_MERCHANT_TITULAR"
  | "DS_MERCHANT_MERCHANTNAME"
  | "DS_MERCHANT_PAYMETHODS"
  | "DS_MERCHANT_CONSUMERLANGUAGE"
  | "DS_MERCHANT_EMV3DS"
  | "DS_MERCHANT_EXCEP_SCA"
  | "DS_MERCHANT_PAN"
  | "DS_MERCHANT_EXPIRYDATE"
  | "DS_MERCHANT_CVV2"
  | "DS_MERCHANT_COF_TXNID"
  | "DS_MERCHANT_COF_TYPE"
  | "DS_MERCHANT_COF_INI"
  | "DS_MERCHANT_COF_FIN"
  | "DS_MERCHANT_COF_TDS2"
>

export type RedsysPaymentParams = {
  DS_MERCHANT_AMOUNT: string
  DS_MERCHANT_ORDER: string
  DS_MERCHANT_MERCHANTCODE: string
  DS_MERCHANT_CURRENCY: string
  DS_MERCHANT_TRANSACTIONTYPE: string
  DS_MERCHANT_TERMINAL: string
  DS_MERCHANT_URLOK: string
  DS_MERCHANT_URLKO: string
} & OptionalPaymentFields

export type RedsysNotification = {
  Ds_SignatureVersion: string
  Ds_MerchantParameters: string
  Ds_Signature: string
}

// EMV3DS types according to BBVA specification
export type EMV3DSData = {
  // Cardholder information
  cardholderName?: string
  email?: string
  mobilePhone?: {
    cc: string
    subscriber: string
  }
  
  // Address information
  shipAddrLine1?: string
  shipAddrLine2?: string
  shipAddrLine3?: string
  shipAddrCity?: string
  shipAddrState?: string
  shipAddrPostCode?: string
  shipAddrCountry?: string
  
  // Transaction information
  transType?: "01" | "03" | "10" | "11" | "28"
  transCategory?: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59" | "60" | "61" | "62" | "63" | "64" | "65" | "66" | "67" | "68" | "69" | "70" | "71" | "72" | "73" | "74" | "75" | "76" | "77" | "78" | "79" | "80" | "81" | "82" | "83" | "84" | "85" | "86" | "87" | "88" | "89" | "90" | "91" | "92" | "93" | "94" | "95" | "96" | "97" | "98" | "99"
  
  // Browser information
  browserAcceptHeader?: string
  browserUserAgent?: string
  browserLanguage?: string
  browserColorDepth?: string
  browserScreenHeight?: string
  browserScreenWidth?: string
  browserTZ?: string
  browserJavaEnabled?: boolean
  
  // Account information
  acctID?: string
  acctInfo?: {
    chAccAgeInd?: "01" | "02" | "03" | "04" | "05"
    chAccChange?: "01" | "02" | "03" | "04" | "05"
    chAccChangeInd?: "01" | "02" | "03" | "04" | "05"
    chAccDate?: string
    chAccPwChange?: "01" | "02" | "03" | "04" | "05"
    chAccPwChangeInd?: "01" | "02" | "03" | "04" | "05"
    nbPurchaseAccount?: string
    provisionAttemptsDay?: string
    txnActivityDay?: string
    txnActivityYear?: string
    paymentAccAge?: "01" | "02" | "03" | "04" | "05"
    paymentAccInd?: "01" | "02" | "03" | "04" | "05"
    shipAddressUsage?: "01" | "02" | "03" | "04" | "05"
    shipAddressUsageInd?: "01" | "02" | "03" | "04" | "05"
    shipNameIndicator?: "01" | "02" | "03" | "04" | "05"
    suspiciousAccActivity?: "01" | "02"
  }
  
  // Merchant information
  merchantRiskIndicator?: {
    deliveryEmailAddress?: "01" | "02" | "03" | "04" | "05"
    deliveryTimeframe?: "01" | "02" | "03" | "04" | "05"
    giftCardAmount?: string
    giftCardCount?: string
    giftCardCurr?: string
    preOrderDate?: string
    preOrderPurchaseInd?: "01" | "02" | "03" | "04" | "05"
    reorderItemsInd?: "01" | "02" | "03" | "04" | "05"
    shipIndicator?: "01" | "02" | "03" | "04" | "05"
  }
  
  // ThreeDSRequestor information
  threeDSRequestor?: {
    threeDSRequestorID?: string
    threeDSRequestorName?: string
    threeDSRequestorURL?: string
  }
}

// SCA Exception types according to PSD2
export type SCAException = "MIT" | "LWV" | "TRA" | "COR"

// COF (Card-on-File) types
export type COFType = "I" | "R" | "U" | "C" | "M"
export type COFIni = "S" | "N" | "Y"
export type COFFin = "S" | "N" | "Y"
export type COFTDS2 = "S" | "N" | "Y"

export const SIGNATURE_VERSION = "HMAC_SHA256_V1"
export const REDSYS_ENDPOINTS = {
  test: "https://sis-t.redsys.es:25443/sis/realizarPago",
  live: "https://sis.redsys.es/sis/realizarPago",
} as const

function sanitizeParams(params: RedsysPaymentParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ) as RedsysPaymentParams
}

export function encodeMerchantParameters(params: Record<string, any>) {
  // Rimuovi valori undefined e null
  const sanitized = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  )
  
  // Ordina le chiavi per garantire consistenza
  const sortedKeys = Object.keys(sanitized).sort()
  const orderedParams: Record<string, any> = {}
  
  for (const key of sortedKeys) {
    orderedParams[key] = sanitized[key]
  }
  
  return Buffer.from(JSON.stringify(orderedParams), "utf8").toString("base64")
}

function getCipherKey(secret: string, order: string) {
  const key = Buffer.from(secret, "base64")
  if (key.length !== 24) {
    throw new Error("La chiave segreta Redsys deve essere una stringa Base64 valida a 24 byte")
  }
  const iv = Buffer.alloc(8, 0)
  const cipher = createCipheriv("des-ede3-cbc", key, iv)
  cipher.setAutoPadding(true)
  const encrypted = Buffer.concat([cipher.update(order, "utf8"), cipher.final()])
  return encrypted
}

export function createMerchantSignature(secret: string, params: Record<string, string>) {
  const Ds_MerchantParameters = encodeMerchantParameters(params)
  const key = getCipherKey(secret, params.DS_MERCHANT_ORDER)
  const hmac = createHmac("sha256", key)
  hmac.update(Buffer.from(Ds_MerchantParameters, "base64"))
  const signature = hmac.digest("base64")
  return {
    Ds_MerchantParameters,
    Ds_Signature: signature,
  }
}

export function createMerchantSignatureFromBase64(secret: string, merchantParameters: string, order: string) {
  const key = getCipherKey(secret, order)
  const hmac = createHmac("sha256", key)
  hmac.update(Buffer.from(merchantParameters, "base64"))
  return hmac.digest("base64")
}

export function decodeMerchantParameters<T = Record<string, unknown>>(merchantParameters: string) {
  const decoded = Buffer.from(merchantParameters, "base64").toString("utf8")
  return JSON.parse(decoded) as T
}

export function verifyNotification(secret: string, notification: RedsysNotification) {
  const merchantParameters = notification.Ds_MerchantParameters
  const decoded = decodeMerchantParameters<{ Ds_Order?: string; DS_ORDER?: string }>(merchantParameters)
  const order = decoded.Ds_Order ?? decoded.DS_ORDER
  if (!order) {
    throw new Error("Parametro Ds_Order mancante nella notifica Redsys")
  }
  const expectedSignature = normalizeBase64(
    createMerchantSignatureFromBase64(secret, merchantParameters, order),
  )
  const received = normalizeBase64(notification.Ds_Signature)
  return {
    isValid: expectedSignature === received,
    decoded,
  }
}

function normalizeBase64(value: string) {
  const stripped = value.replace(/\s+/g, "")
  const normalized = stripped.replace(/-/g, "+").replace(/_/g, "/")
  const padding = normalized.length % 4 === 0 ? 0 : 4 - (normalized.length % 4)
  return normalized.padEnd(normalized.length + padding, "=")
}

export function buildPaymentPayload(
  config: RedsysConfig,
  params: Record<string, string>,
) {
  const basePayload: RedsysPaymentParams = {
    ...params,
    DS_MERCHANT_MERCHANTCODE: config.merchantCode,
    DS_MERCHANT_TERMINAL: config.terminal,
    DS_MERCHANT_PAYMETHODS: config.payMethods,
  }
  if (config.merchantName && !basePayload.DS_MERCHANT_MERCHANTNAME) {
    basePayload.DS_MERCHANT_MERCHANTNAME = config.merchantName
  }
  const signatureData = createMerchantSignature(config.secret, basePayload)
  return {
    Ds_SignatureVersion: SIGNATURE_VERSION,
    ...signatureData,
  }
}

export function getGatewayUrl(environment: RedsysConfig["environment"]) {
  return REDSYS_ENDPOINTS[environment]
}

/**
 * Creates EMV3DS data for PSD2 compliance
 * This data helps the issuer perform risk analysis
 */
export function createEMV3DSData(data: EMV3DSData): string {
  // Remove undefined values and return JSON string
  const cleaned = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  )
  return JSON.stringify(cleaned)
}

/**
 * Creates COF (Card-on-File) data for recurring payments
 */
export function createCOFData(params: {
  type: COFType
  ini: COFIni
  fin: COFFin
  tds2: COFTDS2
  txnId?: string
}): Record<string, string> {
  const cofData: Record<string, string> = {
    DS_MERCHANT_COF_TYPE: params.type,
    DS_MERCHANT_COF_INI: params.ini,
    DS_MERCHANT_COF_FIN: params.fin,
    DS_MERCHANT_COF_TDS2: params.tds2,
  }
  
  if (params.txnId) {
    cofData.DS_MERCHANT_COF_TXNID = params.txnId
  }
  
  return cofData
}

/**
 * Creates MIT (Merchant Initiated Transaction) data
 * Used for recurring payments initiated by the merchant
 */
export function createMITData(params: {
  cofType: COFType
  cofIni: COFIni
  cofFin: COFFin
  cofTds2: COFTDS2
  originalTxnId?: string
}): Record<string, string> {
  return {
    DS_MERCHANT_EXCEP_SCA: "MIT",
    ...createCOFData({
      type: params.cofType,
      ini: params.cofIni,
      fin: params.cofFin,
      tds2: params.cofTds2,
      txnId: params.originalTxnId,
    }),
  }
}

/**
 * Creates TRA (Transaction Risk Analysis) exception data
 * Used when merchant has risk analysis system
 */
export function createTRAData(): Record<string, string> {
  return {
    DS_MERCHANT_EXCEP_SCA: "TRA",
  }
}

/**
 * Creates LWV (Low Value) exception data
 * For transactions under 30€ with limits
 */
export function createLWVData(): Record<string, string> {
  return {
    DS_MERCHANT_EXCEP_SCA: "LWV",
  }
}

/**
 * Creates COR (Corporate) exception data
 * For corporate secure payment protocols
 */
export function createCORData(): Record<string, string> {
  return {
    DS_MERCHANT_EXCEP_SCA: "COR",
  }
}
