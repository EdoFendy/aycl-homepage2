import { NextResponse } from "next/server"

import {
  decodeMerchantParameters,
  verifyNotificationSignature,
} from "@/lib/payments/redsys"

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Variabile d'ambiente mancante: ${name}`)
  }
  return value
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData()
    const encodedParameters = formData.get("Ds_MerchantParameters")
    const signature = formData.get("Ds_Signature")

    if (typeof encodedParameters !== "string" || typeof signature !== "string") {
      return new NextResponse("INVALID", { status: 400 })
    }

    const secretKey = getEnv("REDSYS_SECRET_KEY")
    const verification = verifyNotificationSignature(encodedParameters, signature, secretKey)

    if (!verification.isValid) {
      console.warn("Notifica Redsys con firma non valida", {
        order: verification.order,
      })
      return new NextResponse("KO", { status: 400 })
    }

    const payload = decodeMerchantParameters(encodedParameters)

    console.info("Pagamento Redsys confermato", {
      order: verification.order,
      responseCode: payload.Ds_Response,
      amount: payload.Ds_Amount,
      authorisation: payload.Ds_AuthorisationCode,
      raw: payload,
    })

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("Errore nella gestione della notifica Redsys", error)
    return new NextResponse("KO", { status: 500 })
  }
}
