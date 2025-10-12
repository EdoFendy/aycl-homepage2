import crypto from "node:crypto"

export const REDSYS_SIGNATURE_VERSION = "HMAC_SHA256_V1"
const REDSYS_TRANSACTION_TYPE = "0"
const DEFAULT_REDSYS_URL = "https://sis.redsys.es/sis/realizarPago"
const DEFAULT_CURRENCY = "978"
const LANGUAGE_IT = "003"

export interface RedsysCustomerData {
  name: string
  email: string
  company?: string
  vatNumber?: string
  phone?: string
  notes?: string
  addressLine1?: string
  city?: string
  postalCode?: string
}

export interface RedsysConfig {
  secretKey: string
  merchantCode: string
  terminal: string
  merchantName: string
  notificationUrl: string
  successUrl: string
  failureUrl: string
  merchantTitular?: string
  environmentUrl?: string
  currency?: string
  productDescription?: string
  merchantData?: string
  consumerLanguage?: string
  module?: string
  payMethods?: string
  merchantBrandName?: string
  emv3dsData?: string
  additionalParameters?: Record<string, string | number>
}

export interface RedsysPaymentRequestOptions {
  amountInEuro: number
  order?: string
  customer: RedsysCustomerData
}

export interface RedsysGatewayForm {
  url: string
  order: string
  fields: Record<string, string>
  rawParameters: Record<string, string | number>
}

export interface RedsysMerchantParameters extends Record<string, string | number | undefined> {
  DS_MERCHANT_AMOUNT: string
  DS_MERCHANT_ORDER: string
  DS_MERCHANT_MERCHANTCODE: string
  DS_MERCHANT_CURRENCY: string | number
  DS_MERCHANT_TRANSACTIONTYPE: string
  DS_MERCHANT_TERMINAL: string
  DS_MERCHANT_URLOK: string
  DS_MERCHANT_URLKO: string
  DS_MERCHANT_MERCHANTURL: string
  DS_MERCHANT_MERCHANTNAME?: string
  DS_MERCHANT_TITULAR?: string
  DS_MERCHANT_PRODUCTDESCRIPTION?: string
  DS_MERCHANT_CONSUMERLANGUAGE?: string
  DS_MERCHANT_MERCHANTDATA?: string
  DS_MERCHANT_MODULE?: string
  DS_MERCHANT_PAYMETHODS?: string
  DS_MERCHANT_MERCHANDNAME?: string
  Ds_Merchant_EMV3DS?: string
}

export interface RedsysDecodedNotification extends Record<string, unknown> {
  Ds_Response?: string
  Ds_Order?: string
  Ds_AuthorisationCode?: string
  Ds_Currency?: string
  Ds_Amount?: string
}

function toMinorUnits(amountInEuro: number): string {
  const cents = Math.round(amountInEuro * 100)
  return cents.toString()
}

function padTo8(buffer: Buffer): Buffer {
  const blockSize = 8
  const paddingLength = blockSize - (buffer.length % blockSize || blockSize)
  const padding = Buffer.alloc(paddingLength, paddingLength)
  return Buffer.concat([buffer, padding])
}

function create3DesKey(order: string, secretKey: string): Buffer {
  const key = Buffer.from(secretKey, "base64")
  const iv = Buffer.alloc(8, 0)
  const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv)
  cipher.setAutoPadding(false)
  const orderBuffer = Buffer.from(order, "utf8")
  const paddedOrder = padTo8(orderBuffer)
  return Buffer.concat([cipher.update(paddedOrder), cipher.final()])
}

