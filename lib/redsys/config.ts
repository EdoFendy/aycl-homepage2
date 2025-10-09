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
  })

  return result
}

export type { RedsysConfig }
