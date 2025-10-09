import { NextResponse, type NextRequest } from "next/server"

import { loadRedsysConfig } from "@/lib/redsys/config"
import { verifyNotification } from "@/lib/redsys/gateway"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: "Payload non valido" }, { status: 400 })
  }

  const notification = {
    Ds_SignatureVersion: String(formData.get("Ds_SignatureVersion") ?? ""),
    Ds_MerchantParameters: String(formData.get("Ds_MerchantParameters") ?? ""),
    Ds_Signature: String(formData.get("Ds_Signature") ?? ""),
  }

  if (!notification.Ds_MerchantParameters || !notification.Ds_Signature) {
    return NextResponse.json({ error: "Parametri Redsys mancanti" }, { status: 400 })
  }

  const env = loadRedsysConfig()
  if (!env.success) {
    return NextResponse.json({ error: "Configurazione Redsys non valida" }, { status: 500 })
  }

  try {
    const { isValid, decoded } = verifyNotification(env.data.secret, notification)
    if (!isValid) {
      console.warn("[Redsys] Firma non valida", { decoded })
      return new NextResponse("INVALID SIGNATURE", { status: 400 })
    }

    console.info("[Redsys] Notifica pagamento ricevuta", decoded)
  } catch (error) {
    console.error("[Redsys] Errore durante la verifica della notifica", error)
    return new NextResponse("ERROR", { status: 500 })
  }

  return new NextResponse("OK")
}