function normaliseSignature(signature: string): string {
  return signature.replace(/\+/g, "-").replace(/\//g, "_")
}

function revertSignature(signature: string): string {
  return signature.replace(/-/g, "+").replace(/_/g, "/")
}

export function encodeMerchantParameters(parameters: RedsysMerchantParameters): string {
  const json = JSON.stringify(parameters)
  return Buffer.from(json, "utf8").toString("base64")
}

export function createMerchantSignature(
  encodedParameters: string,
  order: string,
  secretKey: string,
): string {
  const derivedKey = create3DesKey(order, secretKey)
  const hmac = crypto.createHmac("sha256", derivedKey)
  hmac.update(encodedParameters)
  const signature = hmac.digest("base64")
  return normaliseSignature(signature)
}

function assertConfig(config: RedsysConfig): void {
  const required: Array<keyof RedsysConfig> = [
    "secretKey",
    "merchantCode",
    "terminal",
    "merchantName",
    "notificationUrl",
    "successUrl",
    "failureUrl",
  ]

  const missing = required.filter((key) => !config[key])
  if (missing.length > 0) {
    throw new Error(`Configurazione Redsys incompleta: ${missing.join(", ")}`)
  }
}

function buildMerchantData(customer: RedsysCustomerData, provided?: string): string | undefined {
  const baseData = {
    name: customer.name,
    email: customer.email,
    company: customer.company ?? null,
    vatNumber: customer.vatNumber ?? null,
    phone: customer.phone ?? null,
    notes: customer.notes ?? null,
  }

  if (provided) {
    return provided
  }

  return JSON.stringify(baseData)
}

export function createEmv3dsPayload(customer: RedsysCustomerData): string | undefined {
  const address = customer.addressLine1?.trim()
  const city = customer.city?.trim()
  const postalCode = customer.postalCode?.trim()
  const email = customer.email.trim()

  if (!address || !city || !postalCode || !email) {
    return undefined
  }

  const payload = {
    addrMatch: "Y",
    billAddrCity: city,
    billAddrLine1: address,
    billAddrPostCode: postalCode,
    email,
    acctInfo: {
      chAccAgeInd: "01",
    },
  }

  return JSON.stringify(payload)
}

export function createPaymentForm(
  options: RedsysPaymentRequestOptions,
  config: RedsysConfig,
): RedsysGatewayForm {
  assertConfig(config)

  const order = options.order ?? generateOrderNumber()
  const amount = toMinorUnits(options.amountInEuro)
  const currency = config.currency ?? DEFAULT_CURRENCY
  const consumerLanguage = config.consumerLanguage ?? LANGUAGE_IT
  const merchantData = buildMerchantData(options.customer, config.merchantData)

  const merchantParameters: RedsysMerchantParameters = {
    DS_MERCHANT_AMOUNT: amount,
    DS_MERCHANT_ORDER: order,
    DS_MERCHANT_MERCHANTCODE: config.merchantCode,
    DS_MERCHANT_CURRENCY: currency,
    DS_MERCHANT_TRANSACTIONTYPE: REDSYS_TRANSACTION_TYPE,
    DS_MERCHANT_TERMINAL: config.terminal,
    DS_MERCHANT_URLOK: config.successUrl,
    DS_MERCHANT_URLKO: config.failureUrl,
    DS_MERCHANT_MERCHANTURL: config.notificationUrl,
  }

  if (config.merchantName !== undefined) {
    merchantParameters.DS_MERCHANT_MERCHANTNAME = config.merchantName
  }

  if (config.merchantTitular !== undefined) {
    merchantParameters.DS_MERCHANT_TITULAR = config.merchantTitular
  }

  if (config.productDescription !== undefined) {
    merchantParameters.DS_MERCHANT_PRODUCTDESCRIPTION = config.productDescription
  }

  if (consumerLanguage !== undefined) {
    merchantParameters.DS_MERCHANT_CONSUMERLANGUAGE = consumerLanguage
  }

  if (merchantData !== undefined) {
    merchantParameters.DS_MERCHANT_MERCHANTDATA = merchantData
  }

  if (config.module !== undefined) {
    merchantParameters.DS_MERCHANT_MODULE = config.module
  }

  if (config.payMethods !== undefined) {
    merchantParameters.DS_MERCHANT_PAYMETHODS = config.payMethods
  }

  if (config.merchantBrandName !== undefined) {
    merchantParameters.DS_MERCHANT_MERCHANDNAME = config.merchantBrandName
  }

  if (config.emv3dsData !== undefined) {
    merchantParameters.Ds_Merchant_EMV3DS = config.emv3dsData
  }

  if (config.additionalParameters) {
    for (const [key, value] of Object.entries(config.additionalParameters)) {
      if (value !== undefined) {
        merchantParameters[key] = value
      }
    }
  }

  const encodedParameters = encodeMerchantParameters(merchantParameters)
  const signature = createMerchantSignature(encodedParameters, order, config.secretKey)

  return {
    url: config.environmentUrl ?? DEFAULT_REDSYS_URL,
    order,
    rawParameters: merchantParameters,
    fields: {
      Ds_SignatureVersion: REDSYS_SIGNATURE_VERSION,
      Ds_MerchantParameters: encodedParameters,
      Ds_Signature: signature,
    },
  }
}

export function decodeMerchantParameters(encoded: string): RedsysDecodedNotification {
  const decoded = Buffer.from(encoded, "base64").toString("utf8")
  return JSON.parse(decoded)
}

export function verifyNotificationSignature(
  encodedParameters: string,
  signature: string,
  secretKey: string,
): { isValid: boolean; expectedSignature: string; order?: string } {
  const parameters = decodeMerchantParameters(encodedParameters)
  const order =
    (parameters.Ds_Order as string | undefined) ??
    (parameters.DS_MERCHANT_ORDER as string | undefined)

  if (!order) {
    return { isValid: false, expectedSignature: "", order: undefined }
  }

  const expectedSignature = createMerchantSignature(encodedParameters, order, secretKey)
  const expectedBuffer = Buffer.from(revertSignature(expectedSignature), "base64")
  const receivedBuffer = Buffer.from(revertSignature(signature), "base64")

  const isValid =
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer)

  return { isValid, expectedSignature, order }
}

export function generateOrderNumber(): string {
  const now = new Date()
  const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}${now
    .getDate()
    .toString()
    .padStart(2, "0")}${now.getHours().toString().padStart(2, "0")}${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  return (timestamp + random).slice(-12)
}

export function parseRedsysResponse(encoded: string): RedsysDecodedNotification {
  return decodeMerchantParameters(encoded)
}

export function normaliseIncomingSignature(signature: string): string {
  return revertSignature(signature)
}
