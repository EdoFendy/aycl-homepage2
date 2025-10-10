import { z } from "zod"

const envSchema = z.object({
  merchantCode: z
    .string({ required_error: "REDSYS_MERCHANT_CODE mancante" })
    .min(1, "REDSYS_MERCHANT_CODE mancante"),
  terminal: z
    .string()
    .min(1, "REDSYS_TERMINAL mancante")
    .regex(/^\d{1,3}$/u, "REDSYS_TERMINAL deve essere numerico"),
  secret: z
    .string({ required_error: "REDSYS_SECRET mancante" })
    .min(1, "REDSYS_SECRET mancante"),
  environment: z.enum(["test", "live"]).default("test"),
  notifyUrl: z.string().url().optional(),
  successUrl: z.string().url().optional(),
  failureUrl: z.string().url().optional(),
  merchantName: z.string().max(60).optional(),
  payMethods: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .refine((value) => /^[0-9A-Z]+$/u.test(value), "REDSYS_PAYMETHODS non valido")
    .default("C"),
  consumerLanguage: z
    .string()
    .trim()
    .regex(/^\d{1,2}$/u, "REDSYS_CONSUMER_LANGUAGE deve essere di 1-2 cifre")
    .default("7"),
  enableEMV3DS: z
    .boolean()
    .default(true),
  enableSCAExceptions: z
    .boolean()
    .default(false),
  threeDSRequestorID: z
    .string()
    .trim()
    .optional(),
  threeDSRequestorName: z
    .string()
    .trim()
    .max(40)
    .optional(),
  threeDSRequestorURL: z
    .string()
    .url()
    .optional(),
})

type RedsysConfig = z.infer<typeof envSchema>

export type GatewayEnvironment = "test" | "live"

export function loadRedsysConfig() {
  const environmentValue = (process.env.REDSYS_ENVIRONMENT ?? process.env.REDSYS_ENV ?? "test").toLowerCase()
  const result = envSchema.safeParse({
    merchantCode: process.env.REDSYS_MERCHANT_CODE,
    terminal: process.env.REDSYS_TERMINAL ?? "1",
    secret: process.env.REDSYS_SECRET,
    environment: environmentValue === "live" ? "live" : "test",
    notifyUrl: process.env.REDSYS_NOTIFY_URL,
    successUrl: process.env.REDSYS_URL_OK,
    failureUrl: process.env.REDSYS_URL_KO,
    merchantName: process.env.REDSYS_MERCHANT_NAME,
    payMethods: process.env.REDSYS_PAYMETHODS,
    consumerLanguage: process.env.REDSYS_CONSUMER_LANGUAGE,
    enableEMV3DS: process.env.REDSYS_ENABLE_EMV3DS === "true",
    enableSCAExceptions: process.env.REDSYS_ENABLE_SCA_EXCEPTIONS === "true",
    threeDSRequestorID: process.env.REDSYS_3DS_REQUESTOR_ID,
    threeDSRequestorName: process.env.REDSYS_3DS_REQUESTOR_NAME,
    threeDSRequestorURL: process.env.REDSYS_3DS_REQUESTOR_URL,
  })

  return result
}

export type { RedsysConfig }
