import { z } from "zod"

const MAX_REDSYS_AMOUNT = 999_999_999_999 // 12 cifre

function parseStringAmount(value: string, ctx: z.RefinementCtx) {
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
}

function parseNumberAmount(value: number, ctx: z.RefinementCtx) {
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

export const redsysAmountSchema = z
  .union([z.string(), z.number()], {
    invalid_type_error: "Importo non valido",
    required_error: "Inserisci l'importo",
  })
  .transform((value, ctx) => {
    const cents = typeof value === "number" ? parseNumberAmount(value, ctx) : parseStringAmount(value, ctx)
    if (cents === z.NEVER) return z.NEVER

    if (cents > MAX_REDSYS_AMOUNT) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Importo troppo elevato" })
      return z.NEVER
    }

    return cents
  })
  .pipe(z.number().int().positive())

export function formatRedsysAmount(cents: number) {
  if (!Number.isInteger(cents) || cents <= 0 || cents > MAX_REDSYS_AMOUNT) {
    throw new Error("Importo in centesimi non valido per Redsys")
  }

  return cents.toString().padStart(12, "0")
}

export const redsysOrderIdSchema = z
  .string({ required_error: "orderId mancante" })
  .trim()
  .regex(/^[0-9]{4}[0-9A-Z]{0,8}$/u, "orderId deve iniziare con 4 cifre ed essere lungo 4-12 caratteri")

export function generateRedsysOrderId() {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0")
  const base = `${timestamp}${random}`
  const order = base.slice(-12)
  return order.padStart(4, "0")
}

export function sanitizeRedsysText(value: string | undefined, maxLength: number) {
  if (!value) return undefined

  const sanitized = value
    .replace(/\s+/gu, " ")
    .replace(/[\u0000-\u001F]/gu, "")
    .trim()

  if (!sanitized) return undefined

  return sanitized.slice(0, maxLength)
}
