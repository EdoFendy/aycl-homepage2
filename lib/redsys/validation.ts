import { z } from "zod"

/**
 * Schema for validating Redsys amount input
 * Supports both comma and dot as decimal separators
 * Converts to cents for internal processing
 */
export const redsysAmountSchema = z
  .string()
  .trim()
  .min(1, "Inserisci l'importo")
  .regex(/^\d+(?:[\.,]\d{1,2})?$/u, "Formato importo non valido")
  .transform((value) => {
    const normalized = value.replace(/,/g, ".")
    const euros = Number.parseFloat(normalized)
    if (!Number.isFinite(euros) || euros <= 0) {
      throw new Error("L'importo deve essere maggiore di zero")
    }
    const cents = Math.round(euros * 100)
    if (cents <= 0) {
      throw new Error("Importo non valido")
    }
    return cents
  })
  .pipe(z.number().int().positive().max(999_999_999))

/**
 * Schema for validating order ID format
 * Must be 4-12 digits as per Redsys specification
 */
export const orderIdSchema = z
  .string()
  .trim()
  .regex(/^\d{4,12}$/u, "orderId deve contenere 4-12 cifre")

/**
 * Schema for validating merchant code
 * Must be exactly 9 digits
 */
export const merchantCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{9}$/u, "Codice commerciante deve essere di 9 cifre")

/**
 * Schema for validating terminal number
 * Must be 1-3 digits
 */
export const terminalSchema = z
  .string()
  .trim()
  .regex(/^\d{1,3}$/u, "Numero terminale deve essere di 1-3 cifre")

/**
 * Schema for validating currency code
 * Must be 3 digits (978 for EUR)
 */
export const currencySchema = z
  .string()
  .trim()
  .regex(/^\d{3}$/u, "Codice valuta deve essere di 3 cifre")

/**
 * Schema for validating transaction type
 * Must be single digit (0 for authorization)
 */
export const transactionTypeSchema = z
  .string()
  .trim()
  .regex(/^\d$/u, "Tipo transazione deve essere una cifra")

/**
 * Schema for validating SCA exception codes
 * MIT, LWV, TRA, COR as per PSD2 specification
 */
export const scaExceptionSchema = z
  .enum(["MIT", "LWV", "TRA", "COR"], {
    errorMap: () => ({ message: "Codice esenzione SCA non valido" })
  })

/**
 * Schema for validating pay methods
 * Must contain only alphanumeric characters
 */
export const payMethodsSchema = z
  .string()
  .trim()
  .transform((value) => value.toUpperCase())
  .refine((value) => /^[0-9A-Z]+$/u.test(value), "Metodi di pagamento non validi")

/**
 * Schema for validating consumer language code
 * Must be 1-2 digits
 */
export const consumerLanguageSchema = z
  .string()
  .trim()
  .regex(/^\d{1,2}$/u, "Codice lingua deve essere di 1-2 cifre")

/**
 * Schema for validating product description
 * Max 125 characters as per Redsys specification
 */
export const productDescriptionSchema = z
  .string()
  .trim()
  .max(125, "Descrizione prodotto massimo 125 caratteri")

/**
 * Schema for validating customer name
 * Max 60 characters as per Redsys specification
 */
export const customerNameSchema = z
  .string()
  .trim()
  .max(60, "Nome cliente massimo 60 caratteri")

/**
 * Schema for validating merchant name
 * Max 60 characters as per Redsys specification
 */
export const merchantNameSchema = z
  .string()
  .trim()
  .max(60, "Nome commerciante massimo 60 caratteri")
