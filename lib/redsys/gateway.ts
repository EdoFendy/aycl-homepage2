import { createCipheriv, createHmac } from "crypto"

import type { RedsysConfig } from "./config"

export type RedsysPaymentParams = {
  DS_MERCHANT_AMOUNT: string
  DS_MERCHANT_ORDER: string
  DS_MERCHANT_MERCHANTCODE: string
  DS_MERCHANT_CURRENCY: string
  DS_MERCHANT_TRANSACTIONTYPE: string
  DS_MERCHANT_TERMINAL: string
  DS_MERCHANT_MERCHANTURL?: string
  DS_MERCHANT_URLOK: string
  DS_MERCHANT_URLKO: string
  DS_MERCHANT_PRODUCTDESCRIPTION?: string
  DS_MERCHANT_TITULAR?: string
  DS_MERCHANT_MERCHANTNAME?: string
}

export type RedsysNotification = {
  Ds_SignatureVersion: string
  Ds_MerchantParameters: string
  Ds_Signature: string
}

export const SIGNATURE_VERSION = "HMAC_SHA256_V1"
export const REDSYS_ENDPOINTS = {
  test: "https://sis-t.redsys.es:25443/sis/realizarPago",
  live: "https://sis.redsys.es/sis/realizarPago",
} as const

const BASE64_URL_CHARS: Record<string, string> = {
  "+": "-",
  "/": "_",
  "=": "",
}

function toBase64Url(value: string) {
  return value.replace(/[+/=]/g, (match) => BASE64_URL_CHARS[match] ?? match)
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
  const padding = normalized.length % 4 === 0 ? 0 : 4 - (normalized.length % 4)
  return normalized.padEnd(normalized.length + padding, "=")
}

export function encodeMerchantParameters(params: RedsysPaymentParams) {
  return Buffer.from(JSON.stringify(params), "utf8").toString("base64")
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

export function createMerchantSignature(secret: string, params: RedsysPaymentParams) {
  const Ds_MerchantParameters = encodeMerchantParameters(params)
  const key = getCipherKey(secret, params.DS_MERCHANT_ORDER)
  const hmac = createHmac("sha256", key)
  hmac.update(Buffer.from(Ds_MerchantParameters, "base64"))
  const signature = hmac.digest("base64")
  return {
    Ds_MerchantParameters,
    Ds_Signature: toBase64Url(signature),
  }
}

export function createMerchantSignatureFromBase64(secret: string, merchantParameters: string, order: string) {
  const key = getCipherKey(secret, order)
  const hmac = createHmac("sha256", key)
  hmac.update(Buffer.from(merchantParameters, "base64"))
  return toBase64Url(hmac.digest("base64"))
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
  const expectedSignature = createMerchantSignatureFromBase64(secret, merchantParameters, order)
  const received = toBase64Url(fromBase64Url(notification.Ds_Signature))
  return {
    isValid: expectedSignature === received,
    decoded,
  }
}

export function buildPaymentPayload(config: RedsysConfig, params: Omit<RedsysPaymentParams, "DS_MERCHANT_MERCHANTCODE" | "DS_MERCHANT_TERMINAL">) {
  const basePayload: RedsysPaymentParams = {
    ...params,
    DS_MERCHANT_MERCHANTCODE: config.merchantCode,
    DS_MERCHANT_TERMINAL: config.terminal,
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
